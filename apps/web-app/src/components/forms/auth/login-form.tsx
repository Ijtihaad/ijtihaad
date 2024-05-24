'use client';

import { userLoginSchema } from '@common';
import { zodResolver } from '@hookform/resolvers/zod';
import { TransitionContext } from '@web/components/contexts/transition-provider';
import { Button } from '@web/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@web/components/ui/form';
import { Icons } from '@web/components/ui/icons';
import { Input } from '@web/components/ui/input';
import { useToast } from '@web/components/ui/toast';
import loginWithEmail from '@web/data/auth/login-with-email';
import { TranslationContext } from '@web/locales/TranslationContext';
import cn from '@web/utils/cn';
import Link from 'next/link';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function UserLoginForm() {
  const { handleServerMutation, isMutating } = use(TransitionContext);
  const { toast } = useToast();
  const { t } = use(TranslationContext);
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof userLoginSchema>) {
    handleServerMutation(async () => {
      const result = await loginWithEmail(values);
      if (!result.success) {
        const snackbarKey = toast({
          description: result.message,
          variant: 'error',
        });
      } else {
        const snackbarKey = toast({
          description: result.message,
          variant: 'success',
        });
      }
    });
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('auth.loginTitle')}
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className={cn('grid gap-6')}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="col-span-2" disabled={isMutating}>
                {isMutating && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button variant="default-outline" type="button" disabled={isMutating}>
          {isMutating ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.gitHub className="mr-2 h-4 w-4" />
          )}{' '}
          GitHub
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link
          href="/terms"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="/privacy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}