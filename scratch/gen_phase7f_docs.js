/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/observability-intelligence');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  '00_OBSERVABILITY_PHILOSOPHY.md',
  '01_ARCHITECTURE.md',
  '02_STATE_MODEL.md',
  '03_SNAPSHOTS.md',
  '04_PROJECT_STATE.md',
  '05_PAGE_STATE.md',
  '06_CONTENT_METRICS.md',
  '07_RESPONSIVE_METRICS.md',
  '08_INTERACTION_METRICS.md',
  '09_QA_METRICS.md',
  '10_VISION_METRICS.md',
  '11_GENERATION_METRICS.md',
  '12_RUN_HISTORY.md',
  '13_ERROR_MODEL.md',
  '14_HYDRATION.md',
  '15_SERVER_BOUNDARY.md',
  '16_CLIENT_BOUNDARY.md',
  '17_SECURITY.md',
  '18_PERFORMANCE.md',
  '19_FALLBACKS.md',
  '20_STALE_STATE.md',
  '21_CONVERGENCE.md',
  '22_FACTORY_UI.md',
  '23_DIAGNOSTICS.md',
  '24_TESTING.md',
  '25_ACCESSIBILITY.md',
  '26_TOKENS.md'
];

docs.forEach((doc) => {
  const filePath = path.join(docsDir, doc);
  const title = doc.replace('.md', '').replace(/^\d+_/, '').replace(/_/g, ' ');
  const content = `# ${title}

This document establishes the ${title.toLowerCase()} rules for the Observability Intelligence layer (Phase 7F).

## Core Principles
1. Observability is a read-only boundary.
2. It must never expose secrets or raw provider API data.
3. Missing data must be represented honestly as 'unavailable' or 'stale'.
4. Factory UI consumes the hydrated observability state contract rather than interacting with internal intelligence systems.

## Application
These rules are enforced by \`ObservabilityOrchestrator\` and the \`ObservabilityValidator\`.
`;
  fs.writeFileSync(filePath, content);
});

console.log(`Generated ${docs.length} documentation files in ${docsDir}`);
