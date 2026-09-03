import { ContentDiagnostic } from '../../registry/content-intelligence-validator';
import { SectionPurpose } from '../../config/content-intelligence';

export type RefinementActionType = 
  | 'addRequiredSection'
  | 'removeRedundantSection'
  | 'reorderSections'
  | 'shortenSupportingCopy'
  | 'expandPrimaryMessage'
  | 'reduceSectionDensity'
  | 'increaseSectionDensity'
  | 'reduceRepeatedContent'
  | 'splitDenseContent'
  | 'mergeRedundantSections'
  | 'prioritizePrimaryContent'
  | 'adaptForMobile';

export interface SemanticRefinement {
  action: RefinementActionType;
  targetPurpose?: SectionPurpose;
  reasoning: string;
}

export class ContentDiagnosis {
  static diagnoseAndPrescribe(diagnostics: ContentDiagnostic[]): SemanticRefinement[] {
    const refinements: SemanticRefinement[] = [];

    for (const diag of diagnostics) {
      switch (diag.code) {
        case 'MISSING_REQUIRED_SECTION':
          refinements.push({
            action: 'addRequiredSection',
            targetPurpose: diag.purpose,
            reasoning: diag.message
          });
          break;
        case 'PROHIBITED_SECTION':
        case 'SECTION_DUPLICATION':
          refinements.push({
            action: 'removeRedundantSection',
            targetPurpose: diag.purpose,
            reasoning: diag.message
          });
          break;
        case 'SECTION_ORDER_VIOLATION':
          refinements.push({
            action: 'reorderSections',
            targetPurpose: diag.purpose,
            reasoning: diag.message
          });
          break;
        case 'CONTENT_DENSITY_MISMATCH':
          if (diag.message.includes("sparse")) {
            refinements.push({
              action: 'reduceSectionDensity',
              reasoning: diag.message
            });
          } else {
            refinements.push({
              action: 'increaseSectionDensity',
              reasoning: diag.message
            });
          }
          break;
        case 'CONTENT_HIERARCHY_FAILURE':
          refinements.push({
            action: 'prioritizePrimaryContent',
            reasoning: 'Hierarchy constraints violated. Simplify messaging.'
          });
          break;
        default:
          break;
      }
    }

    return refinements;
  }
}
