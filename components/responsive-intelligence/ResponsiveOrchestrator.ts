import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsiveIntelligenceValidator, ResponsiveValidationResult } from '../../registry/responsive-intelligence-validator';
import { ResponsiveDiagnosis, SemanticResponsiveRefinement } from './ResponsiveDiagnosis';
import { ResponsiveRefinement } from './ResponsiveRefinement';
import { ResponsivePlan, ResponsiveObservation } from '../../config/responsive-intelligence';

export interface ResponsiveOrchestrationResult {
  plan: ResponsivePlan;
  validation: ResponsiveValidationResult;
  diagnostics: SemanticResponsiveRefinement[];
  iterations: number;
}

export class ResponsiveOrchestrator {
  static MAX_ITERATIONS = 3;

  static generateAndRefine(
    initialPlan: ResponsivePlan, 
    contentPlan: PageContentPlan,
    role: PageRole,
    observations?: ResponsiveObservation[]
  ): ResponsiveOrchestrationResult {
    let currentPlan = initialPlan;
    let iteration = 0;
    let validation = ResponsiveIntelligenceValidator.validate(currentPlan, contentPlan, role, observations);
    let diagnostics: SemanticResponsiveRefinement[] = [];

    while (!validation.valid && iteration < this.MAX_ITERATIONS) {
      // 1. Diagnose
      diagnostics = ResponsiveDiagnosis.diagnoseAndPrescribe(validation.diagnostics);
      
      // 2. Refine (semantic changes only)
      currentPlan = ResponsiveRefinement.applyRefinements(currentPlan, diagnostics);
      
      // 3. Re-validate
      validation = ResponsiveIntelligenceValidator.validate(currentPlan, contentPlan, role, observations);
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
