import React, { ReactNode } from 'react';
import { StaggeredCollection } from '../composition/StaggeredCollection';
import { Reveal } from '../motion/Reveal';
import { Stack } from '../layout/Stack';
import { Heading } from '../typography/Heading';

export interface GallerySectionProps {
  title?: string;
  items: ReactNode[];
  layout?: 'staggered' | 'grid';
}

export function GallerySection({ title, items, layout = 'staggered' }: GallerySectionProps) {
  return (
    <section className="py-24 w-full overflow-hidden">
      <Stack gap="lg">
        {title && (
          <Reveal direction="up" duration="base">
            <Heading level={2} className="px-6 md:px-12 text-3xl md:text-5xl font-bold">{title}</Heading>
          </Reveal>
        )}
        <div className="px-4 md:px-12">
          {layout === 'staggered' ? (
            <StaggeredCollection items={items} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item, i) => <div key={i} className="w-full aspect-[4/5] relative">{item}</div>)}
            </div>
          )}
        </div>
      </Stack>
    </section>
  );
}
