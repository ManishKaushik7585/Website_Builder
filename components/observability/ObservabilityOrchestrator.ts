import { ObservabilityCollector } from './ObservabilityCollector';
import { ObservabilityAggregator } from './ObservabilityAggregator';
import { ObservabilityDiagnosis } from './ObservabilityDiagnosis';
import { ObservabilityHistory } from './ObservabilityHistory';
import { ObservabilityValidator } from '../../registry/observability-validator';
import { IntelligenceSnapshot, ObservationMetric } from '../../config/observability';
import { WebsiteProject } from '../../config/project';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { InteractionPlan } from '../../config/interaction-intelligence';

export class ObservabilityOrchestrator {
  private history = new ObservabilityHistory();

  public createSnapshot(
    runId: string,
    projectId: string,
    pageId: string,
    stage: string,
    iterationCount: number,
    plans: {
      project?: WebsiteProject;
      content?: PageContentPlan;
      responsive?: ResponsivePlan;
      interaction?: InteractionPlan;
      qaResult?: { diagnostics?: unknown[] };
      visionResult?: { diagnostics?: unknown[] };
    }
  ): IntelligenceSnapshot {
    
    // 1. Collect metrics from all domains
    const metrics: ObservationMetric[] = [
      ...ObservabilityCollector.collectProjectMetrics(plans.project),
      ...ObservabilityCollector.collectContentMetrics(plans.content),
      ...ObservabilityCollector.collectResponsiveMetrics(plans.responsive),
      ...ObservabilityCollector.collectInteractionMetrics(plans.interaction),
      ...ObservabilityCollector.collectQAMetrics(plans.qaResult),
      ...ObservabilityCollector.collectVisionMetrics(plans.visionResult)
    ];

    // 2. Aggregate into a snapshot
    const snapshot = ObservabilityAggregator.aggregate(
      runId,
      projectId,
      pageId,
      stage,
      iterationCount,
      metrics
    );

    // 3. Diagnose architectural problems
    const diagnostics = ObservabilityDiagnosis.diagnose(snapshot);
    snapshot.diagnostics.push(...diagnostics);

    // 4. Validate snapshot integrity and security
    const validation = ObservabilityValidator.validateSnapshot(snapshot);
    if (!validation.valid) {
      // If validation fails (e.g. secret leakage), sanitize or mark as failed
      snapshot.status = 'failed';
      snapshot.diagnostics.push(...validation.diagnostics);
    }

    // 5. Record to history
    const currentRun = this.history.getCurrentRun();
    const run = currentRun && currentRun.runId === runId 
      ? { ...currentRun, latestSnapshotId: snapshot.id, snapshotCount: currentRun.snapshotCount + 1 }
      : ObservabilityAggregator.createRunSnapshot(runId, 1, snapshot.id);
      
    this.history.recordSnapshot(snapshot, run);

    return snapshot;
  }

  public getHistory(): ObservabilityHistory {
    return this.history;
  }
}
