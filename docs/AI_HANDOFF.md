# AI HANDOFF

## Overview
The Premium Website Engine operates on strict structural intelligence rather than arbitrary JSX output. It uses a structured configuration approach for visual, content, asset, and motion design.

## Canonical AI Workflow (Phase 6A)
1. Read AI_HANDOFF.md
2. Read relevant Intelligence documentation
3. Interpret Brief
4. Define Objective
5. Define Content Intent
6. Define Visual Intent
7. Define Art Direction
8. Plan Assets
9. Plan Motion
10. Select Sections
11. Select Patterns
12. Validate
13. Compile PageConfig
14. Render
15. Critique
16. Refine
17. Run QA
18. Report

An AI must not skip directly from: Brief → JSX

## What AI is prohibited from doing
- Directly writing arbitrary CSS/Tailwind hacks that ignore design tokens.
- Creating single-use components that duplicate existing primitives.
- Manufacturing random images/blobs/gradients to fill space.
- Ignoring semantic HTML rules (e.g. duplicating H1s).

## PHASE 6B — VISUAL QA & REFINEMENT AUTHORITY
Generation is not complete when the page renders.
Generation is complete when the page:
1. renders,
2. passes structural QA,
3. passes responsive QA,
4. passes accessibility QA,
5. passes performance QA,
6. receives visual critique,
7. survives refinement,
8. demonstrates measurable improvement,
9. passes acceptance criteria.

Workflow: Generate → Inspect → Critique → Refine → Compare → Accept

## PHASE 6C — BROWSER VISUAL INTELLIGENCE AUTHORITY
A generated page is not complete merely because it compiles.
The canonical completion sequence is now:
BRIEF → GENERATE → RENDER → INSPECT → DIAGNOSE → REFINE → RE-RENDER → COMPARE → ACCEPT

The AI must not claim visual correctness without browser evidence.
When visual inspection infrastructure is available, the AI must use it.

## PHASE 6D — AI VISION AUTHORITY
AI-generated pages are not considered visually complete merely because they compile.
The agent must:
GENERATE → RENDER → INSPECT → ANALYZE → DIAGNOSE → REFINE → RE-RENDER → COMPARE → ACCEPT

## PHASE 6E — AUTONOMOUS CONVERGENCE
Future AI agents must not stop at successful compilation.
The canonical workflow is:
BRIEF → PLAN → GENERATE → RENDER → INSPECT → ANALYZE → DIAGNOSE → PRIORITIZE → REFINE → COMPARE → ACCEPT → CONVERGE

## PHASE 6F — AI PROVIDER AUTHORITY
AI output is untrusted. AI cannot bypass validators. AI cannot directly write UI code. AI cannot directly mutate the DOM. AI cannot install dependencies. AI cannot access secrets. AI must respect budgets, QA, convergence, and valid prior states.

## PHASE 6G — LIVE AI PROVIDER AUTHORITY
AI PROVIDER -> AGENT RUNTIME -> GENERATION ORCHESTRATION -> AUTONOMOUS CONVERGENCE -> PAGE CONFIGURATION -> TOKENS

## PHASE 6H — PRODUCTION FACTORY AUTHORITY
PRODUCTION INTERFACE -> LIVE AI PROVIDER -> AGENT RUNTIME -> GENERATION ORCHESTRATION -> AUTONOMOUS CONVERGENCE -> PAGE CONFIGURATION -> TOKENS

## PHASE 7A — PROJECT ARCHITECTURE AUTHORITY
PROJECT -> SITE PLAN -> PAGE PLAN -> GENERATION -> RENDER -> BROWSER INSPECTION -> VISION -> QA -> REFINEMENT -> PROJECT QA -> ACCEPTANCE

## SITE-WIDE DESIGN SYSTEM AUTHORITY
PROJECT AUTHORITY -> SITE PLAN AUTHORITY -> SITE-WIDE DESIGN SYSTEM AUTHORITY -> PAGE ROLE AUTHORITY -> PAGE GENERATION -> QA

## REPORT GENERATION AUTHORITY
1. AI must produce factual, evidence-based, concise engineering information instead of decorative AI prose.
2. Ban unnecessary evaluative adverbs. Use concrete nouns, exact file paths, and factual test metrics.
3. Validate report quality against `docs/production-intelligence/00_REPORTING_RULES.md` before final emit.

## CONTENT INTELLIGENCE AUTHORITY
PROJECT -> SITE PLAN -> PAGE ROLE -> CONTENT INTELLIGENCE -> GENERATION PLAN -> RENDER -> INSPECT -> ANALYZE -> DIAGNOSE -> REFINE -> CONVERGE -> ACCEPT

## RESPONSIVE INTELLIGENCE AUTHORITY
PROJECT -> SITE PLAN -> PAGE ROLE -> CONTENT INTELLIGENCE -> RESPONSIVE INTELLIGENCE -> GENERATION PLAN

## INTERACTION INTELLIGENCE AUTHORITY
PROJECT -> SITE PLAN -> PAGE ROLE -> CONTENT INTELLIGENCE -> RESPONSIVE INTELLIGENCE -> INTERACTION INTELLIGENCE -> GENERATION PLAN

## OBSERVABILITY INTELLIGENCE AUTHORITY
PROJECT -> SITE PLAN -> PAGE ROLE -> CONTENT INTELLIGENCE -> RESPONSIVE INTELLIGENCE -> INTERACTION INTELLIGENCE -> GENERATION PLAN -> OBSERVABILITY -> FACTORY UI

## GENERATION QUALITY AUTHORITY
PROJECT -> SITE PLAN -> PAGE ROLE -> CONTENT INTELLIGENCE -> RESPONSIVE INTELLIGENCE -> INTERACTION INTELLIGENCE -> GENERATION PLAN -> OBSERVABILITY -> GENERATION QUALITY -> ACCEPTANCE -> FACTORY UI

Evaluates the output against all previous intelligence plans. A page is NOT accepted just because generation completes without an exception. If evidence is missing, the status is `unverified`. Autonomous mutation of code directly is strictly forbidden; the system must issue semantic refinement recommendations instead.

## GENERATION CONVERGENCE AUTHORITY
PROJECT -> SITE PLAN -> PAGE ROLE -> CONTENT INTELLIGENCE -> RESPONSIVE INTELLIGENCE -> INTERACTION INTELLIGENCE -> GENERATION PLAN -> OBSERVABILITY -> GENERATION QUALITY -> ACCEPTANCE -> CONVERGENCE

Generation is looped tightly inside the Convergence engine (max 3 loops). Semantic actions are planned, scopes are targeted, and the system attempts to resolve blocks recursively before exiting to the UI.

## MULTI-PAGE ORCHESTRATION AUTHORITY
PROJECT -> SITE PLAN -> MULTI-PAGE ORCHESTRATOR -> [PER-PAGE CONVERGENCE] -> CROSS-PAGE OBSERVABILITY -> SITE ACCEPTANCE

The orchestrator maps the entire Site Plan, resolving generation across all pages before evaluating cross-page token cohesion and internal navigation integrity. Final project readiness requires unanimous page convergence and zero global consistency violations.

## Canonical Architecture (Phase 11)
The absolute strict flow for all AI processing is as follows:

1. **EXTERNAL INTELLIGENCE**: Gathers budgeted, evidence-backed external research context and patterns (web/design/assets/typography/MCP) through intelligent tool selection and provider routing while sanitizing against malicious payloads.
2. **RESEARCH MEMORY**: Preserves patterns, references, uncertainties, and decisions securely.
3. **PROJECT INTELLIGENCE**: Ingests brief and external context to establish global objective and constraints.
4. **SITE PLAN**: Translates objective into a multi-page routing map.
5. **PAGE ROLE**: Classifies a page's specific semantic purpose.
6. **CONTENT INTELLIGENCE**: Generates required structured content density.
7. **RESPONSIVE INTELLIGENCE**: Governs multi-breakpoint structural requirements.
8. **INTERACTION INTELLIGENCE**: Controls keyboard, touch, and state mechanics.
9. **GENERATION PLAN**: Consolidates all rules into a Generation-ready scaffold.
10. **GENERATION**: LLM outputs code matching the strict scaffold.
11. **OBSERVABILITY**: Extracts runtime AST and visual data from generated output.
12. **GENERATION QUALITY**: Grades output cleanly against input rules.
13. **GENERATION CONVERGENCE**: Analyzes failures and enforces targeted regeneration.
14. **MULTI-PAGE ORCHESTRATION**: Assures global component links are unbroken.
15. **SITE ACCEPTANCE**: Project is holistically sealed.
16. **RELEASE INTELLIGENCE**: Validates deployability without executing deployment.
17. **DEPLOYMENT CONTROL**: Evaluates authorization blocks for live releases.
18. **DEPLOYMENT EXECUTION**: Hands execution via rigid adapters to prevent CLI injection.
19. **RELEASE VERIFICATION**: Asserts live-state matches deployment artifact.

## RELEASE INTELLIGENCE AUTHORITY

* Site Acceptance precedes Release Intelligence.
* Release Intelligence is the final deployment-readiness authority.
* Release Intelligence cannot deploy.
* Release Intelligence cannot execute shell commands.
* Release Intelligence cannot mutate code.
* Missing evidence cannot become success.
* Secrets cannot cross the client boundary.
* `ready` requires explicit verified evidence.

## DEPLOYMENT CONTROL AUTHORITY

* Release Intelligence determines deployment eligibility.
* Deployment Control determines whether execution is authorized.
* Deployment Execution is isolated behind a provider adapter.
* The AI cannot generate deployment commands.
* The Factory cannot bypass release gates.
* Production deployment requires explicit authorization.
* Verification is required before declaring deployment successful.
* Rollback is a controlled typed operation.
* Secrets never cross the client boundary.

The canonical architecture is now:
`PROJECT → SITE PLAN → PAGE ROLE → CONTENT → RESPONSIVE → INTERACTION → GENERATION → OBSERVABILITY → QUALITY → CONVERGENCE → MULTI-PAGE → SITE ACCEPTANCE → RELEASE INTELLIGENCE → DEPLOYMENT CONTROL → DEPLOYMENT → VERIFICATION`

