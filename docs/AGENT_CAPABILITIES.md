# Agent Capabilities Map

The following map defines the *verified* capabilities currently available to the Antigravity agent in this project.

| Capability         | Tool                        | Type        | Status | How Agent Uses It |
| ------------------ | --------------------------- | ----------- | ------ | ----------------- |
| UI quality         | Vercel Web Guidelines       | Agent Skill | Reference Only | The agent references these rules conceptually to enforce clean spacing and typography. |
| React architecture | Vercel React Best Practices | Agent Skill | Reference Only | The agent follows these conceptual rules, supplemented by our ESLint configuration. |
| Website analysis   | Taste-Skill                 | Agent Skill | Reference Only | Used conceptually as a high-end design authority. |
| Component sourcing | 21st.dev                    | MCP         | Configured (Global) | The agent calls the 21st MCP tools to search and fetch premium UI components. |
| Browser control    | Playwright                  | MCP         | Installed (Local) | The agent invokes Playwright MCP tools to navigate, click, and inspect the DOM. |
| Browser QA         | Playwright                  | CLI         | Installed (Local) | The agent runs `npx playwright test` for E2E validation. |

*Note: Capabilities marked "Reference Only" are not physically installed agent scripts, but documented authorities that the agent is instructed to follow.*
