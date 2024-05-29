import cn from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const textareaVariants = cva(
  'flex min-h-[60px] w-full rounded-md bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      rounded: {
        default: 'rounded-md',
        left: 'rounded-tl-full rounded-bl-full',
        right: 'rounded-tr-full rounded-br-full',
        both: 'rounded-tr-full rounded-br-full rounded-tl-full rounded-bl-full',
        full: 'rounded-full',
      },
      variant: {
        default: 'border text-default-foreground  focus-visible:bg-default/20',
        ghost: 'text-default-foreground ',
        primary:
          'border border-primary-foreground/40 bg-primary/30 text-primary-foreground/90  focus-visible:bg-primary/20',
        secondary:
          'border border-secondary-foreground/40 bg-secondary/30 text-secondary-foreground/90  focus-visible:bg-secondary/20',
        success:
          'border border-success-foreground/40 bg-success/30 text-success-foreground/90  focus-visible:bg-success/20',
        warning:
          'border border-warning-foreground/40 bg-warning/30 text-warning-foreground/90  focus-visible:bg-warning/20',
        error:
          'border border-error-foreground/40 bg-error/30 text-error-foreground/90  focus-visible:bg-error/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default',
    },
  },
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant, rounded, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({
            variant,
            rounded,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
