import { SemanticResponsiveRefinement } from './ResponsiveDiagnosis';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { SectionPurpose } from '../../config/content-intelligence';

export class ResponsiveRefinement {
  /**
   * Translates a semantic responsive refinement into an updated ResponsivePlan.
   * This is a pure semantic operation. It does not output CSS, JSX, or DOM instructions.
   */
  static applyRefinements(plan: ResponsivePlan, refinements: SemanticResponsiveRefinement[]): ResponsivePlan {
    const refinedPlan = { ...plan, behaviors: [...plan.behaviors] };

    for (const ref of refinements) {
      // Find the behavior for the target section
      let behavior = refinedPlan.behaviors.find(b => b.sectionPurpose === ref.targetSection);
      if (!behavior && ref.targetSection) {
        behavior = { sectionPurpose: ref.targetSection as SectionPurpose, transformations: [] };
        refinedPlan.behaviors.push(behavior);
      }

      if (ref.action === 'removeHorizontalOverflow' && behavior) {
        behavior.transformations.push({
          sourceLayout: 'unknown',
          targetLayout: 'stack',
          affectedSection: behavior.sectionPurpose,
          triggerCondition: ref.targetViewport || 'mobile',
          preservedPriority: ['primary', 'secondary'],
          type: 'transform',
          expectedBehavior: ref.reasoning
        });
      }

      if (ref.action === 'preservePrimaryContent' && behavior) {
        // Remove hiding transformations for this viewport
        behavior.transformations = behavior.transformations.filter(t => 
          !(t.type === 'hide' && t.triggerCondition === ref.targetViewport)
        );
        // Explicitly set preservation
        behavior.transformations.push({
          sourceLayout: 'unknown',
          targetLayout: 'stack',
          affectedSection: behavior.sectionPurpose,
          triggerCondition: ref.targetViewport || 'mobile',
          preservedPriority: ['primary'],
          type: 'preserve',
          expectedBehavior: ref.reasoning
        });
      }

      if (ref.action === 'reorderContent' && behavior) {
        behavior.transformations.push({
          sourceLayout: 'unknown',
          targetLayout: 'reorder',
          affectedSection: behavior.sectionPurpose,
          triggerCondition: ref.targetViewport || 'mobile',
          preservedPriority: ['primary'],
          type: 'reorder',
          expectedBehavior: ref.reasoning
        });
      }

      // Handle other semantic actions...
    }

    return refinedPlan;
  }
}
