import { ResearchEvidence, DesignPattern, LicenseStatus } from '../../config/external-intelligence';

export class DesignPatternExtractor {
  
  static extract(evidenceList: ResearchEvidence[]): DesignPattern[] {
    const patterns: DesignPattern[] = [];
    
    // In a real live environment, an LLM would synthesize this logic.
    // For deterministic architecture mapping, we mock the extraction based on tags/claims.
    
    for (const evidence of evidenceList) {
      if (evidence.tags.includes('design') || evidence.tags.includes('ui-library')) {
        
        let patternId = `PATTERN_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        let category = 'GENERAL_UI';
        let description = 'Extracted abstract design pattern';
        let characteristics = ['standard layout'];
        let layoutLogic = 'standard block flow';
        
        if (evidence.claim.includes('SaaS') || evidence.source.includes('vercel.com')) {
          patternId = 'HERO_TECHNICAL_SAAS';
          category = 'HERO';
          description = 'High contrast, minimal technical hero pattern suitable for SaaS';
          characteristics = ['high contrast', 'large typography', 'restrained palette', 'strong grid'];
          layoutLogic = 'centered primary column with micro-borders';
        } else if (evidence.source.includes('motion-primitives')) {
          patternId = 'INTERACTIVE_MICRO_MOTION';
          category = 'INTERACTION';
          description = 'Spring-based micro-interactions for modern web';
          characteristics = ['spring physics', 'subtle scaling'];
          layoutLogic = 'inline component decorators';
        }

        patterns.push({
          patternId,
          category,
          description,
          characteristics,
          layoutLogic,
          responsiveConsiderations: ['mobile-first stacking'],
          motionConsiderations: ['prefers-reduced-motion fallback'],
          accessibilityConsiderations: ['aria-labels required', 'sufficient color contrast'],
          suitableIndustries: ['SaaS', 'Technology', 'Portfolio'],
          sourceReferences: [evidence.provenance.sourceUrl],
          confidence: evidence.confidence === 'very_high' ? 0.95 : evidence.confidence === 'high' ? 0.8 : 0.5,
          licenseStatus: evidence.provenance.licenseStatus || 'UNKNOWN'
        });
      }
    }

    return patterns;
  }
}
