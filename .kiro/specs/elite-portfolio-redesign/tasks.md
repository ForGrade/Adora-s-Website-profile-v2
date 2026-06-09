# Implementation Plan: Elite Portfolio Redesign

## Overview

Transform the Adora Portfolio into a dark intelligence-interface showcase branded "ADORA.SYSTEMS".
This is a pure visual/UX layer change — no backend files are modified. The plan follows a strict
dependency order: design system tokens first, then the elite component library, then layout
components, then section rewrites, then the new route, and finally a build verification pass.

All tasks are TypeScript / React / Next.js 15. Protected files are never touched.

---

## Tasks

- [x] 1. Overhaul Design System Tokens (`globals.css` + `variables.css`)
  - [x] 1.1 Rewrite `src/app/globals.css` with Elite Theme tokens
    - Replace all colour token definitions in `:root` and `:root.dark` with the Elite Theme
      palette: `--color-primary: #00E5FF`, `--color-secondary: #00A3FF`, `--color-accent:
      #66FCFF`, `--color-dark-surface: #081018`, `--color-card: #0C1620`,
      `--color-border: rgba(0,229,255,0.15)`, `--color-text: #EAFBFF`,
      `--color-muted: #7E98A3`
    - Remap legacy tokens `--background`, `--foreground`, `--surface`, `--surface-soft`,
      `--border`, `--accent`, `--accent-strong`, `--accent-soft`, `--ring`, `--muted` to
      Elite values so all existing Tailwind utility classes continue to resolve
    - Set `:root.dark` to mirror `:root` exactly (always-dark aesthetic, ThemeToggle preserved)
    - Add responsive spacing scale tokens: `--space-section-y-mobile: 5rem`,
      `--space-section-y-desktop: 7rem`, `--space-section-x-mobile: 1rem`,
      `--space-section-x-desktop: 1.5rem`
    - Update atmospheric `body` background to radial-gradient cyan glow on `#081018`
    - Preserve and extend the `@theme inline` block with new Elite-specific mappings
      (`--color-primary`, `--color-secondary`, `--color-dark-surface`, `--color-card`,
      `--color-text`)
    - Add new CSS utility classes: `.glow-border` (animated cyan border glow with
      `@keyframes glow-pulse`), `.glow-text` (cyan text-shadow), `.scan-line::after`
      (horizontal sweep with `@keyframes scan-line`), `.grid-overlay` (dot-matrix
      `radial-gradient` pattern at ≤ 4% opacity)
    - Update `prefers-reduced-motion: reduce` block to zero out all durations and explicitly
      disable `.glow-border`, `.scan-line::after`, and `.grid-overlay` animations
    - _Requirements: 1.1–1.14_

  - [x] 1.2 Simplify `src/styles/variables.css` to dark-only fallback
    - Remove all light/dark media-query branching from the file
    - Set `--background: #081018` and `--foreground: #EAFBFF` in `:root`
    - Add basic `body` font-family fallback using `var(--font-geist-sans)`
    - _Requirements: 1.9_

- [x] 2. Create Elite Component Library Utilities
  - [x] 2.1 Create `src/components/ui/elite/utils/motionHelpers.ts`
    - Export `getMotionProps(shouldReduce: boolean | null)` that returns suppressed motion
      props (`{ initial: false, animate: { opacity: 1 }, whileHover: {} }`) when
      `shouldReduce` is truthy, or an empty object otherwise
    - _Requirements: 2.9, 12.7_

  - [x] 2.2 Create `src/components/ui/elite/utils/animationPresets.ts`
    - Export typed `Variants` objects: `fadeUp`, `fadeLeft`, `fadeRight`,
      `staggerContainer`, `lineGrow` — exact definitions as specified in the design doc
    - _Requirements: 12.1–12.5_

- [ ] 3. Implement Elite UI Primitive Components
  - [x] 3.1 Implement `src/components/ui/elite/SectionLabel.tsx`
    - Accept `children: React.ReactNode`, optional `className`, optional
      `as?: "p" | "span" | "div"` (default `"p"`)
    - Apply `font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]`
    - _Requirements: 2.6_

  - [ ]* 3.2 Write property test for `SectionLabel` (Property 11)
    - **Property 11: SectionLabel renders children with required typography classes**
    - **Validates: Requirements 2.6**
    - Use `fast-check` with `fc.string({ minLength: 1 })` as children; assert uppercase
      class, tracking class, and mono font class are present in rendered output, and
      children text content is unchanged

  - [x] 3.3 Implement `src/components/ui/elite/IntelPanel.tsx`
    - Accept `children: React.ReactNode`, optional `title?: string`, optional `className`
    - When `title` is provided render a mono header row with `border-b border-[var(--color-border)]`
    - When `title` is omitted render no header row
    - Apply `border border-[var(--color-border)] bg-[var(--color-card)]` to the container
    - _Requirements: 2.7_

  - [ ]* 3.4 Write property test for `IntelPanel` (Property 12)
    - **Property 12: IntelPanel title is rendered when provided, absent when omitted**
    - **Validates: Requirements 2.7**
    - Use `fc.option(fc.string({ minLength: 1 }))` for title; assert header row presence
      correlates with title presence, and all children are always in rendered output

  - [x] 3.5 Implement `src/components/ui/elite/TerminalBlock.tsx`
    - Accept `children: React.ReactNode`, optional `prompt?: string`, optional `className`
    - Render top bar with three coloured dot characters (`●`) in `#FF5F56`, `#FFBD2E`,
      `#27C93F` followed by the prompt string
    - Apply `bg-[#0A1520] border-b border-[var(--color-border)]` to the bar and
      `var(--color-dark-surface)` to the content area
    - Use `font-mono text-sm` for the content area
    - _Requirements: 2.8_

  - [x] 3.6 Implement `src/components/ui/elite/TechBadge.tsx`
    - Accept `name: string`, optional `proficiency?: number` (0–100), optional `className`
    - Map proficiency to dot colour: `< 50` → `--color-muted` (grey), `50–79` →
      `--color-secondary` (#00A3FF), `≥ 80` or omitted → `--color-primary` (#00E5FF)
    - Add `data-testid="proficiency-dot"` to the indicator dot element
    - Enforce `min-h-[44px] min-w-[44px]` touch target
    - Apply `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]` focus ring
    - _Requirements: 2.4, 2.10_

  - [ ]* 3.7 Write property test for `TechBadge` proficiency mapping (Property 2)
    - **Property 2: TechBadge proficiency colour mapping is total and correct**
    - **Validates: Requirements 2.4**
    - Use `fc.integer({ min: 0, max: 100 })`; assert `data-testid="proficiency-dot"` carries
      the expected colour class for every integer in the range

  - [x] 3.8 Implement `src/components/ui/elite/ProjectStatus.tsx`
    - Accept `status: "Operational" | "Development" | "Archived"`, optional `className`
    - Render a pill: `Operational` → `#00E5FF` with pulsing dot animation; `Development` →
      `#F59E0B` amber; `Archived` → `--color-muted`, no animation
    - Suppress pulsing dot animation under `prefers-reduced-motion: reduce`
    - Enforce `min-h-[44px]` and visible focus ring
    - _Requirements: 2.5, 2.10_

  - [-] 3.9 Implement `src/components/ui/elite/MetricPanel.tsx`
    - Accept `items: readonly { label: string; value: string | number; unit?: string }[]`,
      optional `className`
    - Render items in a 2-column CSS grid; values in `--font-geist-mono` at large size;
      labels in small muted mono below
    - Implement counting animation via `useMotionValue` + `animate` from Framer Motion,
      counting from 0 to numeric target over 1.5 s ease-out when `isInView` and
      `!shouldReduceMotion`
    - String values (e.g. `"4+"`) and value `0` render directly without animation
    - When `shouldReduceMotion` is true, set `motionVal` directly to the target value
    - _Requirements: 2.3, 5.6, 12.3_

  - [ ]* 3.10 Write property test for `MetricPanel` (Property 3)
    - **Property 3: MetricPanel renders every item**
    - **Validates: Requirements 2.3, 5.4**
    - Use `fc.array(fc.record({ label: fc.string({minLength:1}), value: fc.oneof(...), unit: fc.option(...) }), { minLength: 1, maxLength: 8 })`; assert every label, value, and unit appears in rendered output

  - [ ] 3.11 Implement `src/components/ui/elite/SystemCard.tsx`
    - Accept `children: React.ReactNode`, optional `className`, optional
      `glowIntensity?: "low" | "medium" | "high"`, optional `href?: string`
    - Render as `<a>` when `href` is defined (with `role="article"` on inner wrapper),
      or `<div>` otherwise
    - Apply Framer Motion `whileHover`: `y: -4`, `boxShadow` interpolated by `glowIntensity`
      — low `rgba(0,229,255,0.12)`, medium `rgba(0,229,255,0.22)`, high `rgba(0,229,255,0.40)`
    - Use `getMotionProps(shouldReduce)` to suppress hover animation under reduced motion
    - Enforce `focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]` focus ring
    - _Requirements: 2.1, 2.2, 2.10_

  - [~] 3.12 Create `src/components/ui/elite/index.ts` barrel export
    - Re-export all eight elite components: `SystemCard`, `MetricPanel`, `TechBadge`,
      `ProjectStatus`, `SectionLabel`, `IntelPanel`, `TerminalBlock`, and the utils
    - _Requirements: 2.1–2.8_

- [~] 4. Checkpoint — Verify elite component library builds cleanly
  - Ensure all 8 components and 2 utils compile with zero TypeScript errors.
  - Ensure all property tests written so far pass.
  - Ask the user if any questions arise before proceeding.

- [ ] 5. Redesign Layout Components
  - [~] 5.1 Redesign `src/components/layout/Navbar.tsx`
    - Replace brand text with literal `"ADORA.SYSTEMS"` in monospace/technical font class
    - Preserve all existing `usePathname()` logic for active-route detection
    - Change active-link indicator from `bg-accent` pill to glowing cyan underline;
      keep `aria-current="page"` on the active link
    - Add glass-morphism styles: `backdrop-blur`, semi-transparent dark background,
      `border-b border-[var(--color-border)]`; retain `position: sticky; top: 0; z-index`
    - Preserve `ThemeToggle` in its current desktop/mobile position
    - Preserve "Resume" `<a download>` CTA; restyle as primary-accented outlined button
    - Ensure all interactive elements have visible focus rings (WCAG keyboard nav)
    - _Requirements: 3.1–3.10_

  - [~] 5.2 Redesign `src/components/layout/Footer.tsx`
    - Replace brand text with literal `"ADORA.SYSTEMS"` in monospace/technical style
    - Render current year (via `new Date().getFullYear()`) and "Built with Next.js and
      TypeScript" on the right side
    - Keep existing `SOCIAL_LINKS` render logic (renders items when array is non-empty)
    - Apply `border-t border-[var(--color-border)]` top border
    - Apply `bg-[var(--color-dark-surface)]` (or equivalent token) to footer background
    - _Requirements: 11.1–11.5_

- [ ] 6. Rewrite Section Components
  - [~] 6.1 Rewrite `src/components/sections/HeroSection.tsx`
    - Implement two-column layout (`lg:grid-cols-2`); single column on narrower viewports
    - Left column: `SectionLabel` reading "PERSONAL SYSTEM", `<h1>` "John Mark Adora" at
      ≥ 56px desktop / ≥ 36px mobile, typewriter cycling animation for sub-headlines
      ("Software Engineer" / "Systems Builder" / "Problem Solver"), description paragraph,
      two CTA buttons ("View Projects" → `/projects`, "Contact Me" → `/contact`)
    - Right column: `IntelPanel` displaying system status (Online), active technologies
      from `usePortfolioData()`, uptime/years-active metric; no photograph; conditional
      abstract system visualisation (SVG / CSS arcs, `aria-hidden="true"`) — omitted when
      `shouldReduceMotion` is true
    - Animate left column in from left (`fadeLeft`), right column from right (`fadeRight`)
      using Framer Motion with `useInView` (once: true, amount: 0.2)
    - Suppress all entrance animations and the abstract visualisation when
      `useReducedMotion()` returns true
    - Render `<section id="home">` with `<h1>` as primary heading
    - _Requirements: 4.1–4.12_

  - [~] 6.2 Rewrite `src/components/sections/AboutSection.tsx`
    - Render `SectionLabel` reading "MISSION" above `<h2>` "Engineering systems that solve
      real-world problems."
    - Left column: personal story and engineering philosophy paragraphs
    - Right column: `MetricPanel` with items: "Years Learning", "Projects Built",
      "Technologies", "Problem Domains" (values drawn from constants, not data files)
    - Remove profile photograph — do not import or render `profile-pic.jpg`
    - Implement scroll-triggered counting animation in `MetricPanel` (delegated to
      `MetricPanel` component's internal logic)
    - Suppress counting animation when `useReducedMotion()` returns true
    - Render `<section id="about">` with `<h2>` as primary heading
    - _Requirements: 5.1–5.8_

  - [~] 6.3 Rewrite `src/components/sections/SkillsSection.tsx`
    - Remove the existing `role="tablist"` tab interface entirely
    - Render all skill categories simultaneously in an `IntelPanel` grid layout (no
      active/selected state filtering)
    - Source all data exclusively via `usePortfolioData()`
    - Render each skill as a `TechBadge` within its category's `IntelPanel`
    - Apply scroll-triggered `staggerContainer` + `fadeUp` variants with `useInView`
    - Ensure all skill items are visible in the initial render (none hidden)
    - Render `<section id="skills">` with `<h2>` as primary heading; full keyboard nav
    - _Requirements: 6.1–6.10_

  - [ ]* 6.4 Write property test for `SkillsSection` (Property 4)
    - **Property 4: All skill categories render simultaneously**
    - **Validates: Requirements 6.1, 6.2, 6.8**
    - Mock `usePortfolioData` with `fc.array(skillCategoryArb, {minLength:1, maxLength:6})`;
      assert every `category.label` appears in rendered DOM simultaneously

  - [~] 6.5 Rewrite `src/components/sections/ProjectsSection.tsx`
    - Source all data exclusively via `usePortfolioData()`
    - Render each project in a `SystemCard` with: sequential identifier label (e.g.
      "PROJECT_001"), `<h3>` project title, summary, `TechBadge` per technology,
      `ProjectStatus` indicator, `MetricPanel` metric cells (Performance, Complexity, Scale)
    - Render GitHub link button when `project.githubUrl` is defined; disabled "Repository
      Coming Soon" button when undefined
    - Render Live Demo button when `project.showcaseUrl` is defined; disabled "Coming Soon"
      when undefined
    - Ensure all anchor elements have descriptive `aria-label` referencing the project title
    - Apply glow elevation hover via `SystemCard`'s built-in Framer Motion `whileHover`
    - Render "More Projects in Progress" block below the list with four coming-soon labels
    - Render `<section id="projects">` with `<h2>` "Classified Operations" as primary heading
    - _Requirements: 7.1–7.10_

  - [ ]* 6.6 Write property test for `ProjectsSection` card structure (Property 5)
    - **Property 5: Project card structure is complete**
    - **Validates: Requirements 7.1, 7.2**
    - Mock `usePortfolioData` with `fc.array(projectArb, {minLength:1})`; assert every card
      has sequential identifier, title, summary, and one `TechBadge` per technology

  - [ ]* 6.7 Write property test for `ProjectsSection` link state (Property 6)
    - **Property 6: Project link state reflects URL presence**
    - **Validates: Requirements 7.5, 7.6**
    - For any project with `githubUrl` defined/undefined and `showcaseUrl` defined/undefined,
      assert button enabled/disabled state matches presence of URL

  - [~] 6.8 Rewrite `src/components/sections/EducationSection.tsx`
    - Source all data exclusively via `usePortfolioData()`
    - Render a vertical timeline with an animated connection line using `lineGrow` variant
      and `useInView` (once: true) — line grows downward from top to bottom on scroll
    - Render each `TimelineItem` in a `SystemCard` with: category badge (differentiated by
      colour/icon per category), `<h3>` title, optional subtitle, optional description
    - Suppress connection line animation and card entrance animations when
      `useReducedMotion()` returns true; display full line and all cards immediately
    - Render `<section>` with `<h2>` "Education, Achievements & Certificates"
    - _Requirements: 8.1–8.7_

  - [ ]* 6.9 Write property test for `EducationSection` (Property 7)
    - **Property 7: Timeline cards render all defined fields**
    - **Validates: Requirements 8.4**
    - Use `fc.record({ category: fc.string(), title: fc.string({minLength:1}), subtitle: fc.option(fc.string({minLength:1})), description: fc.option(fc.string({minLength:1})) })`; assert all defined fields appear in card output

  - [~] 6.10 Rewrite `src/components/sections/ContactSection.tsx`
    - Render two-column layout: left column with `SectionLabel`, `<h2>`, invite copy, and
      contact channel cards (from `CONTACT_INFO`); right column with `TerminalBlock` or
      `IntelPanel` wrapping the form
    - Delegate ALL form state to `useContactForm()` hook — do not reimplement any logic
    - Use controlled inputs wired to `formData` and `updateField()`; `onSubmit` calls
      `submit()`; submit button shows loading indicator when `isSubmitting` is true
    - Apply glowing focus states to all inputs: `focus:border-[var(--color-primary)]` +
      `focus:shadow` glow
    - Retain existing `id`, `htmlFor`, and label associations
    - Render `statusMessage` in a `role="status"` element when non-empty
    - Ensure input minimum touch target height of 44px; visible focus rings (WCAG AA)
    - Render `<section id="contact">` with `<h2>` "Command Centre" as primary heading
    - _Requirements: 9.1–9.10_

  - [~] 6.11 Rewrite `src/components/sections/WhyHireMeSection.tsx`
    - Source hire reasons from `HIRE_REASONS` constant in `src/constants/index.ts`
    - Render `SectionLabel` and `<h2>` "Why Should You Hire Me?" above the card grid
    - Render each hire reason in a `SystemCard` (glow elevation on hover via SystemCard)
    - Render `<section>` with `<h2>` as primary heading
    - _Requirements: 10.1–10.5_

- [~] 7. Checkpoint — Section components integrated end-to-end
  - Ensure all section components render without TypeScript or ESLint errors.
  - Verify `useContactForm`, `usePortfolioData`, and `useTheme` hooks are imported and used
    unchanged — no wrapper or reimplementation.
  - Ask the user if any questions arise before proceeding.

- [ ] 8. Update Constants and Create Case Studies Route
  - [~] 8.1 Update `src/constants/index.ts` — add Case Studies nav entry
    - Append `{ href: "/case-studies", label: "Case Studies" }` to the `NAV_LINKS` array
    - Make no other changes to this file (SITE_METADATA, HIRE_REASONS, CONTACT_INFO,
      SOCIAL_LINKS all remain exactly as written)
    - _Requirements: 13.7_

  - [~] 8.2 Create `src/app/case-studies/page.tsx` — Case Studies RSC
    - Implement as a React Server Component (no `"use client"` directive)
    - Define page-local `CaseStudy` interface and `CASE_STUDIES` constant array with at
      least two placeholder entries (one with `published: false`)
    - Export `metadata: Metadata` with title `"Case Studies | John Mark R. Adora"` and
      descriptive description
    - Render `<main>` → `<section aria-labelledby="cs-heading">` → `SectionLabel`
      "INTEL ARCHIVE" → `<h1 id="cs-heading">Case Studies</h1>` → subtitle paragraph
    - Render `role="list"` grid of `SystemCard` items (`role="listitem"`), each containing:
      `<h2>` title, overview paragraph, `TechBadge` per technology, `ProjectStatus` pill,
      and Button (enabled/disabled per `published`)
    - When `published` is false: button disabled with `aria-disabled="true"`, label
      "Coming Soon", `ProjectStatus` set to `"Development"`
    - When `published` is true: button enabled, label "Read More",
      `ProjectStatus` set to `"Operational"`
    - Ensure responsive grid (`sm:grid-cols-2 lg:grid-cols-3`), no horizontal overflow
    - _Requirements: 13.1–13.9_

  - [ ]* 8.3 Write property test for Case Studies page (Property 10)
    - **Property 10: Case study cards reflect published state**
    - **Validates: Requirements 13.4, 13.5**
    - Use `fc.boolean()` for `published`; assert disabled button + "Development" status when
      `false`, enabled button + "Operational" status when `true`

- [~] 9. Final Checkpoint — Full build verification
  - Run `npm run build` and confirm zero TypeScript compilation errors
  - Run `npm run lint` and confirm zero ESLint errors
  - Confirm no Tailwind token resolution warnings in the build output
  - Verify `src/backend/**`, `src/app/api/**`, `src/types/index.ts`,
    `src/features/portfolio/data/*.ts`, `src/features/portfolio/hooks/useContactForm.ts`,
    `src/features/portfolio/hooks/usePortfolioData.ts`, `src/hooks/useTheme.ts`,
    `src/components/layout/PageTransition.tsx`, and `src/components/layout/SiteShell.tsx`
    have not been modified
  - Ask the user if any questions arise.
  - _Requirements: All (16.1–16.8 specifically for preservation)_

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP; all core implementation tasks are mandatory.
- Protected files (`src/backend/**`, `src/app/api/**`, `src/types/index.ts`, data files, hooks, `PageTransition.tsx`, `SiteShell.tsx`) must never appear in a diff.
- Each property test references its design-doc property number for traceability.
- Checkpoints at tasks 4, 7, and 9 validate incremental progress before moving to the next group.
- The `fast-check` library must be installed as a dev dependency before writing property tests: `npm install -D fast-check`.

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "2.2"] },
    { "id": 2, "tasks": ["3.1", "3.3", "3.5", "3.6", "3.8", "3.9", "3.11"] },
    { "id": 3, "tasks": ["3.2", "3.4", "3.7", "3.10", "3.12"] },
    { "id": 4, "tasks": ["5.1", "5.2"] },
    { "id": 5, "tasks": ["6.1", "6.2", "6.3", "6.5", "6.8", "6.10", "6.11"] },
    { "id": 6, "tasks": ["6.4", "6.6", "6.7", "6.9"] },
    { "id": 7, "tasks": ["8.1"] },
    { "id": 8, "tasks": ["8.2"] },
    { "id": 9, "tasks": ["8.3"] }
  ]
}
```
