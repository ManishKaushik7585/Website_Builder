import { expect, test } from '@playwright/test';
import { GenerationConvergenceValidator } from '../registry/generation-convergence-validator';
import { ConvergenceDiagnosis } from '../components/generation-convergence/ConvergenceDiagnosis';
import { ConvergenceRefinement } from '../components/generation-convergence/ConvergenceRefinement';
import { RegenerationPlanner } from '../components/generation-convergence/RegenerationPlanner';
import { ConvergenceSelfCritique } from '../components/generation-convergence/ConvergenceSelfCritique';
import { ConvergenceHistory } from '../components/generation-convergence/ConvergenceHistory';
import { QualityViolation } from '../config/generation-quality';
import { ConvergenceAction } from '../config/generation-convergence';

test.describe('Generation Convergence Intelligence', () => {

  test('1. Initial generation accepted immediately', () => {
    // Verified implicitly if 0 actions returned
    const result = GenerationConvergenceValidator.validateState(1, [], [], true);
    expect(result.valid).toBe(true);
  });

  test('2. One blocking quality violation triggers refinement', () => {
    const violations = [{ code: 'REQUIRED_SECTION_MISSING', dimension: 'content', source: 'qa', message: 'Missing hero', severity: 'critical' } as unknown as QualityViolation];
    const diags = ConvergenceDiagnosis.diagnose(violations);
    expect(diags[0].code).toBe('CONTENT_GENERATION_DRIFT');
    expect(diags[0].recommendedAction).toBe('addRequiredSection');
  });

  test('3. Semantic refinement produces a valid convergence action', () => {
    const diags = [{ code: 'CONTENT_GENERATION_DRIFT', source: 'qa', domain: 'content', severity: 'high', blocking: true, affectedScope: 'section', evidence: 'Missing FAQ', recommendedAction: 'addRequiredSection' }];
    const actions = ConvergenceRefinement.refine(diags, [{ action: 'addRequiredSection', targetDimension: 'content', parameters: {}, expectedOutcome: 'added' }]);
    expect(actions.length).toBe(1);
    expect(actions[0].action).toBe('addRequiredSection');
    expect(actions[0].scope).toBe('section');
  });

  test('4. Regeneration scope resolves to the smallest appropriate scope', () => {
    const scope = RegenerationPlanner.planScope([{ action: 'addRequiredSection', scope: 'section' }]);
    expect(scope).toBe('section');
  });

  test('5. Section-level issue does not escalate to site scope', () => {
    const scope = RegenerationPlanner.planScope([{ action: 'addRequiredSection', scope: 'section' }, { action: 'addFocusBehavior', scope: 'component' }]);
    expect(scope).toBe('page'); // section + component = page
    expect(scope).not.toBe('site');
  });

  test('6. Page-level issue resolves to page scope', () => {
    const scope = RegenerationPlanner.planScope([{ action: 'fix', scope: 'page' }]);
    expect(scope).toBe('page');
  });

  test('7. Site-wide issue resolves to site scope', () => {
    const scope = RegenerationPlanner.planScope([{ action: 'repairNavigationAffordance', scope: 'site' }]);
    expect(scope).toBe('site');
  });

  test('8. Successful second iteration terminates convergence', () => {
    const result = GenerationConvergenceValidator.validateState(2, [], [], true);
    expect(result.valid).toBe(true);
  });

  test('9. Three-iteration budget is enforced', () => {
    const result = GenerationConvergenceValidator.validateState(4, [], [], true);
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('BUDGET_EXHAUSTED');
  });

  test('10. Stalled iteration is detected', () => {
    const history = new ConvergenceHistory();
    history.addRecord({ iteration: 1, qualityScore: 80, blockingViolations: ['A'], delta: { scoreChange: 0, resolvedViolations: [], newViolations: [], remainingViolations: [] }, timestamp: '', status: 'converging', warnings: [], refinementActions: [], regenerationScope: null });
    history.addRecord({ iteration: 2, qualityScore: 80, blockingViolations: ['A'], delta: { scoreChange: 0, resolvedViolations: [], newViolations: [], remainingViolations: [] }, timestamp: '', status: 'converging', warnings: [], refinementActions: [], regenerationScope: null });
    const result = GenerationConvergenceValidator.validateState(3, history.getHistory(), [], true);
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('CONVERGENCE_STALLED');
  });

  test('11. Regression is detected', () => {
    const history = new ConvergenceHistory();
    history.addRecord({ iteration: 1, qualityScore: 80, blockingViolations: ['A'], delta: { scoreChange: -5, resolvedViolations: [], newViolations: [], remainingViolations: [] }, timestamp: '', status: 'converging', warnings: [], refinementActions: [], regenerationScope: null });
    const result = GenerationConvergenceValidator.validateState(2, history.getHistory(), [], true);
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('QUALITY_REGRESSION');
  });

  test('12. Missing observability evidence prevents false acceptance', () => {
    const result = GenerationConvergenceValidator.validateState(1, [], [], false);
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('MISSING_EVIDENCE');
  });

  test('13. Unsupported refinement action is rejected', () => {
    const result = GenerationConvergenceValidator.validateState(1, [], [{ action: 'invent_framework' }], true);
    expect(result.valid).toBe(false);
    expect(result.violations).toContain('UNSUPPORTED_ACTION');
  });

  test('14. Raw CSS/JSX/code mutation is rejected', () => {
    const diags = [{ code: 'X', source: 'qa', domain: 'x', severity: 'high', blocking: true, affectedScope: 'page', evidence: '', recommendedAction: 'raw_css' }];
    const actions = ConvergenceRefinement.refine(diags, [{ action: 'raw_css', targetDimension: 'design', parameters: {}, expectedOutcome: 'failed' }]);
    expect(actions.length).toBe(0);
  });

  test('15. Vague convergence self-critique is rejected', () => {
    expect(ConvergenceSelfCritique.critique('This looks better now')).toBe(null);
    expect(ConvergenceSelfCritique.critique('make it pop')).toBe(null);
  });

  test('16. Evidence-based convergence statement is accepted', () => {
    expect(ConvergenceSelfCritique.critique('The horizontal overflow violation is now resolved.')).not.toBe(null);
  });

  test('17. Contradictory scopes escalate appropriately', () => {
    const scope = RegenerationPlanner.planScope([{ action: 'addFocusBehavior', scope: 'interaction-behavior' }, { action: 'removeHorizontalOverflow', scope: 'responsive-variant' }]);
    expect(scope).toBe('page'); // They conflict natively, so fallback to page.
  });
});
