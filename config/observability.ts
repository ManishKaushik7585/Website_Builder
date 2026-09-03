export type ObservationStatus = 'current' | 'stale' | 'partial' | 'failed' | 'unavailable' | 'ready';
export type ObservationSeverity = 'info' | 'warning' | 'error' | 'critical';
export type ObservationSource = 'project' | 'content' | 'responsive' | 'interaction' | 'generation' | 'qa' | 'vision' | 'browser' | 'aggregator';
export type ObservationTimestamp = string; // ISO format

export interface ObservationMetric {
  id: string;
  source: ObservationSource;
  name: string;
  value: string | number | boolean;
  status: ObservationStatus;
  severity?: ObservationSeverity;
  timestamp: ObservationTimestamp;
  metadata?: Record<string, string | number | boolean>;
}

export interface IntelligenceSnapshot {
  id: string;
  runId: string;
  projectId: string;
  pageId: string;
  timestamp: ObservationTimestamp;
  status: ObservationStatus;
  
  project: ProjectSnapshot;
  page: PageSnapshot;
  content: ContentSnapshot;
  responsive: ResponsiveSnapshot;
  interaction: InteractionSnapshot;
  generation: GenerationSnapshot;
  qa: QASnapshot;
  vision: VisionSnapshot;

  diagnostics: ObservabilityDiagnostic[];
}

export interface ObservabilityDiagnostic {
  code: string;
  source: ObservationSource;
  severity: ObservationSeverity;
  message: string;
  timestamp: ObservationTimestamp;
}

export interface ProjectSnapshot {
  status: ObservationStatus;
  metrics: ObservationMetric[];
}

export interface PageSnapshot {
  status: ObservationStatus;
  role: string;
  metrics: ObservationMetric[];
}

export interface ContentSnapshot {
  status: ObservationStatus;
  density: string;
  missingSections: string[];
  metrics: ObservationMetric[];
}

export interface ResponsiveSnapshot {
  status: ObservationStatus;
  activeViewport: string;
  overflowDetected: boolean;
  adaptationStatus: string;
  metrics: ObservationMetric[];
}

export interface InteractionSnapshot {
  status: ObservationStatus;
  keyboardCoveragePct: number;
  focusCoveragePct: number;
  destructiveProtectionActive: boolean;
  metrics: ObservationMetric[];
}

export interface GenerationSnapshot {
  status: ObservationStatus;
  stage: string;
  iterationCount: number;
  refinementCount: number;
  metrics: ObservationMetric[];
}

export interface QASnapshot {
  status: ObservationStatus;
  issueCount: number;
  metrics: ObservationMetric[];
}

export interface VisionSnapshot {
  status: ObservationStatus;
  issueCount: number;
  metrics: ObservationMetric[];
}

export interface RunSnapshot {
  runId: string;
  startTime: ObservationTimestamp;
  endTime?: ObservationTimestamp;
  status: ObservationStatus;
  snapshotCount: number;
  latestSnapshotId: string;
}

export interface ObservabilityState {
  currentRun: RunSnapshot | null;
  latestSnapshot: IntelligenceSnapshot | null;
  history: RunSnapshot[];
}

// Contract for the Factory UI (Sanitized, purely presentation data)
export interface FactoryStateContract {
  runId: string;
  projectId: string;
  pageId: string;
  timestamp: string;
  overallStatus: ObservationStatus;
  
  // High-level aggregates
  generationStage: string;
  iterationCount: number;
  
  // Specific domains
  contentDensity: string;
  contentValidation: string;
  missingSectionsCount: number;
  
  responsiveActiveViewport: string;
  responsiveAdaptationStatus: string;
  responsiveOverflow: boolean;
  
  keyboardCoverage: string;
  focusCoverage: string;
  destructiveProtection: string;
  
  qaStatus: string;
  visionStatus: string;
  
  diagnostics: Array<{ message: string; severity: string }>;
}
