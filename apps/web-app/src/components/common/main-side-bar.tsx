'use client';

import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRight,
  CircleHelp,
  Flag,
  Flame,
  GalleryVertical,
  History,
  Home,
  MonitorPlay,
  Package,
  PanelLeft,
  Plus,
  Quote,
  Settings,
  SquareLibrary,
} from 'lucide-react';

import {
  Button,
  LinkButton,
  ScrollArea,
  ScrollBar,
  Separator,
  SideBar,
  SideBarCollapse,
  SideBarContent,
  SideBarMenu,
  SideBarMenuItem,
  cn,
} from '@repo/shared-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { create } from 'zustand';
import { AccountSwitcher } from './account-switcher';

const adminLinks = {
  main: [
    {
      title: 'Home',
      icon: Home,
      href: '/',
    },
    {
      title: 'Tahqiq',
      icon: Quote,
      href: '/library',
    },
    {
      title: 'Videos',
      icon: MonitorPlay,
      href: '/library',
    },
    {
      title: 'Reels',
      icon: GalleryVertical,
      href: '/reels',
    },
  ],
  community: [
    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },
    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },

    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },
    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },

    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },
    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },

    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },
    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },
  ],
  discover: [
    {
      title: 'Popular',
      icon: Flame,
      href: '/posts/history',
    },
    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },
    {
      title: 'Most upvoted',
      icon: Bookmark,
      href: '/posts/saved',
    },
  ],
  setting: [
    {
      title: 'Setting',
      icon: Settings,
      href: '/posts/history',
    },
    {
      title: 'Report',
      icon: Flag,
      href: '/posts/saved',
    },
    {
      title: 'Help',
      icon: CircleHelp,
      href: '/posts/saved',
    },
  ],
};

export default function MainSideBar() {
  const { open, collapse, setOpen, setCollapse } = useMainSideBar();
  const pathname = usePathname();

  const LinkItem = ({
    Item,
  }: {
    Item: {
      title: string;
      icon: any;
      href: string;
    };
  }) => (
    <LinkButton
      key={Item.href}
      Link={Link}
      href={Item.href}
      className={cn(
        pathname.endsWith(Item.href) ? 'bg-accent' : 'hover:bg-accent',
        'py-6 justify-start rounded-lg duration-200',
      )}
      width={collapse ? 'full' : 'icon'}
    >
      <SideBarMenuItem
        icon={<Item.icon className="size-5 " />}
        label={Item.title}
        className="gap-5 py-2"
      >
        {Item.title}
      </SideBarMenuItem>
    </LinkButton>
  );

  return (
    <SideBar
      open={open}
      onOpenChange={() => setOpen(!open)}
      onCollapseChange={() => setCollapse(!collapse)}
    >
      <SideBarContent
        side={'left'}
        className="h-screen lg:h-[calc(100vh-3.6rem)] sticky top-[3.56rem] bg-card px-0 py-0 border-r-0"
        maxWidth="16rem"
      >
        <div
          className={cn(
            'relative h-full flex flex-col gap-2 justify-start pt-14 md:pt-4 pb-2 group',
          )}
        >
          <div className="absolute top-1 right-0 translate-x-1/2 hidden lg:block z-50">
            <SideBarCollapse asChild>
              <Button
                color={'primary'}
                className="invisible group-hover:visible aspect-square size-6 p-1"
              >
                {collapse ? (
                  <ChevronLeft className="size-5" />
                ) : (
                  <ChevronRight className="size-5" />
                )}
              </Button>
            </SideBarCollapse>
          </div>
          <ScrollArea className="h-full">
            <SideBarMenu className="gap-0.5">
              <div className="w-full mb-4 flex flex-col mt-2">
                {adminLinks.main.map((Item) => (
                  <LinkItem key={Item.href} Item={Item} />
                ))}
              </div>
              <Separator />
              {collapse && (
                <div className="text-md px-2 mt-2 font-bold">Discover</div>
              )}
              <div className="w-full mb-4 flex flex-col mt-2">
                {adminLinks.discover.map((Item) => (
                  <LinkItem key={Item.href} Item={Item} />
                ))}
              </div>
              <Separator />
              {collapse && (
                <div className="text-md px-2 mt-2 font-bold">Community</div>
              )}
              <div className="w-full mb-4 flex flex-col mt-2">
                <LinkItem
                  Item={{ href: '/', icon: Plus, title: 'Create Jama' }}
                />
                {adminLinks.community.map((Item) => (
                  <LinkItem key={Item.href} Item={Item} />
                ))}
              </div>
              <Separator />
              <div className="w-full mb-4 flex flex-col mt-2">
                {adminLinks.setting.map((Item) => (
                  <LinkItem key={Item.href} Item={Item} />
                ))}
              </div>
            </SideBarMenu>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </SideBarContent>
    </SideBar>
  );
}

export type MainSideBarStore = {
  open: boolean;
  collapse: boolean;
  setOpen: (open: boolean) => void;
  setCollapse: (collapse: boolean) => void;
};

export const useMainSideBar = create<MainSideBarStore>((set) => ({
  open: false,
  collapse: false,

  setOpen: (open) => {
    set((state) => {
      const newState: typeof state = JSON.parse(JSON.stringify(state));
      newState.open = open;
      return newState;
    });
  },

  setCollapse: (collapse) => {
    set((state) => {
      const newState: typeof state = JSON.parse(JSON.stringify(state));
      newState.collapse = collapse;
      return newState;
    });
  },
}));

export interface SideBarMenuItemProps {
  Link: typeof Link;
}
