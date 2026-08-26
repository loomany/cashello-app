import { canonicalDemoState, FOUNDATION_SIMULATION } from '@/mocks/canonicalDemo';
import type { MockSnapshot, Transaction, WalletAccount } from '@/types/domain';

function cloneSnapshot(state: MockSnapshot): MockSnapshot {
  return structuredClone(state);
}

export function createCanonicalSnapshot(): MockSnapshot {
  return cloneSnapshot(canonicalDemoState);
}

export function applyFoundationPayment(state: MockSnapshot, nowIso: string): MockSnapshot {
  const next = cloneSnapshot(state);
  next.accounts = next.accounts.map((account: WalletAccount) =>
    account.id === 'acc_kzt'
      ? { ...account, availableMinor: account.availableMinor - FOUNDATION_SIMULATION.kztDebitMinor }
      : account,
  );
  next.bonus = {
    ...next.bonus,
    balanceMinor: next.bonus.balanceMinor + FOUNDATION_SIMULATION.cashbackCreditMinor,
  };

  const payment: Transaction = {
    id: `txn_sim_${nowIso}`,
    type: 'service_payment',
    status: 'success',
    amountMinor: -FOUNDATION_SIMULATION.kztDebitMinor,
    currency: 'KZT',
    title: 'Mobile payment',
    subtitle: FOUNDATION_SIMULATION.serviceName,
    createdAt: nowIso,
    accountId: 'acc_kzt',
  };
  const cashback: Transaction = {
    id: `txn_sim_cb_${nowIso}`,
    type: 'cashback',
    status: 'success',
    amountMinor: FOUNDATION_SIMULATION.cashbackCreditMinor,
    currency: 'BONUS',
    title: 'Cashback',
    subtitle: FOUNDATION_SIMULATION.serviceName,
    createdAt: nowIso,
    accountId: 'acc_bonus',
  };

  next.transactions = [payment, cashback, ...next.transactions];
  return next;
}
