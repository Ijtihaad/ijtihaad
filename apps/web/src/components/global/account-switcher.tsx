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
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { UserRegisterForm } from '../forms/auth/register-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '@radix-ui/react-dropdown-menu';

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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogDescription className="">
            <Tabs
              defaultValue="login"
              className="w-full flex flex-col gap-4 justify-center "
            >
              <TabsList className=" w-fit -translate-x-2 -translate-y-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <Separator />
              <TabsContent value="login">
                <UserLoginForm />
              </TabsContent>
              <TabsContent value="register">
                <UserRegisterForm />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogContent>
      </Dialog>

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
            <SelectValue>
              {account && (
                <div className="flex items-center gap-2">
                  <Avatar className={cn('h-6 w-6 rounded-sm')}>
                    {account.image && (
                      <AvatarImage src={account.image} alt={account.username} />
                    )}
                    <AvatarFallback className={cn('rounded-sm')}>
                      {(account.username || account.email)[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <span>{account.username || account.email}</span>
                  )}
                </div>
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {accounts?.map((account) => (
              <SelectItem key={account.email} value={account.email}>
                <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                  <Avatar className={cn('h-6 w-6 rounded-sm')}>
                    {account.image && (
                      <AvatarImage src={account.image} alt={account.username} />
                    )}
                    <AvatarFallback className={cn('rounded-sm')}>
                      {account.email[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{account.email}</span>
                </div>
              </SelectItem>
            ))}
            {!!accounts?.length && <SelectSeparator />}
            <Button
              width={'full'}
              onClick={() => setOpenDialog(true)}
              className="flex gap-3 justify-start px-3 rounded-sm py-2"
            >
              <Plus className={cn('rounded-sm')} size={'1.2rem'} />
              <span>Add Account</span>
            </Button>
          </SelectContent>
        </Select>
      ) : (
        <Button
          width={collapsed ? 'icon' : 'full'}
          onClick={() => setOpenDialog(true)}
          className={cn(
            'flex gap-2 rounded-md',
            collapsed ? 'justify-center' : 'justify-start'
          )}
          variant={'default-outline'}
        >
          <Plus className={cn('rounded-sm')} />
          {!collapsed && <span>Add Account</span>}
        </Button>
      )}
    </>
  );
}
