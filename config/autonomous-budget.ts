
export interface IterationBudget {
  maxIterations: number;
  maxRefinementsPerIteration: number;
  maxUnchangedIterations: number;
  maxRejectedIterations: number;
}

export const DEFAULT_BUDGET: IterationBudget = {
  maxIterations: 5,
  maxRefinementsPerIteration: 3,
  maxUnchangedIterations: 1,
  maxRejectedIterations: 2
};
