import { IntelligenceSnapshot, RunSnapshot } from '../../config/observability';

export class ObservabilityHistory {
  private runs: Map<string, RunSnapshot> = new Map();
  private snapshots: Map<string, IntelligenceSnapshot> = new Map();
  private latestRunId: string | null = null;

  recordSnapshot(snapshot: IntelligenceSnapshot, run: RunSnapshot) {
    this.snapshots.set(snapshot.id, snapshot);
    this.runs.set(run.runId, run);
    this.latestRunId = run.runId;
  }

  getLatestSnapshot(): IntelligenceSnapshot | null {
    if (!this.latestRunId) return null;
    const run = this.runs.get(this.latestRunId);
    if (!run || !run.latestSnapshotId) return null;
    return this.snapshots.get(run.latestSnapshotId) || null;
  }

  getRunHistory(): RunSnapshot[] {
    return Array.from(this.runs.values()).sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
  }

  getCurrentRun(): RunSnapshot | null {
    if (!this.latestRunId) return null;
    return this.runs.get(this.latestRunId) || null;
  }

  compareWithPrevious(currentSnapshot: IntelligenceSnapshot): { newIssues: number, resolvedIssues: number } {
    const history = this.getRunHistory();
    if (history.length < 2) return { newIssues: 0, resolvedIssues: 0 };
    
    const previousRun = history[1]; // 0 is current, 1 is previous
    const previousSnapshot = this.snapshots.get(previousRun.latestSnapshotId);
    if (!previousSnapshot) return { newIssues: 0, resolvedIssues: 0 };

    const currentIssues = currentSnapshot.qa.issueCount + currentSnapshot.vision.issueCount;
    const previousIssues = previousSnapshot.qa.issueCount + previousSnapshot.vision.issueCount;

    if (currentIssues > previousIssues) {
      return { newIssues: currentIssues - previousIssues, resolvedIssues: 0 };
    } else {
      return { newIssues: 0, resolvedIssues: previousIssues - currentIssues };
    }
  }
}
