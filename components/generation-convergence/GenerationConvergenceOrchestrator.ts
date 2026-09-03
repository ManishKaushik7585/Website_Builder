/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebsiteProject, WebsitePage, SitePlan } from '../../config/project';
import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { InteractionPlan } from '../../config/interaction-intelligence';
import { GenerationPlan } from '../../config/generation';
import { IntelligenceSnapshot } from '../../config/observability';
import { ConvergenceResult, ConvergenceAction, RegenerationScope, ConvergenceStatus, ConvergenceTerminationReason } from '../../config/generation-convergence';

import { GenerationQualityOrchestrator } from '../generation-quality/GenerationQualityOrchestrator';
import { GenerationQualityReport, QualityViolation } from '../../config/generation-quality';

import { GenerationConvergenceValidator } from '../../registry/generation-convergence-validator';
import { ConvergenceDiagnosis } from './ConvergenceDiagnosis';
import { ConvergenceRefinement } from './ConvergenceRefinement';
import { RegenerationPlanner } from './RegenerationPlanner';
import { ConvergenceHistory } from './ConvergenceHistory';
import { ConvergenceFusion } from './ConvergenceFusion';

export class GenerationConvergenceOrchestrator {
  private static MAX_ITERATIONS = 3;

  static async evaluate(
    project: WebsiteProject,
    page: WebsitePage,
    sitePlan: SitePlan | undefined,
    pageRole: PageRole | undefined,
    content: PageContentPlan,
    responsive: ResponsivePlan,
    interaction: InteractionPlan,
    initialGeneration: GenerationPlan,
    initialSnapshot: IntelligenceSnapshot,
    qaObservations: unknown,
    visionObservations: unknown,
    regenerationCallback: (actions: ConvergenceAction[], scope: RegenerationScope | null) => Promise<{ generation: GenerationPlan, snapshot: IntelligenceSnapshot }>
  ): Promise<ConvergenceResult> {
    
    let currentIteration = 1;
    const historyTracker = new ConvergenceHistory();
    let currentGeneration = initialGeneration;
    let currentSnapshot = initialSnapshot;
    
    let status: ConvergenceStatus = 'converging';
    let terminationReason: ConvergenceTerminationReason = null;
    let finalScore = 100;
    let blockingViolations: string[] = [];
    let activeRefinements: ConvergenceAction[] = [];
    let activeScope: RegenerationScope | null = null;
    let acceptanceStatus = 'unverified';

    while (currentIteration <= this.MAX_ITERATIONS) {
      // 1. Quality Evaluation
      const qualityReport = await GenerationQualityOrchestrator.evaluate(
        project, page, sitePlan, pageRole, content, responsive, interaction,
        currentGeneration, currentSnapshot, qaObservations, visionObservations
      );
      acceptanceStatus = qualityReport.acceptance.status;
      
      const rawViolations = qualityReport.diagnoses.map(d => ({
        dimension: 'content', // simplistic mapping
        message: d.message,
        severity: d.severity
      } as unknown as QualityViolation));

      blockingViolations = qualityReport.diagnoses.filter(d => d.severity === 'high' || d.severity === 'critical').map(d => d.message);

      // 2. Fusion & Health
      const health = ConvergenceFusion.evaluateHealth(qualityReport, historyTracker);
      finalScore = health.score;

      // 3. Diagnosis & Refinement
      const diagnoses = ConvergenceDiagnosis.diagnose(rawViolations);
      activeRefinements = ConvergenceRefinement.refine(diagnoses, qualityReport.recommendations);
      activeScope = RegenerationPlanner.planScope(activeRefinements);

      // 4. Update History
      const delta = historyTracker.calculateDelta(finalScore, blockingViolations);
      historyTracker.addRecord({
        iteration: currentIteration,
        timestamp: new Date().toISOString(),
        status: 'converging',
        qualityScore: finalScore,
        blockingViolations,
        warnings: [],
        refinementActions: activeRefinements,
        regenerationScope: activeScope,
        delta
      });

      // 5. Validation Check
      const validation = GenerationConvergenceValidator.validateState(
        currentIteration,
        historyTracker.getHistory(),
        activeRefinements,
        true // mock hasEvidence
      );

      if (!validation.valid) {
        if (validation.violations.includes('BUDGET_EXHAUSTED')) {
          status = 'budget_exhausted';
          terminationReason = 'max_iterations_reached';
        } else if (validation.violations.includes('MISSING_EVIDENCE')) {
          status = 'evidence_unavailable';
          terminationReason = 'evidence_unavailable';
        } else if (validation.violations.includes('QUALITY_REGRESSION')) {
          status = 'regressed';
          terminationReason = 'regression';
        } else if (validation.violations.includes('CONVERGENCE_STALLED')) {
          status = 'stalled';
          terminationReason = 'stalled';
        } else if (validation.violations.includes('UNSUPPORTED_ACTION') || validation.violations.includes('UNSUPPORTED_SCOPE')) {
          status = 'unsupported_action';
          terminationReason = 'unsupported_refinement';
        }
        break;
      }

      // Check Acceptance
      if (acceptanceStatus === 'accepted' || acceptanceStatus === 'accepted_with_warnings') {
        status = 'accepted';
        terminationReason = 'accepted';
        break;
      }

      // Limit Check
      if (currentIteration === this.MAX_ITERATIONS) {
        status = 'budget_exhausted';
        terminationReason = 'max_iterations_reached';
        break;
      }

      // If missing evidence
      if (blockingViolations.includes('OBSERVABILITY_EVIDENCE_MISSING') || blockingViolations.includes('GENERATION_EVIDENCE_MISSING')) {
        status = 'evidence_unavailable';
        terminationReason = 'evidence_unavailable';
        break;
      }

      if (activeRefinements.length === 0) {
        status = 'stalled';
        terminationReason = 'stalled';
        break;
      }

      // 6. Regenerate
      try {
        const regen = await regenerationCallback(activeRefinements, activeScope);
        currentGeneration = regen.generation;
        currentSnapshot = regen.snapshot;
      } catch (e) {
        status = 'regeneration_failure';
        terminationReason = 'regeneration_failure';
        break;
      }

      currentIteration++;
    }

    if (historyTracker.getHistory().length > 0) {
      historyTracker.getHistory()[historyTracker.getHistory().length - 1].status = status;
    }

    return {
      status,
      currentIteration,
      maxIterations: this.MAX_ITERATIONS,
      history: historyTracker.getHistory(),
      terminationReason,
      finalScore,
      blockingViolations,
      resolvedViolations: historyTracker.getHistory().length > 0 ? historyTracker.getHistory()[historyTracker.getHistory().length - 1].delta.resolvedViolations : [],
      activeRefinements,
      activeScope,
      acceptanceStatus
    };
  }
}
