import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ResponsiveDiagnostic } from '../../registry/responsive-intelligence-validator';
import { ResponsivePlan } from '../../config/responsive-intelligence';

export type ResponsiveIssueScope = 
  | 'viewport-specific'
  | 'component-specific'
  | 'page-specific'
  | 'site-wide'
  | 'content-driven'
  | 'design-driven'
  | 'interaction-driven';

export interface FusedResponsiveIssue {
  diagnostic: ResponsiveDiagnostic;
  scope: ResponsiveIssueScope;
}

export class ResponsiveFusion {
  static fuseObservations(
    _responsivePlan: ResponsivePlan,
    _contentPlan: PageContentPlan,
    _role: PageRole,
    diagnostics: ResponsiveDiagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _browserObservations: unknown[], 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _visionObservations: unknown[] 
  ): FusedResponsiveIssue[] {
    return diagnostics.map(diag => {
      let scope: ResponsiveIssueScope = 'viewport-specific';

      if (diag.code === 'HORIZONTAL_OVERFLOW' || diag.code === 'CONTENT_CLIPPING') {
        scope = 'component-specific';
      }

      if (diag.code === 'INAPPROPRIATE_CONTENT_HIDING') {
        scope = 'content-driven';
      }

      if (diag.code === 'RESPONSIVE_HIERARCHY_FAILURE') {
        scope = 'design-driven';
      }

      if (diag.code === 'CTA_ACCESSIBILITY_FAILURE' || diag.code === 'NAVIGATION_COLLAPSE_FAILURE') {
        scope = 'interaction-driven';
      }

      return { diagnostic: diag, scope };
    });
  }
}
