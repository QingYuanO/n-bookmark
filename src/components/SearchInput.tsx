'use client';

import React, { ChangeEvent, KeyboardEvent, Suspense, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from './ui/input';

export default function SearchInput() {
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
  );
}
