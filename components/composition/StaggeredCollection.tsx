import React from 'react';

export interface StaggeredCollectionProps {
  items: React.ReactNode[];
  className?: string;
  staggerAmount?: 'small' | 'large';
}

export function StaggeredCollection({
  items,
  className = '',
  staggerAmount = 'small'
}: StaggeredCollectionProps) {
  const marginY = staggerAmount === 'small' ? 'md:translate-y-8' : 'md:translate-y-16';

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 ${className}`}>
      {items.map((item, index) => {
        // Stagger middle columns
        const isStaggered = index % 3 === 1;
        return (
          <div key={index} className={`${isStaggered ? marginY : ''} transition-transform duration-500`}>
            {item}
          </div>
        );
      })}
    </div>
  );
}
