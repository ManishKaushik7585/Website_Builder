import { CreativeDirectionAlternative, CreativeDirectionConfidence as IConfidence, CreativeDirectionEvidence } from '../../config/creative-direction';
import { ScoringWeights } from './CreativeDirectionScorer';

export class CreativeDirectionConfidence {
  static calculate(
    selectedAlt: CreativeDirectionAlternative,
    allAlts: CreativeDirectionAlternative[],
    evidence: CreativeDirectionEvidence[],
    researchGaps: string[],
    constraintViolations: string[]
  ): IConfidence {
    let overall = 0;

    // 1. Evidence Score (Quantity & Quality)
    const evidenceScore = Math.min(evidence.length / 5, 1.0) * 0.4; // 40% of confidence from evidence
    
    // 2. Selection Margin (How much better is it than the alternative?)
    let marginScore = 0.2; // default
    if (allAlts.length > 1) {
      const sorted = [...allAlts].sort((a, b) => (b.score || 0) - (a.score || 0));
      const margin = (sorted[0].score || 0) - (sorted[1].score || 0);
      marginScore = Math.min(margin * 2, 0.2); // max 20%
    } else {
      marginScore = 0.1; // only one alternative
    }

    // 3. Research Gaps penalty
    const gapPenalty = Math.min(researchGaps.length * 0.1, 0.3);

    // 4. Constraint Completeness
    const constraintPenalty = Math.min(constraintViolations.length * 0.15, 0.4);

    overall = Math.min(Math.max((evidenceScore + marginScore + 0.4) - gapPenalty - constraintPenalty, 0.1), 1.0);

    const uncertaintyReasons: string[] = [];
    if (evidence.length < 3) uncertaintyReasons.push('Low evidence volume');
    if (researchGaps.length > 0) uncertaintyReasons.push(`Detected ${researchGaps.length} research gaps`);
    if (constraintViolations.length > 0) uncertaintyReasons.push(`Has unresolved constraint warnings`);

    return {
      overall,
      visualIdentity: overall,
      typography: overall * 0.9,
      color: overall * 0.95,
      layout: overall * 0.85,
      motion: overall * 0.8,
      imagery: overall * 0.7,
      responsive: overall,
      evidenceCount: evidence.length,
      uncertaintyReasons
    };
  }
}
