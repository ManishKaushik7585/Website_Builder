import React from 'react';
import { Stack } from '../../layout/Stack';
import { Display } from '../../typography/Display';
import { Text } from '../../typography/Text';

export interface MetricProps {
  value: string;
  label: string;
}

export const Metric = ({ value, label }: MetricProps) => (
  <Stack gap="sm">
    <Display as="p">{value}</Display>
    <Text variant="muted" className="font-medium tracking-wide uppercase text-sm">{label}</Text>
  </Stack>
);
