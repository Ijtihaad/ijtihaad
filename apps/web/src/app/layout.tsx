import SidebarProvider from "@web/components/contexts/sidebar-provider";
import { ThemeProvider } from "@web/components/contexts/theme-provider";
import AppSidebar from "@web/components/global/app-sidebar";
import AppBar from "@web/components/global/app-topbar";
import { TooltipProvider } from "@web/components/ui/tooltip";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "../lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SidebarProvider>
              <div className="flex w-full">
                <AppSidebar user={null} />

                <div className="flex flex-col w-full ">
                  <AppBar />
                  {children}
                </div>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
