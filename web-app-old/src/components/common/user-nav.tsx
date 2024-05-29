'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  useToast,
} from '@repo/shared-ui';
import Link from 'next/link';

export function UserNav({ user }: { user: any }) {
  const { toast } = useToast();
  async function onLogout() {
    // const result = await logout();
    // if (!result.success) {
    //   const snackbarKey = toast({
    //     description: result.message,
    //     variant: 'error',
    //   });
    // } else {
    //   const snackbarKey = toast({
    //     description: result.message,
    //     variant: 'success',
    //   });
    // }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button width="icon" rounded={'full'} className="relative">
          <Avatar className="h-9 w-9">
            {user.image && (
              <AvatarImage src={user.image} alt={user.firstName} />
            )}
            <AvatarFallback>
              {`${user.firstName.at(0)}${user.lastName.at(0)}`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/setting/profile">
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/setting/account">
              Account
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/setting/appearance">
              Appearance
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/setting/display">Display</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="cursor-pointer">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
