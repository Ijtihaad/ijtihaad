'use server';

import { JwtAuthToken, LocalLogin, LocalRegister } from '@repo/common';
import fetcher from './fetcher.service';

import { FetcherResponse } from '@/types';
import revalidate from './revalidate.service';
import { addAuth, removeAuth } from './token.service';

export async function localRegister(data: LocalRegister) {
  const res = await fetcher.post<FetcherResponse<{ jwt: JwtAuthToken }>>(
    '/auth/register',
    data,
  );

  if (res.data && !res.data.error) await addAuth(res.data.jwt);
  await revalidate({ tags: ['USERS'] });
  return res.data;
}

export async function localLogin(data: LocalLogin) {
  const res = await fetcher.post<FetcherResponse<{ jwt: JwtAuthToken }>>(
    '/auth/login',
    data,
  );
  if (res.data && !res.data.error) await addAuth(res.data.jwt);
  return res.data;
}

export async function logout() {
  await removeAuth();
  return { success: true, data: { message: 'You logout' } };
}
