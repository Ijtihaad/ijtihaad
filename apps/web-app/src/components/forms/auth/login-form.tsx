'use client';

import { useMutation } from '@/components/hooks/use-mutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocalLogin, localLoginSchema } from '@repo/common';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icons,
  Input,
  cn,
  useToast,
} from '@repo/shared-ui';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export function UserLoginForm() {
  const { startMutation, isMutating } = useMutation();
  const { toast } = useToast();

  const form = useForm<LocalLogin>({
    resolver: zodResolver(localLoginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  async function onSubmit(values: LocalLogin) {
    startMutation(async () => {
      // const data = await login(values);
      // if (data && 'error' in data) {
      //   toast({
      //     description: data.message,
      //     variant: 'error',
      //   });
      // } else {
      //   toast({
      //     description: 'You Have Login Successfully',
      //     variant: 'success',
      //   });
      // }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center space-y-6 bg-card-light dark:bg-card-dark/35 border p-8 rounded-md">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Login to Order
        </h1>
        <p className="text-sm ">
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
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="h-12"
                          placeholder="username or name@example.com"
                          type="text"
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
                        <Input className="h-12" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                color={'primary'}
                className="col-span-2 text-white"
                disabled={isMutating}
              >
                {isMutating && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <p className="px-8 text-center text-sm ">
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
