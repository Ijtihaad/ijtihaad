import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import cn from '@app/web/utils/cn';
import Link from 'next/link';

const linkVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
      },
      rounded: {
        default: 'rounded-md',
        left: 'rounded-l-full',
        right: 'rounded-r-full',
        both: 'rounded-r-full rounded-l-full',
        full: 'rounded-full',
      },
      variant: {
        default: 'bg-default text-default-foreground hover:bg-default/60',
        ghost: 'text-default-foreground hover:bg-default/90',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        success: 'bg-success text-success-foreground hover:bg-success/80',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/80',
        error: 'bg-error text-error-foreground hover:bg-error/80',

        link: 'text-primary underline-offset-4 hover:underline',

        'default-outline': 'border text-default-foreground hover:bg-default/60',
        'primary-outline':
          'border border-primary-foreground/40 bg-primary/20 text-primary-foreground/90 hover:bg-primary/30',
        'secondary-outline':
          'border border-secondary-foreground/40 bg-secondary/20 text-secondary-foreground/90 hover:bg-secondary/30',
        'success-outline':
          'border border-success-foreground/40 bg-success/20 text-success-foreground/90 hover:bg-success/30',
        'warning-outline':
          'border border-warning-foreground/40 bg-warning/20 text-warning-foreground/90 hover:bg-warning/30',
        'error-outline':
          'border border-error-foreground/40 bg-error/20 text-error-foreground/90 hover:bg-error/30',
      },
      width: {
        default: 'aspect-auto',
        icon: 'aspect-square p-1',
      },
    },
    defaultVariants: {
      size: 'default',
      width: 'default',
      variant: 'default',
      rounded: 'default',
    },
  }
);

export interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string;
  asChild?: boolean;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      size,
      width,
      variant,
      rounded,
      className,
      href,
      asChild = false,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        className={cn(
          linkVariants({ size, width, variant, rounded, className })
        )}
        ref={ref}
        href={href!}
        {...props}
      />
    );
  }
);
LinkButton.displayName = 'LinkButton';

export { LinkButton, linkVariants };
