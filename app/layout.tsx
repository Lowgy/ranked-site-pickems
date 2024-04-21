import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { useSession } from 'next-auth/react';
import AuthProvider from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SiteHeader } from '@/components/nav/site-header';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MCSRanked Pickems',
  description: 'Home of the MCSRanked Playoff Pickems!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SiteHeader />
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
