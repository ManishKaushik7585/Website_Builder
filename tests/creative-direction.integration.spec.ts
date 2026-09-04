import { test, expect } from '@playwright/test';
import { AdaptiveIntelligenceOrchestrator } from '../components/adaptive-intelligence/AdaptiveIntelligenceOrchestrator';
import { ExternalIntelligenceOrchestrator } from '../components/external-intelligence/ExternalIntelligenceOrchestrator';
import { CreativeDirectionOrchestrator } from '../components/creative-direction/CreativeDirectionOrchestrator';
import { AgentRuntime } from '../components/agent/AgentRuntime';

test.describe('Phase 13: Integration (Adaptive -> External -> Creative -> Project)', () => {

  test('Full intelligence boundary execution', async () => {
    const projectId = 'proj_integration_13';
    const brief = 'A modern web3 platform requiring high security, trust, and premium tech aesthetics.';

    // 1. Adaptive Intelligence
    const adaptiveContext = await AdaptiveIntelligenceOrchestrator.getAdaptiveContext(projectId, { brief });
    expect(adaptiveContext).toBeDefined();

    // 2. External Intelligence
    const researchContext = await ExternalIntelligenceOrchestrator.execute(projectId, brief, adaptiveContext);
    expect(researchContext).toBeDefined();

    // 3. Creative Direction
    const creativeDirection = await CreativeDirectionOrchestrator.execute(projectId, brief, adaptiveContext, researchContext, 'deterministic');
    
    expect(creativeDirection).toBeDefined();
    expect(creativeDirection.status).toBe('validated');
    expect(creativeDirection.confidence.overall).toBeGreaterThan(0);
    expect(creativeDirection.selectedDirection).toBeDefined();
    expect(creativeDirection.alternatives?.length).toBeGreaterThan(0);

    // 4. Agent Runtime (Project Intelligence -> Site Plan)
    // Run full generation flow to ensure it doesn't break
    const runtime = new AgentRuntime();
    const result = await runtime.executeGenerationFlow(brief);

    expect(result.creativeDirection).toBeDefined();
    expect(result.creativeDirection.id).toBeDefined();
    expect(result.siteAcceptance).toBeDefined();
  });

});
