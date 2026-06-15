# @discoverly/api

Express + TypeScript backend, structured as a modular monolith.

## Structure

```
src/
  modules/
    auth/      # registration, login, JWT issuance, auth middleware
    users/     # user persistence (Mongoose model + repository)
  shared/
    config/    # environment validation
    database/  # MongoDB connection helper
    errors/    # AppError
    logger/    # JSON logger
    middleware/# error handler, 404 handler
    types/     # shared Express types
  app.ts       # express app wiring
  server.ts    # process entrypoint
```

Each module owns its controllers, services, repositories, validators, routes,
types, and tests. Cross-cutting infrastructure lives under `src/shared`.

## Development

```bash
cp .env.example .env
npm run dev -w @discoverly/api
```

## Testing

Tests use Vitest, Supertest, and an in-memory MongoDB instance
(`mongodb-memory-server`), so no external database is required:

```bash
npm run test -w @discoverly/api
```

## API

| Method | Path             | Auth | Description              |
| ------ | ---------------- | ---- | ------------------------ |
| POST   | `/api/auth/register` | No   | Create an account         |
| POST   | `/api/auth/login`    | No   | Log in and receive a JWT  |
| GET    | `/api/auth/me`       | Yes  | Get the current user      |
| GET    | `/api/health`        | No   | Health check               |
