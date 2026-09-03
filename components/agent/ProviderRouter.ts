
import { AIProvider } from '@/config/ai-provider';

export class ProviderRouter {
  constructor(private primary: AIProvider, private fallback: AIProvider) {}
  
  async execute<T>(operation: (provider: AIProvider) => Promise<T>): Promise<T> {
    try {
      return await operation(this.primary);
    } catch (e) { // eslint-disable-line @typescript-eslint/no-unused-vars
      return await operation(this.fallback);
    }
  }
}
