
import { QAObservation, QADiagnosis } from '@/config/qa';
import { classifyObservation } from '@/registry/qa-classifiers';

export function diagnoseObservations(observations: QAObservation[]): QADiagnosis[] {
  return observations.map(classifyObservation);
}
