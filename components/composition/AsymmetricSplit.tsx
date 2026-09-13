import React from 'react';

export interface AsymmetricSplitProps {
  primaryContent: React.ReactNode;
  secondaryContent: React.ReactNode;
  primaryPosition?: 'left' | 'right';
  ratio?: '60-40' | '70-30';
  className?: string;
}

export function AsymmetricSplit({ 
  primaryContent, 
  secondaryContent, 
  primaryPosition = 'left',
  ratio = '60-40',
  className = ''
}: AsymmetricSplitProps) {
  // Mobile: stack-early (1 column)
  // Desktop: specific asymmetric ratio
  const gridRatio = ratio === '60-40' 
    ? (primaryPosition === 'left' ? 'md:grid-cols-[1.5fr_1fr]' : 'md:grid-cols-[1fr_1.5fr]')
    : (primaryPosition === 'left' ? 'md:grid-cols-[2.3fr_1fr]' : 'md:grid-cols-[1fr_2.3fr]');

  return (
    <div className={`grid grid-cols-1 gap-12 lg:gap-24 items-center ${gridRatio} ${className}`}>
      <div className={primaryPosition === 'right' ? 'md:order-last' : ''}>
        {primaryContent}
      </div>
      <div className={primaryPosition === 'right' ? 'md:order-first' : ''}>
        {secondaryContent}
      </div>
    </div>
  );
}
