/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { WebsiteProject, WebsitePage, SitePlan } from '../../config/project';
import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { InteractionPlan } from '../../config/interaction-intelligence';
import { GenerationPlan } from '../../config/generation';
import { IntelligenceSnapshot } from '../../config/observability';
import { GenerationQualityReport, QualityDimension, QualityStatus, QualityViolation } from '../../config/generation-quality';

import { GenerationQualityValidator } from '../../registry/generation-quality-validator';
import { GenerationQualityDiagnosis } from './GenerationQualityDiagnosis';
import { GenerationQualityRefinement } from './GenerationQualityRefinement';
import { GenerationQualityFusion } from './GenerationQualityFusion';
import { GenerationAcceptance } from './GenerationAcceptance';
import { GenerationQualitySelfCritique } from './GenerationQualitySelfCritique';

export class GenerationQualityOrchestrator {
  private static MAX_ITERATIONS = 3;

  static async evaluate(
    project: WebsiteProject,
    page: WebsitePage,
    sitePlan?: SitePlan,
    pageRole?: PageRole,
    content?: PageContentPlan,
    responsive?: ResponsivePlan,
    interaction?: InteractionPlan,
    generation?: GenerationPlan,
    snapshot?: IntelligenceSnapshot,
    qaObservations?: unknown,
    visionObservations?: unknown
  ): Promise<GenerationQualityReport> {
    
    let iteration = 0;
    let currentViolations: QualityViolation[] = [];
    let report: GenerationQualityReport | null = null;

    while (iteration < this.MAX_ITERATIONS) {
      iteration++;

      // 1. Validation
      const validationResult = GenerationQualityValidator.validateQuality(
        project, page, sitePlan, pageRole, content, responsive, interaction, generation, snapshot, qaObservations, visionObservations
      );

      // 2. Fusion
      const fusedViolations = GenerationQualityFusion.fuseAndCategorize(
        validationResult.violations,
        sitePlan, pageRole, content, responsive, interaction, generation, snapshot, qaObservations, visionObservations
      );

      // 3. Acceptance
      const acceptanceResult = GenerationAcceptance.evaluate(validationResult.gates);

      // Check if we can stop
      if (acceptanceResult.status === 'accepted' || acceptanceResult.status === 'accepted_with_warnings' || acceptanceResult.status === 'unverified') {
        report = this.buildReport(page.id, validationResult.gates, fusedViolations, acceptanceResult);
        break;
      }

      // Check if no new violations (convergence)
      if (iteration > 1 && fusedViolations.length >= currentViolations.length) {
        // If it's not improving, halt to prevent infinite loop.
        report = this.buildReport(page.id, validationResult.gates, fusedViolations, acceptanceResult);
        break;
      }

      currentViolations = fusedViolations;

      // In a real system we would run semantic refinement here and re-generate.
      // Since this system must not mutate raw code, we record the recommendations and break.
      report = this.buildReport(page.id, validationResult.gates, fusedViolations, acceptanceResult);
      break; 
      // End loop since autonomous code mutation is explicitly forbidden by architecture. 
      // The orchestrator is bounded to 1 pass unless it's hooked to an external semantic re-generator.
    }

    if (!report) {
      throw new Error('Failed to generate quality report.');
    }

    // Apply self critique to the final messages
    const evidence = [
      { source: 'qa' as const, description: 'qa', isVerified: !!qaObservations },
      { source: 'vision' as const, description: 'vision', isVerified: !!visionObservations }
    ];
    report.diagnoses = report.diagnoses.map(d => {
      const critiqued = GenerationQualitySelfCritique.critique([d.message], evidence);
      d.message = critiqued.length > 0 ? critiqued[0] : 'Issue detected.';
      return d;
    });

    return report;
  }

  private static buildReport(
    pageId: string, 
    gates: any[], 
    violations: QualityViolation[], 
    acceptanceResult: any
  ): GenerationQualityReport {
    const dimensions: Record<QualityDimension, QualityStatus> = {
      architecture: 'pass',
      content: 'pass',
      responsive: 'pass',
      interaction: 'pass',
      accessibility: 'pass',
      design: 'pass',
      navigation: 'pass',
      observability: 'pass',
      'generation-integrity': 'pass'
    };

    for (const gate of gates) {
      if (!gate.isVerified) {
        dimensions[gate.dimension as QualityDimension] = 'unverified';
      } else if (!gate.passed) {
        dimensions[gate.dimension as QualityDimension] = 'fail';
      } else if (gate.warnings.length > 0) {
        dimensions[gate.dimension as QualityDimension] = 'warning';
      }
    }

    const diagnoses = GenerationQualityDiagnosis.diagnose(violations);
    const recommendations = GenerationQualityRefinement.refine(diagnoses);

    return {
      pageId,
      timestamp: new Date().toISOString(),
      dimensions,
      diagnoses,
      recommendations,
      acceptance: acceptanceResult
    };
  }
}
