# Discoverly — Hackathon Foundation

This repository is the foundation monorepo for Discoverly: a swipe-first
food discovery and ordering platform with Stellar-powered checkout. It
provides a clean, tested starting point with **authentication** working
end-to-end, ready for hackathon participants to build on.

Only the foundational setup and authentication functionality are
implemented. Everything else (discovery, ordering, payments, Stellar
integration, restaurant dashboards, etc.) is intentionally out of scope
for now — see [docs/architecture.md](docs/architecture.md) for how the
codebase is structured to support those features later.

---

## Repository Structure

```
apps/
  api/      # Express + TypeScript modular monolith (auth API)
  web/      # Next.js + TypeScript web app (login / create account)
  mobile/   # Expo + React Native + TypeScript foundation

packages/
  shared/   # Shared types & validation schemas (zod)
  stellar/  # Placeholder scaffold for future Stellar integration

.github/workflows/  # CI for each package
docs/                # Architecture, environment, testing, contributing
```

Each package's own README has package-specific details:
[apps/api](apps/api/README.md), [apps/web](apps/web/README.md),
[apps/mobile](apps/mobile/README.md).

---

## Local Development Setup

### Requirements

- Node.js 20+
- npm 10+
- MongoDB (only required to run the API outside of tests — tests use an
  in-memory database)

### Install

From the repository root:

```bash
npm install
```

This installs dependencies for every workspace (`apps/*`, `packages/*`).

### Build shared packages

`apps/api` and `apps/web` depend on `@discoverly/shared`. Build it once
after installing (and whenever you change it):

```bash
npm run build -w @discoverly/shared
```

---

## Running Applications

### API (`apps/api`)

```bash
cp apps/api/.env.example apps/api/.env
npm run dev -w @discoverly/api
```

The API listens on `http://localhost:5000` by default and exposes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (requires `Authorization: Bearer <token>`)
- `GET /api/health`

### Web (`apps/web`)

```bash
cp apps/web/.env.example apps/web/.env
npm run dev -w @discoverly/web
```

Visit `http://localhost:3000/login` or `http://localhost:3000/register`.

### Mobile (`apps/mobile`)

```bash
cp apps/mobile/.env.example apps/mobile/.env
npm run start -w @discoverly/mobile
```

This launches Expo. The mobile app currently contains only the project
foundation (no screens yet).

---

## Running Tests

```bash
# everything
npm run test --workspaces --if-present

# individually
npm run test -w @discoverly/api
npm run test -w @discoverly/web
npm run test -w @discoverly/mobile
```

See [docs/testing.md](docs/testing.md) for details.

---

## Documentation

- [Architecture](docs/architecture.md) — modular monolith, package boundaries, conventions
- [Environment Setup](docs/environment.md) — required environment variables
- [Testing Guide](docs/testing.md) — running and writing tests, CI expectations
- [Contributor Guide](docs/contributing.md) — coding standards and workflow

---

## License

License information will be added before release.
