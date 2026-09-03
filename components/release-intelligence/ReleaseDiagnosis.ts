import { ReleaseCheck, ReleaseDiagnosis, ReleaseViolation } from '../../config/release-intelligence';

export class ReleaseDiagnosisService {
  static diagnose(checks: ReleaseCheck[]): ReleaseDiagnosis[] {
    const diagnoses: ReleaseDiagnosis[] = [];

    for (const check of checks) {
      for (const violation of check.violations) {
        diagnoses.push({
          code: violation.code,
          dimension: violation.dimension,
          severity: violation.severity,
          scope: 'project',
          evidence: violation.message,
          isBlocking: violation.severity === 'critical' || violation.severity === 'high',
          semanticCategory: this.mapCategory(violation.code),
          explanation: this.mapExplanation(violation.code)
        });
      }
    }

    return diagnoses;
  }

  private static mapCategory(code: string): string {
    if (code.includes('EVIDENCE')) return 'MissingEvidence';
    if (code.includes('NOT_ACCEPTED')) return 'SiteAcceptance';
    if (code.includes('BUILD')) return 'BuildFailure';
    if (code.includes('ROUTE')) return 'RouteIntegrity';
    if (code.includes('ENVIRONMENT') || code.includes('SECRET')) return 'EnvironmentSecurity';
    return 'GeneralReadiness';
  }

  private static mapExplanation(code: string): string {
    const map: Record<string, string> = {
      'SITE_NOT_ACCEPTED': 'The Site Acceptance status is not accepted, preventing safe deployment.',
      'MISSING_SITE_ACCEPTANCE_EVIDENCE': 'Site Acceptance evidence is completely missing.',
      'FAILED_PRODUCTION_BUILD': 'The production build process resulted in an error.',
      'BROKEN_ROUTE_EVIDENCE': 'Internal routing graph contains broken links or unmapped paths.',
      'UNSAFE_ENVIRONMENT_REFERENCE': 'Unsafe environment variables are exposed to the client bundle.',
      'SECRET_LEAKAGE': 'A secret or private credential pattern was detected in the generated project state.',
      'MISSING_BUILD_EVIDENCE': 'Production build evidence is unavailable.',
      'MISSING_ROUTES_EVIDENCE': 'Routing verification evidence is unavailable.',
      'MISSING_ASSETS_EVIDENCE': 'Asset verification evidence is unavailable.',
      'MISSING_ENVIRONMENT_EVIDENCE': 'Environment boundary verification evidence is unavailable.',
      'MISSING_ACCESSIBILITY_EVIDENCE': 'Accessibility verification evidence is unavailable.',
      'MISSING_PERFORMANCE_EVIDENCE': 'Performance verification evidence is unavailable.',
      'MISSING_SECURITY_EVIDENCE': 'Security verification evidence is unavailable.',
      'MISSING_METADATA_EVIDENCE': 'Metadata verification evidence is unavailable.'
    };
    return map[code] || 'An issue was detected with deployment readiness requirements.';
  }
}
