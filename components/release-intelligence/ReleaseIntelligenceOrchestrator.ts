import { ReleaseResult } from '../../config/release-intelligence';
import { ReleaseCollector } from './ReleaseCollector';
import { ReleaseIntelligenceValidator } from '../../registry/release-intelligence-validator';
import { ReleaseFusion } from './ReleaseFusion';
import { DeploymentReadinessService } from './DeploymentReadiness';
import { ReleaseRefinement } from './ReleaseRefinement';

export class ReleaseIntelligenceOrchestrator {
  static evaluate(
    siteAcceptance: any,
    multiPageState: any,
    externalObservations?: any
  ): ReleaseResult {
    // 1. Collect
    const evidence = ReleaseCollector.collect(siteAcceptance, multiPageState, externalObservations);

    // 2. Validate
    const checks = ReleaseIntelligenceValidator.validate(evidence);

    // 3. Fuse & Diagnose
    const fused = ReleaseFusion.fuse(checks);

    // 4. Refine
    const allDiagnoses = [...fused.blockers, ...fused.warnings].map(b => b.diagnosis);
    const recommendations = ReleaseRefinement.refine(allDiagnoses);

    // 5. Final Readiness
    const deploymentReadiness = DeploymentReadinessService.evaluate(fused);

    const freshnessTimestamp = new Date().toISOString();

    return {
      status: deploymentReadiness.status,
      deploymentReadiness,
      dimensions: fused.dimensions,
      blockers: fused.blockers,
      warnings: fused.warnings,
      recommendations,
      score: this.calculateScore(deploymentReadiness.status, allDiagnoses.length),
      evidenceFreshness: freshnessTimestamp,
      siteAcceptanceStatus: siteAcceptance?.status || 'unavailable'
    };
  }

  private static calculateScore(status: string, issueCount: number): number {
    if (status === 'ready') return 100;
    if (status === 'ready_with_warnings') return Math.max(80, 95 - issueCount * 5);
    if (status === 'blocked') return Math.max(0, 50 - issueCount * 10);
    return 0; // unverified
  }
}
