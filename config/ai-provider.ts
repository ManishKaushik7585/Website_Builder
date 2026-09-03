
export interface AIProviderCapabilities {
  text: boolean;
  vision: boolean;
  structuredOutput: boolean;
  maxTokens: number;
}

export interface AIRequest {
  prompt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any; // Using any for brevity, typically serializable agent context // eslint-disable-line @typescript-eslint/no-explicit-any
  requireStructured: boolean;
  schema?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AIUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface AIError {
  code: string;
  message: string;
  recoverable: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AIResponse<T = any> {
  id: string;
  timestamp: string;
  usage: AIUsage;
  content: string;
  structuredData?: T;
  error?: AIError;
}

export interface AIProvider {
  id: string;
  capabilities: AIProviderCapabilities;
  generate(request: AIRequest): Promise<AIResponse>;
  generateStructured<T>(request: AIRequest): Promise<AIResponse<T>>;
}
