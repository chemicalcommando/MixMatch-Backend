# Environment Setup

Each app has its own `.env.example`. Copy it to `.env` in the same
directory and fill in values for local development.

## `apps/api/.env`

| Variable          | Description                                  | Default (example)                          |
| ----------------- | --------------------------------------------- | ------------------------------------------- |
| `NODE_ENV`        | `development`, `test`, or `production`       | `development`                                |
| `PORT`            | Port the API listens on                       | `5000`                                       |
| `MONGODB_URI`     | MongoDB connection string                     | `mongodb://localhost:27017/discoverly`       |
| `JWT_SECRET`      | Secret used to sign auth tokens               | `replace_me`                                 |
| `JWT_EXPIRES_IN`  | Auth token expiry (jsonwebtoken duration format) | `7d`                                       |

Tests do **not** read these values from `.env` — they run against an
in-memory MongoDB instance with fixed test values, so the test suite
works immediately after `npm install`.

## `apps/web/.env`

| Variable               | Description                       | Default (example)        |
| ---------------------- | ---------------------------------- | -------------------------- |
| `NEXT_PUBLIC_API_URL`  | Base URL of `apps/api`            | `http://localhost:5000`    |

## `apps/mobile/.env`

| Variable               | Description                       | Default (example)        |
| ---------------------- | ---------------------------------- | -------------------------- |
| `EXPO_PUBLIC_API_URL`  | Base URL of `apps/api`            | `http://localhost:5000`    |

## Secrets handling

- Never commit `.env` files — they are git-ignored.
- `JWT_SECRET` must be a strong, unique value outside of local
  development; treat it as a secret in any deployed environment.
- CI does not require real secrets: the API test suite uses an in-memory
  database and a fixed test JWT secret defined in
  `apps/api/vitest.config.ts`.
