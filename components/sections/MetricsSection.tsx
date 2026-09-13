import React from 'react';
import { Stack } from '../layout/Stack';
import { Reveal } from '../motion/Reveal';
import { Heading } from '../typography/Heading';
import { Text } from '../typography/Text';

export interface MetricsSectionProps {
  title?: string;
  metrics: Array<{ value: string; label: string }>;
}

export function MetricsSection({ title, metrics }: MetricsSectionProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="py-24 px-6 md:px-12 w-full bg-[var(--color-bg-secondary)] border-y border-[var(--color-border)]">
      <Reveal direction="up" duration="base" distance="sm">
        <Stack gap="lg">
          {title && <Heading level={2} className="text-3xl font-bold">{title}</Heading>}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {metrics.map((m, i) => (
              <Stack key={i} gap="sm">
                <Heading level={3} className="text-5xl md:text-7xl font-bold tracking-tighter">{m.value}</Heading>
                <Text variant="muted" className="uppercase tracking-widest text-sm">{m.label}</Text>
              </Stack>
            ))}
          </div>
        </Stack>
      </Reveal>
    </section>
  );
}
