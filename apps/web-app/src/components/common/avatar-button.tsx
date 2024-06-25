'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  cn,
} from '@repo/shared-ui';

export default function AvatarButton({
  showName,
  className,
}: {
  showName?: boolean;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Button width="icon" rounded={'full'} className="relative px-2">
        <Avatar className={cn('h-6 w-6 md:h-8 md:w-8', className)}>
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </Button>
      {showName && <p className="text-sm md:text-md">User name</p>}
    </div>
  );
}
