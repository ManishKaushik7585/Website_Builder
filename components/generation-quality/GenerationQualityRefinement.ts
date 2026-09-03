import { QualityDiagnosis, QualityRecommendation } from '../../config/generation-quality';

export class GenerationQualityRefinement {
  static refine(diagnoses: QualityDiagnosis[]): QualityRecommendation[] {
    return diagnoses.map(d => this.generateRecommendation(d));
  }

  private static generateRecommendation(diagnosis: QualityDiagnosis): QualityRecommendation {
    let action = 'resolveIssue';
    if (diagnosis.message.includes('REQUIRED_SECTION_MISSING')) {
      action = 'addRequiredSection';
    } else if (diagnosis.message.includes('CONTENT_GENERATION_DRIFT')) {
      action = 'restorePrimaryContent';
    } else if (diagnosis.message.includes('RESPONSIVE_GENERATION_DRIFT')) {
      action = 'resolveHorizontalOverflow';
    } else if (diagnosis.message.includes('INTERACTION_GENERATION_DRIFT')) {
      action = 'restoreKeyboardBehavior';
    } else if (diagnosis.message.includes('QUALITY_GATE_BLOCKED_BY_RUNTIME_EVIDENCE')) {
      action = 'resolveCriticalObservation';
    }

    return {
      action,
      targetDimension: diagnosis.sourceDomain,
      parameters: {
        pageId: diagnosis.affectedPageId,
        section: diagnosis.affectedSectionPurpose || 'global'
      },
      expectedOutcome: `Resolved diagnosis: ${diagnosis.diagnosisId}`
    };
  }
}
