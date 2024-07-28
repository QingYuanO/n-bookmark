'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { bookmarkFolders, BookmarkFolderWithChildren } from '@/data';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function AsideNav({ className }: { className?: string }) {
  return (
    <nav className={cn('flex flex-col items-center gap-2 px-4 py-4', className)}>
      {bookmarkFolders.map(item => (
        <AccordionTree bookmark={item} key={item.id} isTop link={item.folderId} level={0} />
      ))}
    </nav>
  );
}

const AccordionTree = ({
  bookmark,
  isTop,
  link,
  level,
}: {
  bookmark: BookmarkFolderWithChildren;
  isTop?: boolean;
  link: string;
  level: number;
}) => {
  const segment = useSelectedLayoutSegment();

  if (bookmark.children && bookmark.children.length > 0) {
    const segmentList = segment?.split('/') ?? [];

    return (
      <Accordion type="multiple" className="w-full" defaultValue={[segmentList[level]]}>
        <AccordionItem value={bookmark.folderId}>
          <div
            className={cn(
              'box-border flex items-center justify-between rounded px-2 py-1.5 font-medium hover:bg-accent',
              segment === `${link}` && 'bg-accent'
            )}
          >
            <Link className="w-full" href={`/${link}`}>
              {bookmark.name}
            </Link>
            <AccordionTrigger>
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionTrigger>
          </div>

          <AccordionContent>
            {bookmark.children.map(child => (
              <AccordionTree bookmark={child} key={child.id} link={`${link}/${child.folderId}`} level={level + 1} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          className={cn('block w-full rounded px-2 py-1.5 hover:bg-accent', isTop && 'font-medium', segment === `${link}` && 'bg-accent')}
          href={`/${link}`}
        >
          {bookmark.name}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{bookmark.name}</TooltipContent>
    </Tooltip>
  );
};
