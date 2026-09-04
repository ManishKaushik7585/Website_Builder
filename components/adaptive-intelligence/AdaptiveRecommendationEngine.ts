/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdaptiveKnowledge, LearningRecommendation } from '../../config/adaptive-intelligence';
import { ContextMatcher } from './ContextMatcher';

export class AdaptiveRecommendationEngine {
  
  static generateRecommendations(
    activeKnowledge: AdaptiveKnowledge[], 
    currentContext: any
  ): LearningRecommendation[] {
    const recommendations: LearningRecommendation[] = [];

    // Filter knowledge by current context
    const matchedKnowledge = ContextMatcher.match(activeKnowledge, currentContext);

    for (const k of matchedKnowledge) {
      if (k.type === 'design_pattern' || k.type === 'engineering_pattern') {
        recommendations.push({
          reason: k.statement,
          confidence: k.confidence,
          evidence: `${k.evidence.length} supporting observations from ${new Set(k.evidence.map(e => e.projectContext?.projectId)).size} projects`,
          scope: k.scope,
          applicability: currentContext
        });
      } else if (k.type === 'failure_pattern') {
        recommendations.push({
          reason: `AVOID: ${k.statement}`,
          confidence: k.confidence,
          evidence: `${k.evidence.length} recorded failures`,
          scope: k.scope,
          applicability: currentContext
        });
      } else if (k.type === 'user_preference') {
         recommendations.push({
          reason: `USER PREFERENCE: ${k.statement}`,
          confidence: k.confidence,
          evidence: `Direct user feedback`,
          scope: k.scope,
          applicability: currentContext
        });
      }
    }

    return recommendations;
  }
}
