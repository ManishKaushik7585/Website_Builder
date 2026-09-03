
export interface ModelSelectionCriteria {
  requiresVision: boolean;
  requiresStructuredOutput: boolean;
  latencyPriority: 'low' | 'balanced' | 'high';
}

export function selectProvider(criteria: ModelSelectionCriteria, providers: any[]): string { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Simple mock logic for selection
  return providers[0]?.id || 'mock-provider';
}
