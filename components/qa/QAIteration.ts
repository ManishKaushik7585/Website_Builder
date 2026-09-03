
import { GenerationPlan } from '@/config/generation';
import { runQARules } from '@/registry/qa-rules';
import { critiqueIteration } from './SelfCritique';
import { generateRefinement } from './QARefinementEngine';
import { evaluateAcceptance } from '@/registry/qa-acceptance';

export function runIteration(plan: GenerationPlan) {
  const observations = runQARules(plan);
  const { diagnoses, isValid } = critiqueIteration(observations);
  const refinements = generateRefinement(diagnoses);
  
  const status = evaluateAcceptance({ score: isValid ? 100 : 50, status: isValid ? 'PASS' : 'REJECT', observations });

  return { observations, diagnoses, refinements, status };
}
