
import { AIProvider } from '@/config/ai-provider';
import { QAOutput } from '@/config/ai-output';

export async function runQADiagnosis(provider: AIProvider, observations: any[]): Promise<QAOutput> { // eslint-disable-line @typescript-eslint/no-explicit-any
  const response = await provider.generateStructured<QAOutput>({
    prompt: 'Diagnose observations',
    context: observations,
    requireStructured: true,
    schema: { default: { observations: [] } }
  });
  return response.structuredData as QAOutput;
}
