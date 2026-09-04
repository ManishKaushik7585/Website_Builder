import { KnowledgeCandidate, AdaptiveKnowledge, MemoryPolicy } from '../../config/adaptive-intelligence';

export class KnowledgePromotion {
  
  static evaluatePromotion(
    candidate: KnowledgeCandidate, 
    policy: MemoryPolicy
  ): AdaptiveKnowledge | null {
    
    // Rule: Must not be already active
    if (candidate.status === 'active' || candidate.status === 'validated') return null;

    // Evaluate against policy thresholds
    const evidenceCount = candidate.evidence.length;
    const projectSet = new Set(candidate.evidence.map(e => e.projectContext?.projectId).filter(Boolean));
    const projectCount = projectSet.size;

    // Special case for explicit user feedback: promote immediately to project scope
    if (candidate.type === 'user_preference' && candidate.confidence === 'very_high') {
      return {
        ...candidate,
        status: 'active',
        scope: 'project',
        lastValidatedAt: new Date().toISOString()
      };
    }

    // Global Promotion
    if (
      evidenceCount >= policy.promotionThresholds.minimumObservations &&
      projectCount >= policy.promotionThresholds.minimumIndependentProjects
    ) {
      return {
        ...candidate,
        status: 'active',
        scope: 'global',
        lastValidatedAt: new Date().toISOString()
      };
    }

    // Project Promotion (if it fails global but has enough local evidence)
    if (evidenceCount >= 1) {
      return {
        ...candidate,
        status: 'active',
        scope: 'project',
        lastValidatedAt: new Date().toISOString()
      };
    }

    return null; // Stays as candidate
  }
}
