import { KnowledgeCandidate, KnowledgeStatus } from '../../config/adaptive-intelligence';
import { RawOutcomeEvent } from './OutcomeExtractor';
import { LearningConfidenceEngine } from './LearningConfidence';

export class DesignPatternLearning {
  static extractDesignPatterns(events: RawOutcomeEvent[]): KnowledgeCandidate[] {
    const candidates: KnowledgeCandidate[] = [];
    
    // Look for success outcomes in quality or site_acceptance with specific design metadata
    const patternEvents = events.filter(e => 
      (e.source === 'quality' || e.source === 'site_acceptance') && 
      e.outcome === 'success' && 
      e.context?.designPattern
    );

    // Group by pattern
    const patternMap = new Map<string, RawOutcomeEvent[]>();
    for (const e of patternEvents) {
      const pattern = e.context.designPattern;
      const arr = patternMap.get(pattern) || [];
      arr.push(e);
      patternMap.set(pattern, arr);
    }

    for (const [pattern, evts] of patternMap.entries()) {
      const evidence = evts.map(e => ({
        source: e.source,
        sourceId: e.sourceId,
        timestamp: e.timestamp,
        outcome: e.outcome,
        confidence: LearningConfidenceEngine.calculateConfidence(1, 0, 1, 'high'),
        supportingObservations: e.observations,
        projectContext: e.context,
        provenance: { extractedPattern: pattern },
        evidenceType: 'OBSERVED' as const
      }));

      candidates.push({
        id: `dp-${Date.now()}-${pattern.replace(/[^a-zA-Z0-9]/g, '')}`,
        type: 'design_pattern',
        scope: 'project',
        statement: `The design pattern '${pattern}' successfully achieved quality and site acceptance.`,
        evidence,
        confidence: LearningConfidenceEngine.calculateConfidence(evidence.length, 0, 1, 'high'),
        status: 'candidate' as KnowledgeStatus,
        provenance: { generator: 'DesignPatternLearning' },
        createdAt: new Date().toISOString(),
        lastValidatedAt: new Date().toISOString()
      });
    }

    return candidates;
  }
}
