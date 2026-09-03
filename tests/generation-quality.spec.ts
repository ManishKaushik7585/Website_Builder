/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect } from '@playwright/test';
import { GenerationQualityValidator } from '../registry/generation-quality-validator';
import { GenerationQualityDiagnosis } from '../components/generation-quality/GenerationQualityDiagnosis';
import { GenerationQualityRefinement } from '../components/generation-quality/GenerationQualityRefinement';
import { GenerationQualitySelfCritique } from '../components/generation-quality/GenerationQualitySelfCritique';
import { GenerationAcceptance } from '../components/generation-quality/GenerationAcceptance';
import { GenerationQualityOrchestrator } from '../components/generation-quality/GenerationQualityOrchestrator';

test.describe('Phase 7G: Generation Quality & Intelligent Acceptance', () => {

  const createBaseMocks = () => {
    return {
      project: { id: 'proj1', name: 'proj1' } as any,
      page: { id: 'page1', path: '/', role: 'home' } as any,
      sitePlan: { navigation: {} } as any,
      content: { sections: [{ purpose: 'hero', isOptional: false }] } as any,
      generation: { sections: [{ section: 'hero' }] } as any,
      snapshot: { status: 'current' } as any,
      qa: { diagnostics: [] as any[] },
      vision: { diagnostics: [] as any[] }
    };
  };

  test('1. Valid generation is accepted', () => {
    const mocks = createBaseMocks();
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, mocks.sitePlan, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    const acceptance = GenerationAcceptance.evaluate(result.gates);
    expect(acceptance.status).toBe('accepted');
  });

  test('2. Missing required section blocks acceptance', () => {
    const mocks = createBaseMocks();
    mocks.generation.sections = []; // removed hero
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, mocks.sitePlan, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    const acceptance = GenerationAcceptance.evaluate(result.gates);
    expect(acceptance.status).toBe('blocked');
    expect(result.violations.some(v => v.code === 'REQUIRED_SECTION_MISSING')).toBe(true);
  });

  test('3. Content-plan violation is detected', () => {
    const mocks = createBaseMocks();
    mocks.generation = undefined;
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    expect(result.violations.some(v => v.code === 'GENERATION_EVIDENCE_MISSING' && v.dimension === 'content')).toBe(true);
  });

  test('4. Responsive-plan violation is detected', () => {
    const mocks = createBaseMocks();
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, undefined, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    expect(result.violations.some(v => v.dimension === 'responsive' && v.code === 'GENERATION_EVIDENCE_MISSING')).toBe(true);
  });

  test('5. Interaction-plan violation is detected', () => {
    const mocks = createBaseMocks();
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, undefined, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    expect(result.violations.some(v => v.dimension === 'interaction' && v.code === 'GENERATION_EVIDENCE_MISSING')).toBe(true);
  });

  test('6. Missing accessibility evidence produces the correct result', () => {
    const mocks = createBaseMocks();
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, undefined, mocks.vision
    );
    const acceptance = GenerationAcceptance.evaluate(result.gates);
    expect(acceptance.status).toBe('unverified'); // Not accepted
  });

  test('7. Invalid navigation blocks acceptance', () => {
    const mocks = createBaseMocks();
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    // Because sitePlan was undefined
    expect(result.violations.some(v => v.code === 'NAVIGATION_REQUIREMENT_UNSATISFIED')).toBe(true);
  });

  test('8. Critical unresolved observation blocks acceptance', () => {
    const mocks = createBaseMocks();
    mocks.qa = { diagnostics: [{ severity: 'error', message: 'Broken link' }] };
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    const acceptance = GenerationAcceptance.evaluate(result.gates);
    expect(acceptance.status).toBe('blocked');
    expect(result.violations.some(v => v.code === 'CRITICAL_OBSERVATION_UNRESOLVED')).toBe(true);
  });

  test('9. Missing Vision data is handled correctly', () => {
    const mocks = createBaseMocks();
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, undefined
    );
    const acceptance = GenerationAcceptance.evaluate(result.gates);
    expect(acceptance.status).toBe('unverified');
    expect(result.violations.some(v => v.dimension === 'design' && v.code === 'UNVERIFIED_EVIDENCE')).toBe(true);
  });

  test('10. Missing QA data is handled correctly', () => {
    const mocks = createBaseMocks();
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, undefined, mocks.vision
    );
    const acceptance = GenerationAcceptance.evaluate(result.gates);
    expect(acceptance.status).toBe('unverified');
  });

  test('11. Contradictory quality states are detected', () => {
    const mocks = createBaseMocks();
    mocks.snapshot.status = 'failed';
    const result = GenerationQualityValidator.validateQuality(
      mocks.project, mocks.page, undefined, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    expect(result.violations.some(v => v.code === 'CONTRADICTORY_GENERATION_STATE')).toBe(true);
  });

  test('12. Quality diagnosis is generated correctly', () => {
    const v = { dimension: 'content', code: 'CONTENT_PLAN_UNSATISFIED', message: 'Missing something', severity: 'high' } as any;
    const diag = GenerationQualityDiagnosis.diagnose([v]);
    expect(diag[0].message).toContain('CONTENT_GENERATION_DRIFT');
  });

  test('13. Semantic refinement is generated correctly', () => {
    const v = { dimension: 'content', code: 'REQUIRED_SECTION_MISSING', message: 'REQUIRED_SECTION_MISSING', severity: 'high' } as any;
    const diag = GenerationQualityDiagnosis.diagnose([v]);
    const refs = GenerationQualityRefinement.refine(diag);
    expect(refs[0].action).toBe('addRequiredSection');
  });

  test('14. Vague self-critique is rejected', () => {
    const ev = [{ source: 'vision', isVerified: true }] as any;
    const res = GenerationQualitySelfCritique.critique(['looks good', 'Hero section exists'], ev);
    expect(res).not.toContain('looks good');
    expect(res).toContain('Hero section exists');
  });

  test('15. Acceptance gates produce the correct final status', async () => {
    const mocks = createBaseMocks();
    const result = await GenerationQualityOrchestrator.evaluate(
      mocks.project, mocks.page, { navigation: {} } as any, undefined, mocks.content, {} as any, {} as any, mocks.generation, mocks.snapshot, mocks.qa, mocks.vision
    );
    expect(result.acceptance.status).toBe('accepted');
  });
});
