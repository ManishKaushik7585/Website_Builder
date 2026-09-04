import { ExternalIntelligenceResult, ExternalIntelligenceStatus, ResearchEvidence } from '../../config/external-intelligence';
import { ResearchMemoryManager } from './ResearchMemory';
import { ResearchBudgetManager } from './ResearchBudget';
import { ResearchDecisionEngine } from './ResearchDecisionEngine';
import { ResearchFusion } from './ResearchFusion';
import { ResearchSelfCritique } from './ResearchSelfCritique';
import { ProviderRegistry } from './providers/ProviderRegistry';
import { GitHubProvider } from './providers/GitHubProvider';
import { DesignReferenceProvider } from './providers/DesignReferenceProvider';
import { UIProviders } from './providers/UIProviders';
import { MockTavilyProvider, MockFirecrawlProvider } from './providers/ResearchProviders';
import { MCPCapabilityIndex } from './MCPCapabilityIndex';
import { MCPDiscovery } from './MCPDiscovery';
import { ToolSelectionEngine } from './ToolSelectionEngine';
import { DesignPatternExtractor } from './DesignPatternExtractor';
import { EngineeringPatternExtractor } from './EngineeringPatternExtractor';

export class ExternalIntelligenceOrchestrator {
  
  static async execute(projectId: string, brief: string, adaptiveContext?: any): Promise<ExternalIntelligenceResult> {
    ProviderRegistry.initializeDefaults();
    
    const memory = new ResearchMemoryManager(projectId);
    // Expand budget constructor to inject phase 11 limits if needed (handled in config)
    const budget = new ResearchBudgetManager();
    const diagnoses: any[] = [];
    const rawEvidences: ResearchEvidence[] = [];
    
    // 1. Uncertainty Analysis & Decision
    const uncertainties = ResearchDecisionEngine.analyzeUncertainty(brief);
    uncertainties.forEach(u => memory.getMemory().uncertainties.push(u));
    
    // 2. Setup indices
    const mcpIndex = new MCPCapabilityIndex();
    
    for (const uncertainty of uncertainties) {
      if (uncertainty.researchPriority === 'NONE') continue;
      
      const objective = (uncertainty.domain === 'navigation' || uncertainty.domain === 'typography') ? 'design-trends' : 'engineering-patterns';
      
      // 3. Tool Selection
      const providers = ToolSelectionEngine.selectProviders(objective, uncertainty.researchPriority, adaptiveContext);
      
      for (const provider of providers) {
        try {
          if (provider.id === 'github' && !budget.isExhausted()) {
            const ev = await GitHubProvider.inspectRepository('https://github.com/sindresorhus/awesome');
            rawEvidences.push(...ev);
            budget.getConsumed().githubRequests = (budget.getConsumed().githubRequests || 0) + 1;
          } 
          else if (provider.id === 'design-reference' && !budget.isExhausted()) {
            const ev = await DesignReferenceProvider.inspectReference('https://vercel.com', 'Hero layout inspiration');
            rawEvidences.push(...ev);
            budget.getConsumed().designReferences = (budget.getConsumed().designReferences || 0) + 1;
          }
          else if (provider.id === 'shadcn' && !budget.isExhausted()) {
            const ev = await UIProviders.extractShadcnIntelligence('button');
            rawEvidences.push(...ev);
          }
          else if (provider.id === 'daisyui' && !budget.isExhausted()) {
            const ev = await UIProviders.extractDaisyUIIntelligence('card');
            rawEvidences.push(...ev);
          }
          else if (provider.id === '21st-dev' && !budget.isExhausted()) {
            const ev = await UIProviders.query21stDev('hero section');
            rawEvidences.push(...ev);
          }
          else if (provider.id === 'mcp-registry' && !budget.isExhausted()) {
            await MCPDiscovery.discoverFromRegistry(mcpIndex);
            budget.getConsumed().mcpDiscoveries = (budget.getConsumed().mcpDiscoveries || 0) + 1;
          }
          else if (provider.id === 'tavily' && !budget.isExhausted()) {
            const tavily = new MockTavilyProvider();
            const results = await tavily.search(brief);
            rawEvidences.push(...results);
            budget.trackQuery();
          }
        } catch (e: any) {
          diagnoses.push({ code: 'RESEARCH_SOURCE_UNAVAILABLE', evidence: `${provider.id} error: ${e.message}` });
        }
      }
    }

    // 4. Fusion & Normalization
    const fusedEvidences = ResearchFusion.fuse(rawEvidences);
    fusedEvidences.forEach(ev => memory.addEvidence(ev));

    // 5. Pattern Extraction
    const designPatterns = DesignPatternExtractor.extract(fusedEvidences);
    designPatterns.forEach(p => memory.addDesignPattern(p));

    const engineeringPatterns = EngineeringPatternExtractor.extract(fusedEvidences);
    engineeringPatterns.forEach(p => memory.addEngineeringPattern(p));

    // 6. Capabilities
    mcpIndex.getCapabilities().forEach(cap => memory.addToolCapability(cap));

    let status: ExternalIntelligenceStatus = 'complete';
    if (fusedEvidences.length === 0) {
      status = 'unverified';
      diagnoses.push({ code: 'RESEARCH_LOW_CONFIDENCE', evidence: 'No relevant evidence found.' });
    }

    const result: ExternalIntelligenceResult = {
      status,
      memory: memory.getMemory(),
      diagnoses,
      critique: [],
      budgetConsumed: budget.getConsumed() as any
    };

    result.critique = ResearchSelfCritique.critique(result);

    return result;
  }
}

