import AppSidebar from '@web/components/global/app-sidebar';
import AppBar from '@web/components/global/app-topbar';
import { ReactNode } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <AppSidebar user={null} />
      <div className="flex flex-col w-full">
        <AppBar />
        {children}
      </div>
    </div>
  );
}
