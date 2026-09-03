export type ContentIntent = 
  | 'explain' 
  | 'persuade' 
  | 'compare' 
  | 'educate' 
  | 'reassure' 
  | 'convert' 
  | 'demonstrate' 
  | 'establish-trust' 
  | 'differentiate' 
  | 'onboard' 
  | 'inform' 
  | 'support-decision';

export type SectionPurpose = 
  | 'hero' 
  | 'value-proposition' 
  | 'feature' 
  | 'benefit' 
  | 'process' 
  | 'proof' 
  | 'testimonial' 
  | 'comparison' 
  | 'pricing' 
  | 'faq' 
  | 'integration' 
  | 'case-study' 
  | 'statistics' 
  | 'trust' 
  | 'team' 
  | 'final-cta' 
  | 'navigation-support'
  | 'about'
  | 'contact'
  | 'gallery'
  | 'footer'
  | 'unknown'; // fallback

export type SectionRequirementType = 'required' | 'recommended' | 'optional' | 'prohibited';

export interface SectionRequirement {
  purpose: SectionPurpose;
  requirement: SectionRequirementType;
  minOccurrences: number;
  maxOccurrences: number;
  allowedDependencies?: SectionPurpose[];
  densityExpectation?: SectionDensity;
}

export type SectionDensity = 'sparse' | 'balanced' | 'dense';

export type ContentLength = 'micro' | 'short' | 'medium' | 'long';

export type ContentPriority = 'primary' | 'secondary' | 'supporting' | 'metadata';

export interface ContentConstraint {
  maxHeadingLength: number;
  maxSupportingCopy: number;
  maxCards: number;
  maxBullets: number;
  maxCtaCount: number;
  minRequiredContent: number;
  allowRepeatedContent: boolean;
}

export interface SectionPlan {
  purpose: SectionPurpose;
  intent: ContentIntent[];
  priority: ContentPriority;
  density: SectionDensity;
  contentLength: ContentLength;
  constraints: ContentConstraint;
  expectedOrderIndex?: number;
  isOptional: boolean;
}

export interface ContentPlan {
  primaryIntent: ContentIntent;
  targetDensity: SectionDensity;
  hierarchy: ContentPriority[];
  globalConstraints: ContentConstraint;
}

export interface PageContentPlan {
  pageId: string;
  role: string;
  globalPlan: ContentPlan;
  sections: SectionPlan[];
}
