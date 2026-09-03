import { ResearchBudget } from '../../config/external-intelligence';

export class ResearchBudgetManager {
  private budget: ResearchBudget;
  private consumed: {
    queries: number;
    sources: number;
    pages: number;
    timeMs: number;
    iterations: number;
    githubRequests: number;
    designReferences: number;
    mcpDiscoveries: number;
  };
  private startTime: number;

  constructor(budget?: Partial<ResearchBudget>) {
    this.budget = {
      maximumSearchQueries: budget?.maximumSearchQueries ?? 5,
      maximumSources: budget?.maximumSources ?? 10,
      maximumPages: budget?.maximumPages ?? 3,
      maximumResearchTimeMs: budget?.maximumResearchTimeMs ?? 15000,
      maximumEvidenceItems: budget?.maximumEvidenceItems ?? 20,
      maximumResearchIterations: budget?.maximumResearchIterations ?? 2,
      maximumGithubRequests: budget?.maximumGithubRequests ?? 3,
      maximumDesignReferences: budget?.maximumDesignReferences ?? 5,
      maximumMcpDiscoveries: budget?.maximumMcpDiscoveries ?? 2
    };

    this.consumed = {
      queries: 0,
      sources: 0,
      pages: 0,
      timeMs: 0,
      iterations: 0,
      githubRequests: 0,
      designReferences: 0,
      mcpDiscoveries: 0
    };
    
    this.startTime = Date.now();
  }

  trackQuery() { this.consumed.queries++; }
  trackSource() { this.consumed.sources++; }
  trackPage() { this.consumed.pages++; }
  trackIteration() { this.consumed.iterations++; }
  
  isExhausted(): boolean {
    this.consumed.timeMs = Date.now() - this.startTime;
    return (
      this.consumed.queries >= this.budget.maximumSearchQueries ||
      this.consumed.sources >= this.budget.maximumSources ||
      this.consumed.pages >= this.budget.maximumPages ||
      this.consumed.timeMs >= this.budget.maximumResearchTimeMs ||
      this.consumed.iterations >= this.budget.maximumResearchIterations
    );
  }

  getConsumed() {
    this.consumed.timeMs = Date.now() - this.startTime;
    return { ...this.consumed };
  }
}
