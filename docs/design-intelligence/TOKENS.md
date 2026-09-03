# Design Token Consumption Architecture

This project strictly enforces a **Single Source of Truth** for all design values.

### The Problem
In standard Next.js + Tailwind projects, tokens are often scattered between `globals.css` (CSS variables), `tailwind.config.ts`, and hard-coded values in components. This leads to drift and breaks the ability to easily swap design modes.

### Our Solution: TypeScript as the Master Source
We maintain the entire design token hierarchy in machine-readable TypeScript (`config/design-tokens/*.ts`). 

```text
TypeScript Tokens (`config/design-tokens/`)
↓
CSS Variables (Generated / Injected at build time into `globals.css` or Tailwind theme)
↓
Tailwind Utilities (`bg-primary`, `text-heading`)
↓
React Components
```

### Tailwind v4 Integration
Because Tailwind v4 consumes CSS variables directly via the `@theme` directive, our TypeScript architecture operates as a preceding compilation step (or dynamic injection layer) that writes to a `theme.css` file imported by Tailwind. 
- **Rule 1**: CSS must not independently redefine the same design values.
- **Rule 2**: Tailwind must not contain a second conflicting set of values.
- **Rule 3**: Components must NEVER hard-code values (e.g. `#3b82f6` or `24px`) that belong in the token system.

### Hierarchy Enforcement
- **Primitive**: `primitiveColors.blue500` (Raw value)
- **Semantic**: `semanticColors.textPrimary` (Mapped to primitive)
- **Component**: `componentColors.buttonBg` (Mapped to semantic, sparse implementation)

Future design modes (e.g., "Dark Mode", "Luxury Mode") only need to override the **Semantic Layer**. The React components never change, as they exclusively reference semantic or component-level Tailwind classes.