# Discovery coverage report

Reconciled against product SHA `0c79651ebd6be0c77078e18e031587aaebe08a4a` after recent-operations bonus display (previous baseline `57061e07`).

**Product code changed during this reconciliation:** NO (docs/screenshots only)
**Figma modified:** NO
**Resolved product issue:** `src/app/routing.test.ts` moved to `src/__tests__/` in 597754364ada9dc1f51f62fe86b41a2bc0b24e4b; stock `npm run web` no longer requires Metro blocklist.

## Counts

| Metric                                         |                                              Count |
| ---------------------------------------------- | -------------------------------------------------: |
| Files under src/app/**                         |                                                 60 |
| UI route files                                 |                                                 47 |
| Product routes (PRODUCT + STATE + SHEET/MODAL) |                                                 36 |
| Stub routes                                    |                                                  6 |
| Redirect-only / no UI routes                   | 3 (`/`, `/legacy/stub/qr`, `/legacy/stub/payment`) |
| DEV_ONLY routes                                |                              1 (`/dev/foundation`) |
| Logical screens identified                     |                                                 94 |
| Primary screenshot files present               |                                                 94 |
| Primary screenshots runtime-validated          |                                                 79 |
| Primary screenshots marked CAPTURE_GAP         |                                                 16 |
| Annotated state screenshot files present       |                                                160 |
| State screenshots runtime-validated            |                                                133 |
| State screenshots marked CAPTURE_GAP           |                                                 26 |
| Actions identified                             |                                                443 |
| Interactive icon legend meanings               |                                                 16 |
| Business process candidates                    |                                                 22 |
| Owner questions                                |                                                130 |
| P0                                             |                                                 91 |
| P1                                             |                                                 30 |
| P2                                             |                                                  9 |
| P3                                             |                                                  0 |
| Required before backend                        |                                                 95 |
| Required before production                     |                                                 29 |
| Can decide later                               |                                                  6 |
| Code-only logical screens                      |                                                 94 |
| Figma-covered product screens                  |                                     1 (`HOME-001`) |
| Explicit no-screenshot route reasons           |                                                  5 |

## Figma coverage

- FIGMA_FACT: top-level pages are `1:3 — 01 — Главная не авторизованный пользователь` and `50:85 — Components`.
- FIGMA_FACT: `HOME-001` is frame `7:5`, 375×812.
- FIGMA_FACT: Components includes `HOME — Components` frame `44:199`.
- FIGMA_FACT: partial withdraw coverage is component section `256:761` containing `WD / Method Row` component `97:272`.
- No other screen is marked as Figma-covered. Legacy node aliases in source are not treated as nodes in the approved file.

## Runtime coverage

- Guest: Home (HOME-001) with «Последние операции» registration bonus preview row (`+500 Б`, unchanged).
- Authorized: Home (`LGC-SCR-025` / `LGC-SCR-026`) recent-operation rows show negative KZT debit plus positive `+N Б` at owner-approved current base rate **2%** (prototype display).

## Unresolved audit/product gaps

1. `WD-005` source ID collision is disambiguated by `CAS-WD-005` and `CAS-HIST-005`.
2. The normal auth path skips onboarding, KYC capture and returning-user PIN; these states are QA/debug reachable via `?qaStep=`.
3. Money routes lack route-level auth guards when deep-linked. Session defaults to authorized (`isGuest: false`) until guest Home runs.
4. Cash top-up routes are disconnected from the primary method selector.
5. Home sheet vs full-route withdraw selectors disagree.
6. P2P/Cashhello-user flow is currently non-completable.
7. Own-account over-balance transfer is accepted and produces inconsistent local effects.
8. Service payment produces no balance/history/receipt (900 ms Alert).
9. QR has no server intent or lifecycle.
10. Profile personal/phone/messages/help/search routes have missing or indirect entry points.
11. Global support FAB URLs are `null` (Alert «Скоро»). In-app messages/help is a separate unfinished flow.
13. No production error/retry/idempotency/provider/KYC/ledger policy is inferable from the prototype.
14. Twenty-six requested interaction states were not runtime-confirmed before capture. Their PNGs are retained only as nearest-reachable base-state fallbacks and are marked `CAPTURE_GAP` in `screens.json`.

## Screenshot capture gaps

No screenshot file is missing. The following requested states are **not validated screenshots of the named state**:

- Auth: `CAS-AUTH-011__otp-filled.png`
- Accounts/card: `LGC-SCR-031__open-account-sheet.png`, `LGC-SCR-031__open-account-request-recorded.png`, `LGC-SCR-034__download-sheet.png`, `LGC-SCR-040__account-method-sheet.png`, `LGC-SCR-036__cvv-visible.png`, `LGC-SCR-039__limit-sheet.png`, `LGC-SCR-039__limit-selected.png`, `LGC-SCR-039__limit-applied.png`
- Top-up/FX: `LGC-SCR-070__accounts-selected-fx.png`, `LGC-SCR-073__fx-filled.png`, `LGC-SCR-073__over-balance-enabled.png`, `CAS-TOPUP-001__saved-card-picker.png`, `LGC-SCR-087__saved-card-selected.png`, `LGC-SCR-081__cash-desk-selected.png`
- Withdraw: `LGC-SCR-091__card-camera.png`, `LGC-SCR-092__card-selected.png`, `CAS-WD-001__saved-card-picker.png`, `CAS-WD-003__saved-phone-picker.png`, `LGC-SCR-108__cash-desk-selected.png`, `LGC-SCR-097__confirmation.png`
- History: `LGC-SCR-111__date-filtered.png`, `CAS-HIST-001__calendar.png`, `CAS-HIST-001__calendar-selected.png`, `LGC-SCR-115__cancel-confirmation.png`, `LGC-SCR-115__cancelled-rejected.png`

Sixteen logical screen records use one of these as their primary PNG: `LGC-SCR-031`, `LGC-SCR-034`, `LGC-SCR-036`, `LGC-SCR-039`, `LGC-SCR-070`, `LGC-SCR-073`, `CAS-TOPUP-001`, `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-091`, `LGC-SCR-092`, `CAS-WD-001`, `CAS-WD-003`, `LGC-SCR-108`, `LGC-SCR-097`, `CAS-HIST-001`.

These screens remain traceable through route, component, actions, store, and owner questions. They require targeted recapture later; this audit does not claim their requested visual state was reached.

## Coverage gates

- Every product/stub route maps to at least one screen ID or an explicit `NO_SCREENSHOT_REASON`.
- Every logical screen record has a primary screenshot file or explicit `CAPTURE_GAP`; 16 primary states are gaps.
- Annotated screenshot markers map to action IDs in `UI_ACTION_CATALOG.md` / `actions.json`.
- Decorative-only graphics are excluded.
- Public-safety inputs are synthetic demo values only (777… phones, 4111… PAN, IIN/OTP demo `0000`).
- Screenshot files contain an audit header outside the 375×812 UI canvas.

## Manual re-review

- Major screens traceable: YES
- Important actions traceable to source/destination: YES
- Mock behavior separated from owner decisions: YES
- Stable-ID lookup available in Markdown and JSON: YES
- Final business rules created: NO
- Ready for OWNER-DECISION-INTERVIEW-001: YES
