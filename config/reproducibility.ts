export interface ReproducibilityContext {
  decisionId: string;
  timestamp: string;
  
  inputs: {
    briefHash?: string;
    adaptiveMemoryIds: string[];
    researchEvidenceIds: string[];
  };

  environment: {
    configurationVersion: string;
    validatorVersion: string;
    contractVersion: string;
    providerIdentity: string;
  };

  evaluation: {
    selectionScores: Record<string, number>;
    critiqueIterations: number;
  };
}

export interface ReproducibilityLog {
  projectId: string;
  traces: ReproducibilityContext[];
}
