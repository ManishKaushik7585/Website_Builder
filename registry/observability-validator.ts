import { IntelligenceSnapshot, ObservabilityDiagnostic } from '../config/observability';

export interface ObservabilityValidationResult {
  valid: boolean;
  diagnostics: ObservabilityDiagnostic[];
}

export class ObservabilityValidator {
  
  static validateSnapshot(snapshot: IntelligenceSnapshot): ObservabilityValidationResult {
    const diagnostics: ObservabilityDiagnostic[] = [];

    // 1. Identity consistency
    if (!snapshot.id || !snapshot.runId || !snapshot.projectId || !snapshot.pageId) {
      diagnostics.push(this.createDiagnostic('error', 'Snapshot is missing critical identity fields.'));
    }

    // 2. Timestamp validity
    const time = new Date(snapshot.timestamp).getTime();
    if (isNaN(time) || time > Date.now() + 60000) { // +1m drift allowance
      diagnostics.push(this.createDiagnostic('error', 'Snapshot timestamp is invalid or in the future.'));
    }

    // 3. Stale state rules
    const isStale = (Date.now() - time) > 5 * 60 * 1000;
    if (isStale && snapshot.status === 'current') {
      diagnostics.push(this.createDiagnostic('error', 'Snapshot is older than 5 minutes but still marked as current.'));
    }

    // 4. Secret Leakage Prevention
    // Check all string values in the snapshot deeply for common secret patterns or keys
    const snapshotStr = JSON.stringify(snapshot);
    if (snapshotStr.includes('sk-') || snapshotStr.includes('API_KEY') || snapshotStr.includes('Bearer ')) {
      diagnostics.push(this.createDiagnostic('error', 'Potential secret leakage detected in observability state.'));
    }

    // 5. Metric Aggregation Integrity
    const hasProjectMetrics = snapshot.project.metrics.length > 0;
    const hasContentMetrics = snapshot.content.metrics.length > 0;
    if (!hasProjectMetrics && snapshot.project.status !== 'unavailable') {
      diagnostics.push(this.createDiagnostic('warning', 'Project status is not unavailable but contains no metrics.'));
    }
    if (!hasContentMetrics && snapshot.content.status !== 'unavailable') {
      diagnostics.push(this.createDiagnostic('warning', 'Content status is not unavailable but contains no metrics.'));
    }

    return {
      valid: !diagnostics.some(d => d.severity === 'error'),
      diagnostics
    };
  }

  private static createDiagnostic(severity: 'info'|'warning'|'error'|'critical', message: string): ObservabilityDiagnostic {
    return {
      code: 'VALIDATION_FAILURE',
      source: 'aggregator',
      severity,
      message,
      timestamp: new Date().toISOString()
    };
  }
}
