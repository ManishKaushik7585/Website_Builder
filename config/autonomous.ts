
import { GenerationBrief, GenerationPlan } from './generation';
import { VisionObservation } from './vision';
import { QAObservation, QADiagnosis, QARefinement } from './qa';
import { IterationBudget } from './autonomous-budget';
import { IterationScore, IterationDelta } from './autonomous-scoring';
import { AutonomousOverride } from './autonomous-override';

export type AutonomousState = 'IDLE' | 'PLANNING' | 'GENERATING' | 'RENDERING' | 'INSPECTING' | 'ANALYZING' | 'DIAGNOSING' | 'REFINING' | 'COMPARING' | 'EVALUATING' | 'ACCEPTED' | 'REJECTED' | 'CONVERGED' | 'FAILED';

export type IterationStatus = 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'REVERTED';
export type IterationDecision = 'PASS' | 'CONDITIONAL' | 'REJECT' | 'CONVERGED' | 'ITERATION_BUDGET_EXCEEDED';

export interface IterationFailure {
  type: 'render' | 'vision' | 'browser' | 'refinement' | 'budget';
  message: string;
}

export interface AutonomousIteration {
  iterationId: string;
  iterationNumber: number;
  timestamp: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputConfiguration: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  browserObservations: any[]; // Using any to avoid complex imports here
  visionObservations: VisionObservation[];
  qaObservations: QAObservation[];
  diagnoses: QADiagnosis[];
  refinements: QARefinement[];
  comparison?: IterationDelta;
  score: IterationScore;
  decision: IterationDecision;
  status: IterationStatus;
}

export interface AutonomousRun {
  runId: string;
  brief: GenerationBrief;
  budget: IterationBudget;
  state: AutonomousState;
  iterations: AutonomousIteration[];
  overrides: AutonomousOverride[];
  currentPlan?: GenerationPlan;
}
