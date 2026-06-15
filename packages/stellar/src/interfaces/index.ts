import type { StellarConfig } from '../types/index.js';

/**
 * Placeholder interface for the future Stellar payment client.
 * Implementations are intentionally out of scope for this foundation.
 */
export interface StellarClient {
  readonly config: StellarConfig;
}
