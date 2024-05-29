'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import * as SidebarPrimitive from '@radix-ui/react-dialog';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

const SidebarTrigger = SidebarPrimitive.Trigger;

const SidebarClose = SidebarPrimitive.Close;

const SidebarPortal = SidebarPrimitive.Portal;

const SidebarMenuContext = React.createContext<{
  collapsed: boolean;
  isBraked: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  onCollapseChange?: (callback: (collapse: boolean) => void) => void;
}>({
  collapsed: false,
  isBraked: false,
  setCollapsed: (...arg: any) => {},
  onCollapseChange: (callback) => {
    callback(false);
  },
});

const Sidebar = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SidebarPrimitive.Root> & {
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
      <SidebarMenuContext.Provider
        value={{ collapsed, setCollapsed, isBraked }}
      >
        <SidebarPrimitive.Root {...props} />
      </SidebarMenuContext.Provider>
    );
  },
);
Sidebar.displayName = SidebarPrimitive.Root.displayName;

export interface SidebarCollapseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const SidebarCollapse = React.forwardRef<
  HTMLButtonElement,
  SidebarCollapseProps
>(({ className, children, asChild, ...props }, ref) => {
  const { setCollapsed } = React.useContext(SidebarMenuContext);
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

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLElement> {}

const SidebarMenu = React.forwardRef<HTMLElement, SidebarMenuProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('flex flex-col items-start gap-2 px-2', className)}
        {...props}
      >
        {children}
      </nav>
    );
  },
);

export interface SidebarMenuItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  label?: string;
}

const SidebarMenuItem = React.forwardRef<HTMLDivElement, SidebarMenuItemProps>(
  ({ icon, label, className, children, ...props }, ref) => {
    const { collapsed, isBraked } = React.useContext(SidebarMenuContext);
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              'w-full flex items-center gap-3 text-start',
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

SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarOverlay = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SidebarPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SidebarPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
    ref={ref}
  />
));
SidebarOverlay.displayName = SidebarPrimitive.Overlay.displayName;

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

interface SidebarContentProps
  extends React.ComponentPropsWithoutRef<typeof SidebarPrimitive.Content>,
    VariantProps<typeof sidebarVariants> {
  maxWidth?: string;
}

const SidebarContent = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.Content>,
  SidebarContentProps
>(
  (
    { side = 'right', maxWidth = '24rem', className, children, ...props },
    ref,
  ) => {
    const { collapsed, isBraked } = React.useContext(SidebarMenuContext);

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
      <SidebarPortal>
        <SidebarOverlay />
        <SidebarPrimitive.Content
          ref={ref}
          className={cn(
            sidebarVariants({ side }),
            className,
            'fixed inset-y-0',
          )}
          {...props}
        >
          {children}
          <SidebarPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SidebarPrimitive.Close>
        </SidebarPrimitive.Content>
      </SidebarPortal>
    );
  },
);

SidebarContent.displayName = SidebarPrimitive.Content.displayName;

const SidebarHeader = ({
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
SidebarHeader.displayName = 'SidebarHeader';

const SidebarFooter = ({
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
SidebarFooter.displayName = 'SidebarFooter';

const SidebarTitle = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SidebarPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SidebarPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SidebarTitle.displayName = SidebarPrimitive.Title.displayName;

const SidebarDescription = React.forwardRef<
  React.ElementRef<typeof SidebarPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SidebarPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SidebarPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SidebarDescription.displayName = SidebarPrimitive.Description.displayName;

export {
  Sidebar,
  SidebarClose,
  SidebarCollapse,
  SidebarContent,
  SidebarDescription,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarOverlay,
  SidebarPortal,
  SidebarTrigger,
};
