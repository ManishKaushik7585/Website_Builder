import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { ManifestoSection } from '@/components/sections/ManifestoSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { EditorialSection } from '@/components/sections/EditorialSection';
import { MetricsSection } from '@/components/sections/MetricsSection';
import { MediaNarrativeSection } from '@/components/sections/MediaNarrativeSection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sectionRegistry: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  features: FeaturesSection,
  socialProof: SocialProofSection,
  manifesto: ManifestoSection,
  gallery: GallerySection,
  editorial: EditorialSection,
  metrics: MetricsSection,
  mediaNarrative: MediaNarrativeSection,
};
