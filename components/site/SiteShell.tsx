import React from 'react';
import { SkipLink } from './SkipLink';

export interface SiteShellProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}

export function SiteShell({ header, footer, children }: SiteShellProps) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-white text-black font-sans">
      <SkipLink />
      {header}
      <main id="main-content" className="flex-grow flex flex-col">
        {children}
      </main>
      {footer}
    </div>
  );
}
