'use server';

import { JwtToken, userLoginSchema } from '@common';
import { cookies } from 'next/headers';
import { z } from 'zod';
import fetcher from '../fetcher';

export default async function loginWithEmail<T = {}>(
  data: z.infer<typeof userLoginSchema>
) {
  const res = await fetcher<JwtToken & T>(`auth/login/email`, {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store',
  });

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

  return { success: true, message: 'You Login Successfully' };
}
