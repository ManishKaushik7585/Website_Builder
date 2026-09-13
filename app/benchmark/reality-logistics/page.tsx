import React from 'react';
import { PageRenderer, PageConfig } from '@/components/composition/PageRenderer';

const config: PageConfig = {
  template: 'landing',
  sections: [
    {
      id: 's1',
      type: 'hero',
      props: {
        variant: 'split',
        title: { entity: 'text', role: 'heading', content: 'GLOBAL FREIGHT' },
        description: { entity: 'text', role: 'body', content: 'Operationally sophisticated infrastructure.' },
        media: {
          entity: 'asset',
          type: 'image',
          subject: 'container-ship',
          dominance: 'leading',
          treatment: 'full-bleed',
          overlapIntent: 'none',
          src: '/images/logistics-hero.jpg'
        }
      }
    },
    {
      id: 's2',
      type: 'metrics',
      props: {
        title: { entity: 'text', role: 'heading', content: 'Scale & Reach' },
        metrics: [
          { value: '140+', label: 'Global Ports' },
          { value: '2.4M', label: 'TEU Capacity' },
          { value: '99.9%', label: 'On-time Delivery' },
          { value: '24/7', label: 'Active Tracking' }
        ]
      }
    },
    {
      id: 's3',
      type: 'features',
      props: {
        title: { entity: 'text', role: 'heading', content: 'Network Operations' },
        composition: 'staggered-collection',
        items: [
          { entity: 'text', role: 'heading', content: 'Real-time tracking' },
          { entity: 'text', role: 'heading', content: 'Secure transit' },
          { entity: 'text', role: 'heading', content: 'Automated customs' }
        ]
      }
    }
  ]
};

export default function RealityLogistics() {
  return <main className="w-full min-h-screen bg-slate-900 text-white"><PageRenderer config={config} /></main>;
}
