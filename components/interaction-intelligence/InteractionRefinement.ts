import { SemanticInteractionRefinement } from './InteractionDiagnosis';
import { InteractionPlan } from '../../config/interaction-intelligence';
import { SectionPurpose } from '../../config/content-intelligence';

export class InteractionRefinement {
  /**
   * Translates a semantic interaction refinement into an updated InteractionPlan.
   * This is a pure semantic operation. It does not output CSS, JSX, JS, or DOM instructions.
   */
  static applyRefinements(plan: InteractionPlan, refinements: SemanticInteractionRefinement[]): InteractionPlan {
    const refinedPlan = { ...plan, behaviors: [...plan.behaviors] };

    for (const ref of refinements) {
      let behavior = refinedPlan.behaviors.find(b => b.elementId === ref.targetElementId);
      if (!behavior && ref.targetElementId && ref.targetSection) {
        behavior = { sectionPurpose: ref.targetSection as SectionPurpose, elementId: ref.targetElementId, requirements: [] };
        refinedPlan.behaviors.push(behavior);
      }

      if (ref.action === 'initializeInteractionBehavior' && behavior) {
        behavior.requirements.push({
          intent: 'navigate',
          affordance: 'button',
          priority: 'primary',
          supportedDevices: ['pointer', 'touch', 'keyboard'],
          feedback: { requiresLoadingState: false, requiresSuccessState: false, requiresErrorState: false, announcesToScreenReader: true },
          isDestructive: false,
          requiresConfirmation: false
        });
      }

      if (ref.action === 'addFocusBehavior' && behavior) {
        // Ensure keyboard is in supportedDevices
        behavior.requirements.forEach(req => {
          if (!req.supportedDevices.includes('keyboard')) {
            req.supportedDevices.push('keyboard');
          }
        });
      }

      if (ref.action === 'addKeyboardInteraction' && behavior) {
        behavior.requirements.forEach(req => {
          if (!req.supportedDevices.includes('keyboard')) {
            req.supportedDevices.push('keyboard');
          }
        });
      }

      if (ref.action === 'addLoadingFeedback' && behavior) {
        behavior.requirements.forEach(req => {
          if (req.intent === 'submit') {
            req.feedback.requiresLoadingState = true;
          }
        });
      }

      if (ref.action === 'addErrorFeedback' && behavior) {
        behavior.requirements.forEach(req => {
          if (req.intent === 'submit') {
            req.feedback.requiresErrorState = true;
          }
        });
      }

      if (ref.action === 'protectDestructiveAction' && behavior) {
        behavior.requirements.forEach(req => {
          if (req.isDestructive) {
            req.requiresConfirmation = true;
          }
        });
      }

      if (ref.action === 'reduceInteractionComplexity' && behavior) {
        // Just keep the first 3 requirements
        if (behavior.requirements.length > 3) {
          behavior.requirements = behavior.requirements.slice(0, 3);
        }
      }
    }

    return refinedPlan;
  }
}
