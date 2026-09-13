import React from 'react';
import { PageRenderer, PageConfig } from '@/components/composition/PageRenderer';

const config: PageConfig = {
  template: 'landing',
  sections: [
    {
      id: 's1',
      type: 'hero',
      props: {
        variant: 'layered-overlap',
        title: { entity: 'text', role: 'heading', content: 'MAISON VANGUARD' },
        description: { entity: 'text', role: 'body', content: 'Tactile, exclusive, culturally sophisticated.' },
        media: {
          entity: 'asset',
          type: 'image',
          subject: 'editorial-fashion-shoot',
          dominance: 'immersive',
          treatment: 'full-bleed',
          overlapIntent: 'background',
          src: '/images/luxury-hero.jpg'
        }
      }
    },
    {
      id: 's2',
      type: 'editorial',
      props: {
        primary: { entity: 'text', role: 'manifesto', content: 'Craftsmanship meets radical modernism.' },
        supporting: {
          entity: 'asset',
          type: 'image',
          subject: 'fabric-detail',
          dominance: 'supporting',
          treatment: 'contained',
          overlapIntent: 'none',
          src: '/images/luxury-detail.jpg'
        }
      }
    },
    {
      id: 's3',
      type: 'features',
      props: {
        title: { entity: 'text', role: 'heading', content: 'The Collection' },
        composition: 'editorial-columns',
        items: [
          { entity: 'text', role: 'heading', content: 'Look 01: Silk & Shadow' },
          { entity: 'asset', type: 'image', subject: 'runway-detail', dominance: 'leading', treatment: 'contained', overlapIntent: 'none', src: '/images/luxury-runway.jpg' }
        ]
      }
    }
  ]
};

export default function RealityLuxury() {
  return <main className="w-full min-h-screen bg-stone-50 text-stone-900"><PageRenderer config={config} /></main>;
}
