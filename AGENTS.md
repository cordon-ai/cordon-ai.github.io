# Repository Guidelines

## Project Structure & Module Organization
- `index.tsx` bootstraps React (React 19) and renders `App.tsx` as the single-page shell.
- UI components live in `components/` (hero, architecture, features, demo visuals). Keep shared presentational pieces here and prefer composition over deep prop drilling.
- Client-side services and API helpers belong in `services/` (e.g., `services/geminiService.ts` for Gemini calls) with related TypeScript contracts in `types.ts`.
- Static output from `vite build` lands in `dist/`; avoid manual edits. Public entry HTML is `index.html`.

## Build, Test, and Development Commands
- Install deps: `npm install` (Node 18+ recommended).
- Local dev server with HMR: `npm run dev`.
- Production bundle: `npm run build` (outputs to `dist/`).
- Preview the production build: `npm run preview`.
- Environment: set `GEMINI_API_KEY` in `.env.local` for Gemini-powered flows.

## Coding Style & Naming Conventions
- Language: TypeScript + React. Use functional components with hooks; avoid class components.
- Formatting: 2-space indentation, single quotes, and trailing commas where sensible; follow existing JSX className patterns (Tailwind-style utility stacks).
- Naming: PascalCase for components/files in `components/`, camelCase for functions/variables, SCREAMING_SNAKE_CASE for env keys.
- Imports: prefer relative paths from the file root; group React/library imports above local modules.

## Testing Guidelines
- No automated test harness is present yet. When adding tests, use Vitest + React Testing Library, co-locating files as `*.test.tsx` next to the source.
- Validate interactive features manually via `npm run dev` and `npm run preview` before publishing; check router flows and animated components for regressions.

## Commit & Pull Request Guidelines
- Commits: keep messages imperative and concise (`add hero copy`, `fix orb hover jitter`). Conventional Commit prefixes are welcome when meaningful (`feat:`, `fix:`).
- Pull requests: include a short summary, screenshots/GIFs for UI changes, and note any config/env expectations (e.g., `GEMINI_API_KEY`). Link issues if applicable and call out risk areas or manual test notes.

## Security & Configuration Tips
- Never commit `.env.local` or API keys; add new secrets to `.env.local` and document usage.
- External API interactions (Gemini) should centralize in `services/` with minimal surface area and defensive error handling before UI consumption.
