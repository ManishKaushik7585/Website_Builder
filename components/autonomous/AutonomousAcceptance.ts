
import { AutonomousIteration } from '@/config/autonomous';

export function evaluateAcceptance(iteration: AutonomousIteration): AutonomousIteration {
  let decision: AutonomousIteration['decision'] = 'PASS';
  const hasCritical = iteration.qaObservations.some(o => o.severity === 'critical');
  const hasMajor = iteration.qaObservations.some(o => o.severity === 'major');
  
  if (hasCritical) decision = 'REJECT';
  else if (hasMajor) decision = 'CONDITIONAL';
  else if (iteration.qaObservations.length === 0) decision = 'CONVERGED';

  return { ...iteration, decision };
}
