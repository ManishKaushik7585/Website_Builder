import { expect, test } from '@playwright/test';
import { SiteAcceptanceValidator } from '../registry/site-acceptance-validator';
import { SiteAcceptanceOrchestrator } from '../components/site-acceptance/SiteAcceptanceOrchestrator';
import { MultiPageOrchestrator } from '../components/site-acceptance/MultiPageOrchestrator';
import { SitePlan } from '../config/project';
import { ConvergenceResult } from '../config/generation-convergence';
import { IntelligenceSnapshot } from '../config/observability';

test.describe('Phase 7I: Site Acceptance Intelligence', () => {
  const mockSitePlan: SitePlan = {
    projectObjective: 'Test multi-page pipeline',
    audience: 'Testers',
    primaryAction: 'Complete test',
    pages: ['home', 'about'],
    navigation: [],
    constraints: []
  };

  const createMockConvergence = (status: any, score: number): ConvergenceResult => ({
    status,
    currentIteration: 1,
    maxIterations: 3,
    history: [],
    terminationReason: status === 'accepted' ? 'accepted' : 'stalled',
    finalScore: score,
    blockingViolations: [],
    resolvedViolations: [],
    activeRefinements: [],
    activeScope: null,
    acceptanceStatus: status
  });

  const createMockSnapshot = (intent: string): IntelligenceSnapshot => ({
    content: { 
      globalPlan: { primaryIntent: intent },
      validation: { valid: intent === 'convert' } 
    }
  } as any);

  test('1. Validates a fully accepted site successfully', () => {
    const pageResults = {
      'home': createMockConvergence('accepted', 100),
      'about': createMockConvergence('accepted', 100)
    };
    const snapshots = {
      'home': createMockSnapshot('convert'),
      'about': createMockSnapshot('convert')
    };

    const result = SiteAcceptanceOrchestrator.evaluate(mockSitePlan, pageResults, snapshots);
    expect(result.status).toBe('accepted');
    expect(result.acceptedPages).toBe(2);
    expect(result.projectScore).toBe(100);
    
    const validation = SiteAcceptanceValidator.validate(result);
    expect(validation.valid).toBe(true);
  });

  test('2. Identifies a partially accepted site', () => {
      const pageResults: Record<string, ConvergenceResult> = {
        'home': { status: 'accepted', finalScore: 100, history: [], terminationReason: 'converged', blockingViolations: [] } as any,
        'about': { status: 'blocked', finalScore: 50, history: [], terminationReason: 'stalled', blockingViolations: [] } as any
      };
      
      // We need to inject 'validation' property which is typed as 'any' in our orchestrator fix
      const snapshots: Record<string, any> = {
        'home': { content: { validation: { valid: true } } },
        'about': { content: { validation: { valid: false } } }
      };

    const result = SiteAcceptanceOrchestrator.evaluate(mockSitePlan, pageResults, snapshots);
    expect(result.status).toBe('partial');
    expect(result.acceptedPages).toBe(1);
    expect(result.projectScore).toBe(75);

    const validation = SiteAcceptanceValidator.validate(result);
    expect(validation.valid).toBe(false);
    expect(validation.violations).toContain('UNACCEPTED_PAGES_REMAIN');
  });

  test('3. Detects cross-page global intent mismatches', () => {
    const pageResults = {
      'home': createMockConvergence('accepted', 100),
      'about': createMockConvergence('accepted', 100)
    };
    const snapshots = {
      'home': createMockSnapshot('convert'),
      'about': createMockSnapshot('inform') // Mismatch!
    };

    const result = SiteAcceptanceOrchestrator.evaluate(mockSitePlan, pageResults, snapshots);
    // Since it's a medium violation, it doesn't block validation entirely, but is recorded.
    expect(result.crossPageViolations.length).toBe(1);
    expect(result.crossPageViolations[0].code).toBe('CROSS_PAGE_INTENT_MISMATCH');
  });

  test('4. Detects missing page generation entirely', () => {
    const pageResults = {
      'home': createMockConvergence('accepted', 100)
    }; // Missing 'about'
    const snapshots = {
      'home': createMockSnapshot('convert')
    };

    const result = SiteAcceptanceOrchestrator.evaluate(mockSitePlan, pageResults, snapshots);
    expect(result.status).toBe('partial');
    expect(result.crossPageViolations.length).toBeGreaterThan(0);
    expect(result.crossPageViolations[0].code).toBe('MISSING_PAGE_GENERATION');

    const validation = SiteAcceptanceValidator.validate(result);
    expect(validation.valid).toBe(false);
    expect(validation.violations).toContain('BLOCKING_CROSS_PAGE_VIOLATIONS');
  });

  test('5. MultiPageOrchestrator iterates gracefully over the site plan', async () => {
    const orchestratorResult = await MultiPageOrchestrator.execute(
      { id: 'proj-1', name: 'proj' } as any,
      mockSitePlan,
      async (pageId) => {
        return {
          convergence: createMockConvergence('accepted', 90),
          snapshot: createMockSnapshot('convert')
        };
      }
    );

    expect(orchestratorResult.siteAcceptance.status).toBe('accepted');
    expect(orchestratorResult.siteAcceptance.projectScore).toBe(90);
    expect(Object.keys(orchestratorResult.snapshots).length).toBe(2);
  });

  test('6. MultiPageOrchestrator handles underlying page failures safely without crashing the loop', async () => {
    const orchestratorResult = await MultiPageOrchestrator.execute(
      { id: 'proj-1', name: 'proj' } as any,
      mockSitePlan,
      async (pageId) => {
        if (pageId === 'about') throw new Error('Network error');
        return {
          convergence: createMockConvergence('accepted', 100),
          snapshot: createMockSnapshot('convert')
        };
      }
    );

    expect(orchestratorResult.siteAcceptance.status).toBe('partial');
    expect(orchestratorResult.siteAcceptance.pageResults['about'].status).toBe('unsupported_action');
  });

  test('7. Empty project validates as rejected', () => {
    const result = SiteAcceptanceOrchestrator.evaluate({ pages: [] } as any, {}, {});
    expect(result.status).toBe('unverified');
    expect(result.totalPages).toBe(0);

    const validation = SiteAcceptanceValidator.validate(result);
    expect(validation.valid).toBe(false);
    expect(validation.violations).toContain('EMPTY_PROJECT');
  });
});
