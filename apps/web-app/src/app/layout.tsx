import { Toaster, TooltipProvider, cn } from '@repo/shared-ui';
import { ThemeProvider } from '../components/contexts/theme-provider';
import './globals.css';
import MainSidebar from '@/components/common/main-sidebar';
import MainTopBar from '@/components/common/main-topbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen w-full font-sans antialiased ')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <MainTopBar />
            <div className="w-full flex">
              <MainSidebar />
              {children}
            </div>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
