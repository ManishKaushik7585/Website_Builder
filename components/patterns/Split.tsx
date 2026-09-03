import React, { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface SplitProps {
  content: ReactNode;
  media: ReactNode;
  ratio?: '5/7' | '6/6' | '7/5';
  reverseOnMobile?: boolean;
  className?: string;
}

export function Split({ content, media, ratio = '6/6', reverseOnMobile = false, className }: SplitProps) {
  const ratioClasses = {
    '5/7': 'md:grid-cols-[5fr_7fr]',
    '6/6': 'md:grid-cols-2',
    '7/5': 'md:grid-cols-[7fr_5fr]',
  };

  return (
    <div className={cn("grid grid-cols-1 gap-8 md:gap-12 lg:gap-16 items-center", ratioClasses[ratio], className)}>
      <div className={cn("order-2 md:order-none", reverseOnMobile && "order-1")}>
        {content}
      </div>
      <div className={cn("order-1 md:order-none", reverseOnMobile && "order-2")}>
        {media}
      </div>
    </div>
  );
}
