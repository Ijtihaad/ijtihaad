'use server';

import { User } from '@prisma/client';
import fetcher from '../fetcher';

export default async function getManyUsers<T = {}>(query?: string) {
  const res = await fetcher<(User & T)[]>(`users?${query ?? ''}`, {
    method: 'GET',
    next: { tags: ['USERS'], revalidate: 3600 },
  });
  if (!res.success) {
    return res;
  }
  return res.data;
}
