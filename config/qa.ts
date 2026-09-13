
export type QASeverity = 'info' | 'minor' | 'moderate' | 'major' | 'critical';
export type QACategory = 'visual' | 'layout' | 'spacing' | 'typography' | 'content' | 'media' | 'responsive' | 'accessibility' | 'motion' | 'performance' | 'structure' | 'density' | 'hierarchy' | 'rhythm' | 'visual-repetition';
export type QAStatus = 'detected' | 'diagnosed' | 'recommended' | 'patched' | 'verified' | 'accepted' | 'rejected' | 'ignored';

export interface QAObservation {
  id: string;
  category: QACategory;
  severity: QASeverity;
  target: string;
  description: string;
  evidence?: string;
  confidence: number;
}

export interface QADiagnosis {
  observationId: string;
  cause: string;
  impact: string;
  recommendedLayer: string;
}

export interface QARecommendation {
  diagnosisId: string;
  action: string;
  target: string;
}

export interface QARefinement {
  target: string;
  currentState: unknown;
  desiredState: unknown;
  reason: string;
  sourceIssue: string;
}

export interface QAResult {
  score: number;
  status: 'PASS' | 'CONDITIONAL' | 'REJECT';
  observations: QAObservation[];
}

export interface QAReport {
  iteration: number;
  result: QAResult;
  diagnoses: QADiagnosis[];
  refinements: QARefinement[];
}
