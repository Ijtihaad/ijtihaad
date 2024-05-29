'use server';

import { FetcherResponse } from '@/types';
import { AccessTokenPayload, JwtAuthToken } from '@repo/common';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import fetcher from './fetcher.service';

export async function addAuth({ accessToken, refreshToken }: JwtAuthToken) {
  const cookieStore = cookies();
  const accountsData = cookieStore.get('all-accounts')?.value;
  const accounts = accountsData ? JSON.parse(accountsData) : [];
  accounts.push({ accessToken, refreshToken });

  cookieStore.set({
    name: 'all-accounts',
    value: JSON.stringify(accounts),
    secure: process.env.NODE_ENV === 'production',
    expires: 6400_000 * 30,
  });

  cookieStore.set({
    name: 'active-account',
    value: JSON.stringify({ accessToken, refreshToken }),
    secure: process.env.NODE_ENV === 'production',
    expires: jwtDecode(accessToken).exp,
  });
}

export async function getAuth() {
  const cookieStore = cookies();
  const accountData = cookieStore.get('active-account')?.value;
  const account = accountData ? JSON.parse(accountData) : null;
  const payload = account.accessToken
    ? jwtDecode<AccessTokenPayload>(account.accessToken)
    : null;
  return payload;
}

export async function removeAuth() {
  const cookieStore = cookies();
  const account = await getAuth();
  const accountsData = cookieStore.get('all-accounts')?.value;
  const accounts = accountsData ? JSON.parse(accountsData) : [];
  const filtersAccounts = accounts?.filter(
    (acc: any) => jwtDecode<AccessTokenPayload>(acc).userId !== account?.userId,
  );

  cookieStore.delete('active-account');
  cookieStore.delete('all-accounts');

  cookieStore.set({
    name: 'all-accounts',
    value: JSON.stringify(filtersAccounts),
    secure: process.env.NODE_ENV === 'production',
    expires: 6400_000 * 30,
  });
}

export async function setAuth(userId: string) {
  const cookieStore = cookies();
  const accountsData = cookieStore.get('all-accounts')?.value;
  const accounts = accountsData ? JSON.parse(accountsData) : [];
  const account = accounts?.filter(
    (acc: any) => jwtDecode<AccessTokenPayload>(acc).userId === userId,
  );

  if (account) {
    cookieStore.set({
      name: 'active-account',
      value: JSON.stringify(account),
      secure: process.env.NODE_ENV === 'production',
      expires: jwtDecode(account.accessToken).exp,
    });
  }
}

export async function getAuths() {
  const cookieStore = cookies();
  const accountsData = cookieStore.get('all-accounts')?.value;
  const accounts = accountsData ? JSON.parse(accountsData) : [];
  return accounts.map((account: string) => jwtDecode(account));
}

export async function getToken() {
  const cookieStore = cookies();
  const activeAccountToken = cookieStore.get('active-account')?.value;
  return activeAccountToken ? JSON.parse(activeAccountToken) : null;
}

export async function refreshTokens(): Promise<string | null> {
  const jwtToken = await getToken();
  if (!jwtToken.refreshToken) {
    return null;
  }
  try {
    const res = await fetcher.post<FetcherResponse<{ jwt: JwtAuthToken }>>(
      '/auth/token/refresh',
      {
        refreshToken: jwtToken.refreshToken,
      },
    );
    if (res.data && !res.data.error) {
      await addAuth(res.data.jwt);
      return res.data?.jwt.accessToken;
    }
    return null;
  } catch (error) {
    return null;
  }
}
