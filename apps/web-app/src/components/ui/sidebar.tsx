'use client';

import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';
import {
  Menu,
  MenuItem,
  Sidebar as ProSidebar,
  SubMenu,
} from 'react-pro-sidebar';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@web/components/ui/tooltip';
import cn from '@web/utils/cn';
import { Separator } from './separator';

import { create } from 'zustand';
import useMediaQuery from '../hooks/use-media-query';

export type sidebarState = {
  collapsed: boolean;
  toggled: boolean;
  sidebarRTL: boolean;
};

export type sidebarActions = {
  toggleCollapsed: () => void;
  toggleToggled: () => void;
  toggleRTL: () => void;

  setCollapsed: (value: boolean) => void;
  setToggled: (value: boolean) => void;
  setRTL: (value: boolean) => void;
};

export type sidebarStore = sidebarState & sidebarActions;

export const useSidebar = create<sidebarStore>((set) => ({
  collapsed: false,
  toggled: false,
  sidebarRTL: false,

  toggleCollapsed: () => {
    set((state) => ({ collapsed: !state.collapsed }));
  },
  toggleToggled: () => {
    set((state) => ({ toggled: !state.toggled }));
  },
  toggleRTL: () => {
    set((state) => ({ sidebarRTL: !state.sidebarRTL }));
  },

  setCollapsed: (value: boolean) => {
    set((state) => ({ collapsed: value }));
  },
  setToggled: (value: boolean) => {
    set((state) => ({ toggled: value }));
  },
  setRTL: (value: boolean) => {
    set((state) => ({ sidebarRTL: value }));
  },
}));

interface NavItemProps {
  LinkComponent:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;
  Icon: React.ElementType<any, keyof JSX.IntrinsicElements>;
  label?: string;
  variant: 'default' | 'ghost';
  children: ReactNode;
}
interface SubNavProps {
  Icon: React.ElementType<any, keyof JSX.IntrinsicElements>;
  label?: string;
  variant: 'default' | 'ghost';
  children: ReactNode;
}
export function NavItem({
  LinkComponent,
  label,
  Icon,
  children,
  variant,
}: NavItemProps) {
  const { collapsed } = useSidebar();

  return (
    <MenuItem
      icon={
        collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Icon className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {children}
              {label && (
                <span className="ml-auto text-muted-foreground">{label}</span>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Icon className="w-4 h-4" />
        )
      }
      component={LinkComponent}
      className={cn(
        'whitespace-nowrap text-sm font-medium',
        'hover:bg-muted dark:hover:text-white rounded-md',
        variant === 'default' ? 'dark:bg-muted dark:text-white' : '',
      )}
    >
      <div>
        {children}
        {label && (
          <span
            className={cn(
              'ml-auto',
              variant === 'default' && 'text-background dark:text-white',
            )}
          >
            {label}
          </span>
        )}
      </div>
    </MenuItem>
  );
}

export function SubNavItem({ label, Icon, children }: SubNavProps) {
  const { collapsed } = useSidebar();
  return (
    <SubMenu
      label={label}
      icon={<Icon className="w-4 h-4" />}
      className={cn('whitespace-nowrap text-sm font-medium')}
    >
      <div className={cn({ 'pl-2': !collapsed })}>{children}</div>
    </SubMenu>
  );
}
export default function Sidebar({
  children,
  header,
}: {
  children: ReactNode[];
  header: ReactNode;
}) {
  const { collapsed, toggled, toggleToggled, setCollapsed, setToggled } =
    useSidebar();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (isMobile) {
      setCollapsed(false);
    } else {
      setToggled(false);
    }
  }, [isMobile, collapsed, toggled]);

  return (
    <ProSidebar
      collapsed={collapsed}
      onBackdropClick={toggleToggled}
      toggled={toggled}
      breakPoint="md"
      className="h-screen w-fit"
      rootStyles={{
        border: 'none',
      }}
      collapsedWidth={'3.1rem'}
      backgroundColor={'hsl(var(--background))'}
    >
      <Menu
        rootStyles={{
          ['.ps-menuitem-root ']: {
            // width: collapsed ? "34px" : "100%",
          },
          ['.ps-submenu-content']: {
            backgroundColor: 'hsl(var(--background))',
            borderRadius: '0.45rem',
            border: collapsed ? '1px solid hsl(var(--border))' : 'none',
            padding: collapsed ? '4px' : 'none',
            marginTop: collapsed ? '4px' : 'none',
            marginBottom: collapsed ? '4px' : 'none',
          },
          ['.ps-menu-button']: {
            borderRadius: 'calc(var(--radius) - 2px)',
            backgroundColor: 'hsl(var(--background))',
            ['&:hover']: {
              backgroundColor: 'hsl(var(--default))',
              color: 'rgb(255 255 255 / var(--tw-text-opacity))',
            },

            border: 'none',
            height: '34px',
            paddingRight: collapsed ? '0px' : '8px',
            paddingLeft: '0px',
            ['.ps-menu-icon']: {
              height: '34px',
              width: '34px',
              margin: '0px',
            },
            ['.ps-submenu-expand-icon']: {
              right: '-4px',
              paddingBottom: collapsed ? '6px' : '4px',
            },
          },
        }}
      >
        <div className={cn('h-screen flex flex-col')}>
          <div
            className={cn(
              'flex items-center justify-center h-[55px] px-2 duration-300 ease-in-out',
            )}
          >
            {header}
          </div>
          <Separator />
          <div
            className={cn(
              'h-full flex flex-col py-2 pl-2 pr-2 gap-2 duration-300 ease-in-out overflow-y-auto pb-4',
              {
                'px-2': !collapsed,
              },
            )}
          >
            {children}
          </div>
        </div>
      </Menu>
    </ProSidebar>
  );
}
