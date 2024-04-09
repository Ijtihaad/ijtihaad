"use client"

import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function AvatarButton({ showName }: { showName?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Button width="icon" rounded={'full'} size={'sm'} className="relative">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </Button>
      {showName && <h6>User name</h6>}
    </div>
  );
}
