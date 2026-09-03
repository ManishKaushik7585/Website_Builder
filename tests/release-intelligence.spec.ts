import { test, expect } from '@playwright/test';
import { ReleaseIntelligenceOrchestrator } from '../components/release-intelligence/ReleaseIntelligenceOrchestrator';

test.describe('Phase 8: Release Intelligence', () => {

  const validSiteAcceptance = { status: 'accepted' };
  const validMultiPageState = { 
    siteAcceptance: validSiteAcceptance,
    pageResults: {},
    snapshots: {}
  };
  const validObservations = {
    build: { success: true },
    routes: { brokenRoutes: false, brokenRouteCount: 0 },
    assets: { missingAssets: false },
    environment: { unsafeReferences: false, secretLeakage: false },
    accessibility: { failedRequirements: false },
    performance: { failedThreshold: false },
    security: { securityViolation: false },
    metadata: { incomplete: false }
  };

  test('1. Fully valid release evaluates to ready', () => {
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, validObservations
    );
    expect(result.status).toBe('ready');
    expect(result.deploymentReadiness.mandatoryGatesPassed).toBe(true);
    expect(result.blockers.length).toBe(0);
    expect(result.score).toBe(100);
  });

  test('2. Site not accepted evaluates to blocked', () => {
    const rejectedSite = { status: 'rejected' };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      rejectedSite, validMultiPageState, validObservations
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'SITE_NOT_ACCEPTED')).toBe(true);
  });

  test('3. Site acceptance unavailable evaluates to unverified', () => {
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      null, validMultiPageState, validObservations
    );
    expect(result.status).toBe('unverified');
    expect(result.dimensions['site_acceptance']).toBe('unverified');
  });

  test('4. Build failure evaluates to blocked', () => {
    const obs = { ...validObservations, build: { success: false } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'FAILED_PRODUCTION_BUILD')).toBe(true);
  });

  test('5. Missing build evidence evaluates to unverified', () => {
    const obs = { ...validObservations };
    delete (obs as any).build;
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('unverified');
    expect(result.dimensions['build']).toBe('unverified');
  });

  test('6. Broken route evaluates to blocked', () => {
    const obs = { ...validObservations, routes: { brokenRoutes: true, brokenRouteCount: 2 } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'BROKEN_ROUTE_EVIDENCE')).toBe(true);
  });

  test('7. Missing required asset evaluates to ready_with_warnings or blocked based on severity', () => {
    // Current validator maps MISSING_ASSET_EVIDENCE to high severity (blocking)
    const obs = { ...validObservations, assets: { missingAssets: true } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'MISSING_ASSET_EVIDENCE')).toBe(true);
  });

  test('8. Missing metadata generates warning and ready_with_warnings', () => {
    const obs = { ...validObservations, metadata: { incomplete: true } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('ready_with_warnings');
    expect(result.warnings.some(w => w.diagnosis.code === 'MISSING_METADATA')).toBe(true);
    expect(result.blockers.length).toBe(0);
  });

  test('9. Unsafe environment reference evaluates to blocked', () => {
    const obs = { ...validObservations, environment: { unsafeReferences: true, secretLeakage: false } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'UNSAFE_ENVIRONMENT_REFERENCE')).toBe(true);
  });

  test('10. Secret leakage evaluates to blocked', () => {
    const obs = { ...validObservations, environment: { unsafeReferences: false, secretLeakage: true } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'SECRET_LEAKAGE')).toBe(true);
  });

  test('11. Synthetic secret leakage detection in Collector evaluates to blocked', () => {
    // If environment observations are missing, collector scans multipagestate for 'sk-'
    const obs = { ...validObservations };
    delete (obs as any).environment;
    const leakyState = { ...validMultiPageState, fakeConfig: 'sk-fake-secret-key' };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, leakyState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'SECRET_LEAKAGE')).toBe(true);
  });

  test('12. Missing accessibility evidence evaluates to unverified', () => {
    const obs = { ...validObservations };
    delete (obs as any).accessibility;
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('unverified');
  });

  test('13. Missing performance evidence evaluates to unverified', () => {
    const obs = { ...validObservations };
    delete (obs as any).performance;
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('unverified');
  });

  test('14. Security violation evaluates to blocked', () => {
    const obs = { ...validObservations, security: { securityViolation: true } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.some(b => b.diagnosis.code === 'SECURITY_VIOLATION')).toBe(true);
  });

  test('15. Multiple simultaneous blockers are tracked correctly', () => {
    const obs = { ...validObservations, build: { success: false }, routes: { brokenRoutes: true } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    expect(result.status).toBe('blocked');
    expect(result.blockers.length).toBe(2);
  });

  test('16. Semantic refinement generation handles build failure', () => {
    const obs = { ...validObservations, build: { success: false } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    const hasRefineAction = result.recommendations.some(r => r.action === 'verifyProductionBuild');
    expect(hasRefineAction).toBe(true);
  });

  test('17. Semantic refinement handles environment leaks', () => {
    const obs = { ...validObservations, environment: { unsafeReferences: false, secretLeakage: true } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    const hasRefineAction = result.recommendations.some(r => r.action === 'removeUnsafeClientEnvironmentReference');
    expect(hasRefineAction).toBe(true);
  });

  test('18. Semantic refinement does not generate raw commands', () => {
    const obs = { ...validObservations, build: { success: false } };
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, obs
    );
    for (const rec of result.recommendations) {
      expect(rec.action).not.toContain('npm');
      expect(rec.action).not.toContain('yarn');
      expect(rec.action).not.toContain('style');
      expect(rec.action).not.toContain('<div>');
    }
  });

  test('19. Safe client hydration contract ensures evidence Freshness is captured', () => {
    const result = ReleaseIntelligenceOrchestrator.evaluate(
      validSiteAcceptance, validMultiPageState, validObservations
    );
    expect(typeof result.evidenceFreshness).toBe('string');
    expect(result.evidenceFreshness.length).toBeGreaterThan(0);
  });

  test('20. Self critique output asserts measurable state', () => {
    const { ReleaseSelfCritique } = require('../components/release-intelligence/ReleaseSelfCritique');
    const critique = ReleaseSelfCritique.critique([]);
    expect(critique.includes('No blocking release violations remain.')).toBe(true);
    expect(critique.includes('Site Acceptance status is accepted.')).toBe(true);
  });
});
