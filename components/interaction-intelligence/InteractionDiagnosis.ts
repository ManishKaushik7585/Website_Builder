import { InteractionDiagnostic } from '../../registry/interaction-intelligence-validator';
import { SectionPurpose } from '../../config/content-intelligence';

export type InteractionRefinementActionType = 
  | 'addFocusBehavior'
  | 'addKeyboardInteraction'
  | 'addLoadingFeedback'
  | 'addErrorFeedback'
  | 'addSuccessFeedback'
  | 'protectDestructiveAction'
  | 'simplifyInteraction'
  | 'replaceAmbiguousAffordance'
  | 'preservePrimaryInteraction'
  | 'adaptInteractionForTouch'
  | 'reduceInteractionComplexity'
  | 'alignNavigationBehavior'
  | 'initializeInteractionBehavior';

export interface SemanticInteractionRefinement {
  action: InteractionRefinementActionType;
  targetElementId?: string;
  targetSection?: string;
  reasoning: string;
}

export class InteractionDiagnosis {
  static diagnoseAndPrescribe(diagnostics: InteractionDiagnostic[]): SemanticInteractionRefinement[] {
    const refinements: SemanticInteractionRefinement[] = [];

    for (const diag of diagnostics) {
      switch (diag.code) {
        case 'MISSING_INTERACTION_BEHAVIOR':
          refinements.push({
            action: 'initializeInteractionBehavior',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'MISSING_FOCUS_BEHAVIOR':
          refinements.push({
            action: 'addFocusBehavior',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'MISSING_KEYBOARD_BEHAVIOR':
          refinements.push({
            action: 'addKeyboardInteraction',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'MISSING_LOADING_STATE':
          refinements.push({
            action: 'addLoadingFeedback',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'MISSING_ERROR_FEEDBACK':
          refinements.push({
            action: 'addErrorFeedback',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'DESTRUCTIVE_ACTION_UNPROTECTED':
          refinements.push({
            action: 'protectDestructiveAction',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'EXCESSIVE_INTERACTION_COMPLEXITY':
          refinements.push({
            action: 'reduceInteractionComplexity',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        default:
          refinements.push({
            action: 'replaceAmbiguousAffordance',
            targetElementId: diag.elementId,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
      }
    }

    return refinements;
  }
}
