/* eslint-disable @typescript-eslint/no-explicit-any */

import { MockAIProvider } from './providers/MockAIProvider';
import { runGeneration } from './GenerationAgent';
import { withRetry } from './RetryController';
import { ProviderRouter } from './ProviderRouter';
import { PAGE_ROLES } from '../../registry/page-roles';
import { PageContentPlan } from '../../config/content-intelligence';
import { ContentOrchestrator } from '../content-intelligence/ContentOrchestrator';
import { ResponsivePlan } from '../../config/responsive-intelligence';
import { ResponsiveOrchestrator } from '../responsive-intelligence/ResponsiveOrchestrator';
import { InteractionPlan } from '../../config/interaction-intelligence';
import { InteractionOrchestrator } from '../interaction-intelligence/InteractionOrchestrator';
import { ObservabilityOrchestrator } from '../observability/ObservabilityOrchestrator';
import { GenerationQualityOrchestrator } from '../generation-quality/GenerationQualityOrchestrator';
import { GenerationConvergenceOrchestrator } from '../generation-convergence/GenerationConvergenceOrchestrator';
import { MultiPageOrchestrator } from '../site-acceptance/MultiPageOrchestrator';
import { SiteAcceptanceOrchestrator } from '../site-acceptance/SiteAcceptanceOrchestrator';
import { ReleaseIntelligenceOrchestrator } from '../release-intelligence/ReleaseIntelligenceOrchestrator';
import { SitePlan } from '../../config/project';

export class AgentRuntime {
  private primaryProvider = new MockAIProvider();
  private fallbackProvider = new MockAIProvider();
  private router = new ProviderRouter(this.primaryProvider, this.fallbackProvider);
  private observability = new ObservabilityOrchestrator();

  async executeGenerationFlow(brief: string) {
    const projectId = 'proj_default';

    // 0. ADAPTIVE INTELLIGENCE (Upstream Context)
    const { AdaptiveIntelligenceOrchestrator } = await import('../adaptive-intelligence/AdaptiveIntelligenceOrchestrator');
    const adaptiveContext = await AdaptiveIntelligenceOrchestrator.getAdaptiveContext(projectId, { brief });

    // 0.1 EXTERNAL INTELLIGENCE (Phase 10/11)
    const { ExternalIntelligenceOrchestrator } = await import('../external-intelligence/ExternalIntelligenceOrchestrator');
    const researchContext = await ExternalIntelligenceOrchestrator.execute(projectId, brief, adaptiveContext);

    // 0.2 CREATIVE DIRECTION (Phase 13)
    const { CreativeDirectionOrchestrator } = await import('../creative-direction/CreativeDirectionOrchestrator');
    const creativeDirection = await CreativeDirectionOrchestrator.execute(projectId, brief, adaptiveContext, researchContext);

    // 1. Generate Site Plan (Phase 1 - Project Intelligence)
    // Project Intelligence uses creativeDirection to determine site structure.
    const sitePlan: SitePlan = {
      projectObjective: 'mock',
      audience: 'mock',
      primaryAction: 'mock',
      navigation: [],
      constraints: [],
      pages: ['home', 'pricing', 'about']
    };

    // 7I. MULTI-PAGE GENERATION
    const pageResults: Record<string, any> = {};
    const snapshots: Record<string, any> = {};
    for (const pageId of sitePlan.pages) {
      const result = await this.executePageFlow(brief, projectId, pageId);
      pageResults[pageId] = result.convergence;
      snapshots[pageId] = result.snapshot;
    }

    // 8. MULTI-PAGE ORCHESTRATION & SITE ACCEPTANCE
    const multiPageState = SiteAcceptanceOrchestrator.evaluate(
      sitePlan,
      pageResults,
      snapshots
    );

    // 9. RELEASE INTELLIGENCE (Phase 8)
    const releaseReadiness = ReleaseIntelligenceOrchestrator.evaluate(
      multiPageState,
      { siteAcceptance: multiPageState } as any
    );

    // In Phase 8, we return the releaseReadiness natively. The single page snapshot/quality/etc.
    // can be derived from the primary generated page for backward UI compatibility.
    const primaryPageResult = multiPageState.pageResults[sitePlan.pages[0]];
    const primarySnapshot = (multiPageState as any).snapshots?.[sitePlan.pages[0]] || Object.values(snapshots)[0];

    // 10. ADAPTIVE INTELLIGENCE (Outcome Learning)
    await AdaptiveIntelligenceOrchestrator.extractAndLearn(projectId, {
      quality: { acceptanceStatus: multiPageState.status, violations: [], score: 100 }, // Extracted from full results in reality
      convergence: primaryPageResult,
      siteAcceptance: multiPageState,
      release: releaseReadiness,
      research: researchContext
    });

    return {
      output: 'Project Generation Orchestrated',
      snapshot: primarySnapshot,
      quality: { acceptance: { status: multiPageState.status, overallBlockingIssueCount: 0, overallWarningCount: 0 }, dimensions: {} },
      convergence: primaryPageResult,
      multiPageState: { siteAcceptance: multiPageState },
      siteAcceptance: multiPageState,
      releaseReadiness,
      projectId,
      researchContext,
      adaptiveContext,
      creativeDirection
    };
  }

  async evaluateDeployment(projectId: string, releaseResult: any, environment: any, target: any) {
    const { DeploymentOrchestrator } = await import('../deployment-control/DeploymentOrchestrator');
    return DeploymentOrchestrator.process(projectId, releaseResult, environment, target, 'evaluate');
  }

  async executeDeployment(projectId: string, releaseResult: any, environment: any, target: any, explicitApproval: boolean) {
    const { DeploymentOrchestrator } = await import('../deployment-control/DeploymentOrchestrator');
    const deploymentResult = await DeploymentOrchestrator.process(projectId, releaseResult, environment, target, 'deploy', explicitApproval);

    // Phase 12: Extract Deployment Outcome
    const { AdaptiveIntelligenceOrchestrator } = await import('../adaptive-intelligence/AdaptiveIntelligenceOrchestrator');
    await AdaptiveIntelligenceOrchestrator.extractAndLearn(projectId, { deployment: deploymentResult });

    return deploymentResult;
  }

  private async executePageFlow(brief: string, projectId: string, pageId: string) {
    const runId = `run_${Date.now()}_${pageId}`;

    // 1. PROJECT -> SITE PLAN -> PAGE ROLE (Mocking role resolution)
    const mockRole = PAGE_ROLES[pageId as keyof typeof PAGE_ROLES] || PAGE_ROLES['home'];

    // 2. CONTENT INTELLIGENCE -> VALIDATION -> REFINEMENT
    const mockSections = mockRole.contentExpectations!.requirements
      .filter(req => req.requirement === 'required' || req.purpose === 'hero')
      .map(req => ({
        purpose: req.purpose as any,
        intent: ['explain'],
        priority: 'primary' as const,
        density: 'balanced' as const,
        contentLength: 'short' as const,
        constraints: { maxHeadingLength: 50, maxSupportingCopy: 150, maxCards: 0, maxBullets: 0, maxCtaCount: 1, minRequiredContent: 1, allowRepeatedContent: false },
        isOptional: false
      }));

    const initialPlan: PageContentPlan = {
      pageId, role: mockRole.type,
      globalPlan: { primaryIntent: 'convert', targetDensity: 'balanced', hierarchy: ['primary'], globalConstraints: { maxHeadingLength: 50, maxSupportingCopy: 150, maxCards: 3, maxBullets: 4, maxCtaCount: 2, minRequiredContent: 1, allowRepeatedContent: false } },
      sections: mockSections as any
    };
    const contentResult = ContentOrchestrator.generateAndRefine(initialPlan, mockRole);

    if (!contentResult.validation.valid) {
      throw new Error(`Content plan failed validation: ${contentResult.validation.diagnostics[0]?.message}`);
    }

    // 3. RESPONSIVE INTELLIGENCE
    const initialResponsivePlan: ResponsivePlan = {
      pageId,
      globalConstraints: {
        allowHidingPrimary: false,
        allowHorizontalScroll: false,
        minTouchTargetSize: 44,
        preventOrphanedText: true
      },
      behaviors: [{ sectionPurpose: 'hero', transformations: [] }]
    };

    const responsiveResult = ResponsiveOrchestrator.generateAndRefine(
      initialResponsivePlan,
      contentResult.plan,
      mockRole
    );

    if (!responsiveResult.validation.valid) {
      throw new Error(`Responsive plan failed validation: ${responsiveResult.validation.diagnostics[0]?.message}`);
    }

    // 4. INTERACTION INTELLIGENCE
    const initialInteractionPlan: InteractionPlan = {
      pageId,
      globalConstraints: {
        requireKeyboardFocus: true,
        requireTouchTargets: true,
        preventEmptyStates: false,
        enforceDestructiveConfirmation: true
      },
      behaviors: [{ sectionPurpose: 'hero', elementId: 'hero-cta', requirements: [] }]
    };

    const interactionResult = InteractionOrchestrator.generateAndRefine(
      initialInteractionPlan,
      responsiveResult.plan,
      contentResult.plan,
      mockRole
    );

    if (!interactionResult.validation.valid) {
      throw new Error(`Interaction plan failed validation: ${interactionResult.validation.diagnostics[0]?.message}`);
    }

    // 5. OBSERVABILITY AGGREGATION
    const snapshot = this.observability.createSnapshot(
      runId,
      projectId,
      pageId,
      'generation_ready',
      1,
      {
        content: contentResult.plan,
        responsive: responsiveResult.plan,
        interaction: interactionResult.plan
      }
    );

    // 6. GENERATION PLAN -> DESIGN SYSTEM -> GENERATE (Initial)
    await this.router.execute(async (provider) => {
      return await withRetry(async () => {
        const promptWithContext = `${brief}\n\nContent Plan:\n${JSON.stringify(contentResult.plan)}\n\nResponsive Plan:\n${JSON.stringify(responsiveResult.plan)}\n\nInteraction Plan:\n${JSON.stringify(interactionResult.plan)}`;
        return await runGeneration(provider, promptWithContext);
      });
    });

    const mockGenerationSections = initialPlan.sections.map(s => ({ section: s.purpose }));
    const initialGenerationPlan = { sections: mockGenerationSections } as any; // Mock

    // 7. GENERATION QUALITY & CONVERGENCE LOOP
    const convergenceResult = await GenerationConvergenceOrchestrator.evaluate(
      { id: projectId, name: 'default' } as any,
      { id: pageId, path: '/', role: mockRole.type } as any,
      undefined,
      mockRole,
      contentResult.plan,
      responsiveResult.plan,
      interactionResult.plan,
      initialGenerationPlan,
      snapshot,
      undefined,
      undefined,
      async (actions, scope) => {
        await this.router.execute(async (provider) => {
          return await withRetry(async () => {
            const promptWithContext = `${brief}\n\nContent Plan:\n${JSON.stringify(contentResult.plan)}`;
            return await runGeneration(provider, promptWithContext, actions, scope);
          });
        });

        // Mock new snapshot & generation plan
        const newSnapshot = this.observability.createSnapshot(runId, projectId, pageId, 'generation_ready', 2, {
          content: contentResult.plan,
          responsive: responsiveResult.plan,
          interaction: interactionResult.plan
        });

        return { generation: { sections: mockGenerationSections } as any, snapshot: newSnapshot };
      }
    );

    if (convergenceResult.status !== 'accepted') {
      console.error(`Page ${pageId} failed convergence:`, convergenceResult.status, convergenceResult.terminationReason, convergenceResult.blockingViolations);
    }

    return { convergence: convergenceResult, snapshot };
  }

  getObservabilityHistory() {
    return this.observability.getHistory();
  }
}
