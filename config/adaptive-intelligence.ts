export type LearningSource = 
  | 'generation' 
  | 'research' 
  | 'quality' 
  | 'convergence' 
  | 'site_acceptance' 
  | 'release' 
  | 'deployment' 
  | 'user_feedback' 
  | 'design_pattern' 
  | 'provider';

export type LearningOutcome = 
  | 'success' 
  | 'failure' 
  | 'partial' 
  | 'regression' 
  | 'improvement' 
  | 'rejected' 
  | 'abandoned' 
  | 'unknown';

export type KnowledgeType = 
  | 'design_pattern' 
  | 'engineering_pattern' 
  | 'research_pattern' 
  | 'generation_pattern' 
  | 'refinement_pattern' 
  | 'failure_pattern' 
  | 'provider_pattern' 
  | 'accessibility_pattern' 
  | 'performance_pattern' 
  | 'interaction_pattern' 
  | 'content_pattern' 
  | 'navigation_pattern'
  | 'research_effectiveness'
  | 'user_preference';

export type KnowledgeConfidence = 
  | 'very_low' 
  | 'low' 
  | 'medium' 
  | 'high' 
  | 'very_high';

export type KnowledgeStatus = 
  | 'candidate' 
  | 'validated' 
  | 'active' 
  | 'deprecated' 
  | 'superseded' 
  | 'rejected' 
  | 'expired'
  | 'invalidated';

export type LearningScope = 
  | 'component' 
  | 'section' 
  | 'page' 
  | 'site' 
  | 'industry' 
  | 'project_type' 
  | 'provider' 
  | 'global'
  | 'project';

export type EvidenceType = 'OBSERVED' | 'INFERRED' | 'CORRELATED' | 'CONFIRMED';

export interface LearningEvidence {
  source: LearningSource;
  sourceId: string;
  timestamp: string;
  outcome: LearningOutcome;
  confidence: KnowledgeConfidence;
  supportingObservations: string[];
  projectContext: any; // Ideally more strictly typed based on context
  provenance: any;
  evidenceType: EvidenceType;
}

export interface KnowledgeCandidate {
  id: string;
  type: KnowledgeType;
  scope: LearningScope;
  statement: string;
  evidence: LearningEvidence[];
  confidence: KnowledgeConfidence;
  status: KnowledgeStatus;
  provenance: any;
  createdAt: string;
  lastValidatedAt: string;
  expiresAt?: string;
}

export interface AdaptiveKnowledge extends KnowledgeCandidate {
  status: 'active' | 'validated';
}

export type LearningDecisionAction = 'accept' | 'reject' | 'defer' | 'deprecate' | 'supersede';

export interface LearningDecision {
  action: LearningDecisionAction;
  reason: string;
}

export interface LearningRecommendation {
  reason: string;
  confidence: KnowledgeConfidence;
  evidence: string;
  scope: LearningScope;
  applicability: any;
}

export interface AdaptiveIntelligenceContext {
  projectId: string;
  activeKnowledge: AdaptiveKnowledge[];
  recommendations: LearningRecommendation[];
  researchEffectiveness: Record<string, any>;
  failureSignals: any[];
}

export interface AdaptiveIntelligenceResult {
  status: 'active' | 'limited' | 'unverified' | 'disabled';
  context: AdaptiveIntelligenceContext;
  outcomes: any[];
  knowledgeCandidates: KnowledgeCandidate[];
  activeKnowledge: AdaptiveKnowledge[];
  recommendations: LearningRecommendation[];
  failureSignals: any[];
  researchEffectiveness: Record<string, any>;
  conflicts: any[];
  staleKnowledge: any[];
  rejectedKnowledge: any[];
  promotionEvents: any[];
  decayEvents: any[];
  learningSummary: string;
  confidence: KnowledgeConfidence;
  provenance: any;
  selfCritique: string[];
}

export interface MemoryPolicy {
  retentionDays: number;
  decayRate: number;
  minimumConfidenceThreshold: KnowledgeConfidence;
  conflictResolutionStrategy: 'contextual' | 'deprecate';
  maximumMemorySize: number;
  projectGlobalSeparation: boolean;
  promotionThresholds: {
    minimumObservations: number;
    minimumIndependentProjects: number;
  };
}
