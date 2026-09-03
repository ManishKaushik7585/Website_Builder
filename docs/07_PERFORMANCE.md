# Performance Architecture

1. **JavaScript Minimization**: Do not ship heavy JS libraries to the client unless strictly necessary. Rely on Server Components by default.
2. **Lazy Loading**: Heavy components, 3D scenes, and large media must be lazily loaded to prioritize Initial Page Load and Time To Interactive (TTI).
3. **Image Optimization**: Use Next.js `<Image />` or optimized picture formats (WebP/AVIF).
4. **Animation**: Prefer hardware-accelerated CSS animations (`transform`, `opacity`) over properties that cause layout thrashing (`width`, `top`, `margin`).
5. **Bundle Size**: Routinely audit bundle size before introducing new dependencies.
