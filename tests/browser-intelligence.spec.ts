
import { test, expect } from '@playwright/test';
import { runBrowserRefinementLoop } from '../components/browser/BrowserRefinementLoop';
import { inspectDocument } from '../components/browser/BrowserInspector';
import { compareViewports } from '../components/browser/ResponsiveComparison';

test.describe('Browser Visual Intelligence (Phase 6C)', () => {
  test('Browser Intelligence Lab renders scenarios successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('Browser Visual Intelligence Lab (Phase 6C)')).toBeVisible();
    await expect(page.getByText('Scenario B — Horizontal Overflow')).toBeVisible();
    await expect(page.getByText('Scenario C — Excessive Typography')).toBeVisible();
  });

  test('Browser Inspector detects overflow', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const snapshot: any = {
      viewport: { width: 375, height: 812 },
      elements: [
        { id: 'hero', isOverflowingHorizontal: true, scrollWidth: 400, clientWidth: 375, bounds: {} }
      ],
      observations: []
    };
    
    const obs = inspectDocument(snapshot);
    expect(obs.some(o => o.category === 'overflow')).toBeTruthy();
  });

  test('Responsive Comparison detects breakpoint differences', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inspection: any = {
      snapshots: {
        '1440': { elements: [{ isOverflowingHorizontal: false }] },
        '375': { elements: [{ isOverflowingHorizontal: true }] }
      }
    };
    
    const obs = compareViewports(inspection);
    expect(obs.some(o => o.category === 'responsive')).toBeTruthy();
  });

  test('Browser Refinement Loop bridges to QA and diagnoses correctly', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plan: any = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const snapshot: any = {
      observations: [
        { category: 'overflow', severity: 'critical', description: 'Overflow detected', elementId: 'doc' }
      ]
    };
    
    const { qaObservations, diagnoses, refinements } = runBrowserRefinementLoop(plan, snapshot);
    expect(qaObservations[0].category).toBe('responsive');
    expect(diagnoses[0].cause).toBe('RESPONSIVE_LAYOUT_BREAKDOWN');
    expect(refinements[0].target).toBe('pattern');
  });
});
