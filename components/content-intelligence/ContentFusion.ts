import { PageRole } from '../../config/page-role';
import { PageContentPlan } from '../../config/content-intelligence';
import { ContentDiagnostic } from '../../registry/content-intelligence-validator';

export type ContentIssueScope = 
  | 'page-specific'
  | 'site-wide'
  | 'responsive-constraint'
  | 'page-role-mismatch'
  | 'design-content-interaction';

export interface FusedContentIssue {
  diagnostic: ContentDiagnostic;
  scope: ContentIssueScope;
}

export class ContentFusion {
  static fuseObservations(
    plan: PageContentPlan,
    role: PageRole,
    diagnostics: ContentDiagnostic[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    browserObservations: any[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    qaObservations: any[]
  ): FusedContentIssue[] {
    return diagnostics.map(diag => {
      let scope: ContentIssueScope = 'page-specific';

      if (diag.code === 'CONTENT_DENSITY_MISMATCH' || diag.code === 'PAGE_ROLE_CONTENT_MISMATCH') {
        scope = 'page-role-mismatch';
      }

      if (diag.code === 'CROSS_PAGE_CONTENT_DUPLICATION') {
        scope = 'site-wide';
      }

      // If browser observation indicates overflow in a section where content hierarchy failed
      if (diag.code === 'CONTENT_HIERARCHY_FAILURE' && browserObservations.some(o => o.type === 'overflow')) {
        scope = 'design-content-interaction';
      }

      // If issue is tied to responsive viewport constraints
      if (diag.code === 'RESPONSIVE_CONTENT_OVERFLOW') {
        scope = 'responsive-constraint';
      }

      return { diagnostic: diag, scope };
    });
  }
}
