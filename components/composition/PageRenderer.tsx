import { ContentIntentConfig } from '@/config/content-intent';
import { VisualIntent } from '@/config/visual-intent';
import React from 'react';
import { sectionRegistry } from '@/registry/sections';

export interface PageSectionConfig {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
}

export interface PageConfig {
  contentIntent?: ContentIntentConfig;
  template: 'landing' | 'content';
  visualIntent?: VisualIntent;
  metadata?: {
    title?: string;
    description?: string;
  };
  sections: PageSectionConfig[];
}

export function PageRenderer({ config }: { config: PageConfig }) {
  return (
    <>
      {config.sections.map((section) => {
        const SectionComponent = sectionRegistry[section.type];
        
        if (!SectionComponent) {
          console.warn(`[PageRenderer] Unknown section type "${section.type}". Skipping.`);
          return null; // Gracefully handle unknown sections
        }

        return <SectionComponent key={section.id} {...section.props} />;
      })}
    </>
  );
}
