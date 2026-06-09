# Adora Portfolio

Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. The site is **fully frontend** — no backend, database, or environment variables required.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### If `npm` fails in PowerShell

**`npm is not recognized`** — Close and reopen the terminal (or restart Cursor). Node lives at `C:\Program Files\nodejs`.

**`npm.ps1 cannot be loaded` (execution policy)** — PowerShell blocks Node’s `npm.ps1`. This repo fixes that by putting [`scripts/node-bin/npm.cmd`](scripts/node-bin/npm.cmd) first on `PATH` in [`.vscode/settings.json`](.vscode/settings.json). Open a **new** terminal in this workspace, then run `npm run dev`.

If it still fails, use either launcher (they call `npm.cmd` directly):

```powershell
.\dev.ps1
```

```powershell
.\dev.cmd
```

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Run production server    |
| `npm run lint` | Run ESLint               |
| `npm run test` | Run Vitest tests         |

## How it works (frontend-only)

| Feature | How data is handled |
| ------- | ------------------- |
| Projects, skills, education | Static TypeScript files in `src/features/portfolio/data/` |
| Contact form | Client-side validation → opens email app via `mailto:` |
| Theme (light/dark/system) | Saved in `localStorage` |
| Case studies | Static content in `src/app/case-studies/page.tsx` |

### Updating content

Edit these files — no server or database needed:

- **Projects** — `src/features/portfolio/data/projects.ts`
- **Skills** — `src/features/portfolio/data/skills.ts`
- **Education / certs** — `src/features/portfolio/data/timeline.ts`
- **Contact info** — `src/constants/index.ts`
- **Site metadata / nav** — `src/constants/index.ts`

## Documentation

| Document | Description |
| -------- | ----------- |
| [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md) | Full project guide — structure, data flow, and workflows |
| [docs/ARCHITECTURE_RULES.md](docs/ARCHITECTURE_RULES.md) | Coding standards and folder rules |

## Architecture

Key directories under `src/`:

- `app/` — Next.js App Router pages and layouts
- `components/` — Shared UI (`common`, `layout`, `sections`, `ui`)
- `features/portfolio/` — Data, services, and hooks for portfolio content
- `hooks/` — Shared hooks (e.g. theme)
- `constants/` — Site metadata, nav links, contact info

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion 12
