import React from 'react';
import { cn } from '@/utils/cn';

export interface PricingGridProps {
  children: React.ReactNode;
  className?: string;
}

export function PricingGrid({ children, className }: PricingGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-8 items-end", className)}>
      {children}
    </div>
  );
}
