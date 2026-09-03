# Motion Tool Evaluation

## Native CSS & Web APIs (Selected for Phase 3C)
- **Capabilities**: Hover, Focus, Press, Intersection Reveals.
- **Strengths**: 0kb bundle size, native browser optimization, compositor thread performance.
- **Why Selected**: Fits the strict zero-dependency, high-performance architecture mandate.

## Framer Motion (Deferred)
- **Strengths**: Powerful declarative React physics, `AnimatePresence` for exit animations, complex layout animations.
- **Weaknesses**: Heavy bundle size (~30kb+ gzipped).
- **Decision**: Rejected for Phase 3C. Should only be installed in advanced phases if exit animations or draggable physics are strictly required.

## GSAP (Deferred)
- **Strengths**: Industry-standard scroll choreography (ScrollTrigger).
- **Weaknesses**: Imperative API fights with React's declarative nature; requires extensive cleanup `useGSAP`.
- **Decision**: Rejected for Phase 3C.

## Lenis (Deferred)
- **Strengths**: Smooth scrolling.
- **Weaknesses**: Overrides native scroll behavior, potential accessibility risks.
- **Decision**: Rejected. Native scrolling preferred.
