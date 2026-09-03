const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs', 'external-intelligence-fabric');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  'architecture.md',
  'provider-architecture.md',
  'github-research.md',
  'design-references.md',
  'licensing.md',
  'provenance.md',
  'mcp-discovery.md',
  'mcp-security.md',
  'research-budgets.md',
  'confidence.md',
  'source-ranking.md',
  'pattern-extraction.md',
  'engineering-intelligence.md',
  'memory.md',
  'deduplication.md',
  'contradiction-handling.md',
  'tool-selection.md',
  'free-first-architecture.md',
  'optional-api-keys.md',
  'security-boundaries.md',
  'prompt-injection-handling.md',
  'ui-hydration.md',
  'api-contracts.md',
  'architectural-authority.md',
  'shadcn-intelligence.md',
  'daisyui-intelligence.md',
  '21st-dev.md',
  'taste-skill.md',
  'design-diversity.md',
  'cache-freshness.md',
  'testing.md'
];

docs.forEach((doc, idx) => {
  const content = `# Phase 11 Documentation: ${doc.replace('.md', '')}

This document formally specifies the behavioral and architectural constraints of the ${doc.replace('.md', '')} mechanism in Phase 11 External Intelligence Fabric.

## Rule 1: No Direct Mutation
External intelligence is an evidence provider, not a mutating agent.

## Rule 2: Free-First Policy
The system must default to free and public APIs. Optional keys like TAVILY_API_KEY may enhance, but never gate functionality.

## Rule 3: Memory & Budget
Operations must respect the \`ResearchBudget\` and store abstract patterns in \`DesignPatternMemory\`.
`;
  fs.writeFileSync(path.join(docsDir, doc), content);
});

console.log(`Generated ${docs.length} Phase 11 documentation files.`);
