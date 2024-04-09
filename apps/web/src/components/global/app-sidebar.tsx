"use client";

import cn from "@app/web/utils/cn";
import { History, Home, PersonStanding, SquareLibrary } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { SidebarContext } from "../contexts/sidebar-provider";
import { Separator } from "../ui/separator";
import Sidebar, { NavItem, SubNavItem } from "../ui/sidebar";
import { AccountSwitcher } from "./account-switcher";

const links = [
  {
    title: "Home",
    icon: Home,
    href: "/posts",
  },
  {
    title: "Library",
    icon: SquareLibrary,
    href: "/library",
  },
  {
    title: "History",
    icon: History,
    href: "history",
  },
];

export default function AppSidebar({ user }: { user: any }) {
  const { collapsed } = use(SidebarContext);
  return (
    <div className="h-screen flex sticky top-0">
      <Sidebar
        header={
          <AccountSwitcher
            collapsed={collapsed}
            accounts={[
              {
                email: "harunjeylan@gmail.com",
                icon: <PersonStanding className="w-4 h-4" />,
                label: "Harun Jeylan",
              },
              {
                email: "abdu@gmail.com",
                icon: <PersonStanding className="w-4 h-4" />,
                label: "Abdurahman",
              },
            ]}
          />
        }
      >
        {links.map((link, index) => (
          <NavItem
            key={link.href}
            Icon={link.icon}
            LinkComponent={<Link href={link.href} />}
            variant={"ghost"}
          >
            {link.title}
          </NavItem>
        ))}
        <Separator />
        <SubNavItem Icon={SquareLibrary} variant="ghost" label="Subtitle">
          <div className={cn("flex flex-col gap-2")}>
            {links.map((link, index) => (
              <NavItem
                key={link.href}
                Icon={link.icon}
                LinkComponent={<Link href={link.href} />}
                variant={"ghost"}
              >
                {link.title}
              </NavItem>
            ))}
          </div>
        </SubNavItem>
      </Sidebar>
      <Separator orientation="vertical" />
    </div>
  );
}
