
import { AutonomousRun, AutonomousIteration } from '@/config/autonomous';
import { DEFAULT_BUDGET } from '@/config/autonomous-budget';

export function advanceIteration(run: AutonomousRun, nextIteration: AutonomousIteration): AutonomousRun {
  const updatedRun = { ...run, iterations: [...run.iterations, nextIteration] };
  
  if (updatedRun.iterations.length >= DEFAULT_BUDGET.maxIterations) {
    updatedRun.iterations[updatedRun.iterations.length - 1].decision = 'ITERATION_BUDGET_EXCEEDED';
    updatedRun.state = 'FAILED';
  } else if (nextIteration.decision === 'CONVERGED') {
    updatedRun.state = 'CONVERGED';
  } else {
    updatedRun.state = 'EVALUATING';
  }
  
  return updatedRun;
}
