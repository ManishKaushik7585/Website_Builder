
import { GenerationBrief, GenerationPlan } from './generation';
import { ProductionStage } from './production';
import { QAResult } from './qa';
import { VisionResult } from './vision';

export interface SitePlan {
  projectObjective: string;
  audience: string;
  primaryAction: string;
  pages: string[];
  navigation: { label: string; href: string }[];
  globalContentIntent?: string;
  globalVisualIntent?: string;
  globalArtDirection?: string;
  globalAssetStrategy?: string;
  globalMotionStrategy?: string;
  constraints: string[];
}

export type PageState =
  | 'draft'
  | 'planned'
  | 'generating'
  | 'rendering'
  | 'inspecting'
  | 'analyzing'
  | 'refining'
  | 'reviewing'
  | 'approved'
  | 'rejected'
  | 'failed';

export interface PageVersion {
  versionId: string;
  timestamp: string;
  reason: string;
  source: 'generation' | 'refinement' | 'rollback';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageConfig: any;
  generationPlan?: GenerationPlan;
  qaResult?: QAResult;
  visionResult?: VisionResult;
  approvalState: 'pending' | 'approved' | 'rejected';
}

export interface WebsitePage {
  id: string;
  slug: string;
  name: string;
  purpose: 'home' | 'about' | 'services' | 'product' | 'features' | 'pricing' | 'case-study' | 'portfolio' | 'blog' | 'contact' | 'careers' | 'landing' | 'custom';
  objective: string;
  status: PageState;
  generationPlan?: GenerationPlan;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageConfig?: any;
  version: number;
  history: PageVersion[];
  qaResult?: QAResult;
  visionResult?: VisionResult;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  browserResult?: any;
  approvalState: 'pending' | 'approved' | 'rejected';
}

export interface WebsiteProject {
  id: string;
  name: string;
  description: string;
  brief: GenerationBrief;
  status: ProductionStage;
  createdAt: string;
  updatedAt: string;
  pages: WebsitePage[];
  sitePlan?: SitePlan;
  generationHistory: string[];
  activePageId?: string;
  version: number;
  approvalState: 'pending' | 'approved' | 'rejected';
}
