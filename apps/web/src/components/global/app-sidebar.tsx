"use client";

import { cn } from "@web/lib/utils";
import { History, Home, PersonStanding, SquareLibrary } from "lucide-react";
import Link from "next/link";
import { use } from "react";
import { MenuItem } from "react-pro-sidebar";
import { SidebarContext } from "../contexts/sidebar-provider";
import { Separator } from "../ui/separator";
import Sidebar, { NavItem } from "../ui/sidebar";
import { AccountSwitcher } from "./account-switcher";

const links = [
  {
    title: "Home",
    icon: <Home className="w-4 h-4" />,
    href: "/",
  },
  {
    title: "Library",
    icon: <SquareLibrary className="w-4 h-4" />,
    href: "/library",
  },
  {
    title: "History",
    icon: <History className="w-4 h-4" />,
    href: "history",
  },
];
export default function AppSidebar({ user }: { user: any }) {
  const { collapsed, toggled, toggleToggled, toggleCollapsed } =
    use(SidebarContext);
  return (
    <div className="h-screen flex">
      <Sidebar>
        <div
          className={cn(
            "flex items-center justify-center h-[55px]",
            collapsed ? "" : "px-2"
          )}
        >
          <MenuItem style={{all:"unset"}}>
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
          </MenuItem>
        </div>
        <Separator />

        <div
          className={cn("h-full flex flex-col py-2 pl-2 pr-2 gap-2", {
            "px-2": !collapsed,
          })}
        >
          {links.map((link, index) => (
            <NavItem
              key={link.href}
              icon={link.icon}
              LinkComponent={<Link href={link.href} />}
              variant={"ghost"}
            >
              {link.title}
            </NavItem>
          ))}
        </div>
      </Sidebar>
      <Separator orientation="vertical" />
    </div>
  );
}
