import React from 'react';
import { Stack } from '../../layout/Stack';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';
import { Divider } from '../../ui/Divider';
import { Button } from '../../ui/Button';
import { Price } from './Price';
import { Box } from '../../layout/Box';

export interface PricingCardProps {
  tierName: string;
  description: string;
  amount: number;
  period?: string;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
}

export const PricingCard = ({ tierName, description, amount, period, features, ctaLabel, highlighted }: PricingCardProps) => (
  <Stack gap="lg" className={`p-8 rounded-[var(--radius-card)] ${highlighted ? 'border-2 border-[var(--color-text-secondary)] shadow-xl relative' : 'border border-gray-200 bg-white'}`}>
    {highlighted && (
      <Box className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-text-secondary)] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        Most Popular
      </Box>
    )}
    <Stack gap="sm">
      <Heading level={3} size={4}>{tierName}</Heading>
      <Text variant="muted">{description}</Text>
    </Stack>
    <Price amount={amount} period={period} />
    <Button variant={highlighted ? 'primary' : 'secondary'} className="w-full">{ctaLabel}</Button>
    <Divider />
    <Stack gap="md" as="ul">
      {features.map((feature, i) => (
        <Text as="li" key={i} variant="small" className="flex items-center gap-2">
          <span aria-hidden="true" className="text-[var(--color-text-secondary)]">✓</span> {feature}
        </Text>
      ))}
    </Stack>
  </Stack>
);
