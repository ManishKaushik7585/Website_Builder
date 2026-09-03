
import { BrowserSnapshot } from './browser-intelligence';
import { GenerationPlan } from './generation';
import { QASeverity } from './qa';

export interface VisionViewport {
  width: number;
  height: number;
}

export interface VisionSectionCrop {
  id: string;
  source: string;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface VisionScreenshot {
  source: string;
  width: number;
  height: number;
  viewport: VisionViewport;
  route?: string;
  device: 'desktop' | 'tablet' | 'mobile';
  sections?: VisionSectionCrop[];
}

export interface VisionInput {
  screenshot: VisionScreenshot;
  viewport: VisionViewport;
  browserSnapshot?: BrowserSnapshot;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageConfig?: any;
  generationPlan?: GenerationPlan;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visualIntent?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentIntent?: any;
}

export interface VisionTarget {
  elementId?: string;
  sectionId?: string;
  region?: { x: number; y: number; width: number; height: number };
}

export interface VisionEvidence {
  type: 'visual' | 'geometric' | 'comparative' | 'semantic' | 'configuration';
  description: string;
  region?: { x: number; y: number; width: number; height: number };
}

export type VisionConfidence = 'low' | 'medium' | 'high';

export interface VisionObservation {
  id: string;
  category: 'hierarchy' | 'composition' | 'spacing' | 'typography' | 'color' | 'contrast' | 'media' | 'density' | 'rhythm' | 'responsive' | 'accessibility' | 'motion' | 'performance' | 'slop';
  severity: QASeverity;
  description: string;
  target: VisionTarget;
  evidence: VisionEvidence[];
  confidence: VisionConfidence;
}

export interface VisionContext {
  previousObservations?: VisionObservation[];
  iterationCount: number;
}

export interface VisionAnalysis {
  observations: VisionObservation[];
  confidence: VisionConfidence;
  timestamp: string;
}

export interface VisionResult {
  analysis: VisionAnalysis;
  status: 'PASS' | 'CONDITIONAL' | 'REJECT';
}
