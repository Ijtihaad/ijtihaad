'use server';

import { cookies } from 'next/headers';

export async function setCookie(
  name: string,
  value: string | object,
  options?: {
    expires?: number | Date | undefined;
    secure?: boolean | undefined;
  },
) {
  const cookieStore = cookies();
  const valueData = typeof value === 'string' ? value : JSON.stringify(value);
  cookieStore.set({
    name: name,
    value: valueData,
    expires: options?.expires,
    secure: options?.secure,
  });
}

export async function getCookie(name: string) {
  const cookieStore = cookies();
  return cookieStore.get(name)?.value;
}
