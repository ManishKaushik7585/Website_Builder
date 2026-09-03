
import React from 'react';
import { AutonomousRun } from '@/config/autonomous';
import { IterationHistory } from './IterationHistory';

export function AutonomousReportUI({ run }: { run: AutonomousRun }) {
  return (
    <div className="p-6 bg-black text-white border border-gray-800 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Autonomous Convergence Report</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div><strong>Run ID:</strong> {run.runId}</div>
        <div><strong>State:</strong> {run.state}</div>
        <div><strong>Total Iterations:</strong> {run.iterations.length}</div>
        <div><strong>Final Decision:</strong> {run.iterations[run.iterations.length - 1]?.decision || 'N/A'}</div>
      </div>
      <IterationHistory iterations={run.iterations} />
    </div>
  );
}
