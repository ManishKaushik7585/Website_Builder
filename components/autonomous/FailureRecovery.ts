
import { AutonomousIteration, IterationFailure } from '@/config/autonomous';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleFailure(iteration: AutonomousIteration, failure: IterationFailure): AutonomousIteration {
  return {
    ...iteration,
    status: 'FAILED',
    decision: 'REJECT',
    // In real app, we would revert PageConfig to iteration-1 here
  };
}
