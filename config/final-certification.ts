export type CertificationStatus = 
  | 'READY'
  | 'READY_WITH_WARNINGS'
  | 'BLOCKED'
  | 'UNVERIFIED';

export type EvidenceStatus = 
  | 'LIVE VERIFIED'
  | 'MOCK VERIFIED'
  | 'STATICALLY VERIFIED'
  | 'TEST VERIFIED'
  | 'UNVERIFIED';

export interface CertificationDimension {
  name: string;
  status: CertificationStatus;
  evidenceStatus: EvidenceStatus;
  score: number;
  failures: string[];
  warnings: string[];
  evidence: string[];
}

export interface CertificationIssue {
  dimension: string;
  description: string;
  severity: 'critical' | 'warning';
}

export interface FinalCertificationReport {
  version: string;
  projectId?: string;

  status: CertificationStatus;

  dimensions: CertificationDimension[];

  blockers: CertificationIssue[];
  warnings: CertificationIssue[];

  testSummary: { total: number; passed: number; failed: number; unverified: number };
  performanceSummary: { buildTime: string; externalLatency: string };
  securitySummary: { issuesDetected: number; injectionMitigated: boolean };
  accessibilitySummary: { complianceLevel: string; violations: number };
  reproducibilitySummary: { metadataRetained: boolean; traceCompleteness: number };

  architectureIntegrity: {
    orphanedComponents: number;
    duplicateValidators: number;
    circularDependencies: number;
    bypassesDetected: number;
  };

  evidence: { id: string; description: string; type: EvidenceStatus }[];

  generatedAt: string;
}
