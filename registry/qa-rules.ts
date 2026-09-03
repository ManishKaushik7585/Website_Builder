
import { QAObservation } from '@/config/qa';
import { GenerationPlan } from '@/config/generation';

export function runQARules(plan: GenerationPlan): QAObservation[] {
  const observations: QAObservation[] = [];
  
  // Example Rules
  if (plan.sections.length > 10) {
    observations.push({
      id: 'obs-001',
      category: 'structure',
      severity: 'major',
      target: 'page.sections',
      description: 'Excessive section count detected.',
      confidence: 0.9
    });
  }
  
  if (plan.visualIntent?.mode === 'minimal' && plan.contentIntent?.density === 'dense') {
    observations.push({
      id: 'obs-002',
      category: 'density',
      severity: 'major',
      target: 'page.density',
      description: 'Minimal visual mode with dense content produces weak hierarchy.',
      confidence: 0.95
    });
  }

  // Motion Rule
  if (plan.motionPlan?.intensity === 'excessive') {
    observations.push({
      id: 'obs-003',
      category: 'motion',
      severity: 'major',
      target: 'page.motion',
      description: 'Motion intensity is excessive without justification.',
      confidence: 0.95
    });
  }
  
  return observations;
}
