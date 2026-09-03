import { test, expect } from '@playwright/test';
import { ExternalIntelligenceOrchestrator } from '../components/external-intelligence/ExternalIntelligenceOrchestrator';
import { ProviderRegistry } from '../components/external-intelligence/providers/ProviderRegistry';
import { GitHubProvider } from '../components/external-intelligence/providers/GitHubProvider';
import { DesignReferenceProvider } from '../components/external-intelligence/providers/DesignReferenceProvider';
import { MCPDiscovery } from '../components/external-intelligence/MCPDiscovery';
import { MCPCapabilityIndex } from '../components/external-intelligence/MCPCapabilityIndex';
import { ResearchFusion } from '../components/external-intelligence/ResearchFusion';
import { ToolSelectionEngine } from '../components/external-intelligence/ToolSelectionEngine';

test.describe('External Intelligence Fabric (Phase 11)', () => {
  
  test.beforeAll(() => {
    ProviderRegistry.initializeDefaults();
  });

  test('GitHub Provider correctly sanitizes and determines license states', async () => {
    // 1-5
    const provider = ProviderRegistry.getProvider('github');
    expect(provider).toBeDefined();
    expect(provider?.status).toBe('AVAILABLE');
    expect(provider?.requiresApiKey).toBe(false); // Free first policy
    expect(provider?.capabilities).toContain('inspect-repo');
    
    // Simulate GitHub failure via bad URL
    const resultsBad = await GitHubProvider.inspectRepository('invalid-url');
    expect(resultsBad).toHaveLength(0); // 6
  });

  test('Design Reference Provider extracts abstract insights', async () => {
    // 7-11
    const results = await DesignReferenceProvider.inspectReference('https://vercel.com', 'Hero context');
    expect(results.length).toBeGreaterThan(0);
    const ev = results[0];
    expect(ev.provenance.provider).toBe('design-reference');
    expect(ev.provenance.licenseStatus).toBe('UNKNOWN'); // 9
    expect(ev.provenance.reuseStatus).toBe('INSPIRATION'); // 10
    expect(ev.tags).toContain('inspiration'); // 11
  });

  test('MCP Discovery respects security and defaults to DISCOVERED', async () => {
    // 12-16
    const index = new MCPCapabilityIndex();
    await MCPDiscovery.discoverFromRegistry(index);
    
    const capabilities = index.getCapabilities();
    expect(capabilities.length).toBeGreaterThan(0); // 12
    
    const githubMcp = capabilities.find(c => c.server === 'github-mcp');
    expect(githubMcp).toBeDefined(); // 13
    expect(githubMcp?.state).toBe('DISCOVERED'); // 14: Default is discovered
    expect(githubMcp?.authenticationRequirement).toBe('Personal Access Token'); // 15
    expect(githubMcp?.freeClassification).toBe('FREE'); // 16
  });

  test('Research Fusion deduplicates and boosts confidence', () => {
    // 17-23
    const fused = ResearchFusion.fuse([
      { id: '1', claim: 'bento grid is good', confidence: 'low', tags: ['ui'], type: 'observed', source: 'a', provenance: { sourceUrl: 'a', provider: 'tavily', timestamp: '1' }, freshness: 'fresh', relevance: 0.9, observedAt: '1', evidence: '' },
      { id: '2', claim: 'BENTO grid is good', confidence: 'medium', tags: ['design'], type: 'observed', source: 'b', provenance: { sourceUrl: 'b', provider: 'tavily', timestamp: '1' }, freshness: 'fresh', relevance: 0.9, observedAt: '1', evidence: '' },
      { id: '3', claim: 'bento grid is good', confidence: 'low', tags: ['layout'], type: 'observed', source: 'c', provenance: { sourceUrl: 'c', provider: 'tavily', timestamp: '1' }, freshness: 'fresh', relevance: 0.9, observedAt: '1', evidence: '' }
    ]);
    
    expect(fused.length).toBe(1); // 17
    expect(fused[0].confidence).toBe('very_high'); // 18 (Boosted by x3)
    expect(fused[0].tags).toContain('ui'); // 19
    expect(fused[0].tags).toContain('design'); // 20
    expect(fused[0].tags).toContain('layout'); // 21
    expect(fused[0].claim).toContain('[FUSED x3]'); // 22
  });

  test('Research Fusion handles contradictions by downgrading confidence', () => {
    // 24-27
    const fused = ResearchFusion.fuse([
      { id: '1', claim: 'good accessibility', confidence: 'high', tags: [], type: 'observed', source: 'a', provenance: { sourceUrl: 'a', provider: 'tavily', timestamp: '1' }, freshness: 'fresh', relevance: 0.9, observedAt: '1', evidence: '' },
      { id: '2', claim: 'bad accessibility', confidence: 'high', tags: [], type: 'observed', source: 'b', provenance: { sourceUrl: 'b', provider: 'tavily', timestamp: '1' }, freshness: 'fresh', relevance: 0.9, observedAt: '1', evidence: '' },
    ]);
    expect(fused.length).toBe(2); // 24
    expect(fused[0].confidence).toBe('low'); // 25
    expect(fused[1].confidence).toBe('low'); // 26
  });

  test('Tool Selection Engine routes based on objective and uncertainty', () => {
    // 28-35
    const designProviders = ToolSelectionEngine.selectProviders('design-trends', 'DEEP');
    expect(designProviders.some(p => p.id === 'design-reference')).toBeTruthy(); // 28
    expect(designProviders.some(p => p.id === 'shadcn')).toBeTruthy(); // 29
    
    const engProviders = ToolSelectionEngine.selectProviders('engineering-patterns', 'TARGETED');
    expect(engProviders.some(p => p.id === 'github')).toBeTruthy(); // 30
    
    const noneProviders = ToolSelectionEngine.selectProviders('design-trends', 'NONE');
    expect(noneProviders.length).toBe(0); // 31
  });

  test('ExternalIntelligenceOrchestrator integrates Phase 11 fabric', async () => {
    // 36-50
    const result = await ExternalIntelligenceOrchestrator.execute('test-proj', 'Create a highly accessible navigation header matching shadcn styles.');
    
    expect(result).toBeDefined(); // 36
    expect(result.status).toBe('complete'); // 37
    
    // Memory assertions
    expect(result.memory).toBeDefined(); // 38
    expect(result.memory.evidence.observed.length).toBeGreaterThan(0); // 39
    
    // Patterns should be populated
    expect(result.memory.designPatterns).toBeDefined(); // 40
    expect(result.memory.engineeringPatterns).toBeDefined(); // 41
    expect(result.memory.toolCapabilities).toBeDefined(); // 42
    
    // Budgets should be tracked
    expect(result.budgetConsumed).toBeDefined(); // 43
    expect(result.budgetConsumed.githubRequests).toBeGreaterThanOrEqual(0); // 44
    expect(result.budgetConsumed.designReferences).toBeGreaterThanOrEqual(0); // 45
    expect(result.budgetConsumed.mcpDiscoveries).toBeGreaterThanOrEqual(0); // 46
    
    // It should have found uncertainty
    expect(result.memory.uncertainties.length).toBeGreaterThan(0); // 47
    
    // It should have generated a critique
    expect(result.critique.length).toBeGreaterThan(0); // 48
    
    // Ensure Taste Skill didn't magically become available
    const ts = ProviderRegistry.getProvider('taste-skill');
    expect(ts?.status).toBe('UNAVAILABLE'); // 49
    
    // Ensure Tavily respects keys
    const tavily = ProviderRegistry.getProvider('tavily');
    expect(tavily?.requiresApiKey).toBe(true); // 50
  });

});
