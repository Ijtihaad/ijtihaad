'use server';

import { server_host } from '@/config/host.config';
import { FetcherResponse } from '../types';
import fetcher from './fetcher.service';
import revalidate from './revalidate.service';
import { getToken } from './token.service';

export async function uploadFile(data: any) {
  const accessToken = await getToken();
  const res = await fetch(`${server_host}/files`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  await revalidate({ tags: ['PRODUCTS'] });
  const resData: Promise<
    FetcherResponse<{ files: string[]; error: undefined }>
  > = res.json();
  return resData;
}

export async function getManyFiles<T = object>(query?: string) {
  const res = await fetcher.get<FetcherResponse<(File & T)[]>>(
    `/products?${query ?? ''}`,
    {
      next: { tags: ['PRODUCTS'], revalidate: 36000 },
    },
  );
  return res.data;
}

export async function getOneFile<T = object>(id: string, query?: string) {
  const res = await fetcher.get<FetcherResponse<File & T>>(
    `/products/${id}?${query ?? ''}`,
    { next: { tags: [`PRODUCTS:${id}`, 'PRODUCTS'], revalidate: 36000 } },
  );
  return res.data;
}

export async function deleteFile(id: string) {
  const res = await fetcher.delete<FetcherResponse<File>>(`/products/${id}`);
  await revalidate({ tags: [`PRODUCTS:${id}`, 'PRODUCTS'] });
  return res.data;
}
