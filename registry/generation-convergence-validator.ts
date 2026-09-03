import { ConvergenceAction, ConvergenceResult, RegenerationScope, ConvergenceIterationRecord } from '../config/generation-convergence';

export interface ConvergenceValidationResult {
  valid: boolean;
  violations: string[];
  diagnostics: string[];
  recommendations: string[];
}

export class GenerationConvergenceValidator {
  private static MAX_ITERATIONS = 3;
  private static SUPPORTED_SCOPES: RegenerationScope[] = [
    'section', 'component', 'page', 'site', 'responsive-variant', 'interaction-behavior'
  ];
  private static SUPPORTED_ACTIONS = [
    'addRequiredSection',
    'removeRedundantSection',
    'shortenSupportingCopy',
    'reorderSections',
    'stackLayout',
    'preservePrimaryContent',
    'removeHorizontalOverflow',
    'addFocusBehavior',
    'addLoadingFeedback',
    'addSuccessFeedback',
    'protectDestructiveAction',
    'reduceInteractionComplexity',
    'repairNavigationAffordance'
  ];

  static validateState(
    currentIteration: number,
    history: ConvergenceIterationRecord[],
    actions: ConvergenceAction[],
    hasEvidence: boolean
  ): ConvergenceValidationResult {
    const result: ConvergenceValidationResult = {
      valid: true,
      violations: [],
      diagnostics: [],
      recommendations: []
    };

    if (currentIteration > this.MAX_ITERATIONS) {
      result.valid = false;
      result.violations.push('BUDGET_EXHAUSTED');
    }

    if (!hasEvidence) {
      result.valid = false;
      result.violations.push('MISSING_EVIDENCE');
    }

    if (history.length > 0) {
      const prev = history[history.length - 1];
      if (prev.delta.scoreChange < 0) {
        result.valid = false;
        result.violations.push('QUALITY_REGRESSION');
      }
      
      if (history.length > 1) {
        const prevPrev = history[history.length - 2];
        if (prev.blockingViolations.length === prevPrev.blockingViolations.length && 
            prev.blockingViolations.join() === prevPrev.blockingViolations.join()) {
          result.valid = false;
          result.violations.push('CONVERGENCE_STALLED');
        }
      }
    }

    for (const action of actions) {
      if (!this.SUPPORTED_ACTIONS.includes(action.action)) {
        result.valid = false;
        result.violations.push('UNSUPPORTED_ACTION');
      }
      if (action.scope && !this.SUPPORTED_SCOPES.includes(action.scope)) {
        result.valid = false;
        result.violations.push('UNSUPPORTED_SCOPE');
      }
    }

    return result;
  }
}
