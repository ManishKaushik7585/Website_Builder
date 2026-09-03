
import { test, expect } from '@playwright/test';
import { getAIEnvironment, hasValidLiveCredentials } from '../config/ai-environment';
import { LiveAIProvider } from '../components/agent/providers/LiveAIProvider';
import { validateOutput } from '../components/agent/AIOutputValidator';

test.describe('Live AI Agent Execution (Phase 6G)', () => {
  test('Environment accessor falls back to mock safely', () => {
    const env = getAIEnvironment();
    expect(env.provider).toBeDefined();
    // Default in tests without explicit process.env set
    expect(hasValidLiveCredentials()).toBe(false);
  });

  test('LiveAIProvider rejects operation when missing credentials', async () => {
    const provider = new LiveAIProvider();
    await expect(provider.generate({ prompt: 'test', context: {}, requireStructured: false }))
      .rejects.toThrow('AI_AUTH_ERROR: Missing credentials');
  });

  test('AIOutputValidator rejects malicious inputs', () => {
    expect(() => validateOutput({ code: '<div className="text-red"></div>' }, {}))
      .toThrow('AI_SECURITY_REJECTION: JSX output detected');
    
    expect(() => validateOutput({ style: 'margin: 0;' }, {}))
      .toThrow('AI_SECURITY_REJECTION: CSS block detected');
      
    expect(() => validateOutput({ script: 'npm install evil-package' }, {}))
      .toThrow('AI_SECURITY_REJECTION: Shell command detected');
  });
});
