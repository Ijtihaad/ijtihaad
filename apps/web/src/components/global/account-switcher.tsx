"use client";

import { useEffect, useState } from "react";

import cn from "@web/utils/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@web/components/ui/select";
import useCookie from "@web/hooks/use-coockes";

interface AccountSwitcherProps {
  collapsed: boolean;
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
}

export function AccountSwitcher({ collapsed, accounts }: AccountSwitcherProps) {
  const { getCookie, setCookie } = useCookie();
  const [selectedAccount, setSelectedAccount] = useState<string>();

  useEffect(() => {
    if (selectedAccount) {
      setCookie("activeAccount", selectedAccount);
    }
  }, [selectedAccount]);

  useEffect(() => {
    async function setAccount() {
      const account = await getCookie("activeAccount");
      if (account) {
        setSelectedAccount(account);
      } else if (accounts.length) {
        setSelectedAccount(accounts[0].email);
      }
    }
    setAccount();
  }, []);

  if (!selectedAccount) {
    return <></>;
  }

  return (
    <Select defaultValue={selectedAccount} onValueChange={setSelectedAccount}>
      <SelectTrigger
        className={cn(
          "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
          collapsed &&
            "flex h-8 w-8 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}
        aria-label="Select account"
      >
        <SelectValue placeholder="Select an account">
          {accounts.find((account) => account.email === selectedAccount)?.icon}
          <span className={cn("ml-2", collapsed && "hidden")}>
            {
              accounts.find((account) => account.email === selectedAccount)
                ?.label
            }
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {accounts.map((account) => (
          <SelectItem key={account.email} value={account.email}>
            <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
              {account.icon}
              {account.email}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
