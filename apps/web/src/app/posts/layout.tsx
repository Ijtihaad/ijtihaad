import AppSidebar from '@web/components/global/app-sidebar';
import AppBar from '@web/components/global/app-topbar';
import {
  getAccount,
  getAccounts,
  setAccount,
} from '@web/data/auth/authentications';
import getMe from '@web/data/user/getMe';
import { ReactNode } from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const user = await getMe();
  const accounts = await getAccounts();
  return (
    <div className="flex w-full">
      <AppSidebar user={user} accounts={accounts??[]} />
      <div className="flex flex-col w-full">
        <AppBar user={user}  />
        {children}
      </div>
    </div>
  );
}
