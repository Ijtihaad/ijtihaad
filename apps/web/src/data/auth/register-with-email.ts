'use server';

import { JwtToken, userRegisterSchema } from '@common';
import { cookies } from 'next/headers';
import { z } from 'zod';
import fetcher from '../fetcher';
import revalidate from '../revalidate';

export default async function registerWithEmail<T = {}>(
  data: z.infer<typeof userRegisterSchema>
) {
  const res = await fetcher<JwtToken & T>(`auth/register/email`, {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store',
  });
  revalidate({ tags: ['USERS'] });
  if (!res.success) {
    return res;
  }
  const jwt = res.data;
  const cookieStore = cookies();
  cookieStore.set({
    name: 'accessToken',
    value: jwt.accessToken,
    secure: process.env.NODE_ENV === 'production',
  });

  cookieStore.set({
    name: 'refreshToken',
    value: jwt.refreshToken,
    secure: process.env.NODE_ENV === 'production',
  });

  return { success: true, message: 'You Registered Successfully' };
}
