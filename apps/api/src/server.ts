import { createApp } from './app.js';
import { env } from './shared/config/env.js';
import { connectDatabase } from './shared/database/connection.js';
import { logger } from './shared/logger/logger.js';

async function main(): Promise<void> {
  await connectDatabase();

  const app = createApp();

  app.listen(env.PORT, () => {
    logger.info(`API server listening on port ${env.PORT}`);
  });
}

main().catch((error) => {
  logger.error('Failed to start server', { error: error instanceof Error ? error.message : error });
  process.exit(1);
});
