
import { QAObservation } from '@/config/qa';

export function prioritizeObservations(observations: QAObservation[]): QAObservation[] {
  // Sort by severity: critical -> major -> moderate -> minor
  const severityWeight: Record<string, number> = { critical: 4, major: 3, moderate: 2, minor: 1, info: 0 };
  
  return [...observations].sort((a, b) => {
    return (severityWeight[b.severity] || 0) - (severityWeight[a.severity] || 0);
  });
}
