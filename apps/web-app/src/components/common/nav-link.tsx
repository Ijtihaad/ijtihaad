import { Tooltip, TooltipContent, TooltipTrigger, cn } from '@repo/shared-ui';
import { ReactNode } from 'react';

export default function NavLink({
  title,
  label,
  className,
}: {
  title: string;
  label: string | ReactNode;
  className?: string;
}) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild className={cn(className)}>
        {label}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="flex items-center gap-4">
        {title}
      </TooltipContent>
    </Tooltip>
  );
}
