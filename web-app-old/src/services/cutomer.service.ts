'use server';

import { User } from '@repo/common';
import { FetcherResponse } from '../types';
import fetcher from './fetcher.service';

export async function getManyUsers<T = object>(query?: string) {
  const res = await fetcher.get<FetcherResponse<(User & T)[]>>(
    `/payments?${query ?? ''}`,
  );
  return res.data;
}

export async function getOneUser<T = object>(id: string, query?: string) {
  const res = await fetcher.get<FetcherResponse<User & T>>(
    `/payments/${id}?${query ?? ''}`,
  );
  return res.data;
}

export async function deleteUser(id: string) {
  const res = await fetcher.delete<FetcherResponse<User>>(`/payments/${id}`);
  return res.data;
}
