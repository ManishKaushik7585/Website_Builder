import React from 'react';
import { cn } from '@/utils/cn';

export interface SpacerProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-16 w-16',
  xl: 'h-32 w-32',
};

export const Spacer = ({ size, className }: SpacerProps) => {
  return <div aria-hidden="true" className={cn('flex-none', sizeMap[size], className)} />;
};
