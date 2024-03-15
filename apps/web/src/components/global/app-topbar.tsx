"use client";

import { Bell, Menu, Plus, Search } from "lucide-react";
import { ReactNode, use } from "react";
import { SidebarContext } from "../contexts/sidebar-provider";
import { ModeToggle } from "../ui/ModeToggle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LinkButton } from "../ui/link-button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { UserNav } from "./user-nav";

export default function AppBar() {
  const { toggleCollapsed } = use(SidebarContext);
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center gap-2 p-2">
        <div>
          <Button variant="outline" size="icon" onClick={toggleCollapsed}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1">
          <div className="w-fit bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4">
          <NavLink
            label={
              <Button variant="outline" size={"icon"}>
                <Bell className="h-4 w-4" />
              </Button>
            }
            title="Notification"
          />
          <NavLink
            label={
              <LinkButton
                href="/hello"
                variant="outline"
                className="flex items-center gap-2 px-4"
              >
                <Plus className="h-4 w-4" />
                <span>Create</span>
              </LinkButton>
            }
            title="Create Question"
          />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
      <Separator />
    </div>
  );
}
function NavLink({
  title,
  label,
}: {
  title: string;
  label: string | ReactNode;
}) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger asChild>{label}</TooltipTrigger>
      <TooltipContent side="bottom" className="flex items-center gap-4">
        {title}
      </TooltipContent>
    </Tooltip>
  );
}
