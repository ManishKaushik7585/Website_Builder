import React, { ReactNode } from 'react';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Stack } from '../layout/Stack';
import { Reveal } from '../motion/Reveal';
import { Centered } from '../patterns/Centered';

export interface FeaturesSectionProps {
  title: string;
  description?: string;
  children: ReactNode; // FeatureGrid or BentoGrid
}

export function FeaturesSection({ title, description, children }: FeaturesSectionProps) {
  return (
    <section className="py-20 w-full">
      <Reveal direction="up" duration="base" distance="md">
        <Stack gap="lg">
          <Centered>
            <Heading level={2} className="text-3xl md:text-5xl font-bold">{title}</Heading>
            {description && <Text variant="large" className="text-gray-600 mt-4 max-w-2xl">{description}</Text>}
          </Centered>
          {children}
        </Stack>
      </Reveal>
    </section>
  );
}
