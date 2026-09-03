import React from 'react';
import { Box, BoxProps } from './Box';
import { cn } from '@/utils/cn';

export type InlineProps = BoxProps & {
  gap?: 'sm' | 'md' | 'lg' | 'none';
  align?: 'start' | 'center' | 'end' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
};

const gapMap = { none: 'gap-0', sm: 'gap-2', md: 'gap-4', lg: 'gap-8' };
const alignMap = { start: 'items-start', center: 'items-center', end: 'items-end', baseline: 'items-baseline' };
const justifyMap = { start: 'justify-start', center: 'justify-center', end: 'justify-end', between: 'justify-between' };

export const Inline = React.forwardRef<HTMLElement, InlineProps>(
  ({ gap = 'md', align = 'center', justify = 'start', wrap = true, className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('flex flex-row', wrap ? 'flex-wrap' : 'flex-nowrap', gapMap[gap], alignMap[align], justifyMap[justify], className)}
        {...props}
      />
    );
  }
);
Inline.displayName = 'Inline';
