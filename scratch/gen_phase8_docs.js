const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/release-intelligence');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  '01-release-authority.md',
  '02-deployment-boundaries.md',
  '03-site-acceptance-dependency.md',
  '04-release-dimensions.md',
  '05-build-evidence.md',
  '06-route-validation.md',
  '07-asset-validation.md',
  '08-environment-safety.md',
  '09-secret-handling.md',
  '10-accessibility-readiness.md',
  '11-performance-readiness.md',
  '12-security-readiness.md',
  '13-metadata-readiness.md',
  '14-release-statuses.md',
  '15-blocking-rules.md',
  '16-warning-rules.md',
  '17-unverified-states.md',
  '18-stale-evidence.md',
  '19-factory-hydration.md',
  '20-api-boundaries.md',
  '21-semantic-remediation.md',
  '22-zero-dependency-architecture.md',
  '23-no-shell-no-cli-policy.md',
  '24-observability-integration.md',
  '25-failure-handling.md',
  '26-testing-requirements.md',
  '27-security-boundary-enforcement.md',
  '28-evidence-normalization.md',
  '29-release-fusion.md',
  '30-self-critique.md'
];

docs.forEach((doc, idx) => {
  const content = `# ${doc.replace('.md', '').replace(/-/g, ' ').toUpperCase()}

This document specifies the requirements and logic for ${doc.replace('.md', '')} in the Phase 8 Release Intelligence layer.

## Overview
Release Intelligence must act as the final deployment readiness authority. It evaluates the project against rigorous criteria to ensure production safety and structural completeness.

## Implementation Details
No arbitrary execution of shell, CLI, or DOM mutations is permitted. All intelligence is read-only and explicitly deterministic. Missing evidence resolves strictly to \`unverified\`.

## Factory Hydration
The Factory UI must hydrate this state purely from the \`releaseReadiness\` API contract without exposing secrets.
`;
  fs.writeFileSync(path.join(docsDir, doc), content);
});

console.log(`Generated ${docs.length} documentation files in docs/release-intelligence/`);
