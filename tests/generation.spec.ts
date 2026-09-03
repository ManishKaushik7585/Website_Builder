
import { test, expect } from '@playwright/test';
import { validateGenerationPlan } from '../registry/generation-rules';

test.describe('Full System Generation (Phase 5E)', () => {
  test('Generation Lab renders scenarios successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('Full System Generation Lab (Phase 5E)')).toBeVisible();
    await expect(page.getByText('Scenario A: Technical SaaS Landing Page')).toBeVisible();
    await expect(page.getByText('Scenario E: Creative/Expressive Campaign')).toBeVisible();
  });

  test('Generation validation logic', () => {
    const validPlan = {
      brief: { objective: 'inform', audience: 'devs' },
      objective: 'inform',
      template: 'landing',
      sections: []
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const warnings = validateGenerationPlan(validPlan as any);
    expect(warnings.length).toBe(0);

    const invalidPlan = {
      brief: { objective: 'inform', audience: 'devs' },
      objective: 'inform',
      template: 'landing',
      visualIntent: { mode: 'minimal' as const },
      contentIntent: { density: 'dense' as const },
      sections: []
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const warnings2 = validateGenerationPlan(invalidPlan as any);
    expect(warnings2).toContain('Alignment Warning: Minimal visual mode paired with dense content.');
  });
});
