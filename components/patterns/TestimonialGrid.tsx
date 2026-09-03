import React from 'react';
import { cn } from '@/utils/cn';

export interface TestimonialGridProps {
  children: React.ReactNode;
  className?: string;
}

export function TestimonialGrid({ children, className }: TestimonialGridProps) {
  // Masonry-like CSS columns setup for testimonials
  return (
    <div className={cn("columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6", className)}>
      {children}
    </div>
  );
}
