
import { GenerationPlan } from '@/config/generation';

export interface GenerationWarning {
  code: string;
  message: string;
}
export interface GenerationError {
  code: string;
  message: string;
}

export interface GenerationValidationResult {
  valid: boolean;
  warnings: GenerationWarning[];
  errors: GenerationError[];
}

export function validateGenerationPlan(plan: GenerationPlan): GenerationValidationResult {
  const result: GenerationValidationResult = { valid: true, warnings: [], errors: [] };
  
  if (!plan.objective) {
    result.errors.push({ code: 'MISSING_OBJECTIVE', message: 'Missing primary objective' });
    result.valid = false;
  }
  
  if (plan.sections.length === 0) {
    result.errors.push({ code: 'NO_SECTIONS', message: 'Missing hero/sections' });
    result.valid = false;
  }

  // Check unique stable IDs
  const ids = new Set<string>();
  for (const s of plan.sections) {
    if (ids.has(s.id)) {
      result.errors.push({ code: 'DUPLICATE_SECTION_ID', message: `Duplicate section ID: ${s.id}` });
      result.valid = false;
    }
    ids.add(s.id);
  }

  // Warnings
  if (plan.sections.length > 15) {
    result.warnings.push({ code: 'EXCESSIVE_SECTIONS', message: 'Excessive sections detected.' });
  }

  return result;
}
