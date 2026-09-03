
import { VisionProvider } from '@/config/vision-provider';
import { VisionInput, VisionAnalysis } from '@/config/vision';

export class MockVisionProvider implements VisionProvider {
  async analyze(input: VisionInput): Promise<VisionAnalysis> {
    const observations = [];
    if (input.generationPlan?.visualIntent?.mode === 'minimal' && input.screenshot.width < 1000) {
       observations.push({
         id: 'mock-1',
         category: 'hierarchy' as const,
         severity: 'major' as const,
         description: 'Weak focal hierarchy in mobile layout',
         target: { elementId: 'hero' },
         evidence: [{ type: 'visual' as const, description: 'CTA blends with background' }],
         confidence: 'high' as const
       });
    }
    return {
      observations,
      confidence: 'high',
      timestamp: new Date().toISOString()
    };
  }
}
