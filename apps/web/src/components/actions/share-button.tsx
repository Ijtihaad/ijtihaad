'use client';

import { Share } from 'lucide-react';
import { Button } from '../ui/button';

export default function ShareButton() {
  return (
    <Button size={'sm'} rounded={'both'} contain={'default'} className="flex items-center gap-2 pe-4">
      <Share size={'1.2rem'} />
      <span>Share</span>
    </Button>
  );
}
