import React from 'react';
import { cn } from '@/utils/cn';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden', className)}
        style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
        {...props}
      >
        <div className="absolute inset-0 w-full h-full">
          {children}
        </div>
      </div>
    );
  }
);
AspectRatio.displayName = 'AspectRatio';
