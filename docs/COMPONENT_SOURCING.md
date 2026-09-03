# Component Sourcing Registry

This registry documents the research and pattern-sourcing process for non-trivial composite components. 21st.dev and official WAI-ARIA guidelines serve as the primary research authority for interaction and layout patterns.

## Interaction: AccordionItem
- **Research Source**: WAI-ARIA Authoring Practices (Accordion) & 21st.dev (Headless UI patterns)
- **Patterns Examined**: Native HTML `<details>`/`<summary>` vs React state-driven ARIA implementation.
- **Why Relevant**: Accordions are ubiquitous for FAQ and content density, but often fail accessibility or rely on heavy animation libraries.
- **Useful Ideas Extracted**: 
  - Using `aria-expanded` and `aria-controls` to bind the trigger to the content panel.
  - Keyboard navigation (Space/Enter to toggle).
- **Implementation Chosen**: React state-driven approach (`"use client"`) using `Stack` and `Button`/`Box` primitives to ensure full control over styling without browser inconsistencies of `<details>`.
- **Dependencies Rejected**: Radix UI Accordion, Framer Motion (rejected to maintain zero-dependency rule; basic CSS transitions used instead).
- **Token Adaptation**: Consumes semantic colors (`textPrimary`, `surfaceElevated`) and layout primitives.

## Interaction: Tabs
- **Research Source**: WAI-ARIA Authoring Practices (Tabs) & 21st.dev
- **Patterns Examined**: Radix UI Tabs, standard WAI-ARIA manual/automatic activation patterns.
- **Why Relevant**: Crucial for condensing related views (e.g., pricing intervals, feature sets).
- **Useful Ideas Extracted**:
  - Distinct roles: `tablist`, `tab`, `tabpanel`.
  - Keyboard navigation: Left/Right arrows shift focus and selection.
  - `aria-selected` tracking.
- **Implementation Chosen**: A custom, lightweight compound component (`Tabs`, `TabList`, `Tab`, `TabPanel`) utilizing React Context to share state (`"use client"`). Manual activation via arrows.
- **Dependencies Rejected**: Headless UI Tabs, Radix UI Tabs.
- **Token Adaptation**: Minimal styling; relies on `cn` and token colors to indicate active states.

## Interaction: Toggle
- **Research Source**: WAI-ARIA (Switch) & Tailwind UI patterns
- **Patterns Examined**: Native `<input type="checkbox">` visually hidden vs `role="switch"`.
- **Why Relevant**: Need a clear binary choice component (e.g., Monthly/Yearly pricing).
- **Useful Ideas Extracted**: The `role="switch"` with `aria-checked` provides better semantics than a styled checkbox for instant-effect toggles.
- **Implementation Chosen**: Button-based `role="switch"` (`"use client"`).
- **Dependencies Rejected**: Radix Switch.

## Commerce: PricingCard
- **Research Source**: 21st.dev SaaS templates & Stripe pricing pages
- **Patterns Examined**: 3-column comparative grids.
- **Why Relevant**: The most common conversion component for SaaS.
- **Useful Ideas Extracted**: Hierarchical separation: Tier name -> Price -> Description -> Action -> Feature List.
- **Implementation Chosen**: Server-rendered composition of `Stack`, `Text`, `Heading`, `Price`, and `Divider` primitives. Responsive stacking (1 col mobile, 3 cols desktop).
- **Dependencies Rejected**: None evaluated (purely structural).

## Navigation: Breadcrumb
- **Research Source**: WAI-ARIA Breadcrumb pattern
- **Patterns Examined**: Ordered lists with semantic separators.
- **Useful Ideas Extracted**: Using `<nav aria-label="Breadcrumb">` wrapping an `<ol>`. Separators should have `aria-hidden="true"`.
- **Implementation Chosen**: Server-rendered `nav` > `ol` > `li` structure composing the `Link` primitive.
