# Design Document — Elite Portfolio Redesign

## Overview

This document describes the technical design for transforming the Adora Portfolio from a
teal/green student site into a dark **intelligence-interface** showcase branded "ADORA.SYSTEMS".
The work is a **visual and UX layer change only** — every backend file, API route, Zod
validator, Supabase client, shared TypeScript type, data file, and existing hook remains
completely untouched.

The redesign targets the following layers:

- `src/app/globals.css` and `src/styles/variables.css` — CSS token replacement
- `src/components/` — new elite component library + updated section components
- `src/components/layout/Navbar.tsx` and `Footer.tsx` — rebrand + glass-morphism
- `src/app/case-studies/page.tsx` — new route
- `src/constants/index.ts` — add Case Studies entry to `NAV_LINKS`

Everything else is read-only for this feature.

### Key Design Principles

1. **Backward-compatible token remapping** — All Tailwind CSS v4 utility classes that
   reference `--background`, `--foreground`, `--accent`, etc. continue to work; only the
   resolved values change.
2. **Zero data duplication** — All section components source data exclusively through
   `usePortfolioData()` and constants already in `src/constants/index.ts`.
3. **Progressive enhancement for motion** — Every animated element queries
   `useReducedMotion()` and degrades to its final visible state when the preference is set.
4. **Composition over modification** — Existing section files are rewritten using the new
   elite component primitives rather than patching individual style strings.

---

## Architecture

### How the Redesign Fits the Existing App Router Structure

The Next.js 15 App Router and `SiteShell` composition remain structurally unchanged:

```
layout.tsx
  └── SiteShell
        ├── Navbar            ← redesigned in-place
        ├── PageTransition    ← UNCHANGED (Framer Motion AnimatePresence)
        │     └── <page content>
        └── Footer            ← redesigned in-place
```

Pages that already exist (`/`, `/skills`, `/projects`, `/contact`) keep their file paths. Only
their imported section components are rewritten. A new `src/app/case-studies/page.tsx` is
created to satisfy Requirement 13.

```
src/app/
  ├── globals.css             ← token overhaul (Req 1)
  ├── layout.tsx              ← UNCHANGED
  ├── page.tsx                ← UNCHANGED (imports section components)
  ├── skills/page.tsx         ← UNCHANGED
  ├── projects/page.tsx       ← UNCHANGED
  ├── contact/page.tsx        ← UNCHANGED
  └── case-studies/
        └── page.tsx          ← NEW (Req 13)
```

### Constraint Boundary

The following paths are write-protected for this feature:

| Protected path | Reason |
|---|---|
| `src/backend/**` | Server-side Supabase / rate-limiting code |
| `src/app/api/**` | API route handlers |
| `src/types/index.ts` | Shared frontend TypeScript types |
| `src/features/portfolio/data/*.ts` | Canonical data arrays |
| `src/features/portfolio/hooks/useContactForm.ts` | Contact form state machine |
| `src/features/portfolio/hooks/usePortfolioData.ts` | Data aggregation hook |
| `src/hooks/useTheme.ts` | Theme persistence logic |

---

## Components and Interfaces

### Directory Layout (post-redesign)

```
src/components/
  ├── common/
  │   ├── Button.tsx          ← existing — may have variant tokens updated
  │   ├── Card.tsx            ← existing — may have token updates
  │   └── SectionHeader.tsx   ← existing — kept for non-elite pages if needed
  ├── layout/
  │   ├── Footer.tsx          ← redesigned
  │   ├── Navbar.tsx          ← redesigned
  │   ├── PageTransition.tsx  ← UNCHANGED
  │   └── SiteShell.tsx       ← UNCHANGED
  ├── sections/
  │   ├── AboutSection.tsx         ← rewritten
  │   ├── ContactSection.tsx       ← rewritten
  │   ├── EducationSection.tsx     ← rewritten
  │   ├── HeroSection.tsx          ← rewritten
  │   ├── ProjectsSection.tsx      ← rewritten
  │   ├── SkillsSection.tsx        ← rewritten
  │   └── WhyHireMeSection.tsx     ← rewritten
  ├── seo/
  │   └── JsonLd.tsx          ← UNCHANGED
  └── ui/
      ├── ThemeToggle.tsx     ← UNCHANGED
      └── elite/              ← NEW directory — all 8 elite primitives
            ├── SystemCard.tsx
            ├── MetricPanel.tsx
            ├── TechBadge.tsx
            ├── ProjectStatus.tsx
            ├── SectionLabel.tsx
            ├── IntelPanel.tsx
            ├── TerminalBlock.tsx
            └── index.ts      ← barrel re-export
```

### Elite Component Interfaces

All elite components are pure presentational primitives. They contain no data-fetching logic.

#### `SystemCard`

```tsx
interface SystemCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly glowIntensity?: "low" | "medium" | "high";
  readonly href?: string;       // renders as <a> when provided; <div> otherwise
}
```

Rendered element: `<a>` (when `href` is defined) or `<div>` (otherwise), semantically wrapped
in the elite card border/background styles.

When `href` is defined the component receives `role="article"` on the inner content wrapper
and ensures `aria-label` is passed through from parent usage.

Hover behaviour (Framer Motion `whileHover`): `y: -4`, `boxShadow` interpolated by
`glowIntensity` — low `rgba(0,229,255,0.12)`, medium `rgba(0,229,255,0.22)`, high
`rgba(0,229,255,0.40)`.

#### `MetricPanel`

```tsx
interface MetricItem {
  readonly label: string;
  readonly value: string | number;
  readonly unit?: string;
}

interface MetricPanelProps {
  readonly items: readonly MetricItem[];
  readonly className?: string;
}
```

Renders items in a CSS grid (2-column on mobile, 1-column within narrow containers). Each item
displays `value` + `unit` in `--font-geist-mono` at large size and `label` in small muted mono
below. When scroll triggers the section, a Framer Motion `useMotionValue` + `useTransform`
drives a numeric counting animation from 0 to the target value over 1.5 s ease-out.

#### `TechBadge`

```tsx
interface TechBadgeProps {
  readonly name: string;
  readonly proficiency?: number;  // 0–100; if omitted, dot renders in primary colour
  readonly className?: string;
}
```

The proficiency dot colour mapping is a pure function:

```
proficiency < 50              → --color-muted      (grey)
50 ≤ proficiency ≤ 79        → --color-secondary   (#00A3FF, blue)
proficiency ≥ 80 (or omitted) → --color-primary    (#00E5FF, cyan)
```

Minimum rendered size: `min-h-[44px] min-w-[44px]` to satisfy WCAG touch target requirement
(Req 2.10). Focus ring uses `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]`.

#### `ProjectStatus`

```tsx
type ProjectStatusValue = "Operational" | "Development" | "Archived";

interface ProjectStatusProps {
  readonly status: ProjectStatusValue;
  readonly className?: string;
}
```

Pill colour mapping:

| Status | Colour |
|---|---|
| `Operational` | `#00E5FF` (primary, pulsing dot animation) |
| `Development` | `#F59E0B` (amber) |
| `Archived` | `--color-muted` (grey, no animation) |

Under `prefers-reduced-motion: reduce`, the pulsing dot animation on `Operational` is
suppressed; the colour remains.

#### `SectionLabel`

```tsx
interface SectionLabelProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly as?: "p" | "span" | "div";   // default: "p"
}
```

Renders children with `font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]`.
No animation — purely a typographic primitive.

#### `IntelPanel`

```tsx
interface IntelPanelProps {
  readonly children: React.ReactNode;
  readonly title?: string;       // rendered as monospace header row
  readonly className?: string;
}
```

Structure:

```
┌─ [TITLE] ──────────────────────────────────┐  ← optional title row
│  children                                   │
└─────────────────────────────────────────────┘
```

Border: `1px solid var(--color-border)` (`rgba(0,229,255,0.15)`). Background:
`var(--color-card)` (`#0C1620`). Title row uses `font-mono text-[10px] text-[var(--color-muted)]
uppercase tracking-widest border-b border-[var(--color-border)] px-4 py-2`.

#### `TerminalBlock`

```tsx
interface TerminalBlockProps {
  readonly children: React.ReactNode;
  readonly prompt?: string;    // displayed in title bar after the three dots
  readonly className?: string;
}
```

Structure:

```
● ● ●  [prompt]              ← top bar: three coloured dots + prompt string
──────────────────────────
  children                   ← content area in font-mono text-sm
```

Top bar: `bg-[#0A1520] border-b border-[var(--color-border)]`. Dots are `●` characters at 10px
with colours `#FF5F56`, `#FFBD2E`, `#27C93F`. Background: `var(--color-dark-surface)`.

#### Animation suppression contract (Req 2.9)

Every elite component that uses Framer Motion accepts `motionProps` internally keyed to the
result of `useReducedMotion()`. When `true`:

- `initial` is set to `false` (no entrance animation)
- `whileHover` receives an empty object `{}`
- `animate` receives only `{ opacity: 1 }` (final state)

This is implemented via a shared helper:

```ts
// src/components/ui/elite/utils/motionHelpers.ts
export function getMotionProps(shouldReduce: boolean | null) {
  if (shouldReduce) {
    return { initial: false, animate: { opacity: 1 }, whileHover: {} };
  }
  return {};  // caller provides its own motion props
}
```

---

## Data Models

This redesign introduces **no new data models**. All data contracts are inherited from the
read-only source files:

| Data type | Source file | Consumed by |
|---|---|---|
| `Project[]` | `features/portfolio/data/projects.ts` | `ProjectsSection` via `usePortfolioData` |
| `SkillCategory[]` | `features/portfolio/data/skills.ts` | `SkillsSection`, `HeroSection` (active stack) via `usePortfolioData` |
| `TimelineItem[]` | `features/portfolio/data/timeline.ts` | `EducationSection` via `usePortfolioData` |
| `HireReason[]` | `constants/index.ts` | `WhyHireMeSection` directly |
| `ContactInfo[]` | `constants/index.ts` | `ContactSection` directly |
| `NAV_LINKS` | `constants/index.ts` | `Navbar` — one new entry added for `/case-studies` |

### One Permitted Constants Change

`src/constants/index.ts` receives a single addition to `NAV_LINKS` (Requirement 13.7):

```ts
{ href: "/case-studies", label: "Case Studies" }
```

No other change is made to this file. All other constants (`HIRE_REASONS`, `CONTACT_INFO`,
`SOCIAL_LINKS`, `SITE_METADATA`) remain exactly as written.

### Case Studies Static Data

The `/case-studies` page renders placeholder cards until real case studies are authored. A
local constant is defined **within the page file** (not in the shared data layer):

```ts
// src/app/case-studies/page.tsx
interface CaseStudy {
  id: string;
  title: string;
  overview: string;
  technologies: readonly string[];
  published: boolean;
}

const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "stack-n-stock-deep-dive",
    title: "Stack n Stock — Architecture Deep Dive",
    overview: "How a team of CS students designed and shipped a Flutter + Firebase inventory app from whiteboard to production.",
    technologies: ["Dart", "Flutter", "Firebase"],
    published: false,
  },
  // Additional placeholder entries as required
];
```

This is page-local data, not a shared data file, so it does not conflict with Requirement 16.7.

---

## Design System Architecture

### Token Strategy

The Elite Theme replaces the existing light/dark token split with a single always-dark palette.
The `useTheme` hook and `ThemeToggle` remain unchanged — the toggle still applies/removes the
`.dark` class on `<html>` — but both the `:root` (light) and `:root.dark` (dark) token blocks
now resolve to the same dark Elite values. This preserves backward compatibility with all
Tailwind utility classes while enforcing the always-dark aesthetic.

### `globals.css` Token Block (post-redesign)

```css
@import "tailwindcss";
@import "../styles/variables.css";

/* ── Elite Theme: always-dark palette ────────────────────────── */
:root {
  color-scheme: dark;

  /* Elite semantic tokens */
  --color-primary:       #00E5FF;
  --color-secondary:     #00A3FF;
  --color-accent:        #66FCFF;
  --color-dark-surface:  #081018;
  --color-card:          #0C1620;
  --color-border:        rgba(0, 229, 255, 0.15);
  --color-text:          #EAFBFF;
  --color-muted:         #7E98A3;

  /* Legacy token remaps — all Tailwind classes continue to resolve */
  --background:    #081018;           /* was #f7f8f4 */
  --foreground:    #EAFBFF;           /* was #18211f */
  --muted:         #7E98A3;           /* was #5e6966 */
  --surface:       #0C1620;           /* was #ffffff */
  --surface-soft:  #0F1E2E;           /* was #eef3ea */
  --border:        rgba(0,229,255,0.15); /* was #d9e0d7 */
  --accent:        #00E5FF;           /* was #0f766e */
  --accent-strong: #66FCFF;           /* was #134e4a */
  --accent-soft:   rgba(0,229,255,0.08); /* was #ccfbf1 */
  --ring:          #00E5FF;           /* was #0f766e */

  /* Responsive spacing scale */
  --space-section-y-mobile:  5rem;    /* py-20 */
  --space-section-y-desktop: 7rem;    /* py-28 */
  --space-section-x-mobile:  1rem;    /* px-4  */
  --space-section-x-desktop: 1.5rem;  /* px-6  */
}

/* Dark class mirrors :root — preserves ThemeToggle compatibility */
:root.dark {
  color-scheme: dark;
  /* All tokens are identical to :root for the Elite Theme */
}
```

The `@theme inline` block is preserved and extended:

```css
@theme inline {
  /* Existing mappings — UNCHANGED */
  --color-background:   var(--background);
  --color-foreground:   var(--foreground);
  --color-muted:        var(--muted);
  --color-surface:      var(--surface);
  --color-surface-soft: var(--surface-soft);
  --color-border:       var(--border);
  --color-accent:       var(--accent);
  --color-accent-strong: var(--accent-strong);
  --color-accent-soft:  var(--accent-soft);
  --font-sans:          var(--font-geist-sans);
  --font-mono:          var(--font-geist-mono);

  /* New Elite-specific mappings */
  --color-primary:       var(--color-primary);
  --color-secondary:     var(--color-secondary);
  --color-dark-surface:  var(--color-dark-surface);
  --color-card:          var(--color-card);
  --color-text:          var(--color-text);
}
```

### New CSS Utility Classes

```css
/* ── Elite Utilities ──────────────────────────────────────────── */

/* Glowing cyan border with keyframe pulse */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(0,229,255,0.25), 0 0 20px rgba(0,229,255,0.10); }
  50%       { box-shadow: 0 0 16px rgba(0,229,255,0.45), 0 0 40px rgba(0,229,255,0.20); }
}
.glow-border {
  border: 1px solid var(--color-border);
  animation: glow-pulse 3s ease-in-out infinite;
}

/* Cyan text glow */
.glow-text {
  color: var(--color-primary);
  text-shadow: 0 0 10px rgba(0,229,255,0.5), 0 0 30px rgba(0,229,255,0.2);
}

/* Horizontal scan-line sweep */
@keyframes scan-line {
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 0.04; }
  90%  { opacity: 0.04; }
  100% { transform: translateY(100vh); opacity: 0; }
}
.scan-line::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.04) 50%, transparent 100%);
  height: 4px;
  width: 100%;
  animation: scan-line 8s linear infinite;
  z-index: 9999;
}

/* Dot-matrix grid overlay */
.grid-overlay {
  background-image:
    radial-gradient(circle, rgba(0,229,255,0.03) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Atmospheric body background */
body {
  min-height: 100vh;
  background:
    radial-gradient(ellipse 80% 50% at 10% -10%, rgba(0,229,255,0.07) 0%, transparent 60%),
    var(--background);
  color: var(--foreground);
}
```

### Reduced-Motion Override (preserved + extended)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
  /* Explicitly disable looping Elite utilities */
  .glow-border { animation: none; }
  .scan-line::after { animation: none; content: none; }
  .grid-overlay { animation: none; }
}
```

### `variables.css` Update

The legacy fallback file is updated to serve as a dark-only fallback (no media query branching):

```css
/* src/styles/variables.css — Elite Theme fallback */
:root {
  --background: #081018;
  --foreground: #EAFBFF;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), system-ui, sans-serif;
}
```

---

## Page and Section Architecture

### Section Component → Elite Component Mapping

| Section | Elite primitives used | Key changes from current |
|---|---|---|
| `HeroSection` | `SectionLabel`, `IntelPanel`, `MetricPanel` | Two-column layout; no photo; IntelPanel right column; typewriter animation |
| `AboutSection` | `SectionLabel`, `MetricPanel` | No photo; counting metrics; mission heading |
| `SkillsSection` | `SectionLabel`, `IntelPanel`, `TechBadge` | No tabs; all categories visible in grid of IntelPanels |
| `ProjectsSection` | `SystemCard`, `TechBadge`, `ProjectStatus`, `MetricPanel` | Classified-ops cards; sequential IDs |
| `EducationSection` | `SectionLabel`, `SystemCard` | Animated connection line; left-rail vertical timeline |
| `ContactSection` | `SectionLabel`, `IntelPanel`, `TerminalBlock` | Command-centre layout; glowing inputs; hook unchanged |
| `WhyHireMeSection` | `SectionLabel`, `SystemCard` | Grid of SystemCards; same data source |
| `Navbar` | — (native) | Glass-morphism; "ADORA.SYSTEMS" brand; glow active indicator |
| `Footer` | — (native) | Minimal; "ADORA.SYSTEMS" brand |
| `CaseStudiesPage` | `SectionLabel`, `SystemCard`, `TechBadge`, `ProjectStatus` | New page; placeholder cards |

### Page Routes and Layouts

#### Home (`/`) — `src/app/page.tsx`

Unchanged imports — sections rewritten in place:

```
HeroSection         (id="home",  h1 = "John Mark Adora")
AboutSection        (id="about", h2 = "Engineering systems...")
WhyHireMeSection    (section,    h2 = "Why Should You Hire Me?")
EducationSection    (section,    h2 = "Education, Achievements & Certificates")
```

#### Skills (`/skills`) — `src/app/skills/page.tsx`

```
Page hero with SectionLabel + h1
SkillsSection (id="skills", h2 = "Technology Matrix")
```

#### Projects (`/projects`) — `src/app/projects/page.tsx`

```
Page hero with SectionLabel + h1
ProjectsSection (id="projects", h2 = "Classified Operations")
```

#### Contact (`/contact`) — `src/app/contact/page.tsx`

```
Page hero with SectionLabel + h1
ContactSection (id="contact", h2 = "Command Centre")
```

#### Case Studies (`/case-studies`) — NEW `src/app/case-studies/page.tsx`

```
<main>
  <section aria-labelledby="cs-heading">
    <SectionLabel>INTEL ARCHIVE</SectionLabel>
    <h1 id="cs-heading">Case Studies</h1>
    <p>...subtitle...</p>
    <div role="list" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CASE_STUDIES.map(cs => (
        <SystemCard key={cs.id} role="listitem">
          <h2>{cs.title}</h2>
          <p>{cs.overview}</p>
          <div>{cs.technologies.map(t => <TechBadge name={t} />)}</div>
          <ProjectStatus status={cs.published ? "Operational" : "Development"} />
          <Button disabled={!cs.published}>
            {cs.published ? "Read More" : "Coming Soon"}
          </Button>
        </SystemCard>
      ))}
    </div>
  </section>
</main>
```

Page metadata:
```ts
export const metadata: Metadata = {
  title: "Case Studies | John Mark R. Adora",
  description: "Deep engineering case studies showcasing architectural thinking and problem-solving approach.",
};
```

### Heading Hierarchy (all pages)

| Level | Usage |
|---|---|
| `<h1>` | One per page — page identity heading |
| `<h2>` | One per section |
| `<h3>` | Within-section cards (project title, case study card title) |

---

## Animation Architecture

### Shared Animation Presets

A shared presets module avoids duplicating variant definitions across section files:

```ts
// src/components/ui/elite/utils/animationPresets.ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const lineGrow: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.2, ease: "easeOut" } },
};
```

### Scroll-Triggered Reveal Pattern

All section components use `useInView` from Framer Motion with a 20% viewport threshold:

```tsx
// Pattern applied in every Section_Component
const ref = useRef<HTMLElement>(null);
const isInView = useInView(ref, { once: true, amount: 0.2 });
const shouldReduceMotion = useReducedMotion();

const animationState = shouldReduceMotion ? "visible" : (isInView ? "visible" : "hidden");
```

When `shouldReduceMotion` is `true`, `animationState` is forced to `"visible"` immediately —
no element is ever hidden or transitioning.

### `useReducedMotion()` Integration

`useReducedMotion()` is called at the top of every client component that uses motion. The
result propagates to:

1. `getMotionProps(shouldReduce)` — suppresses Framer Motion `initial` / `whileHover`
2. `animationState` — forces sections to render in their final `"visible"` state
3. Metric counter — `useMotionValue` is set directly to the target value with duration 0
4. Looping abstract visualisation in `HeroSection` — conditional render: not rendered when `true`

### Metric Counter Animation

`MetricPanel` implements counting via Framer Motion `useMotionValue` + `animate`:

```tsx
// Inside MetricPanel — per-item counter
const motionVal = useMotionValue(shouldReduceMotion ? targetNumber : 0);
const rounded = useTransform(motionVal, (v) => Math.round(v).toString());

useEffect(() => {
  if (!shouldReduceMotion && isInView) {
    void animate(motionVal, targetNumber, { duration: 1.5, ease: "easeOut" });
  }
}, [isInView, shouldReduceMotion]);
```

### `AnimatePresence` — PageTransition (Unchanged)

`PageTransition.tsx` is **not modified**. The existing `mode="wait"` cross-page transition
with `useReducedMotion()` guard remains exactly as implemented.

### Abstract System Visualisation (HeroSection right column)

A lightweight pure-CSS + Framer Motion component renders at ≤ 4% opacity behind the
`IntelPanel`. It uses:

- SVG arcs and grid lines driven by a repeating `@keyframes` CSS animation
- `aria-hidden="true"` — purely decorative
- Suppressed entirely (not rendered) when `shouldReduceMotion` is true

---

## Case Studies Route Architecture

```
src/app/case-studies/
  └── page.tsx     ← RSC (React Server Component); no "use client" needed
```

The page is a React Server Component. All data is static (local constant). Metadata is
exported as a `Metadata` object using the App Router convention:

```ts
export const metadata: Metadata = { ... };
export default function CaseStudiesPage() { ... }
```

The page consumes only elite component primitives (`SystemCard`, `TechBadge`, `ProjectStatus`,
`SectionLabel`, `Button`) — no hooks, no client state, no backend calls.

**Semantic structure:**
- `<main>` as the page root
- One `<section>` with `aria-labelledby` pointing to the `<h1>`
- `<h2>` inside each `SystemCard` for the case study title
- A `role="list"` / `role="listitem"` wrapper for the card grid (screen reader enumeration)

---

## Data Flow

All section components read data from the existing hooks and constants. No changes to the data
pipeline are permitted.

```
usePortfolioData()
  ├── projects[]      → ProjectsSection, HeroSection (active tech count)
  ├── skillCategories[] → SkillsSection, HeroSection (active stack list)
  └── timelineItems[]  → EducationSection

CONTACT_INFO[]         → ContactSection (left column)
HIRE_REASONS[]         → WhyHireMeSection
NAV_LINKS[]            → Navbar (one new entry added)
SITE_METADATA          → Navbar brand (ownerName used as fallback; brand text overridden to "ADORA.SYSTEMS" in the component)

useContactForm()
  ├── formData         → ContactSection inputs (controlled)
  ├── isSubmitting     → Submit button loading state
  ├── statusMessage    → Status block (role="status")
  ├── updateField()    → Input onChange handlers
  └── submit()         → Form onSubmit
```

### Brand Text Clarification

The Navbar renders the literal string `"ADORA.SYSTEMS"` rather than
`SITE_METADATA.ownerName` — this is a deliberate UI branding decision in the component,
not a data change. `SITE_METADATA.ownerName` continues to be used in `<title>`, SEO
metadata, and the Footer copyright line.

---

## Accessibility Architecture

### Heading Hierarchy Enforcement

Each section component is responsible for rendering exactly one `<h2>` as its primary heading,
with no `<h1>` inside sections (the `<h1>` belongs to the page file or `HeroSection`).

### Focus Management

- **Focus rings**: All focusable elements use `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2` (the `--ring` / `--color-primary` token).
- **Focus order**: No `tabindex` values other than 0 or -1 are used.
- **Skip link**: Not introduced (out of scope), but the existing document structure retains the `<main>` landmark.

### ARIA Strategy

| Pattern | ARIA applied |
|---|---|
| Active Navbar link | `aria-current="page"` |
| Decorative visuals (abstract viz, grid overlay) | `aria-hidden="true"` |
| Status messages | `role="status"` |
| Case study card grid | `role="list"` / `role="listitem"` |
| Project card links | `aria-label="View {project.title} on GitHub"` etc. |
| Disabled buttons | `disabled` attribute + `aria-disabled="true"` |

### WCAG 2.1 AA Contrast Compliance

The Elite Theme token values provide the following contrast ratios (computed via WCAG formula):

| Foreground | Background | Ratio | Requirement | Passes |
|---|---|---|---|---|
| `#EAFBFF` (text) | `#081018` (dark surface) | ~18.8:1 | 4.5:1 (AA) | ✅ |
| `#00E5FF` (primary) | `#081018` (dark surface) | ~11.3:1 | 4.5:1 (AA) | ✅ |
| `#00A3FF` (secondary) | `#081018` (dark surface) | ~6.8:1 | 4.5:1 (AA) | ✅ |
| `#7E98A3` (muted) | `#081018` (dark surface) | ~4.7:1 | 4.5:1 (AA) | ✅ |
| `#7E98A3` (muted) | `#0C1620` (card) | ~4.5:1 | 4.5:1 (AA) | ✅ |
| `#EAFBFF` (text) | `#0C1620` (card) | ~16.1:1 | 4.5:1 (AA) | ✅ |

All critical text/background combinations meet WCAG 2.1 AA. Muted text on card background
is a borderline case — implementation must verify with a live contrast tool and increase the
muted value slightly (e.g., `#8AAAB8`) if the computed ratio falls below 4.5:1 for body-size
text.

### Touch Target Compliance

All interactive elite components use `min-h-[44px]` and either `min-w-[44px]` or `px-4` to
ensure the 44×44 CSS pixel minimum. This is enforced at the component level, not relying on
Tailwind defaults.

---

## Error Handling

### CSS Token Failure

If a custom property fails to resolve (e.g. browser does not support `@theme inline`), all
Tailwind utility classes fall back to their Tailwind-defined defaults. The `variables.css`
import provides a dark surface fallback for `--background` and `--foreground`.

### Animation Failure

Framer Motion errors are caught by React error boundaries at the section level. If a motion
component fails to mount, the child content renders without animation (content is never hidden
purely by animation state — all `initial` values include opacity > 0 fallbacks or the
`shouldReduceMotion` path renders content directly).

### Build-Time Validation

The Tailwind v4 `@theme inline` block must reference valid CSS custom properties. If a token
is misspelled, `next build` will emit a warning (missing utility class). CI should treat
Tailwind token resolution warnings as errors.

### Metric Counter Edge Cases

- `value` is a string (e.g. `"4+"`) → `MetricPanel` renders the string directly without
  attempting a numeric count animation.
- `value` is 0 → renders `"0"` immediately without animation.
- `value` is negative → treated as a string, no count animation.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions
of a system — essentially, a formal statement about what the system should do. Properties serve
as the bridge between human-readable specifications and machine-verifiable correctness
guarantees.*

### Property 1: Reduced-Motion Suppresses All Entrance Animations

*For any* elite component or section component rendered with `useReducedMotion()` returning
`true`, the component SHALL render all content in its final visible state without applying any
`initial` opacity, position transform, or timing-delay through Framer Motion.

**Validates: Requirements 1.12, 2.9, 4.11, 5.7, 6 (animation), 8.6, 12.7**

---

### Property 2: TechBadge Proficiency Colour Mapping Is Total and Correct

*For any* integer proficiency value in the range 0–100, the `TechBadge` indicator dot SHALL
resolve to exactly one colour class: muted for values below 50, secondary for values 50–79
inclusive, and primary for values 80–100 inclusive. No proficiency value in the valid range
shall produce an undefined or fallback colour.

**Validates: Requirements 2.4**

---

### Property 3: MetricPanel Renders Every Item

*For any* non-empty array of `MetricItem` objects passed to `MetricPanel`, every item in the
array SHALL appear in the rendered output with its `label` text visible and its `value`
displayed. When `unit` is defined, the unit SHALL also appear adjacent to the value.

**Validates: Requirements 2.3, 5.4**

---

### Property 4: All Skill Categories Render Simultaneously

*For any* `SkillCategory[]` array returned by `usePortfolioData()`, the `SkillsSection` SHALL
render all categories visible in the DOM simultaneously without any category being hidden,
filtered, or conditionally excluded based on a selected state.

**Validates: Requirements 6.1, 6.2, 6.8**

---

### Property 5: Project Card Structure is Complete

*For any* `Project` object in the data set, the `ProjectsSection` SHALL render a card that
contains: a sequential identifier label, the project title, the summary text, and one
`TechBadge` for each entry in `project.technologies`. No project may render with a missing
identifier, missing title, or missing technology badge.

**Validates: Requirements 7.1, 7.2**

---

### Property 6: Project Link State Reflects URL Presence

*For any* `Project` object, WHEN `project.githubUrl` is defined THEN the GitHub button SHALL
be enabled and link to that URL; WHEN `project.githubUrl` is undefined THEN the GitHub button
SHALL be disabled. The same invariant holds for `project.showcaseUrl` and the showcase button.

**Validates: Requirements 7.5, 7.6**

---

### Property 7: Timeline Cards Render All Defined Fields

*For any* `TimelineItem` object, the `EducationSection` SHALL render a card containing the
item's `category` and `title`. When `subtitle` is defined, it SHALL appear in the card. When
`description` is defined, it SHALL appear in the card. No defined field may be silently
omitted.

**Validates: Requirements 8.4**

---

### Property 8: No Horizontal Overflow at Standard Breakpoints

*For any* page in the Portfolio_System rendered at viewport widths of 375 px, 768 px, 1024 px,
1280 px, or 1920 px, the `document.body.scrollWidth` SHALL NOT exceed the viewport
`window.innerWidth`. Horizontal scrolling SHALL be absent at all five breakpoints.

**Validates: Requirements 14.1, 14.6**

---

### Property 9: Text/Background Contrast Meets WCAG AA

*For any* text-foreground / background token pair used in the Elite Design System, the
computed WCAG 2.1 contrast ratio SHALL be at least 4.5:1 for normal-weight text (< 18pt or
< 14pt bold) and at least 3:1 for large text (≥ 18pt or ≥ 14pt bold) and UI component
boundaries.

**Validates: Requirements 15.4**

---

### Property 10: Case Study Cards Reflect Published State

*For any* `CaseStudy` object in the case studies list, WHEN `published` is `false` THEN the
card's action button SHALL be disabled and a `ProjectStatus` indicator set to `"Development"`
SHALL be visible. WHEN `published` is `true` THEN the button SHALL be enabled and
`ProjectStatus` SHALL be `"Operational"`. No case study may render an enabled "Read More"
button when unpublished.

**Validates: Requirements 13.4, 13.5**

---

### Property 11: SectionLabel Renders Children With Required Typography Classes

*For any* non-empty React node passed as `children` to `SectionLabel`, the rendered output
SHALL apply uppercase transformation, letter-spacing, and monospace font styling. The
children's text content SHALL be present in the rendered output unchanged.

**Validates: Requirements 2.6**

---

### Property 12: IntelPanel Title Is Always Rendered When Provided

*For any* non-empty `title` string passed to `IntelPanel`, the title SHALL appear in the
rendered output in the header row. When `title` is omitted, no header row SHALL be rendered.
In both cases, all `children` SHALL appear in the panel body.

**Validates: Requirements 2.7**

---

## Testing Strategy

### Dual Testing Approach

The redesign uses two complementary test layers:

1. **Unit / component tests** — specific examples, edge cases, and interaction checks
2. **Property-based tests** — universal properties verified across many generated inputs

Property-based testing is appropriate here because the Elite component library contains pure
functions (proficiency colour mapping, token resolution, rendering logic) and universal
rendering invariants that hold across any input data.

### Property-Based Testing Library

**Library:** [fast-check](https://fast-check.io/) (TypeScript-native, mature, works with Vitest)

**Test runner:** Vitest (already compatible with the existing Next.js/TypeScript stack)

**Minimum iterations per property test:** 100

**Test tag format:** `// Feature: elite-portfolio-redesign, Property N: <property_text>`

### Property Test Implementations

#### Property 1 — Reduced-Motion Suppression

```ts
// Feature: elite-portfolio-redesign, Property 1: Reduced-motion suppresses animations
import * as fc from "fast-check";
import { render } from "@testing-library/react";
// Mock useReducedMotion to return true
// For any elite component with any valid props, verify no Framer Motion
// initial transform styles are applied to rendered elements.
fc.assert(
  fc.property(
    fc.constantFrom(...eliteComponents),
    fc.record({ children: fc.string(), className: fc.option(fc.string()) }),
    (Component, props) => {
      const { container } = render(
        <ReducedMotionWrapper><Component {...props}>content</Component></ReducedMotionWrapper>
      );
      const animated = container.querySelectorAll("[style*='transform']");
      return animated.length === 0;  // no transform applied at initial render
    }
  ),
  { numRuns: 100 }
);
```

#### Property 2 — TechBadge Proficiency Colour Mapping

```ts
// Feature: elite-portfolio-redesign, Property 2: TechBadge proficiency colour mapping
fc.assert(
  fc.property(
    fc.integer({ min: 0, max: 100 }),
    (proficiency) => {
      const { container } = render(<TechBadge name="Test" proficiency={proficiency} />);
      const dot = container.querySelector("[data-testid='proficiency-dot']");
      if (proficiency < 50)   return dot?.classList.contains("text-muted");
      if (proficiency < 80)   return dot?.classList.contains("text-secondary");
      return dot?.classList.contains("text-primary");
    }
  ),
  { numRuns: 100 }
);
```

#### Property 3 — MetricPanel Renders Every Item

```ts
// Feature: elite-portfolio-redesign, Property 3: MetricPanel renders every item
const metricItemArb = fc.record({
  label: fc.string({ minLength: 1, maxLength: 40 }),
  value: fc.oneof(
    fc.integer({ min: 0, max: 9999 }),
    fc.string({ minLength: 1, maxLength: 20 })
  ),
  unit: fc.option(fc.string({ minLength: 1, maxLength: 10 })),
});

fc.assert(
  fc.property(
    fc.array(metricItemArb, { minLength: 1, maxLength: 8 }),
    (items) => {
      const { getByText } = render(<MetricPanel items={items} />);
      return items.every(item => {
        const labelEl = getByText(item.label);
        const valueEl = getByText(String(item.value));
        const unitEl = item.unit ? getByText(item.unit) : true;
        return !!labelEl && !!valueEl && !!unitEl;
      });
    }
  ),
  { numRuns: 100 }
);
```

#### Property 4 — All Skill Categories Render Simultaneously

```ts
// Feature: elite-portfolio-redesign, Property 4: All skill categories render simultaneously
fc.assert(
  fc.property(
    fc.array(skillCategoryArb, { minLength: 1, maxLength: 6 }),
    (categories) => {
      mockUsePortfolioData({ skillCategories: categories });
      const { getByText } = render(<SkillsSection />);
      return categories.every(cat => !!getByText(cat.label));
    }
  ),
  { numRuns: 100 }
);
```

#### Property 9 — WCAG Contrast

```ts
// Feature: elite-portfolio-redesign, Property 9: WCAG AA contrast
import { getContrastRatio } from "./wcag-utils"; // pure function from WCAG formula
const tokenPairs = [
  ["#EAFBFF", "#081018"],
  ["#00E5FF", "#081018"],
  ["#00A3FF", "#081018"],
  ["#7E98A3", "#081018"],
  ["#7E98A3", "#0C1620"],
  ["#EAFBFF", "#0C1620"],
];

fc.assert(
  fc.property(
    fc.constantFrom(...tokenPairs),
    ([fg, bg]) => getContrastRatio(fg, bg) >= 4.5
  ),
  { numRuns: tokenPairs.length }
);
```

### Unit Test Coverage

| Area | Test type | Examples to cover |
|---|---|---|
| Token values in globals.css | Example | Each of the 8 primary token values |
| Navbar active state | Example | `pathname === href` sets `aria-current="page"` and glow class |
| Navbar brand text | Example | Renders "ADORA.SYSTEMS" |
| ProjectStatus pill | Example | Each of 3 status values renders correct colour class |
| TerminalBlock dots | Example | Three dot characters rendered in top bar |
| Contact form delegation | Example | `submit()` called from form `onSubmit`; `useContactForm` not reimplemented |
| Footer copyright | Example | Renders current year and "ADORA.SYSTEMS" brand |
| `role="status"` on status message | Example | Non-empty `statusMessage` renders with correct role |
| Case Studies page metadata | Example | Title and description match Requirement 13.2 |
| No horizontal overflow (manual) | Property | Playwright viewport resize tests |

### Integration Tests

| Scenario | Strategy |
|---|---|
| End-to-end `/case-studies` route renders | Playwright: navigate to `/case-studies`, verify h1, verify at least one SystemCard |
| Contact form submits without modification | Playwright: fill form, submit, verify status message (mocked API) |
| Cross-page transition AnimatePresence | Playwright: navigate between pages, verify no layout shift |

### Accessibility Testing

Full WCAG 2.1 AA validation requires manual testing with assistive technologies (screen readers:
NVDA on Windows, VoiceOver on macOS) and expert review. Automated tooling (axe-core via
`@axe-core/react` in Vitest tests) covers ~30–40% of WCAG criteria automatically.
