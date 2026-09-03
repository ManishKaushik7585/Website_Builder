export type ReleaseStatus = 'ready' | 'ready_with_warnings' | 'blocked' | 'unverified';

export type ReleaseDimension = 
  | 'site_acceptance'
  | 'build'
  | 'routes'
  | 'assets'
  | 'environment'
  | 'accessibility'
  | 'performance'
  | 'security'
  | 'metadata';

export type ReleaseSeverity = 'critical' | 'high' | 'warning' | 'info';

export interface ReleaseEvidence {
  dimension: ReleaseDimension;
  isAvailable: boolean;
  isVerified: boolean;
  timestamp: string;
  data?: Record<string, unknown>;
}

export interface ReleaseViolation {
  code: string;
  dimension: ReleaseDimension;
  severity: ReleaseSeverity;
  message: string;
}

export interface ReleaseDiagnosis {
  code: string;
  dimension: ReleaseDimension;
  severity: ReleaseSeverity;
  scope: string;
  evidence: string;
  isBlocking: boolean;
  semanticCategory: string;
  explanation: string;
}

export interface ReleaseRecommendation {
  action: string;
  targetDimension: ReleaseDimension;
  semanticCategory: string;
  expectedOutcome: string;
}

export interface ReleaseCheck {
  dimension: ReleaseDimension;
  passed: boolean;
  verified: boolean;
  violations: ReleaseViolation[];
}

export interface ReleaseBlocker {
  dimension: ReleaseDimension;
  diagnosis: ReleaseDiagnosis;
}

export interface ReleaseWarning {
  dimension: ReleaseDimension;
  diagnosis: ReleaseDiagnosis;
}

export interface DeploymentReadiness {
  status: ReleaseStatus;
  mandatoryGatesPassed: boolean;
  blockingIssueCount: number;
}

export interface ReleaseArtifact {
  projectId: string;
  version: string;
  timestamp: string;
  status: ReleaseStatus;
}

export interface ReleaseResult {
  status: ReleaseStatus;
  deploymentReadiness: DeploymentReadiness;
  dimensions: Record<ReleaseDimension, ReleaseStatus>;
  blockers: ReleaseBlocker[];
  warnings: ReleaseWarning[];
  recommendations: ReleaseRecommendation[];
  score: number;
  evidenceFreshness: string;
  siteAcceptanceStatus: string;
}
