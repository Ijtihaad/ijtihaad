'use server';

import { User } from '@prisma/client';
import fetcher from '../fetcher';
import revalidate from '../revalidate';

export default async function patchUser<T = {}>(
  id: string,
  data: any,
  query?: string,
) {
  const res = await fetcher<User & T>(`users/${id}?${query ?? ''}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    next: { tags: ['USERS'], revalidate: 3600 },
  });
  revalidate({ tags: ['USERS', `USERS:${id}`] });
  if (!res.success) {
    return res;
  }
  return res.data;
}
