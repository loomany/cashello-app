# Cashello Home Payment Navigation — 2026-09-01

## Baseline

| | SHA |
|---|---|
| Previous synced baseline | `dbb0acd38228321e7e3dd0132974bbcf294a878c` |
| Product commit | `86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134` |
| Commit message | `feat: refine home payment navigation` |

## Summary

Owner-guided visual pass VIS2 replaced the Home «Последние операции» header with a segmented payments plaque (`Последние | Все | История`), reduced authorized recent-operation preview to 4 rows, wired segment navigation, and retired logical screen `LGC-SCR-026`.

## Owner-guided changes

| ID | Change |
|---|---|
| VIS2-001 | Replace section heading + «См. все» with segmented plaque |
| VIS2-002 | Remove heading «Платежи» |
| VIS2-003 | Authorized «Последние»: 8 → 4 recent rows |
| VIS2-004 | Authorized «Все» → `/legacy/payment`; «История» → `/legacy/history` |
| VIS2-005 | Guest «Все» / «История» → `/legacy/auth?qaStep=iin` |
| Alias cleanup | `/legacy/home?historyLink=filter` still loads Home but no longer creates `LGC-SCR-026` |

## LGC-SCR-026

**Status:** RETIRED_AND_MERGED_WITH_LGC-SCR-025

**Reason:** After product SHA `86e9d3b`, alias route has identical UI, navigation, state, and runtime screen identity to canonical `/legacy/home`.

## Explicitly unchanged

- 2% base bonus display on authorized recent-operation rows
- Guest registration bonus row (`+500 Б`)
- Recent operation row → PAY-002 phone + amount prefill
- Business economics, commissions, limits, KYC — no owner decisions

## Figma

**Figma was not modified.** Runtime Home is ahead of Figma frame `7:5` for segmented navigation and 4-row preview.

## Discovery reconciliation

- Logical screens: 94 → 93
- Actions: 443 → 425 (retired `ACT-LGC-SCR-026-*` and unreachable recent rows 5–8)
- Screenshots removed: `LGC-SCR-026__history-filter-link.png`, `LGC-SCR-025__recent-ops-scrolled.png`
- Screenshots replaced: `HOME-001__guest-home.png`, `LGC-SCR-025__authorized-home.png`
