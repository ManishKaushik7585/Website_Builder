
import React from 'react';

export const QAComparison: React.FC<{ before: unknown, after: unknown }> = ({ before, after }) => (
  <div className="grid grid-cols-2 gap-4 border p-4 rounded-md">
    <div>
      <h4 className="font-bold">Before</h4>
      <pre className="text-xs overflow-auto">{JSON.stringify(before, null, 2)}</pre>
    </div>
    <div>
      <h4 className="font-bold">After (Browser Output)</h4>
      <pre className="text-xs overflow-auto">{JSON.stringify(after, null, 2)}</pre>
    </div>
  </div>
);
