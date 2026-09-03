
import { AutonomousIteration } from '@/config/autonomous';

export function checkConvergence(current: AutonomousIteration, previous?: AutonomousIteration): boolean {
  if (current.decision === 'CONVERGED') return true;
  if (!previous) return false;
  
  // Converge if score is identical and no critical issues exist
  if (current.score.total === previous.score.total && !current.qaObservations.some(o => o.severity === 'critical')) {
    return true;
  }
  return false;
}
