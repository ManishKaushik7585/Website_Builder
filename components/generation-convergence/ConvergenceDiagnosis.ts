import { QualityViolation } from '../../config/generation-quality';
import { ConvergenceAction } from '../../config/generation-convergence';

export interface ConvergenceDiagnosisResult {
  code: string;
  source: string;
  domain: string;
  severity: string;
  blocking: boolean;
  affectedScope: string;
  evidence: string;
  recommendedAction: string;
}

export class ConvergenceDiagnosis {
  static diagnose(violations: QualityViolation[]): ConvergenceDiagnosisResult[] {
    return violations.map(v => {
      let code = 'QUALITY_GATE_BLOCKED';
      let scope = 'page';
      let action = 'regenerate';

      if (v.code === 'CONTENT_PLAN_UNSATISFIED') {
        code = 'CONTENT_GENERATION_DRIFT';
        scope = 'section';
        action = 'addRequiredSection';
      } else if (v.code === 'REQUIRED_SECTION_MISSING') {
        code = 'CONTENT_GENERATION_DRIFT';
        scope = 'section';
        action = 'addRequiredSection';
      } else if (v.dimension === 'responsive') {
        code = 'RESPONSIVE_GENERATION_DRIFT';
        scope = 'responsive-variant';
        action = 'removeHorizontalOverflow';
      } else if (v.dimension === 'interaction') {
        code = 'INTERACTION_GENERATION_DRIFT';
        scope = 'interaction-behavior';
        action = 'addFocusBehavior';
      } else if (v.dimension === 'navigation') {
        code = 'NAVIGATION_GENERATION_DRIFT';
        scope = 'site';
        action = 'repairNavigationAffordance';
      } else if (v.dimension === 'accessibility') {
        code = 'ACCESSIBILITY_GENERATION_DRIFT';
        scope = 'component';
        action = 'addFocusBehavior';
      } else if (v.code === 'UNVERIFIED_EVIDENCE' || v.code === 'GENERATION_EVIDENCE_MISSING') {
        code = 'OBSERVABILITY_EVIDENCE_MISSING';
        scope = 'page';
        action = 'haltConvergence';
      }

      return {
        code,
        source: 'orchestrator',
        domain: v.dimension,
        severity: v.severity,
        blocking: v.severity === 'high' || v.severity === 'critical',
        affectedScope: scope,
        evidence: v.message,
        recommendedAction: action
      };
    });
  }
}
