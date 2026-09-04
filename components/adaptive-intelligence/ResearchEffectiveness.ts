import { KnowledgeCandidate, KnowledgeStatus } from '../../config/adaptive-intelligence';
import { RawOutcomeEvent } from './OutcomeExtractor';
import { LearningConfidenceEngine } from './LearningConfidence';

export class ResearchEffectiveness {
  static evaluateProvider(providerName: string, events: RawOutcomeEvent[]): KnowledgeCandidate | null {
    const providerEvents = events.filter(e =>
      e.source === 'research' &&
      e.context?.provider === providerName
    );

    if (providerEvents.length === 0) return null;

    let successCount = 0;
    let failureCount = 0;

    providerEvents.forEach(e => {
      if (e.outcome === 'success') successCount++;
      else if (e.outcome === 'failure' || e.outcome === 'partial') failureCount++;
    });

    // We generate an advisory candidate if there is a strong signal
    if (successCount >= 2 && failureCount === 0) {
      return this.createEffectivenessCandidate(providerName, 'high', providerEvents);
    } else if (failureCount >= 2 && successCount === 0) {
      return this.createEffectivenessCandidate(providerName, 'low', providerEvents);
    }

    return null;
  }

  private static createEffectivenessCandidate(
    providerName: string,
    effectiveness: 'high' | 'low',
    events: RawOutcomeEvent[]
  ): KnowledgeCandidate {

    const statement = effectiveness === 'high'
      ? `Provider ${providerName} consistently returned highly effective research results.`
      : `Provider ${providerName} consistently returned poor or failed research results.`;

    const evidence = events.map(e => ({
      source: e.source,
      sourceId: e.sourceId,
      timestamp: e.timestamp,
      outcome: e.outcome,
      confidence: LearningConfidenceEngine.calculateConfidence(1, 0, 1, 'high'),
      supportingObservations: e.observations,
      projectContext: e.context,
      provenance: { providerName },
      evidenceType: 'OBSERVED' as const
    }));

    return {
      id: `re-${Date.now()}-${providerName}`,
      type: 'research_effectiveness',
      scope: 'provider',
      statement,
      evidence,
      confidence: LearningConfidenceEngine.calculateConfidence(evidence.length, 0, 1, 'high'),
      status: 'candidate' as KnowledgeStatus,
      provenance: { generator: 'ResearchEffectiveness' },
      createdAt: new Date().toISOString(),
      lastValidatedAt: new Date().toISOString()
    };
  }
}
