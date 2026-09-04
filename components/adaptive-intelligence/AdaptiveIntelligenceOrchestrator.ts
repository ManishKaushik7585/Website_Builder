import { 
  AdaptiveIntelligenceContext, 
  AdaptiveIntelligenceResult, 
  MemoryPolicy,
  KnowledgeCandidate,
  AdaptiveKnowledge
} from '../../config/adaptive-intelligence';
import { AdaptiveMemoryStoreInstance } from './AdaptiveMemory';
import { OutcomeExtractor, RawOutcomeEvent } from './OutcomeExtractor';
import { LearningAnalyzer } from './LearningAnalyzer';
import { KnowledgeConflictResolver } from './KnowledgeConflictResolver';
import { KnowledgeDecay } from './KnowledgeDecay';
import { KnowledgePromotion } from './KnowledgePromotion';
import { AdaptiveRecommendationEngine } from './AdaptiveRecommendationEngine';
import { AdaptiveFusion } from './AdaptiveFusion';
import { AdaptiveSelfCritique } from './AdaptiveSelfCritique';
import { AdaptiveIntelligenceValidator } from '../../registry/adaptive-intelligence-validator';
import { FailureMemory } from './FailureMemory';
import { ResearchEffectiveness } from './ResearchEffectiveness';
import { DesignPatternLearning } from './DesignPatternLearning';

const DEFAULT_POLICY: MemoryPolicy = {
  retentionDays: 30,
  decayRate: 0.1,
  minimumConfidenceThreshold: 'medium',
  conflictResolutionStrategy: 'contextual',
  maximumMemorySize: 1000,
  projectGlobalSeparation: true,
  promotionThresholds: {
    minimumObservations: 3,
    minimumIndependentProjects: 2
  }
};

export class AdaptiveIntelligenceOrchestrator {
  
  static async extractAndLearn(
    projectId: string, 
    results: { quality?: any, convergence?: any, siteAcceptance?: any, release?: any, deployment?: any, research?: any }
  ): Promise<void> {
    const events: RawOutcomeEvent[] = [];

    if (results.quality) events.push(OutcomeExtractor.extractFromQuality(projectId, 'page-1', results.quality));
    if (results.convergence) events.push(OutcomeExtractor.extractFromConvergence(projectId, 'page-1', results.convergence));
    if (results.siteAcceptance) events.push(OutcomeExtractor.extractFromSiteAcceptance(projectId, results.siteAcceptance));
    if (results.release) events.push(OutcomeExtractor.extractFromRelease(projectId, results.release));
    if (results.deployment) events.push(OutcomeExtractor.extractFromDeployment(projectId, results.deployment));
    if (results.research) events.push(OutcomeExtractor.extractFromResearch(projectId, results.research));

    const candidates = [
      ...LearningAnalyzer.analyzeOutcomes(events),
      ...FailureMemory.extractFailurePatterns(events),
      ...DesignPatternLearning.extractDesignPatterns(events)
    ];

    if (results.research && results.research.memory?.provenance?.providerName) {
      const providerCandidate = ResearchEffectiveness.evaluateProvider(results.research.memory.provenance.providerName, events);
      if (providerCandidate) candidates.push(providerCandidate);
    }

    const existingKnowledge = (await AdaptiveMemoryStoreInstance.search({})) as AdaptiveKnowledge[];

    for (const candidate of candidates) {
      if (AdaptiveIntelligenceValidator.validateCandidate(candidate)) {
        
        const conflicts = KnowledgeConflictResolver.detectConflicts(candidate, existingKnowledge);
        if (conflicts.length === 0 || DEFAULT_POLICY.conflictResolutionStrategy === 'contextual') {
          // Check for promotion
          const promoted = KnowledgePromotion.evaluatePromotion(candidate, DEFAULT_POLICY);
          if (promoted) {
            await AdaptiveMemoryStoreInstance.insert(promoted);
          } else {
            await AdaptiveMemoryStoreInstance.insert(candidate);
          }
        } else {
          candidate.status = 'rejected';
          candidate.provenance.rejectReason = 'Unresolvable conflict';
          await AdaptiveMemoryStoreInstance.insert(candidate);
        }
      }
    }
  }

  static async getAdaptiveContext(projectId: string, currentContext: any): Promise<AdaptiveIntelligenceResult> {
    const allKnowledge = await AdaptiveMemoryStoreInstance.search({});
    
    // Decay
    const decayedKnowledge = KnowledgeDecay.evaluateDecay(allKnowledge as AdaptiveKnowledge[], DEFAULT_POLICY);
    for (const k of decayedKnowledge) {
      if (k.status === 'expired') {
        await AdaptiveMemoryStoreInstance.expire(k.id);
      } else {
        await AdaptiveMemoryStoreInstance.insert(k); // update
      }
    }

    const activeKnowledge = (await AdaptiveMemoryStoreInstance.search({ status: 'active' })) as AdaptiveKnowledge[];
    
    // Recommendations
    const rawRecommendations = AdaptiveRecommendationEngine.generateRecommendations(activeKnowledge, currentContext);
    
    // Self Critique
    const critiquedRecommendations = AdaptiveSelfCritique.evaluateRecommendations(rawRecommendations);
    
    // Security Validation
    const validatedRecommendations = critiquedRecommendations
      .map(r => AdaptiveIntelligenceValidator.sanitizeRecommendation(r))
      .filter(Boolean) as any;

    const failureSignals = activeKnowledge.filter(k => k.type === 'failure_pattern');
    const researchEffectivenessCandidates = activeKnowledge.filter(k => k.type === 'research_effectiveness');

    const context = AdaptiveFusion.fuseContext(
      projectId,
      activeKnowledge,
      validatedRecommendations,
      failureSignals,
      researchEffectivenessCandidates
    );

    return {
      status: 'active',
      context,
      outcomes: [], // simplified for response
      knowledgeCandidates: allKnowledge.filter(k => k.status === 'candidate'),
      activeKnowledge,
      recommendations: validatedRecommendations,
      failureSignals: failureSignals.map(f => f.statement),
      researchEffectiveness: context.researchEffectiveness,
      conflicts: [],
      staleKnowledge: allKnowledge.filter(k => k.status === 'expired'),
      rejectedKnowledge: allKnowledge.filter(k => k.status === 'rejected'),
      promotionEvents: [],
      decayEvents: [],
      learningSummary: `Adaptive intelligence generated ${validatedRecommendations.length} recommendations from ${activeKnowledge.length} active knowledge pieces.`,
      confidence: 'medium',
      provenance: { orchestrator: 'AdaptiveIntelligenceOrchestrator' },
      selfCritique: []
    };
  }
}
