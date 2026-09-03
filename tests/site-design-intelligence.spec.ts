
import { test, expect } from '@playwright/test';
import { mapSymptomToCause } from '../components/site-design/SiteDesignDiagnosis';
import { generateRefinement } from '../components/site-design/SiteDesignRefinement';

test.describe('Site Design Intelligence (Phase 7B)', () => {
  test('Typography drift is diagnosed correctly', () => {
    const cause = mapSymptomToCause('different typography');
    expect(cause).toBe('TYPOGRAPHY_SYSTEM_BREAKDOWN');
  });

  test('Typography breakdown generates semantic refinement', () => {
    const refinement = generateRefinement('TYPOGRAPHY_SYSTEM_BREAKDOWN');
    expect(refinement).toBe('alignTypographyRole');
  });

  test('Anti-slop detection prevents raw CSS', () => {
    const refinement = generateRefinement('TYPOGRAPHY_SYSTEM_BREAKDOWN');
    expect(refinement).not.toContain('style=');
  });
});
