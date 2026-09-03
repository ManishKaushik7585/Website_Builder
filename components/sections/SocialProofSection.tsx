import React, { ReactNode } from 'react';
import { Stack } from '../layout/Stack';
import { Reveal } from '../motion/Reveal';

export interface SocialProofSectionProps {
  logos?: ReactNode;
  testimonials?: ReactNode;
}

export function SocialProofSection({ logos, testimonials }: SocialProofSectionProps) {
  return (
    <section className="py-20 w-full overflow-hidden">
      <Reveal direction="up" duration="base" distance="md">
        <Stack gap="lg">
          {logos}
          {testimonials}
        </Stack>
      </Reveal>
    </section>
  );
}
