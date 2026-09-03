
import React from 'react';
import { GenerationPlan } from '@/config/generation';

import { GenerationValidationResult } from '@/registry/generation-validator';
import { CritiqueResult } from './GenerationCritique';

export const GenerationReport: React.FC<{ plan: GenerationPlan; validation: GenerationValidationResult; critique: CritiqueResult }> = ({ plan, validation, critique }) => (
  <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
    <h3 className="font-bold text-lg border-b pb-2">Generation Report</h3>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div><strong>Objective:</strong> {plan.objective}</div>
      <div><strong>Sections:</strong> {plan.sections.length}</div>
      <div><strong>Validation:</strong> {validation.valid ? 'PASS' : 'FAIL'}</div>
      <div><strong>Critique:</strong> {critique.passed ? 'PASS' : 'FAIL'}</div>
    </div>
  </div>
);
