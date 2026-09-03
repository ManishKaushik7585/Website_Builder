
import { QAObservation } from '@/config/qa';
import { diagnoseObservations } from './QADiagnosis';

export function critiqueIteration(observations: QAObservation[]) {
  const diagnoses = diagnoseObservations(observations);
  const isValid = !observations.some(o => o.severity === 'critical' || o.severity === 'major');
  return { diagnoses, isValid };
}
