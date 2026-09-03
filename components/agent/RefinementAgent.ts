
import { AIProvider } from '@/config/ai-provider';
import { RefinementOutput } from '@/config/ai-output';

export async function requestRefinements(provider: AIProvider, diagnosis: any): Promise<RefinementOutput> { // eslint-disable-line @typescript-eslint/no-explicit-any
  const response = await provider.generateStructured<RefinementOutput>({
    prompt: 'Propose refinements for diagnosis',
    context: diagnosis,
    requireStructured: true,
    schema: { default: { refinements: [] } }
  });
  return response.structuredData as RefinementOutput;
}
