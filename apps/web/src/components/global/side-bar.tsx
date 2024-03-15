"use client";
import { cn } from "@web/lib/utils";
import {
  Archive,
  ArchiveX,
  File,
  FileQuestion,
  HelpCircle,
  History,
  Home,
  Inbox,
  MessageSquareDiff,
  PersonStanding,
  Scale,
  ScrollText,
  Send,
  SquareLibrary,
  Trash2,
} from "lucide-react";
import { use } from "react";
import { AccountSwitcher } from "./account-switcher";
import { Nav } from "./nav";
import { SideBarContext } from "../contexts/side-bar-provider";
import { Separator } from "../ui/separator";
import { UserNav } from "./user-nav";

export default function SideBar() {
  const { isCollapsed } = use(SideBarContext);
  return (
    <div className="h-screen flex">
      <div
        className={cn(
          isCollapsed && " min-w-[50px] transition-all duration-300 ease-in-out"
        )}
      >
        <div
          className={cn(
            "flex py-2 items-center justify-center",
            isCollapsed ? "" : "px-2"
          )}
        >
          <AccountSwitcher
            isCollapsed={isCollapsed}
            accounts={[
              {
                email: "harunjeylan@gmail.com",
                icon: <PersonStanding />,
                label: "Harun Jeylan",
              },
            ]}
          />
        </div>
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Home",
              icon: Home,
              variant: "ghost",
            },
            {
              title: "Library",
              icon: SquareLibrary,
              variant: "ghost",
            },
            {
              title: "History",
              icon: History,
              variant: "ghost",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "About",
              icon: FileQuestion,
              variant: "ghost",
            },
            {
              title: "Help",
              label: "",
              icon: HelpCircle,
              variant: "ghost",
            },
          ]}
        />
        <Separator />
        <Nav
          isCollapsed={isCollapsed}
          links={[
            {
              title: "Private Policy",
              icon: Scale,
              variant: "ghost",
            },
            {
              title: "Content Policy",
              label: "",
              icon: ScrollText,
              variant: "ghost",
            },
          ]}
        />
      </div>
      <Separator orientation="vertical" />
    </div>
  );
}
