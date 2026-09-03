# Dependency Policy

Before installing any third-party library, evaluate it strictly against these criteria:

1. **Native First Validation**: Before adding any dependency, determine whether the required capability can already be achieved with:
   - native browser APIs
   - CSS
   - React
   - existing project dependencies
   - an already-approved external tool
   *Only introduce a new dependency if all the above are insufficient.*
2. **Necessity**: Can this be achieved reasonably with native CSS, HTML, or React? Never install a library merely because an AI-generated example uses it.
3. **Maintenance**: Is the project actively maintained? When was the last commit/release?
4. **Bundle Size**: What is the impact on client-side payload?
5. **Security & Licensing**: Are there known vulnerabilities? Is the license compatible with commercial work?
6. **Compatibility**: Does it support Server Components, Next.js App Router, and the current React version?
7. **Overlap**: Does it duplicate functionality already provided by another dependency in the project?

*Fewer excellent dependencies are always preferred over many mediocre ones. Never install a library just because it looks nice in a demo.*
