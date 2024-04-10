'use server';

import { User } from '@prisma/client';
import fetcher from '../fetcher';
import revalidate from '../revalidate';

export default async function postUser<T = {}>(data: any, query?: string) {
    const user = fetcher<User & T>(`users?${query ?? ''}`, {
      method: 'POST',
      body: JSON.stringify(data),
      next: { tags: ['USERS'], revalidate: 3600 },
    });
    revalidate({ tags: ['USERS'] });
    return user;
  }