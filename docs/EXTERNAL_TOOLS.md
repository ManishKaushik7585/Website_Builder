# External Tools Evaluation

## Tool Decision Matrix

| Tool | Type | Status | Scope | Installation | Agent Access | Purpose | Phase | Official Source |
| ---- | ---- | ------ | ----- | ------------ | ------------ | ------- | ----- | --------------- |
| **Vercel Agent Skills** | Agent Skill | Reference Only | Global (Conceptual) | N/A | None | React & Next.js rules | 1 | github:vercel |
| **Vercel Web Interface Guidelines** | Agent Skill | Reference Only | Global (Conceptual) | N/A | None | Clean UI standards | 1 | github:vercel |
| **Taste-Skill** | Agent Skill | Reference Only | Global (Conceptual) | N/A | None | Premium design curation | 2 | github:taste-skill |
| **21st.dev MCP** | MCP Server | Configured | Global | `mcp_config.json` | Direct tool invocation | Sourcing premium UI | 2A | npm:@21st-dev/cli |
| **Playwright MCP** | MCP Server | Installed | Project-Local | `npm install -D @playwright/mcp` | Direct tool invocation | Agent browser control | 2A | npm:@playwright/mcp |
| **Playwright Test CLI** | CLI | Installed | Project-Local | `npm install -D @playwright/test` | CLI (`npx playwright test`) | E2E Testing | 2A | npm:@playwright/test |
| **Storybook** | Dev Tool | Deferred | Project-Local | N/A | None | Component isolation | 3 | npm:storybook |
| **Three.js / GSAP / Motion** | Libraries | Deferred | Project-Local | N/A | None | 3D & Animation | 3 | Various |

## Overview
This document serves as the strict registry of external tools evaluated for this project.

### Tool Status Definitions:
- **Installed**: The tool/skill is physically installed and the agent can access it natively.
- **Configured**: The tool is correctly configured but may be externally hosted or invoked through configuration (e.g. Global MCPs).
- **Reference Only**: The project knows about the tool, but the agent cannot currently invoke it as a script. Used conceptually.
- **Deferred**: Intentionally chosen not to install/configure until a later phase.
- **Incompatible**: The current environment does not support the tool.
