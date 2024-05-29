'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <div className="relative h-screen w-full flex justify-center items-center">
        <div className="flex flex-col gap-2 w-full h-full justify-center items-center py-10">
          <Image
            src="/error/error3.png"
            width={300}
            height={200}
            alt="not found"
            className="w-fit object-cover"
            priority={false}
          />
          <h4 className="text-title">Something went wrong!</h4>
          <Button
            onClick={() => reset()}
            className="btn-primary py-4 px-6"
            variant="default"
          >
            Try again
          </Button>
        </div>
      </div>
    </>
  );
}
