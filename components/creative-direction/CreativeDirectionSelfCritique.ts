import { CreativeDirectionContract } from '../../config/creative-direction';

export class CreativeDirectionSelfCritique {
  static critique(contract: CreativeDirectionContract, contextSummary: string): { 
    valid: boolean; 
    refinedContract?: CreativeDirectionContract;
    diagnostics: string[];
  } {
    const diagnostics: string[] = [];
    let valid = true;

    // Check accessibility
    if (!contract.accessibility.priorities || contract.accessibility.priorities.length === 0) {
      diagnostics.push('Missing accessibility priorities. Added default WCAG AA baseline.');
      contract.accessibility.priorities = ['WCAG 2.1 AA compliance', 'Keyboard navigation support'];
      valid = false;
    }

    // Check responsive strategy
    if (!contract.responsive.philosophy) {
      diagnostics.push('Missing responsive philosophy. Set to Mobile First.');
      contract.responsive.philosophy = 'Mobile First Layout Adaptation';
      valid = false;
    }

    // Check anti-patterns
    if (contract.antiPatterns.includes('accessibility')) {
      diagnostics.push('Anti-pattern incorrectly flagged "accessibility". Removed.');
      contract.antiPatterns = contract.antiPatterns.filter(ap => ap !== 'accessibility');
      valid = false;
    }

    // Check constraints overlap (hypothetical LLM hallucination check)
    if (contract.motion.intensity === 'high' && contract.constraints.some(c => c.description.toLowerCase().includes('reduced motion'))) {
      diagnostics.push('Motion intensity is "high" but a reduced motion constraint exists. Adjusted to "subtle".');
      contract.motion.intensity = 'subtle';
      contract.motion.philosophy = 'Restrained, purposeful feedback only.';
      valid = false;
    }

    return {
      valid: valid, // if false, means we made mutations and it should ideally be run again or passed forward if loop limit reached
      refinedContract: contract,
      diagnostics
    };
  }
}
