'use client';

import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRight,
  History,
  Home,
  Package,
  PanelLeft,
  SquareLibrary,
} from 'lucide-react';

import {
  Button,
  LinkButton,
  ScrollArea,
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

const adminLinks = [
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
const commonLinks = [
  {
    href: '/admin/setting',
    title: 'Setting',
  },
];

export interface SideBarMenuItemProps {
  Link: typeof Link;
}

export default function MainSideBar() {
  const { open, collapse, setOpen, setCollapse } = useMainSideBar();
  const pathname = usePathname();
  return (
    <SideBar
      open={open}
      onOpenChange={() => setOpen(!open)}
      onCollapseChange={() => setCollapse(!collapse)}
    >
      <SideBarContent
        side={'left'}
        className="h-screen lg:h-[calc(100vh-3.6rem)] sticky top-[3.56rem] bg-card px-0 py-0"
        maxWidth="15rem"
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
                  <ChevronLeft className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </Button>
            </SideBarCollapse>
          </div>
          {/* <AccountSwitcher
            collapsed={collapse}
            account={{
              email: 'harunjeylan@gmail.com',
              fullName: 'Harun Jeylan',
              image: null,
              role: 'ADMIN',
              userId: 'hgjvjb',
            }}
            accounts={[
              {
                email: 'harunjeylan@gmail.com',
                fullName: 'Harun Jeylan',
                image: null,
                role: 'ADMIN',
                userId: 'hgjvjb',
              },
            ]}
          /> */}
          <ScrollArea className="h-full">
            <SideBarMenu className="gap-2">
              {adminLinks.map((Item) => (
                <LinkButton
                  key={Item.href}
                  Link={Link}
                  href={Item.href}
                  className={cn(
                    pathname.endsWith(Item.href)
                      ? 'bg-accent'
                      : 'hover:bg-accent',
                    'justify-start',
                    'rounded-lg duration-200',
                  )}
                  width={collapse ? "full" : "icon"}
                >
                  <SideBarMenuItem
                    icon={<Item.icon className="size-5" />}
                    label={Item.title}
                    className="h-10 gap-4"
                  >
                    {Item.title}
                  </SideBarMenuItem>
                </LinkButton>
              ))}
            </SideBarMenu>
          </ScrollArea>
          <Separator />
          <SideBarMenu>
            {commonLinks.map((item) => (
              <LinkButton
                key={item.href}
                Link={Link}
                href={item.href}
                className={cn(
                  pathname.endsWith(item.href)
                    ? 'bg-accent'
                    : 'hover:bg-accent',
                  'justify-start',
                  'rounded-lg duration-200',
                )}
                width={collapse ? "full" : "icon"}
              >
                <SideBarMenuItem
                  icon={<Package className="size-5" />}
                  label={item.title}
                  className="h-10 gap-4"
                >
                  {item.title}
                </SideBarMenuItem>
              </LinkButton>
            ))}
          </SideBarMenu>
        </div>
      </SideBarContent>
    </SideBar>
  );
}
