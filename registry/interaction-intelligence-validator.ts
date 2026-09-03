import { InteractionPlan, InteractionObservation, InteractionDeviceMode } from '../config/interaction-intelligence';

export type InteractionDiagnosticCode = 
  | 'MISSING_INTERACTION_BEHAVIOR'
  | 'MISSING_FOCUS_BEHAVIOR'
  | 'MISSING_KEYBOARD_BEHAVIOR'
  | 'MISSING_ERROR_FEEDBACK'
  | 'MISSING_SUCCESS_FEEDBACK'
  | 'MISSING_LOADING_STATE'
  | 'DESTRUCTIVE_ACTION_UNPROTECTED'
  | 'INTERACTION_DEVICE_MISMATCH'
  | 'INTERACTION_CONSISTENCY_DRIFT'
  | 'CONTRADICTORY_INTERACTION_STATE'
  | 'EXCESSIVE_INTERACTION_COMPLEXITY';

export interface InteractionDiagnostic {
  code: InteractionDiagnosticCode;
  message: string;
  elementId?: string;
  section?: string;
  severity: 'error' | 'warning';
}

export interface InteractionValidationResult {
  valid: boolean;
  diagnostics: InteractionDiagnostic[];
}

export class InteractionIntelligenceValidator {
  static validate(plan: InteractionPlan, observations?: InteractionObservation[]): InteractionValidationResult {
    const diagnostics: InteractionDiagnostic[] = [];

    // Static Analysis of the Plan
    for (const behavior of plan.behaviors) {
      if (behavior.requirements.length === 0) {
        diagnostics.push({
          code: 'MISSING_INTERACTION_BEHAVIOR',
          message: `Element ${behavior.elementId} in ${behavior.sectionPurpose} has no defined interaction behavior.`,
          elementId: behavior.elementId,
          section: behavior.sectionPurpose,
          severity: 'error'
        });
      }

      if (behavior.requirements.length > 5) {
        diagnostics.push({
          code: 'EXCESSIVE_INTERACTION_COMPLEXITY',
          message: `Element ${behavior.elementId} in ${behavior.sectionPurpose} has too many overlapping interaction requirements.`,
          elementId: behavior.elementId,
          section: behavior.sectionPurpose,
          severity: 'warning'
        });
      }

      for (const req of behavior.requirements) {
        if (req.isDestructive && plan.globalConstraints.enforceDestructiveConfirmation && !req.requiresConfirmation) {
          diagnostics.push({
            code: 'DESTRUCTIVE_ACTION_UNPROTECTED',
            message: `Destructive action for ${behavior.elementId} is missing required confirmation.`,
            elementId: behavior.elementId,
            section: behavior.sectionPurpose,
            severity: 'error'
          });
        }

        if (req.intent === 'submit' && !req.feedback.requiresLoadingState) {
          diagnostics.push({
            code: 'MISSING_LOADING_STATE',
            message: `Submission interaction for ${behavior.elementId} lacks loading feedback.`,
            elementId: behavior.elementId,
            section: behavior.sectionPurpose,
            severity: 'error'
          });
        }

        if (req.intent === 'submit' && !req.feedback.requiresErrorState) {
          diagnostics.push({
            code: 'MISSING_ERROR_FEEDBACK',
            message: `Submission interaction for ${behavior.elementId} lacks error feedback.`,
            elementId: behavior.elementId,
            section: behavior.sectionPurpose,
            severity: 'error'
          });
        }

        if (req.intent === 'submit' && !req.feedback.requiresSuccessState) {
          diagnostics.push({
            code: 'MISSING_SUCCESS_FEEDBACK' as InteractionDiagnosticCode,
            message: `Submission interaction for ${behavior.elementId} lacks success feedback.`,
            elementId: behavior.elementId,
            section: behavior.sectionPurpose,
            severity: 'warning'
          });
        }

        if (plan.globalConstraints.requireKeyboardFocus && !req.supportedDevices.includes('keyboard')) {
          diagnostics.push({
            code: 'MISSING_KEYBOARD_BEHAVIOR',
            message: `Element ${behavior.elementId} is missing keyboard support.`,
            elementId: behavior.elementId,
            section: behavior.sectionPurpose,
            severity: 'error'
          });
        }

        if (plan.globalConstraints.requireTouchTargets && !req.supportedDevices.includes('touch')) {
          diagnostics.push({
            code: 'INTERACTION_DEVICE_MISMATCH',
            message: `Element ${behavior.elementId} is missing touch support when touch targets are required.`,
            elementId: behavior.elementId,
            section: behavior.sectionPurpose,
            severity: 'error'
          });
        }
      }
    }

    // Site-wide consistency check (static heuristic)
    // Find if same intent is mapped to different affordances
    const intentToAffordance = new Map<string, Set<string>>();
    
    for (const b of plan.behaviors) {
      const req = b.requirements[0];
      if (req) {
        if (!intentToAffordance.has(req.intent)) {
          intentToAffordance.set(req.intent, new Set());
        }
        intentToAffordance.get(req.intent)!.add(req.affordance);
      }
    }

    let hasConsistencyDrift = false;
    for (const affordances of intentToAffordance.values()) {
      if (affordances.size > 1) {
        hasConsistencyDrift = true;
        break;
      }
    }

    if (hasConsistencyDrift) {
      diagnostics.push({
        code: 'INTERACTION_CONSISTENCY_DRIFT',
        message: `Inconsistent interaction behaviors detected across similar intents.`,
        severity: 'warning'
      });
    }

    // Dynamic Analysis from Observations (if available)
    if (observations) {
      for (const obs of observations) {
        if (obs.isMissingFocus) {
          diagnostics.push({
            code: 'MISSING_FOCUS_BEHAVIOR',
            message: `Element ${obs.elementId} in ${obs.section} is missing focus behavior.`,
            elementId: obs.elementId,
            section: obs.section,
            severity: 'error'
          });
        }
        
        if (obs.isDestructiveUnprotected) {
          diagnostics.push({
            code: 'DESTRUCTIVE_ACTION_UNPROTECTED',
            message: `Element ${obs.elementId} executed a destructive action without protection.`,
            elementId: obs.elementId,
            section: obs.section,
            severity: 'error'
          });
        }

        if (obs.hasContradictoryState) {
          diagnostics.push({
            code: 'CONTRADICTORY_INTERACTION_STATE',
            message: `Element ${obs.elementId} is in a contradictory state (e.g., loading and disabled differently).`,
            elementId: obs.elementId,
            section: obs.section,
            severity: 'error'
          });
        }

        if (obs.isMissingKeyboard) {
          diagnostics.push({
            code: 'MISSING_KEYBOARD_BEHAVIOR',
            message: `Element ${obs.elementId} failed keyboard interaction.`,
            elementId: obs.elementId,
            section: obs.section,
            severity: 'error'
          });
        }
      }
    }

    return {
      valid: !diagnostics.some(d => d.severity === 'error'),
      diagnostics
    };
  }
}
