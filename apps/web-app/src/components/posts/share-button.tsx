'use client';

import { Button } from '@repo/shared-ui';
import { Share } from 'lucide-react';

export default function ShareButton({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
  return (
    <Button
      size={size ?? 'default'}
      className="flex items-center gap-2 pe-4 bg-muted/50 rounded-xl hover:bg-purple-500/30 hover:text-purple-500 duration-200 "
    >
      <Share size="1.2rem" />
      <span className="text-sm">Share</span>
    </Button>
  );
}
