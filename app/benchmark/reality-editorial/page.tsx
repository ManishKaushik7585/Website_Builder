import React from 'react';
import { PageRenderer, PageConfig } from '@/components/composition/PageRenderer';

const config: PageConfig = {
  template: 'landing',
  sections: [
    {
      id: 's1',
      type: 'hero',
      props: {
        variant: 'editorial-columns',
        title: { entity: 'text', role: 'heading', content: 'THE DISCOURSE' },
        description: { entity: 'text', role: 'body', content: 'Culture, technology, and society.' },
        media: {
          entity: 'asset',
          type: 'image',
          subject: 'cultural-essay-cover',
          dominance: 'supporting',
          treatment: 'contained',
          overlapIntent: 'none',
          src: '/images/editorial-hero.jpg'
        }
      }
    },
    {
      id: 's2',
      type: 'editorial',
      props: {
        primary: { entity: 'text', role: 'body', content: 'In an era defined by endless scrolling and infinite streams of data, the value of deep, intentional reading has never been higher.' },
        supporting: { entity: 'text', role: 'quote', content: '"We shape our tools and thereafter our tools shape us."' }
      }
    },
    {
      id: 's3',
      type: 'features',
      props: {
        title: { entity: 'text', role: 'heading', content: 'Latest Essays' },
        composition: 'editorial-columns',
        items: [
          { entity: 'text', role: 'heading', content: 'The End of Screens' },
          { entity: 'text', role: 'heading', content: 'Architectural Brutalism' }
        ]
      }
    }
  ]
};

export default function RealityEditorial() {
  return <main className="w-full min-h-screen bg-[#fcfbf9] text-[#111111]"><PageRenderer config={config} /></main>;
}
