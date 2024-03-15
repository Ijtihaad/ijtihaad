"use client";

import { JSXElementConstructor, ReactElement, ReactNode, use } from "react";
import { Menu, MenuItem, Sidebar as ProSidebar } from "react-pro-sidebar";
import { SidebarContext } from "../contexts/sidebar-provider";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@web/components/ui/tooltip";
import { cn } from "@web/lib/utils";

interface NavProps {
  LinkComponent:
    | string
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;
  icon: ReactNode;
  label?: string;
  variant: "default" | "ghost";
  children: ReactNode;
}

export function NavItem({
  LinkComponent,
  label,
  icon,
  children,
  variant,
}: NavProps) {
  const { collapsed } = use(SidebarContext);
  return (
    <MenuItem
      icon={
        collapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>{icon}</TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {children}
              {label && (
                <span className="ml-auto text-muted-foreground">{label}</span>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          icon
        )
      }
      component={LinkComponent}
      className={cn(
        "whitespace-nowrap  text-sm font-medium",
        "hover:bg-muted dark:hover:text-white rounded-md",
        variant === "default" ? "dark:bg-muted dark:text-white" : ""
      )}
    >
      <div>
        {children}
        {label && (
          <span
            className={cn(
              "ml-auto",
              variant === "default" && "text-background dark:text-white"
            )}
          >
            {label}
          </span>
        )}
      </div>
    </MenuItem>
  );
}
export default function Sidebar({ children }: { children: ReactNode[] }) {
  const { collapsed, toggled, toggleToggled, toggleCollapsed } =
    use(SidebarContext);
  return (
    <ProSidebar
      collapsed={collapsed}
      onBackdropClick={toggleToggled}
      toggled={toggled}
      breakPoint="md"
      className="h-screen w-fit"
      rootStyles={{
        border: "none",
      }}
      collapsedWidth={"3.2rem"}
      backgroundColor={"hsl(var(--background))"}
    >
      <Menu
        rootStyles={{
          [".ps-menuitem-root "]: {
            width: collapsed ? "34px" : "100%",
          },
          [".ps-menu-button"]: {
            backgroundColor: "transparent",
            ["&:hover"]: {
              backgroundColor: "transparent",
            },
            border: "none",
            height: "34px",
            paddingRight: "0px",
            paddingLeft: "0px",
            [".ps-menu-icon"]: {
              height: "34px",
              width: "34px",
              margin: "0px",
            },
          },
        }}
      >
        <div className="h-screen flex flex-col">{children}</div>
      </Menu>
    </ProSidebar>
  );
}
