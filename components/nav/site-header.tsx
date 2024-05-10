'use client';

import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { MainNav } from '@/components/nav/main-nav';
import { AvatarDropdown } from '@/components/nav/avatar-dropdown';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <>
      {pathname === '/' ? null : (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <MainNav items={siteConfig.mainNav} />
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-1">
                <AvatarDropdown />
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
