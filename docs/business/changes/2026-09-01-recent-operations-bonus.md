# Cashello Recent Operations Bonus — 2026-09-01

## Baseline

| | SHA |
|---|---|
| Previous docs/deploy baseline | `57061e07c363e69acc449595a3966a5103fcbb47` |
| Product commit | `0c79651ebd6be0c77078e18e031587aaebe08a4a` |
| Commit message | `feat: show bonus on recent operations` |

## Summary

Authorized Home «Последние операции» rows now show a positive base-bonus indicator below the negative wallet debit amount. Guest registration bonus row (`+500 Б`) is unchanged.

## Product change

**Screens:** `LGC-SCR-025`, `LGC-SCR-026` (shared `HomeScreen` body)

**Before (authorized row):**

```
Ubet                     −5 000 ₸
+77078789911
```

**After:**

```
Ubet                     −5 000 ₸
+77078789911             +100 Б
```

**Examples at current 2% base rate:**

| Operation amount | Bonus display |
|---|---:|
| 5 000 ₸ | +100 Б |
| 20 000 ₸ | +400 Б |
| 1 500 ₸ | +30 Б |

Navigation, PAY-002 prefill, and action inventory are unchanged.

## Owner decision (partial)

**Owner wording (2026-09-01):** «+2% бонуса у нас базовый пока»

**Documented as:** `OWNER_APPROVED_CURRENT_BASE_RATE: 2%`

**Meaning:**

- current Cashello base bonus rate = 2%;
- this is the current baseline;
- owner may change it later.

**Explicitly NOT decided by this statement:**

- eligibility rules
- production rounding policy (`Math.round` in code is prototype display only)
- settlement timing
- reversal/refund behavior
- expiration
- limits
- provider-specific exceptions
- bonus withdrawal rules
- accounting treatment
- MFO commission calculation (still part of `Q-PAY-004`)

## Owner question match

**Matched Q-*:** `Q-PAY-004` (partial only — question also covers MFO commissions and full calculation policy)

**Status changed:** NO — remains `UNANSWERED` because the question is broader than base rate alone.

## Guest Home

`HOME-001` registration bonus row (`Бонус за регистрацию` / `+500 Б`) — **unchanged** and separate from authorized recent-operation bonus display.

## Figma

**Figma was not modified.** Runtime authorized Home is ahead of Figma frame `7:5` for recent-operation bonus values.

## Reconciliation artifacts

- Screenshots recaptured: `LGC-SCR-025__authorized-home.png`, `LGC-SCR-026__history-filter-link.png`, `LGC-SCR-025__recent-ops-scrolled.png`
- Manifests/docs updated under `docs/business/discovery/`
