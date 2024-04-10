'use client'

import { Bookmark, Flag, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function PostOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button width={'icon'} rounded={'full'} variant={'ghost'} size={'xs'}>
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
