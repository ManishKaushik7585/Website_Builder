import React from 'react';
import { Box, BoxProps } from '../layout/Box';
import { cn } from '@/utils/cn';

export type TextProps = BoxProps & {
  variant?: 'body' | 'muted' | 'small' | 'large';
  align?: 'left' | 'center' | 'right' | 'justify';
};

const variantMap = {
  body: 'text-base text-[var(--color-text-primary)]',
  muted: 'text-base text-gray-500',
  small: 'text-sm text-[var(--color-text-primary)]',
  large: 'text-lg text-[var(--color-text-primary)]',
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as = 'p', variant = 'body', align = 'left', className, ...props }, ref) => {
    return (
      <Box
        as={as}
        ref={ref}
        className={cn('font-[family-name:var(--font-primary)]', variantMap[variant], `text-${align}`, className)}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';
