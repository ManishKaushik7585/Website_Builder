import { test, expect } from '@playwright/test';

test.describe('Native View Transitions Integration', () => {
  test('Standard Link (no view transition) falls back correctly', async ({ page }) => {
    // Navigate to Page A
    await page.goto('/experiment/page-a');
    
    // Validate we are on Page A
    await expect(page.locator('text=This is Page A')).toBeVisible();

    // Click link to Page B
    await page.click('text=Navigate to Page B');
    
    // Ensure routing succeeds
    await expect(page).toHaveURL(/\/experiment\/page-b/);
    await expect(page.locator('text=This is Page B')).toBeVisible();
  });

  test('Enhanced Navigation succeeds when supported', async ({ page }) => {
    await page.goto('/experiment/page-b');
    
    // Click back to A (has enableViewTransition)
    await page.click('text=Back to Page A');
    
    // Check that we safely arrive
    await expect(page).toHaveURL(/\/experiment\/page-a/);
    await expect(page.locator('text=Premium Experience')).toBeVisible();
  });

  test('Rapid navigation gracefully recovers', async ({ page }) => {
    await page.goto('/experiment/page-a');

    // Click twice rapidly to test race condition / lock handling
    await page.evaluate(() => {
      const link = document.querySelector('a[href="/experiment/page-b"]') as HTMLAnchorElement;
      link.click();
      link.click();
    });

    // We must successfully land on Page B without the lock freezing the UI
    await expect(page).toHaveURL(/\/experiment\/page-b/);
    await expect(page.locator('text=Premium Experience (Detailed)')).toBeVisible();
  });

  test('Duplicate transition names fallback to normal navigation', async ({ page }) => {
    // We mock a duplicate view-transition-name on Page A to trigger the catch block
    await page.goto('/experiment/page-a');
    
    await page.evaluate(() => {
      // Force a duplicate view-transition-name
      const el = document.createElement('div');
      el.style.viewTransitionName = 'vt-hero-title-main';
      document.body.appendChild(el);
    });

    // Navigate to Page B
    await page.click('text=Navigate to Page B');
    
    // The transition should fail the capture phase synchronously, 
    // but our hardened fallback guarantees navigation still succeeds.
    await expect(page).toHaveURL(/\/experiment\/page-b/);
    await expect(page.locator('text=This is Page B')).toBeVisible();
  });
});
