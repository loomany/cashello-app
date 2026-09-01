# NEW app handoff audit report

**Audit date:** 2026-09-01  
**Method:** Clean-room audit from current app entry outward (not from old screenshots/docs inward)

---

## Git state

| Field | Value |
| --- | --- |
| START_HEAD | `4379c6ba172e23e2392b27a40ecc1e4879a3daf4` |
| END_HEAD | `4379c6ba172e23e2392b27a40ecc1e4879a3daf4` |
| origin/main | `4379c6ba172e23e2392b27a40ecc1e4879a3daf4` |
| Working tree | **dirty** (docs-only changes + deleted screenshots) |
| app source changed | **NO** |
| Figma changed | **NO** |
| commit / push | **NO** |

---

## Current new app definition

| Item | Value |
| --- | --- |
| Entry | `src/app/index.tsx` → `PUBLIC_ROOT_HREF` = `/legacy/home?guest=1` |
| Root layout | `src/app/_layout.tsx` (Stack: index, legacy, dev) |
| Legacy layout | `src/app/legacy/_layout.tsx` + global `SupportContactHost` |
| Guest home | `LegacyHomeScreen(variant=guest)` — login CTA, no tab bar |
| Authorized home | `LegacyHomeScreen(variant=authorized)` + `LegacyTabBar` |
| Auth entry | `/legacy/auth?qaStep=iin` (guest gates) or full `/legacy/auth` flow |

**Note:** Route namespace `legacy/` is **not** "old app" — it is the current product UI path.

---

## Inventory counts

| Metric | Count |
| --- | ---: |
| Total route files audited | 47 |
| CURRENT_NEW_APP routes | 19 |
| OLD_APP_ONLY / ORPHANED / DEAD_CODE routes | 21 |
| NEW app screens (incl. overlays) | 49 |
| NEW app actions (reachable product) | 64 |
| Business processes | 22 |
| SCREEN_API_MATRIX rows | 64 |

---

## Screenshots purge

| Item | Status |
| --- | --- |
| Deleted annotated PNGs | **158** files (`docs/business/discovery/screenshots/annotated/*.png`) |
| `SCREENSHOT_SCOPE_MANIFEST` | **DEPRECATED** |
| `screenshot_ref` in new SCREEN_API_MATRIX.json | **0** |
| Stale screenshot refs in new handoff docs | **0** (matrix + TALGAT) |

**Remaining historical refs (NOT current handoff):**

- `docs/business/discovery/manifests/screens.json` — HISTORICAL_ONLY
- `docs/business/discovery/tools/handoff-classification.js` — legacy builder helper
- Purge/audit reports documenting deletion

---

## Separation audit

| Check | Result |
| --- | --- |
| old-app screens accidentally in current handoff MVP | **0** |
| cash top-up/withdraw in MVP backend matrix | **0** |
| QR in MVP backend matrix | **0** |
| card/KYC in implementable MVP backend | **0** |
| P2P confused with cash (`cashhello-user` vs `/cash`) | **PASS** — classified separately |
| internal support vs external FAB | **PASS** — BP-SUPPORT-001 LATER, BP-SUPPORT-002 MVP config_only |
| unmapped current actions (in catalog, not in matrix) | **0** |
| owner decisions preserved (15 ANSWERED) | **PASS** |
| screen → action → process → backend mapping | **PASS** |

---

## Live site

| Field | Value |
| --- | --- |
| URL | https://cashello.scholarshiptop.com/legacy/home?guest=1 |
| Fetch during audit | Timeout (network) — not used as source of truth |
| Classification | **CURRENT_SOURCE_BUILD** (per prior LIVE_SITE_PARITY_REPORT — bundle tracks repo HEAD) |
| Policy | Source code remains authority; live drift would be recorded separately, not rewrite docs |

---

## Old documentation disposition

| Document | Disposition |
| --- | --- |
| PRODUCT_SCREEN_CATALOG | HISTORICAL_ONLY |
| UI_ACTION_CATALOG | HISTORICAL_ONLY |
| CURRENT_FLOW_MAP | HISTORICAL_ONLY |
| BUSINESS_PROCESS_CANDIDATES | HISTORICAL_ONLY |
| screens.json / actions.json / flows.json | HISTORICAL_ONLY |
| SCREENSHOT_SCOPE_MANIFEST* | DEPRECATE |
| SCREEN_API_MATRIX (rebuilt) | **REBUILD** — from NEW_APP_ACTION_CATALOG |
| TALGAT_HANDOFF | **REBUILD** |
| BUSINESS_PROCESS_SPEC | **REBUILD** |
| NEW_APP_* catalogs | **NEW** |
| OWNER_DECISIONS_RESOLVED | **KEEP** |
| MVP_SCOPE_MATRIX | **KEEP** (reconcile with NEW catalogs) |

---

## Validation results

| Check | Result |
| --- | --- |
| `node docs/business/discovery/tools/validate-discovery.js` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm test -- --runInBand` | **PASS** (24 suites, 149 tests) |
| `npm run lint` | **FAIL** — `PRE_EXISTING_SOURCE_LINT_FAILURE` |

### Pre-existing source lint (not fixed — out of scope)

```
src/features/legacyPayment/PaymentServiceScreen.tsx:129:7
  react-hooks/set-state-in-effect
```

---

## Deliverables

| # | Artifact |
| --- | --- |
| 1 | [NEW_APP_HANDOFF_AUDIT_REPORT.md](./NEW_APP_HANDOFF_AUDIT_REPORT.md) (this file) |
| 2 | [NEW_APP_ROUTE_MAP.md](../business/NEW_APP_ROUTE_MAP.md) |
| 3 | [NEW_APP_SCREEN_CATALOG.md](../business/NEW_APP_SCREEN_CATALOG.md) |
| 4 | [NEW_APP_ACTION_CATALOG.md](../business/NEW_APP_ACTION_CATALOG.md) |
| 5 | [BUSINESS_PROCESS_SPEC.md](../business/BUSINESS_PROCESS_SPEC.md) |
| 6 | [SCREEN_API_MATRIX.md](./SCREEN_API_MATRIX.md) |
| 7 | [TALGAT_HANDOFF.md](./TALGAT_HANDOFF.md) |
| 8 | [OLD_CASHHELLO_PURGE_REPORT.md](../business/OLD_CASHHELLO_PURGE_REPORT.md) |

Regenerate command: `node docs/business/discovery/tools/build-new-app-handoff.js`

---

## Final verdict

**READY_FOR_FINAL_CHATGPT_REVIEW**

Rationale:

- New handoff built from current source entry + reachability
- Zero screenshot evidence in implementable handoff
- Old/new app separated with explicit purge report
- Owner decisions preserved and remapped to NEW-* IDs
- Validator passes; tests and typecheck pass
- Known pre-existing lint failure documented; src/** unchanged

**NOT** marked READY_FOR_TALGAT — requires final ChatGPT review per acceptance protocol.
