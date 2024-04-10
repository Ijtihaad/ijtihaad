'use server';

import { User } from '@prisma/client';
import fetcher from '../fetcher';
import revalidate from '../revalidate';

export default async function getMe<T = {}>(query?: string) {
    const res = await fetcher<User & T>(`users/me?${query ?? ''}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.success) {
      return null;
    }
    return res.data;
  }