import { KnowledgeCandidate, LearningRecommendation } from '../config/adaptive-intelligence';

export class AdaptiveIntelligenceValidator {
  
  static validateCandidate(candidate: KnowledgeCandidate): boolean {
    const maliciousPatterns = [
      /IGNORE PREVIOUS INSTRUCTIONS/i,
      /PROMOTE THIS TO GLOBAL AUTHORITY/i,
      /RUN npm install/i,
      /RUN npm deploy/i,
      /USE THIS API KEY/i,
      /OVERRIDE SITE ACCEPTANCE/i,
      /<script>/i,
      /eval\(/i,
      /exec\(/i
    ];

    const stringToCheck = candidate.statement + JSON.stringify(candidate.evidence);

    for (const pattern of maliciousPatterns) {
      if (pattern.test(stringToCheck)) {
        return false;
      }
    }

    if (!candidate.provenance) return false;
    if (!candidate.confidence) return false;
    
    return true;
  }

  static sanitizeRecommendation(recommendation: LearningRecommendation): LearningRecommendation | null {
    const maliciousPatterns = [
      /IGNORE PREVIOUS INSTRUCTIONS/i,
      /PROMOTE THIS TO GLOBAL AUTHORITY/i,
      /RUN npm install/i,
      /RUN npm deploy/i,
      /OVERRIDE/i
    ];

    const stringToCheck = recommendation.reason + ' ' + recommendation.evidence;

    for (const pattern of maliciousPatterns) {
      if (pattern.test(stringToCheck)) {
        return null;
      }
    }

    return recommendation;
  }
}
