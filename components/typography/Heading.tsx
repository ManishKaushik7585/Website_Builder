import React from 'react';
import { Box, BoxProps } from '../layout/Box';
import { cn } from '@/utils/cn';

export type HeadingProps = BoxProps & {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 1 | 2 | 3 | 4 | 5 | 6;
};

const sizeMap = {
  1: 'text-4xl md:text-5xl font-bold',
  2: 'text-3xl md:text-4xl font-semibold',
  3: 'text-2xl md:text-3xl font-semibold',
  4: 'text-xl md:text-2xl font-semibold',
  5: 'text-lg md:text-xl font-medium',
  6: 'text-base font-medium',
};

export const Heading = React.forwardRef<HTMLElement, HeadingProps>(
  ({ level = 2, size, className, ...props }, ref) => {
    const Tag = `h${level}` as React.ElementType;
    const visualSize = size || level;
    
    return (
      <Box
        as={Tag}
        ref={ref}
        className={cn('text-[var(--color-text-primary)] font-[family-name:var(--font-primary)] tracking-tight', sizeMap[visualSize as keyof typeof sizeMap], className)}
        {...props}
      />
    );
  }
);
Heading.displayName = 'Heading';
