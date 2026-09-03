
import { AIProvider } from '@/config/ai-provider';
import { GenerationOutput } from '@/config/ai-output';
import { validateOutput } from './AIOutputValidator';

import { ConvergenceAction, RegenerationScope } from '../../config/generation-convergence';

export async function runGeneration(
  provider: AIProvider, 
  prompt: string,
  refinements?: ConvergenceAction[],
  scope?: RegenerationScope | null
): Promise<GenerationOutput> {
  let finalPrompt = prompt;
  if (refinements && refinements.length > 0) {
    finalPrompt += `\n\nConvergence Refinement Actions:\n${JSON.stringify(refinements, null, 2)}`;
    finalPrompt += `\nRegeneration Scope: ${scope || 'page'}`;
    finalPrompt += `\n\nApply only the supplied semantic refinement actions. Preserve all upstream intelligence constraints. Do not invent additional architectural changes.`;
  }
  const response = await provider.generateStructured<GenerationOutput>({
    prompt,
    context: {},
    requireStructured: true,
    schema: { default: { planId: 'plan-123', sections: [] } }
  });
  
  if (response.error) throw new Error(response.error.message);
  return validateOutput<GenerationOutput>(response.structuredData, {});
}
