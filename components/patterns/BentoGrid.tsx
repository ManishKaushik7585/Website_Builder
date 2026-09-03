import React from 'react';
import { cn } from '@/utils/cn';

export interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[250px]", className)}>
      {children}
    </div>
  );
}
