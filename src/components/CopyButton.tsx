'use client';

import { useEffect, useState } from 'react';
import { Copy, CopyCheck } from 'lucide-react';

export default function CopyButton({ text }: { text: string }) {
  const [isCopy, setIsCopy] = useState(false);

  useEffect(() => {
    if (isCopy) {
      setTimeout(() => {
        setIsCopy(false);
      }, 3000);
    }
  }, [isCopy]);

  if (isCopy) {
    return <CopyCheck className="mr-1 size-4 cursor-pointer text-primary" />;
  }

  return (
    <Copy
      className="mr-1 size-4 cursor-pointer text-primary"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setIsCopy(true);
      }}
    />
  );
}
