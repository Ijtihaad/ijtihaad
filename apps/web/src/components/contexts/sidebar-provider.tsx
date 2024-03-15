"use client";

import useMediaQuery from "@web/components/hooks/useMediaQuery";
import { createContext, useState } from "react";

export const SidebarContext = createContext({
  toggled: false,
  collapsed: false,
  sidebarRTL: false,
  setSidebarRTL: () => {},
  toggleToggled: () => {},
  toggleCollapsed: () => {},
});

export default function SideBarProvider({ children }: { children: any }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [sidebarRTL, setSidebarRrl] = useState(false);
  function toggleCollapsed() {
    if (isMobile) {
      toggleToggled();
      setCollapsed(false);
    } else {
      setToggled(false);
      setCollapsed((prev: boolean) => !prev);
    }
  }
  function toggleToggled() {
    setToggled((prev: boolean) => !prev);
  }
  function setSidebarRTL() {
    setSidebarRrl((prev: boolean) => !prev);
  }

  return (
    <SidebarContext.Provider
      value={{
        toggled,
        collapsed,
        sidebarRTL,
        setSidebarRTL,
        toggleToggled,
        toggleCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
