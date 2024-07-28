import React, { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

import { Card } from './ui/card';

export default function CardWrap({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <Card
      className={cn(
        'grid grid-cols-1 place-content-start gap-5 overflow-auto p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
        className
      )}
    >
      {children}
    </Card>
  );
}
