# PATTERN SOURCING

## Research and Authorities
Vercel's Web Design principles and layouts examined via 21st.dev serve strictly as *research*. They are NOT architectural authorities.

### Split Layouts
- **Observed**: Standard 50/50 and offset 60/40 visual balance.
- **Implemented**: A `Split` pattern accepting ratio constraints (`5/7`, `6/6`) with semantic `ReactNode` slots for `media` and `content`.

### Bento Grids
- **Observed**: Dense card clusters sharing varied spans.
- **Implemented**: A decoupled `BentoGrid` handling CSS Grid definitions, wrapping agnostic children to avoid strict coupling to a specific card type.

### Logo Walls
- **Observed**: Infinite animated marquees.
- **Decision**: Deferred marquee animation to avoid bloat and accessibility risks. Implemented a standard responsive inline wrap.
