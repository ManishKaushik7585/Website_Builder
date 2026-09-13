import React, { ReactNode } from 'react';
import { Centered } from '../patterns/Centered';
import { Split } from '../patterns/Split';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';
import { Stack } from '../layout/Stack';
import { Reveal } from '../motion/Reveal';
import { AsymmetricSplit } from '../composition/AsymmetricSplit';
import { EditorialColumns } from '../composition/EditorialColumns';
import { LayeredOverlap } from '../composition/LayeredOverlap';
import { VisualInterruption } from '../composition/VisualInterruption';

export interface HeroSectionProps {
  variant?: 'centered' | 'split' | 'asymmetric-split' | 'editorial-columns' | 'media-narrative' | 'layered-overlap' | 'visual-interruption';
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  media?: ReactNode;
}

export function HeroSection({
  variant = 'centered',
  eyebrow,
  title,
  description,
  actions,
  media
}: HeroSectionProps) {
  const content = (
    <Stack gap="md" align={variant === 'centered' ? 'center' : 'start'} className={variant === 'centered' ? 'text-center' : 'text-left'}>
      {eyebrow && <Text variant="small" className="uppercase tracking-widest text-gray-500">{eyebrow}</Text>}
      <Heading level={1} className="text-4xl md:text-6xl font-bold">{title}</Heading>
      <Text variant="large" className="text-gray-600 max-w-2xl">{description}</Text>
      {actions && <div className="mt-4">{actions}</div>}
    </Stack>
  );

  return (
    <section className="py-20 md:py-32 w-full">
      <Reveal direction="up" duration="base" distance="sm">
        {variant === 'asymmetric-split' ? (
          <AsymmetricSplit primaryContent={content} secondaryContent={media} ratio="60-40" />
        ) : variant === 'editorial-columns' ? (
          <EditorialColumns primaryContent={content} supportingContent={media} />
        ) : variant === 'layered-overlap' ? (
          <LayeredOverlap primary={media} secondary={content} overlapDirection="up" />
        ) : variant === 'visual-interruption' ? (
          <VisualInterruption height="vh-100" intensity="high">
            {content}
          </VisualInterruption>
        ) : variant === 'split' || variant === 'media-narrative' ? (
          <Split content={content} media={media} ratio="6/6" />
        ) : (
          <Centered>
            {content}
            {media && <div className="mt-12 w-full">{media}</div>}
          </Centered>
        )}
      </Reveal>
    </section>
  );
}
