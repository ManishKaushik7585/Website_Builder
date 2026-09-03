import { IntelligenceSnapshot, FactoryStateContract } from '../../config/observability';

export class FactoryStateHydrator {
  
  static hydrate(snapshot: IntelligenceSnapshot | null): FactoryStateContract {
    if (!snapshot) {
      return this.createEmptyState();
    }

    return {
      runId: snapshot.runId,
      projectId: snapshot.projectId,
      pageId: snapshot.pageId,
      timestamp: snapshot.timestamp,
      overallStatus: snapshot.status,
      
      generationStage: snapshot.generation.stage || 'idle',
      iterationCount: snapshot.generation.iterationCount || 0,
      
      contentDensity: snapshot.content.density || 'unknown',
      contentValidation: snapshot.content.status === 'current' ? 'Passed' : 'Pending',
      missingSectionsCount: snapshot.content.missingSections.length,
      
      responsiveActiveViewport: snapshot.responsive.activeViewport || 'unknown',
      responsiveAdaptationStatus: snapshot.responsive.adaptationStatus || 'unknown',
      responsiveOverflow: snapshot.responsive.overflowDetected || false,
      
      keyboardCoverage: `${snapshot.interaction.keyboardCoveragePct}%`,
      focusCoverage: `${snapshot.interaction.focusCoveragePct}%`,
      destructiveProtection: snapshot.interaction.destructiveProtectionActive ? 'Active' : 'Inactive',
      
      qaStatus: snapshot.qa.status === 'unavailable' ? 'Unavailable' : (snapshot.qa.issueCount === 0 ? 'Passed' : `${snapshot.qa.issueCount} Issues`),
      visionStatus: snapshot.vision.status === 'unavailable' ? 'Unavailable' : (snapshot.vision.issueCount === 0 ? 'Passed' : `${snapshot.vision.issueCount} Issues`),
      
      // Map diagnostics securely (only exposing message and severity)
      diagnostics: snapshot.diagnostics.map(d => ({
        message: d.message,
        severity: d.severity
      }))
    };
  }

  private static createEmptyState(): FactoryStateContract {
    return {
      runId: 'none',
      projectId: 'none',
      pageId: 'none',
      timestamp: new Date().toISOString(),
      overallStatus: 'unavailable',
      generationStage: 'idle',
      iterationCount: 0,
      contentDensity: 'unknown',
      contentValidation: 'Unavailable',
      missingSectionsCount: 0,
      responsiveActiveViewport: 'unknown',
      responsiveAdaptationStatus: 'unknown',
      responsiveOverflow: false,
      keyboardCoverage: '0%',
      focusCoverage: '0%',
      destructiveProtection: 'Unknown',
      qaStatus: 'Unavailable',
      visionStatus: 'Unavailable',
      diagnostics: []
    };
  }
}
