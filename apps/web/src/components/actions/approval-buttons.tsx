'use client';

import cn from '@app/web/utils/cn';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';

export default function ApprovalButtons() {
  return (
    <div className={cn('flex items-center gap-1')}>
      <Button
        size={'xs'}
        variant={'success-outline'}
        rounded={'both'}
        className={cn('flex items-center gap-1 ps-1 pe-3 py-1')}
      >
        <CheckCircle size={'1.2rem'} />
        <p className="">{56}</p>
      </Button>

      <Button
        size={'xs'}
        variant={'error-outline'}
        rounded={'both'}
        className={cn('flex items-center gap-1 ps-1 pe-3 py-1')}
      >
        <XCircle size={'1.2rem'} />
        <p className="">{56}</p>
      </Button>
    </div>
  );
}
