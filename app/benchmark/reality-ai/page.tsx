import React from 'react';
import { PageRenderer, PageConfig } from '@/components/composition/PageRenderer';

const config: PageConfig = {
  template: 'landing',
  sections: [
    {
      id: 's1',
      type: 'hero',
      props: {
        variant: 'asymmetric-split',
        title: { entity: 'text', role: 'heading', content: 'NEXUS LABS' },
        description: { entity: 'text', role: 'body', content: 'Futuristic. Intelligent. Experimental.' },
        media: {
          entity: 'asset',
          type: 'image',
          subject: 'neural-network-visualization',
          dominance: 'leading',
          treatment: 'contained',
          overlapIntent: 'foreground',
          src: '/images/ai-hero.jpg'
        }
      }
    },
    {
      id: 's2',
      type: 'features',
      props: {
        title: { entity: 'text', role: 'heading', content: 'Research Focus' },
        composition: 'featured-supporting',
        items: [
          { entity: 'text', role: 'heading', content: 'Core: Autonomous Systems' },
          { entity: 'text', role: 'heading', content: 'Sub: Generative Models' },
          { entity: 'text', role: 'heading', content: 'Sub: Alignment' }
        ]
      }
    }
  ]
};

export default function RealityAi() {
  return <main className="w-full min-h-screen bg-[#050505] text-[#f0f0f0]"><PageRenderer config={config} /></main>;
}
