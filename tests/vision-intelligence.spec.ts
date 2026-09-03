
import { test, expect } from '@playwright/test';
import { runVisionIteration } from '../components/vision/VisionIteration';
import { MockVisionProvider } from '../components/vision/MockVisionProvider';
import { fuseVisionAndBrowser } from '../components/vision/VisionBrowserFusion';
import { critiqueVisionObservations } from '../components/vision/VisionSelfCritique';

test.describe('AI Vision Intelligence (Phase 6D)', () => {
  test('Vision Intelligence Lab renders scenarios successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('AI Vision Intelligence Lab (Phase 6D)')).toBeVisible();
    await expect(page.getByText('Scenario B — Weak Hero Hierarchy').first()).toBeVisible();
    await expect(page.getByText('Scenario E — Visual Slop').first()).toBeVisible();
  });

  test('Mock Vision Provider analyzes and runs iteration', async () => {
    const provider = new MockVisionProvider();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const input: any = {
      screenshot: { width: 375, height: 812, device: 'mobile', source: 'test' },
      viewport: { width: 375, height: 812 },
      generationPlan: { visualIntent: { mode: 'minimal' } }
    };
    
    const { diagnoses, refinements, status } = await runVisionIteration(input, provider);
    
    expect(status).toBe('CONDITIONAL');
    expect(diagnoses[0].cause).toBe('WEAK_VISUAL_HIERARCHY');
    expect(refinements[0].desiredState).toBe('strengthenHeroHierarchy');
  });

  test('Browser and Vision Fusion', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const input: any = {
      browserSnapshot: {
        observations: [{ category: 'overflow', severity: 'critical', description: 'Overflow', elementId: 'doc' }]
      }
    };
    
    const fused = fuseVisionAndBrowser(input);
    expect(fused.length).toBeGreaterThan(0);
    expect(fused[0]!.fusedDiagnosis).toBe('RESPONSIVE_LAYOUT_BREAKDOWN');
  });

  test('Vision Self Critique filters out slop', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const observations: any[] = [
      { id: '1', description: 'Make it pop', category: 'slop' },
      { id: '2', description: 'Add a gradient', category: 'slop' },
      { id: '3', description: 'Hierarchy is weak', category: 'hierarchy' }
    ];
    
    const valid = critiqueVisionObservations(observations);
    expect(valid.length).toBe(1);
    expect(valid[0].id).toBe('3');
  });
});
