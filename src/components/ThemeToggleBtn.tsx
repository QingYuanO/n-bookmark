'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Loader2, Moon, Sun } from 'lucide-react';

import { Button } from './ui/button';

export default function ThemeToggleBtn() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Button variant="outline" className="rounded-full" size="icon">
      {!mounted ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Fragment>{theme === 'light' ? <Sun onClick={() => setTheme('dark')} /> : <Moon onClick={() => setTheme('light')} />}</Fragment>
      )}
    </Button>
  );
}
