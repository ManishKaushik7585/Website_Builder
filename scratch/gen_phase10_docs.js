const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs', 'external-intelligence');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  'architecture.md',
  'provider-boundaries.md',
  'research-evidence.md',
  'web-research.md',
  'website-analysis.md',
  'reference-analysis.md',
  'design-patterns.md',
  'asset-intelligence.md',
  'typography.md',
  'standards.md',
  'technology-research.md',
  'research-memory.md',
  'research-budget.md',
  'uncertainty.md',
  'caching.md',
  'security.md',
  'prompt-injection.md',
  'provenance.md',
  'confidence.md',
  'fusion.md',
  'decision-making.md',
  'project-intelligence-integration.md',
  'factory-ui.md',
  'api-contracts.md',
  'testing.md'
];

docs.forEach((doc, idx) => {
  const content = `# Phase 10 Documentation: ${doc.replace('.md', '')}

This document formally specifies the behavioral and architectural constraints of the ${doc.replace('.md', '')} mechanism in Phase 10 External Intelligence.

## Rule 1: No Direct Mutation
External intelligence is an evidence provider, not a mutating agent.

## Rule 2: Validation
All external inputs must be validated via \`external-intelligence-validator\`.

## Rule 3: Memory & Budget
Operations must respect the \`ResearchBudget\` and store evidence in \`ResearchMemory\`.
`;
  fs.writeFileSync(path.join(docsDir, doc), content);
});

console.log(`Generated ${docs.length} Phase 10 documentation files.`);
