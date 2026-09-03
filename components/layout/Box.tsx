import React from 'react';
import { cn } from '@/utils/cn';

export type BoxProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
};

export const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ as: Component = 'div', className, ...props }, ref) => {
    return <Component ref={ref} className={cn(className)} {...props} />;
  }
);
Box.displayName = 'Box';
