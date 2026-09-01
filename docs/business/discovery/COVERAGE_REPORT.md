# Discovery coverage report

Reconciled against product SHA `86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134` after owner visual pass VIS2 home payment navigation (previous baseline `dbb0acd38228321e7e3dd0132974bbcf294a878c`).

**Product code changed during this reconciliation:** NO (docs/screenshots only)
**Figma modified:** NO
**LGC-SCR-026:** RETIRED_AND_MERGED_WITH_LGC-SCR-025 (`/legacy/home?historyLink=filter` is a compatibility alias only)

## Counts

| Metric                                         |                                              Count |
| ---------------------------------------------- | -------------------------------------------------: |
| Files under src/app/**                         |                                                 60 |
| UI route files                                 |                                                 47 |
| Product routes (PRODUCT + STATE + SHEET/MODAL) |                                                 36 |
| Stub routes                                    |                                                  6 |
| Redirect-only / no UI routes                   | 3 (`/`, `/legacy/stub/qr`, `/legacy/stub/payment`) |
| DEV_ONLY routes                                |                              1 (`/dev/foundation`) |
| Logical screens identified                     |                                                 93 |
| Primary screenshot files present               |                                                 93 |
| Primary screenshots runtime-validated          |                                                 77 |
| Primary screenshots marked CAPTURE_GAP         |                                                 16 |
| Annotated state screenshot files present       |                                                158 |
| State screenshots runtime-validated            |                                                132 |
| State screenshots marked CAPTURE_GAP           |                                                 26 |
| Actions identified                             |                                                425 |
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
| Code-only logical screens                      |                                                 93 |
| Figma-covered product screens                  |                                     1 (`HOME-001`) |
| Explicit no-screenshot route reasons           |                                                  5 |

## Runtime coverage

- Guest: Home (HOME-001) with segmented payments plaque `Последние | Все | История`; registration bonus row `+500 Б` unchanged; guest `Все` / `История` → auth.
- Authorized: Home (LGC-SCR-025) shows 4 recent-operation rows with negative KZT debit plus `+N Б` at owner-approved current base rate **2%**; segments `Все` → payment catalog, `История` → history.

## Retired in this pass

- Logical screen `LGC-SCR-026` merged into `LGC-SCR-025`.
- State `RECENT_OPS_SCROLLED` — retired (4-row Home no longer has distinct lower-row scroll evidence).
- Screenshots removed: `LGC-SCR-026__history-filter-link.png`, `LGC-SCR-025__recent-ops-scrolled.png`.

## Unresolved audit/product gaps

See prior coverage report items; unchanged except Home navigation evidence updated at product SHA 86e9d3b.
