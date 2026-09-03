import React from 'react';
import { cn } from '@/utils/cn';

export interface MetricClusterProps {
  children: React.ReactNode;
  className?: string;
}

export function MetricCluster({ children, className }: MetricClusterProps) {
  return (
    <div className={cn("flex flex-wrap gap-8 md:gap-12 justify-center items-center", className)}>
      {children}
    </div>
  );
}
