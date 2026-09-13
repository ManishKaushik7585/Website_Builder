
export type PageRoleType = 'home' | 'about' | 'services' | 'product' | 'pricing' | 'caseStudy' | 'blog' | 'contact' | 'careers' | 'legal' | 'landing' | 'campaign';

export interface PageRole {
  type: PageRoleType;
  purpose: string;
  primaryIntent: string;
  recommendedSections: string[];
  density: 'sparse' | 'balanced' | 'dense';
  visualPriority: 'high' | 'medium' | 'low';
  ctaBehavior: 'aggressive' | 'standard' | 'subtle';
  mediaBehavior: 'hero-focused' | 'content-inline' | 'gallery' | 'minimal';
  allowedVariation: string[];
  contentExpectations?: {
    requirements: import('./content-intelligence').SectionRequirement[];
    orderingRules: import('./content-intelligence').SectionPurpose[]; // strict required ordering sequence
    density: import('./content-intelligence').SectionDensity;
    hierarchy: import('./content-intelligence').ContentPriority[];
    pageSpecificConstraints?: Partial<import('./content-intelligence').ContentConstraint>;
  };
  layoutIntent?: {
    layoutType?: 'symmetric' | 'asymmetric' | 'editorial' | 'minimal' | 'dense';
    compositionIntent?: 'centered' | 'split' | 'asymmetric-split' | 'editorial-columns' | 'staggered-collection' | 'featured-supporting' | 'media-narrative' | 'stacked';
    heroBalance?: 'text-dominant' | 'visual-dominant' | 'balanced';
  };
}
