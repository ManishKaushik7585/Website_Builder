import React from 'react';
import { Box, BoxProps } from '../layout/Box';
import { cn } from '@/utils/cn';

export type MediaFrameProps = BoxProps & {
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
};

const radiusMap = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-[var(--radius-button)]',
  lg: 'rounded-[var(--radius-card)]',
  full: 'rounded-full',
};

export const MediaFrame = React.forwardRef<HTMLElement, MediaFrameProps>(
  ({ radius = 'none', className, children, ...props }, ref) => {
    return (
      <Box ref={ref} className={cn('overflow-hidden', radiusMap[radius], className)} {...props}>
        {children}
      </Box>
    );
  }
);
MediaFrame.displayName = 'MediaFrame';
