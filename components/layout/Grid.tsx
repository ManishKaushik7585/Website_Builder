import React from 'react';
import { Box, BoxProps } from './Box';
import { cn } from '@/utils/cn';

export type GridProps = BoxProps & {
  columns?: 1 | 2 | 3 | 4 | 12;
  gap?: 'sm' | 'md' | 'lg';
};

const colMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  12: 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12',
};
const gapMap = { sm: 'gap-4', md: 'gap-8', lg: 'gap-16' };

export const Grid = React.forwardRef<HTMLElement, GridProps>(
  ({ columns = 1, gap = 'md', className, ...props }, ref) => {
    return <Box ref={ref} className={cn('grid', colMap[columns], gapMap[gap], className)} {...props} />;
  }
);
Grid.displayName = 'Grid';
