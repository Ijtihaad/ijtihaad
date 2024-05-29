'use client';

import cn from '@/utils/cn';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button, buttonVariants } from '../ui/button';

export default function ApprovalButtons({
  size,
}: {
  size?: 'xs' | 'sm' | 'lg';
}) {
  return (
    <div className={cn('flex items-center gap-1 bg-default rounded-full')}>
      <Button
        size={size ?? 'sm'}
        variant={'ghost'}
        width={'icon'}
        rounded={'full'}
        className="p-0 hover:border"
      >
        <CheckCircle />
      </Button>

      <span className="text-sm">{56}</span>

      <Button
        size={size ?? 'sm'}
        variant={'ghost'}
        width={'icon'}
        rounded={'full'}
        className="p-0 hover:border"
      >
        <XCircle />
      </Button>
    </div>
  );
}
