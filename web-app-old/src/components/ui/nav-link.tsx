import { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

export default function NavLink({
  title,
  label,
}: {
  title: string;
  label: string | ReactNode;
}) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>{label}</TooltipTrigger>
      <TooltipContent side="bottom" className="flex items-center gap-4">
        {title}
      </TooltipContent>
    </Tooltip>
  );
}
