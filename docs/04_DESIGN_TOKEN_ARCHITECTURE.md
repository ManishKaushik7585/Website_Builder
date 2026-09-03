# 04. Design Token Architecture

## The Core Philosophy
A robust design engine relies on strict separation between *raw values* and *intended usage*. This architecture prevents the codebase from becoming an unmaintainable web of hardcoded hex codes and pixel values.

## The 3-Tier Hierarchy

### 1. Primitive Tokens
The lowest level of abstraction. These describe **what** a value is, independent of its context.
- **Example**: `color.blue.500 = #3b82f6`
- **Rule**: NEVER use primitive tokens directly in application components.

### 2. Semantic Tokens
The middle level of abstraction. These describe the **purpose** or **intent** of a value.
- **Example**: `color.text.primary = [reference to primitive]`
- **Rule**: This is the primary layer components should consume. When the "Design Mode" changes (e.g., from Light to Dark, or Minimal to Brutalist), the semantic tokens are remapped to new primitives. Components remain untouched.

### 3. Component Tokens
The highest level of abstraction. These describe a value strictly scoped to a specific UI element.
- **Example**: `button.primary.background = [reference to semantic]`
- **Rule**: Keep this layer sparse. Only introduce component tokens when a complex component requires rigid isolation that semantic tokens cannot elegantly cover.

## Tailwind v4 CSS Consumption Pipeline
Our Single Source of Truth is `config/design-tokens/*.ts`.
The consumption pipeline explicitly forbids duplicate declarations:

1. **Master Definitions**: Defined strictly in `config/design-tokens/*.ts` using rigorous validation rules.
2. **CSS Translation**: The TypeScript definitions are mapped to root CSS variables (`--color-text-primary: ...`).
3. **Tailwind `@theme`**: Tailwind v4 dynamically consumes these CSS variables.
4. **React Component**: Consumes standard Tailwind classes (e.g., `text-text-primary`).

This guarantees that a single TypeScript update propagates perfectly through the CSS layer into the UI without desyncing Tailwind's internal utilities.
