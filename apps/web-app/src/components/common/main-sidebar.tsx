'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftRight,
  Package,
  PanelLeft,
} from 'lucide-react';

import {
  Button,
  LinkButton,
  ScrollArea,
  Separator,
  Sidebar,
  SidebarCollapse,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  cn,
} from '@repo/shared-ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { create } from 'zustand';

export type MainSidebarStore = {
  open: boolean;
  collapse: boolean;
  setOpen: (open: boolean) => void;
  setCollapse: (collapse: boolean) => void;
};

export const useMainSidebar = create<MainSidebarStore>((set) => ({
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
    href: '/admin',
    title: 'Dashboard',
  },
  {
    href: '/admin/orders',
    title: 'Orders',
  },
  {
    href: '/admin/payments',
    title: 'Payments',
  },
  {
    href: '/admin/products',
    title: 'Products',
  },
  {
    href: '/admin/users',
    title: 'Users',
  },
  {
    href: '/admin/drivers',
    title: 'Drivers',
  },
];
const commonLinks = [
  {
    href: '/admin/setting',
    title: 'Setting',
  },
];

export interface SidebarMenuItemProps {
  Link: typeof Link;
}

export default function MainSidebar() {
  const { open, collapse, setOpen, setCollapse } = useMainSidebar();
  const pathname = usePathname();
  return (
    <Sidebar
      open={open}
      onOpenChange={() => setOpen(!open)}
      onCollapseChange={() => setCollapse(!collapse)}
    >
      <SidebarContent
        side={'left'}
        className="md:h-[calc(100vh-4.2rem)] sticky top-[4.2rem] bg-card px-0 py-0"
        maxWidth="15rem"
      >
        <div
          className={cn(
            'relative h-full flex flex-col gap-2 justify-start pt-14 md:pt-6 pb-2 group',
          )}
        >
          <div className="absolute top-2 right-0 translate-x-1/2 hidden lg:block z-50">
            <SidebarCollapse asChild>
              <Button
                size={'xs'}
                width={'icon'}
                color={'primary'}
                className="invisible group-hover:visible aspect-square"
              >
                {collapse ? (
                  <ChevronLeft className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </Button>
            </SidebarCollapse>
          </div>
          <ScrollArea className="h-full">
            <SidebarMenu className="gap-2">
              {adminLinks.map((item) => (
                <LinkButton
                  size={'sm'}
                  key={item.href}
                  Link={Link}
                  href={item.href}
                  className={cn(
                    pathname.endsWith(item.href)
                      ? 'bg-accent'
                      : 'hover:bg-accent',
                    'justify-start',
                    'w-full',
                  )}
                  width="full"
                >
                  <SidebarMenuItem
                    icon={<Package className="h-5 w-5" />}
                    label={item.title}
                    className="h-10 gap-4"
                  >
                    {item.title}
                  </SidebarMenuItem>
                </LinkButton>
              ))}
            </SidebarMenu>
          </ScrollArea>
          <Separator />
          <SidebarMenu>
            {commonLinks.map((item) => (
              <LinkButton
                key={item.href}
                size={'sm'}
                Link={Link}
                href={item.href}
                className={cn(
                  pathname.endsWith(item.href)
                    ? 'bg-accent'
                    : 'hover:bg-accent',
                  'justify-start',
                  'w-full',
                )}
                width="full"
              >
                <SidebarMenuItem
                  icon={<Package className="h-5 w-5" />}
                  label={item.title}
                  className="h-10"
                >
                  {item.title}
                </SidebarMenuItem>
              </LinkButton>
            ))}
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
