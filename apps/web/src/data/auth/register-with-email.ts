'use server';

import { AuthUser, JwtToken, User, userRegisterSchema } from '@common';
import { z } from 'zod';
import fetcher from '../fetcher';
import revalidate from '../revalidate';
import { addAuthentication } from './authentications';

export default async function registerWithEmail(
  data: z.infer<typeof userRegisterSchema>
) {
  const res = await fetcher<AuthUser>(`auth/register/email`, {
    method: 'POST',
    body: JSON.stringify(data),
    cache: 'no-store',
  });
  revalidate({ tags: ['USERS'] });
  if (!res.success) {
    return res;
  }

  await addAuthentication(res.data);

  return { success: true, message: 'You Registered Successfully' };
}
