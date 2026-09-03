import { ResponsiveDiagnostic } from '../../registry/responsive-intelligence-validator';
import { ViewportClass } from '../../config/responsive-intelligence';
import { SectionPurpose } from '../../config/content-intelligence';

export type ResponsiveRefinementActionType = 
  | 'stackColumns'
  | 'collapseNavigation'
  | 'reorderContent'
  | 'preservePrimaryContent'
  | 'reduceSecondaryContent'
  | 'convertGridToList'
  | 'convertSplitLayoutToStack'
  | 'reduceMediaWidth'
  | 'moveCTAIntoFlow'
  | 'increaseTouchTarget'
  | 'reduceSectionDensity'
  | 'removeHorizontalOverflow'
  | 'adaptTypography'
  | 'adaptSpacing';

export interface SemanticResponsiveRefinement {
  action: ResponsiveRefinementActionType;
  targetViewport?: ViewportClass;
  targetSection?: string;
  reasoning: string;
}

export class ResponsiveDiagnosis {
  static diagnoseAndPrescribe(diagnostics: ResponsiveDiagnostic[]): SemanticResponsiveRefinement[] {
    const refinements: SemanticResponsiveRefinement[] = [];

    for (const diag of diagnostics) {
      switch (diag.code) {
        case 'HORIZONTAL_OVERFLOW':
          refinements.push({
            action: 'removeHorizontalOverflow',
            targetViewport: diag.viewport,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'INAPPROPRIATE_CONTENT_HIDING':
          refinements.push({
            action: 'preservePrimaryContent',
            targetViewport: diag.viewport,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'CONTENT_CLIPPING':
          refinements.push({
            action: 'adaptSpacing',
            targetViewport: diag.viewport,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'RESPONSIVE_HIERARCHY_FAILURE':
          refinements.push({
            action: 'reorderContent',
            targetViewport: diag.viewport,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        case 'INVALID_STACKING':
          refinements.push({
            action: 'convertSplitLayoutToStack',
            targetViewport: diag.viewport,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
        default:
          refinements.push({
            action: 'reduceSectionDensity',
            targetViewport: diag.viewport,
            targetSection: diag.section,
            reasoning: diag.message
          });
          break;
      }
    }

    return refinements;
  }
}
