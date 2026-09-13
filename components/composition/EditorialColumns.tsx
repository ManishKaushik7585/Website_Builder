import React from 'react';

export interface EditorialColumnsProps {
  metadataContent?: React.ReactNode;
  primaryContent: React.ReactNode;
  supportingContent?: React.ReactNode;
  className?: string;
}

export function EditorialColumns({
  metadataContent,
  primaryContent,
  supportingContent,
  className = ''
}: EditorialColumnsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)_250px] gap-8 lg:gap-16 items-start ${className}`}>
      {metadataContent ? (
        <aside className="sticky top-24 pt-4 border-t border-current/10">
          {metadataContent}
        </aside>
      ) : <div className="hidden md:block" />}
      
      <article className="max-w-[700px]">
        {primaryContent}
      </article>

      {supportingContent && (
        <aside className="pt-4 lg:border-t lg:border-current/10">
          {supportingContent}
        </aside>
      )}
    </div>
  );
}
