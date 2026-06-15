# Architecture

## Monorepo layout

```
apps/
  api/      Express + TypeScript backend (modular monolith)
  web/      Next.js + TypeScript web app
  mobile/   Expo + React Native + TypeScript app

packages/
  shared/   Cross-app types and validation schemas
  stellar/  Scaffold for the future Stellar payment integration
```

`apps/*` are deployable applications. `packages/*` are libraries consumed
by one or more apps via npm workspaces (`@discoverly/shared`,
`@discoverly/stellar`).

## Backend: modular monolith

`apps/api` is a single deployable Express service, organized around
business modules rather than technical layers:

```
apps/api/src/
  modules/
    auth/       # registration, login, JWT issuance, auth middleware
      controllers/
      services/
      repositories/
      validators/
      routes/
      middleware/
      types/
      tests/
    users/      # user persistence, supports auth
      repositories/
      services/
      types/
  shared/
    config/     # environment validation (zod)
    database/   # MongoDB connection
    errors/     # AppError
    logger/     # JSON logger
    middleware/ # error handler, 404 handler
    types/      # shared Express types
  app.ts        # express app wiring
  server.ts     # process entrypoint
```

**Module ownership**: each module owns its controllers, services,
repositories, validators, routes, types, and tests. Business logic lives
inside modules, never in `shared/`. `shared/` contains only cross-cutting
infrastructure (config, database, logging, error handling).

This structure is intentionally one codebase, one deployment artifact,
one runtime, and one database (MongoDB). There are no microservices,
message brokers, or separate deployable services. Future business
modules (e.g. `restaurants`, `foods`, `orders`, `payments`) can be added
as new folders under `modules/` following the same pattern, without
restructuring existing code.

## Shared package (`@discoverly/shared`)

Holds only genuinely shared concerns used by both `apps/api` and
`apps/web`:

- `types/` — shared TypeScript types (e.g. `AuthUser`, `AuthResponse`)
- `validation/` — zod schemas for request/form validation (e.g.
  `registerSchema`, `loginSchema`)

This keeps validation rules consistent between the API and the web
client without duplicating logic.

## Stellar package (`@discoverly/stellar`)

A scaffold only — placeholder types and interfaces for the future Stellar
payment integration. It compiles successfully but contains no blockchain
functionality. When Stellar integration work begins, it should live here
to keep blockchain concerns isolated from core application logic.

## Web app

`apps/web` is a Next.js (App Router) application. Currently it implements
only authentication:

- `/login` and `/register` pages
- `lib/auth-context.tsx` — client-side auth state (user, token), backed
  by `localStorage`
- `lib/api-client.ts` — typed client for the auth API
- `components/` — reusable form components

## Mobile app

`apps/mobile` is an Expo + React Native + TypeScript project containing
only the foundation: folder structure (`components`, `screens`,
`navigation`, `hooks`, `services`, `utils`, `assets`), linting,
formatting, and testing setup. No screens or authentication are
implemented yet.
