
export interface AIEnvironment {
  provider: string;
  model: string;
  apiKey: string;
  baseUrl: string;
  maxOutputTokens: number;
  timeoutMs: number;
}

export function getAIEnvironment(): AIEnvironment {
  // Safe environment accessor that does not expose secrets to client
  return {
    provider: process.env.AI_PROVIDER || 'mock',
    model: process.env.AI_MODEL || 'mock-model',
    apiKey: process.env.AI_API_KEY || '',
    baseUrl: process.env.AI_BASE_URL || 'https://api.mock.internal',
    maxOutputTokens: parseInt(process.env.AI_MAX_OUTPUT_TOKENS || '4096', 10),
    timeoutMs: parseInt(process.env.AI_TIMEOUT_MS || '30000', 10)
  };
}

export function hasValidLiveCredentials(): boolean {
  const env = getAIEnvironment();
  return env.provider !== 'mock' && env.apiKey.length > 0;
}
