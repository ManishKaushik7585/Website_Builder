import React from 'react';
import { Box, BoxProps } from './Box';
import { cn } from '@/utils/cn';

export type CenterProps = BoxProps & {
  horizontal?: boolean;
  vertical?: boolean;
};

export const Center = React.forwardRef<HTMLElement, CenterProps>(
  ({ horizontal = true, vertical = true, className, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        className={cn('flex', horizontal && 'justify-center', vertical && 'items-center', className)}
        {...props}
      />
    );
  }
);
Center.displayName = 'Center';
