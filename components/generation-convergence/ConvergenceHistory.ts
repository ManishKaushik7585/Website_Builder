import { ConvergenceIterationRecord, ConvergenceDelta, ConvergenceStatus } from '../../config/generation-convergence';

export class ConvergenceHistory {
  private history: ConvergenceIterationRecord[] = [];

  addRecord(record: ConvergenceIterationRecord) {
    this.history.push(record);
  }

  getHistory(): ConvergenceIterationRecord[] {
    return [...this.history];
  }

  calculateDelta(newScore: number, newViolations: string[]): ConvergenceDelta {
    if (this.history.length === 0) {
      return {
        scoreChange: 0,
        resolvedViolations: [],
        newViolations,
        remainingViolations: newViolations
      };
    }

    const prev = this.history[this.history.length - 1];
    const prevViolations = prev.blockingViolations;
    
    const resolvedViolations = prevViolations.filter(v => !newViolations.includes(v));
    const newlyAddedViolations = newViolations.filter(v => !prevViolations.includes(v));
    const remainingViolations = newViolations.filter(v => prevViolations.includes(v));

    return {
      scoreChange: newScore - prev.qualityScore,
      resolvedViolations,
      newViolations: newlyAddedViolations,
      remainingViolations
    };
  }
}
