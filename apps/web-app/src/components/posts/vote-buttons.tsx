'use client';

import { Button, cn } from '@repo/shared-ui';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';

export default function VoteButtons({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
  return (
    <div className={cn('flex items-center gap-2 bg-muted rounded-2xl')}>
      <Button
        size={size ?? 'default'}
        width={'icon'}
        className="p-0 hover:bg-success/30 hover:text-success rounded-xl duration-200"
      >
        <ArrowBigUp />
      </Button>

      <span className="text-md">{56}</span>

      <Button
        size={size ?? 'default'}
        width={'icon'}
        className="p-0 hover:bg-warning/30 hover:text-warning rounded-xl duration-200"
      >
        <ArrowBigDown />
      </Button>
    </div>
  );
}
