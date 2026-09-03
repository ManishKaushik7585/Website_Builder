/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/content-intelligence');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  '00_CONTENT_PHILOSOPHY.md',
  '01_SECTION_INTELLIGENCE.md',
  '02_PAGE_ROLE_CONTENT_RULES.md',
  '03_CONTENT_HIERARCHY.md',
  '04_CONTENT_DENSITY.md',
  '05_SECTION_PURPOSE.md',
  '06_SECTION_SELECTION.md',
  '07_SECTION_ORDERING.md',
  '08_REQUIRED_VS_OPTIONAL_SECTIONS.md',
  '09_SECTION_VARIATION.md',
  '10_CONTENT_LIMITS.md',
  '11_CTA_CONTENT.md',
  '12_HEADING_HIERARCHY.md',
  '13_SUPPORTING_COPY.md',
  '14_MEDIA_CONTENT_RELATIONSHIPS.md',
  '15_PAGE_RHYTHM.md',
  '16_CROSS_PAGE_CONTENT_CONSISTENCY.md',
  '17_CONTENT_REUSE.md',
  '18_CONTENT_DIFFERENTIATION.md',
  '19_RESPONSIVE_CONTENT_BEHAVIOR.md',
  '20_CONTENT_QA.md',
  '21_CONTENT_DIAGNOSIS.md',
  '22_CONTENT_REFINEMENT.md',
  '23_AI_CONTENT_GENERATION_RULES.md',
  '24_AI_CONTENT_VALIDATION_RULES.md',
  '25_ANTI_SLOP_CONTENT_RULES.md',
  '26_CONTENT_ACCESSIBILITY.md',
  '27_CONTENT_READABILITY.md',
  '28_CONTENT_TRUNCATION.md',
  '29_CONTENT_CONFLICT_RESOLUTION.md',
  '30_CONTENT_CONVERGENCE.md',
  'TOKENS.md'
];

docs.forEach((doc, idx) => {
  const filePath = path.join(docsDir, doc);
  const title = doc.replace('.md', '').replace(/^\d+_/, '').replace(/_/g, ' ');
  const content = `# ${title}

This document establishes the ${title.toLowerCase()} rules for the Content Intelligence layer (Phase 7C).

## Core Principles
1. Content must be semantic.
2. Content structure precedes layout structure.
3. Every decision must be measurable and objective.

## Application
These rules are enforced by \`ContentIntelligenceValidator\` and the \`ContentOrchestrator\`.
`;
  fs.writeFileSync(filePath, content);
});

console.log(`Generated ${docs.length} documentation files in ${docsDir}`);
