
import { test, expect } from '@playwright/test';
import { runIteration } from '../components/qa/QAIteration';

test.describe('QA Intelligence (Phase 6B)', () => {
  test('QA Lab renders scenarios successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('AI Visual QA Lab (Phase 6B)')).toBeVisible();
    await expect(page.getByText('Scenario A — Healthy Page').first()).toBeVisible();
    await expect(page.getByText('Scenario B — Dense Page').first()).toBeVisible();
    await expect(page.getByText('Scenario E — Motion Slop').first()).toBeVisible();
  });

  test('QA Iteration Loop', () => {
    const invalidPlan = {
      brief: { objective: 'inform', audience: 'devs', projectName: 'Test', description: '' },
      objective: 'inform',
      visualIntent: { mode: 'minimal' },
      contentIntent: { density: 'dense' },
      sections: []
    };
    

    const { status, observations } = runIteration(invalidPlan);
    expect(observations.length).toBeGreaterThan(0);
    expect(status).toBe('CONDITIONAL');
  });
});
