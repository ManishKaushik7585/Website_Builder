import { QualityViolation, QualityDiagnosis } from '../../config/generation-quality';

export class GenerationQualityDiagnosis {
  static diagnose(violations: QualityViolation[]): QualityDiagnosis[] {
    return violations.map(v => this.mapViolationToDiagnosis(v));
  }

  private static mapViolationToDiagnosis(violation: QualityViolation): QualityDiagnosis {
    let msg = violation.message;
    if (violation.code === 'CONTENT_PLAN_UNSATISFIED') {
      msg = 'CONTENT_GENERATION_DRIFT: ' + msg;
    } else if (violation.code === 'RESPONSIVE_PLAN_UNSATISFIED') {
      msg = 'RESPONSIVE_GENERATION_DRIFT: ' + msg;
    } else if (violation.code === 'INTERACTION_PLAN_UNSATISFIED') {
      msg = 'INTERACTION_GENERATION_DRIFT: ' + msg;
    } else if (violation.code === 'CRITICAL_OBSERVATION_UNRESOLVED') {
      msg = 'QUALITY_GATE_BLOCKED_BY_RUNTIME_EVIDENCE: ' + msg;
    }

    return {
      diagnosisId: 'diag_' + Math.random().toString(36).substr(2, 9),
      sourceDomain: violation.dimension,
      affectedPageId: violation.affectedPageId,
      affectedSectionPurpose: violation.affectedSectionPurpose,
      severity: violation.severity,
      isBlocking: violation.severity === 'critical' || violation.severity === 'high',
      message: msg
    };
  }
}
