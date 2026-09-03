
import { test, expect } from '@playwright/test';
import { MockAIProvider } from '../components/agent/providers/MockAIProvider';

import { ProviderRouter } from '../components/agent/ProviderRouter';
import { validateOutput } from '../components/agent/AIOutputValidator';
import { withRetry } from '../components/agent/RetryController';

test.describe('AI Agent Runtime (Phase 6F)', () => {
  test('Agent Runtime Lab renders scenarios successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('AI Agent Runtime Lab (Phase 6F)')).toBeVisible();
    await expect(page.getByText('Scenario B — Invalid AI Output')).toBeVisible();
  });

  test('MockAIProvider returns valid structured output', async () => {
    const provider = new MockAIProvider();
    const result = await provider.generateStructured({ prompt: 'test', context: {}, requireStructured: true, schema: { default: { valid: true } } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result.structuredData as any).valid).toBe(true);
  });

  test('AIOutputValidator rejects malicious JSX/CSS', () => {
    expect(() => validateOutput({ unauthorizedJSX: '<div/>' }, {})).toThrow('AI_SECURITY_REJECTION: JSX output detected');
    expect(() => validateOutput({ unauthorizedCSS: 'body { margin: 0 }' }, {})).toThrow('AI_SECURITY_REJECTION: CSS block detected');
  });

  test('ProviderRouter falls back gracefully on failure', async () => {
    const primary = new MockAIProvider();
    const fallback = new MockAIProvider();
    primary.generateStructured = async () => { throw new Error('Primary failed'); };
    
    const router = new ProviderRouter(primary, fallback);
    const result = await router.execute(async (p) => {
      const r = await p.generateStructured({ prompt: 'test', context: {}, requireStructured: true });
      return r.id;
    });
    
    expect(result).toContain('mock-struct-');
  });

  test('RetryController bounds retries safely', async () => {
    let attempts = 0;
    await expect(withRetry(async () => {
      attempts++;
      throw new Error('Fail');
    }, 3)).rejects.toThrow('Fail');
    expect(attempts).toBe(3);
  });
});
