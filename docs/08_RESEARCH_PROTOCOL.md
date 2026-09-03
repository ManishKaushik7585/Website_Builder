# Research Protocol

When integrating new technology or answering architectural questions, AI agents must follow this process:

1. Search and consult the **official documentation** first.
2. Search the project's official **GitHub repository** (issues/releases) when appropriate.
3. Verify the **current release/version** and compatibility with the existing stack (e.g., Next.js 15, React 19).
4. Review standard **installation instructions**.
5. Document **known limitations** or caveats.
6. **Compare alternatives** if a choice is not obvious.
7. Make a concrete **recommendation**.
8. **Record the decision** in architectural docs if it alters the stack.

## Design & Inspiration Research
The agent is empowered to research web design trends, competitor websites, typography trends, and component patterns.
- **Rule**: Research must **inform** design intelligence. It must NEVER result in blindly copying another website.
- **Adaptation**: Any sourced inspiration (e.g. via 21st.dev) must be strictly mapped into our existing Token Architecture and verified for Accessibility/Performance.

*Never assume an old API or tutorial is still valid. Verify against source truth.*
