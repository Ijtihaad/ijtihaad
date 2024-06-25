'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import * as SideBarPrimitive from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const SideBarTrigger = SideBarPrimitive.Trigger;

const SideBarClose = SideBarPrimitive.Close;

const SideBarPortal = SideBarPrimitive.Portal;

const SideBarMenuContext = React.createContext<{
  collapsed: boolean;
  isBraked: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onCollapseChange?: (callback: (collapse: boolean) => void) => void;
}>({
  collapsed: false,
  isBraked: false,
  setCollapsed: (...arg: any) => { },
  onCollapseChange: (callback) => {
    callback(false);
  },
});

const SideBar = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Root> & {
    collapse?: boolean;
    brakePoint?: string;
    onCollapseChange?: (value: boolean) => void;
  }
>(
  (
    { collapse = false, brakePoint = '1024px', onCollapseChange, ...props },
    ref,
  ) => {
    const [collapsed, setCollapsed] = React.useState(collapse);
    const isBraked = useMediaQuery(`(max-width: ${brakePoint})`);

    React.useEffect(() => {
      if (typeof onCollapseChange === 'function') {
        onCollapseChange(collapsed);
      }
    }, [collapsed]);

    React.useEffect(() => {
      setCollapsed(collapse);
    }, [collapse]);

    React.useEffect(() => {
      setCollapsed(isBraked);
    }, [isBraked]);

    return (
      <SideBarMenuContext.Provider
        value={{ collapsed, setCollapsed, isBraked }}
      >
        <SideBarPrimitive.Root {...props} />
      </SideBarMenuContext.Provider>
    );
  },
);
SideBar.displayName = SideBarPrimitive.Root.displayName;

export interface SideBarCollapseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SideBarCollapse = React.forwardRef<
  HTMLButtonElement,
  SideBarCollapseProps
>(({ className, children, asChild, ...props }, ref) => {
  const { setCollapsed } = React.useContext(SideBarMenuContext);
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      {...props}
      ref={ref}
      onClick={() => {
        setCollapsed((value) => !value);
      }}
    >
      {children}
    </Comp>
  );
});

export interface SideBarMenuProps extends React.HTMLAttributes<HTMLElement> { }

const SideBarMenu = React.forwardRef<HTMLElement, SideBarMenuProps>(
  ({ className, children, ...props }, ref) => {
    const { collapsed } = React.useContext(SideBarMenuContext)
    return (
      <nav
        ref={ref}
        className={cn('flex flex-col items-start gap-2', collapsed ? "px-1" : "px-2", className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

export interface SideBarMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  label?: string;
}

const SideBarMenuItem = React.forwardRef<HTMLDivElement, SideBarMenuItemProps>(
  ({ icon, label, className, children, ...props }, ref) => {
    const { collapsed, isBraked } = React.useContext(SideBarMenuContext);
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'w-full flex items-center gap-3 text-start',
              collapsed ? "justify-center" : "justify-start",
              className,
            )}
            ref={ref}
            {...props}
          >
            {icon}
            {(!collapsed || isBraked) && children}
            {label && <span className="sr-only">{label}</span>}
          </div>
        </TooltipTrigger>
        {collapsed && !isBraked && label && (
          <TooltipContent side="right" ref={ref} className="bg-popover">
            {label}
          </TooltipContent>
        )}
      </Tooltip>
    );
  },
);

SideBarMenuItem.displayName = 'SideBarMenuItem';

const SideBarOverlay = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SideBarPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SideBarOverlay.displayName = SideBarPrimitive.Overlay.displayName;

const sidebarVariants = cva(
  'z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface SideBarContentProps
  extends React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Content>,
  VariantProps<typeof sidebarVariants> {
  maxWidth?: string;
}

const SideBarContent = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Content>,
  SideBarContentProps
>(
  (
    { side = 'right', maxWidth = '24rem', className, children, ...props },
    ref,
  ) => {
    const { collapsed, isBraked } = React.useContext(SideBarMenuContext);

    if (!isBraked) {
      return (
        <aside
          className={cn(
            sidebarVariants({ side }),
            collapsed ? 'w-fit' : 'w-full',
            'duration-500 ease-in-out',
            className,
          )}
          style={{ maxWidth }}
        >
          {children}
        </aside>
      );
    }

    return (
      <SideBarPortal>
        <SideBarOverlay />
        <SideBarPrimitive.Content
          ref={ref}
          className={cn(
            sidebarVariants({ side }),
            className,
            'fixed inset-y-0',
          )}
          {...props}
        >
          {children}
          <SideBarPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SideBarPrimitive.Close>
        </SideBarPrimitive.Content>
      </SideBarPortal>
    );
  },
);

SideBarContent.displayName = SideBarPrimitive.Content.displayName;

const SideBarHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
);
SideBarHeader.displayName = 'SideBarHeader';

const SideBarFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className,
    )}
    {...props}
  />
);
SideBarFooter.displayName = 'SideBarFooter';

const SideBarTitle = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SideBarPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SideBarTitle.displayName = SideBarPrimitive.Title.displayName;

const SideBarDescription = React.forwardRef<
  React.ElementRef<typeof SideBarPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SideBarPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SideBarPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SideBarDescription.displayName = SideBarPrimitive.Description.displayName;

export {
  SideBar,
  SideBarClose,
  SideBarCollapse,
  SideBarContent,
  SideBarDescription,
  SideBarFooter,
  SideBarHeader,
  SideBarMenu,
  SideBarMenuItem,
  SideBarOverlay,
  SideBarPortal,
  SideBarTrigger,
};
