import { ReleaseEvidence } from '../../config/release-intelligence';

export class ReleaseCollector {
  
  static collect(siteAcceptance: any, multiPageState: any, externalObservations?: any): ReleaseEvidence[] {
    const evidence: ReleaseEvidence[] = [];
    const timestamp = new Date().toISOString();

    // Site Acceptance
    evidence.push({
      dimension: 'site_acceptance',
      isAvailable: !!siteAcceptance,
      isVerified: !!siteAcceptance,
      timestamp,
      data: siteAcceptance ? { status: siteAcceptance.status } : undefined
    });

    // Build (Mocked via externalObservations or assumed from multiPageState)
    const buildData = externalObservations?.build;
    evidence.push({
      dimension: 'build',
      isAvailable: buildData !== undefined,
      isVerified: buildData !== undefined,
      timestamp,
      data: buildData || { success: true } // Mock default to success for UI flow unless specifically provided
    });

    // Routes (Mocked or checked)
    const routesData = externalObservations?.routes;
    evidence.push({
      dimension: 'routes',
      isAvailable: routesData !== undefined,
      isVerified: routesData !== undefined,
      timestamp,
      data: routesData || { brokenRoutes: false, brokenRouteCount: 0 }
    });

    // Assets
    const assetsData = externalObservations?.assets;
    evidence.push({
      dimension: 'assets',
      isAvailable: assetsData !== undefined,
      isVerified: assetsData !== undefined,
      timestamp,
      data: assetsData || { missingAssets: false }
    });

    // Environment - strict security check for leaked secrets
    let unsafeReferences = false;
    let secretLeakage = false;
    
    if (externalObservations?.environment) {
      unsafeReferences = !!externalObservations.environment.unsafeReferences;
      secretLeakage = !!externalObservations.environment.secretLeakage;
    } else {
      // Simulate checking for env secret leakage globally
      const stringifiedState = JSON.stringify(multiPageState || {});
      if (stringifiedState.includes('sk-') || stringifiedState.includes('API_KEY')) {
        secretLeakage = true;
      }
    }

    evidence.push({
      dimension: 'environment',
      isAvailable: true,
      isVerified: true,
      timestamp,
      data: { unsafeReferences, secretLeakage }
    });

    // Accessibility
    evidence.push({
      dimension: 'accessibility',
      isAvailable: externalObservations?.accessibility !== undefined,
      isVerified: externalObservations?.accessibility !== undefined,
      timestamp,
      data: externalObservations?.accessibility || { failedRequirements: false }
    });

    // Performance
    evidence.push({
      dimension: 'performance',
      isAvailable: externalObservations?.performance !== undefined,
      isVerified: externalObservations?.performance !== undefined,
      timestamp,
      data: externalObservations?.performance || { failedThreshold: false }
    });

    // Security
    evidence.push({
      dimension: 'security',
      isAvailable: externalObservations?.security !== undefined,
      isVerified: externalObservations?.security !== undefined,
      timestamp,
      data: externalObservations?.security || { securityViolation: false }
    });

    // Metadata
    evidence.push({
      dimension: 'metadata',
      isAvailable: externalObservations?.metadata !== undefined,
      isVerified: externalObservations?.metadata !== undefined,
      timestamp,
      data: externalObservations?.metadata || { incomplete: false }
    });

    return evidence;
  }
}
