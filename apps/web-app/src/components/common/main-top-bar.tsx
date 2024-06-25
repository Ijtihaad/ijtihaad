'use client';

import {
  Badge,
  Button,
  Input,
  LinkButton,
  Separator,
  cn,
} from '@repo/shared-ui';
import { Bell, MessageCircleMore, PanelLeft, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useMainSideBar } from './main-side-bar';
import NavLink from './nav-link';
import { UserNav } from './user-nav';

export default function MainTopBar() {
  const { open, setOpen } = useMainSideBar();
  return (
    <div className="w-full flex flex-col sticky top-0 bg-background z-10">
      <div className="relative w-full flex items-center justify-between gap-2 p-2">
        <Button
          width={'icon'}
          onClick={() => setOpen(!open)}
          className="h-10 flex lg:hidden gap-2"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        <div className="text-title">LOGO</div>
        <div
          className={cn(
            'hidden lg:block w-full max-w-2xl absolute left-1/2 -translate-x-[calc(50%-2rem)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ',
          )}
        >
          <form>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input placeholder="Search" className={'px-10 h-10'} />
              <Badge className="bg-accent absolute right-8 top-1/2 -translate-y-1/2 h-5 w-fit px-2 py-1 text-muted-foreground">
                CTR + K
              </Badge>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <NavLink
            className="hidden lg:flex gap-2"
            label={
              <LinkButton
                Link={Link}
                href="/posts/create"
                variant="outline"
                className="hidden lg:flex gap-2"
              >
                <Plus className="size-5" />
                <span className="">Post</span>
              </LinkButton>
            }
            title="New Post"
          />

          <NavLink
            className="hidden lg:flex gap-2"
            label={
              <LinkButton
                Link={Link}
                href="/posts/create"
                variant="outline"
                className="hidden lg:flex gap-2"
              >
                <MessageCircleMore className="size-5" />
                <span className="">Chat</span>
              </LinkButton>
            }
            title="New Post"
          />

          <NavLink
            className="flex gap-2"
            label={
              <Button variant="outline" width={'icon'} className="h-10">
                <Bell className="size-5" />
              </Button>
            }
            title="Notification"
          />
          <UserNav user={null} className="hidden lg:flex gap-2" />
        </div>
      </div>
      <Separator />
    </div>
  );
}
