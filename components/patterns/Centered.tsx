import React from 'react';
import { cn } from '@/utils/cn';

export interface CenteredProps {
  children: React.ReactNode;
  className?: string;
}

export function Centered({ children, className }: CenteredProps) {
  return (
    <div className={cn("max-w-4xl mx-auto w-full text-center flex flex-col items-center", className)}>
      {children}
    </div>
  );
}
