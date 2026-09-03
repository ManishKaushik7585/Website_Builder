import React from 'react';
import { Box, BoxProps } from './Box';
import { cn } from '@/utils/cn';

export type StackProps = BoxProps & {
  gap?: 'sm' | 'md' | 'lg' | 'none';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
};

const gapMap = { none: 'gap-0', sm: 'gap-4', md: 'gap-8', lg: 'gap-16' };
const alignMap = { start: 'items-start', center: 'items-center', end: 'items-end', stretch: 'items-stretch' };
const justifyMap = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between', around: 'justify-around' };

export const Stack = React.forwardRef<HTMLElement, StackProps>(
  ({ gap = 'md', align = 'stretch', justify = 'start', className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('flex flex-col', gapMap[gap], alignMap[align], justifyMap[justify], className)}
        {...props}
      />
    );
  }
);
Stack.displayName = 'Stack';
