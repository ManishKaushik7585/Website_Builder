
import { QARefinement } from '@/config/qa';

export function resolveConflicts(refinements: QARefinement[]): QARefinement[] {
  // Deduplicate targets, preferring the first (highest priority) refinement per target
  const seenTargets = new Set<string>();
  return refinements.filter(r => {
    if (seenTargets.has(r.target)) return false;
    seenTargets.add(r.target);
    return true;
  });
}
