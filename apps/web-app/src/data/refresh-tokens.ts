'use server';

import { AuthUser } from '@common';
import { server_host } from '@web/constants/host.config';
import { cookies } from 'next/headers';
import { addAuthentication } from './auth/authentications';

export default async function refreshTokens() {
  const cookieStore = cookies();
  if (!cookieStore.has('refreshToken')) {
    return null;
  }
  const url = `${server_host}/auth/token/refresh`;
  const res = await fetch(url, {
    body: JSON.stringify({
      refresh: cookieStore.get('refreshToken')?.value ?? '',
    }),
    next: {
      revalidate: 15 * 3600,
    },
  });

  if (!res.ok) {
    return null;
  }

  const data: AuthUser = await res.json();
  await addAuthentication(data);

  return data.jwt.accessToken;
}
