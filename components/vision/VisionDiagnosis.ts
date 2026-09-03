
import { VisionObservation } from '@/config/vision';
import { QADiagnosis } from '@/config/qa';

export function diagnoseVisionObservation(obs: VisionObservation): QADiagnosis {
  let cause: string = 'UNKNOWN';
  let recommendedLayer: 'pattern' | 'content' | 'typography' | 'asset' | 'component' | 'section' | 'page' = 'pattern';

  switch (obs.category) {
    case 'hierarchy':
      cause = 'WEAK_VISUAL_HIERARCHY';
      break;
    case 'density':
      cause = 'CONTENT_DENSITY_MISMATCH';
      recommendedLayer = 'content';
      break;
    case 'typography':
      cause = 'TYPOGRAPHY_HIERARCHY_BREAKDOWN';
      recommendedLayer = 'typography';
      break;
    case 'media':
      cause = 'MEDIA_COMPOSITION_BREAKDOWN';
      recommendedLayer = 'asset';
      break;
    case 'rhythm':
      cause = 'SECTION_RHYTHM_BREAKDOWN';
      break;
    case 'responsive':
      cause = 'RESPONSIVE_LAYOUT_BREAKDOWN';
      break;
    case 'slop':
      cause = 'VISION_SLOP';
      recommendedLayer = 'pattern';
      break;
  }

  return {
    observationId: obs.id,
    cause,
    impact: obs.severity === 'critical' ? 'High' : obs.severity === 'major' ? 'Medium' : 'Low',
    recommendedLayer
  };
}
