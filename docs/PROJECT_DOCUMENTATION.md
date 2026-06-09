# Adora Website Portfolio — Project Documentation

**Project name:** `adora-portfolio`
**Owner:** John Mark R. Adora
**Project type:** Personal software developer portfolio
**Last documented:** June 2026
**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Supabase · Zod

---

## Project Status

| Area | Status | Notes |
|---|---|---|
| Multi-page frontend | ✅ Complete | 4 routes: `/`, `/skills`, `/projects`, `/contact` |
| Shared layout | ✅ Complete | Navbar, Footer, PageTransition shared via SiteShell |
| Active nav highlighting | ✅ Complete | `usePathname()` drives `bg-accent` on active link |
| Page transitions | ✅ Complete | Framer Motion fade + slide-up, respects `prefers-reduced-motion` |
| Dark / light / system theme | ✅ Complete | `localStorage` persistence + system media query listener |
| SEO metadata | ✅ Complete | Per-page metadata + OpenGraph + Twitter card + JSON-LD |
| Contact form (frontend) | ✅ Complete | `useContactForm` → `POST /api/contact` via `fetch` |
| Contact form (backend API) | ✅ Complete | Zod validation, HTML sanitization, Supabase write |
| Backend API routes | ✅ Complete | 4 routes: contact, projects, skills, career-insights |
| Supabase integration | ✅ Complete | Credentials in `.env.local`; browser/server/admin clients |
| Database schema | ✅ Written | `docs/schema.sql` — not yet run in Supabase SQL Editor |
| DB permissions fix | ⚠️ Pending | **Run `docs/fix-permissions.sql` in Supabase SQL Editor** |
| Rate limiting | ✅ Complete | In-memory: contact 5/15min, reads 60/min per IP |
| Git repository | ✅ Complete | Initialized; initial commit `48db67a` on `master` branch |
| Git installation | ✅ Complete | Git 2.54.0 installed via winget; PATH permanently set |
| Social links | ⬜ Not set | `SOCIAL_LINKS` array is empty in `src/constants/index.ts` |
| Career insights feature | ⬜ Placeholder | DB table + API route exist; feature module not implemented |
| Deployment | ⬜ Not started | No hosting configured yet |

### One required action before the contact form works end-to-end

The `contact_submissions` table exists in Supabase but is missing the PostgreSQL `GRANT` privileges. Without them, every insert fails with `42501: permission denied`.

**Fix:** Open the Supabase SQL Editor and run `docs/fix-permissions.sql` once.

---

## Quick Reference

| Area | Detail |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict, no `any`) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 with CSS custom properties |
| Animations | Framer Motion 12 |
| Theme | Light / Dark / System — stored in `localStorage` under `adora-theme-preference` |
| Validation | Zod 3 (server-side) + regex (client-side legacy) |
| Database | Supabase PostgreSQL (`finiltvppwqamzuzzshc.supabase.co`) |
| Build output | Static pages + dynamic API routes |
| Version control | Git 2.54 — single `master` branch, 1 commit |

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
| Resume file | `public/resume/RESUME-Adora-v3.docx` |
| Profile image | `public/profile-pic.jpg` |
| Social links | None configured (`SOCIAL_LINKS = []`) |
| Site URL | Not set (`siteUrl: undefined` in constants) |

### Featured projects

| ID | Title | Type | Stack | Links |
|---|---|---|---|---|
| `stack-n-stock` | Stack n Stock | Team Project / Mobile Application | Dart, Flutter, Firebase | None — both buttons show "Coming Soon" |

### Skill categories

| Category | Skills |
|---|---|
| Programming Languages | JavaScript, TypeScript, Python, Java, C++, C# |
| Databases | PostgreSQL, Supabase |
| Web Technologies | HTML, CSS, JavaScript, TypeScript |
| Development Tools | XAMPP, Git, GitHub, Cursor |

### Education and achievements

| ID | Category | Title | Detail |
|---|---|---|---|
| `education-bscs` | Education | Bachelor of Science in Computer Science | Adamson University — Expected 2026–2027 |
| `deans-lister` | Achievements | Dean's Lister — 4 Consecutive Years | — |
| `ibm-skillsbuild` | Achievements | IBM SkillsBuild Learning Accomplishments | AI, UI/UX, Digital Literacy, IT |
| `digital-literacy` | Certificates | Digital Literacy | IBM SkillsBuild |
| `it-fundamentals` | Certificates | Information Technology Fundamentals | IBM SkillsBuild |

---

## Folder Structure

```
c:\Users\John Mark\Desktop\Adora's Website Portfolio\
│
├── .env.local                      ← Active credentials (git-ignored)
├── .env.local.example              ← Credential template (safe to commit)
├── .gitattributes                  ← LF line endings; binary file markers
├── .gitignore                      ← Ignores node_modules, .next, .env*, build
├── .vscode/
│   └── settings.json               ← Puts scripts/node-bin on PATH so npm works in PowerShell
│
├── dev.cmd                         ← Windows CMD dev server launcher
├── dev.ps1                         ← Windows PowerShell dev server launcher
├── eslint.config.mjs               ← ESLint flat config; extends next/core-web-vitals + next/typescript
├── next.config.ts                  ← Minimal Next.js config (no overrides)
├── next-env.d.ts                   ← Auto-generated Next.js type declarations
├── package.json                    ← Dependencies and scripts
├── package-lock.json
├── postcss.config.mjs              ← @tailwindcss/postcss plugin
├── README.md                       ← Quick start guide
├── tsconfig.json
│
├── docs/
│   ├── ARCHITECTURE_RULES.md       ← Canonical coding standards and folder rules
│   ├── fix-permissions.sql         ← ⚠️ Run this in Supabase to fix contact form 403 error
│   ├── PROJECT_DOCUMENTATION.md    ← This file
│   └── schema.sql                  ← Full PostgreSQL schema (enums, tables, RLS, seed data)
│
├── public/
│   ├── profile-pic.jpg             ← Used in HeroSection (priority) and AboutSection
│   └── resume/
│       └── RESUME-Adora-v3.docx    ← Resume download — linked in Navbar and AboutSection
│
├── scripts/
│   └── node-bin/
│       ├── npm.cmd                 ← Calls %ProgramFiles%\nodejs\npm.cmd directly
│       └── npx.cmd                 ← Calls %ProgramFiles%\nodejs\npx.cmd directly
│
└── src/
    │
    ├── app/                        ← Next.js App Router root
    │   ├── (portfolio)/            ← Reserved route group (empty placeholder)
    │   ├── api/
    │   │   ├── career-insights/
    │   │   │   └── route.ts        ← GET /api/career-insights
    │   │   ├── contact/
    │   │   │   └── route.ts        ← POST /api/contact
    │   │   ├── projects/
    │   │   │   └── route.ts        ← GET /api/projects
    │   │   └── skills/
    │   │       └── route.ts        ← GET /api/skills
    │   ├── contact/
    │   │   └── page.tsx            ← /contact route
    │   ├── projects/
    │   │   └── page.tsx            ← /projects route
    │   ├── skills/
    │   │   └── page.tsx            ← /skills route
    │   ├── globals.css             ← Tailwind import + CSS tokens + animations
    │   ├── layout.tsx              ← Root HTML shell: fonts, SiteShell, metadata, JSON-LD
    │   └── page.tsx                ← / homepage
    │
    ├── assets/                     ← Reserved (empty)
    │
    ├── backend/                    ← All server-side code lives here
    │   ├── database/
    │   │   ├── supabase.ts         ← Client factories: browser / server / admin
    │   │   └── types.ts            ← Raw DB row/insert types for all 4 tables
    │   ├── middleware/
    │   │   ├── error-handler.ts    ← withErrorHandler, badRequest, notFound, handleError
    │   │   └── rate-limit.ts       ← RateLimiter class; contactLimiter + readLimiter instances
    │   ├── repositories/
    │   │   ├── career-insights.repository.ts
    │   │   ├── contact.repository.ts
    │   │   ├── project.repository.ts
    │   │   └── skill.repository.ts
    │   ├── services/
    │   │   ├── career-insights.service.ts
    │   │   ├── contact.service.ts
    │   │   ├── project.service.ts
    │   │   └── skill.service.ts
    │   ├── types/
    │   │   ├── common.types.ts     ← ApiResponse, ServiceResult, PaginationParams, RateLimitEntry
    │   │   ├── contact.types.ts    ← ContactSubmission, CreateContactInput, IContactRepository
    │   │   └── project.types.ts    ← ProjectRecord, CreateProjectInput, IProjectRepository
    │   └── validators/
    │       ├── common.validator.ts ← nonEmptyString, emailSchema, safeValidate, sanitizeText
    │       └── contact.validator.ts← contactSchema (Zod), validateContactInput()
    │
    ├── components/
    │   ├── common/
    │   │   ├── Button.tsx          ← Polymorphic: <a> or <button>; primary/secondary/ghost
    │   │   ├── Card.tsx            ← <article> surface with hover-lift
    │   │   └── SectionHeader.tsx   ← Eyebrow + h2 + description
    │   ├── layout/
    │   │   ├── Footer.tsx          ← Copyright bar + SOCIAL_LINKS (currently empty)
    │   │   ├── Navbar.tsx          ← Sticky; active-route via usePathname; ThemeToggle; resume download
    │   │   ├── PageTransition.tsx  ← Framer Motion; opacity + y transition; reducedMotion aware
    │   │   └── SiteShell.tsx       ← Composes Navbar → PageTransition → Footer
    │   ├── sections/
    │   │   ├── AboutSection.tsx    ← Photo + bio + 4-year stat + resume download
    │   │   ├── ContactSection.tsx  ← CONTACT_INFO cards + form (delegates to useContactForm)
    │   │   ├── EducationSection.tsx← Alternating vertical timeline
    │   │   ├── HeroSection.tsx     ← Full-width hero with photo, name, role, CTAs
    │   │   ├── ProjectsSection.tsx ← Project cards + "Coming Soon" card
    │   │   ├── SkillsSection.tsx   ← Tab filter + skill grid (role="tablist")
    │   │   └── WhyHireMeSection.tsx← 4-column HIRE_REASONS grid
    │   ├── seo/
    │   │   └── JsonLd.tsx          ← Schema.org Person JSON-LD
    │   └── ui/
    │       └── ThemeToggle.tsx     ← L/D toggle button
    │
    ├── constants/
    │   └── index.ts                ← SITE_METADATA, NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS, HIRE_REASONS
    │
    ├── data/                       ← Empty (data lives under features/)
    │
    ├── features/
    │   ├── career-insights/        ← Placeholder: components/data/hooks/services/types all empty
    │   └── portfolio/
    │       ├── components/         ← Empty (sections live in src/components/sections/)
    │       ├── data/
    │       │   ├── projects.ts     ← readonly Project[] — 1 entry
    │       │   ├── skills.ts       ← readonly SkillCategory[] — 4 categories, 16 skills
    │       │   └── timeline.ts     ← readonly TimelineItem[] — 5 entries
    │       ├── hooks/
    │       │   ├── useContactForm.ts   ← fetch → POST /api/contact; manages form state
    │       │   └── usePortfolioData.ts ← useMemo wrapping portfolioService
    │       ├── services/
    │       │   ├── contact.service.ts  ← Legacy local-only validator (not used for form submission)
    │       │   └── portfolio.service.ts← Thin passthrough: data files → getProjects/getSkillCategories/getTimelineItems
    │       └── types/              ← Empty (types live in src/types/)
    │
    ├── hooks/
    │   └── useTheme.ts             ← localStorage + matchMedia; applies .dark to <html>
    │
    ├── lib/
    │   └── utils.ts                ← cn() — class name merger
    │
    ├── services/                   ← Empty (services live under features/)
    ├── store/                      ← Reserved for future state management
    ├── styles/
    │   └── variables.css           ← Legacy fallback CSS vars (overridden by globals.css tokens)
    └── types/
        └── index.ts                ← All shared frontend TypeScript interfaces and unions
```

---

## Pages

| Route | File | `<h1>` / Title | Sections rendered |
|---|---|---|---|
| `/` | `src/app/page.tsx` | John Mark R. Adora \| Portfolio | HeroSection, AboutSection, WhyHireMeSection, EducationSection |
| `/skills` | `src/app/skills/page.tsx` | Skills \| John Mark R. Adora | Page hero header, SkillsSection |
| `/projects` | `src/app/projects/page.tsx` | Projects \| John Mark R. Adora | Page hero header, ProjectsSection |
| `/contact` | `src/app/contact/page.tsx` | Contact \| John Mark R. Adora | Page hero header, ContactSection |

All pages share the root layout → `SiteShell` → `Navbar` + `PageTransition` + `Footer`.

Metadata title template: `%s | John Mark R. Adora` (set in `layout.tsx`). Individual pages supply only `title` and `description`.

---

## Navigation

| Label | Href | Component | Active state |
|---|---|---|---|
| Home | `/` | Next.js `<Link>` | `bg-accent text-background` |
| Skills | `/skills` | Next.js `<Link>` | `bg-accent text-background` |
| Projects | `/projects` | Next.js `<Link>` | `bg-accent text-background` |
| Contact | `/contact` | Next.js `<Link>` | `bg-accent text-background` |
| Resume | `/resume/RESUME-Adora-v3.docx` | `<a download>` | No active state |

Active link determined by `usePathname()` exact match. `aria-current="page"` set on the active link.

Mobile: ThemeToggle appears top-right next to owner name. Desktop: ThemeToggle appears at the far right of the nav links.

---

## Data Flow

### Static portfolio content (frontend only)

```
src/features/portfolio/data/
  projects.ts / skills.ts / timeline.ts
        │
        ▼
  portfolio.service.ts  (thin passthrough, no network)
        │
        ▼
  usePortfolioData.ts   (useMemo hook)
        │
        ▼
  ProjectsSection / SkillsSection / EducationSection
```

### Contact form (frontend → API → database)

```
ContactSection.tsx
  │  (delegates, no logic)
  ▼
useContactForm.ts
  │  fetch POST /api/contact  { name, email, subject, message }
  ▼
src/app/api/contact/route.ts
  │  contactLimiter.check(request)  →  429 if exceeded
  │  request.json()                 →  400 if not valid JSON
  ▼
BackendContactService.submit(body)
  │  validateContactInput(body)     →  422 if Zod fails
  ▼
ContactRepository.create(input)
  │  adminClient.from("contact_submissions").insert(...)
  ▼
Supabase PostgreSQL
  └─ contact_submissions table
```

### Backend API (Supabase reads)

```
GET /api/projects | /api/skills | /api/career-insights
  │  readLimiter.check(request)
  ▼
ProjectService / SkillService / CareerInsightsService
  ▼
ProjectRepository / SkillRepository / CareerInsightsRepository
  │  serverClient (anon key, RLS enforced)
  ▼
Supabase PostgreSQL
```

---

## Backend Architecture

### Layer responsibilities

| Layer | Path | Job |
|---|---|---|
| Route Handlers | `src/app/api/*/route.ts` | HTTP entry points — rate check, parse body, call service, return response |
| Middleware | `src/backend/middleware/` | Rate limiting and error handling helpers |
| Services | `src/backend/services/` | Business logic: call validator + repository, return `ServiceResult` |
| Validators | `src/backend/validators/` | Zod schemas, HTML sanitization, `safeValidate` helper |
| Repositories | `src/backend/repositories/` | All Supabase queries; snake_case → camelCase mapping |
| Database | `src/backend/database/` | Supabase client factories; env var validation |
| Backend types | `src/backend/types/` | Domain interfaces, `ApiResponse<T>`, `ServiceResult<T>` |

### API routes

| Method | Route | Rate limit | Query params | Response |
|---|---|---|---|---|
| `POST` | `/api/contact` | 5 / 15 min / IP | — | 201 on success, 422 on validation failure |
| `GET` | `/api/projects` | 60 / min / IP | `?featured=true` | 200 with `ProjectRecord[]` |
| `GET` | `/api/skills` | 60 / min / IP | `?grouped=true` | 200 with flat or grouped skills |
| `GET` | `/api/career-insights` | 60 / min / IP | `?category=<value>` | 200 with published insights only |

### Response envelope

```ts
// Success
{ success: true, data: T }

// Failure
{ success: false, error: string }
```

HTTP status codes used: 200, 201, 400, 404, 405, 422, 429, 500.

### Supabase clients

| Factory | Key | RLS | Use case |
|---|---|---|---|
| `createBrowserClient()` | `SUPABASE_ANON_KEY` | Enforced | React client components |
| `createServerClient()` | `SUPABASE_ANON_KEY` | Enforced | Server Components, GET routes |
| `createAdminClient()` | `SUPABASE_SERVICE_ROLE_KEY` | Bypassed | Contact form insert (trusted server code only) |

Singletons `getServerClient()` and `getAdminClient()` reuse a module-level instance per process.

### Rate limiting detail

`RateLimiter` uses a module-level `Map<ip, { count, resetAt }>`. Resets window on first request or when `resetAt` expires. IP read from `x-forwarded-for` → `x-real-ip` → `"unknown"`.

For multi-instance deployments, replace the `Map` with an Upstash Redis client — same interface, no route changes needed.

---

## Database

### Supabase project

- **Project ref:** `finiltvppwqamzuzzshc`
- **URL:** `https://finiltvppwqamzuzzshc.supabase.co`
- **Region:** (check Supabase dashboard)

### Tables

| Table | Key columns | RLS — public | RLS — anon | RLS — service_role |
|---|---|---|---|---|
| `contact_submissions` | id (uuid), name, email, subject, message, created_at | No read | INSERT only | Full access |
| `projects` | id, title, summary, type, technologies[], github_url, showcase_url, featured, created_at, updated_at | SELECT | SELECT | Full access |
| `skills` | id, category (enum), name, proficiency (1–100), created_at | SELECT | SELECT | Full access |
| `career_insights` | id, title, content, category (enum), tags[], published, created_at, updated_at | SELECT where published=true | SELECT where published=true | Full access |

### Enums

| Enum | Values |
|---|---|
| `skill_category` | `programming`, `databases`, `web`, `tools` |
| `insight_category` | `career`, `technology`, `learning`, `industry` |

### Schema files

| File | Purpose |
|---|---|
| `docs/schema.sql` | Full schema — run once in a fresh Supabase project |
| `docs/fix-permissions.sql` | Grants only — run this on the existing project to fix the 403 error |

### Contact form validation (both layers)

| Field | Server (Zod) | Client (legacy regex in contact.service.ts) |
|---|---|---|
| `name` | Required, max 100 chars, HTML stripped | Non-empty trim |
| `email` | Valid format, lowercase, HTML stripped | Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| `subject` | Required, max 200 chars, HTML stripped | Non-empty trim |
| `message` | Min 20 chars, max 5000 chars, HTML stripped | Non-empty trim |

---

## Styling System

### Color tokens (`globals.css`)

| Token | Light | Dark |
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

Dark mode activated by `.dark` class on `<html>`. `useTheme` applies/removes it.

### Custom utilities

| Class | Behavior |
|---|---|
| `.animate-fade-in` | opacity 0 → 1 over 600ms |
| `.animate-slide-up` | opacity 0 + Y 18px → visible over 700ms |
| `.hover-lift` | translateY(-4px) + accent glow box-shadow at 180ms |
| `prefers-reduced-motion` | All durations set to 0.01ms globally |

### Typography

Geist Sans (`--font-geist-sans`) and Geist Mono (`--font-geist-mono`) loaded from `next/font/google`. Registered in `@theme inline` block in `globals.css`.

### Body background

```css
background:
  linear-gradient(135deg, color-mix(in srgb, var(--accent-soft) 45%, transparent), transparent 28rem),
  var(--background);
```

---

## Page Transitions

Framer Motion `AnimatePresence mode="wait"` keyed on `usePathname()`.

| Property | Normal | Reduced motion |
|---|---|---|
| `initial` | `{ opacity: 0, y: 12 }` | `false` (skipped) |
| `animate` | `{ opacity: 1, y: 0 }` | `{ opacity: 1 }` |
| `exit` | `{ opacity: 0, y: 12 }` | `{ opacity: 0 }` |
| `duration` | `0.45s easeOut` | `0s` |

---

## TypeScript Models

### Frontend shared types (`src/types/index.ts`)

| Type | Shape |
|---|---|
| `SkillCategoryId` | `"programming" \| "databases" \| "web" \| "tools"` |
| `Skill` | `id, name, categoryId` |
| `SkillCategory` | `id, label, skills[]` |
| `Project` | `id, title, type, summary, technologies[], badges[], githubUrl?, showcaseUrl?` |
| `HireReason` | `title, description` |
| `TimelineItem` | `id, category, title, subtitle?, description?` |
| `ContactInfo` | `label, value, href?` |
| `ContactFormData` | `name, email, subject, message` |
| `ContactSubmissionResult` | `ok: boolean, message: string` |
| `ThemePreference` | `"light" \| "dark" \| "system"` |
| `ResolvedTheme` | `"light" \| "dark"` |

### Backend types (`src/backend/types/`)

| Type | Location | Shape |
|---|---|---|
| `ApiSuccess<T>` | `common.types.ts` | `{ success: true; data: T }` |
| `ApiError` | `common.types.ts` | `{ success: false; error: string }` |
| `ApiResponse<T>` | `common.types.ts` | `ApiSuccess<T> \| ApiError` |
| `ServiceResult<T>` | `common.types.ts` | `{ ok: true; data: T } \| { ok: false; error: string }` |
| `ContactSubmission` | `contact.types.ts` | `id, name, email, subject, message, createdAt` |
| `CreateContactInput` | `contact.types.ts` | `name, email, subject, message` |
| `ProjectRecord` | `project.types.ts` | `id, title, summary, type, technologies[], githubUrl, showcaseUrl, featured, createdAt, updatedAt` |

---

## Environment Variables

| Variable | Required | Used in | Purpose |
|---|---|---|---|
| `SUPABASE_URL` | Yes | `supabase.ts` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | `supabase.ts` | Public anon key (browser + server reads) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | `supabase.ts` | Admin key (server-only writes) — never expose to browser |
| `NODE_ENV` | Automatic | `error-handler.ts`, `contact.service.ts` | Controls whether real errors are surfaced to clients |

All three Supabase vars are validated at runtime via `requireEnv()`. A missing var throws immediately with a descriptive message rather than failing silently.

`.env.local` is git-ignored (covered by `.env*` in `.gitignore`).

---

## Build Output

```
Route (app)                  Size     First Load JS
○  /                         7.58 kB      110 kB
○  /contact                  2.30 kB      105 kB
○  /projects                 2.85 kB      105 kB
○  /skills                   2.27 kB      105 kB
ƒ  /api/career-insights       133 B       103 kB
ƒ  /api/contact               133 B       103 kB
ƒ  /api/projects              133 B       103 kB
ƒ  /api/skills                133 B       103 kB
```

`○` static — prerendered at build time.
`ƒ` dynamic — server-rendered on demand (API routes require env vars at runtime).

Shared JS: ~102 kB (React 19, Framer Motion 12, Geist fonts).

---

## Git Repository

| Field | Value |
|---|---|
| Status | Initialized |
| Branch | `master` |
| Commits | 1 (`48db67a` — Initial commit) |
| Remote | None configured yet |
| Files tracked | 99 (all source + docs, excluding node_modules / .next / .env.local) |
| Line endings | LF in repo (`.gitattributes` enforces this); Windows CRLF on checkout handled by Git |

---

## NPM Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

Windows launchers (`dev.ps1`, `dev.cmd`) call `npm.cmd` directly if `npm` is not on PATH.

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | ^15.3.3 | Framework |
| `react` | ^19.1.0 | UI runtime |
| `react-dom` | ^19.1.0 | DOM renderer |
| `framer-motion` | ^12.40.0 | Page transitions |
| `@supabase/supabase-js` | ^2.49.10 | Supabase database client |
| `zod` | ^3.25.67 | Runtime schema validation |
| `tailwindcss` | ^4.1.7 | CSS framework (dev) |
| `typescript` | ^5.8.3 | Type system (dev) |
| `eslint` | ^9.27.0 | Linting (dev) |
| `eslint-config-next` | ^15.3.3 | Next.js lint rules (dev) |
| `@tailwindcss/postcss` | ^4.1.7 | Tailwind PostCSS integration (dev) |

---

## Extension Points

| Goal | What to change |
|---|---|
| Add a project | Append to `src/features/portfolio/data/projects.ts` and/or insert into the Supabase `projects` table |
| Add a skill | Append to `src/features/portfolio/data/skills.ts` and/or insert into `skills` table |
| Add a timeline entry | Append to `src/features/portfolio/data/timeline.ts` |
| Add social links | Populate `SOCIAL_LINKS` in `src/constants/index.ts` — Footer renders them automatically |
| Set a live site URL | Set `siteUrl` in `SITE_METADATA` in `src/constants/index.ts` — enables OpenGraph `url` and `metadataBase` |
| Add a new page | Create `src/app/<route>/page.tsx` — inherits Navbar, Footer, and transitions automatically |
| Add a new API route | Create `src/app/api/<route>/route.ts` following the existing rate-limit → service → repo pattern |
| Implement career insights | Build out `src/features/career-insights/`; the DB table and `/api/career-insights` route are already live |
| Connect contact form to email | Add email delivery (Resend, Nodemailer) inside `BackendContactService.submit()` after the DB insert |
| Replace in-memory rate limiter | Swap the `Map` store in `RateLimiter` for an Upstash Redis client — no route changes needed |
| Add state management | Use `src/store/` with Zustand or Jotai |
| Add blog / CMS | Create `src/features/blog/` or connect a headless CMS via new API routes |
| Deploy | Push to GitHub → connect to Vercel; set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` as Vercel env vars |

---

## Known Issues and Pending Items

| Issue | Severity | Fix |
|---|---|---|
| Contact form returns 403 from Supabase | 🔴 Blocking | Run `docs/fix-permissions.sql` in Supabase SQL Editor |
| Social links not configured | 🟡 Minor | Add GitHub/LinkedIn to `SOCIAL_LINKS` in `src/constants/index.ts` |
| Site URL not set | 🟡 Minor | Set `siteUrl` in `SITE_METADATA` once a domain is confirmed |
| `features/portfolio/services/contact.service.ts` is unused for form submission | 🟢 Cosmetic | Can be kept as a client-side pre-validation utility or removed |
| `career-insights` feature is a stub | 🟢 Not blocking | DB table and API route are ready; UI needs to be built |
| No remote Git repository | 🟢 Not blocking | Push to GitHub when ready to deploy |

---

## Documentation Files

| File | Purpose |
|---|---|
| `README.md` | Quick start, npm scripts, architecture overview |
| `docs/PROJECT_DOCUMENTATION.md` | This file — full project status, structure, and implementation details |
| `docs/ARCHITECTURE_RULES.md` | Coding standards, folder rules, component/service/hook guidelines |
| `docs/schema.sql` | Complete PostgreSQL DDL — run for a fresh Supabase project |
| `docs/fix-permissions.sql` | Targeted permission grants — run on the existing project to fix the contact form 403 |
