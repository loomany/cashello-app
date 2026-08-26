import { applyFoundationPayment, createCanonicalSnapshot } from '@/state/actions';

describe('mock state actions', () => {
  it('starts from canonical demo balances', () => {
    const snap = createCanonicalSnapshot();
    const kzt = snap.accounts.find((account) => account.currency === 'KZT');
    expect(kzt?.availableMinor).toBe(115_000_000);
    expect(snap.bonus.balanceMinor).toBe(1_245_000);
    expect(snap.user.verificationStatus).toBe('FULL');
    expect(snap.transactions.length).toBeGreaterThan(0);
  });

  it('simulates a payment by changing balance, history, and cashback', () => {
    const before = createCanonicalSnapshot();
    const after = applyFoundationPayment(before, '2026-08-17T12:00:00.000Z');
    const kztBefore = before.accounts.find((account) => account.currency === 'KZT');
    const kztAfter = after.accounts.find((account) => account.currency === 'KZT');

    expect(kztAfter?.availableMinor).toBe((kztBefore?.availableMinor ?? 0) - 450_000);
    expect(after.bonus.balanceMinor).toBe(before.bonus.balanceMinor + 9_000);
    expect(after.transactions[0]?.type).toBe('service_payment');
    expect(after.transactions[1]?.type).toBe('cashback');
    expect(after.transactions.length).toBe(before.transactions.length + 2);
  });

  it('reset returns the same canonical seed', () => {
    const mutated = applyFoundationPayment(createCanonicalSnapshot(), '2026-08-17T12:00:00.000Z');
    const reset = createCanonicalSnapshot();
    expect(reset.accounts).toEqual(createCanonicalSnapshot().accounts);
    expect(mutated.accounts).not.toEqual(reset.accounts);
  });
});
