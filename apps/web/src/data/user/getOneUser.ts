'use server';

import { User } from '@prisma/client';
import fetcher from '../fetcher';

export default async function getOneUser<T = {}>(id: string, query?: string) {
    const res = await fetcher<User & T>(`users/${id}?${query ?? ''}`, {
      method: 'GET',
      next: { tags: [`USERS:${id}`], revalidate: 3600 },
    });
    if (!res.success) {
      return res;
    }
    return res.data;
  }