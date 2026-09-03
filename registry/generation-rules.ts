
import { GenerationPlan } from '@/config/generation';

export function validateGenerationPlan(plan: GenerationPlan): string[] {
  const warnings: string[] = [];

  if (!plan.brief || !plan.brief.objective) {
    warnings.push('Generation Plan missing objective in brief.');
  }
  if (!plan.template) {
    warnings.push('Generation Plan missing template.');
  }

  // Content vs Visual Alignment rules
  if (
    plan.visualIntent?.mode === 'minimal' && 
    plan.contentIntent?.density === 'dense'
  ) {
    warnings.push('Alignment Warning: Minimal visual mode paired with dense content.');
  }

  return warnings;
}
