'use client';

import cn from '@/utils/cn';
// import { User } from '@prisma/client';
import {
  Bookmark,
  History,
  Home,
  Plus,
  Podcast,
  SquareLibrary,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { AccountSwitcher } from './account-switcher';

const links = [
  {
    title: 'Home',
    icon: Home,
    href: '/',
  },
  {
    title: 'Library',
    icon: SquareLibrary,
    href: '/library',
  },
  {
    title: 'History',
    icon: History,
    href: '/posts/history',
  },
  {
    title: 'Saved',
    icon: Bookmark,
    href: '/posts/saved',
  },
];

type AppSidebarProps = {
  user: any | null;
  communities: {
    slug: string;
    name: string;
    image: string | undefined | null;
  }[];
};

export default function AppSidebar({ user, communities }: AppSidebarProps) {
  // const { collapsed } = useSidebar();
  const pathname = usePathname();
  if (pathname.startsWith('/auth')) {
    return <></>;
  }
  return (
    <div className="h-screen flex sticky top-0 z-50">
      {/* <Sidebar header={<AccountSwitcher collapsed={collapsed} />}>
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
        {user && (
          <>
            <Separator />
            <SubNavItem
              Icon={SquareLibrary}
              variant="ghost"
              label="Communities"
            >
              <ScrollArea
                className={cn(
                  'flex flex-col gap-2 max-h-[calc(100vh_-_26rem)]',
                )}
              >
                {communities.map((community, index) => (
                  <NavItem
                    key={community.slug}
                    Icon={({ className }: { className: string }) => (
                      <Avatar className={cn('h-6 w-6 flex items-center gap-4')}>
                        {community.image && (
                          <AvatarImage
                            src={community.image}
                            alt={community.name}
                          />
                        )}
                        <AvatarFallback>
                          {community.name[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    LinkComponent={
                      <Link href={`/communities/${community.slug}`} />
                    }
                    variant={'ghost'}
                  >
                    {community.name}
                  </NavItem>
                ))}
                <NavItem
                  Icon={({ className }: { className: string }) => (
                    <Avatar className={cn('h-6 w-6 flex items-center gap-4')}>
                      <AvatarFallback className="p-1">
                        <Plus />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  LinkComponent={<Link href={'/communities/create'} />}
                  variant={'ghost'}
                >
                  create community
                </NavItem>
              </ScrollArea>
            </SubNavItem>
          </>
        )}
        <Separator />
        <SubNavItem Icon={SquareLibrary} variant="ghost" label="Recourses">
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
        </SubNavItem>
      </Sidebar> */}
      <Separator orientation="vertical" />
    </div>
  );
}
