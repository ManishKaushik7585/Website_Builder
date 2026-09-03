export type ConvergenceStatus = 
  | 'idle'
  | 'converging'
  | 'accepted'
  | 'stalled'
  | 'regressed'
  | 'blocked'
  | 'budget_exhausted'
  | 'unsupported_action'
  | 'evidence_unavailable'
  | 'regeneration_failure';

export type ConvergenceTerminationReason = 
  | 'accepted'
  | 'max_iterations_reached'
  | 'stalled'
  | 'regression'
  | 'evidence_unavailable'
  | 'regeneration_failure'
  | 'unsupported_refinement'
  | null;

export type RegenerationScope = 
  | 'section' 
  | 'component' 
  | 'page' 
  | 'site' 
  | 'responsive-variant' 
  | 'interaction-behavior';

export interface ConvergenceAction {
  action: string;
  target?: string;
  scope?: RegenerationScope;
  parameters?: Record<string, unknown>;
}

export interface ConvergenceDelta {
  scoreChange: number;
  resolvedViolations: string[];
  newViolations: string[];
  remainingViolations: string[];
}

export interface ConvergenceIterationRecord {
  iteration: number;
  timestamp: string;
  status: ConvergenceStatus;
  qualityScore: number;
  blockingViolations: string[];
  warnings: string[];
  refinementActions: ConvergenceAction[];
  regenerationScope: RegenerationScope | null;
  delta: ConvergenceDelta;
}

export interface ConvergenceResult {
  status: ConvergenceStatus;
  currentIteration: number;
  maxIterations: number;
  history: ConvergenceIterationRecord[];
  terminationReason: ConvergenceTerminationReason;
  finalScore: number;
  blockingViolations: string[];
  resolvedViolations: string[];
  activeRefinements: ConvergenceAction[];
  activeScope: RegenerationScope | null;
  acceptanceStatus: string;
}

export interface ConvergenceState {
  iterations: ConvergenceIterationRecord[];
  status: ConvergenceStatus;
}
