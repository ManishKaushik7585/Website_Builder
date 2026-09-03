import { WebsiteProject, SitePlan } from '../../config/project';
import { MultiPageGenerationState } from '../../config/site-acceptance';
import { SiteAcceptanceOrchestrator } from './SiteAcceptanceOrchestrator';
import { ConvergenceResult } from '../../config/generation-convergence';
import { IntelligenceSnapshot } from '../../config/observability';

export class MultiPageOrchestrator {
  static async execute(
    project: WebsiteProject,
    sitePlan: SitePlan,
    pageGeneratorCallback: (pageId: string) => Promise<{ convergence: ConvergenceResult, snapshot: IntelligenceSnapshot }>
  ): Promise<MultiPageGenerationState> {
    const pageResults: Record<string, ConvergenceResult> = {};
    const snapshots: Record<string, IntelligenceSnapshot> = {};

    for (const pageId of sitePlan.pages) {
      try {
        const { convergence, snapshot } = await pageGeneratorCallback(pageId);
        pageResults[pageId] = convergence;
        snapshots[pageId] = snapshot;
      } catch (e: any) {
        console.error(`Page Generation Hard Crash on page ${pageId}:`, e);
        
        // Return a mock failure snapshot to keep the pipeline moving safely
        snapshots[pageId] = {
          runId: '',
          projectId: project.id,
          pageId: pageId,
          timestamp: new Date().toISOString(),
          generationStage: 'failed',
          iterationCount: 0
        } as unknown as IntelligenceSnapshot;
        
        pageResults[pageId] = {
          status: 'unsupported_action',
          currentIteration: 0,
          maxIterations: 3,
          terminationReason: 'hard_crash_in_pipeline',
          resolvedViolations: [],
          blockingViolations: []
        } as unknown as ConvergenceResult;
      }
    }

    const siteAcceptance = SiteAcceptanceOrchestrator.evaluate(sitePlan, pageResults, snapshots);

    return {
      siteAcceptance,
      snapshots
    };
  }
}
