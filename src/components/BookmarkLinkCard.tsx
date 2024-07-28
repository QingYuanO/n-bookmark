import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookmarkLink } from '@/data';
import { Bookmark } from 'lucide-react';

import BookmarkLinkTooltip from './BookmarkLinkTooltip';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function BookmarkLinkCard({ bookmarkLink }: { bookmarkLink: BookmarkLink }) {
  return (
    <Card className="col-span-1">
      <CardHeader className="px-2.5 py-4">
        <BookmarkLinkTooltip name={bookmarkLink.name} side="top">
          <CardTitle className="flex w-full cursor-pointer items-center">
            {bookmarkLink.icon ? (
              <Image className="mr-1 size-4" src={bookmarkLink.icon} alt={bookmarkLink.name} width={20} height={20} />
            ) : (
              <Bookmark className="mr-1 size-5 text-foreground" />
            )}
            <Link href={bookmarkLink.url} target="_blank" className="overflow-hidden text-ellipsis text-nowrap text-base hover:underline">
              {bookmarkLink.name}
            </Link>
          </CardTitle>
        </BookmarkLinkTooltip>
        <BookmarkLinkTooltip name={bookmarkLink.url} side="bottom" copy>
          <CardDescription className="overflow-hidden text-ellipsis text-nowrap">{bookmarkLink.url}</CardDescription>
        </BookmarkLinkTooltip>
      </CardHeader>
    </Card>
  );
}
