# @discoverly/web

Next.js (App Router) + TypeScript web client providing authentication
(login and account creation) against `@discoverly/api`.

## Development

```bash
cp .env.example .env
npm run dev -w @discoverly/web
```

Set `NEXT_PUBLIC_API_URL` to the URL of the running API (defaults to
`http://localhost:5000`).

## Pages

- `/login` — log in with an existing account
- `/register` — create a new account

Auth state (user + token) is managed via `AuthProvider`
(`lib/auth-context.tsx`) and persisted to `localStorage`.

## Testing

```bash
npm run test -w @discoverly/web
```
