import { LearningRecommendation } from '../../config/adaptive-intelligence';

export class AdaptiveSelfCritique {
  
  static evaluateRecommendations(recommendations: LearningRecommendation[]): LearningRecommendation[] {
    const validRecommendations: LearningRecommendation[] = [];

    const vagueTerms = ['feels better', 'looks premium', 'seems cleaner', 'probably works', 'AI thinks'];

    for (const rec of recommendations) {
      let isVague = false;
      const combinedText = (rec.reason + ' ' + rec.evidence).toLowerCase();

      for (const term of vagueTerms) {
        if (combinedText.includes(term.toLowerCase())) {
          isVague = true;
          break;
        }
      }

      // Also ensure evidence exists and isn't just empty claims
      const hasMetricEvidence = rec.evidence && (rec.evidence.includes('observations') || rec.evidence.includes('failures') || rec.evidence.includes('feedback'));
      
      if (!isVague && hasMetricEvidence) {
        validRecommendations.push(rec);
      }
    }

    return validRecommendations;
  }
}
