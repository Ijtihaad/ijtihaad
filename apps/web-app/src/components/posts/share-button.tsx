'use client';

import { Button } from '@repo/shared-ui';
import { Share } from 'lucide-react';

export default function ShareButton({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
  return (
    <Button
      size={size ?? 'sm'}
      rounded={'both'}
      className="flex items-center gap-2 pe-4"
    >
      <Share size="1.2rem" />
      <span className="text-sm">Share</span>
    </Button>
  );
}
