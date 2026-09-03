import { ReleaseEvidence, ReleaseCheck, ReleaseDimension, ReleaseViolation, ReleaseSeverity } from '../config/release-intelligence';

export class ReleaseIntelligenceValidator {
  
  static validate(evidence: ReleaseEvidence[]): ReleaseCheck[] {
    const checks: ReleaseCheck[] = [];
    const dimensions: ReleaseDimension[] = [
      'site_acceptance', 'build', 'routes', 'assets', 'environment', 
      'accessibility', 'performance', 'security', 'metadata'
    ];

    for (const dim of dimensions) {
      const ev = evidence.find(e => e.dimension === dim);
      if (!ev || !ev.isAvailable) {
        checks.push({
          dimension: dim,
          passed: false,
          verified: false,
          violations: [{
            code: `MISSING_${dim.toUpperCase()}_EVIDENCE`,
            dimension: dim,
            severity: 'high',
            message: `Required evidence for ${dim} is unavailable.`
          }]
        });
        continue;
      }

      const violations: ReleaseViolation[] = [];
      let passed = true;

      switch (dim) {
        case 'site_acceptance':
          if (ev.data?.status !== 'accepted') {
            passed = false;
            violations.push({
              code: 'SITE_NOT_ACCEPTED',
              dimension: dim,
              severity: 'critical',
              message: `Site Acceptance status is ${ev.data?.status || 'unknown'}.`
            });
          }
          break;
        case 'build':
          if (ev.data?.success !== true) {
            passed = false;
            violations.push({
              code: 'FAILED_PRODUCTION_BUILD',
              dimension: dim,
              severity: 'critical',
              message: 'Production build failed.'
            });
          }
          break;
        case 'routes':
          if (ev.data?.brokenRoutes === true || (ev.data?.brokenRouteCount as number) > 0) {
            passed = false;
            violations.push({
              code: 'BROKEN_ROUTE_EVIDENCE',
              dimension: dim,
              severity: 'critical',
              message: 'Broken internal routes detected.'
            });
          }
          break;
        case 'assets':
          if (ev.data?.missingAssets === true) {
            passed = false;
            violations.push({
              code: 'MISSING_ASSET_EVIDENCE',
              dimension: dim,
              severity: 'high',
              message: 'Required assets are missing.'
            });
          }
          break;
        case 'environment':
          if (ev.data?.unsafeReferences === true) {
            passed = false;
            violations.push({
              code: 'UNSAFE_ENVIRONMENT_REFERENCE',
              dimension: dim,
              severity: 'critical',
              message: 'Unsafe client-side environment references detected.'
            });
          }
          if (ev.data?.secretLeakage === true) {
            passed = false;
            violations.push({
              code: 'SECRET_LEAKAGE',
              dimension: dim,
              severity: 'critical',
              message: 'Environment secret leakage detected.'
            });
          }
          break;
        case 'accessibility':
          if (ev.data?.failedRequirements === true) {
            passed = false;
            violations.push({
              code: 'FAILED_ACCESSIBILITY_REQUIREMENTS',
              dimension: dim,
              severity: 'high',
              message: 'Accessibility requirements failed.'
            });
          }
          break;
        case 'performance':
          if (ev.data?.failedThreshold === true) {
            passed = false;
            violations.push({
              code: 'FAILED_PERFORMANCE_THRESHOLD',
              dimension: dim,
              severity: 'high',
              message: 'Performance threshold not met.'
            });
          }
          break;
        case 'security':
          if (ev.data?.securityViolation === true) {
            passed = false;
            violations.push({
              code: 'SECURITY_VIOLATION',
              dimension: dim,
              severity: 'critical',
              message: 'Security boundary violation detected.'
            });
          }
          break;
        case 'metadata':
          if (ev.data?.incomplete === true) {
            violations.push({
              code: 'MISSING_METADATA',
              dimension: dim,
              severity: 'warning',
              message: 'Release metadata is incomplete.'
            });
          }
          break;
      }

      checks.push({
        dimension: dim,
        passed,
        verified: ev.isVerified,
        violations
      });
    }

    return checks;
  }
}
