import { PageRole, PageRoleType } from '../config/page-role';

export const PAGE_ROLES: Record<PageRoleType, PageRole> = {
  home: { 
    type: 'home', purpose: 'landing', primaryIntent: 'convert', recommendedSections: [], density: 'balanced', visualPriority: 'high', ctaBehavior: 'standard', mediaBehavior: 'hero-focused', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'value-proposition', requirement: 'required', minOccurrences: 1, maxOccurrences: 2 },
        { purpose: 'feature', requirement: 'recommended', minOccurrences: 0, maxOccurrences: 4 },
        { purpose: 'proof', requirement: 'recommended', minOccurrences: 0, maxOccurrences: 2 },
        { purpose: 'final-cta', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 }
      ],
      orderingRules: ['hero', 'value-proposition'],
      density: 'balanced',
      hierarchy: ['primary', 'secondary', 'supporting']
    }
  },
  about: { 
    type: 'about', purpose: 'inform', primaryIntent: 'trust', recommendedSections: [], density: 'balanced', visualPriority: 'medium', ctaBehavior: 'subtle', mediaBehavior: 'content-inline', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'about', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'team', requirement: 'optional', minOccurrences: 0, maxOccurrences: 1 },
        { purpose: 'proof', requirement: 'recommended', minOccurrences: 0, maxOccurrences: 1 }
      ],
      orderingRules: ['hero', 'about'],
      density: 'balanced',
      hierarchy: ['primary', 'secondary', 'supporting']
    }
  },
  services: { 
    type: 'services', purpose: 'inform', primaryIntent: 'convert', recommendedSections: [], density: 'dense', visualPriority: 'medium', ctaBehavior: 'standard', mediaBehavior: 'content-inline', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'feature', requirement: 'required', minOccurrences: 1, maxOccurrences: 10 },
        { purpose: 'process', requirement: 'optional', minOccurrences: 0, maxOccurrences: 1 },
        { purpose: 'final-cta', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 }
      ],
      orderingRules: ['hero', 'feature'],
      density: 'dense',
      hierarchy: ['primary', 'secondary']
    }
  },
  product: { 
    type: 'product', purpose: 'sell', primaryIntent: 'convert', recommendedSections: [], density: 'balanced', visualPriority: 'high', ctaBehavior: 'aggressive', mediaBehavior: 'hero-focused', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'value-proposition', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'feature', requirement: 'recommended', minOccurrences: 1, maxOccurrences: 5 },
        { purpose: 'proof', requirement: 'recommended', minOccurrences: 1, maxOccurrences: 2 },
        { purpose: 'final-cta', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 }
      ],
      orderingRules: ['hero', 'value-proposition'],
      density: 'balanced',
      hierarchy: ['primary', 'secondary', 'supporting']
    }
  },
  pricing: { 
    type: 'pricing', purpose: 'compare', primaryIntent: 'convert', recommendedSections: [], density: 'dense', visualPriority: 'high', ctaBehavior: 'aggressive', mediaBehavior: 'minimal', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'pricing', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'comparison', requirement: 'optional', minOccurrences: 0, maxOccurrences: 1 },
        { purpose: 'faq', requirement: 'recommended', minOccurrences: 0, maxOccurrences: 1 },
        { purpose: 'final-cta', requirement: 'recommended', minOccurrences: 0, maxOccurrences: 1 }
      ],
      orderingRules: ['hero', 'pricing'],
      density: 'dense',
      hierarchy: ['primary', 'secondary']
    }
  },
  caseStudy: { 
    type: 'caseStudy', purpose: 'inform', primaryIntent: 'trust', recommendedSections: [], density: 'sparse', visualPriority: 'high', ctaBehavior: 'standard', mediaBehavior: 'gallery', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'case-study', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'proof', requirement: 'recommended', minOccurrences: 0, maxOccurrences: 2 }
      ],
      orderingRules: ['hero', 'case-study'],
      density: 'sparse',
      hierarchy: ['primary', 'supporting']
    }
  },
  blog: { 
    type: 'blog', purpose: 'inform', primaryIntent: 'educate', recommendedSections: [], density: 'dense', visualPriority: 'low', ctaBehavior: 'subtle', mediaBehavior: 'content-inline', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 }
      ],
      orderingRules: ['hero'],
      density: 'dense',
      hierarchy: ['primary', 'secondary', 'metadata']
    }
  },
  contact: { 
    type: 'contact', purpose: 'action', primaryIntent: 'convert', recommendedSections: [], density: 'sparse', visualPriority: 'medium', ctaBehavior: 'standard', mediaBehavior: 'minimal', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'contact', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'faq', requirement: 'optional', minOccurrences: 0, maxOccurrences: 1 }
      ],
      orderingRules: ['hero', 'contact'],
      density: 'sparse',
      hierarchy: ['primary', 'secondary']
    }
  },
  careers: { 
    type: 'careers', purpose: 'inform', primaryIntent: 'recruit', recommendedSections: [], density: 'balanced', visualPriority: 'medium', ctaBehavior: 'standard', mediaBehavior: 'content-inline', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'about', requirement: 'recommended', minOccurrences: 0, maxOccurrences: 1 }
      ],
      orderingRules: ['hero'],
      density: 'balanced',
      hierarchy: ['primary', 'secondary']
    }
  },
  legal: { 
    type: 'legal', purpose: 'inform', primaryIntent: 'compliance', recommendedSections: [], density: 'dense', visualPriority: 'low', ctaBehavior: 'subtle', mediaBehavior: 'minimal', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 }
      ],
      orderingRules: ['hero'],
      density: 'dense',
      hierarchy: ['primary']
    }
  },
  landing: { 
    type: 'landing', purpose: 'campaign', primaryIntent: 'convert', recommendedSections: [], density: 'balanced', visualPriority: 'high', ctaBehavior: 'aggressive', mediaBehavior: 'hero-focused', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'value-proposition', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'proof', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'final-cta', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 }
      ],
      orderingRules: ['hero', 'value-proposition', 'proof', 'final-cta'],
      density: 'balanced',
      hierarchy: ['primary', 'secondary']
    }
  },
  campaign: { 
    type: 'campaign', purpose: 'campaign', primaryIntent: 'convert', recommendedSections: [], density: 'sparse', visualPriority: 'high', ctaBehavior: 'aggressive', mediaBehavior: 'hero-focused', allowedVariation: [],
    contentExpectations: {
      requirements: [
        { purpose: 'hero', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 },
        { purpose: 'final-cta', requirement: 'required', minOccurrences: 1, maxOccurrences: 1 }
      ],
      orderingRules: ['hero'],
      density: 'sparse',
      hierarchy: ['primary']
    }
  }
};
