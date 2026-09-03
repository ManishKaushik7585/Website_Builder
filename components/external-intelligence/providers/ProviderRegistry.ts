import { 
  ResearchProvider, 
  ProviderCategory, 
  ProviderStatus, 
  ProviderCapability, 
  ProviderCostModel, 
  ProviderSourceType 
} from '../../../config/external-intelligence';

export interface ProviderRegistration {
  id: ResearchProvider;
  name: string;
  category: ProviderCategory;
  status: ProviderStatus;
  capabilities: ProviderCapability[];
  costModel: ProviderCostModel;
  sourceType: ProviderSourceType;
  requiresApiKey: boolean;
  supportsPublicAccess: boolean;
  supportsStructuredExtraction: boolean;
  supportsDesignResearch: boolean;
  supportsEngineeringResearch: boolean;
  supportsRepositoryInspection: boolean;
  supportsMCPDiscovery: boolean;
}

export class ProviderRegistry {
  private static providers: Map<ResearchProvider, ProviderRegistration> = new Map();

  static register(provider: ProviderRegistration) {
    this.providers.set(provider.id, provider);
  }

  static getProvider(id: ResearchProvider): ProviderRegistration | undefined {
    return this.providers.get(id);
  }

  static getAvailableProviders(category?: ProviderCategory): ProviderRegistration[] {
    const list = Array.from(this.providers.values());
    return list.filter(p => {
      const isAvailable = p.status === 'AVAILABLE' || p.status === 'CONFIGURED' || p.status === 'LIMITED';
      if (!isAvailable) return false;
      if (category && p.category !== category) return false;
      return true;
    });
  }

  static updateStatus(id: ResearchProvider, status: ProviderStatus) {
    const p = this.providers.get(id);
    if (p) {
      p.status = status;
      this.providers.set(id, p);
    }
  }

  static initializeDefaults() {
    this.register({
      id: 'github',
      name: 'GitHub Public API',
      category: 'GITHUB',
      status: 'AVAILABLE',
      capabilities: ['inspect-repo', 'extract-patterns'],
      costModel: 'FREE',
      sourceType: 'public',
      requiresApiKey: false,
      supportsPublicAccess: true,
      supportsStructuredExtraction: true,
      supportsDesignResearch: true,
      supportsEngineeringResearch: true,
      supportsRepositoryInspection: true,
      supportsMCPDiscovery: true
    });

    this.register({
      id: 'tavily',
      name: 'Tavily Search API',
      category: 'WEB_SEARCH',
      status: process.env.TAVILY_API_KEY ? 'CONFIGURED' : 'UNAVAILABLE',
      capabilities: ['search'],
      costModel: 'PAID',
      sourceType: 'authenticated',
      requiresApiKey: true,
      supportsPublicAccess: false,
      supportsStructuredExtraction: false,
      supportsDesignResearch: true,
      supportsEngineeringResearch: true,
      supportsRepositoryInspection: false,
      supportsMCPDiscovery: false
    });

    this.register({
      id: 'firecrawl',
      name: 'Firecrawl Extraction API',
      category: 'WEB_EXTRACTION',
      status: process.env.FIRECRAWL_API_KEY ? 'CONFIGURED' : 'UNAVAILABLE',
      capabilities: ['extract'],
      costModel: 'PAID',
      sourceType: 'authenticated',
      requiresApiKey: true,
      supportsPublicAccess: false,
      supportsStructuredExtraction: true,
      supportsDesignResearch: true,
      supportsEngineeringResearch: true,
      supportsRepositoryInspection: false,
      supportsMCPDiscovery: false
    });

    this.register({
      id: 'design-reference',
      name: 'Design Reference Inspector',
      category: 'DESIGN_REFERENCE',
      status: 'AVAILABLE',
      capabilities: ['extract', 'extract-patterns'],
      costModel: 'FREE',
      sourceType: 'public',
      requiresApiKey: false,
      supportsPublicAccess: true,
      supportsStructuredExtraction: true,
      supportsDesignResearch: true,
      supportsEngineeringResearch: false,
      supportsRepositoryInspection: false,
      supportsMCPDiscovery: false
    });

    this.register({
      id: 'mcp-registry',
      name: 'MCP Discovery Registry',
      category: 'MCP_REGISTRY',
      status: 'AVAILABLE',
      capabilities: ['discover-mcp'],
      costModel: 'FREE',
      sourceType: 'public',
      requiresApiKey: false,
      supportsPublicAccess: true,
      supportsStructuredExtraction: true,
      supportsDesignResearch: false,
      supportsEngineeringResearch: true,
      supportsRepositoryInspection: true,
      supportsMCPDiscovery: true
    });

    this.register({
      id: 'shadcn',
      name: 'shadcn/ui Intelligence',
      category: 'UI_LIBRARY',
      status: 'AVAILABLE',
      capabilities: ['extract-patterns'],
      costModel: 'FREE',
      sourceType: 'public',
      requiresApiKey: false,
      supportsPublicAccess: true,
      supportsStructuredExtraction: true,
      supportsDesignResearch: true,
      supportsEngineeringResearch: true,
      supportsRepositoryInspection: false,
      supportsMCPDiscovery: false
    });

    this.register({
      id: 'daisyui',
      name: 'daisyUI Intelligence',
      category: 'UI_LIBRARY',
      status: 'AVAILABLE',
      capabilities: ['extract-patterns'],
      costModel: 'FREE',
      sourceType: 'public',
      requiresApiKey: false,
      supportsPublicAccess: true,
      supportsStructuredExtraction: true,
      supportsDesignResearch: true,
      supportsEngineeringResearch: true,
      supportsRepositoryInspection: false,
      supportsMCPDiscovery: false
    });

    this.register({
      id: '21st-dev',
      name: '21st.dev MCP Intelligence',
      category: 'UI_LIBRARY',
      status: 'CONFIGURED',
      capabilities: ['extract-patterns'],
      costModel: 'FREE',
      sourceType: 'public',
      requiresApiKey: false,
      supportsPublicAccess: true,
      supportsStructuredExtraction: true,
      supportsDesignResearch: true,
      supportsEngineeringResearch: true,
      supportsRepositoryInspection: false,
      supportsMCPDiscovery: false
    });

    this.register({
      id: 'taste-skill',
      name: 'Taste Skill Capability',
      category: 'UI_LIBRARY',
      status: 'UNAVAILABLE',
      capabilities: ['extract-patterns'],
      costModel: 'FREE',
      sourceType: 'public',
      requiresApiKey: false,
      supportsPublicAccess: true,
      supportsStructuredExtraction: false,
      supportsDesignResearch: true,
      supportsEngineeringResearch: false,
      supportsRepositoryInspection: false,
      supportsMCPDiscovery: false
    });
  }
}
