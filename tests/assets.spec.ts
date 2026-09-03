
import { test, expect } from '@playwright/test';

test.describe('Asset Intelligence Verification (Phase 5C)', () => {
  test('Asset Intelligence Lab renders successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('Asset Intelligence Lab (Phase 5C)')).toBeVisible();
    await expect(page.getByText('Media Slot with Registered Asset')).toBeVisible();
    await expect(page.getByText('Unknown Asset Fallback')).toBeVisible();
    await expect(page.getByText('Unknown asset should not crash the page.')).toBeVisible();
  });
});
