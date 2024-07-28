'use client';

import { PropsWithChildren, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { bookmarkLinks } from '@/data';
import { Ghost } from 'lucide-react';

import BookmarkLinkCard, { SkeletonBookmarkLinkCard } from '@/components/BookmarkLinkCard';
import CardWrap from '@/components/CardWrap';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function SearchParamsPage() {
  const searchParams = useSearchParams();
  const word = searchParams.get('word') ?? '';
  const filerBookmarkLinks = word
    ? bookmarkLinks.filter(item => item.name.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
    : bookmarkLinks;

  if (!filerBookmarkLinks || filerBookmarkLinks.length == 0) {
    return (
      <Card className="flex h-[calc(100vh-8rem)] flex-col items-center justify-center sm:h-[calc(100vh-9rem)]">
        <Ghost className="mb-2 size-10 text-muted-foreground" />
        <p className="text-muted-foreground">Not data yet ...</p>
      </Card>
    );
  }
  return (
    <CardWrap className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-8rem)]">
      {filerBookmarkLinks.map((item, index) => (
        <BookmarkLinkCard key={index} bookmarkLink={item} />
      ))}
    </CardWrap>
  );
}

const SkeletonContent = () => {
  return (
    <CardWrap className="h-[calc(100vh-8rem)] sm:h-[calc(100vh-8rem)]">
      {Array.from({ length: 54 }, (_, index) => index).map((_, index) => (
        <SkeletonBookmarkLinkCard key={index} />
      ))}
    </CardWrap>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<SkeletonContent />}>
      <SearchParamsPage />
    </Suspense>
  );
}
