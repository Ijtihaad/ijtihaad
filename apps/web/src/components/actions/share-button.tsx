'use client';

import { Share } from 'lucide-react';
import { Button } from '../ui/button';

export default function ShareButton({ size }: { size?: 'xs' | 'sm' | 'lg' }) {
  return (
    <Button
      size={size ?? 'sm'}
      rounded={'both'}
      className="flex items-center gap-2 pe-4"
    >
      <Share />
      <span className="text-sm">Share</span>
    </Button>
  );
}
