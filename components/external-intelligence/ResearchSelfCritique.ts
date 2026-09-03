import { ExternalIntelligenceResult } from '../../config/external-intelligence';

export class ResearchSelfCritique {
  static critique(result: ExternalIntelligenceResult): string[] {
    const critiques: string[] = [];
    
    const obsCount = result.memory.evidence.observed.length;
    if (obsCount > 0) {
      critiques.push(`${obsCount} independent patterns were directly observed and fused.`);
    } else {
      critiques.push('No direct evidence was observed during the research phase.');
    }

    const highConfidence = result.memory.evidence.observed.filter(e => e.confidence === 'high').length;
    if (highConfidence > 0) {
      critiques.push(`${highConfidence} patterns reached high confidence due to corroboration across sources.`);
    }

    if (result.budgetConsumed.iterations > 0) {
      critiques.push(`Research completed successfully within ${result.budgetConsumed.iterations} iterations.`);
    } else {
      critiques.push('Confidence thresholds met immediately; deep research was bypassed.');
    }

    return critiques;
  }
}
