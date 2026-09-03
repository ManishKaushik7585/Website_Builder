import { PageRole } from '../config/page-role';
import { PageContentPlan } from '../config/content-intelligence';
import { ResponsivePlan, ResponsiveObservation, ViewportClass } from '../config/responsive-intelligence';

export interface ResponsiveValidationResult {
  valid: boolean;
  diagnostics: ResponsiveDiagnostic[];
}

export type ResponsiveDiagnosticCode = 
  | 'HORIZONTAL_OVERFLOW'
  | 'CONTENT_CLIPPING'
  | 'RESPONSIVE_DENSITY_FAILURE'
  | 'RESPONSIVE_HIERARCHY_FAILURE'
  | 'INVALID_STACKING'
  | 'NAVIGATION_COLLAPSE_FAILURE'
  | 'MEDIA_OVERFLOW'
  | 'CTA_ACCESSIBILITY_FAILURE'
  | 'BREAKPOINT_CONFLICT'
  | 'BREAKPOINT_GAP'
  | 'INAPPROPRIATE_CONTENT_HIDING'
  | 'MOBILE_LAYOUT_FAILURE'
  | 'TABLET_LAYOUT_FAILURE'
  | 'DESKTOP_LAYOUT_FAILURE';

export interface ResponsiveDiagnostic {
  code: ResponsiveDiagnosticCode;
  message: string;
  viewport?: ViewportClass;
  section?: string;
  severity: 'error' | 'warning';
}

export class ResponsiveIntelligenceValidator {
  static validate(
    plan: ResponsivePlan, 
    contentPlan: PageContentPlan, 
    role: PageRole,
    observations?: ResponsiveObservation[]
  ): ResponsiveValidationResult {
    const diagnostics: ResponsiveDiagnostic[] = [];

    // Static Analysis of the Plan
    for (const behavior of plan.behaviors) {
      for (const transformation of behavior.transformations) {
        // Prevent hiding primary content on mobile unless role allows it (e.g. not typically allowed)
        if (
          transformation.type === 'hide' && 
          transformation.triggerCondition === 'mobile' && 
          !plan.globalConstraints.allowHidingPrimary &&
          transformation.preservedPriority.includes('primary') === false 
        ) {
          diagnostics.push({
            code: 'INAPPROPRIATE_CONTENT_HIDING',
            message: `Primary content cannot be hidden on mobile for section ${behavior.sectionPurpose}.`,
            viewport: 'mobile',
            section: behavior.sectionPurpose,
            severity: 'error'
          });
        }
      }
    }

    // Dynamic Analysis from Observations (if available)
    if (observations) {
      for (const obs of observations) {
        if (obs.hasHorizontalOverflow && !plan.globalConstraints.allowHorizontalScroll) {
          diagnostics.push({
            code: 'HORIZONTAL_OVERFLOW',
            message: `Horizontal overflow detected in ${obs.section} at ${obs.viewport} viewport.`,
            viewport: obs.viewport,
            section: obs.section,
            severity: 'error'
          });
        }

        if (obs.isContentClipped) {
          diagnostics.push({
            code: 'CONTENT_CLIPPING',
            message: `Content is clipped in ${obs.section} at ${obs.viewport} viewport.`,
            viewport: obs.viewport,
            section: obs.section,
            severity: 'error'
          });
        }
        
        if (obs.hasCollapsedHierarchy) {
          diagnostics.push({
            code: 'RESPONSIVE_HIERARCHY_FAILURE',
            message: `Visual hierarchy collapsed in ${obs.section} at ${obs.viewport} viewport.`,
            viewport: obs.viewport,
            section: obs.section,
            severity: 'error'
          });
        }
      }
    }

    return {
      valid: !diagnostics.some(d => d.severity === 'error'),
      diagnostics
    };
  }
}
