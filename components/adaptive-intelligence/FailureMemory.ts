import { KnowledgeCandidate, KnowledgeStatus } from '../../config/adaptive-intelligence';
import { RawOutcomeEvent } from './OutcomeExtractor';
import { LearningConfidenceEngine } from './LearningConfidence';

export class FailureMemory {
  static extractFailurePatterns(events: RawOutcomeEvent[]): KnowledgeCandidate[] {
    const candidates: KnowledgeCandidate[] = [];
    
    // Look for failure or partial outcomes in quality, convergence, site_acceptance
    const failureEvents = events.filter(e => 
      (e.outcome === 'failure' || e.outcome === 'partial' || e.outcome === 'regression')
    );

    // Group by observation strings (naively identifying a pattern)
    // A robust system would use NLP, but here we group exact match observations or known error codes
    const failureMap = new Map<string, RawOutcomeEvent[]>();
    
    for (const e of failureEvents) {
      if (e.observations && e.observations.length > 0) {
        for (const obs of e.observations) {
          const arr = failureMap.get(obs) || [];
          arr.push(e);
          failureMap.set(obs, arr);
        }
      }
    }

    for (const [failureReason, evts] of failureMap.entries()) {
      if (evts.length >= 2) {
        // Track recurring failures only
        const evidence = evts.map(e => ({
          source: e.source,
          sourceId: e.sourceId,
          timestamp: e.timestamp,
          outcome: e.outcome,
          confidence: LearningConfidenceEngine.calculateConfidence(1, 0, 1, 'high'),
          supportingObservations: [failureReason],
          projectContext: e.context,
          provenance: { extractedFailure: failureReason },
          evidenceType: 'OBSERVED' as const
        }));

        candidates.push({
          id: `fm-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          type: 'failure_pattern',
          scope: 'project',
          statement: `The failure pattern '${failureReason}' recurred multiple times and should be avoided or proactively addressed.`,
          evidence,
          confidence: LearningConfidenceEngine.calculateConfidence(evidence.length, 0, 1, 'high'),
          status: 'candidate' as KnowledgeStatus,
          provenance: { generator: 'FailureMemory' },
          createdAt: new Date().toISOString(),
          lastValidatedAt: new Date().toISOString()
        });
      }
    }

    return candidates;
  }
}
