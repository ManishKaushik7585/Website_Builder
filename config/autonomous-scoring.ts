
export interface IterationScore {
  structure: number;
  layout: number;
  content: number;
  visualHierarchy: number;
  responsive: number;
  accessibility: number;
  total: number;
}

export interface IterationDelta {
  scoreDelta: number;
  newIssues: number;
  resolvedIssues: number;
}
