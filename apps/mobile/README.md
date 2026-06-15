# @discoverly/mobile

Expo + React Native + TypeScript foundation for the customer mobile app.

This package currently contains **only project setup** — no screens,
navigation flows, or authentication. The folder structure below is in
place so feature work can be added without restructuring:

```
src/
  components/   # shared UI components
  screens/      # app screens
  navigation/    # navigators
  hooks/        # custom hooks
  services/     # API/service clients
  utils/        # helpers
  assets/       # images, fonts, etc.
```

## Development

```bash
cp .env.example .env
npm run start -w @discoverly/mobile
```

## Testing

```bash
npm run test -w @discoverly/mobile
```
