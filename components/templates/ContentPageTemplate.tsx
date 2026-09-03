import React from 'react';
import { LandingPageTemplate } from './LandingPageTemplate';
import { PageConfig } from '../composition/PageRenderer';

// For this phase, they are structurally similar, but content pages typically have narrower bounds.
// We will reuse LandingPageTemplate for simplicity, assuming section components govern width.
export function ContentPageTemplate({ config }: { config: PageConfig }) {
  return <LandingPageTemplate config={config} />;
}
