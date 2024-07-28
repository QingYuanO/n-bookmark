import type { Metadata } from 'next';
import { bookmarkLinks } from '@/data';
import APP_CONFIG from '@/data/config';
import { Ghost } from 'lucide-react';

import BookmarkLinkCard from '@/components/BookmarkLinkCard';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: `${APP_CONFIG.title} | Search`,
  description: APP_CONFIG.description,
  keywords: ['bookmark', 'navigation', 'navigation search'],
};

export default function Page(props: { searchParams: { word?: string } }) {
  const {
    searchParams: { word },
  } = props;
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
    <Card className="grid h-[calc(100vh-8rem)] grid-cols-1 place-content-start gap-5 overflow-auto p-5 sm:h-[calc(100vh-8rem)] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {filerBookmarkLinks.map((item, index) => (
        <BookmarkLinkCard key={index} bookmarkLink={item} />
      ))}
    </Card>
  );
}
