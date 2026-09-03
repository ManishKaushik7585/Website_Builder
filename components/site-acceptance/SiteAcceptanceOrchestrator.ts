import { SiteAcceptanceResult, CrossPageViolation } from '../../config/site-acceptance';
import { ConvergenceResult } from '../../config/generation-convergence';
import { IntelligenceSnapshot } from '../../config/observability';
import { SitePlan } from '../../config/project';

export class SiteAcceptanceOrchestrator {
  static evaluate(
    sitePlan: SitePlan,
    pageResults: Record<string, ConvergenceResult>,
    snapshots: Record<string, IntelligenceSnapshot>
  ): SiteAcceptanceResult {
    const totalPages = sitePlan.pages.length;
    let acceptedPages = 0;
    const crossPageViolations: CrossPageViolation[] = [];
    let cumulativeScore = 0;

    for (const pageId of sitePlan.pages) {
      const result = pageResults[pageId];
      if (result) {
        cumulativeScore += result.finalScore || 0;
        if (result.status === 'accepted') {
          acceptedPages++;
        }
      } else {
        crossPageViolations.push({
          code: 'MISSING_PAGE_GENERATION',
          sourcePageId: pageId,
          message: `Page ${pageId} was not generated or converged.`,
          severity: 'critical',
          domain: 'layout'
        });
      }
    }

    const projectScore = totalPages > 0 ? Math.floor(cumulativeScore / totalPages) : 0;

    // Simulate cross-page consistency checks
    if (totalPages > 1) {
      const firstPageSnapshot = Object.values(snapshots)[0];
      if (firstPageSnapshot) {
        // Just an example check: global constraint mismatches
        for (const [id, snap] of Object.entries(snapshots)) {
          if ((snap?.content as any)?.validation && (firstPageSnapshot?.content as any)?.validation && (snap.content as any).validation.valid !== (firstPageSnapshot.content as any).validation.valid) {
            crossPageViolations.push({
              code: 'CROSS_PAGE_INTENT_MISMATCH',
              sourcePageId: id,
              targetPageId: Object.keys(snapshots)[0],
              message: `Page intent differs from primary site intent.`,
              severity: 'medium',
              domain: 'content'
            });
          }
        }
      }
    }

    let status: 'accepted' | 'rejected' | 'partial' | 'unverified' = 'unverified';

    if (totalPages > 0) {
      if (acceptedPages === totalPages && !crossPageViolations.some(v => v.severity === 'high' || v.severity === 'critical')) {
        status = 'accepted';
      } else if (acceptedPages > 0) {
        status = 'partial';
      } else {
        status = 'rejected';
      }
    }

    return {
      status,
      projectScore,
      totalPages,
      acceptedPages,
      crossPageViolations,
      pageResults,
      timestamp: new Date().toISOString()
    };
  }
}
