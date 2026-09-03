const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/deployment-control');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  '01-deployment-authority.md',
  '02-authorization-gates.md',
  '03-deployment-targets.md',
  '04-environments.md',
  '05-provider-adapters.md',
  '06-execution-boundary.md',
  '07-verification.md',
  '08-rollback-control.md',
  '09-deployment-history.md',
  '10-security-audit.md',
  '11-credential-handling.md',
  '12-retry-policy.md',
  '13-failure-states.md',
  '14-factory-ui.md',
  '15-api-contract.md',
  '16-release-dependency.md',
  '17-site-acceptance-dependency.md',
  '18-human-approval.md',
  '19-deployment-evidence.md',
  '20-zero-arbitrary-command-policy.md',
  '21-semantic-remediation.md',
  '22-production-safety.md',
  '23-artifact-metadata.md',
  '24-diagnosis.md',
  '25-self-critique.md'
];

docs.forEach((doc) => {
  const content = `# ${doc.replace('.md', '').replace(/-/g, ' ').toUpperCase()}

This document specifies the requirements and logic for ${doc.replace('.md', '')} in the Phase 9 Deployment Control layer.

## Overview
Deployment Control acts as the authoritative boundary for production deployments. It requires an explicit verified ReleaseResult from the Release Intelligence layer before proceeding.

## Security Constraints
- No arbitrary shell commands can be executed by the generative layer.
- Credentials must never cross the client boundary.
- Physical execution must remain strictly isolated behind provider adapters.
`;
  fs.writeFileSync(path.join(docsDir, doc), content);
});

console.log(`Generated ${docs.length} documentation files in docs/deployment-control/`);
