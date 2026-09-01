# Cashello business rules ledger

**Audit date:** 2026-09-01  
**Repository HEAD:** see [TALGAT_HANDOFF.md](../backend/TALGAT_HANDOFF.md)  
**Evidence class key:** `OWNER_APPROVED` | `PARKED_ILYA` | `CURRENT_UI_ONLY` | `PROTOTYPE_MOCK` | `LATER` | `OUT_OF_MVP` | `FUTURE`

Stable rule IDs below. Mock numeric values in source are **never** production rules unless marked `OWNER_APPROVED`.

---

## Authentication and session

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-AUTH-001 | Backend determines new vs returning user by phone; no login/register chooser | OWNER_APPROVED | Q-AUTH-001 |
| BR-AUTH-002 | OTP via WhatsApp; Evolution/Meta provider = later technical choice | OWNER_APPROVED | Q-AUTH-002 |
| BR-AUTH-003 | Single active authorized device/session; new login revokes previous | OWNER_APPROVED | Q-AUTH-010 |
| BR-AUTH-004 | Any 4-digit SMS / any 6-digit PIN in prototype = NON-PRODUCTION | PROTOTYPE_MOCK | — |
| BR-AUTH-005 | Extended KYC capture screens = prototype only until provider chosen | PROTOTYPE_MOCK | Q-KYC-001 |

## Accounts and balances

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-ACC-001 | Auto-create KZT + bonus + USD + RUB on registration | OWNER_APPROVED | Q-ACC-001 |
| BR-ACC-002 | One visible ordinary balance; debit on accept/send; restore on fail; no visible hold | OWNER_APPROVED | Q-ACC-005 |
| BR-ACC-003 | Open account policy (Открыть счет) | PARKED_ILYA | Q-ACC-002 |
| BR-ACC-004 | Primary account semantics (Сделать основным) | PARKED_ILYA | Q-ACC-003 |
| BR-ACC-005 | Negative balance / overdraft policy | PARKED_ILYA | Q-ACC-004 |
| BR-ACC-006 | Statement and requisites format (Выписка/реквизиты) | PARKED_ILYA | Q-ACC-006 |
| BR-ACC-007 | Legacy `kzt-primary` / foundation `acc_kzt` IDs = migration boundary only | CURRENT_UI_ONLY | — |
| BR-ACC-008 | Canonical production money = integer minor units server-side | OWNER_APPROVED | — |

## Fees

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-FEE-001 | Top-up fees dynamic per method (backend-owned) | OWNER_APPROVED | Q-TOPUP-004 |
| BR-FEE-002 | Withdraw fees dynamic per method (backend-owned) | OWNER_APPROVED | Q-WD-003 |
| BR-FEE-003 | Service payment fees from catalog (backend-owned) | OWNER_APPROVED | Q-PAY-001 |
| BR-FEE-004 | `MOCK_FEE_KZT=30` in withdraw mock | PROTOTYPE_MOCK | — |
| BR-FEE-005 | Own-account transfer fee | PARKED_ILYA | Q-TRF-004 |

## Limits

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-LIM-001 | Limits operation-specific, backend-driven (method/user/KYC) | OWNER_APPROVED | Q-P2P-006 |
| BR-LIM-002 | `MOCK_MIN_KZT=1000`, `MOCK_MAX_KZT=1970` cash withdraw | PROTOTYPE_MOCK | — |
| BR-LIM-003 | Card spending limit presets 10k–500k KZT | PROTOTYPE_MOCK | Q-CARD-001 |
| BR-LIM-004 | KYC tier limits (`12 975 ₸` static copy) | PROTOTYPE_MOCK | Q-KYC-001 |

## Catalog and payments

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-CAT-001 | Full service catalog backend-owned | OWNER_APPROVED | Q-PAY-001 |
| BR-CAT-002 | `PAYMENT_SECTIONS` static array in prototype | PROTOTYPE_MOCK | — |
| BR-PAY-001 | Bonus account may pay services; restrictions backend-driven | OWNER_APPROVED | Q-PAY-003 |
| BR-PAY-002 | Payment execution Alert stub = no ledger effect | PROTOTYPE_MOCK | — |

## Bonus and cashback

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-BON-001 | Guest `+500 Б` registration row | CURRENT_UI_ONLY | — |
| BR-BON-002 | `RECENT_OPERATION_BONUS_RATE=0.02` (2%) display | CURRENT_UI_ONLY | — |
| BR-BON-003 | `demoServices` commission captions | PROTOTYPE_MOCK | — |

## Cash exclusions

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-CASH-001 | NO cash top-up; NO Cashello cash desks | OUT_OF_MVP | Q-TOPUP-001 |
| BR-CASH-002 | Cash withdrawal OUT_OF_MVP | OUT_OF_MVP | Q-WD-001 |
| BR-CASH-003 | Cash routes exist in prototype UI only | CURRENT_UI_ONLY | — |

## FX and own-account transfer

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-FX-001 | NBK pivot rates in `legacyTopup/mockData.ts` | PROTOTYPE_MOCK | Q-TRF-001 |
| BR-FX-002 | FX source and markup policy | PARKED_ILYA | Q-TRF-001 |

## P2P (Cashhello user)

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-P2P-001 | Recipient lookup strictly by phone | OWNER_APPROVED | Q-P2P-001 |
| BR-P2P-000 | `/legacy/withdraw/cashhello-user` = P2P (BP-P2P-001), NOT cash withdrawal | OWNER_APPROVED | Q-WD-001 |
| BR-P2P-002 | Recipient preview fields | PARKED_ILYA | Q-P2P-002 |
| BR-P2P-003 | Final confirmation screen/policy | PARKED_ILYA | Q-P2P-003 |
| BR-P2P-004 | Finality and cancellation rules | PARKED_ILYA | Q-P2P-005 |

## QR

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-QR-001 | QR receive/pay = FUTURE; no MVP backend contract | FUTURE | Q-QR-001/002/003/010 |
| BR-QR-002 | `cashhello://pay?amount=` client payload | PROTOTYPE_MOCK | — |

## Support

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-SUP-001 | External support: WhatsApp + Telegram + phone, 24/7 | OWNER_APPROVED | Q-SUPPORT-001/002 |
| BR-SUP-002 | Internal chat/ticket = LATER | LATER | Q-PROFILE-007 |
| BR-SUP-003 | Current UI: Telegram/WhatsApp placeholders only; no phone; links null | APP_UI_GAP | — |

## Card

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-CARD-001 | All card product requirements blocked pending owner | PARKED_ILYA | Q-CARD-001 |

## KYC

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-KYC-001 | KYC provider, tiers, thresholds | PARKED_ILYA | Q-KYC-001 |

## Notifications

| Rule ID | Rule | Status | Owner Q |
| --- | --- | --- | --- |
| BR-NOTIF-001 | Push notification policy | PARKED_ILYA | (no Q-NOTIF in discovery) |
| BR-NOTIF-002 | Proposal only (not approved): financial + system + admin marketing push | UNAPPROVED_PROPOSAL | — |

## Technical reconciliation (money and transactions)

| Rule ID | Rule | Status |
| --- | --- | --- |
| BR-TECH-001 | Legacy major-unit Zustand store ≠ production ledger | CURRENT_UI_ONLY |
| BR-TECH-002 | Foundation minor-unit store ≠ automatic production schema | CURRENT_UI_ONLY |
| BR-TECH-003 | Production contract = canonical minor-unit balances from backend | OWNER_APPROVED |
| BR-TECH-004 | Legacy `LegacyHistoryOp` enums ≠ production ledger enums | PROTOTYPE_MOCK |
| BR-TECH-005 | Client cancel changes status only; no balance restore in prototype | PROTOTYPE_MOCK |

---

## Hardcoded business data audit (prototype source)

| Location | Value | Mock? | Approved? | Backend dynamic? | Status |
| --- | --- | --- | --- | --- | --- |
| `legacyWithdraw/mockData.ts` | FEE 30, MIN 1000, MAX 1970 | yes | no | yes (withdraw) | PROTOTYPE_MOCK |
| `legacyTopup/mockData.ts` | NBK USD/RUB rates | yes | no | yes (FX) | PARKED_ILYA + MOCK |
| `legacyHome/recentOperationsPreview.ts` | 2% bonus rate | yes | no | unknown | CURRENT_UI_ONLY |
| `legacyHome/copy.ts` | `+500 Б` guest row | yes | no | unknown | CURRENT_UI_ONLY |
| `legacyCard/mockData.ts` | Limit presets 10k–500k | yes | no | yes when card approved | PARKED_ILYA |
| `demoServices.ts` | Service commission % | yes | no | yes (catalog) | OWNER_APPROVED dynamic |
| `legacyTopup/mockData.ts` | CANONICAL_BALANCES | yes | no | yes | PROTOTYPE_MOCK |
| `legacyHistory/mockData.ts` | Default fee 30 in append | yes | no | yes | PROTOTYPE_MOCK |
