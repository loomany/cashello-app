# Owner decisions — resolved ledger

**Audit date:** 2026-09-01  
**Evidence:** `CURSOR_CASHELLO_FULL_HANDOFF_AUDIT_TZ.md` Phase C (no reinterpretation)  
**Machine-readable source:** [owner_questions.json](./discovery/manifests/owner_questions.json)

Unanswered questions remain in [OWNER_DECISIONS_PENDING.md](./OWNER_DECISIONS_PENDING.md). Original question wording is preserved in [OWNER_QUESTIONNAIRE.md](./discovery/OWNER_QUESTIONNAIRE.md).

## Summary

| Status | Count |
| --- | ---: |
| ANSWERED (owner-approved) | 15 |
| PARKED_ILYA | 11 |
| FUTURE / OUT_OF_MVP (QR) | 4 |
| LATER | 1 |
| N/A | 2 |
| UNANSWERED (remaining) | 97 |

All 97 unanswered items have `decision_owner` in [owner_questions.json](./discovery/manifests/owner_questions.json) (`ILYA`, `FRONTEND`, `PROVIDER_COMPLIANCE`, etc.). Answers not invented.

---

## ANSWERED — owner-approved

| ID | Approved answer |
| --- | --- |
| Q-AUTH-001 | Backend determines new/returning by phone; no login/register chooser |
| Q-AUTH-002 | OTP via WhatsApp; Evolution/Meta = later technical selection |
| Q-AUTH-010 | Single active device/session; new login revokes previous |
| Q-ACC-001 | Auto-create KZT + bonus + USD + RUB |
| Q-ACC-005 | One visible balance; debit on accept/send; restore on fail; no visible hold |
| Q-TOPUP-001 | NO cash top-up; NO Cashello cash desks |
| Q-TOPUP-004 | Dynamic backend fee/conditions per top-up method |
| Q-P2P-001 | Recipient search strictly by phone |
| Q-P2P-006 | Operation-specific backend-driven limits |
| Q-WD-001 | Non-cash withdraw methods remain; cash withdrawal OUT |
| Q-WD-003 | Dynamic backend fee per withdraw method |
| Q-PAY-001 | Service catalog fully backend-owned |
| Q-PAY-003 | Bonus account can pay services; restrictions backend-driven |
| Q-SUPPORT-001 | WhatsApp + Telegram + phone |
| Q-SUPPORT-002 | 24/7 availability target |

## N/A

| ID | Reason |
| --- | --- |
| Q-TOPUP-008 | Cash desk top-up removed (Q-TOPUP-001) |
| Q-TOPUP-009 | Cash desk top-up removed (Q-TOPUP-001) |

## PARKED_ILYA — STOP / ASK ILYA

| ID | Topic (canonical questionnaire) |
| --- | --- |
| Q-ACC-002 | Open account — currencies and limits |
| Q-ACC-003 | Primary account semantics |
| Q-ACC-004 | **Negative balance / overdraft** |
| Q-ACC-006 | **Statement and requisites format** |
| Q-TRF-001 | FX source/markup |
| Q-TRF-004 | Own-account transfer fee |
| Q-P2P-002 | Recipient preview |
| Q-P2P-003 | Final confirmation |
| Q-P2P-005 | Finality/cancellation |
| Q-CARD-001 | Card product (blocks all card) |
| Q-KYC-001 | KYC provider/tiers |

## FUTURE / OUT_OF_MVP

| ID | Scope |
| --- | --- |
| Q-QR-001 | QR — no MVP backend |
| Q-QR-002 | QR — no MVP backend |
| Q-QR-003 | QR — no MVP backend |
| Q-QR-010 | QR — no MVP backend |

## LATER

| ID | Scope |
| --- | --- |
| Q-PROFILE-007 | Internal in-app chat/ticket support |

## Notifications (not in discovery manifest)

| ID | Status |
| --- | --- |
| Q-NOTIF-001 | Referenced in audit TZ only — **PARKED_ILYA**; no `Q-NOTIF-*` in `owner_questions.json` yet |

Proposal only (not approved): financial + system + generic admin marketing push.
