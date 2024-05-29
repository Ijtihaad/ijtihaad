'use server';

import { Payment } from '@repo/common';
import { FetcherResponse } from '../types';
import fetcher from './fetcher.service';

export async function getManyPayments<T = object>(query?: string) {
  const res = await fetcher.get<FetcherResponse<(Payment & T)[]>>(
    `/payments?${query ?? ''}`,
  );
  return res.data;
}

export async function getOnePayment<T = object>(id: string, query?: string) {
  const res = await fetcher.get<FetcherResponse<Payment & T>>(
    `/payments/${id}?${query ?? ''}`,
  );
  return res.data;
}

export async function deletePayment(id: string) {
  const res = await fetcher.delete<FetcherResponse<Payment>>(`/payments/${id}`);
  return res.data;
}
