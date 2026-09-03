
import { VisionInput } from '@/config/vision';
import { VisionProvider } from '@/config/vision-provider';
import { diagnoseVisionObservation } from './VisionDiagnosis';
import { generateSemanticRefinement } from './VisionRefinement';
import { critiqueVisionObservations } from './VisionSelfCritique';

export async function runVisionIteration(input: VisionInput, provider: VisionProvider) {
  const analysis = await provider.analyze(input);
  
  const validObservations = critiqueVisionObservations(analysis.observations);
  const diagnoses = validObservations.map(diagnoseVisionObservation);
  const refinements = diagnoses.map(generateSemanticRefinement);

  let status: 'PASS' | 'CONDITIONAL' | 'REJECT' = 'PASS';
  const hasCritical = validObservations.some(o => o.severity === 'critical');
  const hasMajor = validObservations.some(o => o.severity === 'major');
  
  if (hasCritical) status = 'REJECT';
  else if (hasMajor) status = 'CONDITIONAL';

  return {
    analysis: { ...analysis, observations: validObservations },
    diagnoses,
    refinements,
    status
  };
}
