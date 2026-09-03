
import { GenerationBrief } from '@/config/generation';
import { AutonomousRun, AutonomousIteration } from '@/config/autonomous';
import { DEFAULT_BUDGET } from '@/config/autonomous-budget';
import { evaluateAcceptance } from './AutonomousAcceptance';
import { checkConvergence } from './ConvergenceEngine';
import { advanceIteration } from './IterationController';

export function startAutonomousRun(brief: GenerationBrief): AutonomousRun {
  return {
    runId: 'run-' + Date.now(),
    brief,
    budget: DEFAULT_BUDGET,
    state: 'IDLE',
    iterations: [],
    overrides: []
  };
}

export function simulateIterationExecution(run: AutonomousRun, mockIterationData: Partial<AutonomousIteration>): AutonomousRun {
  let iteration: AutonomousIteration = {
    iterationId: 'iter-' + Date.now(),
    iterationNumber: run.iterations.length + 1,
    timestamp: new Date().toISOString(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inputConfiguration: { sections: [] } as any,
    browserObservations: [],
    visionObservations: [],
    qaObservations: mockIterationData.qaObservations || [],
    diagnoses: [],
    refinements: [],
    score: { structure: 100, layout: 100, content: 100, visualHierarchy: 100, responsive: 100, accessibility: 100, total: 600 },
    decision: 'PASS',
    status: 'COMPLETED',
    ...mockIterationData
  } as AutonomousIteration;
  
  iteration = evaluateAcceptance(iteration);
  const isConverged = checkConvergence(iteration, run.iterations[run.iterations.length - 1]);
  if (isConverged && iteration.decision !== 'ITERATION_BUDGET_EXCEEDED') {
    iteration.decision = 'CONVERGED';
  }
  
  return advanceIteration(run, iteration);
}
