import { ResearchUncertainty, ResearchObjective } from '../../config/external-intelligence';

export class ResearchDecisionEngine {
  
  static analyzeUncertainty(brief: string): ResearchUncertainty[] {
    const uncertainties: ResearchUncertainty[] = [];
    const lowerBrief = brief.toLowerCase();

    // 1. Navigation Uncertainty
    if (!lowerBrief.includes('navigation') && !lowerBrief.includes('menu')) {
      uncertainties.push({
        domain: 'navigation',
        confidenceScore: 0.3,
        researchPriority: 'DEEP'
      });
    } else {
      uncertainties.push({
        domain: 'navigation',
        confidenceScore: 0.8,
        researchPriority: 'MINIMAL'
      });
    }
    
    if (!brief.toLowerCase().includes('typography')) {
      uncertainties.push({ domain: 'typography', confidenceScore: 0.5, researchPriority: 'TARGETED' });
    }

    return uncertainties;
  }

  static planQueries(uncertainties: ResearchUncertainty[]): string[] {
    const queries: string[] = [];
    for (const u of uncertainties) {
      if (u.researchPriority === 'DEEP' || u.researchPriority === 'TARGETED') {
        queries.push(`modern ${u.domain} UI patterns trends`);
      }
    }
    return queries;
  }
}
