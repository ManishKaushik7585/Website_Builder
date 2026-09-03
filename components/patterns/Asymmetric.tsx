import React from 'react';
import { cn } from '@/utils/cn';

export interface AsymmetricProps {
  left: React.ReactNode;
  right: React.ReactNode;
  className?: string;
}

export function Asymmetric({ left, right, className }: AsymmetricProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8", className)}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}
