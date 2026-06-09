# Requirements Document

## Introduction

This feature transforms the existing Adora Portfolio from a standard student portfolio into an elite
software-engineer and systems-architect showcase. The work is a **visual and UX redesign only** —
the backend (API routes, Zod validators, Supabase repositories/services, rate-limiting middleware)
and all TypeScript types in `src/types/index.ts` remain untouched. The redesign replaces the
current teal/green palette with a dark intelligence-interface aesthetic, introduces a new reusable
component library, redesigns every page section, and adds a `/case-studies` route.

The source of truth for portfolio content stays exactly where it is today:
`src/features/portfolio/data/projects.ts`, `skills.ts`, and `timeline.ts`. All existing hooks
(`useContactForm`, `usePortfolioData`, `useTheme`) and the existing `PageTransition` / `SiteShell`
shell must remain intact and in use.

---

## Glossary

- **Portfolio_System**: The Next.js 15 / React 19 frontend application being redesigned.
- **Design_System**: The set of CSS custom-property tokens, utility classes, and animation helpers
  defined in `src/app/globals.css` and `src/styles/variables.css`.
- **Component_Library**: The collection of typed, reusable React components located in
  `src/components/`.
- **Elite_Theme**: The dark intelligence-interface visual language described in these requirements,
  characterised by deep-black surfaces, cyan/blue accent palette, glow borders, and subtle grid
  overlays.
- **Section_Component**: A React component that renders one logical section of a page (e.g.
  `HeroSection`, `AboutSection`).
- **Intelligence_Panel**: A card-like UI element with a terminal/dashboard aesthetic — mono font
  labels, glow borders, status indicators, and metric rows.
- **Reduced_Motion**: The browser/OS `prefers-reduced-motion: reduce` media query.
- **WCAG_2.1_AA**: Web Content Accessibility Guidelines version 2.1, conformance level AA.

---

## Requirements

### Requirement 1: Design System Token Overhaul

**User Story:** As a visitor, I want the portfolio to use a consistent dark intelligence-interface
colour palette, so that the visual identity feels premium and professional throughout every page.

#### Acceptance Criteria

1. THE Design_System SHALL define a `--color-primary` token resolving to `#00E5FF`.
2. THE Design_System SHALL define a `--color-secondary` token resolving to `#00A3FF`.
3. THE Design_System SHALL define a `--color-accent` token resolving to `#66FCFF`.
4. THE Design_System SHALL define a `--color-dark-surface` token resolving to `#081018`.
5. THE Design_System SHALL define a `--color-card` token resolving to `#0C1620`.
6. THE Design_System SHALL define a `--color-border` token resolving to `rgba(0,229,255,0.15)`.
7. THE Design_System SHALL define a `--color-text` token resolving to `#EAFBFF`.
8. THE Design_System SHALL define a `--color-muted` token resolving to `#7E98A3`.
9. THE Design_System SHALL replace the existing `--background`, `--foreground`, `--surface`,
   `--surface-soft`, `--border`, `--accent`, `--accent-strong`, `--accent-soft`, `--ring`, and
   `--muted` tokens with values drawn from the Elite_Theme palette so that all Tailwind utility
   classes that reference those tokens automatically render in the new aesthetic.
10. THE Design_System SHALL expose a global atmospheric body background composed of a deep dark
    base colour with a subtle radial cyan glow originating near the top-left, with no visible
    tiling or harsh seams.
11. THE Design_System SHALL define CSS utility classes for: `glow-border` (animated cyan border
    glow), `glow-text` (cyan text glow), `scan-line` (very-low-opacity horizontal sweep
    animation), and `grid-overlay` (repeating dot-matrix or grid-line pattern at ≤ 4 % opacity).
12. WHEN `prefers-reduced-motion: reduce` is active, THE Design_System SHALL set all custom
    animation durations to `0.01ms` and disable all looping CSS animations, including `scan-line`
    and `grid-overlay` movement.
13. THE Design_System SHALL define responsive spacing scale tokens (`--space-section-y`,
    `--space-section-x`) that render as `py-20 px-4` at mobile (375 px) and `py-28 px-6` at
    desktop (1280 px+).
14. THE Design_System SHALL maintain the existing `@theme inline` block so that all Tailwind v4
    colour utilities continue to derive from CSS custom properties without breaking the build.

---

### Requirement 2: Reusable Elite Component Library

**User Story:** As a developer, I want a set of typed, composable elite-theme components, so that
every section can be assembled consistently without duplicating styling logic.

#### Acceptance Criteria

1. THE Component_Library SHALL export a `SystemCard` component that accepts `children`,
   optional `className`, optional `glowIntensity: "low" | "medium" | "high"`, and optional
   `href` (renders as an anchor when provided).
2. WHEN `SystemCard` is hovered, THE Component_Library SHALL animate the border glow and apply
   a subtle `translateY(-4px)` elevation using Framer Motion.
3. THE Component_Library SHALL export a `MetricPanel` component that accepts an array of
   `{ label: string; value: string | number; unit?: string }` items and renders them in an
   intelligence-dashboard layout with mono-spaced values.
4. THE Component_Library SHALL export a `TechBadge` component that accepts `name: string` and
   optional `proficiency: number` (1–100), and renders the technology name with a signal/dot
   indicator whose colour maps to the proficiency range: < 50 muted, 50–79 secondary, ≥ 80 primary.
5. THE Component_Library SHALL export a `ProjectStatus` component that accepts
   `status: "Operational" | "Development" | "Archived"` and renders a coloured pill indicator
   (green/cyan for Operational, amber for Development, muted for Archived).
6. THE Component_Library SHALL export a `SectionLabel` component that renders its `children`
   as uppercase, letter-spaced, mono-font text styled as an Intelligence_Panel subsection label.
7. THE Component_Library SHALL export an `IntelPanel` component that wraps content in a bordered
   Intelligence_Panel container with an optional `title` prop rendered as a monospace header row.
8. THE Component_Library SHALL export a `TerminalBlock` component that renders content inside a
   terminal-inspired dark container with a top bar showing three coloured dots and an optional
   `prompt` string.
9. WHEN `prefers-reduced-motion: reduce` is active, THE Component_Library SHALL suppress all
   Framer Motion entrance and hover animations across all eight components listed above, while
   preserving layout and colour styling.
10. THE Component_Library SHALL ensure all interactive components (`SystemCard` with `href`,
    `TechBadge`, `ProjectStatus`) have a minimum touch/click target of 44 × 44 px, visible
    focus rings, and appropriate ARIA roles as required by WCAG_2.1_AA.

---

### Requirement 3: Navbar Redesign

**User Story:** As a visitor, I want a sticky, glass-morphism navbar branded "ADORA.SYSTEMS", so
that navigation feels premium and the active page is always clearly indicated.

#### Acceptance Criteria

1. THE Navbar SHALL display the brand text "ADORA.SYSTEMS" on the left using a monospace or
   technical-styled font class.
2. THE Navbar SHALL render navigation links for: Home (`/`), Skills (`/skills`),
   Projects (`/projects`), and Contact (`/contact`).
3. THE Navbar SHALL include the `ThemeToggle` component on the right side of the nav bar,
   consistent with the existing desktop layout (hidden on mobile, visible ≥ sm).
4. THE Navbar SHALL include a "Resume" call-to-action button styled as a primary-accented
   outlined button on the right, linking to `/resume/RESUME-Adora-v3.docx` with `download`.
5. WHEN the current route matches a nav link href exactly, THE Navbar SHALL apply a glowing
   cyan underline/indicator to that link and set `aria-current="page"` on it.
6. THE Navbar SHALL apply glass-morphism styles: `backdrop-blur`, semi-transparent dark
   background, and a bottom border using the `--color-border` token.
7. THE Navbar SHALL remain `position: sticky; top: 0` with `z-index` above all page content.
8. THE Navbar SHALL continue to use `usePathname()` from `next/navigation` for active-state
   detection, preserving the existing logic.
9. IF JavaScript is disabled, THE Navbar SHALL remain visible and structurally correct (no
   client-side dependencies for rendering the nav links themselves).
10. THE Navbar SHALL be fully keyboard-navigable with visible focus states on all interactive
    elements, compliant with WCAG_2.1_AA.

---

### Requirement 4: HeroSection Redesign (Two-Column)

**User Story:** As a visitor, I want to land on a compelling two-column hero that communicates
John Mark's identity and current technical stack at a glance, so that the first impression is
elite and professional.

#### Acceptance Criteria

1. THE HeroSection SHALL render a two-column layout on screens ≥ 1024 px wide (lg breakpoint),
   with a single-column stacked layout on narrower viewports.
2. THE HeroSection left column SHALL display a `SectionLabel` reading "PERSONAL SYSTEM" above
   the main headline.
3. THE HeroSection left column SHALL render the `<h1>` "John Mark Adora" at a large font size
   (≥ 56 px on desktop, ≥ 36 px on mobile).
4. THE HeroSection left column SHALL display the sub-headline sequence "Software Engineer" /
   "Systems Builder" / "Problem Solver" using a typewriter-style cycling animation driven by
   Framer Motion.
5. THE HeroSection left column SHALL include a short description paragraph positioned below the
   sub-headlines.
6. THE HeroSection left column SHALL render two CTA buttons: "View Projects" linking to
   `/projects`, and "Contact Me" linking to `/contact`.
7. THE HeroSection right column SHALL render an Intelligence_Panel component displaying:
   system status (Online), active technologies (drawn from `usePortfolioData` via the existing
   hook — no duplication of data), an uptime or years-active metric, and a short active-stack
   list.
8. THE HeroSection right column SHALL NOT render a photograph or profile picture.
9. THE HeroSection right column SHALL include a subtle looping abstract system visualisation
   (e.g. animated grid, signal lines, or arc geometry) built with CSS or Framer Motion at low
   opacity to avoid competing with the text.
10. WHEN the page loads, THE HeroSection left column SHALL animate in from the left and the
    right column from the right using Framer Motion slide-fade transitions.
11. WHEN `prefers-reduced-motion: reduce` is active, THE HeroSection SHALL render all content
    fully visible without entrance animations and without the looping abstract visualisation.
12. THE HeroSection SHALL render a semantic `<section id="home">` with the `<h1>` as its
    primary heading, ensuring correct document outline.

---

### Requirement 5: AboutSection Redesign

**User Story:** As a visitor, I want an About section that communicates engineering mission and
quantified experience metrics, so that John Mark's background feels substantive and expert.

#### Acceptance Criteria

1. THE AboutSection SHALL display a `SectionLabel` reading "MISSION" above the section heading.
2. THE AboutSection SHALL render the heading "Engineering systems that solve real-world problems."
   as its `<h2>`.
3. THE AboutSection SHALL include a left column containing the personal story and engineering
   philosophy paragraphs.
4. THE AboutSection SHALL include a right column containing a `MetricPanel` displaying the
   following metrics: "Years Learning", "Projects Built", "Technologies", and "Problem Domains".
5. THE AboutSection SHALL NOT render the profile photograph (`/profile-pic.jpg`).
6. WHEN the section scrolls into view, THE AboutSection SHALL animate the metric values using a
   counting-up animation driven by Framer Motion or a numeric interpolation.
7. WHEN `prefers-reduced-motion: reduce` is active, THE AboutSection SHALL display final metric
   values without the counting animation.
8. THE AboutSection SHALL maintain a semantic `<section id="about">` with the `<h2>` as its
   primary heading.

---

### Requirement 6: SkillsSection Redesign (Technology Matrix)

**User Story:** As a visitor, I want to browse John Mark's skills in a Technology Matrix layout
instead of tabs, so that all categories are visible simultaneously and each skill feels like a
precision-catalogued capability.

#### Acceptance Criteria

1. THE SkillsSection SHALL remove the existing tab-based interface (`role="tablist"` pattern).
2. THE SkillsSection SHALL render all skill categories simultaneously in a grid or multi-column
   matrix layout — no selected/active category filtering.
3. THE SkillsSection SHALL source skill data exclusively via the existing `usePortfolioData` hook,
   with no duplication of data from `src/features/portfolio/data/skills.ts`.
4. THE SkillsSection SHALL render each skill as a `TechBadge` component.
5. THE SkillsSection SHALL group `TechBadge` items within labelled category panels (e.g.
   `IntelPanel` or `SystemCard`) so the category grouping is visually clear.
6. THE SkillsSection SHALL display the category names: Languages, Frontend, Backend, Database,
   and Tools using the existing `skillCategory.label` values from the data layer.
7. WHEN a `TechBadge` is hovered, THE SkillsSection SHALL show a glow elevation effect.
8. THE SkillsSection SHALL render all skill items without hiding any behind interaction, ensuring
   all skills are readable in the initial render.
9. THE SkillsSection SHALL maintain a semantic `<section id="skills">` with an `<h2>` as its
   primary heading.
10. THE SkillsSection SHALL be fully keyboard-navigable with visible focus states meeting
    WCAG_2.1_AA.

---

### Requirement 7: ProjectsSection Redesign (Classified Operations)

**User Story:** As a visitor, I want each project displayed as a classified operation card, so that
the projects page feels architecturally serious and communicates technical depth.

#### Acceptance Criteria

1. THE ProjectsSection SHALL source project data exclusively via the existing `usePortfolioData`
   hook with no data duplication.
2. THE ProjectsSection SHALL render each project within a `SystemCard` styled as a classified
   operation, including: a sequential project identifier label (e.g. "PROJECT_001"), the project
   title as the primary heading, the summary description, and the technologies list as
   `TechBadge` components.
3. THE ProjectsSection SHALL render a `ProjectStatus` indicator for each project card.
4. THE ProjectsSection SHALL render metrics panel cells for: Performance, Complexity, and Scale,
   using `MetricPanel` or equivalent within the card.
5. WHEN `project.githubUrl` is defined, THE ProjectsSection SHALL render a GitHub link button;
   WHEN it is undefined, THE ProjectsSection SHALL render a disabled "Repository Coming Soon"
   button.
6. WHEN `project.showcaseUrl` is defined, THE ProjectsSection SHALL render a Live Demo link
   button; WHEN it is undefined, THE ProjectsSection SHALL render a disabled "Coming Soon"
   button.
7. WHEN a project card is hovered, THE ProjectsSection SHALL apply a glow elevation and a subtle
   scanning effect using CSS or Framer Motion.
8. THE ProjectsSection SHALL render a "More Projects in Progress" informational block below the
   project list, retaining the four coming-soon category labels from the current implementation.
9. THE ProjectsSection SHALL maintain a semantic `<section id="projects">` with an `<h2>` as its
   primary heading.
10. IF a project card includes links, THE ProjectsSection SHALL ensure all anchor elements have
    descriptive `aria-label` attributes referencing the project title, compliant with
    WCAG_2.1_AA.

---

### Requirement 8: EducationSection Redesign (Intelligence Timeline)

**User Story:** As a visitor, I want the education, achievements, and certificates displayed on a
vertical intelligence timeline with animated connection lines, so that the progression feels
structured and elite.

#### Acceptance Criteria

1. THE EducationSection SHALL source timeline data exclusively via the existing `usePortfolioData`
   hook with no data duplication.
2. THE EducationSection SHALL render a vertical timeline with a visible animated connection line
   running through all timeline nodes.
3. WHEN the timeline comes into view, THE EducationSection SHALL animate the connection line
   growing downward from top to bottom using Framer Motion.
4. THE EducationSection SHALL render each timeline entry within a styled card that displays the
   category (Education / Achievements / Certificates), title, optional subtitle, and optional
   description.
5. THE EducationSection SHALL differentiate timeline nodes visually by category using distinct
   icon colours or marker shapes.
6. WHEN `prefers-reduced-motion: reduce` is active, THE EducationSection SHALL display the full
   connection line and all cards without entrance or growth animations.
7. THE EducationSection SHALL maintain a semantic `<section>` with an `<h2>` heading "Education,
   Achievements & Certificates".

---

### Requirement 9: ContactSection Redesign (Command Centre)

**User Story:** As a visitor, I want the contact section to feel like a command centre with
terminal-inspired input fields, so that filling in the form feels intentional and professional.

#### Acceptance Criteria

1. THE ContactSection SHALL preserve the `useContactForm` hook completely — all form state
   management, field update logic, submission to `POST /api/contact`, and status message
   rendering MUST remain delegated to that hook without modification.
2. THE ContactSection SHALL render the form inside a `TerminalBlock` or `IntelPanel` component
   on the right column.
3. THE ContactSection SHALL render the contact channel information (email, phone, location from
   `CONTACT_INFO`) on the left column using styled contact-channel cards.
4. THE ContactSection left column SHALL include a section heading and brief invitation copy above
   the contact channels.
5. THE ContactSection form inputs SHALL use glowing focus states (`focus:border-primary`,
   `focus:box-shadow` glow) consistent with the Elite_Theme.
6. THE ContactSection form inputs SHALL retain the existing `id`, `htmlFor`, and label
   associations for accessibility.
7. WHEN `isSubmitting` is true, THE ContactSection SHALL display a visual loading indicator
   inside or adjacent to the submit button.
8. WHEN `statusMessage` is non-empty, THE ContactSection SHALL display it in a styled status
   block with `role="status"` for screen-reader compatibility.
9. THE ContactSection SHALL maintain a semantic `<section id="contact">` with an `<h2>` as its
   primary heading.
10. THE ContactSection SHALL ensure all form inputs have minimum touch target sizes of 44 px
    height and visible focus rings compliant with WCAG_2.1_AA.

---

### Requirement 10: WhyHireMeSection Redesign

**User Story:** As a visitor, I want the "Why Hire Me" section rendered as a grid of elite
capability cards, so that John Mark's core strengths are communicated with precision.

#### Acceptance Criteria

1. THE WhyHireMeSection SHALL source hire reasons from the existing `HIRE_REASONS` constant in
   `src/constants/index.ts` with no data duplication.
2. THE WhyHireMeSection SHALL render each hire reason inside a `SystemCard` component.
3. THE WhyHireMeSection SHALL render a `SectionLabel` and `<h2>` heading above the card grid.
4. WHEN a `SystemCard` is hovered, THE WhyHireMeSection SHALL apply the standard glow elevation
   from Requirement 2.
5. THE WhyHireMeSection SHALL maintain a semantic `<section>` with its `<h2>` as primary heading.

---

### Requirement 11: Footer Redesign

**User Story:** As a visitor, I want a minimal, technical footer branded "ADORA.SYSTEMS", so that
the bottom of every page reinforces the elite system identity.

#### Acceptance Criteria

1. THE Footer SHALL display the brand text "ADORA.SYSTEMS" in a monospace or technical style on
   the left side.
2. THE Footer SHALL display the current year and "Built with Next.js and TypeScript" on the right
   side.
3. THE Footer SHALL render `SOCIAL_LINKS` items when the array is non-empty, consistent with the
   existing logic.
4. THE Footer SHALL use the `--color-border` token for its top border.
5. THE Footer SHALL use the `--color-dark-surface` or equivalent token for its background.

---

### Requirement 12: Animation System

**User Story:** As a developer, I want a consistent animation system using existing Framer Motion,
so that all motion feels premium and purposeful without impeding accessibility.

#### Acceptance Criteria

1. THE Portfolio_System SHALL implement Framer Motion scroll-triggered fade-reveal animations
   for all Section_Components, activating when each section reaches 20 % of the viewport.
2. THE Portfolio_System SHALL implement slide-reveal animations (translateY or translateX) for
   hero columns and timeline cards.
3. THE Portfolio_System SHALL implement metric-counter animations in `MetricPanel` and
   `AboutSection`.
4. THE Portfolio_System SHALL implement hover-elevation animations (translateY −4 px + glow
   shadow) on all `SystemCard` instances via Framer Motion.
5. THE Portfolio_System SHALL implement glow-transition animations (opacity and box-shadow
   interpolation) on all glow-border elements.
6. THE Portfolio_System SHALL implement a subtle repeating grid-movement background animation
   at ≤ 4 % opacity driven by CSS keyframes.
7. WHEN `prefers-reduced-motion: reduce` is active, THE Portfolio_System SHALL use Framer
   Motion's `useReducedMotion()` hook to disable all entrance, exit, hover, and looping
   animations while preserving final visible states.
8. THE Portfolio_System SHALL continue to use `AnimatePresence` with `mode="wait"` in
   `PageTransition` for cross-page transitions, unchanged from the existing implementation.

---

### Requirement 13: Case Studies Route

**User Story:** As a potential employer or collaborator, I want to visit `/case-studies` and read
deep engineering case studies, so that I can evaluate John Mark's architectural thinking and
problem-solving approach.

#### Acceptance Criteria

1. THE Portfolio_System SHALL create the route `src/app/case-studies/page.tsx` that renders a
   case studies listing page.
2. THE Portfolio_System SHALL provide page-level metadata (title: "Case Studies | John Mark R.
   Adora", description) for the new route.
3. THE Case_Studies_Page SHALL render a page hero section with a `SectionLabel`, `<h1>`, and
   descriptive subtitle.
4. THE Case_Studies_Page SHALL render a grid of case study cards, each displaying: title,
   overview summary, tech stack tags (as `TechBadge` components), and a "Read More" or "Coming
   Soon" button.
5. WHEN a case study is not yet published, THE Case_Studies_Page SHALL render the card in a
   "Coming Soon" state with the Read More button disabled and a `ProjectStatus` indicator set to
   "Development".
6. THE Case_Studies_Page SHALL use `SystemCard` for each case study card, consistent with the
   rest of the Elite_Theme.
7. THE Portfolio_System SHALL add a `{ href: "/case-studies", label: "Case Studies" }` entry to
   `NAV_LINKS` in `src/constants/index.ts` so the Navbar includes the new route.
8. THE Case_Studies_Page SHALL maintain semantic HTML structure with the `<h1>` as the primary
   heading and `<h2>` for each case study card title.
9. THE Case_Studies_Page SHALL be responsive from 375 px to 1920 px+ with no horizontal
   overflow.

---

### Requirement 14: Responsiveness and No Horizontal Overflow

**User Story:** As a visitor on any device, I want the portfolio to render correctly from 375 px
mobile through 1920 px+ desktop, so that every user gets a premium experience regardless of
screen size.

#### Acceptance Criteria

1. THE Portfolio_System SHALL render without horizontal overflow at viewport widths of 375 px,
   768 px, 1024 px, 1280 px, and 1920 px.
2. THE Portfolio_System SHALL use a mobile-first responsive grid approach — all multi-column
   layouts SHALL collapse to a single column at or below the `sm` breakpoint (640 px).
3. THE Portfolio_System SHALL apply comfortable reading line-lengths on large screens by
   constraining content to a `max-w-6xl` (or narrower) container.
4. THE Portfolio_System SHALL maintain premium vertical spacing at all breakpoints: at minimum
   `py-16` on mobile sections and `py-20` or larger on desktop.
5. THE Portfolio_System SHALL ensure the Navbar remains fully usable without overflow or
   truncation on 375 px viewports.
6. THE Portfolio_System SHALL ensure the `HeroSection` two-column layout stacks vertically on
   viewports narrower than 1024 px without any horizontal overflow.

---

### Requirement 15: Accessibility Compliance

**User Story:** As a user who relies on assistive technology or keyboard navigation, I want the
portfolio to be fully accessible, so that I am not excluded from any information or interaction.

#### Acceptance Criteria

1. THE Portfolio_System SHALL maintain semantic HTML throughout all redesigned components:
   correct heading hierarchy (`<h1>` per page → `<h2>` per section → `<h3>` within sections),
   `<nav>`, `<section>`, `<article>`, `<footer>`, `<header>`, `<main>` elements used
   appropriately.
2. THE Portfolio_System SHALL maintain `aria-current="page"` on the active Navbar link.
3. THE Portfolio_System SHALL ensure all images have descriptive `alt` text; decorative-only
   visuals SHALL use `alt=""` and `aria-hidden="true"`.
4. THE Portfolio_System SHALL ensure all colour combinations used for text and UI elements meet
   WCAG_2.1_AA minimum contrast ratios (4.5:1 for normal text, 3:1 for large text and UI
   components).
5. THE Portfolio_System SHALL ensure all interactive elements are reachable and operable via
   keyboard Tab navigation and can be activated with Enter or Space where appropriate.
6. THE Portfolio_System SHALL provide visible focus rings on all focusable elements using the
   `--ring` / `--color-primary` token.
7. THE Portfolio_System SHALL use `role="status"` on dynamic status messages (form submission
   feedback) so screen readers announce them.
8. THE Portfolio_System SHALL not introduce any motion that cannot be suppressed by the Reduced_Motion
   preference as defined in Requirement 12.

---

### Requirement 16: Backend and Data Preservation

**User Story:** As the site owner, I want all backend code, API routes, validators, and data files
preserved unchanged, so that the redesign does not break any existing functionality.

#### Acceptance Criteria

1. THE Portfolio_System SHALL NOT modify any file under `src/backend/`.
2. THE Portfolio_System SHALL NOT modify any file under `src/app/api/`.
3. THE Portfolio_System SHALL NOT modify `src/types/index.ts`.
4. THE Portfolio_System SHALL NOT modify `src/features/portfolio/data/projects.ts`,
   `skills.ts`, or `timeline.ts`.
5. THE Portfolio_System SHALL NOT modify `src/features/portfolio/hooks/useContactForm.ts` or
   `usePortfolioData.ts`.
6. THE Portfolio_System SHALL NOT modify `src/hooks/useTheme.ts`.
7. THE Portfolio_System SHALL NOT introduce any duplicate copy of data that already exists in
   the data files or `src/constants/index.ts`.
8. THE Portfolio_System SHALL NOT add or remove npm dependencies that affect the backend, Zod
   validators, or Supabase integration.
