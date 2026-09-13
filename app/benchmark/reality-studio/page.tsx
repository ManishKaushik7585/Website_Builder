import React from 'react';
import { PageRenderer, PageConfig } from '@/components/composition/PageRenderer';

const config: PageConfig = {
  template: 'landing',
  sections: [
    {
      id: 's1',
      type: 'hero',
      props: {
        variant: 'media-narrative',
        title: { entity: 'text', role: 'heading', content: 'STUDIO NOMAD' },
        description: { entity: 'text', role: 'body', content: 'Highly authored digital experiences.' },
        media: {
          entity: 'asset',
          type: 'image',
          subject: 'abstract-art-direction',
          dominance: 'immersive',
          treatment: 'full-bleed',
          overlapIntent: 'none',
          src: '/images/studio-hero.jpg'
        }
      }
    },
    {
      id: 's2',
      type: 'gallery',
      props: {
        title: { entity: 'text', role: 'heading', content: 'Capabilities' },
        layout: 'staggered',
        items: [
          { entity: 'asset', type: 'image', subject: 'brand-identity', dominance: 'leading', treatment: 'contained', overlapIntent: 'none', src: '/images/studio-1.jpg' },
          { entity: 'text', role: 'heading', content: 'Brand Identity' },
          { entity: 'asset', type: 'image', subject: 'digital-experience', dominance: 'leading', treatment: 'contained', overlapIntent: 'none', src: '/images/studio-2.jpg' },
          { entity: 'text', role: 'heading', content: 'Digital Experience' }
        ]
      }
    }
  ]
};

export default function RealityStudio() {
  return <main className="w-full min-h-screen bg-[#ececec] text-[#1a1a1a]"><PageRenderer config={config} /></main>;
}
