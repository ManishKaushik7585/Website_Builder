/* eslint-disable @typescript-eslint/no-explicit-any */
import { KnowledgeCandidate, KnowledgeStatus } from '../../config/adaptive-intelligence';
import { RawOutcomeEvent } from './OutcomeExtractor';
import { LearningConfidenceEngine } from './LearningConfidence';

export class LearningAnalyzer {
  static analyzeOutcomes(events: RawOutcomeEvent[]): KnowledgeCandidate[] {
    const candidates: KnowledgeCandidate[] = [];

    // Simple grouping and thresholding to create correlation candidates
    // A robust implementation would use a statistical model, but here we just
    // extract deterministic candidates from explicit observations.
    
    for (const event of events) {
      if (event.outcome === 'success' && event.source === 'quality') {
        const candidate = this.createCandidate(
          'generation_pattern',
          'project',
          `Quality metrics successfully met for project ${event.projectId}`,
          [event]
        );
        candidates.push(candidate);
      } else if (event.outcome === 'failure' && event.source === 'convergence') {
        const candidate = this.createCandidate(
          'failure_pattern',
          'project',
          `Convergence stalled in project ${event.projectId}. Review active refinements.`,
          [event]
        );
        candidates.push(candidate);
      } else if (event.source === 'site_acceptance' && event.outcome === 'partial') {
        const candidate = this.createCandidate(
          'failure_pattern',
          'project',
          `Cross-page violations detected: ${event.observations.join(', ')}`,
          [event]
        );
        candidates.push(candidate);
      }
      
      // Explicit causality check requires corroboration across multiple projects,
      // handled during memory promotion. Here we just capture candidates.
    }

    return candidates;
  }

  private static createCandidate(
    type: any, 
    scope: any, 
    statement: string, 
    events: RawOutcomeEvent[]
  ): KnowledgeCandidate {
    
    const evidence = events.map(e => ({
      source: e.source,
      sourceId: e.sourceId,
      timestamp: e.timestamp,
      outcome: e.outcome,
      confidence: LearningConfidenceEngine.calculateConfidence(1, 0, 1, 'high'), // Base init
      supportingObservations: e.observations,
      projectContext: { projectId: e.projectId, ...e.context },
      provenance: { extractedBy: 'LearningAnalyzer' },
      evidenceType: 'CORRELATED' as const
    }));

    // Start with low confidence until corroborated
    const confidence = LearningConfidenceEngine.calculateConfidence(evidence.length, 0, 1, 'high');

    return {
      id: `kc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      scope,
      statement,
      evidence,
      confidence,
      status: 'candidate' as KnowledgeStatus,
      provenance: { generator: 'LearningAnalyzer' },
      createdAt: new Date().toISOString(),
      lastValidatedAt: new Date().toISOString()
    };
  }
}
