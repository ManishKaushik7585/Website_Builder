
import React from 'react';
import { QAReport } from '@/config/qa';
import { evaluateAcceptance } from '@/registry/qa-acceptance';

export const QAReportUI: React.FC<{ report: QAReport }> = ({ report }) => {
  const status = evaluateAcceptance(report.result);
  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
      <h3 className="font-bold text-lg border-b pb-2">QA Report - Iteration {report.iteration}</h3>
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div><strong>Status:</strong> {status}</div>
        <div><strong>Score:</strong> {report.result.score}</div>
        <div><strong>Issues Detected:</strong> {report.result.observations.length}</div>
        <div><strong>Refinements:</strong> {report.refinements.length}</div>
      </div>
      {report.result.observations.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-bold">Observations</h4>
          <ul className="list-disc pl-4 text-xs">
            {report.result.observations.map(o => <li key={o.id}>[{o.severity}] {o.description}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
