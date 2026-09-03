
import { GenerationBrief, GenerationPlan } from './generation';
import { QAResult } from './qa';
import { VisionResult } from './vision';
import { AutonomousIteration } from './autonomous';

export type ProductionStage =
  | 'idle'
  | 'understanding'
  | 'planning'
  | 'generating'
  | 'rendering'
  | 'inspecting'
  | 'analyzing'
  | 'refining'
  | 'verifying'
  | 'ready'
  | 'failed'
  | 'needs-review';

export interface WebsiteProject {
  id: string;
  name: string;
  brief: GenerationBrief;
  status: ProductionStage;
  latestRunId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductionRun {
  id: string;
  projectId: string;
  brief: GenerationBrief;
  plan?: GenerationPlan;
  status: ProductionStage;
  iterations: AutonomousIteration[];
  qa?: QAResult;
  vision?: VisionResult;
  acceptance?: { status: 'pending' | 'accepted' | 'rejected', reason?: string };
  startedAt: string;
  completedAt?: string;
}
