import AppSidebar from '@/components/common/app-sidebar';
import AppBar from '@/components/common/app-topbar';
import { ThemeProvider } from '@/components/contexts/theme-provider';
import TransitionProvider from '@/components/contexts/transition-provider';
import { Toaster } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import cn from '../utils/cn';
import './globals.css';
import { getAuths } from '@/services/token.service';
import { getMe } from '@/services/user.service';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getMe();
  const auths = await getAuths();
  return (
    <html lang={'en'} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen w-full bg-background text-foreground font-sans antialiased',
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TransitionProvider>
            <TooltipProvider>
              <div className="flex w-full">
                <AppSidebar
                  user={user}
                  accounts={auths ?? []}
                  communities={communities}
                />
                <div className="flex flex-col w-full">
                  <AppBar user={user} />
                  {children}
                </div>
              </div>
            </TooltipProvider>
          </TransitionProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

const communities = [
  {
    slug: 'astu-muslim-jama',
    name: 'Astu Muslim Jama',
    image: '',
  },
  {
    slug: 'dodola-muslim-jama',
    name: 'Dodola Muslim Jama',
    image: '',
  },
  {
    slug: 'adama-muslim-jama',
    name: 'Adama Muslim Jama',
    image: '',
  },

  {
    slug: 'astu-muslim-jama2',
    name: 'Astu Muslim Jama',
    image: '',
  },
  {
    slug: 'dodola-muslim-jama2',
    name: 'Dodola Muslim Jama',
    image: '',
  },
  {
    slug: 'adama-muslim-jama2',
    name: 'Adama Muslim Jama',
    image: '',
  },

  {
    slug: 'astu-muslim-jama3',
    name: 'Astu Muslim Jama',
    image: '',
  },
  {
    slug: 'dodola-muslim-jama3',
    name: 'Dodola Muslim Jama',
    image: '',
  },
  {
    slug: 'adama-muslim-jama3',
    name: 'Adama Muslim Jama',
    image: '',
  },

  {
    slug: 'astu-muslim-jama4',
    name: 'Astu Muslim Jama',
    image: '',
  },
  {
    slug: 'dodola-muslim-jama4',
    name: 'Dodola Muslim Jama',
    image: '',
  },
  {
    slug: 'adama-muslim-jama4',
    name: 'Adama Muslim Jama',
    image: '',
  },

  {
    slug: 'astu-muslim-jama5',
    name: 'Astu Muslim Jama',
    image: '',
  },
  {
    slug: 'dodola-muslim-jama5',
    name: 'Dodola Muslim Jama',
    image: '',
  },
  {
    slug: 'adama-muslim-jama5',
    name: 'Adama Muslim Jama',
    image: '',
  },

  {
    slug: 'astu-muslim-jama6',
    name: 'Astu Muslim Jama',
    image: '',
  },
  {
    slug: 'dodola-muslim-jama6',
    name: 'Dodola Muslim Jama',
    image: '',
  },
  {
    slug: 'adama-muslim-jama6',
    name: 'Adama Muslim Jama',
    image: '',
  },

  {
    slug: 'astu-muslim-jama7',
    name: 'Astu Muslim Jama',
    image: '',
  },
  {
    slug: 'dodola-muslim-jama7',
    name: 'Dodola Muslim Jama',
    image: '',
  },
  {
    slug: 'adama-muslim-jama7',
    name: 'Adama Muslim Jama',
    image: '',
  },
];
