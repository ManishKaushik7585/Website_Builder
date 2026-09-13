import React from 'react';

export interface FeaturedSupportingProps {
  featuredContent: React.ReactNode;
  supportingItems: React.ReactNode[];
  className?: string;
}

export function FeaturedSupporting({
  featuredContent,
  supportingItems,
  className = ''
}: FeaturedSupportingProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ${className}`}>
      <div className="md:col-span-2 md:row-span-2">
        {featuredContent}
      </div>
      
      {supportingItems.map((item, index) => (
        <div key={index} className="col-span-1">
          {item}
        </div>
      ))}
    </div>
  );
}
