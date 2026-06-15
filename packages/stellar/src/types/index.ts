/**
 * Placeholder type definitions for the future Stellar payment integration.
 * No blockchain functionality is implemented yet.
 */
export type StellarNetwork = 'testnet' | 'public';

export interface StellarConfig {
  network: StellarNetwork;
  horizonUrl: string;
}
