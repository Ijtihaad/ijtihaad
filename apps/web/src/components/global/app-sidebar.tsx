'use client';

import { AuthUser } from '@common';
import { User } from '@prisma/client';
import cn from '@web/utils/cn';
import { History, Home, SquareLibrary } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import Sidebar, { NavItem, SubNavItem, useSidebar } from '../ui/sidebar';
import { AccountSwitcher } from './account-switcher';

const links = [
  {
    title: 'Home',
    icon: Home,
    href: '/posts',
  },
  {
    title: 'Library',
    icon: SquareLibrary,
    href: '/library',
  },
  {
    title: 'History',
    icon: History,
    href: 'history',
  },
];

export default function AppSidebar({
  user,
  accounts,
}: {
  user: User | null;
  accounts?: AuthUser['user'][];
}) {
  const { collapsed } = useSidebar();
  return (
    <div className="h-screen flex sticky top-0 z-50">
      <Sidebar
        header={
          <AccountSwitcher
            collapsed={collapsed}
            accounts={accounts}
            account={user}
          />
        }
      >
        {links.map((link, index) => (
          <NavItem
            key={link.href}
            Icon={link.icon}
            LinkComponent={<Link href={link.href} />}
            variant={'ghost'}
          >
            {link.title}
          </NavItem>
        ))}
        <Separator />
        <SubNavItem Icon={SquareLibrary} variant="ghost" label="Subtitle">
          <div className={cn('flex flex-col gap-2')}>
            {links.map((link, index) => (
              <NavItem
                key={link.href}
                Icon={link.icon}
                LinkComponent={<Link href={link.href} />}
                variant={'ghost'}
              >
                {link.title}
              </NavItem>
            ))}
          </div>
        </SubNavItem>
      </Sidebar>
      <Separator orientation="vertical" />
    </div>
  );
}
