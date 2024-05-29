import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const variants = {
  contain: {
    primary: 'bg-primary text-primary-foreground  hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
    success: 'bg-success text-foreground  hover:bg-success/80',
    warning: 'bg-warning text-foreground  hover:bg-warning/80',
    error: 'bg-error text-foreground  hover:bg-error/80',
  },
  outline: {
    primary: 'border-primary/75 text-primary bg-primary/5 hover:bg-primary/10',
    secondary:
      'border-secondary/75 text-secondary bg-secondary/5 hover:bg-secondary/10',
    success: 'border-success/75 text-success bg-success/5 hover:bg-success/10',
    warning: 'border-warning/75 text-warning bg-warning/5 hover:bg-warning/10',
    error: 'border-error/75  text-error bg-error/5 hover:bg-error/10',
  },
  link: {
    primary: 'text-primary bg-primary/5 ',
    secondary: 'text-secondary bg-secondary/5 ',
    success: 'text-success bg-success/5 ',
    warning: 'text-warning bg-warning/5 ',
    error: 'text-error bg-error/5 ',
  },
};

const badgeVariants = cva(
  'absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 rounded-full drop-shadow-lg py-0 px-1.5 aspect-auto flex items-center  text-subtitle whitespace-nowrap text-sm font-medium transition-colors text-center align-middle',
  {
    variants: {
      size: {
        default: 'h-12 px-4 py-2',
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        xl: 'h-12 px-8',
      },
      rounded: {
        default: 'rounded-md',
        left: 'rounded-l-full',
        right: 'rounded-r-full',
        both: 'rounded-r-full rounded-l-full',
        full: 'rounded-full',
      },
      variant: {
        contain: '',
        outline: 'border',
        link: 'underline-offset-4 hover:underline',
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        error: '',
      },
      width: {
        default: 'aspect-auto',
        icon: 'aspect-square p-2',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
      variant: 'contain',
      rounded: 'default',
      width: 'default',
    },
  },
);

export interface BadgeProps
  extends Omit<React.ButtonHTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      size,
      width,
      variant,
      rounded,
      color,
      className,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'span';
    const selectedVariant = variant ? variants[variant] : variants.contain;
    const selectedColor = color
      ? selectedVariant[color]
      : 'hover:bg-accent/80 dark:hover:bg-accent/80 text-foreground';

    return (
      <Comp
        className={cn(
          badgeVariants({
            size,
            width,
            variant,
            rounded,
            className,
          }),
          selectedColor,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
