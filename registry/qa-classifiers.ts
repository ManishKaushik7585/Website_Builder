
import { QAObservation, QADiagnosis } from '@/config/qa';

export function classifyObservation(obs: QAObservation): QADiagnosis {
  let cause = 'UNKNOWN';
  let recommendedLayer = 'component';
  
  if (obs.category === 'density') {
    cause = 'CONTENT_DENSITY';
    recommendedLayer = 'content';
  } else if (obs.category === 'structure') {
    cause = 'SECTION_OVERLOAD';
    recommendedLayer = 'section';
  } else if (obs.category === 'responsive') {
    cause = 'RESPONSIVE_LAYOUT_BREAKDOWN';
    recommendedLayer = 'pattern';
  } else if (obs.category === 'typography') {
    cause = 'TYPOGRAPHY_HIERARCHY';
    recommendedLayer = 'typography';
  } else if (obs.category === 'motion') {
    cause = 'MOTION_SLOP';
    recommendedLayer = 'motion';
  }

  return {
    observationId: obs.id,
    cause,
    impact: obs.severity === 'critical' ? 'High' : 'Medium',
    recommendedLayer
  };
}
