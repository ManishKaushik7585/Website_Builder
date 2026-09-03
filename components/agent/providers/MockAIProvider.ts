
import { AIProvider, AIProviderCapabilities, AIRequest, AIResponse } from '@/config/ai-provider';

export class MockAIProvider implements AIProvider {
  id = 'mock-provider';
  capabilities: AIProviderCapabilities = {
    text: true,
    vision: true,
    structuredOutput: true,
    maxTokens: 8192
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generate(request: AIRequest): Promise<AIResponse> {
    return {
      id: 'mock-resp-' + Date.now(),
      timestamp: new Date().toISOString(),
      usage: { promptTokens: 10, completionTokens: 10, totalTokens: 20 },
      content: 'Mock text response'
    };
  }

  async generateStructured<T>(request: AIRequest): Promise<AIResponse<T>> {
    // If request implies failure for tests
    if (request.prompt.includes('fail')) {
      return {
        id: 'mock-fail',
        timestamp: new Date().toISOString(),
        usage: { promptTokens: 10, completionTokens: 0, totalTokens: 10 },
        content: '',
        error: { code: 'MOCK_ERR', message: 'Mock Error', recoverable: true }
      };
    }

    return {
      id: 'mock-struct-' + Date.now(),
      timestamp: new Date().toISOString(),
      usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
      content: '',
      structuredData: (request.schema ? request.schema.default : {}) as T
    };
  }
}
