'use server';

import { Order } from '@repo/common';
import { FetcherResponse } from '../types';
import fetcher from './fetcher.service';

export async function getManyOrders<T = object>() {
  const res = await fetcher.get<FetcherResponse<(Order & T)[]>>('/orders');
  return res.data;
}

export async function getOneOrder<T = object>(id: string) {
  const res = await fetcher.get<FetcherResponse<Order & T>>(`/orders/${id}`);
  return res.data;
}

export async function deleteOrder(id: string) {
  const res = await fetcher.delete<FetcherResponse<Order>>(`/orders/${id}`);
  return res.data;
}
