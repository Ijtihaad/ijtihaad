import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@web/components/ui/separator';
import { SidebarNav } from '@web/components/global/sidebar-nav';
import { ScrollArea, ScrollBar } from '@web/components/ui/scroll-area';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/setting/profile',
  },
  {
    title: 'Account',
    href: '/setting/account',
  },
  {
    title: 'Appearance',
    href: '/setting/appearance',
  },
  {
    title: 'Notifications',
    href: '/setting/notifications',
  },
  {
    title: 'Display',
    href: '/setting/display',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="space-y-6 px-4 md:px-4 lg:px-8 pt-8 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4">
            <ScrollArea className=" px-4 md:px-4 lg:px-8">
              <SidebarNav items={sidebarNavItems} />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
