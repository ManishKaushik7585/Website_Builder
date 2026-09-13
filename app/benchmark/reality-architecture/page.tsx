import React from 'react';
import { PageRenderer, PageConfig } from '@/components/composition/PageRenderer';

const config: PageConfig = {
  template: 'landing',
  sections: [
    {
      id: 's1',
      type: 'manifesto',
      props: {
        intensity: 'high',
        content: {
          entity: 'text',
          role: 'manifesto',
          content: 'VOID ARCHITECTURE. Challenging spatial perception.'
        }
      }
    },
    {
      id: 's2',
      type: 'mediaNarrative',
      props: {
        composition: 'overlap',
        media: {
          entity: 'asset',
          type: 'image',
          subject: 'brutalist-geometry',
          dominance: 'immersive',
          treatment: 'full-bleed',
          overlapIntent: 'background',
          src: '/images/architecture-hero.jpg' // Assuming fallback/resolution provides actual src in real engine, but for ceiling test we can mock a placeholder or let MediaSlot render fallback block. The MediaSlot actually just renders [image] if src is empty, let's provide a real placeholder or rely on the fallback.
        },
        content: {
          entity: 'text',
          role: 'heading',
          content: 'The Monolith. 2024.'
        }
      }
    },
    {
      id: 's3',
      type: 'gallery',
      props: {
        title: { entity: 'text', role: 'heading', content: 'Selected Works' },
        layout: 'staggered',
        items: [
          { entity: 'asset', type: 'image', subject: 'concrete-facade', dominance: 'leading', treatment: 'contained', overlapIntent: 'none', src: '/images/arch-1.jpg' },
          { entity: 'asset', type: 'image', subject: 'interior-shadows', dominance: 'supporting', treatment: 'contained', overlapIntent: 'none', src: '/images/arch-2.jpg' },
          { entity: 'asset', type: 'image', subject: 'geometric-stairs', dominance: 'leading', treatment: 'contained', overlapIntent: 'none', src: '/images/arch-3.jpg' }
        ]
      }
    }
  ]
};

export default function RealityArchitecture() {
  return <main className="w-full min-h-screen bg-zinc-950 text-zinc-100"><PageRenderer config={config} /></main>;
}
