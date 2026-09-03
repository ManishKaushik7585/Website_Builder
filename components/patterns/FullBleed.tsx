import React from 'react';
import { cn } from '@/utils/cn';

export interface FullBleedProps {
  children: React.ReactNode;
  className?: string;
}

export function FullBleed({ children, className }: FullBleedProps) {
  return (
    <div className={cn("w-[100vw] relative left-1/2 -translate-x-1/2", className)}>
      {children}
    </div>
  );
}
