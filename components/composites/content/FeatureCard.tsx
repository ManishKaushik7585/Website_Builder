import React from 'react';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Box } from '../../layout/Box';

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Stack gap="sm" className="p-6 bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card-elevation)]">
    {icon && <Box className="text-[var(--color-text-secondary)]">{icon}</Box>}
    <Heading level={3} size={4}>{title}</Heading>
    <Text variant="muted">{description}</Text>
  </Stack>
);
