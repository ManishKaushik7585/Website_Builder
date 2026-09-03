
import { QADiagnosis, QARefinement } from '@/config/qa';

export function generateSemanticRefinement(diagnosis: QADiagnosis): QARefinement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target: 'pattern' | 'content' | 'typography' | 'asset' | 'component' | 'section' | 'page' = (diagnosis.recommendedLayer as any) || 'pattern';
  let desiredState = 'adjusted';

  if (diagnosis.cause === 'WEAK_VISUAL_HIERARCHY') {
    desiredState = 'strengthenHeroHierarchy';
  } else if (diagnosis.cause === 'CONTENT_DENSITY_MISMATCH') {
    desiredState = 'reduceFeatureContentDensity';
  }

  return {
    target,
    currentState: 'unknown',
    desiredState,
    reason: `Fixing ${diagnosis.cause}`,
    sourceIssue: diagnosis.observationId
  };
}
