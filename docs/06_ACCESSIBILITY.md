# Accessibility Rules

Accessibility (a11y) is a foundational architectural requirement, not an afterthought.

1. **Semantic HTML**: Use correct tags (`<button>`, `<nav>`, `<main>`, `<article>`) instead of generic `<div>` elements.
2. **Keyboard Navigation**: Ensure all interactive elements are reachable via keyboard and have distinct, visible focus states.
3. **Hierarchy**: Maintain strict heading hierarchy (`<h1>`, `<h2>`, etc.) without skipping levels.
4. **ARIA Attributes**: Use ARIA labels and roles only when semantic HTML falls short.
5. **Alt Text**: All meaningful images must have descriptive alt text; decorative images must have empty `alt=""`.
6. **Color Contrast**: Maintain WCAG standard contrast ratios.
7. **Motion**: Respect `prefers-reduced-motion` settings in CSS and JS animations.
