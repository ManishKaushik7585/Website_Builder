# Responsive Architecture

1. **Mobile-First**: Define base styles for mobile and use Tailwind's `sm:`, `md:`, `lg:`, `xl:`, and `2xl:` prefixes to scale up.
2. **Fluidity**: Prefer fluid typography and spacing (`clamp()`) for smooth scaling between breakpoints when appropriate, avoiding excessive hardcoded breakpoints.
3. **Intentional Design**: Do not blindly shrink desktop designs. Think about touch targets on mobile and screen real estate on large displays.
4. **Testing**: Components must be explicitly tested across all specified breakpoints (mobile, tablet, desktop, large desktop).
