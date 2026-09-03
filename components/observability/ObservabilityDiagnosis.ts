import { IntelligenceSnapshot, ObservabilityDiagnostic } from '../../config/observability';

export class ObservabilityDiagnosis {
  
  static diagnose(snapshot: IntelligenceSnapshot): ObservabilityDiagnostic[] {
    const diagnostics: ObservabilityDiagnostic[] = [];
    const now = Date.now();
    const snapshotTime = new Date(snapshot.timestamp).getTime();
    
    // 1. Stale state detection (e.g., > 5 minutes old)
    if (now - snapshotTime > 5 * 60 * 1000) {
      diagnostics.push({
        code: 'STALE_INTELLIGENCE_STATE',
        source: 'aggregator',
        severity: 'warning',
        message: 'The current intelligence snapshot is stale and may not reflect the active project state.',
        timestamp: new Date().toISOString()
      });
    }

    // 2. Incomplete Snapshot
    if (snapshot.content.status === 'unavailable' && snapshot.responsive.status === 'unavailable') {
      diagnostics.push({
        code: 'INCOMPLETE_SNAPSHOT',
        source: 'aggregator',
        severity: 'error',
        message: 'Essential intelligence domains are entirely missing from the snapshot.',
        timestamp: new Date().toISOString()
      });
    }

    // 3. Unavailable Vision
    if (snapshot.vision.status === 'unavailable') {
      diagnostics.push({
        code: 'UNAVAILABLE_VISION_DATA',
        source: 'vision',
        severity: 'info',
        message: 'Vision inspection data is currently unavailable for this run.',
        timestamp: new Date().toISOString()
      });
    }

    // 4. Missing Metric Source
    const allMetrics = [
      ...snapshot.project.metrics,
      ...snapshot.content.metrics,
      ...snapshot.responsive.metrics,
      ...snapshot.interaction.metrics
    ];
    
    if (allMetrics.some(m => !m.source)) {
      diagnostics.push({
        code: 'MISSING_METRIC_SOURCE',
        source: 'aggregator',
        severity: 'error',
        message: 'One or more metrics lack a defined source origin.',
        timestamp: new Date().toISOString()
      });
    }

    return diagnostics;
  }
}
