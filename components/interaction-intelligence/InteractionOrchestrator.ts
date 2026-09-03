import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { InteractionIntelligenceValidator, InteractionValidationResult } from '../../registry/interaction-intelligence-validator';
import { InteractionDiagnosis, SemanticInteractionRefinement } from './InteractionDiagnosis';
import { InteractionRefinement } from './InteractionRefinement';
import { InteractionPlan, InteractionObservation } from '../../config/interaction-intelligence';

export interface InteractionOrchestrationResult {
  plan: InteractionPlan;
  validation: InteractionValidationResult;
  diagnostics: SemanticInteractionRefinement[];
  iterations: number;
}

export class InteractionOrchestrator {
  static MAX_ITERATIONS = 3;

  static generateAndRefine(
    initialPlan: InteractionPlan,
    responsivePlan: ResponsivePlan,
    contentPlan: PageContentPlan,
    role: PageRole,
    observations?: InteractionObservation[]
  ): InteractionOrchestrationResult {
    let currentPlan = initialPlan;
    let iteration = 0;
    let validation = InteractionIntelligenceValidator.validate(currentPlan, observations);
    let diagnostics: SemanticInteractionRefinement[] = [];

    while (!validation.valid && iteration < this.MAX_ITERATIONS) {
      // 1. Diagnose
      diagnostics = InteractionDiagnosis.diagnoseAndPrescribe(validation.diagnostics);
      
      // 2. Refine (semantic changes only)
      currentPlan = InteractionRefinement.applyRefinements(currentPlan, diagnostics);
      
      // 3. Re-validate
      validation = InteractionIntelligenceValidator.validate(currentPlan, observations);
      iteration++;
    }

    return {
      plan: currentPlan,
      validation,
      diagnostics,
      iterations: iteration
    };
  }
}
