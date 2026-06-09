# Adora Portfolio

Personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. The codebase follows a feature-based architecture with clear separation between UI, hooks, services, and data.

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
| `npm run start`| Run production server      |
| `npm run lint` | Run ESLint               |

## Documentation

| Document | Description |
| -------- | ----------- |
| [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md) | **Full project guide** — structure, rules, files, and workflows (download-friendly) |
| [docs/ARCHITECTURE_RULES.md](docs/ARCHITECTURE_RULES.md) | Canonical coding standards and folder rules |

## Architecture

Project structure and coding standards are documented in [docs/ARCHITECTURE_RULES.md](docs/ARCHITECTURE_RULES.md).

Key directories under `src/`:

- `app/` — Next.js App Router pages and layouts
- `components/` — Shared UI (`common`, `layout`, `sections`, `ui`)
- `features/` — Feature modules (`career-insights`, `portfolio`)
- `services/`, `hooks/`, `data/`, `types/` — Business logic and data layers

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
