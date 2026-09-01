# Cashello Director Visual Delta — 2026-09-01

## Baseline

| | SHA |
|---|---|
| Pre-change (pre-design) | `2359692f3ded08fdea66b5ea260f485e894dfd7b` |
| Product commit | `597754364ada9dc1f51f62fe86b41a2bc0b24e4b` |
| Commit message | `feat: update Cashello home recent operations flow` |

## Summary

Owner-directed visual pass replaced Home **Сервисы** + **История** sections with **Последние операции** on guest and authorized Home. Documentation and targeted runtime screenshots were reconciled in a follow-up pass (this record). **No Figma changes.** **No production business rules were decided.**

## DIR ledger

### DIR-001 — Authorized Home recent operations

- **Screens:** LGC-SCR-025 (HOME-002), LGC-SCR-026 (filter link variant)
- **Routes:** `/legacy/home`, `/legacy/home?historyLink=filter`
- **Before:** Services preview + History preview (4 rows + action sheet entry)
- **After:** «Последние операции» with 8 mock top-up rows from payment catalog
- **Navigation:** Row tap → `/legacy/payment/{id}?phone=&amount=` (prefill)
- **Business impact:** None — `CURRENT_MOCK_BEHAVIOR` preview data only
- **Docs impact:** Actions 06–11 replaced; new actions `ACT-LGC-SCR-025-18`…`025-25`; screenshots recaptured

### DIR-002 — routing.test.ts relocation

- **Before:** `src/app/routing.test.ts` crashed Expo web (`describe is not defined`)
- **After:** `src/__tests__/routing.test.ts`
- **Docs impact:** Removed Metro blocklist workaround from COVERAGE_REPORT

### DIR-003 — PAY-002 prefill from Home

- **Screen:** PAY-002
- **Before:** Empty phone/amount on direct open
- **After:** Query params `phone` + `amount` prefill when opened from Home row
- **Navigation:** Home recent row → PAY-002
- **Business impact:** None — prototype navigation only
- **Docs impact:** New state `PAY-002__prefilled-from-home.png`; action `ACT-PAY-002-15`

### DIR-004 — Home bottom spacing

- **Screens:** HOME-001, LGC-SCR-025
- **Before:** Large gap above tab bar / login CTA
- **After:** Content fits without excess scroll padding
- **Navigation:** None
- **Docs impact:** Screenshot layout updated on recapture

### DIR-005 — Guest Home recent operations

- **Screen:** HOME-001
- **Before:** Services + History sections
- **After:** Single «Последние операции» row — **Бонус за регистрацию** / **+500 Б**
- **Navigation:** Row tap → `/legacy/auth?qaStep=iin`
- **Business impact:** **PROTOTYPE_UI_ONLY** — bonus copy is not production policy
- **Docs impact:** `ACT-HOME-001-14`; removed guest service/history actions

## Removed current inventory

| ID | Reason |
|---|---|
| `CAS-HOME-005` | Home `HistoryActionSheet` no longer reachable from Home |
| `ACT-HOME-001-06`…`011` | Services/history preview removed from guest Home |
| `ACT-LGC-SCR-025-06`…`09`, `025-11` | Services/history preview removed from authorized Home |
| `ACT-LGC-SCR-026-06`…`09`, `026-11` | Same on filter-link Home variant |
| `ACT-CAS-HOME-005-01`…`03` | Overlay screen removed |

## Business-rule note

**No owner question was answered by this visual delta.**

`+500 Б` registration bonus copy remains **PROTOTYPE_UI_ONLY** / **CURRENT_MOCK_BEHAVIOR** until explicitly approved as production business policy.

Eight authorized recent-operation rows are **mock preview data**, not evidence of real transaction history, provider behavior, or repeat-payment production rules.

## Figma note

**Figma was not changed** in this delta.

- File: Cashello — Daur (`RbjNBmxd2FERlisMJoru3I`)
- HOME-001 frame `7:5` still shows pre-DIR Services + History layout
- Runtime product at `5977543` is **ahead of Figma** for these Home sections (see `docs/design/FIGMA_HANDOFF.md`)

## Reconciliation artifacts

- Manifests: `docs/business/discovery/manifests/*.json`
- Screenshots: `HOME-001__guest-home.png`, `LGC-SCR-025__authorized-home.png`, `LGC-SCR-026__history-filter-link.png`, `PAY-002__prefilled-from-home.png` (+ optional `LGC-SCR-025__recent-ops-scrolled.png`)
- Tools: `reconcile-post-design-delta.js`, `sync-post-design-markdown.js`
