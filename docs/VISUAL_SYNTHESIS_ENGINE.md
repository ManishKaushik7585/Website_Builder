# VISUAL SYNTHESIS ENGINE
## 1. Problem Definition
Website Engine previously collapsed complex creative direction into generic UI components (e.g., repeating 3-column feature cards and centered heroes). It lacked a Visual Synthesis layer capable of composing spacing, motion, narrative rhythm, and asset direction.

## 2. Research & Generalizable Principles
Using the local `explore-website.ts` Playwright capability, we studied references like `unitedcarriers.com` (Industrial) and `linear.app` (Premium Tech).

### Extracted Design Principles:
- **Typography as a Graphic Object**: Oversized display typography acts as a spatial anchor before introducing heavy UI content. 
- **Image/Space Tension**: Large isolated imagery creates a visual anchor against negative space rather than just sitting in a grid cell.
- **Narrative Rhythm**: Pages alternate between high-density informational sections and low-density visual moments (Visual Interruptions) to create pacing.
- **Progressive Reveal**: Scroll position is used to progressively reveal information, transforming reading into a cinematic experience.

## 3. Capability-Gap Matrix
| Capability | Reference Evidence | Current Capability | Gap | Priority | Dependency Req? |
| --- | --- | --- | --- | --- | --- |
| **Cinematic Motion** | Smooth scroll-linked reveals (Linear/United) | CSS transitions only | No scroll-linked or complex stagger animation | High | Yes (`framer-motion`) |
| **Asset Direction** | Isolated objects, full-bleed cinematic imagery | Generic `img` tags | Images lack semantic visual traits | High | No |
| **Layered Overlap** | Text crossing image boundaries | Standard block grid | Lacks overlap primitives | Medium | No |
| **Visual QA** | "Boring" vs "Premium" | Checks DOM correctness | QA passes generic templates | High | No |

## 4. Visual Language & Narrative Model
The configuration `CreativeDirectionContract` will be expanded to include:
- **`visualLanguage`**: `typographicScale`, `imageDominance`, `spatialTension`, `visualContrast`.
- **`narrativeArchitecture`**: An array mapping the narrative journey (e.g., `["Manifesto", "Proof", "Visual Interruption", "Services", "Resolution"]`).

## 5. Asset Direction Strategy
Images will no longer be generic. They will require specific semantic properties: `subject`, `backgroundStyle` (isolated vs full-bleed), `scale`, and `overlapIntent`.

## 6. Safety & Convergence
We are expanding `QADiagnosis.ts` to detect:
- Excessive 3-column grids.
- Insufficient visual scale changes.
- Repeated symmetric layouts.
These trigger a semantic refinement pass, forcing the AI to choose diverse compositions.
