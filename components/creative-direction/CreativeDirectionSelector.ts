import { CreativeDirectionAlternative } from '../../config/creative-direction';
import { CreativeDirectionScorer } from './CreativeDirectionScorer';

export class CreativeDirectionSelector {
  static select(
    alternatives: CreativeDirectionAlternative[],
    contextSummary: string
  ): CreativeDirectionAlternative {
    if (alternatives.length === 0) {
      throw new Error('Cannot select from empty alternatives list');
    }

    if (alternatives.length === 1) {
      return alternatives[0];
    }

    const scored = CreativeDirectionScorer.scoreAll(alternatives, contextSummary);
    
    // Sort descending by score
    scored.sort((a, b) => (b.score || 0) - (a.score || 0));

    // Handle tie-breaker deterministically by alphabetical identity match
    if (scored.length > 1 && scored[0].score === scored[1].score) {
      scored.sort((a, b) => {
        if (a.score !== b.score) return (b.score || 0) - (a.score || 0);
        return a.identity.localeCompare(b.identity);
      });
    }

    return scored[0];
  }
}
