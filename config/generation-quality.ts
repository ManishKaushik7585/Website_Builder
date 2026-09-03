export type QualityDimension =
  | 'architecture'
  | 'content'
  | 'responsive'
  | 'interaction'
  | 'accessibility'
  | 'design'
  | 'navigation'
  | 'observability'
  | 'generation-integrity';

export type QualityStatus = 'pass' | 'fail' | 'warning' | 'unverified';

export type QualitySeverity = 'critical' | 'high' | 'medium' | 'low';

export interface QualityScore {
  dimension: QualityDimension;
  score: number; // 0-100 supplementary
}

export interface QualityEvidence {
  source: 'observability' | 'qa' | 'vision' | 'plan' | 'generation';
  description: string;
  isVerified: boolean;
}

export type QualityViolationCode =
  | 'REQUIRED_SECTION_MISSING'
  | 'CONTENT_PLAN_UNSATISFIED'
  | 'RESPONSIVE_PLAN_UNSATISFIED'
  | 'INTERACTION_PLAN_UNSATISFIED'
  | 'ACCESSIBILITY_REQUIREMENT_UNVERIFIED'
  | 'NAVIGATION_REQUIREMENT_UNSATISFIED'
  | 'CRITICAL_OBSERVATION_UNRESOLVED'
  | 'GENERATION_EVIDENCE_MISSING'
  | 'CONTRADICTORY_GENERATION_STATE'
  | 'ACCEPTANCE_GATE_BLOCKED'
  | 'UNVERIFIED_EVIDENCE'
  | 'UNKNOWN';

export interface QualityViolation {
  dimension: QualityDimension;
  code: QualityViolationCode;
  severity: QualitySeverity;
  message: string;
  evidence: QualityEvidence[];
  affectedPageId: string;
  affectedSectionPurpose?: string;
}

export interface QualityDiagnosis {
  diagnosisId: string;
  sourceDomain: QualityDimension;
  affectedPageId: string;
  affectedSectionPurpose?: string;
  severity: QualitySeverity;
  isBlocking: boolean;
  message: string;
}

export interface QualityRecommendation {
  action: string;
  targetDimension: QualityDimension;
  parameters: Record<string, string | boolean | number>;
  expectedOutcome: string;
}

export type AcceptanceStatus = 'accepted' | 'accepted_with_warnings' | 'blocked' | 'unverified';

export interface AcceptanceGate {
  dimension: QualityDimension;
  passed: boolean;
  isVerified: boolean;
  blockingViolations: QualityViolation[];
  warnings: QualityViolation[];
}

export interface AcceptanceResult {
  status: AcceptanceStatus;
  gates: AcceptanceGate[];
  overallBlockingIssueCount: number;
  overallWarningCount: number;
}

export interface GenerationQualityReport {
  pageId: string;
  timestamp: string;
  dimensions: Record<QualityDimension, QualityStatus>;
  diagnoses: QualityDiagnosis[];
  recommendations: QualityRecommendation[];
  acceptance: AcceptanceResult;
}
