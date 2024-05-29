'use server';

import { Driver, User } from '@repo/common';
import { FetcherResponse } from '../types';
import fetcher from './fetcher.service';
import revalidate from './revalidate.service';

export async function createDriver<T = object>(data: any, query?: string) {
  const res = await fetcher.post<FetcherResponse<Driver & { user: User } & T>>(
    '/drivers',
    data,
  );
  await revalidate({ tags: ['DRIVERS'] });
  return res.data;
}

export async function getManyDrivers<T = object>(query?: string) {
  const res = await fetcher.get<
    FetcherResponse<(Driver & { user: User } & T)[]>
  >(`/drivers?${query ?? ''}`, {
    next: { tags: ['DRIVERS'], revalidate: 36000 },
  });
  return res.data;
}

export async function getOneDriver<T = object>(id: string, query?: string) {
  const res = await fetcher.get<FetcherResponse<Driver & { user: User } & T>>(
    `/drivers/${id}`,
    { next: { tags: [`DRIVERS:${id}`, 'DRIVERS'], revalidate: 36000 } },
  );
  return res.data;
}

export async function updateDriver(id: string, data: any) {
  const res = await fetcher.put<FetcherResponse<Driver & { user: User }>>(
    `/drivers/${id}`,
    data,
  );
  await revalidate({ tags: [`DRIVER:${id}`, 'DRIVER'] });
  return res.data;
}

export async function deleteDriver(id: string) {
  const res = await fetcher.delete<FetcherResponse<Driver & { user: User }>>(
    `/drivers/${id}`,
  );
  await revalidate({ tags: [`DRIVER:${id}`, 'DRIVER'] });
  return res.data;
}
