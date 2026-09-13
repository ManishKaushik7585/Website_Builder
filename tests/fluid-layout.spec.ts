import { test, expect } from '@playwright/test';
import { resolveIntent, ResolvedLayoutIntent } from '../lib/intent-resolver';
import { CreativeDirectionContract } from '../config/creative-direction';

test.describe('Fluid Typography + Layout Intent Resolution', () => {
  const mockCreativeDirection: CreativeDirectionContract = {
    id: 'test',
    version: '1',
    projectId: '1',
    status: 'draft',
    visualIdentity: { personality: [], emotionalTone: [], aestheticDirection: '', visualLanguage: [], differentiation: '' },
    artDirection: { direction: '', composition: [], visualDevices: [], density: 'balanced', focalPointStrategy: '' },
    typography: { 
      displayDirection: '', bodyDirection: '', hierarchy: '', scaleStrategy: '', weightStrategy: '', readabilityPriority: '',
      fluidityPreference: 'fluid',
      displayScale: 'large',
      maxLineLength: 'optimal'
    },
    color: { strategy: '', primaryRole: '', accentRole: '', neutralStrategy: '', contrastStrategy: '' },
    layout: {
      philosophy: '', gridStrategy: '', spacingStrategy: '', sectionRhythm: '', whitespaceStrategy: '',
      compositionIntent: 'asymmetric-split',
      heroBalance: 'visual-dominant',
      responsiveTransformation: 'preserve-split'
    },
    components: { personality: '', shapeLanguage: '', surfaceTreatment: '', borderStrategy: '', depthStrategy: '' },
    interaction: { philosophy: '', feedbackIntensity: '', interactionPatterns: [] },
    motion: { philosophy: '', intensity: '', transitionStrategy: '', entranceStrategy: '', interactionMotion: '' },
    imagery: { strategy: '' },
    threeD: { recommended: false },
    responsive: { philosophy: '', mobilePriority: '', layoutAdaptation: '' },
    accessibility: { priorities: [], risks: [] },
    pageRoles: [],
    references: [],
    antiPatterns: [],
    constraints: [],
    decisionTrace: [],
    selectedDirection: '',
    rationale: { summary: '', keyDrivers: [], evidenceIds: [] },
    confidence: { overall: 1, visualIdentity: 1, typography: 1, color: 1, layout: 1, motion: 1, imagery: 1, responsive: 1, evidenceCount: 1, uncertaintyReasons: [] },
    researchGaps: [],
    provenance: { sourceId: 'test', sourceType: 'system_default' },
    createdAt: '',
    updatedAt: ''
  };

  test('Deterministic resolution hierarchy', () => {
    // Should resolve CreativeDirection natively
    let intent = resolveIntent(mockCreativeDirection);
    expect(intent.layout.composition).toBe('asymmetric-split');
    expect(intent.layout.heroBalance).toBe('visual-dominant');
    expect(intent.typography.displayScale).toBe('large');

    // Should be overridden by Page Role
    const pageRole: any = {
      layoutIntent: { layoutType: 'asymmetric', compositionIntent: 'asymmetric-split' },
    };
    intent = resolveIntent(mockCreativeDirection, pageRole);
    expect(intent.layout.composition).toBe('asymmetric-split');
    // Non-overridden values fall through
    expect(intent.layout.heroBalance).toBe('visual-dominant');

    // Should be overridden by explicit component override
    const explicit: Partial<ResolvedLayoutIntent> = { composition: 'centered' };
    intent = resolveIntent(mockCreativeDirection, pageRole, explicit);
    expect(intent.layout.composition).toBe('centered');
  });
});

test.describe('Typography Fluid Constraints Validation', () => {
  // Since we test CSS mathematically, Playwright allows us to load a page and check computed styles
  test('Fluid typography clamps correctly without breaking layout', async ({ page }) => {
    await page.goto('/experiment/page-a');
    
    // Inject a display element directly utilizing our globals.css variable
    await page.evaluate(() => {
      const el = document.createElement('h1');
      el.id = 'fluid-test';
      el.className = 'text-fluid-display font-bold';
      el.innerText = 'Fluid Scaling Test';
      document.body.prepend(el);
    });

    // 1. Mobile viewport test (320px)
    await page.setViewportSize({ width: 320, height: 600 });
    let size = await page.evaluate(() => {
      return window.getComputedStyle(document.getElementById('fluid-test')!).fontSize;
    });
    // clamp(40px) expectation: should be 40px since 4vw (12.8) + 16 = 28.8 < 40
    expect(parseFloat(size)).toBeCloseTo(40, 0);

    // 2. Tablet viewport test (768px)
    await page.setViewportSize({ width: 768, height: 1024 });
    size = await page.evaluate(() => {
      return window.getComputedStyle(document.getElementById('fluid-test')!).fontSize;
    });
    // 4vw of 768 = 30.72px + 16px = 46.72px
    expect(parseFloat(size)).toBeCloseTo(46.72, 1);

    // 3. Desktop viewport test (1440px)
    await page.setViewportSize({ width: 1440, height: 900 });
    size = await page.evaluate(() => {
      return window.getComputedStyle(document.getElementById('fluid-test')!).fontSize;
    });
    // 4vw of 1440 = 57.6px + 16px = 73.6px. Bounded by 4.5rem (72px).
    expect(parseFloat(size)).toBeCloseTo(72, 0);

    // 4. Large Desktop viewport test (1920px)
    await page.setViewportSize({ width: 1920, height: 1080 });
    size = await page.evaluate(() => {
      return window.getComputedStyle(document.getElementById('fluid-test')!).fontSize;
    });
    // 4vw of 1920 = 76.8px + 16px = 92.8px. Must remain bounded by 4.5rem (72px).
    expect(parseFloat(size)).toBeCloseTo(72, 0);
  });
});
