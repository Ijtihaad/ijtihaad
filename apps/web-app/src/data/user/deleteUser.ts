'use server';

import { User } from '@prisma/client';
import fetcher from '../fetcher';
import revalidate from '../revalidate';

export default async function deleteUser<T = {}>(id: string, query?: string) {
  const res = await fetcher<User & T>(`users/${id}?${query ?? ''}`, {
    method: 'DELETE',
    next: { tags: ['USERS'], revalidate: 3600 },
  });
  revalidate({ tags: ['USERS'] });
  if (!res.success) {
    return res;
  }
  return res.data;
}
