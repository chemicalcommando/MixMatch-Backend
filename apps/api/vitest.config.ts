import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    testTimeout: 30000,
    hookTimeout: 30000,
    env: {
      NODE_ENV: 'test',
      MONGODB_URI: 'mongodb://localhost:27017/discoverly_test',
      JWT_SECRET: 'test_secret',
      JWT_EXPIRES_IN: '7d',
    },
  },
});
