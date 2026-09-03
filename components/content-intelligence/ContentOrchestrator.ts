import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ContentIntelligenceValidator, ContentValidationResult } from '../../registry/content-intelligence-validator';
import { ContentDiagnosis, SemanticRefinement } from './ContentDiagnosis';
import { ContentRefinement } from './ContentRefinement';

export interface OrchestrationResult {
  plan: PageContentPlan;
  validation: ContentValidationResult;
  diagnostics: SemanticRefinement[];
  iterations: number;
}

export class ContentOrchestrator {
  static MAX_ITERATIONS = 3;

  static generateAndRefine(initialPlan: PageContentPlan, role: PageRole): OrchestrationResult {
    let currentPlan = initialPlan;
    let iteration = 0;
    let validation = ContentIntelligenceValidator.validate(currentPlan, role);
    let diagnostics: SemanticRefinement[] = [];

    while (!validation.valid && iteration < this.MAX_ITERATIONS) {
      // 1. Diagnose
      diagnostics = ContentDiagnosis.diagnoseAndPrescribe(validation.diagnostics);
      
      // 2. Refine (semantic changes only)
      currentPlan = ContentRefinement.applyRefinements(currentPlan, diagnostics);
      
      // 3. Re-validate
      validation = ContentIntelligenceValidator.validate(currentPlan, role);
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
