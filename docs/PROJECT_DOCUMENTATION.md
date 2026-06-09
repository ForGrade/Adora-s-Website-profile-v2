# Adora Website Portfolio — Project Documentation

**Project name:** `adora-portfolio`
**Owner:** John Mark R. Adora
**Project type:** Personal software developer portfolio (frontend-only)
**Last documented:** June 2026
**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion

---

## Project Status

| Area | Status | Notes |
|---|---|---|
| Multi-page frontend | ✅ Complete | Routes: `/`, `/skills`, `/projects`, `/contact`, `/case-studies` |
| Shared layout | ✅ Complete | Navbar, Footer, PageTransition via SiteShell |
| Active nav highlighting | ✅ Complete | `usePathname()` drives active link styling |
| Page transitions | ✅ Complete | Framer Motion; respects `prefers-reduced-motion` |
| Dark / light / system theme | ✅ Complete | `localStorage` under `adora-theme-preference` |
| SEO metadata | ✅ Complete | Per-page metadata + OpenGraph + Twitter card + JSON-LD |
| Contact form | ✅ Complete | Client validation → `mailto:` (no server or database) |
| Portfolio content | ✅ Complete | Static TypeScript data files |
| Backend / database | ⬜ Removed | No API routes, Supabase, or env vars required |
| Social links | ⬜ Not set | `SOCIAL_LINKS` array is empty in `src/constants/index.ts` |
| Deployment | ⬜ Not started | No hosting configured yet |

---

## Quick Reference

| Area | Detail |
|---|---|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict, no `any`) |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 with CSS custom properties |
| Animations | Framer Motion 12 |
| Theme | Light / Dark / System — `localStorage` |
| Data | Static TypeScript modules |
| Environment variables | None required |
| Build output | Static pages (no API routes) |

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

### Content files

| Content | File |
|---|---|
| Projects | `src/features/portfolio/data/projects.ts` |
| Skills | `src/features/portfolio/data/skills.ts` |
| Education / certs | `src/features/portfolio/data/timeline.ts` |
| Contact info | `src/constants/index.ts` |
| Case studies | `src/app/case-studies/page.tsx` |

---

## Folder Structure

```
src/
├── app/                        ← Next.js App Router pages
│   ├── contact/page.tsx
│   ├── projects/page.tsx
│   ├── skills/page.tsx
│   ├── case-studies/page.tsx
│   ├── page.tsx                ← Homepage
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── common/                 ← Button, Card, SectionHeader
│   ├── layout/                 ← Navbar, Footer, SiteShell, PageTransition
│   ├── sections/               ← Hero, About, Projects, Skills, Contact, etc.
│   ├── seo/                    ← JsonLd
│   └── ui/                     ← ThemeToggle, elite UI primitives
├── constants/index.ts          ← Site metadata, nav, contact info
├── features/portfolio/
│   ├── data/                   ← projects.ts, skills.ts, timeline.ts
│   ├── hooks/                  ← useContactForm, usePortfolioData
│   └── services/               ← contact.service.ts, portfolio.service.ts
├── hooks/useTheme.ts           ← Theme via localStorage
├── lib/utils.ts
├── styles/variables.css
└── types/index.ts
```

---

## Pages

| Route | File | Sections |
|---|---|---|
| `/` | `src/app/page.tsx` | Hero, About, Why Hire Me, Education |
| `/skills` | `src/app/skills/page.tsx` | SkillsSection |
| `/projects` | `src/app/projects/page.tsx` | ProjectsSection |
| `/contact` | `src/app/contact/page.tsx` | ContactSection |
| `/case-studies` | `src/app/case-studies/page.tsx` | Static case study cards |

---

## Data Flow

### Portfolio content (static)

```
src/features/portfolio/data/
  projects.ts / skills.ts / timeline.ts
        │
        ▼
  portfolio.service.ts
        │
        ▼
  usePortfolioData.ts
        │
        ▼
  ProjectsSection / SkillsSection / EducationSection
```

### Contact form (client-only)

```
ContactSection.tsx
        │
        ▼
useContactForm.ts
        │
        ▼
contact.service.ts
  ├── validate fields locally
  └── window.location.assign(mailto:...)
```

The form validates name, email, subject, and message in the browser, then opens the visitor's email app with the message pre-filled. No server, database, or third-party service is required.

### Theme preference

```
ThemeToggle → useTheme.ts → localStorage + matchMedia → .dark on <html>
```

---

## TypeScript Models (`src/types/index.ts`)

| Type | Purpose |
|---|---|
| `Skill`, `SkillCategory` | Skills grid and filters |
| `Project` | Project cards |
| `TimelineItem` | Education / achievements timeline |
| `ContactFormData` | Contact form fields |
| `ContactSubmissionResult` | Form success/error message |
| `ThemePreference` | `"light" \| "dark" \| "system"` |

---

## Extension Points

| Goal | What to change |
|---|---|
| Add a project | Append to `src/features/portfolio/data/projects.ts` |
| Add a skill | Append to `src/features/portfolio/data/skills.ts` |
| Add a timeline entry | Append to `src/features/portfolio/data/timeline.ts` |
| Add social links | Populate `SOCIAL_LINKS` in `src/constants/index.ts` |
| Set a live site URL | Set `siteUrl` in `SITE_METADATA` |
| Add a new page | Create `src/app/<route>/page.tsx` |
| Add career insights | Create static data under `src/features/career-insights/data/` |
| Deploy | Push to GitHub → Vercel or Netlify (no env vars needed) |

---

## NPM Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |

---

## Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | ^15.3.3 | Framework |
| `react` | ^19.1.0 | UI runtime |
| `react-dom` | ^19.1.0 | DOM renderer |
| `framer-motion` | ^12.40.0 | Page transitions and animations |
| `tailwindcss` | ^4.1.7 | CSS framework (dev) |
| `typescript` | ^5.8.3 | Type system (dev) |
| `vitest` | ^3.1.4 | Unit tests (dev) |

---

## Documentation Files

| File | Purpose |
|---|---|
| `README.md` | Quick start and frontend-only overview |
| `docs/PROJECT_DOCUMENTATION.md` | This file |
| `docs/ARCHITECTURE_RULES.md` | Coding standards and folder rules |
