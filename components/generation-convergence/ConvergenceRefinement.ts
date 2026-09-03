import { ConvergenceAction, RegenerationScope } from '../../config/generation-convergence';
import { ConvergenceDiagnosisResult } from './ConvergenceDiagnosis';
import { QualityRecommendation } from '../../config/generation-quality';

export class ConvergenceRefinement {
  private static BLOCKED_ACTIONS = ['raw_css', 'jsx', 'script', 'dom_selector'];

  static refine(diagnostics: ConvergenceDiagnosisResult[], recommendations: QualityRecommendation[]): ConvergenceAction[] {
    const actions: ConvergenceAction[] = [];

    // Derive from recommendations
    for (const rec of recommendations) {
      if (this.BLOCKED_ACTIONS.includes(rec.action)) {
        continue; // Reject forbidden actions
      }

      const action: ConvergenceAction = {
        action: rec.action
      };
      
      // Match with diagnostic scope if available
      const diag = diagnostics.find(d => d.recommendedAction === rec.action);
      if (diag) {
        action.scope = diag.affectedScope as RegenerationScope;
      } else {
        action.scope = 'page'; // default
      }

      // Explicit rejections
      if (rec.action.includes('css') || rec.action.includes('html') || rec.action.includes('script')) {
        continue;
      }

      actions.push(action);
    }

    // Deduplicate
    return actions.filter((v, i, a) => a.findIndex(t => t.action === v.action) === i);
  }
}
