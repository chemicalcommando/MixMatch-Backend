# Testing Guide

## Running tests

```bash
# all workspaces
npm run test --workspaces --if-present

# a single workspace
npm run test -w @discoverly/api
npm run test -w @discoverly/web
npm run test -w @discoverly/mobile
```

All test suites run immediately after `npm install` — no external
services (databases, etc.) are required.

## Test structure

### `apps/api`

- Framework: [Vitest](https://vitest.dev/) + [Supertest](https://github.com/ladjs/supertest)
- Database: [`mongodb-memory-server`](https://github.com/typegoose/mongodb-memory-server)
  spins up an in-memory MongoDB instance for the test run — no local
  MongoDB needed.
- Tests live alongside the module they cover, e.g.
  `src/modules/auth/tests/auth.test.ts`.
- Covers: successful registration, duplicate email, invalid input,
  successful login, invalid password, and non-existent account.

### `apps/web`

- Framework: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (jsdom)
- Tests live in `__tests__/`.
- Covers: login/register pages render correctly and show validation
  errors for invalid input.

### `apps/mobile`

- Framework: [Jest](https://jestjs.io/) via `jest-expo` +
  `@testing-library/react-native`
- Tests live in `__tests__/`.
- Covers: a basic render test verifying the project's test
  infrastructure works. No screen or feature tests exist yet because no
  screens are implemented.

## CI expectations

Each package is validated independently in `.github/workflows/`:

| Workflow         | Steps                                |
| ----------------- | ------------------------------------- |
| `shared.yml`      | install, lint, build (`shared`, `stellar`) |
| `api.yml`         | install, build shared, lint, test, build |
| `web.yml`         | install, build shared, lint, test, build |
| `mobile.yml`      | install, lint, test                  |

A failing lint, test, or build step fails the corresponding workflow,
which blocks merging the pull request.
