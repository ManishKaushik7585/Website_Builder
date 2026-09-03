import { GenerationQualityReport } from '../../config/generation-quality';
import { ConvergenceHistory } from './ConvergenceHistory';

export interface ConvergenceHealth {
  stalled: boolean;
  regressed: boolean;
  score: number;
}

export class ConvergenceFusion {
  static evaluateHealth(
    report: GenerationQualityReport,
    historyTracker: ConvergenceHistory
  ): ConvergenceHealth {
    const history = historyTracker.getHistory();
    let score = 100;
    for (const val of Object.values(report.dimensions)) {
      if (val === 'fail') score -= 20;
      if (val === 'unverified') score -= 10;
      if (val === 'warning') score -= 5;
    }
    
    let stalled = false;
    let regressed = false;

    if (history.length > 0) {
      const prev = history[history.length - 1];
      if (score < prev.qualityScore) {
        regressed = true;
      }
      
      const prevBlocks = prev.blockingViolations;
      const curBlocks = report.diagnoses.filter(d => d.severity === 'high' || d.severity === 'critical').map(d => d.message);
      
      if (prevBlocks.length > 0 && curBlocks.length >= prevBlocks.length) {
        const same = curBlocks.filter(c => prevBlocks.includes(c));
        if (same.length === prevBlocks.length) {
          stalled = true; // All previous blocking violations still exist
        }
      }
    }

    return { stalled, regressed, score };
  }
}
