
import { BrowserSnapshot, BrowserObservation } from './browser-intelligence';
import { GenerationPlan } from './generation';
import { QAReport } from './qa';

export interface VisualInspectionInput {
  screenshotPath: string;
  snapshot: BrowserSnapshot;
  generationPlan?: GenerationPlan;
  qaReport?: QAReport;
}

export interface VisualInspectionResult {
  observations: BrowserObservation[];
  confidence: number;
}
