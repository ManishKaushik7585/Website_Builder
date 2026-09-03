import React from 'react';
import { Box, BoxProps } from './Box';
import { cn } from '@/utils/cn';

export type ContainerProps = BoxProps & {
  fluid?: boolean;
};

export const Container = React.forwardRef<HTMLElement, ContainerProps>(
  ({ fluid = false, className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('mx-auto w-full px-4 md:px-8', !fluid && 'max-w-[var(--width-page)]', className)}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';
