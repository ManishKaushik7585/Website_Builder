import React from 'react';
import { SiteShell } from '../site/SiteShell';
import { Header } from '../site/Header';
import { Footer } from '../site/Footer';
import { MAIN_NAVIGATION } from '@/config/navigation';
import { PageRenderer, PageConfig } from '../composition/PageRenderer';

export function LandingPageTemplate({ config }: { config: PageConfig }) {
  const header = (
    <Header 
      brand={<span className="font-bold text-xl">Brand</span>} 
      navigation={MAIN_NAVIGATION} 
    />
  );
  
  const footer = (
    <Footer 
      brand={<span className="font-bold text-xl text-gray-500">Brand</span>} 
      columns={[{ title: 'Sitemap', links: MAIN_NAVIGATION }]} 
      copyright="© 2026 Brand. All rights reserved." 
    />
  );

  return (
    <SiteShell header={header} footer={footer}>
      <PageRenderer config={config} />
    </SiteShell>
  );
}
