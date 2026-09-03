import React from 'react';
import { Inline } from '../../layout/Inline';
import { Heading } from '../../typography/Heading';
import { Text } from '../../typography/Text';

export interface PriceProps {
  amount: number;
  currency?: string;
  period?: string;
}

export const Price = ({ amount, currency = '$', period }: PriceProps) => (
  <Inline gap="sm" align="baseline">
    <Heading level={2} size={1}>{currency}{amount}</Heading>
    {period && <Text variant="muted">/{period}</Text>}
  </Inline>
);
