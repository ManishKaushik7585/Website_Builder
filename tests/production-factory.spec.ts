
import { test, expect } from '@playwright/test';

test.describe('Production AI Website Factory (Phase 6H)', () => {
  test('Factory renders and processes brief through to ready state', async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('http://localhost:3000/factory');
    
    // Initial state
    const briefInput = page.getByTestId('brief-input');
    await expect(briefInput).toBeVisible();
    
    // Fill brief
    await briefInput.fill('A premium SaaS website');
    
    // Start generation
    await page.getByTestId('generate-btn').click();
    
    // Verify progress state appears
    await expect(page.getByTestId('progress-view')).toBeVisible();
    
    // Wait for completion
    await expect(page.getByTestId('ready-view')).toBeVisible({ timeout: 80000 });
    
    // Verify success content
    await expect(page.getByText('Project Ready')).toBeVisible();
    await expect(page.getByText('Passed').first()).toBeVisible();
  });
});
