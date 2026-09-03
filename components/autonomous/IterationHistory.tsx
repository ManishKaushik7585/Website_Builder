
import React from 'react';
import { AutonomousIteration } from '@/config/autonomous';

export function IterationHistory({ iterations }: { iterations: AutonomousIteration[] }) {
  return (
    <div className="space-y-4">
      {iterations.map(iter => (
        <div key={iter.iterationId} className="p-4 border border-gray-800 rounded">
          <h4 className="font-bold">Iteration {iter.iterationNumber}</h4>
          <p>Status: {iter.status}</p>
          <p>Decision: {iter.decision}</p>
          <p>QA Observations: {iter.qaObservations.length}</p>
        </div>
      ))}
    </div>
  );
}
