# Architecture Overview

The system uses a clean, non-programmer-friendly architecture:

- `/app`: Next.js App Router definitions.
- `/components`: UI elements. Organized by type (`ui/`, `layout/`, `navigation/`, `sections/`, etc.).
- `/lib` & `/utils`: Helper functions, constants, and external integrations.
- `/hooks`: Custom React hooks.
- `/config`: Centralized system configurations and token definitions.
- `/styles`: Global CSS and

## The Flow of Construction
Every piece of UI must progress through these strict layers:

1. **DESIGN INTELLIGENCE** (Conceptual rules & physics)
2. **DESIGN TOKENS** (Strict, validatable TS source of truth)
3. **MOTION INTELLIGENCE** (Physics and timing rules)
4. **MOTION TOKENS** (Easings, durations, and spring constants)
5. **PRIMITIVES** (Headless logic, Radix UI style)
6. **COMPONENTS** (Isolated visual units)
7. **PATTERNS** (Groups of components)
8. **SECTIONS** (Layout-aware assemblies)
9. **PAGES** (Data-aware routing level)

- `/public`: Static media, split explicitly into images, videos, 3D models, textures, icons, and fonts.
- `/docs`: Architectural rules and project documentation.
- `/agents`: Rules and context for AI coding assistants.
