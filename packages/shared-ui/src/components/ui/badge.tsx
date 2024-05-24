import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 rounded-full drop-shadow-lg py-0 px-1.5 aspect-auto flex items-center  text-subtitle whitespace-nowrap text-sm font-medium transition-colors text-center align-middle',
  {
    variants: {
      variant: {
        default: 'bg-default text-default-foreground  hover:bg-default/60',
        ghost: 'text-default-foreground  hover:bg-default/90',
        primary: 'bg-primary text-primary-foreground  hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
        success: 'bg-success text-success-foreground  hover:bg-success/80',
        warning: 'bg-warning text-warning-foreground  hover:bg-warning/80',
        error: 'bg-error text-error-foreground  hover:bg-error/80',

        link: 'text-primary underline-offset-4 hover:underline',

        'default-outline':
          'border text-default-foreground  hover:bg-default/60',
        'primary-outline':
          'border border-primary/75 text-primary bg-primary/5 hover:bg-primary/10',
        'secondary-outline':
          'border border-secondary/75 text-secondary bg-secondary/5 hover:bg-secondary/10',
        'success-outline':
          'border border-success/75 text-success bg-success/5 hover:bg-success/10',
        'warning-outline':
          'border border-warning/75 text-warning bg-warning/5 hover:bg-warning/10',
        'error-outline':
          'border border-error/75  text-error bg-error/5 hover:bg-error/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.ButtonHTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp
        className={cn(
          badgeVariants({
            variant,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
