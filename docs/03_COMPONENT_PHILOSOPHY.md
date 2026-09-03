# Component Philosophy

1. **Reusability**: Build components that can be used across multiple distinct websites.
2. **Encapsulation**: Components should own their layout and style constraints. Do not bleed margins unless explicitly designed as a spacing component.
3. **Variants**: Use variant systems (e.g., standard, outlined, ghost) rather than creating separate components for slight visual differences.
4. **Client vs. Server**: Default to Server Components. Use `'use client'` only when interactivity or browser APIs are strictly required.
5. **No Logic in Pages**: Pages should only be responsible for data fetching and composing components. UI logic lives in `/components`.
