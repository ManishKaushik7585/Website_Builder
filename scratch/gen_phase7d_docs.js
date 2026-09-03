/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/responsive-intelligence');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  '00_RESPONSIVE_PHILOSOPHY.md',
  '01_VIEWPORT_MODEL.md',
  '02_BREAKPOINT_RULES.md',
  '03_ADAPTIVE_LAYOUT.md',
  '04_CONTENT_PRESERVATION.md',
  '05_RESPONSIVE_HIERARCHY.md',
  '06_RESPONSIVE_TYPOGRAPHY.md',
  '07_RESPONSIVE_SPACING.md',
  '08_NAVIGATION_ADAPTATION.md',
  '09_MEDIA_ADAPTATION.md',
  '10_INTERACTION_ADAPTATION.md',
  '11_MOBILE_RULES.md',
  '12_TABLET_RULES.md',
  '13_DESKTOP_RULES.md',
  '14_ACCESSIBILITY.md',
  '15_OVERFLOW_PREVENTION.md',
  '16_DIAGNOSIS.md',
  '17_REFINEMENT.md',
  '18_FUSION.md',
  '19_ORCHESTRATION.md',
  '20_BROWSER_INSPECTION.md',
  '21_VISION_INTEGRATION.md',
  '22_QA.md',
  '23_SECURITY.md',
  '24_TESTING.md',
  '25_AI_AUTHORITY.md',
  '26_HANDOFF_RULES.md'
];

docs.forEach((doc) => {
  const filePath = path.join(docsDir, doc);
  const title = doc.replace('.md', '').replace(/^\d+_/, '').replace(/_/g, ' ');
  const content = `# ${title}

This document establishes the ${title.toLowerCase()} rules for the Responsive Intelligence layer (Phase 7D).

## Core Principles
1. Responsive design is a semantic architectural concern, not just raw CSS tweaks.
2. Layouts must structurally adapt to viewport classes, preserving content priority.
3. Every responsive decision must be measurable and objective.

## Application
These rules are enforced by \`ResponsiveIntelligenceValidator\` and the \`ResponsiveOrchestrator\`.
`;
  fs.writeFileSync(filePath, content);
});

console.log(`Generated ${docs.length} documentation files in ${docsDir}`);
