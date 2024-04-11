'use client';

import { Bell, Menu, Plus, Search } from 'lucide-react';
import useMediaQuery from '../hooks/use-media-query';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LinkButton } from '../ui/link-button';
import NavLink from '../ui/nav-link';
import { Separator } from '../ui/separator';
import { useSidebar } from '../ui/sidebar';
import { ModeToggle } from './mode-toggle';
import { UserNav } from './user-nav';
import { User } from '@common';

export default function AppBar({ user }: { user: User | null }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { toggleCollapsed, toggleToggled } = useSidebar();
  return (
    <div className="w-full flex flex-col sticky top-0 bg-background/95 z-10">
      <div className="w-full flex items-center gap-2 p-2">
        <Button
          variant="default-outline"
          width={'icon'}
          onClick={isMobile ? toggleToggled : toggleCollapsed}
        >
          <Menu className="h-4 w-4" />
        </Button>
        <div className="flex justify-start w-full">
          {isMobile ? (
            <Button variant={'default-outline'} width={'icon'} className="p-2">
              <Search />
            </Button>
          ) : (
            <div className="w-fit bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

                  <Input placeholder="Search" className={'pl-8'} />
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <NavLink
            label={
              <Button variant="default-outline" width={'icon'}>
                <Bell className="h-4 w-4" />
              </Button>
            }
            title="Notification"
          />
          <NavLink
            label={
              <LinkButton
                href="/hello"
                variant="default-outline"
                className="flex items-center gap-2"
                width={isMobile ? 'icon' : 'default'}
              >
                <Plus className="h-4 w-4" />
                {!isMobile && <span className="">Create</span>}
              </LinkButton>
            }
            title="Create Question"
          />
          <ModeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <LinkButton href="/auth/login" variant="default-outline">
              Login
            </LinkButton>
          )}
        </div>
      </div>
      <Separator />
    </div>
  );
}
