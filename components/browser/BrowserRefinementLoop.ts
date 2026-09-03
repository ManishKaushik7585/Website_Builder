
import { GenerationPlan } from '@/config/generation';
import { BrowserSnapshot } from '@/config/browser-intelligence';
import { mapBrowserToQA } from './BrowserQABridge';
import { diagnoseObservations } from '@/components/qa/QADiagnosis';
import { generateRefinement } from '@/components/qa/QARefinementEngine';

export function runBrowserRefinementLoop(plan: GenerationPlan, snapshot: BrowserSnapshot) {
  // 1. Inspect
  const browserObservations = snapshot.observations || [];
  
  // 2. Map to QA
  const qaObservations = mapBrowserToQA(browserObservations);
  
  // 3. Diagnose
  const diagnoses = diagnoseObservations(qaObservations);
  
  // 4. Refine
  const refinements = generateRefinement(diagnoses);

  return { qaObservations, diagnoses, refinements };
}
