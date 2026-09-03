import React from 'react';
import { Button, ButtonProps } from './Button';
import { cn } from '@/utils/cn';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode;
  'aria-label': string; // Mandatory for accessibility
}

const sizeMap = {
  sm: 'h-8 w-8 px-0',
  md: 'h-10 w-10 px-0',
  lg: 'h-12 w-12 px-0',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'md', className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size={size}
        className={cn(sizeMap[size], className)}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);
IconButton.displayName = 'IconButton';
