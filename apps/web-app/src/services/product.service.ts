'use server';

import { Product } from '@repo/common';
import { FetcherResponse } from '../types';
import fetcher from './fetcher.service';
import revalidate from './revalidate.service';

export async function createProduct<T = object>(data: any, query?: string) {
  const res = await fetcher.post<FetcherResponse<Product & T>>(
    `/products?${query ?? ''}`,
    data,
  );
  await revalidate({ tags: ['PRODUCTS'] });
  return res.data;
}

export async function getManyProducts<T = object>(query?: string) {
  const res = await fetcher.get<FetcherResponse<(Product & T)[]>>(
    `/products?${query ?? ''}`,
    {
      next: { tags: ['PRODUCTS'], revalidate: 36000 },
    },
  );
  return res.data;
}

export async function getOneProduct<T = object>(id: string, query?: string) {
  const res = await fetcher.get<FetcherResponse<Product & T>>(
    `/products/${id}?${query ?? ''}`,
    { next: { tags: [`PRODUCTS:${id}`, 'PRODUCTS'], revalidate: 36000 } },
  );
  return res.data;
}

export async function updateProduct(id: string, data: any) {
  const res = await fetcher.put<FetcherResponse<Product>>(
    `/products/${id}`,
    data,
  );
  await revalidate({ tags: [`PRODUCTS:${id}`, 'PRODUCTS'] });
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await fetcher.delete<FetcherResponse<Product>>(`/products/${id}`);
  await revalidate({ tags: [`PRODUCTS:${id}`, 'PRODUCTS'] });
  return res.data;
}
