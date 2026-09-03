import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sectionRegistry: Record<string, React.ComponentType<any>> = {
  hero: HeroSection,
  features: FeaturesSection,
  socialProof: SocialProofSection,
};
