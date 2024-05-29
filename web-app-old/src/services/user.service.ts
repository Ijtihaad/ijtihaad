'use server';

import { User } from '@repo/common';
import { FetcherResponse } from '../types';
import fetcher from './fetcher.service';
import revalidate from './revalidate.service';

export async function createUser<T = object>(data: any, query?: string) {
  const res = await fetcher.post<FetcherResponse<User & T>>(
    `/users?${query ?? ''}`,
    data,
  );
  await revalidate({ tags: ['USERS'] });
  return res.data;
}

export async function getMe<T = object>(query?: string) {
  const res = await fetcher.get<FetcherResponse<User & T>>(
    `/users/me?${query ?? ''}`,
  );
  return res.data;
}

export async function getManyUsers<T = object>(query?: string) {
  const res = await fetcher.get<FetcherResponse<(User & T)[]>>(
    `/users?${query ?? ''}`,
    {
      next: { tags: ['USERS'], revalidate: 36000 },
    },
  );
  return res.data;
}

export async function getOneUser<T = object>(id: string, query?: string) {
  const res = await fetcher.get<FetcherResponse<User & T>>(
    `/users/${id}?${query ?? ''}`,
    { next: { tags: [`USERS:${id}`, 'USERS'], revalidate: 36000 } },
  );
  return res.data;
}

export async function isAdminExist() {
  const res =
    await fetcher.get<FetcherResponse<{ adminExist: boolean }>>(
      '/users/admin-exist',
    );
  return res.data;
}

export async function updateUser(id: string, data: any) {
  const res = await fetcher.put<FetcherResponse<User>>(`/users/${id}`, data);
  await revalidate({ tags: [`USERS:${id}`, 'USERS'] });
  return res.data;
}

export async function deleteUser(id: string) {
  const res = await fetcher.delete<FetcherResponse<User>>(`/users/${id}`);
  await revalidate({ tags: [`USERS:${id}`, 'USERS'] });
  return res.data;
}
