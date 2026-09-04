import { AdaptiveKnowledge, MemoryPolicy } from '../../config/adaptive-intelligence';

export class KnowledgeDecay {
  
  static evaluateDecay(knowledge: AdaptiveKnowledge[], policy: MemoryPolicy): AdaptiveKnowledge[] {
    const now = new Date().getTime();
    
    return knowledge.map(k => {
      const updated = { ...k };
      const lastValidated = new Date(k.lastValidatedAt).getTime();
      const ageInDays = (now - lastValidated) / (1000 * 60 * 60 * 24);

      if (ageInDays > policy.retentionDays) {
        updated.status = 'expired';
      } else if (ageInDays > policy.retentionDays / 2) {
        // Degrade confidence
        if (updated.confidence === 'very_high') updated.confidence = 'high';
        else if (updated.confidence === 'high') updated.confidence = 'medium';
        else if (updated.confidence === 'medium') updated.confidence = 'low';
        else if (updated.confidence === 'low') updated.confidence = 'very_low';
      }

      return updated;
    });
  }
}
