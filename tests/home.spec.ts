import { test, expect } from '@playwright/test';

test.describe('Phase 5A Production Homepage Validation', () => {
  
  test('Homepage loads and renders critical sections', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/Premium Website Engine/);

    // Verify header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verify main landmarks
    const main = page.locator('main#main-content');
    await expect(main).toBeVisible();

    // Verify Hero content
    await expect(page.getByText('Engineered for AI. Designed for Humans.')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore the System' })).toBeVisible();

    // Verify Features section
    await expect(page.getByText('A System of Systems')).toBeVisible();

    // Verify Footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('Homepage maintains semantic heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Ensure there is exactly one H1
    const h1s = page.locator('h1');
    await expect(h1s).toHaveCount(1);
    await expect(h1s).toHaveText('Engineered for AI. Designed for Humans.');
  });

  test('Homepage visual screenshot capture (Desktop)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    
    // Allow any motion to settle
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'test-results/screenshots/home-desktop.png', fullPage: true });
  });

  test('Homepage visual screenshot capture (Mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'test-results/screenshots/home-mobile.png', fullPage: true });
  });

});
