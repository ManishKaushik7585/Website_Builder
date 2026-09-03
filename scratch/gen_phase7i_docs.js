/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../docs/site-acceptance');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const docs = [
  { name: '01-site-acceptance-philosophy.md', title: 'Site Acceptance Philosophy', content: 'Phase 7I establishes global project acceptance. A site is not complete until all pages converge.' },
  { name: '02-multi-page-orchestration.md', title: 'Multi-Page Orchestration', content: 'Orchestrator maps over SitePlan to run Generation Convergence for every page.' },
  { name: '03-cross-page-consistency.md', title: 'Cross-Page Consistency', content: 'Consistency is evaluated by comparing observability snapshots across pages.' },
  { name: '04-intent-mismatch.md', title: 'Intent Mismatch', content: 'If Page A has "convert" intent but Page B has "inform", it flags a CrossPageViolation.' },
  { name: '05-global-token-sync.md', title: 'Global Token Sync', content: 'Design tokens must be identical for global elements across the SitePlan.' },
  { name: '06-navigation-integrity.md', title: 'Navigation Integrity', content: 'Internal links generated in one page must match valid roles in the SitePlan.' },
  { name: '07-site-acceptance-status.md', title: 'Site Acceptance Status', content: 'Can be accepted, partial, rejected, or unverified.' },
  { name: '08-partial-acceptance.md', title: 'Partial Acceptance', content: 'If some pages converge but others stall, the site is partial.' },
  { name: '09-rejection-conditions.md', title: 'Rejection Conditions', content: 'If 0 pages converge, the project is rejected.' },
  { name: '10-cross-page-violations.md', title: 'Cross-Page Violations', content: 'Typed violations representing multi-page integration failures.' },
  { name: '11-factory-ui-integration.md', title: 'Factory UI Integration', content: 'The sidebar maps the exact SitePlan pages instead of hardcoded strings.' },
  { name: '12-page-failure-fallback.md', title: 'Page Failure Fallback', content: 'If a single page crashes, MultiPageOrchestrator isolates the exception and continues the loop.' },
  { name: '13-scoring-aggregation.md', title: 'Scoring Aggregation', content: 'Project score is the average of all converged page final scores.' },
  { name: '14-missing-page-detection.md', title: 'Missing Page Detection', content: 'A page in SitePlan without a convergence result throws a critical violation.' },
  { name: '15-agent-runtime-refactoring.md', title: 'Agent Runtime Refactoring', content: 'executeGenerationFlow delegates page-level loops to MultiPageOrchestrator.' },
  { name: '16-api-multi-page-state.md', title: 'API Multi-Page State', content: 'The /api/agent route returns multiPageState with full cross-page context.' },
  { name: '17-site-acceptance-validator.md', title: 'Site Acceptance Validator', content: 'Asserts no unaccepted pages and no blocking cross-page violations.' },
  { name: '18-performance-parallelism.md', title: 'Performance Parallelism', content: 'Pages can be orchestrated sequentially to preserve API limits or in parallel if budgets allow.' },
  { name: '19-global-header-consistency.md', title: 'Global Header Consistency', content: 'CrossPageViolations are thrown if Header links vary across identical viewports.' },
  { name: '20-empty-project-handling.md', title: 'Empty Project Handling', content: 'A SitePlan with 0 pages throws EMPTY_PROJECT validation error.' },
  { name: '21-security-boundaries.md', title: 'Security Boundaries', content: 'Cross-page analysis consumes read-only Observability Snapshots, never raw code.' },
  { name: '22-semantic-refinement-escalation.md', title: 'Semantic Refinement Escalation', content: 'Site-wide issues escalate refinements to the global project config.' },
  { name: '23-legacy-fallback.md', title: 'Legacy Fallback', content: 'Single-page clients still receive result.snapshot from the first generated page.' },
  { name: '24-site-plan-generation.md', title: 'Site Plan Generation', content: 'Phase 7A Site Plan directly dictates the iteration target for Phase 7I.' },
  { name: '25-formal-completion.md', title: 'Formal Completion', content: 'Phase 7I represents the final stage of the pipeline: FULL SITE ACCEPTANCE.' }
];

docs.forEach(doc => {
  const content = `# ${doc.title}\n\n${doc.content}\n\n*Auto-generated for Phase 7I.*`;
  fs.writeFileSync(path.join(outputDir, doc.name), content);
});

console.log(`Generated ${docs.length} documentation files for Phase 7I.`);
