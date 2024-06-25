import MainBottomBar from '@/components/common/main-bottom-bar';
import MainSideBar from '@/components/common/main-side-bar';
import MainTopBar from '@/components/common/main-top-bar';
import { Toaster, TooltipProvider, cn } from '@repo/shared-ui';
import { ThemeProvider } from '../components/contexts/theme-provider';
import './globals.css';

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
              <MainSideBar />
              <div className="w-full">
                {children}
                <div className='py-12 lg:py-0' />
              </div>
            </div>
            <MainBottomBar />
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
