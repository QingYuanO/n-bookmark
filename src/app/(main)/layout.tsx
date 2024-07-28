import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import APP_CONFIG from '@/data/config';
import { cn } from '@/lib/utils';
import { Github, PanelLeft } from 'lucide-react';

import AppBreadcrumb from '@/components/AppBreadcrumb';
import AsideNav from '@/components/AsideNav';
import SearchInput from '@/components/SearchInput';
import ThemeToggleBtn from '@/components/ThemeToggleBtn';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-48 flex-col border-r bg-background sm:flex">
        <AppTitle className="p-4" />
        <AsideNav className="overflow-auto pt-0" />
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-48">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <SheetHeader>
                <SheetTitle asChild className="flex items-center pb-2 text-start">
                  <AppTitle />
                </SheetTitle>
                <SheetDescription>
                  <span className="hidden">{APP_CONFIG.description}</span>
                </SheetDescription>
              </SheetHeader>

              <div className="h-full overflow-auto">
                <AsideNav className="p-0" />
              </div>
            </SheetContent>
          </Sheet>

          <AppBreadcrumb />
          <Suspense>
            <SearchInput />
          </Suspense>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Github className="size-5" />
          </Button>
          <ThemeToggleBtn />
        </header>
        <main className="grid w-full items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
        <footer className="s flex justify-center text-sm text-muted-foreground">
          Copyright © 2024{' '}
          <a className="ml-1 hover:underline" href="https://github.com/QingYuanO" target="_blank">
            QingYuanO
          </a>
        </footer>
      </div>
    </div>
  );
}

const AppTitle = ({ className }: { className?: string }) => {
  return (
    <Link href="/" className={cn('flex items-center text-start font-bold', className)}>
      <Image src="/logo.png" alt="logo" width={20} height={20} className="mr-1 size-6" />
      BookmarkOcean
    </Link>
  );
};
