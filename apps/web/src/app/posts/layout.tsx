import cn from '@app/web/utils/cn';
import { ReactNode } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main
      className={cn(
        'w-full md:max-w-2xl xl:max-w-4xl mx-auto'
      )}
    >
      {children}
    </main>
  );
}
