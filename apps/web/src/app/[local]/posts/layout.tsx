import { ReactNode } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="flex w-full">{children}</div>;
}
