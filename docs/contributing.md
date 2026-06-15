# Contributor Guide

## Project structure

This is an npm workspaces monorepo:

- `apps/api` — Express + TypeScript backend (modular monolith)
- `apps/web` — Next.js + TypeScript web app
- `apps/mobile` — Expo + React Native + TypeScript app
- `packages/shared` — shared types and validation schemas
- `packages/stellar` — scaffold for future Stellar integration

See [architecture.md](architecture.md) for details on how the backend is
organized into modules.

## Coding standards

- **TypeScript strict mode** is enabled across all packages — avoid `any`
  and unnecessary type assertions.
- **ESLint** and **Prettier** are configured per package; run
  `npm run lint -w <package>` and `npm run format` before committing.
- **Naming**: files use kebab-case (e.g. `auth.service.ts`,
  `auth.controller.ts`); React components use PascalCase.
- **Validation**: request/form validation schemas that are needed by both
  the API and the web app belong in `@discoverly/shared`. API-only or
  web-only validation stays local to that app.
- **Module boundaries** (backend): business logic belongs inside
  `apps/api/src/modules/<module>`. Cross-cutting infrastructure
  (config, database, logging, error handling) belongs in
  `apps/api/src/shared`. Do not put business logic in `shared/`.

## Development workflow

1. Install dependencies: `npm install`
2. Build `@discoverly/shared`: `npm run build -w @discoverly/shared`
3. Run the app(s) you're working on (see root [README](../README.md))
4. Write or update tests alongside your change
5. Run `npm run lint` and `npm run test` for the affected workspace(s)
6. Open a pull request — CI runs lint, test, and build for each affected
   package

## Adding a new backend module

When adding new business functionality to `apps/api`, create a new folder
under `src/modules/<name>/` following the same shape as `modules/auth`
(`controllers/`, `services/`, `repositories/`, `validators/`, `routes/`,
`types/`, `tests/`), and mount its router in `src/app.ts`. Avoid adding
business logic to `src/shared/`.

## Contribution expectations

- Keep changes scoped — avoid mixing unrelated changes in one PR.
- Add tests for new behavior; CI will fail on lint, test, or build
  errors.
- Update relevant package README/docs when you change setup or
  developer-facing behavior.
