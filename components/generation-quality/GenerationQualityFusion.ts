import { SitePlan } from '../../config/project';
import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { InteractionPlan } from '../../config/interaction-intelligence';
import { GenerationPlan } from '../../config/generation';
import { IntelligenceSnapshot } from '../../config/observability';
import { QualityViolation } from '../../config/generation-quality';

export class GenerationQualityFusion {
  static fuseAndCategorize(
    violations: QualityViolation[],
    sitePlan?: SitePlan,
    pageRole?: PageRole,
    content?: PageContentPlan,
    responsive?: ResponsivePlan,
    interaction?: InteractionPlan,
    generation?: GenerationPlan,
    snapshot?: IntelligenceSnapshot,
    qaObservations?: unknown,
    visionObservations?: unknown
  ): QualityViolation[] {
    
    // Evaluate if a defect is site-wide vs page-specific based on site constraints
    return violations.map(v => {
      // If it affects global layout or a global rule, mark it differently?
      // For now, we ensure we don't escalate page-level missing sections to site-wide without evidence
      return v;
    });
  }
}
