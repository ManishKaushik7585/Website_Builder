import { NextResponse } from 'next/server';
import { AgentRuntime } from '@/components/agent/AgentRuntime';
import { FactoryStateHydrator } from '@/components/observability/FactoryStateHydrator';
import { RollbackController } from '@/components/deployment-control/RollbackController';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action || 'generate';

    if (action === 'rollback') {
      if (!body.projectId || !body.targetDeploymentId) {
        return NextResponse.json({ error: 'AI_INVALID_REQUEST: Missing rollback params' }, { status: 400 });
      }
      const rollbackResult = await RollbackController.rollback({
        projectId: body.projectId,
        targetDeploymentId: body.targetDeploymentId,
        timestamp: new Date().toISOString()
      });
      return NextResponse.json({ success: true, result: rollbackResult });
    }

    const runtime = new AgentRuntime();

    if (action === 'evaluate' || action === 'deploy') {
      if (!body.projectId || !body.releaseResult) {
        return NextResponse.json({ error: 'AI_INVALID_REQUEST: Missing deployment inputs' }, { status: 400 });
      }
      
      const deploymentProcess = action === 'evaluate' 
        ? await runtime.evaluateDeployment(body.projectId, body.releaseResult, body.environment || 'preview', body.target || 'managed')
        : await runtime.executeDeployment(body.projectId, body.releaseResult, body.environment || 'preview', body.target || 'managed', !!body.explicitApproval);
      
      return NextResponse.json({ success: true, result: deploymentProcess });
    }

    const researchActions = ['research', 'discover', 'github', 'design-reference', 'mcp-discover'];
    
    if (researchActions.includes(action)) {
      if (!body.brief || !body.projectId) {
        return NextResponse.json({ error: 'AI_INVALID_REQUEST: Missing brief or projectId' }, { status: 400 });
      }
      const { ExternalIntelligenceOrchestrator } = await import('@/components/external-intelligence/ExternalIntelligenceOrchestrator');
      
      // In a fully split architecture, we'd route these to specific providers.
      // But orchestrator handles the unified pipeline.
      const researchContext = await ExternalIntelligenceOrchestrator.execute(body.projectId, body.brief);
      return NextResponse.json({ success: true, result: { researchContext } });
    }

    // Default generate action
    if (!body.brief) {
      return NextResponse.json({ error: 'AI_INVALID_REQUEST: Missing brief' }, { status: 400 });
    }
    const result = await runtime.executeGenerationFlow(body.brief);
    
    // Hydrate state for client presentation, stripping any backend metadata or secrets
    const hydratedState = FactoryStateHydrator.hydrate(result.snapshot);
    
    return NextResponse.json({ 
      success: true, 
      result: { 
        projectId: result.projectId,
        output: result.output, 
        state: hydratedState, 
        quality: result.quality, 
        convergence: result.convergence, 
        multiPageState: result.multiPageState,
        releaseReadiness: result.releaseReadiness,
        researchContext: result.researchContext
      } 
    });
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    return NextResponse.json({ error: error.message || 'AI_UNKNOWN_ERROR' }, { status: 500 });
  }
}
