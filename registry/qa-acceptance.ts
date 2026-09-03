
import { QAResult } from '@/config/qa';

export function evaluateAcceptance(result: QAResult): 'PASS' | 'CONDITIONAL' | 'REJECT' {
  const hasCritical = result.observations.some(o => o.severity === 'critical');
  const hasMajor = result.observations.some(o => o.severity === 'major');
  
  if (hasCritical) return 'REJECT';
  if (hasMajor) return 'CONDITIONAL';
  return 'PASS';
}
