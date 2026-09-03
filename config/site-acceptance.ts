import { ConvergenceResult } from './generation-convergence';
import { IntelligenceSnapshot } from './observability';

export type SiteAcceptanceStatus = 'accepted' | 'rejected' | 'partial' | 'unverified';

export interface CrossPageViolation {
  code: string;
  sourcePageId: string;
  targetPageId?: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  domain: 'design' | 'navigation' | 'content' | 'layout';
}

export interface SiteAcceptanceResult {
  status: SiteAcceptanceStatus;
  projectScore: number;
  totalPages: number;
  acceptedPages: number;
  crossPageViolations: CrossPageViolation[];
  pageResults: Record<string, ConvergenceResult>;
  timestamp: string;
}

export interface MultiPageGenerationState {
  siteAcceptance: SiteAcceptanceResult;
  snapshots: Record<string, IntelligenceSnapshot>;
}
