'use client';

import { Button } from '@repo/shared-ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/shared-ui';
import { Bookmark, Flag, MoreHorizontal, Share2 } from 'lucide-react';

export default function CommentOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button width={'icon'} rounded={'full'} size={'sm'} variant={'ghost'}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex items-center gap-2">
          <Bookmark size={'1.2rem'} /> <span>Save</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Flag size={'1.2rem'} /> <span>Report</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
