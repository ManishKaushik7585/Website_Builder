/* eslint-disable @typescript-eslint/no-explicit-any */
import { LearningOutcome, LearningSource } from '../../config/adaptive-intelligence';

export interface RawOutcomeEvent {
  source: LearningSource;
  sourceId: string;
  projectId: string;
  timestamp: string;
  outcome: LearningOutcome;
  context: any;
  observations: string[];
}

export class OutcomeExtractor {

  static extractFromQuality(projectId: string, pageId: string, qualityResult: any): RawOutcomeEvent {
    let outcome: LearningOutcome = 'success';
    const observations: string[] = [];

    if (qualityResult.acceptanceStatus === 'rejected') {
      outcome = 'failure';
    } else if (qualityResult.acceptanceStatus === 'partial' || qualityResult.unresolvedViolations?.length > 0) {
      outcome = 'partial';
    }

    if (qualityResult.violations?.length) {
      qualityResult.violations.forEach((v: any) => {
        observations.push(`Quality Violation: ${v.type || v.message}`);
      });
    }

    return {
      source: 'quality',
      sourceId: `quality-${pageId}-${Date.now()}`,
      projectId,
      timestamp: new Date().toISOString(),
      outcome,
      context: { pageId, score: qualityResult.score },
      observations
    };
  }

  static extractFromConvergence(projectId: string, pageId: string, convergenceResult: any): RawOutcomeEvent {
    let outcome: LearningOutcome = 'success';
    const observations: string[] = [];

    if (convergenceResult.status === 'blocked' || convergenceResult.terminationReason === 'stalled') {
      outcome = 'failure';
    } else if (convergenceResult.status === 'partial') {
      outcome = 'partial';
    }

    if (convergenceResult.history?.some((h: any) => h.regression)) {
      outcome = 'regression';
      observations.push('Convergence regression detected');
    }

    if (convergenceResult.activeRefinements?.length) {
      observations.push(`Refinements applied: ${convergenceResult.activeRefinements.length}`);
    }

    return {
      source: 'convergence',
      sourceId: `conv-${pageId}-${Date.now()}`,
      projectId,
      timestamp: new Date().toISOString(),
      outcome,
      context: {
        pageId,
        iterations: convergenceResult.currentIteration,
        finalScore: convergenceResult.finalScore
      },
      observations
    };
  }

  static extractFromSiteAcceptance(projectId: string, siteResult: any): RawOutcomeEvent {
    let outcome: LearningOutcome = 'success';
    const observations: string[] = [];

    if (siteResult.status === 'rejected') outcome = 'failure';
    else if (siteResult.status === 'partial') outcome = 'partial';

    if (siteResult.crossPageViolations?.length) {
      siteResult.crossPageViolations.forEach((v: any) => {
        observations.push(`Cross-page Violation: ${v.code}`);
      });
    }

    return {
      source: 'site_acceptance',
      sourceId: `site-acc-${projectId}-${Date.now()}`,
      projectId,
      timestamp: new Date().toISOString(),
      outcome,
      context: { acceptedPages: siteResult.acceptedPages, projectScore: siteResult.projectScore },
      observations
    };
  }

  static extractFromRelease(projectId: string, releaseResult: any): RawOutcomeEvent {
    let outcome: LearningOutcome = 'success';
    const observations: string[] = [];

    if (releaseResult.status === 'blocked') outcome = 'failure';
    else if (releaseResult.status === 'warnings_present') outcome = 'partial';

    if (releaseResult.blockingViolations?.length) {
      observations.push(`Blocking Violations: ${releaseResult.blockingViolations.length}`);
    }

    return {
      source: 'release',
      sourceId: `rel-${projectId}-${Date.now()}`,
      projectId,
      timestamp: new Date().toISOString(),
      outcome,
      context: { status: releaseResult.status },
      observations
    };
  }

  static extractFromDeployment(projectId: string, deploymentResult: any): RawOutcomeEvent {
    let outcome: LearningOutcome = 'success';
    const observations: string[] = [];

    if (deploymentResult.status === 'failed') outcome = 'failure';
    if (deploymentResult.rollbackTriggered) outcome = 'regression';

    observations.push(`Deployment Status: ${deploymentResult.status}`);

    return {
      source: 'deployment',
      sourceId: `dep-${projectId}-${Date.now()}`,
      projectId,
      timestamp: new Date().toISOString(),
      outcome,
      context: { environment: deploymentResult.environment },
      observations
    };
  }

  static extractFromResearch(projectId: string, researchResult: any): RawOutcomeEvent {
    let outcome: LearningOutcome = 'success';
    const observations: string[] = [];

    if (researchResult.status === 'failed' || researchResult.status === 'timeout') {
      outcome = 'failure';
    } else if (researchResult.memory?.evidence?.contradictions?.length > 0) {
      outcome = 'partial';
      observations.push('Research contradictions detected');
    }

    return {
      source: 'research',
      sourceId: `res-${projectId}-${Date.now()}`,
      projectId,
      timestamp: new Date().toISOString(),
      outcome,
      context: { queries: researchResult.budgetConsumed?.queries },
      observations
    };
  }
}
