import { UserLoginForm } from '@web/components/forms/auth/login-form';
import { buttonVariants } from '@web/components/ui/button';
import getTranslations from '@web/locales/getTranslations';
import cn from '@web/utils/cn';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default async function Page() {
  const t = await getTranslations();
  return (
    <div className="h-screen">
      <div className="h-full w-full flex ">
        <div className="relative hidden h-full flex-col bg-muted p-10 md:flex dark:border-r md:w-1/2">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="h-full w-full md:w-1/2 relative">
          <div className="absolute right-4 top-4 md:right-8 md:top-8">
            <Link
              href="/auth/register"
              className={cn(buttonVariants({ variant: 'ghost' }), 'self-end')}
            >
              Register
            </Link>
          </div>
          <div className="h-full flex flex-col justify-center p-4 lg:p-8">
            <UserLoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
