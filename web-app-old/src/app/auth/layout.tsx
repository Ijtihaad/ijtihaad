import getMe from '@/data/user/getMe';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getMe();
  if (user) {
    redirect('/');
  }
  return <div>{children}</div>;
}
