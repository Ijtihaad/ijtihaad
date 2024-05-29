'use client';

import cn from '@/utils/cn';
import { Button } from '@repo/shared-ui';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

export default function VoteButtons({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
  return (
    <div className={cn('flex items-center gap-1 bg-default rounded-full')}>
      <Button
        size={size ?? 'sm'}
        variant={'ghost'}
        width={'icon'}
        rounded={'full'}
        className="p-0 hover:border"
      >
        <ArrowBigUp />
      </Button>

      <span className="text-sm">{56}</span>

      <Button
        size={size ?? 'sm'}
        variant={'ghost'}
        width={'icon'}
        rounded={'full'}
        className="p-0 hover:border"
      >
        <ArrowBigDown />
      </Button>
    </div>
  );
}
