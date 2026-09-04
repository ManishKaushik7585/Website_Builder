/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { ProductionStage } from '@/config/production';
import { FactoryStateContract } from '@/config/observability';

export default function FactoryPage() {
  const [stage, setStage] = useState<ProductionStage>('idle');
  const [briefText, setBriefText] = useState('');
  const [factoryState, setFactoryState] = useState<FactoryStateContract | null>(null);
  const [qualityState, setQualityState] = useState<any>(null);
  const [convergenceState, setConvergenceState] = useState<any>(null);
  const [siteAcceptance, setSiteAcceptance] = useState<any>(null);
  const [releaseReadiness, setReleaseReadiness] = useState<any>(null);
  const [projectId, setProjectId] = useState<string>('');
  const [deploymentState, setDeploymentState] = useState<any>(null);
  const [deploymentArtifact, setDeploymentArtifact] = useState<any>(null);
  const [researchContext, setResearchContext] = useState<any>(null);
  const [adaptiveContext, setAdaptiveContext] = useState<any>(null);

  const handleGenerate = async () => {
    setStage('understanding');
    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: briefText })
      });

      const data = await response.json();
      if (data.success && data.result?.state) {
        setFactoryState(data.result.state);
        if (data.result.quality) {
          setQualityState(data.result.quality);
        }
        if (data.result.convergence) {
          setConvergenceState(data.result.convergence);
        }
        if (data.result.multiPageState && data.result.multiPageState.siteAcceptance) {
          setSiteAcceptance(data.result.multiPageState.siteAcceptance);
        }
        if (data.result.releaseReadiness) {
          setReleaseReadiness(data.result.releaseReadiness);
          setProjectId(data.result.projectId || 'proj_default');
          
          if (data.result.researchContext) {
            setResearchContext(data.result.researchContext);
          }
          if (data.result.adaptiveContext) {
            setAdaptiveContext(data.result.adaptiveContext);
          }

          // Trigger evaluation
          fetch('/api/agent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'evaluate',
              projectId: data.result.projectId || 'proj_default',
              releaseResult: data.result.releaseReadiness,
              environment: 'production',
              target: 'managed'
            })
          }).then(res => res.json()).then(deployData => {
            if (deployData.success) {
              setDeploymentState(deployData.result.state);
            }
          }).catch(console.error);
        }
        setStage('ready');
      } else {
        setStage('idle');
        setQualityState('error');
        setConvergenceState(data.error || 'Unknown API Error');
      }
    } catch (e: any) {
      console.error(e);
      setStage('idle');
      setQualityState('error');
      setConvergenceState(e.message || 'Network error');
    }
  };

  const handleDeploy = async (explicitApproval: boolean) => {
    try {
      setDeploymentState((prev: any) => ({ ...prev, deploymentStatus: 'deploying' }));
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deploy',
          projectId: projectId,
          releaseResult: releaseReadiness,
          environment: 'production',
          target: 'managed',
          explicitApproval
        })
      });

      const data = await response.json();
      if (data.success && data.result) {
        setDeploymentState(data.result.state);
        if (data.result.artifact) {
          setDeploymentArtifact(data.result.artifact);
        }
      }
    } catch (e) {
      console.error('Deployment request failed', e);
      setDeploymentState((prev: any) => ({ ...prev, deploymentStatus: 'failed', message: 'Network error executing deployment.' }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex overflow-hidden">

      {/* Sidebar / Page Navigator */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col">
        <h2 className="text-xl font-light mb-8">Project Pages</h2>
        <nav className="flex-1 space-y-4 text-sm">
          {siteAcceptance ? (
            Object.keys(siteAcceptance.pageResults).map(pageId => {
              const res = siteAcceptance.pageResults[pageId];
              return (
                <div key={pageId} className="flex items-center justify-between text-gray-300">
                  <span className="capitalize">{pageId}</span>
                  {res.status === 'accepted' ? <span className="text-green-500">✓</span> : <span className="text-red-500">○</span>}
                </div>
              );
            })
          ) : (
            <>
              <div className="flex items-center justify-between text-gray-300">
                <span>Home</span>
                {stage === 'ready' ? <span className="text-green-500">✓</span> : <span className="text-gray-600">○</span>}
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>Pricing</span>
                <span className="text-gray-600">○</span>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <span>About</span>
                <span className="text-gray-600">○</span>
              </div>
            </>
          )}
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-8 overflow-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-light mb-2">Project Workspace</h1>
          <p className="text-gray-400 text-sm">Multi-Page Architecture Management</p>
        </header>

        {stage === 'idle' && (
          <section className="max-w-2xl border border-gray-800 rounded p-6">
            <h2 className="text-xl mb-4 font-medium">Project Brief</h2>
            <textarea
              className="w-full h-32 bg-gray-900 border border-gray-700 rounded p-3 text-sm text-gray-200 mb-4 focus:outline-none focus:border-white transition-colors"
              placeholder="Describe the multi-page project..."
              value={briefText}
              onChange={(e) => setBriefText(e.target.value)}
              data-testid="brief-input"
            />
            <button
              className="bg-white text-black px-6 py-2 rounded font-medium text-sm hover:bg-gray-200 transition-colors"
              onClick={handleGenerate}
              disabled={!briefText.trim()}
              data-testid="generate-btn"
            >
              Generate Project
            </button>
          </section>
        )}

        {stage === 'understanding' && (
          <section className="max-w-2xl border border-gray-800 rounded p-6 text-center py-12" data-testid="progress-view">
            <div className="animate-pulse mb-6">
              <div className="h-12 w-12 rounded-full border-t-2 border-white mx-auto animate-spin"></div>
            </div>
            <h2 className="text-xl font-medium mb-2 capitalize">Planning Site Architecture...</h2>
          </section>
        )}

        {stage === 'idle' && qualityState === 'error' && (
          <div data-testid="error-view" className="text-red-500">{convergenceState}</div>
        )}

        {stage === 'ready' && factoryState && (
          <section className="max-w-4xl border border-gray-800 rounded p-6" data-testid="ready-view">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-green-400 font-medium">Project Ready</h2>
              <div className="flex space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${factoryState.overallStatus === 'current' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'}`}>
                  State: {factoryState.overallStatus.toUpperCase()}
                </span>
                {siteAcceptance && (
                  <span className={`text-xs px-2 py-1 rounded ${siteAcceptance.status === 'accepted' ? 'bg-blue-900 text-blue-300' : 'bg-red-900 text-red-300'}`}>
                    Site: {siteAcceptance.status.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {factoryState.diagnostics.length > 0 && (
              <div className="mb-6 bg-red-900/30 border border-red-800 text-red-200 p-3 rounded text-sm">
                <h3 className="font-bold mb-1">Diagnostics</h3>
                <ul className="list-disc pl-5">
                  {factoryState.diagnostics.map((d, i) => <li key={i}>{d.message}</li>)}
                </ul>
              </div>
            )}

            {qualityState && (
              <div className="mb-6 border border-gray-800 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold">Generation Quality / Acceptance</h3>
                  <span className={`text-xs px-2 py-1 rounded capitalize ${
                    qualityState.acceptance.status === 'accepted' ? 'bg-green-900 text-green-300' : 
                    qualityState.acceptance.status === 'accepted_with_warnings' ? 'bg-yellow-900 text-yellow-300' :
                    qualityState.acceptance.status === 'unverified' ? 'bg-gray-800 text-gray-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {qualityState.acceptance.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-400 mb-4">
                  {Object.entries(qualityState.dimensions).map(([dim, status]: [string, any]) => (
                    <div key={dim} className="flex justify-between items-center border border-gray-800 rounded p-2">
                      <span className="capitalize">{dim.replace(/-/g, ' ')}</span>
                      <span className={`font-bold ${status === 'pass' ? 'text-green-400' : status === 'unverified' ? 'text-gray-500' : status === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4 text-xs">
                  <span className="text-red-400">Blocking Issues: {qualityState.acceptance.overallBlockingIssueCount}</span>
                  <span className="text-yellow-400">Warnings: {qualityState.acceptance.overallWarningCount}</span>
                </div>
              </div>
            )}

            {releaseReadiness && (
              <div className="mb-6 border border-gray-800 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold">Deployment Readiness / Release Intelligence</h3>
                  <span className={`text-xs px-2 py-1 rounded capitalize ${
                    releaseReadiness.status === 'ready' ? 'bg-green-900 text-green-300' : 
                    releaseReadiness.status === 'ready_with_warnings' ? 'bg-yellow-900 text-yellow-300' :
                    releaseReadiness.status === 'unverified' ? 'bg-gray-800 text-gray-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {releaseReadiness.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 mb-4">
                  {Object.entries(releaseReadiness.dimensions).map(([dim, status]: [string, any]) => (
                    <div key={dim} className="flex justify-between items-center border border-gray-800 rounded p-2">
                      <span className="capitalize">{dim.replace(/_/g, ' ')}</span>
                      <span className={`font-bold ${status === 'ready' ? 'text-green-400' : status === 'unverified' ? 'text-gray-500' : status === 'ready_with_warnings' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-2 text-xs">
                  {releaseReadiness.blockers?.map((blocker: any, idx: number) => (
                    <div key={`blocker-${idx}`} className="text-red-400">BLOCKER: {blocker.diagnosis.explanation}</div>
                  ))}
                  {releaseReadiness.warnings?.map((warning: any, idx: number) => (
                    <div key={`warning-${idx}`} className="text-yellow-400">WARNING: {warning.diagnosis.explanation}</div>
                  ))}
                </div>
              </div>
            )}

            {deploymentState && (
              <div className="mb-6 border border-gray-800 rounded p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold">Deployment Control (Phase 9)</h3>
                  <div className="flex space-x-2">
                    <span className={`text-xs px-2 py-1 rounded capitalize ${
                      deploymentState.isDeployable ? 'bg-blue-900 text-blue-300' : 'bg-gray-800 text-gray-400'
                    }`}>
                      {deploymentState.isDeployable ? 'Eligible' : 'Ineligible'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded capitalize ${
                      deploymentState.deploymentStatus === 'deployed' ? 'bg-green-900 text-green-300' : 
                      deploymentState.deploymentStatus === 'failed' ? 'bg-red-900 text-red-300' :
                      deploymentState.deploymentStatus === 'deploying' ? 'bg-yellow-900 text-yellow-300 animate-pulse' :
                      'bg-gray-800 text-gray-300'
                    }`}>
                      {deploymentState.deploymentStatus}
                    </span>
                  </div>
                </div>

                {deploymentState.message && (
                  <div className="mb-4 text-xs text-gray-400 bg-gray-900 p-2 rounded">
                    {deploymentState.message}
                  </div>
                )}

                {deploymentArtifact && deploymentArtifact.publicUrl && (
                  <div className="mb-4 bg-green-900/30 border border-green-800 p-3 rounded flex items-center justify-between">
                    <div>
                      <div className="text-xs text-green-400 font-bold mb-1">LIVE PRODUCTION URL (Verified)</div>
                      <a href={deploymentArtifact.publicUrl} target="_blank" rel="noreferrer" className="text-white hover:underline text-sm">
                        {deploymentArtifact.publicUrl}
                      </a>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <div>ID: {deploymentArtifact.deploymentId}</div>
                      <div>v: {deploymentArtifact.releaseVersion}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 mt-4">
                  {deploymentState.isDeployable && deploymentState.deploymentStatus !== 'deployed' && deploymentState.deploymentStatus !== 'deploying' && (
                    <>
                      {deploymentState.authorizationState === 'required' ? (
                        <button 
                          onClick={() => handleDeploy(true)}
                          className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded text-xs font-bold transition-colors"
                          data-testid="authorize-deploy-btn"
                        >
                          AUTHORIZE & DEPLOY TO PRODUCTION
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleDeploy(false)}
                          className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded text-xs font-bold transition-colors"
                          data-testid="deploy-btn"
                        >
                          DEPLOY TO PRODUCTION
                        </button>
                      )}
                    </>
                  )}
                  
                  {!deploymentState.isDeployable && (
                    <button disabled className="bg-gray-800 text-gray-500 px-4 py-2 rounded text-xs font-bold cursor-not-allowed">
                      DEPLOYMENT BLOCKED
                    </button>
                  )}
                </div>
              </div>
            )}

            {researchContext && (
              <div className="mb-6 border border-gray-800 rounded p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold">External Intelligence Fabric (Phase 11)</h3>
                  <span className={`text-xs px-2 py-1 rounded capitalize ${
                    researchContext.status === 'complete' ? 'bg-green-900 text-green-300' : 
                    researchContext.status === 'unverified' ? 'bg-gray-800 text-gray-400' :
                    'bg-yellow-900 text-yellow-300'
                  }`}>
                    {researchContext.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Evidence Discovered</div>
                    <div className="text-lg text-white font-light">{researchContext.memory?.evidence?.observed?.length || 0} items</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Budget Consumed</div>
                    <div className="text-sm text-white font-light">
                      Q: {researchContext.budgetConsumed?.queries || 0} | 
                      GH: {researchContext.budgetConsumed?.githubRequests || 0} | 
                      MCP: {researchContext.budgetConsumed?.mcpDiscoveries || 0}
                    </div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded col-span-2">
                    <div className="text-xs text-gray-500 mb-1">Self Critique</div>
                    <div className="text-xs text-gray-300 truncate">{researchContext.critique?.[0] || 'No critique available.'}</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Design Patterns</div>
                    <div className="text-sm text-white">{researchContext.memory?.designPatterns?.length || 0} extracted</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Engineering Patterns</div>
                    <div className="text-sm text-white">{researchContext.memory?.engineeringPatterns?.length || 0} extracted</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">MCP Capabilities</div>
                    <div className="text-sm text-white">{researchContext.memory?.toolCapabilities?.length || 0} discovered</div>
                  </div>
                </div>

                {researchContext.memory?.uncertainties?.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-gray-500 mb-1">Uncertainty Drivers (Triggering Deep Research)</div>
                    <div className="flex flex-wrap gap-2">
                      {researchContext.memory.uncertainties.map((u: any, idx: number) => (
                        <span key={idx} className="bg-red-900/40 text-red-300 text-xs px-2 py-1 rounded border border-red-800/50">
                          {u.domain} (Priority: {u.researchPriority})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {adaptiveContext && (
              <div className="mb-6 border border-gray-800 rounded p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold">Adaptive Intelligence (Phase 12)</h3>
                  <span className={`text-xs px-2 py-1 rounded capitalize ${
                    adaptiveContext.status === 'active' ? 'bg-green-900 text-green-300' : 
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {adaptiveContext.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Knowledge Candidates</div>
                    <div className="text-lg text-white font-light">{adaptiveContext.knowledgeCandidates?.length || 0} extracted</div>
                  </div>
                  <div className="bg-gray-900 p-3 rounded">
                    <div className="text-xs text-gray-500 mb-1">Active Memory</div>
                    <div className="text-lg text-white font-light">{adaptiveContext.activeKnowledge?.length || 0} patterns</div>
                  </div>
                </div>

                {adaptiveContext.recommendations?.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Contextual Recommendations</div>
                    <div className="flex flex-col space-y-2">
                      {adaptiveContext.recommendations.map((rec: any, idx: number) => (
                        <div key={idx} className="bg-blue-900/20 border border-blue-800 p-2 rounded text-xs">
                          <span className="text-blue-300 font-bold block mb-1">[{rec.confidence.toUpperCase()}] {rec.scope.toUpperCase()} SCOPE</span>
                          <span className="text-white">{rec.reason}</span>
                          <span className="text-gray-400 block mt-1">Evidence: {rec.evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {adaptiveContext.failureSignals?.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Historical Failure Signals</div>
                    <div className="flex flex-col space-y-2">
                      {adaptiveContext.failureSignals.map((fs: string, idx: number) => (
                        <div key={idx} className="bg-red-900/20 border border-red-800 p-2 rounded text-xs text-red-300">
                          {fs}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-800 rounded p-4">
                <h3 className="text-sm font-bold mb-2">Project Generation</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Run ID: <span className="text-white text-xs">{factoryState.runId}</span></li>
                  <li>Stage: <span className="text-green-400">{factoryState.generationStage}</span></li>
                  <li>Iteration: <span className="text-white">{factoryState.iterationCount}</span></li>
                  <li>Global QA: <span className="text-green-400">{factoryState.qaStatus}</span></li>
                  <li>Cross-Page Vision: <span className="text-green-400">{factoryState.visionStatus}</span></li>
                </ul>
              </div>
              <div className="border border-gray-800 rounded p-4">
                <h3 className="text-sm font-bold mb-2">Content Intelligence</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Content Density: <span className="text-white capitalize">{factoryState.contentDensity}</span></li>
                  <li>Validation Status: <span className="text-green-400">{factoryState.contentValidation}</span></li>
                  <li>Missing Sections: <span className="text-white">{factoryState.missingSectionsCount}</span></li>
                  <li>Warnings: <span className="text-gray-600">None</span></li>
                </ul>
              </div>
              <div className="border border-gray-800 rounded p-4">
                <h3 className="text-sm font-bold mb-2">Responsive Intelligence</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Active Viewport: <span className="text-white capitalize">{factoryState.responsiveActiveViewport}</span></li>
                  <li>Adaptation: <span className="text-white capitalize">{factoryState.responsiveAdaptationStatus}</span></li>
                  <li>Overflow Protection: <span className="text-white">{factoryState.responsiveOverflow ? 'Warning' : 'Active'}</span></li>
                </ul>
              </div>
              <div className="border border-gray-800 rounded p-4">
                <h3 className="text-sm font-bold mb-2">Interaction Intelligence</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>Keyboard Coverage: <span className="text-white">{factoryState.keyboardCoverage}</span></li>
                  <li>Focus Coverage: <span className="text-white">{factoryState.focusCoverage}</span></li>
                  <li>Destructive Protection: <span className="text-white">{factoryState.destructiveProtection}</span></li>
                </ul>
              </div>
              <div className="border border-gray-800 rounded p-4">
                <h3 className="text-sm font-bold mb-2">Live Page Preview ({factoryState.pageId})</h3>
                <div className="bg-gray-900 h-24 flex flex-col items-center justify-center text-xs text-gray-500 rounded border border-gray-700">
                  <span className="mb-2">Preview Render Simulator</span>
                  <div className="flex space-x-2">
                    <button className="px-2 py-1 bg-gray-800 rounded text-gray-300 hover:text-white">Mobile</button>
                    <button className="px-2 py-1 bg-gray-800 rounded text-gray-300 hover:text-white">Tablet</button>
                    <button className="px-2 py-1 bg-gray-800 rounded text-gray-300 hover:text-white">Desktop</button>
                  </div>
                </div>
              </div>
              
              {convergenceState && (
                <div className="border border-gray-800 rounded p-4 col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold">Generation Convergence</h3>
                    <span className={`text-xs px-2 py-1 rounded capitalize ${
                      convergenceState.status === 'accepted' ? 'bg-green-900 text-green-300' :
                      convergenceState.status === 'converging' ? 'bg-blue-900 text-blue-300' :
                      'bg-red-900 text-red-300'
                    }`}>
                      {convergenceState.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-400 space-y-1 grid grid-cols-2 gap-4">
                    <div>
                      <li>Iteration: <span className="text-white">{convergenceState.currentIteration} / {convergenceState.maxIterations}</span></li>
                      <li>Quality Score: <span className="text-white">{convergenceState.finalScore}</span></li>
                      <li>Resolved Issues: <span className="text-green-400">{convergenceState.resolvedViolations?.length || 0}</span></li>
                      <li>Remaining Issues: <span className="text-red-400">{convergenceState.blockingViolations?.length || 0}</span></li>
                    </div>
                    <div>
                      <li>Current Refinement: <span className="text-white">{convergenceState.activeRefinements?.length > 0 ? convergenceState.activeRefinements[0].action : 'None'}</span></li>
                      <li>Regeneration Scope: <span className="text-white capitalize">{convergenceState.activeScope || 'N/A'}</span></li>
                      <li>Termination Reason: <span className="text-white capitalize">{convergenceState.terminationReason?.replace(/_/g, ' ') || 'N/A'}</span></li>
                    </div>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-black px-6 py-2 rounded font-medium text-sm hover:bg-gray-200" onClick={() => setStage('idle')}>
                Accept Project
              </button>
              <button className="bg-transparent border border-gray-600 text-white px-6 py-2 rounded font-medium text-sm hover:border-gray-400" onClick={() => setStage('idle')}>
                Regenerate Project
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
