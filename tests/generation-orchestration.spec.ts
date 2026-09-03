
import { test, expect } from '@playwright/test';

test.describe('AI Generation Orchestration (Phase 6A)', () => {
  test('Generation Lab renders scenarios successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('AI Generation Lab (Phase 6A)')).toBeVisible();
    await expect(page.getByText('Example A — Technical SaaS')).toBeVisible();
    await expect(page.getByText('Example B — Editorial Brand')).toBeVisible();
    await expect(page.getByText('Example C — Consumer Brand')).toBeVisible();
    
    // Check validation failure renders correctly
    await expect(page.getByText('Generation Failed')).toBeVisible();
    await expect(page.getByText('Missing primary objective')).toBeVisible();
    await expect(page.getByText('Missing hero/sections')).toBeVisible();
  });
});
