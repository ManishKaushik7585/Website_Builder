import React from 'react';
import { cn } from '@/utils/cn';

export interface LogoWallProps {
  children: React.ReactNode;
  className?: string;
}

export function LogoWall({ children, className }: LogoWallProps) {
  return (
    <div className={cn("flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70 grayscale", className)}>
      {children}
    </div>
  );
}
