
import { QARefinement } from '@/config/qa';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function applyRefinements(config: any, refinements: QARefinement[]): any {
  // Mock semantic application of typed refinements to PageConfig
  return { ...config, refinementsApplied: refinements.length };
}
