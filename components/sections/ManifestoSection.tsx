import React, { ReactNode } from 'react';
import { VisualInterruption } from '../composition/VisualInterruption';
import { Reveal } from '../motion/Reveal';

export interface ManifestoSectionProps {
  content: ReactNode;
  intensity?: 'high' | 'medium' | 'low';
}

export function ManifestoSection({ content, intensity = 'high' }: ManifestoSectionProps) {
  return (
    <section className="w-full">
      <Reveal direction="up" duration="slow" distance="md">
        <VisualInterruption height="vh-100" intensity={intensity}>
          {content}
        </VisualInterruption>
      </Reveal>
    </section>
  );
}
