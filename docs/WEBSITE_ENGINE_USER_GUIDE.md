# WEBSITE ENGINE — COMPLETE USER GUIDE

Welcome to Website Engine! This guide explains what the system is, what it can do, and how to use it. It is written for non-technical users, designers, and product managers who want to understand the platform without reading code.

---

## 01 — What Is Website Engine?

Website Engine is an advanced AI system that designs, builds, tests, and prepares complete websites for deployment based on a simple project brief. 

Instead of just spitting out code like a typical AI chatbot, Website Engine acts like an entire digital agency. It researches design trends, creates a creative direction, plans the website's structure, generates the pages, checks them for errors, automatically fixes problems, and ensures the site is ready for the real world. 

**Example:**
> You give Website Engine a brief for a premium fashion brand. Instead of simply generating a homepage, it can research relevant design patterns, create a creative direction, plan the website structure, generate multiple pages, evaluate the result, refine it, test it, and prepare it for deployment.

---

## 02 — What Can I Make With It?

Website Engine is designed to build high-end, production-ready websites. 

### Best suited for
- SaaS (Software as a Service) marketing sites
- Portfolio websites
- Corporate websites
- Landing pages
- Agency websites

### Possible with customization
- E-commerce storefronts (requires connecting a real checkout system)
- Editorial/Blog sites
- Product dashboards

### Currently limited / unverified
- Highly experimental 3D websites (WebGL/Three.js support requires manual integration)
- Complex web applications with deep user-authentication flows

---

## 03 — What Makes Website Engine Unique?

Most AI website builders generate a single page and leave the rest to you. Website Engine is different because it uses a structured, intelligent process.

- **Creative Direction Before Generation:** Website Engine first decides what the website should feel and look like. It creates a clear design plan covering colors, typography, layout, and visual style. This ensures the design is intentional, not random.
- **Adaptive Memory:** The system remembers what works and what doesn't across different projects. If a specific layout pattern always fails quality checks, the engine learns to avoid it. Importantly, **project-specific details are isolated**—it will never accidentally leak one client's data into another client's project.
- **Automatic Quality Evaluation:** After generating a page, Website Engine acts as its own Quality Assurance (QA) tester. It checks for visual bugs, accessibility issues, and broken layouts. 
- **Refinement Loops:** If the system finds a bug, it doesn't give up. It diagnoses the problem and automatically regenerates a fix, repeating this process up to 3 times until the page is perfect.
- **Deterministic Behavior:** The system doesn't rely on random AI guesswork. It uses strict rules and boundaries. If a design breaks rules, it is rejected. 

---

## 04 — THE COMPLETE WORKFLOW

Website Engine operates in a strict, step-by-step pipeline.

**BRIEF**
You tell the system what you want to build.

↓

**RESEARCH (External Intelligence)**
The system can look up design trends, patterns, and external data to understand the best way to build your site.

↓

**CREATIVE DIRECTION**
The system creates a visual plan: typography, colors, and overall mood.

↓

**SITE PLAN (Project Intelligence)**
The system decides which pages the website needs (e.g., Home, About, Pricing).

↓

**PAGE DESIGN (Content & Responsive Intelligence)**
The system plans the structure of an individual page, including mobile layouts.

↓

**GENERATION**
The system actually writes the code for the page.

↓

**QUALITY CHECK & REFINEMENT (Convergence)**
The system inspects the page. If it finds issues, it automatically fixes them.

↓

**SITE ACCEPTANCE**
The system ensures all pages link together properly and follow the same design rules.

↓

**DEPLOYMENT PREPARATION (Release Intelligence)**
The system checks if the site is safe and ready to be published to the internet.

---

## 05 — HOW TO USE WEBSITE ENGINE — STEP BY STEP

### Step 1 — Prepare your project
Think about your brand, your audience, and what pages you need. Gather any specific requirements.

### Step 2 — Create a project
In the system's interface, create a new workspace for your website.

### Step 3 — Write the brief
Write a clear description of what you want. (See Section 06 for tips).

### Step 4 — Start generation
Submit the brief. The engine will begin its research and planning phases.

### Step 5 — Review Creative Direction
The system will produce a "Creative Direction" plan. You can review the typography, colors, and layout strategies it has chosen.

### Step 6 — Generate the website
The system will begin building the pages based on the approved Creative Direction.

### Step 7 — Review the result
Look at the generated pages. The system will provide visual outputs and code.

### Step 8 — Refine
If the system found bugs, it will automatically refine them. If you see something you don't like, you can provide feedback for regeneration.

### Step 9 — Test
The system runs automated tests to ensure buttons work, layouts don't break on mobile, and the code is clean.

### Step 10 — Accept
Once all pages pass the quality checks, the project is marked as "Accepted."

### Step 11 — Deploy
You can explicitly authorize the system to publish the website live. (Note: Live deployment is currently unverified).

---

## 06 — HOW TO WRITE A GOOD BRIEF

A good brief is the most important part of the process. The better your instructions, the better the website.

**Include:**
- Brand personality (e.g., minimalist, playful, corporate)
- Target audience
- Business goals
- Required pages
- Any strict constraints (e.g., "Must use a dark theme")

### Weak brief
> "Make a website for my shoe company."

### Strong brief
> "Create a modern, luxury e-commerce storefront for 'Aura Footwear'. The brand is minimalist, using lots of negative space, sharp typography, and a monochrome color palette with subtle silver accents. We need a Homepage, a Product Gallery, and an About Us page. The target audience is urban professionals aged 25-40. The design must be fully responsive and look premium on mobile devices."

**Why is the strong brief better?** It gives the system clear constraints. Without constraints, the AI has to guess, which leads to generic results.

---

## 07 — CREATIVE DIRECTION EXPLAINED

Before writing a single line of code, Website Engine creates a **Creative Direction**. 

This is a **plan for the website**, not the website itself. It decides:
- Typography (which fonts to use)
- Colors (primary, secondary, background, text)
- Layout strategy (tight grids vs. open space)
- Motion (fast animations vs. slow, subtle fades)

Why does this exist? If the AI tries to design and code at the same time, it makes mistakes. By separating the *thinking* from the *doing*, the final website looks much more cohesive and professional.

---

## 08 — RESEARCH & EXTERNAL INTELLIGENCE

Website Engine doesn't have to guess what a modern pricing table looks like; it can research it.

**Research vs. Copying:**
The system uses external research (like looking up popular UI components or reading design systems) as *inspiration and evidence*. It translates this research into abstract patterns. It **does not** blindly copy and paste code from other websites.

**Current Capabilities:**
- Provider Abstraction: **LIVE**
- Mock/Simulated External Research: **MOCK VERIFIED**
- Live Web Research / GitHub Sourcing: **UNVERIFIED** (Built into the architecture, but not live-tested in production).

---

## 09 — ADAPTIVE MEMORY

Website Engine learns over time using **Adaptive Memory**.

If a specific layout always causes mobile overflow errors, the system remembers that failure and avoids it in the future. If a user provides explicit feedback ("Make buttons larger"), the system remembers that preference.

**Project Isolation:**
Crucially, information from Project A will **never** leak into Project B. If you tell the system to make your portfolio pink, it won't suddenly make your corporate client's website pink. This boundary is strictly protected by regression testing.

---

## 10 — WEBSITE GENERATION

Website Engine builds websites by composing reusable components, just like a real developer.

Instead of writing one massive block of code, it generates a header, a hero section, a feature grid, and a footer, and stitches them together. This ensures that the navigation bar looks exactly the same on the Homepage as it does on the About page.

---

## 11 — AUTOMATIC QUALITY & REFINEMENT

The system has a built-in refinement loop (Convergence).

**Initial website** → **Find problems** → **Understand why** → **Improve** → **Check again** → **Accept or refine again**

To prevent the system from getting stuck in an endless loop, it is strictly limited to **3 refinement attempts**. If it can't fix a problem after 3 tries, it stops and asks a human for help. 

---

## 12 — TESTING & QUALITY CONTROL

"The system generated something" is very different from "The system verified that it works."

Website Engine automatically checks:
- **TypeScript & Linting:** Ensures the code is perfectly formatted and free of syntax errors.
- **Browser Testing:** Uses headless browsers to load the site and check if it actually renders.
- **Security Boundaries:** Ensures the AI didn't invent fake external links or expose private data.

---

## 13 — ACCESSIBILITY

Website Engine checks for basic accessibility (e.g., ensuring text is readable and buttons can be clicked). However, **it does not guarantee universal WCAG compliance**. If your business requires strict legal accessibility compliance, a human expert must review the final site.

---

## 14 — RESPONSIVE DESIGN

Websites are expected to work on Desktop, Tablet, and Mobile. 

Website Engine's "Responsive Intelligence" plans how elements should stack or resize before generating the code. The browser testing phase then actively checks if any text or images are overflowing off the screen on mobile devices.

---

## 15 — MOTION & INTERACTION

Website Engine applies motion intelligently. Instead of random elements flying around, it uses a centralized "Motion Intelligence" system to ensure that hover effects, entrance animations, and transitions feel premium, intentional, and consistent across the entire site.

---

## 16 — DEPLOYMENT

Website Engine can prepare a project for release. It acts as a gatekeeper:

- It verifies that the project is completely finished.
- It checks for leaked secrets or unsafe code.
- **It requires explicit human approval to deploy.** The AI cannot publish a website to the internet by itself.

*(Note: While the architecture for deployment exists and is verified in testing, actual live deployment to external providers like Vercel is currently unverified).*

---

## 17 — WHAT REQUIRES API KEYS?

| Capability | Works without key? | Current Status |
| ---------- | ------------------ | -------------- |
| Local Generation | Yes (if using local/mock providers) | LIVE |
| External Web Research | No (Requires Tavily/Firecrawl) | UNVERIFIED |
| Live Vercel Deployment | No (Requires Vercel Token) | UNVERIFIED |
| High-end AI Reasoning | No (Requires OpenAI/Anthropic) | LIVE |

---

## 18 — WHAT IS AUTOMATIC VS HUMAN CONTROLLED?

| Task | Automatic | Human Approval Required |
| ---- | --------- | ----------------------- |
| Research | Yes | No |
| Creative Direction | Yes | Yes (Optional Review) |
| Generation | Yes | No |
| Refinement (Bug fixing) | Yes | No |
| Acceptance | Yes | Yes (Final sign-off) |
| Deployment to Production | No | **Yes (Always)** |

---

## 19 — PROJECT STRUCTURE (For Technical Users)

If you look at the codebase, here is how it is organized:
- `app/` - The user interface you interact with.
- `components/` - The core AI intelligence systems (e.g., `creative-direction/`, `generation-convergence/`).
- `config/` - Strict types, rules, and limits that govern the AI.
- `docs/` - System rules and agent instructions.
- `registry/` - Validators that ensure AI outputs are safe and correct.
- `tests/` - The automated testing suite (Playwright/Jest).

---

## 20 — IMPORTANT SYSTEMS

### Creative Direction Orchestrator
**What it does:** Decides the visual plan for the site.
**Why it exists:** To prevent the AI from making random, inconsistent design choices.
**What it receives:** The user brief and research memory.
**What it produces:** A strict design contract (colors, fonts, mood).
**What it must NOT do:** Write code.

### Convergence Orchestrator
**What it does:** Fixes bugs in generated code.
**Why it exists:** AI makes mistakes; this system automatically corrects them.
**What it receives:** Broken code and error reports.
**What it produces:** Fixed code.
**What it must NOT do:** Loop infinitely (it is capped at 3 tries).

---

## 21 — SAFETY & SECURITY

Website Engine treats all external AI output as **untrusted data**. 
- It scans for prompt injections (e.g., "IGNORE PREVIOUS INSTRUCTIONS").
- It isolates project memory so client data doesn't leak.
- It requires human authorization before launching anything to the public web.

---

## 22 — FAILURE HANDLING

If the AI fails to generate a page, or if an external provider (like a research API) times out, the system **gracefully degrades**. It will rely on safe fallbacks or halt the process and alert you, rather than crashing the entire application.

---

## 23 — LIMITATIONS

**Fully Supported:**
- Multi-page generation
- Component-based architecture
- Automated refinement loops

**Supported with limitations:**
- Complex interactive animations (best handled via external components)

**Unverified / Not currently supported:**
- Live deployment to Vercel (Architecture exists, but unverified)
- High-concurrency load (Generating 50 websites at the exact same time)
- Live GitHub scraping

---

## 24 — CURRENT CERTIFICATION STATUS (Phase 14)

**Architecture Status:** READY / FROZEN
**Test Status:** Fully Verified (418 passed tests)
**Live Provider Status:** UNVERIFIED
**Production Certification Status:** UNVERIFIED (Awaiting live-environment testing).

---

## 25 — COMMON USE CASES

### "I want to build a SaaS website"
Provide a brief describing your product, pricing tiers, and target audience. Website Engine will research SaaS trends, design a clean, high-conversion layout, and generate a Homepage, Features page, and Pricing page with identical navigation.

---

## 26 — BEST PRACTICES

### Before generation
- [ ] Write a highly detailed brief.
- [ ] Define your target audience clearly.
- [ ] Specify any hard constraints (e.g., "Must have a dark mode").

### During generation
- [ ] Review the Creative Direction before generation starts. If the typography feels wrong, stop and correct it.

---

## 27 — TROUBLESHOOTING GUIDE

### "Generation failed after 3 loops"
The AI couldn't fix a complex bug. Check the error logs, simplify your brief, and try again.

### "The website looks inconsistent"
Ensure you provided a strong brief. If the AI doesn't have a strong Creative Direction, it will guess differently on every page.

---

## 28 — GLOSSARY

- **Creative Direction:** The visual plan (colors, fonts, vibe).
- **Site Plan:** The architectural map of which pages exist.
- **Adaptive Memory:** The system's ability to remember past successes and failures.
- **Convergence:** The automatic bug-fixing loop.

---

## 29 — QUICK START

1. Create a project.
2. Write a clear, detailed brief.
3. Let Website Engine research and plan.
4. Review the Creative Direction.
5. Generate the website.
6. Let the system automatically test and refine it.
7. Approve the final result.

---

## 30 — EXAMPLE: FROM BRIEF TO WEBSITE

**Brief:** "Create a modern landing page for a boutique coffee roaster."
↓
**Research:** System learns that boutique coffee brands use earthy tones, serif fonts, and large hero images.
↓
**Creative Direction:** System locks in a brown/cream color palette and the 'Playfair Display' font.
↓
**Site Plan:** System decides on a single long-scroll Homepage.
↓
**Generation:** System writes the code for a Hero section, Product Grid, and Footer.
↓
**Testing:** System finds that the Product Grid overflows on mobile.
↓
**Refinement:** System automatically rewrites the CSS to stack the grid on small screens.
↓
**Final Website:** A perfect, responsive, premium coffee website is ready for approval.
