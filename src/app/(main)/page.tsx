'use client';

import SlackIntro from '@/components/animata/hero/slack-intro';
import WaveReveal from '@/components/animata/text/wave-reveal';
import { Card } from '@/components/ui/card';

export default function Page() {
  return (
    <Card className="flex h-[calc(100vh-8rem)] items-center justify-center overflow-auto">
      <WaveReveal className="z-50 text-foreground" text="Bookmark Ocean" />
    </Card>
  );
}
