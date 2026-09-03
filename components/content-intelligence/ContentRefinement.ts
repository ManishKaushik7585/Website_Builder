import { SemanticRefinement } from './ContentDiagnosis';
import { PageContentPlan } from '../../config/content-intelligence';

export class ContentRefinement {
  /**
   * Translates a semantic refinement intent into an updated PageContentPlan.
   * This is a pure semantic operation. It does not output CSS, JSX, or DOM instructions.
   */
  static applyRefinements(plan: PageContentPlan, refinements: SemanticRefinement[]): PageContentPlan {
    const refinedPlan = { ...plan, sections: [...plan.sections] };

    for (const ref of refinements) {
      if (ref.action === 'removeRedundantSection' && ref.targetPurpose) {
        // Find the last occurrence of the redundant section and remove it
        const index = refinedPlan.sections.map(s => s.purpose).lastIndexOf(ref.targetPurpose);
        if (index > -1) {
          refinedPlan.sections.splice(index, 1);
        }
      }
      
      if (ref.action === 'addRequiredSection' && ref.targetPurpose) {
        // Append a default optional section stub
        refinedPlan.sections.push({
          purpose: ref.targetPurpose,
          intent: ['inform'],
          priority: 'secondary',
          density: 'balanced',
          contentLength: 'short',
          constraints: plan.globalPlan.globalConstraints,
          isOptional: false
        });
      }

      if (ref.action === 'reduceSectionDensity') {
        refinedPlan.globalPlan.targetDensity = 'sparse';
        refinedPlan.sections.forEach(s => s.density = 'sparse');
      }

      if (ref.action === 'increaseSectionDensity') {
        refinedPlan.globalPlan.targetDensity = 'dense';
        refinedPlan.sections.forEach(s => s.density = 'dense');
      }
      
      // Other semantic actions would manipulate content constraints or priorities
    }

    return refinedPlan;
  }
}
