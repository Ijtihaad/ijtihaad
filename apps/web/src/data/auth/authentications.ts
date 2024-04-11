'use server';

import { AuthUser } from '@common';
import { cookies } from 'next/headers';

export async function addAuthentication(data: AuthUser) {
  const cookieStore = cookies();

  const userData = {
    user: {
      email: data.user.email,
      username: data.user.username,
      image: data.user.image,
    },
    jwt: data.jwt,
  };

  let accounts = JSON.parse(cookieStore.get('accounts')?.value || '[]');
  if ('push' in accounts) {
    accounts.push(userData);
  } else {
    accounts = [userData];
  }

  cookieStore.set({
    name: 'accounts',
    value: JSON.stringify(accounts),
    secure: process.env.NODE_ENV === 'production',
  });

  cookieStore.set({
    name: 'account',
    value: JSON.stringify(userData),
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getAuthentication() {
  const cookieStore = cookies();
  const account: AuthUser = JSON.parse(
    cookieStore.get('account')?.value || '{}'
  );
  if (!('jwt' in account)) {
    return null;
  }
  return account.jwt;
}

export async function removeAuthentication() {
  const cookieStore = cookies();
  const account = await getAccount();
  const accounts: AuthUser[] = JSON.parse(
    cookieStore.get('accounts')?.value || '[]'
  );

  const filtersAccounts = accounts?.filter(
    (acc: AuthUser) => 'user' in acc && acc.user.email !== account?.email
  );
  console.log(filtersAccounts);

  cookieStore.delete('account');
  cookieStore.delete('accounts');

  cookieStore.set({
    name: 'accounts',
    value: JSON.stringify(filtersAccounts),
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function setAccount(email: string) {
  const cookieStore = cookies();
  const accounts: AuthUser[] = JSON.parse(
    cookieStore.get('accounts')?.value || '[]'
  );
  if (!('find' in accounts)) {
    return null;
  }
  const account = accounts.find(
    (account) => 'user' in account && account.user.email === email
  );

  if (account) {
    cookieStore.set({
      name: 'account',
      value: JSON.stringify(account),
      secure: process.env.NODE_ENV === 'production',
    });
  }
}

export async function getAccounts() {
  const cookieStore = cookies();
  const accounts: AuthUser[] = JSON.parse(
    cookieStore.get('accounts')?.value || '[]'
  );
  if (!('map' in accounts)) {
    return null;
  }
  return accounts
    .filter((account: any) => 'user' in account)
    .map((account) => account.user);
}

export async function getAccount() {
  const cookieStore = cookies();
  let account: AuthUser = JSON.parse(cookieStore.get('account')?.value || '{}');
  if (!('user' in account)) {
    return null;
  }
  return account.user;
}
