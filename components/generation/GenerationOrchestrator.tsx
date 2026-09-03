
import React from 'react';
import { GenerationBrief, GenerationPlan } from '@/config/generation';
import { validateGenerationPlan } from '@/registry/generation-validator';
import { compileToPageConfig } from './PageConfigCompiler';

export interface GenerationOrchestratorProps {
  brief?: GenerationBrief;
  plan?: GenerationPlan;
}

export const GenerationOrchestrator: React.FC<GenerationOrchestratorProps> = ({ plan }) => {
  if (!plan) return <div className="text-red-500">No plan provided</div>;

  const validation = validateGenerationPlan(plan);
  if (!validation.valid) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-red-800 font-bold">Generation Failed</h2>
        <ul className="text-red-600 text-sm list-disc pl-4">
          {validation.errors.map((e, i) => <li key={i}>{e.message}</li>)}
        </ul>
      </div>
    );
  }

  const pageConfig = compileToPageConfig(plan);
  
  return (
    <div className="generation-orchestrator">
      {validation.warnings.length > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
          <h3 className="text-yellow-800 font-bold">Generation Warnings</h3>
          <ul className="text-yellow-700 text-sm list-disc pl-4">
            {validation.warnings.map((w, i) => <li key={i}>{w.message}</li>)}
          </ul>
        </div>
      )}
      <div className="text-sm font-mono bg-gray-100 p-4 rounded-md">
        [PageRenderer Simulated for Plan: {plan.brief.projectName}]
        <pre className="mt-2 text-xs overflow-auto">{JSON.stringify(pageConfig, null, 2)}</pre>
      </div>
    </div>
  );
};
