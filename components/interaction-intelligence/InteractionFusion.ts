import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { InteractionDiagnostic } from '../../registry/interaction-intelligence-validator';
import { InteractionPlan, InteractionScope } from '../../config/interaction-intelligence';

export interface FusedInteractionIssue {
  diagnostic: InteractionDiagnostic;
  scope: InteractionScope;
}

export class InteractionFusion {
  static fuseObservations(
    _interactionPlan: InteractionPlan,
    _responsivePlan: ResponsivePlan,
    _contentPlan: PageContentPlan,
    _role: PageRole,
    diagnostics: InteractionDiagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _browserObservations: unknown[], 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _qaObservations: unknown[] 
  ): FusedInteractionIssue[] {
    return diagnostics.map(diag => {
      let scope: InteractionScope = 'component-specific';

      if (diag.code === 'MISSING_KEYBOARD_BEHAVIOR' || diag.code === 'MISSING_FOCUS_BEHAVIOR') {
        scope = 'site-wide'; // Accessibility constraints are usually site-wide
      }

      if (diag.code === 'DESTRUCTIVE_ACTION_UNPROTECTED') {
        scope = 'page-specific';
      }

      if (diag.code === 'INTERACTION_DEVICE_MISMATCH') {
        scope = 'viewport-specific';
      }

      return { diagnostic: diag, scope };
    });
  }
}
