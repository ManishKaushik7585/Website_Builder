import React from 'react';
import { Stack } from '../../layout/Stack';
import { Inline } from '../../layout/Inline';
import { Text } from '../../typography/Text';
import { Box } from '../../layout/Box';

export interface TestimonialCardProps {
  quote: string;
  authorName: string;
  authorTitle?: string;
  avatar?: React.ReactNode;
}

export const TestimonialCard = ({ quote, authorName, authorTitle, avatar }: TestimonialCardProps) => (
  <Stack gap="lg" className="p-8 bg-[var(--color-surface-elevated)] rounded-[var(--radius-card)]">
    <Text variant="large" className="font-medium">&quot;{quote}&quot;</Text>
    <Inline gap="md" align="center">
      {avatar && <Box className="h-12 w-12 rounded-full overflow-hidden shrink-0">{avatar}</Box>}
      <Stack gap="none">
        <Text variant="body" className="font-bold">{authorName}</Text>
        {authorTitle && <Text variant="small" className="text-gray-500">{authorTitle}</Text>}
      </Stack>
    </Inline>
  </Stack>
);
