/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs/interaction-intelligence');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const docs = [
  '00_INTERACTION_PHILOSOPHY.md',
  '01_TOKENS.md',
  '02_AFFORDANCES.md',
  '03_INTERACTION_HIERARCHY.md',
  '04_STATE_SYSTEMS.md',
  '05_FEEDBACK.md',
  '06_FORMS.md',
  '07_NAVIGATION.md',
  '08_BUTTONS.md',
  '09_LINKS.md',
  '10_KEYBOARD_INTERACTION.md',
  '11_FOCUS.md',
  '12_TOUCH.md',
  '13_HOVER.md',
  '14_LOADING.md',
  '15_ERRORS.md',
  '16_SUCCESS.md',
  '17_EMPTY_STATES.md',
  '18_DISABLED_STATES.md',
  '19_DESTRUCTIVE_ACTIONS.md',
  '20_ACCESSIBILITY.md',
  '21_RESPONSIVE_INTERACTION.md',
  '22_BEHAVIORAL_CONSISTENCY.md',
  '23_INTERACTION_COMPLEXITY.md',
  '24_SELF_CRITIQUE.md',
  '25_DIAGNOSIS.md',
  '26_REFINEMENT.md',
  '27_ORCHESTRATION.md'
];

docs.forEach((doc) => {
  const filePath = path.join(docsDir, doc);
  const title = doc.replace('.md', '').replace(/^\d+_/, '').replace(/_/g, ' ');
  const content = `# ${title}

This document establishes the ${title.toLowerCase()} rules for the Interaction Intelligence layer (Phase 7E).

## Core Principles
1. Interaction design is a semantic architectural concern.
2. AI cannot generate raw DOM patches, JS, or CSS for interactions.
3. Every interaction decision must be measurable and objective.

## Application
These rules are enforced by \`InteractionIntelligenceValidator\` and the \`InteractionOrchestrator\`.
`;
  fs.writeFileSync(filePath, content);
});

console.log(`Generated ${docs.length} documentation files in ${docsDir}`);
