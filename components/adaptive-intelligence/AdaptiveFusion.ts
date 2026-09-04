import { AdaptiveIntelligenceContext, AdaptiveKnowledge, LearningRecommendation } from '../../config/adaptive-intelligence';

export class AdaptiveFusion {
  static fuseContext(
    projectId: string,
    activeKnowledge: AdaptiveKnowledge[],
    recommendations: LearningRecommendation[],
    failureSignals: AdaptiveKnowledge[],
    researchEffectivenessCandidates: AdaptiveKnowledge[]
  ): AdaptiveIntelligenceContext {
    
    const researchEffectivenessMap: Record<string, 'high' | 'low'> = {};
    for (const re of researchEffectivenessCandidates) {
      if (re.provenance?.providerName) {
        researchEffectivenessMap[re.provenance.providerName] = re.statement.includes('highly effective') ? 'high' : 'low';
      }
    }

    return {
      projectId,
      activeKnowledge,
      recommendations,
      failureSignals: failureSignals.map(f => f.statement),
      researchEffectiveness: researchEffectivenessMap
    };
  }
}
