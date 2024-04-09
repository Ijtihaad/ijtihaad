'use client';

import cn from '@app/web/utils/cn';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { Button } from '../ui/button';

export default function VoteButtons() {
  return (
    <div className={cn('flex items-center gap-1 bg-default rounded-full')}>
      <Button size={'sm'} variant={'ghost'} width={'icon'} rounded={'full'} className="p-0 hover:border">
        <ArrowBigDown className="h-6 w-6" />
      </Button>

      <p className="text-body">{56}</p>

      <Button size={'sm'} variant={'ghost'} width={'icon'} rounded={'full'} className="p-0 hover:border">
        <ArrowBigUp className="h-6 w-6" />
      </Button>
    </div>
  );
}
