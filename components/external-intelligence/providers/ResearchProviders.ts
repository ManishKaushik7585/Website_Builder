import { ResearchProvider, ResearchEvidence } from '../../../config/external-intelligence';
import { ExternalIntelligenceValidator } from '../../../registry/external-intelligence-validator';

export interface IWebSearchProvider {
  search(query: string): Promise<ResearchEvidence[]>;
}

export interface IWebsiteAnalysisProvider {
  extract(url: string): Promise<ResearchEvidence[]>;
}

// Mock implementation of Tavily / Firecrawl to preserve zero-dependency philosophy
// while satisfying the architectural boundaries.
export class MockTavilyProvider implements IWebSearchProvider {
  async search(query: string): Promise<ResearchEvidence[]> {
    const sanitizedQuery = ExternalIntelligenceValidator.sanitizeText(query);
    return [
      {
        id: `ev-tavily-${Date.now()}`,
        type: 'observed',
        claim: `Search results for ${sanitizedQuery} indicate a strong trend towards minimalist design.`,
        source: 'Mock Tavily Search API',
        provenance: { sourceUrl: 'https://api.tavily.com/search', provider: 'tavily', query: sanitizedQuery, timestamp: new Date().toISOString() },
        confidence: 'high',
        freshness: 'fresh',
        relevance: 0.9,
        observedAt: new Date().toISOString(),
        evidence: 'Multiple top ranking sites use extensive whitespace.',
        tags: ['minimalism', 'layout']
      }
    ];
  }
}

export class MockFirecrawlProvider implements IWebsiteAnalysisProvider {
  async extract(url: string): Promise<ResearchEvidence[]> {
    return [
      {
        id: `ev-firecrawl-${Date.now()}`,
        type: 'observed',
        claim: `Extracted structure from ${url} reveals a fixed header navigation pattern.`,
        source: 'Mock Firecrawl Extractor',
        provenance: { sourceUrl: url, provider: 'firecrawl', timestamp: new Date().toISOString() },
        confidence: 'high',
        freshness: 'fresh',
        relevance: 0.85,
        observedAt: new Date().toISOString(),
        evidence: 'Found <header style="position: fixed"> on the target URL.',
        tags: ['navigation', 'header', 'pattern']
      }
    ];
  }
}
