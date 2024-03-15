"use client";

import { cn } from "@web/lib/utils";
import { History, Home, PersonStanding, SquareLibrary } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { MenuItem } from "react-pro-sidebar";
import { SidebarContext } from "../contexts/sidebar-provider";
import { Separator } from "../ui/separator";
import Sidebar, { NavItem, SubNavItem } from "../ui/sidebar";
import { AccountSwitcher } from "./account-switcher";

const links = [
  {
    title: "Home",
    icon: Home,
    href: "/",
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
  const { collapsed, toggled, toggleToggled, toggleCollapsed } =
    use(SidebarContext);
  return (
    <div className="h-screen flex">
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
