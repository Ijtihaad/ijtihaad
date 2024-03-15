"use client";
import { ReactNode, createContext, useState } from "react";

export const SideBarContext = createContext({
  isCollapsed: false,
  setIsCollapsed: (boolean: boolean) => {},
});
export default function SideBarProvider({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const value = {
    isCollapsed,
    setIsCollapsed,
  };
  return (
    <SideBarContext.Provider value={value}>
      {children}
    </SideBarContext.Provider>
  );
}
