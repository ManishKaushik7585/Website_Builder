import { KnowledgeConfidence, KnowledgeCandidate } from '../../config/adaptive-intelligence';

export class LearningConfidenceEngine {
  
  static calculateConfidence(
    evidenceCount: number,
    contradictionCount: number,
    projectCount: number,
    sourceReliability: 'low' | 'medium' | 'high'
  ): KnowledgeConfidence {
    let score = 0;

    // 1. Evidence Strength
    if (evidenceCount >= 5) score += 3;
    else if (evidenceCount >= 3) score += 2;
    else if (evidenceCount >= 1) score += 1;

    // 2. Corroboration (Cross-project)
    if (projectCount >= 3) score += 2;
    else if (projectCount >= 2) score += 1;

    // 3. Contradiction Penalty
    if (contradictionCount > 0) score -= contradictionCount * 2;

    // 4. Source Reliability
    if (sourceReliability === 'high') score += 1;
    else if (sourceReliability === 'low') score -= 1;

    if (score >= 6) return 'very_high';
    if (score >= 4) return 'high';
    if (score >= 2) return 'medium';
    if (score >= 1) return 'low';
    return 'very_low';
  }

  static evaluateCandidateConfidence(candidate: KnowledgeCandidate, contradictions: number = 0): KnowledgeConfidence {
    const evidenceCount = candidate.evidence.length;
    const projectSet = new Set(candidate.evidence.map(e => e.projectContext?.projectId).filter(Boolean));
    const projectCount = projectSet.size;

    // Assess source reliability based on explicit manual feedback or automated observation
    const hasManualFeedback = candidate.evidence.some(e => e.source === 'user_feedback');
    const sourceReliability = hasManualFeedback ? 'high' : 'medium';

    return this.calculateConfidence(evidenceCount, contradictions, projectCount, sourceReliability);
  }
}
