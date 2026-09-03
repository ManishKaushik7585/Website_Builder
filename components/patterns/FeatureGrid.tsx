import React from 'react';
import { cn } from '@/utils/cn';

export interface FeatureGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export function FeatureGrid({ children, columns = 3, className }: FeatureGridProps) {
  const cols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };
  return (
    <div className={cn("grid grid-cols-1 gap-6", cols[columns], className)}>
      {children}
    </div>
  );
}
