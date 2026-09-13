import React, { ReactNode } from 'react';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Stack } from '../layout/Stack';
import { Reveal } from '../motion/Reveal';
import { Centered } from '../patterns/Centered';
import { StaggeredCollection } from '../composition/StaggeredCollection';
import { FeaturedSupporting } from '../composition/FeaturedSupporting';
import { EditorialColumns } from '../composition/EditorialColumns';
import { LayeredOverlap } from '../composition/LayeredOverlap';

export interface FeaturesSectionProps {
  title: string;
  description?: string;
  composition?: 'grid' | 'staggered-collection' | 'featured-supporting' | 'editorial-columns' | 'layered-overlap';
  items?: ReactNode[];
  children?: ReactNode; // Fallback legacy grid
}

export function FeaturesSection({ title, description, composition = 'grid', items, children }: FeaturesSectionProps) {
  let contentBlock = children;
  
  if (items && items.length > 0) {
    if (composition === 'staggered-collection') {
      contentBlock = <StaggeredCollection items={items} />;
    } else if (composition === 'featured-supporting') {
      contentBlock = <FeaturedSupporting featuredContent={items[0]} supportingItems={items.slice(1)} />;
    } else if (composition === 'editorial-columns') {
      contentBlock = <EditorialColumns primaryContent={items[0]} supportingContent={items.slice(1)} />;
    } else if (composition === 'layered-overlap') {
      contentBlock = <LayeredOverlap primary={items[0]} secondary={items.slice(1)} />;
    }
  }
  return (
    <section className="py-20 w-full">
      <Reveal direction="up" duration="base" distance="md">
        <Stack gap="lg">
          <Centered>
            <Heading level={2} className="text-3xl md:text-5xl font-bold">{title}</Heading>
            {description && <Text variant="large" className="text-gray-600 mt-4 max-w-2xl">{description}</Text>}
          </Centered>
          {contentBlock}
        </Stack>
      </Reveal>
    </section>
  );
}
