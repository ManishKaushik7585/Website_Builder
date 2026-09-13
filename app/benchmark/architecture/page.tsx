import React from 'react';
import { PageRenderer } from '@/components/composition/PageRenderer';

// Simulated Generation of: 
// "Create an experimental architecture studio website. Precise, spatial, typographic and visually unconventional. Make the website itself feel architectural."

const architectureSitePlan = {
  template: 'landing' as const,
  sections: [
    {
      id: 'hero',
      type: 'hero',
      props: {
        title: 'VOID & MATTER',
        description: 'We construct spaces that challenge the boundaries of perception, geometry, and environment.',
        variant: 'visual-interruption'
      }
    },
    {
      id: 'showcase',
      type: 'features',
      props: {
        title: 'Selected Works',
        description: 'Exploring the tension between gravity and light.',
        composition: 'layered-overlap',
        items: [
          <div key="1" className="aspect-square bg-stone-800" />,
          <div key="2" className="aspect-[4/3] bg-stone-700 mt-12" />,
          <div key="3" className="aspect-[3/4] bg-stone-600" />
        ]
      }
    },
    {
      id: 'philosophy',
      type: 'features',
      props: {
        title: 'Our Approach',
        description: 'Architecture is not merely shelter. It is a spatial narrative.',
        composition: 'editorial-columns',
        items: [
          <div key="text" className="text-xl">Every project begins with a void.</div>,
          <div key="img" className="aspect-video bg-stone-800" />
        ]
      }
    }
  ]
};

export default function ArchitectureBenchmark() {
  return (
    <main className="w-full bg-stone-900 text-stone-100 font-sans selection:bg-stone-100 selection:text-stone-900 overflow-x-hidden">
      <PageRenderer config={architectureSitePlan} />
    </main>
  );
}
