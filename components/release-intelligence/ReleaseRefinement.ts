import { ReleaseDiagnosis, ReleaseRecommendation } from '../../config/release-intelligence';

export class ReleaseRefinement {
  static refine(diagnoses: ReleaseDiagnosis[]): ReleaseRecommendation[] {
    const recommendations: ReleaseRecommendation[] = [];

    for (const diagnosis of diagnoses) {
      let action = 'verifyReadiness';

      switch (diagnosis.code) {
        case 'SITE_NOT_ACCEPTED':
          action = 'resolveSiteAcceptanceBlocker';
          break;
        case 'FAILED_PRODUCTION_BUILD':
        case 'MISSING_BUILD_EVIDENCE':
          action = 'verifyProductionBuild';
          break;
        case 'BROKEN_ROUTE_EVIDENCE':
        case 'MISSING_ROUTES_EVIDENCE':
          action = 'verifyRouteIntegrity';
          break;
        case 'UNSAFE_ENVIRONMENT_REFERENCE':
        case 'SECRET_LEAKAGE':
          action = 'removeUnsafeClientEnvironmentReference';
          break;
        case 'MISSING_ACCESSIBILITY_EVIDENCE':
          action = 'verifyAccessibilityEvidence';
          break;
        case 'MISSING_PERFORMANCE_EVIDENCE':
          action = 'verifyPerformanceEvidence';
          break;
        case 'MISSING_METADATA':
          action = 'verifyReleaseMetadata';
          break;
        case 'MISSING_ASSET_EVIDENCE':
          action = 'verifyRequiredAssets';
          break;
        default:
          if (diagnosis.code.includes('EVIDENCE')) {
            action = 'refreshReleaseEvidence';
          }
      }

      recommendations.push({
        action,
        targetDimension: diagnosis.dimension,
        semanticCategory: diagnosis.semanticCategory,
        expectedOutcome: `Resolved diagnosis: ${diagnosis.code}`
      });
    }

    return recommendations;
  }
}
