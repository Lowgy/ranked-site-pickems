'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const location = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button asChild variant={'ghost'}>
              <Link
                href={location === '/admin' ? '/' : '/admin'}
                rel="noreferrer"
                prefetch={false}
              >
                {location === '/admin' ? 'Home' : 'Admin'}
              </Link>
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
