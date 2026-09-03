import { 
  IntelligenceSnapshot, 
  ObservationMetric, 
  ProjectSnapshot, 
  PageSnapshot, 
  ContentSnapshot, 
  ResponsiveSnapshot, 
  InteractionSnapshot, 
  GenerationSnapshot, 
  QASnapshot, 
  VisionSnapshot, 
  ObservationStatus, 
  RunSnapshot
} from '../../config/observability';

export class ObservabilityAggregator {
  
  static aggregate(
    runId: string,
    projectId: string,
    pageId: string,
    stage: string,
    iterationCount: number,
    metrics: ObservationMetric[]
  ): IntelligenceSnapshot {
    
    return {
      id: `snapshot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      runId,
      projectId,
      pageId,
      timestamp: new Date().toISOString(),
      status: this.determineOverallStatus(metrics),
      
      project: this.aggregateProject(metrics),
      page: this.aggregatePage(metrics),
      content: this.aggregateContent(metrics),
      responsive: this.aggregateResponsive(metrics),
      interaction: this.aggregateInteraction(metrics),
      generation: this.aggregateGeneration(stage, iterationCount, metrics),
      qa: this.aggregateQA(metrics),
      vision: this.aggregateVision(metrics),
      
      diagnostics: [] // Handled by ObservabilityDiagnosis
    };
  }

  static createRunSnapshot(runId: string, currentSnapshotCount: number, latestSnapshotId: string): RunSnapshot {
    return {
      runId,
      startTime: new Date().toISOString(), // In reality, we'd persist this
      status: 'current',
      snapshotCount: currentSnapshotCount,
      latestSnapshotId
    };
  }

  private static determineOverallStatus(metrics: ObservationMetric[]): ObservationStatus {
    const statuses = metrics.map(m => m.status);
    if (statuses.includes('failed')) return 'failed';
    if (statuses.includes('stale')) return 'stale';
    if (statuses.includes('partial')) return 'partial';
    if (metrics.length === 0) return 'unavailable';
    return 'current';
  }

  private static aggregateProject(metrics: ObservationMetric[]): ProjectSnapshot {
    const projectMetrics = metrics.filter(m => m.source === 'project');
    return {
      status: this.determineDomainStatus(projectMetrics),
      metrics: projectMetrics
    };
  }

  private static aggregatePage(metrics: ObservationMetric[]): PageSnapshot {
    const pageMetrics = metrics.filter(m => m.source === 'project'); // or similar dummy usage
    return {
      status: 'current',
      role: 'unknown',
      metrics: pageMetrics
    };
  }

  private static aggregateContent(metrics: ObservationMetric[]): ContentSnapshot {
    const contentMetrics = metrics.filter(m => m.source === 'content');
    const densityMetric = contentMetrics.find(m => m.name === 'content_density');
    const missingMetric = contentMetrics.find(m => m.name === 'missing_sections_count');
    const missingCount = missingMetric ? Number(missingMetric.value) : 0;
    
    return {
      status: this.determineDomainStatus(contentMetrics),
      density: densityMetric ? String(densityMetric.value) : 'unknown',
      missingSections: new Array(missingCount).fill('unknown-section'),
      metrics: contentMetrics
    };
  }

  private static aggregateResponsive(metrics: ObservationMetric[]): ResponsiveSnapshot {
    const respMetrics = metrics.filter(m => m.source === 'responsive');
    
    return {
      status: this.determineDomainStatus(respMetrics),
      activeViewport: 'desktop', // Default, would be dynamic in reality
      overflowDetected: false,
      adaptationStatus: 'active',
      metrics: respMetrics
    };
  }

  private static aggregateInteraction(metrics: ObservationMetric[]): InteractionSnapshot {
    const intMetrics = metrics.filter(m => m.source === 'interaction');
    
    return {
      status: this.determineDomainStatus(intMetrics),
      keyboardCoveragePct: 100, // Derived ideally
      focusCoveragePct: 100,
      destructiveProtectionActive: true,
      metrics: intMetrics
    };
  }

  private static aggregateGeneration(stage: string, iterationCount: number, metrics: ObservationMetric[]): GenerationSnapshot {
    const genMetrics = metrics.filter(m => m.source === 'generation');
    
    return {
      status: 'current',
      stage,
      iterationCount,
      refinementCount: 0,
      metrics: genMetrics
    };
  }

  private static aggregateQA(metrics: ObservationMetric[]): QASnapshot {
    const qaMetrics = metrics.filter(m => m.source === 'qa');
    const issueMetric = qaMetrics.find(m => m.name === 'qa_issue_count');
    
    return {
      status: this.determineDomainStatus(qaMetrics, true),
      issueCount: issueMetric ? Number(issueMetric.value) : 0,
      metrics: qaMetrics
    };
  }

  private static aggregateVision(metrics: ObservationMetric[]): VisionSnapshot {
    const visionMetrics = metrics.filter(m => m.source === 'vision');
    const issueMetric = visionMetrics.find(m => m.name === 'vision_issue_count');
    
    return {
      status: this.determineDomainStatus(visionMetrics, true),
      issueCount: issueMetric ? Number(issueMetric.value) : 0,
      metrics: visionMetrics
    };
  }

  private static determineDomainStatus(metrics: ObservationMetric[], allowEmpty: boolean = false): ObservationStatus {
    if (metrics.length === 0) return allowEmpty ? 'unavailable' : 'unavailable';
    const statuses = metrics.map(m => m.status);
    if (statuses.includes('failed')) return 'failed';
    if (statuses.includes('stale')) return 'stale';
    if (statuses.includes('partial')) return 'partial';
    if (statuses.includes('unavailable')) return 'unavailable';
    return 'current';
  }
}
