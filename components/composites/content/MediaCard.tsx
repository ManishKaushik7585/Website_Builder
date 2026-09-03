import React from 'react';
import { Grid } from '../../layout/Grid';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { MediaFrame } from '../../media/MediaFrame';
import { AspectRatio } from '../../media/AspectRatio';

export interface MediaCardProps {
  media: React.ReactNode;
  title: string;
  description: string;
  reversed?: boolean;
}

export const MediaCard = ({ media, title, description, reversed = false }: MediaCardProps) => (
  <Grid columns={2} gap="lg" className="items-center bg-white rounded-[var(--radius-card)] overflow-hidden shadow-[var(--shadow-card-elevation)]">
    <MediaFrame radius="none" className={reversed ? 'md:order-2' : ''}>
      <AspectRatio ratio={4/3}>{media}</AspectRatio>
    </MediaFrame>
    <Stack gap="md" className="p-6 md:p-8">
      <Heading level={3} size={3}>{title}</Heading>
      <Text variant="body">{description}</Text>
    </Stack>
  </Grid>
);
