import { ResearchEvidence, EngineeringPattern } from '../../config/external-intelligence';

export class EngineeringPatternExtractor {
  
  static extract(evidenceList: ResearchEvidence[]): EngineeringPattern[] {
    const patterns: EngineeringPattern[] = [];

    for (const evidence of evidenceList) {
      if (evidence.tags.includes('engineering') || evidence.tags.includes('repository')) {
        
        const patternId = `ENG_PATTERN_${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        
        patterns.push({
          patternId,
          category: 'ARCHITECTURE',
          description: `Extracted engineering pattern based on claim: ${evidence.claim.substring(0, 50)}...`,
          characteristics: ['structured component composition', 'type-safe interfaces'],
          sourceReferences: [evidence.provenance.sourceUrl],
          confidence: evidence.confidence === 'very_high' ? 0.95 : evidence.confidence === 'high' ? 0.8 : 0.5,
          licenseStatus: evidence.provenance.licenseStatus || 'UNKNOWN'
        });
      }
    }

    return patterns;
  }
}
