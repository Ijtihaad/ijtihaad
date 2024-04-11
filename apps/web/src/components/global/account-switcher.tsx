'use client';

import { use, useState } from 'react';

import { AuthUser } from '@common';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@web/components/ui/select';
import { setAccount } from '@web/data/auth/authentications';
import cn from '@web/utils/cn';
import { Plus, X } from 'lucide-react';
import { TransitionContext } from '../contexts/transition-provider';
import { UserLoginForm } from '../forms/auth/login-form';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button, buttonVariants } from '../ui/button';

export function AccountSwitcher({
  collapsed,
  accounts,
  account,
}: {
  collapsed: boolean;
  account?: AuthUser['user'] | null;
  accounts?: AuthUser['user'][];
}) {
  const { handleServerMutation, isMutating } = use(TransitionContext);
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      {openDialog && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpenDialog(false)}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 0translate-y-1/2 flex flex-col gap-2 max-w-4xl bg-background p-8">
            <div className="flex justify-end">
              <Button onClick={() => setOpenDialog(false)} width={'icon'}>
                <X />
              </Button>
            </div>
            <UserLoginForm />
          </div>
        </div>
      )}
      {accounts?.length ? (
        <Select
          defaultValue={account?.email}
          onValueChange={(value) => {
            handleServerMutation(async () => {
              await setAccount(value);
            });
          }}
        >
          <SelectTrigger
            className={cn(
              'flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
              collapsed &&
                'flex h-8 w-8 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden'
            )}
            aria-label="Select account"
          >
            <SelectValue placeholder="Select an account">
              {account ? (
                <div className="flex items-center gap-2">
                  <Avatar className={cn('h-6 w-6')}>
                    {account.image && (
                      <AvatarImage src={account.image} alt={account.username} />
                    )}
                    <AvatarFallback>
                      {(account.username || account.email)[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <span>{account.username || account.email}</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className={cn('bg-default p-1 rounded-full')}>
                    <Plus />
                  </div>
                  {!collapsed && <span>Select Account</span>}
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {accounts?.map((account) => (
              <SelectItem key={account.email} value={account.email}>
                <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  <Avatar className={cn('h-6 w-6')}>
                    {account.image && (
                      <AvatarImage src={account.image} alt={account.username} />
                    )}
                    <AvatarFallback>
                      {account.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {account.email}
                </div>
              </SelectItem>
            ))}
            {!!accounts?.length && <SelectSeparator />}
            <Button
              width={'full'}
              onClick={() => setOpenDialog(true)}
              className="flex gap-2"
            >
              <Plus />
              Add Account
            </Button>
          </SelectContent>
        </Select>
      ) : (
        <Button
          width={collapsed ? 'icon' : 'full'}
          onClick={() => setOpenDialog(true)}
          className="flex gap-2"
          variant={'default-outline'}
        >
          <Plus />
          {!collapsed && <span>Add Account</span>}
        </Button>
      )}
    </>
  );
}
