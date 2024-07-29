import React, { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

export default function CardWrap({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <ScrollArea className={cn('overflow-auto rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
      <div className={cn('grid grid-cols-1 place-content-start gap-5 p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6')}>
        {children}
      </div>
    </ScrollArea>
  );
}
