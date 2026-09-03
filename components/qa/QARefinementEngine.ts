
import { QADiagnosis, QARefinement } from '@/config/qa';

export function generateRefinement(diagnoses: QADiagnosis[]): QARefinement[] {
  return diagnoses.map(d => {
    return {
      target: d.recommendedLayer,
      currentState: 'unknown',
      desiredState: 'refined',
      reason: `Fixing ${d.cause}`,
      sourceIssue: d.observationId
    };
  });
}
