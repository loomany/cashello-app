# Talgat backend handoff — CURRENT NEW CASHELLO ONLY

**THIS HANDOFF DESCRIBES ONLY THE CURRENT NEW CASHELLO APPLICATION.**

Previous Cashhello screenshot/UI generation is **deprecated** and **must not** be used for backend implementation. Deleted screenshot files are not backend requirements.

**Audit date:** 2026-09-01  
**SOURCE_BASELINE_SHA:** `4379c6ba172e23e2392b27a40ecc1e4879a3daf4` (src/** unchanged on this baseline; handoff docs on review branch)  
**Live:** https://cashello.scholarshiptop.com/legacy/home?guest=1  
**Live vs source:** CURRENT_SOURCE_BUILD (see LIVE_SITE_PARITY_REPORT — bundle tracks repo; screenshots removed intentionally)

---

## 1. Current new app map

**Entry:** `/` → `/legacy/home?guest=1`

| Doc | Purpose |
| --- | --- |
| [NEW_APP_ROUTE_MAP.md](../business/NEW_APP_ROUTE_MAP.md) | All routes + reachability |
| [NEW_APP_SCREEN_CATALOG.md](../business/NEW_APP_SCREEN_CATALOG.md) | NEW-* screen IDs |
| [NEW_APP_ACTION_CATALOG.md](../business/NEW_APP_ACTION_CATALOG.md) | Every button/CTA + business purpose |
| [SCREEN_API_MATRIX.md](./SCREEN_API_MATRIX.md) | Screen → API mapping |
| [BUSINESS_PROCESS_SPEC.md](../business/BUSINESS_PROCESS_SPEC.md) | Business processes |

Folder name `legacy/` is a **route namespace only** — it holds the current product UI.

---

## 2. Current MVP (backend implement)

1. **Auth** — phone resolve (login/register unified Q-AUTH-001), WhatsApp OTP (Q-AUTH-002), PIN, single session (Q-AUTH-010)
2. **Accounts** — auto KZT+bonus+USD+RUB (Q-ACC-001), balance reads, single visible balance semantics (Q-ACC-005)
3. **Top-up** — external card + own-account transfer (NO cash Q-TOPUP-001), dynamic fees (Q-TOPUP-004)
4. **Withdraw** — card + phone (NO cash Q-WD-001), dynamic fees (Q-WD-003)
5. **P2P** — `/legacy/withdraw/cashhello-user` phone lookup + transfer (Q-P2P-001) — **NOT** `/withdraw/cash`
6. **Payments** — backend-owned catalog (Q-PAY-001), bonus account allowed with backend rules (Q-PAY-003)
7. **History + receipts** — query, detail, receipt
8. **Profile** — logout/delete session, change PIN
9. **Support** — external WA+TG+phone config (Q-SUPPORT-001), 24/7 target (Q-SUPPORT-002)

---

## 3. DO NOT IMPLEMENT

| Topic | Reason |
| --- | --- |
| Cash top-up / cash desks | OUT_OF_MVP — Q-TOPUP-001 |
| Cash withdrawal | OUT_OF_MVP — Q-WD-001 |
| QR APIs | FUTURE — Q-QR-* |
| PayDala card / card routes | PARKED_ILYA — Q-CARD-001 |
| KYC provider / auth KYC steps | PARKED_ILYA — Q-KYC-001 |
| Internal messages/help ticket system | LATER — Q-PROFILE-007 |
| Orphaned routes (search, accounts list, card) | Not in current navigation — see purge report |
| Prototype mock fees/limits/balances | Use dynamic quote APIs |

---

## 4. Business rules (owner-approved)

See [OWNER_DECISIONS_RESOLVED.md](../business/OWNER_DECISIONS_RESOLVED.md). Key rules:

- Backend determines login vs register (Q-AUTH-001)
- WhatsApp OTP (Q-AUTH-002)
- One active session/device (Q-AUTH-010)
- Four default accounts (Q-ACC-001)
- No cash top-up (Q-TOPUP-001)
- No cash withdraw (Q-WD-001)
- P2P search by phone only (Q-P2P-001)
- Dynamic fees and limits from backend
- Backend-owned payment catalog
- External support channels only for MVP

---

## 5. Business processes

22 processes in [BUSINESS_PROCESS_SPEC.md](../business/BUSINESS_PROCESS_SPEC.md). MVP count: 10 full MVP + 3 partial pending.

---

## 6. Screen / action / API map

- **76** actions across **43** current-product screens
- Matrix: [SCREEN_API_MATRIX.json](./SCREEN_API_MATRIX.json) — **zero screenshot_ref**

---

## 7. Pending Ilya decisions

PARKED_ILYA: Q-ACC-002..004, Q-ACC-006, Q-TRF-001, Q-TRF-004, Q-P2P-002/003/005, Q-CARD-001, Q-KYC-001

Full ledger: [OWNER_DECISIONS_RESOLVED.md](../business/OWNER_DECISIONS_RESOLVED.md) + [OWNER_DECISIONS_PENDING.md](../business/OWNER_DECISIONS_PENDING.md)

---

## 8. First allowed backend task

**Sprint 0 scaffold:** HTTP layer, auth module skeleton, session store, idempotency middleware.

**First feature slice:** `auth.resolvePhone` + `auth.requestOtp` + `auth.verifyOtp` + `auth.setPin` + `auth.loginPin` wired to NEW-AUTH-* screens (normal auth only — skip KYC prototype steps NEW-AUTH-004..010).

Do **not** implement until PARKED_ILYA rules are needed for that slice.
