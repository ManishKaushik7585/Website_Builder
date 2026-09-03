
import { AIProvider } from '@/config/ai-provider';
import { VisionOutput } from '@/config/ai-output';

export async function runVisionAnalysis(provider: AIProvider, image: string): Promise<VisionOutput> {
  const response = await provider.generateStructured<VisionOutput>({
    prompt: 'Analyze image: ' + image,
    context: {},
    requireStructured: true,
    schema: { default: { issues: [] } }
  });
  return response.structuredData as VisionOutput;
}
