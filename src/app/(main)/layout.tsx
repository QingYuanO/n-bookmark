'use client';

import { ChangeEvent, Fragment, KeyboardEvent, Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getBreadcrumb } from '@/data';
import { cn } from '@/lib/utils';
import { Github, PanelLeft, Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import AsideNav from '@/components/AsideNav';
import ThemeToggleBtn from '@/components/ThemeToggleBtn';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;

  const params = useParams();

  const breadcrumb = getBreadcrumb((params.folderId as string[]) ?? []);

  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const [word, setWord] = useState(searchParams.get('word') ?? '');

  const toSearch = useDebouncedCallback(value => {
    router.push(`/search?word=${value}`);
  }, 500);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    if (pathname === '/search') {
      toSearch(e.target.value);
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?word=${word}`);
    }
  };

  return (
    <Suspense>
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
                </SheetHeader>

                <div className="h-full overflow-auto">
                  <AsideNav className="p-0" />
                </div>
              </SheetContent>
            </Sheet>

            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {(breadcrumb.length > 0 || pathname === '/search') && <BreadcrumbSeparator />}

                {/* 显示搜索 */}
                {pathname === '/search' && (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <BreadcrumbPage>Search</BreadcrumbPage>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}

                {/* 显示分类 */}
                {breadcrumb.map((item, index) => (
                  <Fragment key={item.link}>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        {index === breadcrumb.length - 1 ? (
                          <BreadcrumbPage>{item.name}</BreadcrumbPage>
                        ) : (
                          <Link href={item.link}>{item.name}</Link>
                        )}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {index !== breadcrumb.length - 1 && <BreadcrumbSeparator />}
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-3 size-4 text-muted-foreground" />
              <Input
                onKeyDown={handleEnter}
                value={word}
                onChange={handleSearchChange}
                type="search"
                placeholder="Type and press Enter to search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
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
    </Suspense>
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
