import { MediaSlot } from '@/components/media/MediaSlot';
import React from 'react';
import { PageConfig } from '@/components/composition/PageRenderer';

export const homePageConfig: PageConfig = {
  template: 'landing',
  visualIntent: { mode: 'technical', intensity: 'medium', density: 'balanced', emphasis: 'typography' },
  contentIntent: { objective: 'inform', tone: 'technical', density: 'balanced' },
  metadata: {
    title: 'Premium Website Engine | Engineered for AI',
    description: 'A structured website engine where design intelligence, reusable components, responsive patterns, motion, and page composition work together as one system.',
  },
  sections: [
    {
      id: 'home-hero',
      type: 'hero',
      props: {
        variant: 'split',
        eyebrow: 'PREMIUM WEBSITE ENGINE',
        title: 'Engineered for AI. Designed for Humans.',
        description: 'A structured website engine where design intelligence, reusable components, responsive patterns, motion, and page composition work together as one system.',
        actions: (
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#features" className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 transition-colors">
              Explore the System
            </a>
            <a href="#architecture" className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
              View the Architecture
            </a>
          </div>
        ),
        media: (
          <MediaSlot asset="engine-hero" className="w-full h-full min-h-[400px] bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center p-8 relative overflow-hidden">
             <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
             <div className="grid grid-cols-2 gap-4 w-full max-w-sm relative z-10">
               <div className="bg-white p-4 shadow-sm rounded-lg border border-gray-100 flex flex-col gap-2">
                 <div className="h-2 w-12 bg-gray-200 rounded-full" />
                 <div className="h-2 w-full bg-gray-100 rounded-full" />
                 <div className="h-2 w-2/3 bg-gray-100 rounded-full" />
               </div>
               <div className="bg-white p-4 shadow-sm rounded-lg border border-gray-100 flex flex-col gap-2 translate-y-4">
                 <div className="h-8 w-8 bg-gray-200 rounded-md" />
                 <div className="h-2 w-full bg-gray-100 rounded-full" />
               </div>
               <div className="bg-white p-4 shadow-sm rounded-lg border border-gray-100 flex flex-col gap-2 col-span-2">
                 <div className="h-2 w-16 bg-gray-200 rounded-full" />
                 <div className="flex gap-2 mt-2">
                   <div className="h-8 w-full bg-gray-50 rounded-sm" />
                   <div className="h-8 w-full bg-gray-50 rounded-sm" />
                 </div>
               </div>
             </div>
          </MediaSlot>
        )
      }
    },
    {
      id: 'home-social-proof',
      type: 'socialProof',
      props: {
        title: 'Architectural Integrity',
        description: 'Built on a strict hierarchy of primitives, composites, and patterns without third-party UI bloat.',
        logos: (
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale">
             <div className="text-xl font-bold tracking-tighter text-center">Next.js 15</div>
             <div className="text-xl font-bold tracking-tighter text-center">React 19</div>
             <div className="text-xl font-bold tracking-tighter text-center">Tailwind CSS</div>
             <div className="text-xl font-bold tracking-tighter text-center">TypeScript</div>
           </div>
        ),
        metrics: [
          { label: 'Lighthouse Score', value: '100' },
          { label: 'Layout Shifts', value: '0' },
          { label: 'Dependencies', value: 'Minimal' }
        ]
      }
    },
    {
      id: 'home-features',
      type: 'features',
      props: {
        id: 'features',
        eyebrow: 'THE ARCHITECTURE',
        title: 'A System of Systems',
        description: 'Every layer of the website engine is designed to be composable, accessible, and token-driven.',
        features: [
          {
            title: 'Design Intelligence',
            description: 'Strict spacing, typography, and color tokens governing all visual decisions.',
            icon: <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-mono text-xs font-bold">01</div>
          },
          {
            title: 'Reusable Patterns',
            description: 'Structural grid and flex compositions that decouple layout from media.',
            icon: <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-mono text-xs font-bold">02</div>
          },
          {
            title: 'Motion System',
            description: 'Purposeful, CSS-driven reveals that respect user preferences and avoid layout thrashing.',
            icon: <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-mono text-xs font-bold">03</div>
          },
          {
            title: 'Page Composition',
            description: 'Serializable configuration dictating section rendering without arbitrary JSX.',
            icon: <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center font-mono text-xs font-bold">04</div>
          }
        ]
      }
    }
  ]
};
