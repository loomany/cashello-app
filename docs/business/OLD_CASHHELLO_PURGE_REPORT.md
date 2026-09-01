# Old Cashhello purge report

**Audit date:** 2026-09-01  
**Method:** clean-room reachability from `/legacy/home?guest=1` — not folder names, not screenshots

## A. Old-app artifacts still in repo

### Routes / screens (21)

- `/legacy/search` — ORPHANED — HOME_BRIDGES.search defined but no UI link
- `/legacy/accounts` — ORPHANED — Not linked from current tab/home nav
- `/legacy/accounts/[id]` — ORPHANED — Reachable only from orphaned accounts/search
- `/legacy/card` — OLD_APP_ONLY — Card product PARKED_ILYA Q-CARD-001
- `/legacy/card/limits` — OLD_APP_ONLY — Card limits — PARKED_ILYA
- `/legacy/card/pin` — OLD_APP_ONLY — Card PIN — PARKED_ILYA
- `/legacy/messages` — OLD_APP_ONLY — Internal support LATER Q-PROFILE-007
- `/legacy/help` — OLD_APP_ONLY — Internal help form LATER
- `/legacy/profile/personal` — ORPHANED — No profile nav link
- `/legacy/profile/phone` — ORPHANED — Phone change flow exists but not linked from profile UI
- `/legacy/profile/phone/verify` — ORPHANED — Orphaned with phone change
- `/legacy/topup` — DEAD_CODE — Home uses in-tree TopupSelectSheet instead
- `/legacy/topup/cash` — OLD_APP_ONLY — Cash top-up OUT_OF_MVP Q-TOPUP-001
- `/legacy/topup/cash-map` — OLD_APP_ONLY — Cash desk map — OUT_OF_MVP
- `/legacy/withdraw` — DEAD_CODE — Home sheet skips this hub
- `/legacy/withdraw/cash` — OLD_APP_ONLY — Cash withdrawal OUT_OF_MVP Q-WD-001
- `/legacy/withdraw/cash-map` — OLD_APP_ONLY — Cash pickup OUT_OF_MVP
- `/legacy/withdraw/amount` — OLD_APP_ONLY — Cash flow step — unreachable
- `/legacy/history/filter` — ORPHANED — History uses in-tree date sheet; filter route debug-only
- `/legacy/stub/qr` — DEAD_CODE — Redirect alias
- `/legacy/stub/payment` — DEAD_CODE — Redirect alias

### Docs / manifests (historical)

| Artifact | Disposition |
| --- | --- |
| `docs/business/discovery/PRODUCT_SCREEN_CATALOG.md` | HISTORICAL_ONLY |
| `docs/business/discovery/UI_ACTION_CATALOG.md` | HISTORICAL_ONLY |
| `docs/business/discovery/CURRENT_FLOW_MAP.md` | HISTORICAL_ONLY |
| `docs/business/discovery/BUSINESS_PROCESS_CANDIDATES.md` | HISTORICAL_ONLY |
| `docs/business/discovery/manifests/screens.json` | HISTORICAL_ONLY (CAS-/LGC- IDs) |
| `docs/business/discovery/manifests/actions.json` | HISTORICAL_ONLY |
| `docs/business/discovery/SCREENSHOT_SCOPE_MANIFEST.*` | DEPRECATE — screenshots deleted |
| `docs/backend/SCREEN_API_MATRIX.json` (pre-rebuild) | REBUILT — no screenshot_ref |

### Deleted screenshots

158 annotated PNG files under `docs/business/discovery/screenshots/annotated/` deleted (git status D). Intentionally removed — not evidence.

### Old IDs

CAS-*, LGC-SCR-*, HOME-001, PAY-001 etc. in discovery manifests — **DO NOT USE FOR HANDOFF**. Remapped to NEW-* in current catalogs.

## B. Used by current new runtime?

| Artifact class | Current runtime use |
| --- | --- |
| `/legacy/home`, payment, history, profile, auth, withdraw/card|phone|cashhello-user, topup/between|card` | **YES** |
| Cash top-up/withdraw routes | **NO** — unreachable, OUT_OF_MVP |
| Card product routes | **NO** — orphaned, PARKED_ILYA |
| Search, accounts list, messages, help | **NO** — orphaned |
| Stub routes (except documents) | **NO** |
| Discovery CAS-/LGC- screen IDs | **NO** — docs only |
| Deleted screenshots | **NO** |

## C. Marked DO_NOT_USE_FOR_HANDOFF

All `OLD_APP_ONLY`, unreachable cash flows, orphaned card/search/messages routes, and screenshot-based manifests.

## D. src/** unchanged

This report is audit-only. No source deletions performed.
