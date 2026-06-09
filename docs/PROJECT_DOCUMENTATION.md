# Adora Website Portfolio — Project Documentation

**Project name:** `adora-portfolio`  
**Owner:** John Mark R. Adora  
**Project type:** Personal software developer portfolio  
**Last documented:** June 2026  
**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

This repository is a personal portfolio website for John Mark R. Adora, a Bachelor of Science in Computer Science student and aspiring software engineer. It presents personal profile information, technical skills, featured projects, education history, achievements, certifications, contact details, a downloadable resume, and complete SEO metadata across four dedicated pages.

The project uses the Next.js 15 App Router, follows clean architecture, and separates all UI from data, services, hooks, and shared types. The site ships as fully static output with no backend runtime required.

---

## Quick Reference

| Area | Detail |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 with CSS custom properties |
| Animations | Framer Motion 12 |
| Theme support | Light, Dark, System (stored in `localStorage`) |
| Routing | Four static pages + four dynamic API routes |
| Database | Supabase (PostgreSQL) |
| Validation | Zod |
| SEO | Next.js `metadata` exports + JSON-LD Person structured data |
| Contact form | Client-side + server-side validation; persists to Supabase |
| Build output | Static pages prerendered; API routes server-rendered on demand |
| Public assets | Profile photo and resume in `public/` |

---

## Owner and Portfolio Content

| Field | Value |
|---|---|
| Name | John Mark R. Adora |
| Role | Computer Science Student \| Aspiring Software Engineer |
| Tagline | Mobile Developer \| Web Developer \| Continuous Learner |
| Location | Pasay City, Philippines |
| Email | `johnmark25.com@gmail.com` |
| Phone | `09360987757` |
| Resume | `public/resume/RESUME-Adora-v3.docx` |
| Profile image | `public/profile-pic.jpg` |

### Featured projects

| Project | Type | Technologies | Status |
|---|---|---|---|
| Stack n Stock | Team Project / Mobile Application | Dart, Flutter, Firebase | No public repo or live link yet |

### Skill categories

| Category | Skills |
|---|---|
| Programming Languages | JavaScript, TypeScript, Python, Java, C++, C# |
| Databases | PostgreSQL, Supabase |
| Web Technologies | HTML, CSS, JavaScript, TypeScript |
| Development Tools | XAMPP, Git, GitHub, Cursor |

### Education and achievements

| Item | Detail |
|---|---|
| Degree | Bachelor of Science in Computer Science |
| University | Adamson University (AU) |
| Expected graduation | 2026–2027 |
| Academic award | Dean's Lister — 4 consecutive years |
| IBM SkillsBuild | Multiple certifications: AI, UI/UX Design, Digital Literacy, IT Fundamentals |

---

## Site Architecture and Pages

The site is a multi-page application with four routes. All routes share a single layout that wraps each page with a sticky Navbar, an animated page transition, and a Footer.

### Pages and their routes

| Route | File | Page title | Content |
|---|---|---|---|
| `/` | `src/app/page.tsx` | John Mark R. Adora \| Portfolio | Hero, About, Why Hire Me, Education |
| `/skills` | `src/app/skills/page.tsx` | Skills \| John Mark R. Adora | Page hero header, Skills section |
| `/projects` | `src/app/projects/page.tsx` | Projects \| John Mark R. Adora | Page hero header, Projects section |
| `/contact` | `src/app/contact/page.tsx` | Contact \| John Mark R. Adora | Page hero header, Contact section |

### Page metadata pattern

The root layout defines the site-wide metadata template:

```
title.template = "%s | John Mark R. Adora"
title.default  = "John Mark R. Adora | Software Developer Portfolio"
```

Inner pages export only the `title` and `description` fields. The template automatically appends the owner name.

### Shared layout flow

Every page is automatically wrapped by the root layout:

```
src/app/layout.tsx
  └── <html> + <body> + Geist fonts
        ├── <JsonLd />           ← Person structured data, injected once
        └── <SiteShell>
              ├── <Navbar />     ← Sticky, active-route highlighting
              ├── <PageTransition>
              │     └── {page content}
              └── <Footer />
```

`SiteShell` is a server component. `Navbar` and `PageTransition` are client components because they require `usePathname` and Framer Motion respectively.

---

## Folder Structure

```
.
├── docs/
│   ├── ARCHITECTURE_RULES.md
│   └── PROJECT_DOCUMENTATION.md
├── public/
│   ├── profile-pic.jpg
│   └── resume/
│       └── RESUME-Adora-v3.docx
├── scripts/
│   └── node-bin/
│       ├── npm.cmd
│       └── npx.cmd
├── src/
│   ├── app/
│   │   ├── (portfolio)/          ← Reserved route group (empty)
│   │   ├── api/                  ← Reserved for future API routes
│   │   ├── contact/
│   │   │   └── page.tsx          ← /contact page
│   │   ├── projects/
│   │   │   └── page.tsx          ← /projects page
│   │   ├── skills/
│   │   │   └── page.tsx          ← /skills page
│   │   ├── globals.css           ← Tailwind import + CSS tokens + animations
│   │   ├── layout.tsx            ← Root layout: fonts, SiteShell, metadata, JSON-LD
│   │   └── page.tsx              ← / homepage
│   ├── assets/                   ← Reserved for source-controlled assets
│   ├── backend/
│   │   ├── database/             ← Reserved for DB clients
│   │   ├── middleware/           ← Reserved for middleware
│   │   ├── repositories/         ← Reserved for data access layer
│   │   ├── services/             ← Reserved for backend service classes
│   │   ├── types/                ← Reserved for backend-specific types
│   │   └── validators/           ← Reserved for input validators
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx        ← Polymorphic button: renders <a> or <button>
│   │   │   ├── Card.tsx          ← Surface card with hover-lift effect
│   │   │   └── SectionHeader.tsx ← Eyebrow + h2 + description block
│   │   ├── layout/
│   │   │   ├── Footer.tsx        ← Copyright bar + social links
│   │   │   ├── Navbar.tsx        ← Sticky nav with active-route highlighting + ThemeToggle
│   │   │   ├── PageTransition.tsx← Framer Motion fade + slide-up per route change
│   │   │   └── SiteShell.tsx     ← Composes Navbar + PageTransition + Footer
│   │   ├── sections/
│   │   │   ├── AboutSection.tsx  ← Profile photo + bio paragraphs + resume download
│   │   │   ├── ContactSection.tsx← Two-column contact info + form
│   │   │   ├── EducationSection.tsx ← Alternating vertical timeline
│   │   │   ├── HeroSection.tsx   ← Full-width hero with photo and CTAs
│   │   │   ├── ProjectsSection.tsx ← Project cards + "coming soon" card
│   │   │   ├── SkillsSection.tsx ← Tabbed skill category filter + skill grid
│   │   │   └── WhyHireMeSection.tsx ← Four-column reason cards
│   │   ├── seo/
│   │   │   └── JsonLd.tsx        ← Schema.org Person JSON-LD
│   │   └── ui/
│   │       └── ThemeToggle.tsx   ← Light/dark toggle button (L/D label)
│   ├── constants/
│   │   └── index.ts              ← SITE_METADATA, NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS, HIRE_REASONS
│   ├── data/                     ← Empty; data lives under features/
│   ├── features/
│   │   ├── career-insights/      ← Placeholder feature (all folders empty)
│   │   │   ├── components/
│   │   │   ├── data/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types/
│   │   └── portfolio/
│   │       ├── components/       ← Empty; sections live in components/sections/
│   │       ├── data/
│   │       │   ├── projects.ts   ← Project array (readonly)
│   │       │   ├── skills.ts     ← SkillCategory array (readonly)
│   │       │   └── timeline.ts   ← TimelineItem array (readonly)
│   │       ├── hooks/
│   │       │   ├── useContactForm.ts   ← Form state + submit logic
│   │       │   └── usePortfolioData.ts ← Memoized projects + skills + timeline
│   │       ├── services/
│   │       │   ├── contact.service.ts  ← Validation + local submit result
│   │       │   └── portfolio.service.ts← Read methods for all portfolio data
│   │       └── types/            ← Empty; types live in src/types/
│   ├── hooks/
│   │   └── useTheme.ts           ← localStorage theme preference + system media query
│   ├── lib/
│   │   └── utils.ts              ← cn() class-merging utility
│   ├── services/                 ← Empty; services live under features/
│   ├── store/                    ← Reserved for future state management
│   ├── styles/
│   │   └── variables.css         ← Legacy fallback CSS variables (overridden by globals.css)
│   └── types/
│       └── index.ts              ← All shared TypeScript interfaces and unions
├── .gitignore
├── dev.cmd                       ← Windows CMD dev server launcher
├── dev.ps1                       ← Windows PowerShell dev server launcher
├── eslint.config.mjs
├── next.config.ts                ← Minimal Next.js config (no overrides needed)
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

Excluded from source control: `.next/`, `node_modules/`, `.git/`.

---

## Source Folder Responsibilities

| Folder | Purpose |
|---|---|
| `src/app/` | Next.js App Router: root layout, global CSS, all page files, and future API routes |
| `src/components/common/` | Generic, reusable UI primitives (Button, Card, SectionHeader) |
| `src/components/layout/` | Site-wide shell components: Navbar, Footer, PageTransition, SiteShell |
| `src/components/sections/` | Full-width page section components (one responsibility per file) |
| `src/components/seo/` | SEO rendering: JSON-LD structured data injection |
| `src/components/ui/` | Interactive UI controls: ThemeToggle |
| `src/constants/` | Single source of truth for all portfolio metadata, nav links, contact info, social links, hire reasons |
| `src/features/portfolio/data/` | Static TypeScript arrays: projects, skills, timeline |
| `src/features/portfolio/services/` | Read layer and validation layer between raw data and UI |
| `src/features/portfolio/hooks/` | React hooks that bridge services to components |
| `src/features/career-insights/` | Reserved feature module for future career-guidance content |
| `src/hooks/` | Shared cross-feature hooks (useTheme) |
| `src/lib/` | Generic utility functions (cn class merger) |
| `src/types/` | All shared TypeScript interfaces and type aliases |
| `src/backend/` | Reserved future backend structure: DB, repos, validators, middleware |
| `src/store/` | Reserved for future global state (Zustand, Jotai, or similar) |
| `src/assets/` | Reserved for source-controlled binary assets |
| `public/` | Static files served directly by the browser (images, resume) |

---

## Data Flow

### Frontend — static portfolio content (current)

Data lives in static TypeScript files and flows upward through a service and hook before reaching any component:

```
src/features/portfolio/data/projects.ts   ─┐
src/features/portfolio/data/skills.ts     ─┤─► portfolio.service.ts
src/features/portfolio/data/timeline.ts   ─┘         │
                                                      ▼
                                            usePortfolioData.ts
                                                      │
                                                      ▼
                          SkillsSection / ProjectsSection / EducationSection
```

No page or section component imports data files directly.

### Frontend — contact form (current)

```
ContactSection.tsx
      │  (calls)
      ▼
useContactForm.ts          ← manages formData, isSubmitting, statusMessage
      │  (calls)
      ▼
features/.../contact.service.ts  ← client-side validation, calls POST /api/contact
      │
      ▼
POST /api/contact              ← backend validates again, persists to Supabase
```

No business logic exists inside `ContactSection.tsx`. It only delegates to the hook.

### Backend API — Supabase integration

```
POST /api/contact
GET  /api/projects
GET  /api/skills
GET  /api/career-insights
         │
         ▼
  Rate Limiter (middleware/rate-limit.ts)
         │
         ▼
  Route Handler  (src/app/api/*/route.ts)   ← thin, no logic
         │
         ▼
  Backend Service  (src/backend/services/)  ← orchestrates validation + repo
         │
         ▼
  Zod Validator  (src/backend/validators/)  ← sanitizes + validates input
         │
         ▼
  Repository  (src/backend/repositories/)   ← only layer that knows Supabase
         │
         ▼
  Supabase Client  (src/backend/database/supabase.ts)
         │
         ▼
  Supabase PostgreSQL
```

---

## Backend Architecture

### Overview

The backend lives entirely inside `src/backend/` and `src/app/api/`. No business logic touches React components or page files.

### Layer responsibilities

| Layer | Location | Responsibility |
|---|---|---|
| Route Handlers | `src/app/api/*/route.ts` | Thin HTTP entry points. Invoke rate limiter and service only. |
| Middleware | `src/backend/middleware/` | Rate limiting, error handling, response helpers |
| Services | `src/backend/services/` | Business logic: orchestrate validation + repository calls |
| Validators | `src/backend/validators/` | Zod schemas, sanitization, `safeValidate` helper |
| Repositories | `src/backend/repositories/` | All Supabase queries, DB-to-domain mapping |
| Database | `src/backend/database/` | Supabase client factory (browser / server / admin), DB types |
| Backend types | `src/backend/types/` | Domain interfaces, `ApiResponse`, `ServiceResult` |

### API routes

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/projects` | None (public) | All projects; `?featured=true` for featured only |
| `GET` | `/api/skills` | None (public) | All skills; `?grouped=true` for category-grouped |
| `POST` | `/api/contact` | None (rate limited) | Submit contact form; persists to Supabase |
| `GET` | `/api/career-insights` | None (public) | Published insights only; `?category=<value>` filter |

### Response envelope

Every API response uses a consistent envelope:

```ts
// Success
{ success: true, data: T }

// Failure
{ success: false, error: string }
```

HTTP status codes: 200/201 success, 400 bad request, 404 not found, 422 validation error, 429 rate limit, 500 server error.

### Rate limits

| Limiter | Endpoint | Limit |
|---|---|---|
| `contactLimiter` | `POST /api/contact` | 5 requests / 15 min / IP |
| `readLimiter` | All `GET` endpoints | 60 requests / min / IP |

### Supabase clients

Three clients are exported from `src/backend/database/supabase.ts`:

| Client | Key used | RLS | When to use |
|---|---|---|---|
| `createBrowserClient()` | anon | Enforced | React client components |
| `createServerClient()` | anon | Enforced | Server Components, GET route handlers |
| `createAdminClient()` | service_role | Bypassed | Trusted writes (contact form) |

### Environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

All three variables are validated at module load time. A missing variable throws with a descriptive message rather than failing silently at runtime.

### Database schema

The full SQL schema lives in `docs/schema.sql`. Run it in the Supabase SQL Editor to provision all tables.

| Table | Purpose | RLS |
|---|---|---|
| `contact_submissions` | Stores contact form submissions | Anon insert; service-role read |
| `projects` | Portfolio projects | Public read; service-role write |
| `skills` | Skill entries with category | Public read; service-role write |
| `career_insights` | Career guidance articles | Public reads `published=true` only |

### Validation rules (contact form)

| Field | Rule |
|---|---|
| `name` | Required, max 100 chars, HTML-stripped |
| `email` | Valid email format, lowercased |
| `subject` | Required, max 200 chars, HTML-stripped |
| `message` | Min 20 chars, max 5000 chars, HTML-stripped |

---

## Important Files

### Frontend

| File | Responsibility |
|---|---|
| `src/app/layout.tsx` | Root HTML shell, Geist font injection, SiteShell composition, global metadata, OpenGraph, Twitter card, JSON-LD |
| `src/app/page.tsx` | Composes homepage from HeroSection + AboutSection + WhyHireMeSection + EducationSection |
| `src/app/skills/page.tsx` | Skills page with hero header + SkillsSection; metadata: "Skills" |
| `src/app/projects/page.tsx` | Projects page with hero header + ProjectsSection; metadata: "Projects" |
| `src/app/contact/page.tsx` | Contact page with hero header + ContactSection; metadata: "Contact" |
| `src/app/globals.css` | Tailwind 4 import, all CSS custom property tokens, dark mode overrides, animations, reduced-motion |
| `src/styles/variables.css` | Legacy CSS variable file (imported by globals.css; overridden by token declarations) |
| `src/constants/index.ts` | SITE_METADATA · NAV_LINKS · CONTACT_INFO · SOCIAL_LINKS · HIRE_REASONS — single source of truth |
| `src/types/index.ts` | All shared TypeScript models |
| `src/hooks/useTheme.ts` | Reads/writes theme preference from localStorage, listens for system color scheme changes, applies `.dark` class |
| `src/features/portfolio/data/projects.ts` | Readonly array of Project objects |
| `src/features/portfolio/data/skills.ts` | Readonly array of SkillCategory objects |
| `src/features/portfolio/data/timeline.ts` | Readonly array of TimelineItem objects |
| `src/features/portfolio/services/portfolio.service.ts` | PortfolioService class with getProjects / getSkillCategories / getTimelineItems |
| `src/features/portfolio/services/contact.service.ts` | ContactService class with submitContactForm + private validate |
| `src/features/portfolio/hooks/usePortfolioData.ts` | Memoized hook returning projects, skillCategories, timelineItems |
| `src/features/portfolio/hooks/useContactForm.ts` | Hook managing form state, updateField, submit, isSubmitting, statusMessage |
| `src/components/layout/SiteShell.tsx` | Wraps every page: Navbar → PageTransition → Footer |
| `src/components/layout/Navbar.tsx` | Sticky nav; reads `usePathname()` for active-route highlight; includes ThemeToggle and resume download |
| `src/components/layout/PageTransition.tsx` | Framer Motion AnimatePresence wrapper; opacity 0→1 + y 12→0 per route; respects `prefers-reduced-motion` |
| `src/components/layout/Footer.tsx` | Copyright line + optional social links from SOCIAL_LINKS constant |
| `src/components/common/Button.tsx` | Polymorphic: renders `<a>` when `href` prop present, `<button>` otherwise; three variants: primary, secondary, ghost |
| `src/components/common/Card.tsx` | Surface card using `<article>` with hover-lift animation |
| `src/components/common/SectionHeader.tsx` | Optional eyebrow label + h2 heading + optional description |
| `src/components/ui/ThemeToggle.tsx` | Cycles between light/dark preference; shows "L" or "D" label |
| `src/components/seo/JsonLd.tsx` | Renders Schema.org Person JSON-LD into the document head via dangerouslySetInnerHTML |
| `src/lib/utils.ts` | `cn()` — filters falsy values and joins class names |
| `public/profile-pic.jpg` | Used in HeroSection (priority load) and AboutSection |
| `public/resume/RESUME-Adora-v3.docx` | Downloadable resume — linked in Navbar and AboutSection |

### Backend

| File | Responsibility |
|---|---|
| `src/backend/database/supabase.ts` | Three Supabase client factories (browser, server, admin) + singleton helpers |
| `src/backend/database/types.ts` | Raw Supabase DB row and insert types for all four tables |
| `src/backend/types/common.types.ts` | `ApiResponse`, `ServiceResult`, `PaginationParams`, `RateLimitEntry` |
| `src/backend/types/contact.types.ts` | `ContactSubmission`, `CreateContactInput`, `IContactRepository` |
| `src/backend/types/project.types.ts` | `ProjectRecord`, `CreateProjectInput`, `IProjectRepository` |
| `src/backend/validators/common.validator.ts` | Zod primitives: `nonEmptyString`, `emailSchema`, `safeValidate`, `sanitizeText` |
| `src/backend/validators/contact.validator.ts` | Full contact form Zod schema with sanitization |
| `src/backend/repositories/contact.repository.ts` | Writes contact submissions using admin client |
| `src/backend/repositories/project.repository.ts` | Reads projects: findAll, findFeatured, findById |
| `src/backend/repositories/skill.repository.ts` | Reads skills: findAll, findByCategory, findGrouped |
| `src/backend/repositories/career-insights.repository.ts` | Reads published insights: findPublished, findById, findByCategory |
| `src/backend/services/contact.service.ts` | Validates input → calls contact repository → returns ServiceResult |
| `src/backend/services/project.service.ts` | Calls project repository → returns ServiceResult |
| `src/backend/services/skill.service.ts` | Calls skill repository → returns ServiceResult |
| `src/backend/services/career-insights.service.ts` | Calls insights repository → returns ServiceResult |
| `src/backend/middleware/rate-limit.ts` | In-memory rate limiter; `contactLimiter` (5/15min) and `readLimiter` (60/min) |
| `src/backend/middleware/error-handler.ts` | `withErrorHandler` wrapper, `badRequest`, `notFound`, `handleError` helpers |
| `src/app/api/contact/route.ts` | `POST /api/contact` — rate check → service → 201/422 response |
| `src/app/api/projects/route.ts` | `GET /api/projects` — rate check → service → 200 response |
| `src/app/api/skills/route.ts` | `GET /api/skills` — rate check → service → 200 response |
| `src/app/api/career-insights/route.ts` | `GET /api/career-insights` — rate check → service → 200 response |
| `.env.local.example` | Template for environment variables (copy to `.env.local`) |
| `docs/schema.sql` | Complete PostgreSQL schema with enums, RLS policies, triggers, and seed data |

---

## TypeScript Models

All interfaces and type aliases live in `src/types/index.ts`.

| Type | Used For |
|---|---|
| `SkillCategoryId` | Union: `"programming" \| "databases" \| "web" \| "tools"` |
| `Skill` | `id`, `name`, `categoryId` |
| `SkillCategory` | `id`, `label`, `skills[]` |
| `Project` | `id`, `title`, `type`, `summary`, `technologies[]`, `badges[]`, optional `githubUrl`, optional `showcaseUrl` |
| `HireReason` | `title`, `description` |
| `TimelineItem` | `id`, `category` (`Education \| Achievements \| Certificates`), `title`, optional `subtitle`, optional `description` |
| `ContactInfo` | `label`, `value`, optional `href` |
| `ContactFormData` | `name`, `email`, `subject`, `message` |
| `ContactSubmissionResult` | `ok: boolean`, `message: string` |
| `ThemePreference` | Union: `"light" \| "dark" \| "system"` |
| `ResolvedTheme` | Union: `"light" \| "dark"` |

---

## Styling System

Tailwind CSS 4 is configured via CSS custom properties. The token set lives in `src/app/globals.css` under `@theme inline` and is defined separately for light and dark modes.

### Color tokens

| Token | Light value | Dark value |
|---|---|---|
| `--background` | `#f7f8f4` | `#101411` |
| `--foreground` | `#18211f` | `#eef5ef` |
| `--muted` | `#5e6966` | `#aab6b0` |
| `--surface` | `#ffffff` | `#171d19` |
| `--surface-soft` | `#eef3ea` | `#202821` |
| `--border` | `#d9e0d7` | `#314038` |
| `--accent` | `#0f766e` | `#5eead4` |
| `--accent-strong` | `#134e4a` | `#99f6e4` |
| `--accent-soft` | `#ccfbf1` | `#123e39` |
| `--ring` | `#0f766e` | `#5eead4` |

### Dark mode

Dark mode is activated by the `.dark` class on `<html>`. `useTheme` applies or removes this class based on stored preference and system media query.

### Custom CSS utilities defined in globals.css

| Utility | Behavior |
|---|---|
| `.animate-fade-in` | Fades in over 600ms |
| `.animate-slide-up` | Fades in while translating Y from 18px to 0 over 700ms |
| `.hover-lift` | On hover: translateY(-4px) + accent glow shadow at 180ms |
| `prefers-reduced-motion` | Overrides all transition/animation durations to near-zero globally |

### Typography

- Font family: Geist Sans (variable `--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded from `next/font/google`
- Both fonts are applied as CSS variables and registered in the Tailwind `@theme` block

### Body background

The body uses a two-layer background:

```css
background:
  linear-gradient(135deg, color-mix(in srgb, var(--accent-soft) 45%, transparent), transparent 28rem),
  var(--background);
```

This creates a subtle accent tint in the top-left corner on both light and dark modes.

---

## Navigation

The Navbar renders links from the `NAV_LINKS` constant and a hardcoded resume download link.

| Label | Href | Type |
|---|---|---|
| Home | `/` | Next.js `<Link>` |
| Skills | `/skills` | Next.js `<Link>` |
| Projects | `/projects` | Next.js `<Link>` |
| Contact | `/contact` | Next.js `<Link>` |
| Resume | `/resume/RESUME-Adora-v3.docx` | `<a download>` |

Active state: the link whose `href` exactly matches `usePathname()` receives `bg-accent text-background` styling and `aria-current="page"`.

On mobile, the ThemeToggle moves to the top-right of the name bar. On desktop, it sits to the right of the navigation links.

---

## Page Transitions

`PageTransition` wraps the page slot in `SiteShell` and uses Framer Motion `AnimatePresence` with `mode="wait"`.

| Property | Value |
|---|---|
| `initial` | `{ opacity: 0, y: 12 }` |
| `animate` | `{ opacity: 1, y: 0 }` |
| `exit` | `{ opacity: 0, y: 12 }` |
| `duration` | `0.45s` |
| `ease` | `easeOut` |
| Reduced motion | `useReducedMotion()` — skips y axis, sets duration to 0 |

The transition key is `usePathname()`, so the animation fires once per route change.

---

## SEO

### Metadata

All page metadata is assembled in two layers:

1. `src/app/layout.tsx` — sets site-wide defaults: description, authors, creator, OpenGraph object, Twitter card
2. Each page file — exports a `metadata` object with `title` and `description` only; the title template appends the owner name automatically

### JSON-LD

`JsonLd` renders a `Schema.org/Person` record directly in the document for every page. Fields include: `name`, `jobTitle`, `address.addressCountry`, and `knowsAbout` array (Software Development, Web Development, Databases, TypeScript, React, Next.js).

---

## Build Output

```
Route (app)                  Size    First Load JS
○ /                          7.58 kB     110 kB
○ /contact                   2.24 kB     105 kB
○ /projects                  2.85 kB     105 kB
○ /skills                    2.27 kB     105 kB
ƒ /api/career-insights        133 B      103 kB
ƒ /api/contact                133 B      103 kB
ƒ /api/projects               133 B      103 kB
ƒ /api/skills                 133 B      103 kB
```

`○` = static, prerendered at build time. `ƒ` = dynamic, server-rendered on demand.  
Shared JS: ~102 kB (React, Framer Motion, fonts).

---

## NPM Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Next.js dev server on `localhost:3000` |
| `npm run build` | Production build — outputs static pages to `.next/` |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

Windows helpers: `dev.cmd` and `dev.ps1` are launcher scripts for environments where `npm` is not on the system PATH.

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | ^15.3.3 | Framework |
| `react` | ^19.1.0 | UI runtime |
| `react-dom` | ^19.1.0 | DOM renderer |
| `framer-motion` | ^12.40.0 | Page transition animations |
| `@supabase/supabase-js` | ^2.49.10 | Supabase database client |
| `zod` | ^3.25.67 | Runtime validation and schema parsing |
| `tailwindcss` | ^4.1.7 | Utility-first CSS (dev) |
| `typescript` | ^5.8.3 | Type system (dev) |
| `eslint` | ^9.27.0 | Linting (dev) |
| `eslint-config-next` | ^15.3.3 | Next.js ESLint rules (dev) |
| `@tailwindcss/postcss` | ^4.1.7 | Tailwind PostCSS plugin (dev) |

---

## Extension Points

The project is intentionally prepared for future growth:

| Area | How to extend |
|---|---|
| Add a project | Append an entry to `src/features/portfolio/data/projects.ts` (static) or insert a row into the `projects` Supabase table (DB) |
| Add a skill | Append to the appropriate category in `src/features/portfolio/data/skills.ts` (static) or insert a row into `skills` (DB) |
| Add a timeline item | Append to `src/features/portfolio/data/timeline.ts` |
| Add social links | Populate `SOCIAL_LINKS` in `src/constants/index.ts` |
| Connect contact form to DB | Set `SUPABASE_*` env vars — the backend is already wired; update `useContactForm` to call `POST /api/contact` |
| Add a new skill category | Extend the `skill_category` Supabase enum, the `SkillCategoryId` union in `src/types/index.ts`, and the data file |
| Add a new page | Create `src/app/<route>/page.tsx` — inherits Navbar, Footer, and transitions automatically |
| Add a new API route | Create `src/app/api/<route>/route.ts` using the existing service/repository/validator pattern |
| Backend features | Build inside `src/backend/` following the existing layered pattern |
| Career insights module | Implement the pre-scaffolded `src/features/career-insights/` feature; DB table and API route already exist |
| State management | Use `src/store/` with Zustand or Jotai when global state is needed |
| Blog or CMS | Add `src/features/blog/` or connect a headless CMS via API routes |
| Switch to Redis rate limiting | Replace the `Map` store in `RateLimiter` with an Upstash Redis client — same interface, no route changes needed |

---

## Documentation Files

| File | Purpose |
|---|---|
| `README.md` | Quick start, setup commands, and doc links |
| `docs/PROJECT_DOCUMENTATION.md` | Full project inventory, folder structure, data flow, important files, and implementation details |
| `docs/ARCHITECTURE_RULES.md` | Coding standards, architectural constraints, and long-term growth guidelines |
