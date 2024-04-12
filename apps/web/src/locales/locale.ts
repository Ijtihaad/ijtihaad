'use server';

import { cookies } from 'next/headers';

export async function setLocale(local: string) {
  const cookieStore = cookies();
  cookieStore.set({
    name: 'NEXT_LOCALE',
    value: local,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getLocale() {
  const cookieStore = cookies();
  const data = cookieStore.get('NEXT_LOCALE');
  return data?.value ?? 'or';
}
