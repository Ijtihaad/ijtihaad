'use client';

import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      rounded={'full'}
      width={'icon'}
      variant={'default'}
    >
      <ArrowLeft />
    </Button>
  );
}
