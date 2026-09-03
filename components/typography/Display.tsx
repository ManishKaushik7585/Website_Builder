import React from 'react';
import { Box, BoxProps } from '../layout/Box';
import { cn } from '@/utils/cn';

export type DisplayProps = BoxProps;

export const Display = React.forwardRef<HTMLElement, DisplayProps>(
  ({ as = 'h1', className, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref}
        className={cn('text-[var(--color-text-primary)] font-[family-name:var(--font-primary)] font-black tracking-tighter text-5xl md:text-7xl lg:text-8xl leading-tight', className)}
        {...props}
      />
    );
  }
);
Display.displayName = 'Display';
