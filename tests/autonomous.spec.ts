
import { test, expect } from '@playwright/test';
import { startAutonomousRun, simulateIterationExecution } from '../components/autonomous/AutonomousOrchestrator';
import { prioritizeObservations } from '../components/autonomous/RefinementPrioritizer';
import { handleFailure } from '../components/autonomous/FailureRecovery';

test.describe('Autonomous Convergence Intelligence (Phase 6E)', () => {
  test('Autonomous Lab renders scenarios successfully', async ({ page }) => {
    await page.goto('/lab');
    await expect(page.getByText('Autonomous Generation Lab (Phase 6E)')).toBeVisible();
    await expect(page.getByText('Scenario B — Mobile Overflow').first()).toBeVisible();
    await expect(page.getByText('ITERATION_BUDGET_EXCEEDED').first()).toBeVisible();
  });

  test('Iteration Budget and Non-convergence terminates safely', () => {
    let run = startAutonomousRun({ projectName: 'Test', description: '' });
    
    // Simulate 5 failures
    for(let i=0; i<5; i++) {
      run = simulateIterationExecution(run, { qaObservations: [{ id: 'obs1', category: 'layout', severity: 'major', description: 'Broken', target: 'hero', confidence: 1 }] });
    }
    
    expect(run.iterations.length).toBe(5);
    expect(run.state).toBe('FAILED');
    expect(run.iterations[4].decision).toBe('ITERATION_BUDGET_EXCEEDED');
  });

  test('Healthy pages terminate with CONVERGED', () => {
    let run = startAutonomousRun({ projectName: 'Test', description: '' });
    
    run = simulateIterationExecution(run, { qaObservations: [] });
    
    expect(run.state).toBe('CONVERGED');
    expect(run.iterations[0].decision).toBe('CONVERGED');
  });

  test('Refinement prioritization prioritizes critical over minor', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obs: any[] = [
      { severity: 'minor', id: '1' },
      { severity: 'critical', id: '2' },
      { severity: 'major', id: '3' }
    ];
    const prioritized = prioritizeObservations(obs);
    expect(prioritized[0].severity).toBe('critical');
    expect(prioritized[1].severity).toBe('major');
    expect(prioritized[2].severity).toBe('minor');
  });

  test('Failure recovery sets status to FAILED safely', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iter: any = { status: 'COMPLETED', decision: 'PASS' };
    const recovered = handleFailure(iter, { type: 'render', message: 'crash' });
    expect(recovered.status).toBe('FAILED');
    expect(recovered.decision).toBe('REJECT');
  });
});
