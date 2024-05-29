'use client';

import { Button, Separator, useMediaQuery } from '@repo/shared-ui';
import { Bell, MenuIcon, PanelLeft } from 'lucide-react';
import { ThemeToggle } from '../common/theme-toggle';
import { useMainSidebar } from './main-sidebar';

export default function MainTopBar({
  noSildebar,
}: {
  noSildebar?: boolean;
}) {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const { open, setOpen } = useMainSidebar();
  return (
    <div className="w-full h-fit flex flex-col sticky top-0 bg-card z-10">
      <div className="w-full h-16 flex items-center gap-2 px-4">
        <div className="flex items-center gap-4">
          {isMobile && !noSildebar && (
            <Button
              width={'icon'}
              onClick={() => setOpen(!open)}
              className="h-10"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="text-title">LOGO</div>
        </div>
        <div className="w-full" />
        <div className="flex items-center gap-2">
          <Button width={'icon'} variant="outline" className="h-10">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
}
