'use server';

import { AuthUser, JwtToken, User, userLoginSchema } from '@common';
import { z } from 'zod';
import fetcher from '../fetcher';
import { addAuthentication } from './authentications';

export default async function loginWithEmail(
  data: z.infer<typeof userLoginSchema>,
) {
  const res = await fetcher<AuthUser>(`auth/login/email`, {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  if (!res.success) {
    return res;
  }

  await addAuthentication(res.data);

  return { success: true, message: 'You Login Successfully' };
}
