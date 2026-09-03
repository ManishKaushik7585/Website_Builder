import React from 'react';
import { cn } from '@/utils/cn';

export function SkipLink() {
  return (
    <a 
      href="#main-content" 
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4",
        "bg-black text-white px-4 py-2 z-50 rounded-md shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
      )}
    >
      Skip to main content
    </a>
  );
}
