
import { VisualMode, ContentDensity } from './visual-intent';

export interface ArtDirectionRules {
  density: ContentDensity;
  emphasis: 'typography' | 'media' | 'data' | 'interaction';
  motionIntensity: 'low' | 'medium' | 'high';
  composition: 'symmetric' | 'asymmetric' | 'grid';
}

export const artDirectionConfig: Record<VisualMode, ArtDirectionRules> = {
  restrained: { density: 'sparse', emphasis: 'typography', motionIntensity: 'low', composition: 'symmetric' },
  editorial: { density: 'sparse', emphasis: 'typography', motionIntensity: 'low', composition: 'asymmetric' },
  technical: { density: 'balanced', emphasis: 'data', motionIntensity: 'medium', composition: 'grid' },
  luxury: { density: 'sparse', emphasis: 'media', motionIntensity: 'low', composition: 'symmetric' },
  minimal: { density: 'sparse', emphasis: 'typography', motionIntensity: 'low', composition: 'symmetric' },
  expressive: { density: 'balanced', emphasis: 'interaction', motionIntensity: 'high', composition: 'asymmetric' },
  playful: { density: 'balanced', emphasis: 'media', motionIntensity: 'medium', composition: 'asymmetric' },
  immersive: { density: 'balanced', emphasis: 'media', motionIntensity: 'medium', composition: 'grid' }
};
