import React from 'react';
import { LandingPageTemplate } from '@/components/templates/LandingPageTemplate';
import { homePageConfig } from '@/config/pages/home';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: homePageConfig.metadata?.title,
  description: homePageConfig.metadata?.description,
};

export default function HomePage() {
  return <LandingPageTemplate config={homePageConfig} />;
}
