
import { GenerationPlan } from '@/config/generation';

export interface CritiqueResult {
  passed: boolean;
  feedback: string[];
}

export function critiqueGenerationPlan(plan: GenerationPlan): CritiqueResult {
  const feedback: string[] = [];
  if (plan.sections.length < 2) {
    feedback.push('Critique: The page lacks sufficient content depth.');
  }
  return {
    passed: feedback.length === 0,
    feedback
  };
}
