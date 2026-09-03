
export interface AIBudget {
  maxGenerationAttempts: number;
  maxRefinementRequests: number;
  maxTotalCalls: number;
  maxTotalTokens: number;
}

export const DEFAULT_AI_BUDGET: AIBudget = {
  maxGenerationAttempts: 3,
  maxRefinementRequests: 10,
  maxTotalCalls: 20,
  maxTotalTokens: 100000
};
