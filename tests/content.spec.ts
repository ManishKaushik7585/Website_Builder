
import { test, expect } from '@playwright/test';

test.describe('Content Intelligence Verification (Phase 5D)', () => {
  test('Content Intelligence Lab renders successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('Content Intelligence Lab (Phase 5D)')).toBeVisible();
    await expect(page.getByText('Tone Modes & Density')).toBeVisible();
    await expect(page.getByText('Anti-Slop Guidelines (Specificity > Hype)')).toBeVisible();
    await expect(page.getByText('APPROVED (SPECIFICITY)')).toBeVisible();
  });
});
