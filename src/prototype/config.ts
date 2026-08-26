export const PROTOTYPE_MODE = true;

export const PROTOTYPE_STORAGE_KEY = '@paydala/mock-state';

export const prototypeBuild = {
  appVersion: '0.1.0-prototype',
  checkpointId: 'CP-RECON-010',
  taskId: 'RECON-010',
  environment: 'DEMO',
  /** Balances, operations, and payment states are simulated. No real money movement. */
  realMoney: false,
  realBackend: false,
} as const;

export type PrototypeStatus =
  | 'foundation'
  | 'draft'
  | 'in_progress'
  | 'ready_for_review'
  | 'approved';
