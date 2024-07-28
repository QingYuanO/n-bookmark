import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';

import './globals.css';

import APP_CONFIG from '@/data/config';

import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_CONFIG.title,
  description: APP_CONFIG.description,
  keywords: ['bookmark', 'navigation'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ThemeProvider defaultTheme="light" attribute="class">
          <TooltipProvider> {children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
