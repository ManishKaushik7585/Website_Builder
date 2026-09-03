/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../docs/generation-convergence');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const docs = [
  { name: '01-convergence-philosophy.md', title: 'Convergence Philosophy', content: 'Phase 7H establishes closed-loop generation. Convergence is bounded and deterministic.' },
  { name: '02-iteration-boundaries.md', title: 'Iteration Boundaries', content: 'Maximum iterations are strictly bound to 3. Infinite loops are architecturally blocked.' },
  { name: '03-termination-conditions.md', title: 'Termination Conditions', content: 'Convergence terminates upon acceptance, exhaustion, regression, stalling, or missing evidence.' },
  { name: '04-semantic-actions.md', title: 'Semantic Actions', content: 'Refinements must use strict semantic actions like addRequiredSection. No raw mutation.' },
  { name: '05-regeneration-scope.md', title: 'Regeneration Scope', content: 'Scope must be minimal (e.g. section, component) based on targeted violations.' },
  { name: '06-stalled-convergence.md', title: 'Stalled Convergence', content: 'If the blocking violations do not improve across 2 iterations, convergence halts.' },
  { name: '07-regression-detection.md', title: 'Regression Detection', content: 'If the quality score drops below the previous iteration, convergence terminates.' },
  { name: '08-evidence-requirements.md', title: 'Evidence Requirements', content: 'Visual and QA evidence must be present. Unverified states block convergence.' },
  { name: '09-acceptance-interaction.md', title: 'Acceptance Interaction', content: 'Acceptance is governed by Generation Quality. The orchestrator defers to the Acceptance Gate.' },
  { name: '10-observability-interaction.md', title: 'Observability Interaction', content: 'Every regeneration triggers a new Observability Snapshot for accurate evaluation.' },
  { name: '11-quality-interaction.md', title: 'Quality Interaction', content: 'Convergence interprets Quality Recommendations and maps them to semantic actions.' },
  { name: '12-safety-boundaries.md', title: 'Safety Boundaries', content: 'Raw CSS, JSX, DOM queries, and arbitrary scripts are blocked from refinement actions.' },
  { name: '13-ai-behavior.md', title: 'AI Behavior', content: 'The Generation Agent receives scoped refinements and must preserve upstream constraints.' },
  { name: '14-self-critique.md', title: 'Self Critique', content: 'Vague feedback is rejected. Critique must reference measurable deltas.' },
  { name: '15-cross-page-convergence.md', title: 'Cross-Page Convergence', content: 'Site-wide navigation issues escalate the regeneration scope to the full site.' },
  { name: '16-responsive-convergence.md', title: 'Responsive Convergence', content: 'Overflow issues trigger responsive-variant scoped regeneration.' },
  { name: '17-interaction-convergence.md', title: 'Interaction Convergence', content: 'Focus requirement failures trigger interaction-behavior scoped regeneration.' },
  { name: '18-accessibility-convergence.md', title: 'Accessibility Convergence', content: 'Missing contrast triggers component-level accessibility regeneration.' },
  { name: '19-factory-observability.md', title: 'Factory Observability', content: 'The Factory UI receives hydrated convergence iteration state dynamically.' },
  { name: '20-forbidden-raw-mutations.md', title: 'Forbidden Raw Mutations', content: 'File patches, sed, and sed-like operations are blocked in convergence actions.' },
  { name: '21-architectural-invariants.md', title: 'Architectural Invariants', content: 'Convergence loops do not override initial intelligence generation logic.' },
  { name: '22-delta-tracking.md', title: 'Delta Tracking', content: 'The ConvergenceHistory component tracks score deltas and resolved/new violations.' },
  { name: '23-convergence-fusion.md', title: 'Convergence Fusion', content: 'Fuses quality, observability, and history to prevent misclassification.' },
  { name: '24-agent-runtime-integration.md', title: 'Agent Runtime Integration', content: 'The orchestrator is injected securely into the executeGenerationFlow.' },
  { name: '25-api-contract.md', title: 'API Contract', content: 'The result.convergence payload strips backend secrets.' },
  { name: '26-convergence-status-lifecycle.md', title: 'Convergence Status Lifecycle', content: 'Status flows from converging -> blocked -> converging -> accepted.' },
];

docs.forEach(doc => {
  const content = `# ${doc.title}\n\n${doc.content}\n\n*Auto-generated for Phase 7H.*`;
  fs.writeFileSync(path.join(outputDir, doc.name), content);
});

console.log(`Generated ${docs.length} documentation files for Phase 7H.`);
