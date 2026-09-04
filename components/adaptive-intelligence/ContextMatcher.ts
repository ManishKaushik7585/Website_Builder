import { AdaptiveKnowledge } from '../../config/adaptive-intelligence';

export class ContextMatcher {
  
  static match(knowledge: AdaptiveKnowledge[], currentContext: any): AdaptiveKnowledge[] {
    // Current Context might look like: { industry: 'ecommerce', projectType: 'store', audience: 'teens' }
    if (!currentContext) return knowledge; // If no context is provided, return all.

    return knowledge.filter(k => {
      // Global knowledge applies generally, but could be filtered if there are explicit negative matches
      if (k.scope === 'global') return true;
      if (k.scope === 'project' && k.evidence.some(e => e.projectContext?.projectId === currentContext.projectId)) return true;

      // Check context fields matching
      // If a knowledge explicitly references an industry in its evidence projectContext, does it match?
      const matchingEvidence = k.evidence.filter(e => {
        if (!e.projectContext) return true; // generic evidence
        if (currentContext.industry && e.projectContext.industry && e.projectContext.industry !== currentContext.industry) {
          return false;
        }
        if (currentContext.projectType && e.projectContext.projectType && e.projectContext.projectType !== currentContext.projectType) {
          return false;
        }
        return true;
      });

      return matchingEvidence.length > 0;
    });
  }
}
