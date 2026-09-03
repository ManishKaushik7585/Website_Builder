
import { VisionInput, VisionAnalysis } from './vision';

export interface VisionProvider {
  analyze(input: VisionInput): Promise<VisionAnalysis>;
}
