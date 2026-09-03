import { test, expect } from '@playwright/test';
import { InteractionPlan, InteractionObservation } from '../config/interaction-intelligence';
import { InteractionIntelligenceValidator } from '../registry/interaction-intelligence-validator';
import { InteractionDiagnosis } from '../components/interaction-intelligence/InteractionDiagnosis';
import { InteractionRefinement } from '../components/interaction-intelligence/InteractionRefinement';
import { InteractionSelfCritique } from '../components/interaction-intelligence/InteractionSelfCritique';

test.describe('Phase 7E - Interaction Intelligence', () => {
  const createBasePlan = (): InteractionPlan => ({
    pageId: 'test-1',
    globalConstraints: {
      requireKeyboardFocus: true,
      requireTouchTargets: true,
      preventEmptyStates: false,
      enforceDestructiveConfirmation: true
    },
    behaviors: [
      {
        sectionPurpose: 'hero',
        elementId: 'submit-btn',
        requirements: [
          {
            intent: 'submit',
            affordance: 'button',
            priority: 'primary',
            supportedDevices: ['pointer', 'touch', 'keyboard'],
            feedback: {
              requiresLoadingState: true,
              requiresSuccessState: true,
              requiresErrorState: true,
              announcesToScreenReader: true
            },
            isDestructive: false,
            requiresConfirmation: false
          }
        ]
      }
    ]
  });

  test('Valid Interaction Plan passes validation', () => {
    const plan = createBasePlan();
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.valid).toBe(true);
  });

  test('Detects missing loading state for submit intent', () => {
    const plan = createBasePlan();
    plan.behaviors[0].requirements[0].feedback.requiresLoadingState = false;
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('MISSING_LOADING_STATE');
  });

  test('Detects unprotected destructive actions', () => {
    const plan = createBasePlan();
    plan.behaviors[0].requirements[0].isDestructive = true;
    plan.behaviors[0].requirements[0].requiresConfirmation = false;
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('DESTRUCTIVE_ACTION_UNPROTECTED');
  });

  test('Detects missing keyboard support when globally required', () => {
    const plan = createBasePlan();
    plan.behaviors[0].requirements[0].supportedDevices = ['pointer']; // removed 'keyboard'
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('MISSING_KEYBOARD_BEHAVIOR');
  });

  test('Rejects excessive interaction complexity', () => {
    const plan = createBasePlan();
    const req = plan.behaviors[0].requirements[0];
    plan.behaviors[0].requirements = [req, req, req, req, req, req]; // 6 requirements
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.diagnostics.some(d => d.code === 'EXCESSIVE_INTERACTION_COMPLEXITY')).toBe(true);
  });

  test('Diagnostic correctly maps MISSING_FOCUS_BEHAVIOR to addFocusBehavior', () => {
    const obs: InteractionObservation[] = [{
      elementId: 'submit-btn',
      section: 'hero',
      viewport: 'desktop',
      device: 'keyboard',
      isMissingFocus: true,
      isMissingKeyboard: false,
      isMissingFeedback: false,
      isDestructiveUnprotected: false,
      hasContradictoryState: false
    }];
    
    const plan = createBasePlan();
    const result = InteractionIntelligenceValidator.validate(plan, obs);
    expect(result.valid).toBe(false);
    
    const refinements = InteractionDiagnosis.diagnoseAndPrescribe(result.diagnostics);
    expect(refinements[0].action).toBe('addFocusBehavior');
  });

  test('Detects missing interaction behavior for empty requirements', () => {
    const plan = createBasePlan();
    plan.behaviors[0].requirements = [];
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('MISSING_INTERACTION_BEHAVIOR');
  });

  test('Detects missing error feedback for submit intent', () => {
    const plan = createBasePlan();
    plan.behaviors[0].requirements[0].feedback.requiresErrorState = false;
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.valid).toBe(false);
    expect(result.diagnostics[0].code).toBe('MISSING_ERROR_FEEDBACK');
  });

  test('Detects missing success feedback for submit intent', () => {
    const plan = createBasePlan();
    plan.behaviors[0].requirements[0].feedback.requiresSuccessState = false;
    
    const result = InteractionIntelligenceValidator.validate(plan);
    // Success feedback is a warning in our implementation
    expect(result.diagnostics.some(d => d.code === 'MISSING_SUCCESS_FEEDBACK')).toBe(true);
  });

  test('Detects touch adaptation mismatch when touch targets are required', () => {
    const plan = createBasePlan();
    plan.globalConstraints.requireTouchTargets = true;
    plan.behaviors[0].requirements[0].supportedDevices = ['pointer', 'keyboard']; // missing touch
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.valid).toBe(false);
    expect(result.diagnostics.some(d => d.code === 'INTERACTION_DEVICE_MISMATCH')).toBe(true);
  });

  test('Detects contradictory interaction states from observations', () => {
    const obs: InteractionObservation[] = [{
      elementId: 'submit-btn',
      section: 'hero',
      viewport: 'desktop',
      device: 'keyboard',
      isMissingFocus: false,
      isMissingKeyboard: false,
      isMissingFeedback: false,
      isDestructiveUnprotected: false,
      hasContradictoryState: true
    }];
    
    const plan = createBasePlan();
    const result = InteractionIntelligenceValidator.validate(plan, obs);
    expect(result.valid).toBe(false);
    expect(result.diagnostics.some(d => d.code === 'CONTRADICTORY_INTERACTION_STATE')).toBe(true);
  });

  test('Detects cross-page interaction consistency drift', () => {
    const plan = createBasePlan();
    // Simulate 2 behaviors with SAME intent but DIFFERENT affordances
    plan.behaviors = [
      {
        sectionPurpose: 'hero',
        elementId: 'btn-1',
        requirements: [{
          intent: 'submit',
          affordance: 'button',
          priority: 'primary',
          supportedDevices: ['pointer', 'touch', 'keyboard'],
          feedback: { requiresLoadingState: true, requiresSuccessState: true, requiresErrorState: true, announcesToScreenReader: true },
          isDestructive: false,
          requiresConfirmation: false
        }]
      },
      {
        sectionPurpose: 'hero',
        elementId: 'btn-2',
        requirements: [{
          intent: 'submit',
          affordance: 'link', // different affordance for same intent
          priority: 'primary',
          supportedDevices: ['pointer', 'touch', 'keyboard'],
          feedback: { requiresLoadingState: true, requiresSuccessState: true, requiresErrorState: true, announcesToScreenReader: true },
          isDestructive: false,
          requiresConfirmation: false
        }]
      }
    ];
    
    const result = InteractionIntelligenceValidator.validate(plan);
    expect(result.diagnostics.some(d => d.code === 'INTERACTION_CONSISTENCY_DRIFT')).toBe(true);
  });

  test('InteractionRefinement safely applies semantic mutations without raw code', () => {
    const plan = createBasePlan();
    plan.behaviors[0].requirements[0].feedback.requiresLoadingState = false; // Intentionally broken
    
    const result = InteractionIntelligenceValidator.validate(plan);
    const refinements = InteractionDiagnosis.diagnoseAndPrescribe(result.diagnostics);
    
    const refinedPlan = InteractionRefinement.applyRefinements(plan, refinements);
    expect(refinedPlan.behaviors[0].requirements[0].feedback.requiresLoadingState).toBe(true);
  });

  test('InteractionSelfCritique rejects vague aesthetic feedback', () => {
    const critique = "Make it feel better and more interactive.";
    const result = InteractionSelfCritique.validateCritique(critique);
    expect(result.valid).toBe(false);
    expect(result.reason).toContain('make it feel better');
  });

  test('InteractionSelfCritique accepts measurable semantic feedback', () => {
    const critique = "Add keyboard activation and preserve focus state during load.";
    const result = InteractionSelfCritique.validateCritique(critique);
    expect(result.valid).toBe(true);
  });
});
