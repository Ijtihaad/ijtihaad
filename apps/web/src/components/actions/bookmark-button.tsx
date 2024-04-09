'use client';

import React from 'react';
import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default function BookmarkButton() {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>
        <Button size={'xs'} variant={'icon'}>
          <Bookmark size={'1.2rem'} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="flex items-center gap-4">
        Bookmark
      </TooltipContent>
    </Tooltip>
  );
}
