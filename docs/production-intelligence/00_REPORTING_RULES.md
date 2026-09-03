# REPORT GENERATION RULES & PHILOSOPHY

## 1. PRIMARY OBJECTIVE
The AI agent must produce **factual, evidence-based, concise engineering information** instead of decorative AI prose. The report is an engineering artifact.

## 2. REPORTING PHILOSOPHY
**FACT → EVIDENCE → IMPACT**
- **Fact**: What was implemented?
- **Evidence**: Which file, type, function, test, or command proves it?
- **Impact**: What does this change enable or prevent?

## 3. ABSOLUTE LANGUAGE RULE
Ban unnecessary evaluative adverbs. Do NOT use decorative modifiers such as:
* cleanly, safely, smoothly, intelligently, elegantly, seamlessly, reliably, efficiently, optimally, gracefully, confidently, correctly, successfully, natively, dynamically, securely, flawlessly, smartly, sensibly, rationally, wisely, properly, effectively, beautifully, perfectly, effortlessly, comfortably, intuitively, explicitly, robustly, comprehensively, accurately.

Do not stack descriptive adverbs (e.g. "cleanly and efficiently").

## 4. NO MARKETING LANGUAGE
Never use hype words unless proven by measurable tests:
* "production-grade", "enterprise-grade", "world-class", "best-in-class", "flawless", "perfect", "revolutionary", "cutting-edge", "highly sophisticated", "extremely powerful", "fully optimized"

## 5. EXACT FILE REPORTING
Use exact paths with backticks (e.g. `config/project.ts`). Do not invent filenames. Do not summarize nonexistent implementation details.

## 6. TEST RESULT RULES
Only report test counts that were actually obtained (e.g., `Playwright: PASS — 104/104`). Never estimate, round, or invent test counts.

## 7. COMPLETION VS READINESS
Use precise terminology: `IMPLEMENTED`, `TESTED`, `DEFERRED`, `BLOCKED`, `PARTIALLY IMPLEMENTED`, `PRODUCTION READY`. Do not equate "phase complete" with "production ready" automatically.

## 8. LIMITATIONS MUST BE HONEST
If limitations exist, report them. If genuinely no limitations exist, state: `No known limitations identified during validation.` Never write `Known Limitations: None` without checking.

## 9. 38-SECTION REPORT STRUCTURE
Every phase FINAL REPORT MUST use exactly these 38 sections. If a section does not apply, write: `Not applicable for this phase.`
1. Exact Files Created
2. Exact Files Modified
3. Architecture
4. Core Models
5. Configuration
6. Core Implementation
7. Integration
8. State / Workflow
9. Validation
10. Error Handling
11. Security
12. Performance
13. Dependencies
14. Data / Persistence
15. AI / Agent Behavior
16. Browser / Runtime Integration
17. Vision / QA Integration
18. Refinement / Mutation Rules
19. Human Approval
20. Observability
21. UI / Lab
22. Documentation
23. Testing
24. Regression Testing
25. Known Failures
26. Deferred Work
27. Known Limitations
28. Architectural Integrity
29. Lint Result
30. TypeScript Result
31. Build Result
32. Playwright Result
33. Regression Result
34. Dependency Result
35. Security Result
36. Production Readiness
37. Remaining Work
38. Formal Completion Status

## 10. EMPTY SECTIONS
Do not fill irrelevant sections with artificial prose. Use `Not applicable for this phase.`

## 11. FABRICATION PROTECTION
Before producing the report, inspect the actual repository state. Do not invent tests, files, or capabilities.

## 12. PRE-EMIT QUALITY CHECK
Validate the report with `scripts/validate-report.ts` before finalizing. Reject and regenerate if it fails filler, repetition, or evidence rules.
