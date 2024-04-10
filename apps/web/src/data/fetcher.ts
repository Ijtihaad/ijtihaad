'use server';

import { server_host } from '@web/constants/host.config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import refreshTokens from './refresh-tokens';

interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  error: boolean;
  message: string;
}

type FetchResponse<T> = SuccessResponse<T> | ErrorResponse;

export default async function fetcher<T = null>(
  pathname: string,
  options?: RequestInit
): Promise<FetchResponse<T>> {
  const cookieStore = cookies();
  const headers: Record<string, any> = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };
  if (cookieStore.has('accessToken')) {
    const accessToken = cookieStore.get('accessToken')?.value;
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  const url = `${server_host}/${pathname}`;

  let response = await fetch(url, {
    ...options,
    headers: headers,

    next: {
      ...options?.next,
      tags: [...(options?.next?.tags ?? []), 'ALL'],
    },
  });

  if (response.status === 403) {
    const accessToken = await refreshTokens();
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      response = await fetch(url, {
        ...options,
        headers: headers,
        next: {
          ...options?.next,
          tags: [...(options?.next?.tags ?? []), 'ALL'],
        },
      });
    }
  }

  if (!response.ok) {
    if (response.status === 404) {
      return redirect('/not-found');
    }
    if (response.status === 403) {
      return redirect('/forbidden');
    }
    const error = await response.json();
    return { error: true, success: false, ...error } as ErrorResponse;
  }

  const data = (await response.json()) as T;
  return { data, success: true };
}
