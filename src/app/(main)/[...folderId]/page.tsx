import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { Bookmark, getBookmarkByFolderIds, getBreadcrumb, getDynamicsRouteParams } from '@/data';
import APP_CONFIG from '@/data/config';
import { Bookmark as BookmarkIcon } from 'lucide-react';

import BookmarkLinkCard from '@/components/BookmarkLinkCard';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PageProps {
  params: { folderId: string[] };
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const breadcrumbName = getBreadcrumb((params.folderId as string[]) ?? []).map(item => item.name);

  return {
    title: `${APP_CONFIG.title} | ${breadcrumbName.join(' / ')}  `,
    description: `Bookmark navigation including ${breadcrumbName.join('-')}`,
    keywords: breadcrumbName,
  };
}

export async function generateStaticParams() {
  return getDynamicsRouteParams().map(item => ({ folderId: item }));
}

export default function Page(props: PageProps) {
  const { params } = props;
  const bookmarks = getBookmarkByFolderIds(params.folderId);
  const folder = bookmarks.filter(bookmark => bookmark.type === 'folder');
  const bks = bookmarks.filter(bookmark => bookmark.type === 'bookmark');
  return (
    <Tabs defaultValue="default">
      <ScrollArea className="w-[calc(100vw-2rem)] flex-1 overflow-hidden whitespace-nowrap rounded-md border bg-muted sm:w-[calc(100vw-14.5rem)] sm:border-none sm:bg-transparent">
        <TabsList>
          <TabsTrigger value="default">
            <BookmarkIcon className="size-5 text-primary" />
          </TabsTrigger>
          {folder.map(item =>
            item.type === 'folder' ? (
              <TabsTrigger key={item.folderId} value={item.folderId}>
                {item.name}
              </TabsTrigger>
            ) : null
          )}
        </TabsList>
        <ScrollBar hidden orientation="horizontal" />
      </ScrollArea>

      <TabsContent value="default">
        <BookmarkList bks={bks} />
      </TabsContent>
      {folder.map(item => {
        if (item.type === 'bookmark') return;
        const bookmark = item.children.filter(item => item.type === 'bookmark');
        return (
          <TabsContent key={item.folderId} value={item.folderId}>
            <BookmarkList bks={bookmark} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

const BookmarkList = (props: { bks: Bookmark[] }) => {
  return (
    <Card className="grid h-[calc(100vh-11rem)] grid-cols-1 place-content-start gap-5 overflow-auto p-5 sm:h-[calc(100vh-11rem)] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {props.bks.map(item => (item.type === 'bookmark' ? <BookmarkLinkCard key={item.id} bookmarkLink={item} /> : null))}
    </Card>
  );
};
