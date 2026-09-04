import { CreativeDirectionAlternative } from '../../config/creative-direction';

export interface ScoringWeights {
  briefAlignment: number;
  audienceAlignment: number;
  evidence: number;
  differentiation: number;
  technicalFeasibility: number;
  accessibility: number;
  pageCompatibility: number;
  historicalOutcomes: number;
}

const DEFAULT_WEIGHTS: ScoringWeights = {
  briefAlignment: 0.25,
  audienceAlignment: 0.20,
  evidence: 0.15,
  differentiation: 0.15,
  technicalFeasibility: 0.10,
  accessibility: 0.05,
  pageCompatibility: 0.05,
  historicalOutcomes: 0.05
};

export class CreativeDirectionScorer {
  static scoreAlternative(
    alt: CreativeDirectionAlternative,
    contextSummary: string,
    weights: ScoringWeights = DEFAULT_WEIGHTS
  ): number {
    let score = 0;
    
    // In a real LLM scenario, these would be semantic similarity checks or sub-agent grades.
    // For deterministic mock implementation, we use heuristics.
    
    // Brief Alignment (Simulated)
    const matchesBrief = alt.identity.length > 5;
    score += (matchesBrief ? 0.9 : 0.4) * weights.briefAlignment;

    // Audience Alignment
    const hasConditions = alt.bestFitConditions.length > 0;
    score += (hasConditions ? 0.8 : 0.3) * weights.audienceAlignment;

    // Evidence
    const hasEvidence = alt.supportingEvidenceIds.length > 0;
    score += (hasEvidence ? 1.0 : 0.0) * weights.evidence;

    // Differentiation
    const isDistinct = alt.strengths.length >= 2;
    score += (isDistinct ? 0.85 : 0.5) * weights.differentiation;

    // Feasibility & Accessibility
    const hasTechImplications = alt.technicalImplications.length > 0;
    score += (hasTechImplications ? 0.9 : 0.4) * weights.technicalFeasibility;
    score += (alt.risks.some(r => r.toLowerCase().includes('accessibility')) ? 0.5 : 1.0) * weights.accessibility;

    // Historical Outcomes
    // If it has supporting evidence from adaptive memory
    const hasAdaptiveMemory = alt.supportingEvidenceIds.some(id => id.includes('adaptive'));
    score += (hasAdaptiveMemory ? 1.0 : 0.3) * weights.historicalOutcomes;

    // Base score logic for mock output consistency
    score += 0.8 * weights.pageCompatibility;

    return Math.min(Math.max(score, 0), 1);
  }

  static scoreAll(alternatives: CreativeDirectionAlternative[], contextSummary: string): CreativeDirectionAlternative[] {
    return alternatives.map(alt => ({
      ...alt,
      score: this.scoreAlternative(alt, contextSummary)
    }));
  }
}
