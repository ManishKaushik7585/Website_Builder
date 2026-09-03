export type ResearchProvider = 'tavily' | 'firecrawl' | 'unsplash' | 'google-fonts' | 'iconify' | 'mock-provider' | 'github' | 'design-reference' | 'shadcn' | 'daisyui' | '21st-dev' | 'taste-skill' | 'mcp-registry';

export type ProviderCategory = 'WEB_SEARCH' | 'WEB_EXTRACTION' | 'GITHUB' | 'DESIGN_REFERENCE' | 'MCP_REGISTRY' | 'UI_LIBRARY' | 'DOCUMENTATION' | 'PATTERN_SOURCE';

export type ProviderStatus = 'AVAILABLE' | 'CONFIGURED' | 'UNAVAILABLE' | 'RATE_LIMITED' | 'FAILED' | 'LIMITED';

export type ProviderCostModel = 'FREE' | 'PAID' | 'FREEMIUM';

export type ProviderCapability = 'search' | 'extract' | 'inspect-repo' | 'extract-patterns' | 'discover-mcp';

export type ProviderSourceType = 'public' | 'private' | 'authenticated';

export type LicenseStatus = 'OPEN_SOURCE' | 'PERMISSIVE' | 'COPYLEFT' | 'RESTRICTIVE' | 'UNKNOWN' | 'NO_LICENSE';

export type ResearchDepth = 'NONE' | 'MINIMAL' | 'TARGETED' | 'DEEP';

export type MCPCapabilityState = 'DISCOVERED' | 'ASSESSED' | 'AVAILABLE' | 'CONFIGURED' | 'AUTHORIZED' | 'EXECUTABLE' | 'BLOCKED';

export type ResearchEvidenceType = 'observed' | 'inferred' | 'recommended';

export type ResearchConfidence = 'very_high' | 'high' | 'medium' | 'low';

export type ResearchDecisionStatus = 'adopted' | 'rejected' | 'deferred' | 'unresolved';

export type ExternalIntelligenceStatus = 'complete' | 'partial' | 'unverified' | 'blocked';

export type ResearchObjective = 'design-trends' | 'typography' | 'ux-patterns' | 'asset-discovery' | 'web-standards' | 'technology-dependencies' | 'component-architecture' | 'engineering-patterns';

export interface ResearchBudget {
  maximumSearchQueries: number;
  maximumSources: number;
  maximumPages: number;
  maximumResearchTimeMs: number;
  maximumEvidenceItems: number;
  maximumResearchIterations: number;
  maximumGithubRequests: number;
  maximumDesignReferences: number;
  maximumMcpDiscoveries: number;
}

export interface ResearchProvenance {
  sourceUrl: string;
  provider: ResearchProvider;
  query?: string;
  timestamp: string;
  licenseStatus?: LicenseStatus;
  reuseStatus?: 'INSPIRATION' | 'REFERENCE' | 'OPEN_SOURCE_REUSE' | 'UNKNOWN_LICENSE' | 'RESTRICTED_REUSE';
}

export interface ResearchEvidence {
  id: string;
  type: ResearchEvidenceType;
  claim: string;
  source: string;
  provenance: ResearchProvenance;
  confidence: ResearchConfidence;
  freshness: 'fresh' | 'recent' | 'stale' | 'expired';
  relevance: number; // 0.0 to 1.0
  observedAt: string;
  evidence: string;
  tags: string[];
}

export interface DesignPattern {
  patternId: string;
  category: string;
  description: string;
  characteristics: string[];
  layoutLogic: string;
  responsiveConsiderations: string[];
  motionConsiderations: string[];
  accessibilityConsiderations: string[];
  suitableIndustries: string[];
  sourceReferences: string[];
  confidence: number;
  licenseStatus: LicenseStatus;
}

export interface EngineeringPattern {
  patternId: string;
  category: string;
  description: string;
  characteristics: string[];
  sourceReferences: string[];
  confidence: number;
  licenseStatus: LicenseStatus;
}

export interface MCPCapability {
  server: string;
  capability: string;
  purpose: string;
  source: string;
  installationMethod?: string;
  authenticationRequirement: string;
  freeClassification: 'FREE' | 'PAID' | 'FREEMIUM';
  trustLevel: 'high' | 'medium' | 'low' | 'unknown';
  relevance: number;
  compatibility: string;
  license: string;
  state: MCPCapabilityState;
}

export interface ResearchDecision {
  id: string;
  decision: string;
  reason: string;
  evidenceId: string;
  confidence: number;
  source: string;
  status: ResearchDecisionStatus;
}

export interface ResearchConstraint {
  id: string;
  description: string;
  source: string;
  severity: 'high' | 'medium' | 'low';
}

export interface ResearchUncertainty {
  domain: string;
  confidenceScore: number;
  researchPriority: ResearchDepth;
}

export interface ResearchMemory {
  projectId: string;
  references: {
    websites: string[];
    articles: string[];
    documentation: string[];
    assets: string[];
    githubRepositories: string[];
  };
  evidence: {
    observed: ResearchEvidence[];
    inferred: ResearchEvidence[];
    recommended: ResearchEvidence[];
  };
  designPatterns: DesignPattern[];
  engineeringPatterns: EngineeringPattern[];
  toolCapabilities: MCPCapability[];
  decisions: {
    adopted: ResearchDecision[];
    rejected: ResearchDecision[];
    deferred: ResearchDecision[];
  };
  constraints: ResearchConstraint[];
  uncertainties: ResearchUncertainty[];
}

export interface ExternalIntelligenceResult {
  status: ExternalIntelligenceStatus;
  memory: ResearchMemory;
  diagnoses: any[];
  critique: string[];
  budgetConsumed: {
    queries: number;
    sources: number;
    pages: number;
    githubRequests: number;
    designReferences: number;
    mcpDiscoveries: number;
    timeMs: number;
    iterations: number;
  };
}
