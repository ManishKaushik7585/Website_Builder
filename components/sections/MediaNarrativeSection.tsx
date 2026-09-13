import React, { ReactNode } from 'react';
import { LayeredOverlap } from '../composition/LayeredOverlap';
import { Reveal } from '../motion/Reveal';
import { Split } from '../patterns/Split';

export interface MediaNarrativeSectionProps {
  media: ReactNode;
  content: ReactNode;
  composition?: 'overlap' | 'split';
}

export function MediaNarrativeSection({ media, content, composition = 'overlap' }: MediaNarrativeSectionProps) {
  return (
    <section className="py-12 md:py-24 w-full">
      <Reveal direction="up" duration="slow" distance="md">
        {composition === 'overlap' ? (
          <LayeredOverlap primary={media} secondary={content} overlapDirection="up" />
        ) : (
          <Split content={content} media={media} ratio="6/6" />
        )}
      </Reveal>
    </section>
  );
}
