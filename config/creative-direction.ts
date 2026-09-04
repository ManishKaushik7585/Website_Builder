export interface CreativeDirectionProvenance {
  sourceId: string;
  sourceType: 'user_brief' | 'adaptive_memory' | 'external_research' | 'project_constraint' | 'system_default';
  metadata?: Record<string, any>;
}

export interface CreativeReference {
  sourceId: string;
  sourceType: string;
  title?: string;
  url?: string;
  relevance: number;
  extractedPattern: string;
  whyRelevant: string;
  license?: string;
  attributionRequired?: boolean;
  allowedUse: 'inspiration' | 'pattern_abstraction' | 'technical_reference' | 'direct_implementation' | 'copyrighted_asset';
  doNotCopy: string;
}

export interface CreativeDirectionEvidence {
  id: string;
  description: string;
  provenance: CreativeDirectionProvenance;
  weight: number;
}

export interface CreativeDirectionRationale {
  summary: string;
  keyDrivers: string[];
  evidenceIds: string[];
}

export interface CreativeDirectionConfidence {
  overall: number; // 0.0 to 1.0
  visualIdentity: number;
  typography: number;
  color: number;
  layout: number;
  motion: number;
  imagery: number;
  responsive: number;
  evidenceCount: number;
  uncertaintyReasons: string[];
}

export interface CreativeDirectionConstraint {
  id: string;
  type: 'hard' | 'soft' | 'opportunity';
  description: string;
  source: CreativeDirectionProvenance;
}

export interface PageRoleDirection {
  role: string;
  visualPriority: 'high' | 'medium' | 'low';
  hierarchy: string[];
  contentDensity: 'minimal' | 'balanced' | 'dense';
  heroTreatment: string;
  interactionIntensity: 'subtle' | 'moderate' | 'high';
  motionIntensity: 'none' | 'subtle' | 'moderate' | 'high';
  imageryRole: string;
  conversionPriority: 'primary' | 'secondary' | 'none';
  differentiation: string;
}

export interface CreativeDecisionTrace {
  decisionId: string;
  decision: string;
  reason: string;
  evidenceIds: string[];
  affectedSitePlanAreas: string[];
}

export interface CreativeDirectionAlternative {
  id: string;
  name: string;
  identity: string;
  strengths: string[];
  risks: string[];
  bestFitConditions: string[];
  supportingEvidenceIds: string[];
  technicalImplications: string[];
  score?: number; // Calculated later
}

export interface CreativeDirectionContract {
  id: string;
  version: string;
  projectId: string;
  status: 'draft' | 'validated' | 'rejected';

  visualIdentity: {
    personality: string[];
    emotionalTone: string[];
    aestheticDirection: string;
    visualLanguage: string[];
    differentiation: string;
  };

  artDirection: {
    direction: string;
    composition: string[];
    visualDevices: string[];
    density: 'minimal' | 'balanced' | 'dense';
    focalPointStrategy: string;
  };

  typography: {
    displayDirection: string;
    bodyDirection: string;
    hierarchy: string;
    scaleStrategy: string;
    weightStrategy: string;
    readabilityPriority: string;
  };

  color: {
    strategy: string;
    primaryRole: string;
    accentRole: string;
    neutralStrategy: string;
    contrastStrategy: string;
  };

  layout: {
    philosophy: string;
    gridStrategy: string;
    spacingStrategy: string;
    sectionRhythm: string;
    whitespaceStrategy: string;
  };

  components: {
    personality: string;
    shapeLanguage: string;
    surfaceTreatment: string;
    borderStrategy: string;
    depthStrategy: string;
  };

  interaction: {
    philosophy: string;
    feedbackIntensity: string;
    interactionPatterns: string[];
  };

  motion: {
    philosophy: string;
    intensity: string;
    transitionStrategy: string;
    entranceStrategy: string;
    interactionMotion: string;
  };

  imagery: {
    strategy: string;
    photographyDirection?: string;
    illustrationDirection?: string;
    imageTreatment?: string;
  };

  threeD: {
    recommended: boolean;
    role?: string;
    intensity?: string;
  };

  responsive: {
    philosophy: string;
    mobilePriority: string;
    layoutAdaptation: string;
  };

  accessibility: {
    priorities: string[];
    risks: string[];
  };

  pageRoles: PageRoleDirection[];
  references: CreativeReference[];
  antiPatterns: string[];
  constraints: CreativeDirectionConstraint[];
  decisionTrace: CreativeDecisionTrace[];
  
  alternatives?: CreativeDirectionAlternative[];
  selectedDirection: string;

  rationale: CreativeDirectionRationale;
  confidence: CreativeDirectionConfidence;
  researchGaps: string[];
  provenance: CreativeDirectionProvenance;

  createdAt: string;
  updatedAt: string;
}
