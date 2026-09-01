# API contract requirements

**Audience:** Backend developer (Talgat)  
**Audit date:** 2026-09-01  
**Companion:** [SCREEN_API_MATRIX.md](./SCREEN_API_MATRIX.md) · [BUSINESS_RULES.md](../business/BUSINESS_RULES.md)

This is **not** an invented OpenAPI spec. It defines cross-cutting backend requirements the UI will need.

---

## Money representation

- All ledger amounts: **integer minor units** (e.g. tiyn for KZT where 1 KZT = 100 minor — confirm currency exponent per ISO).
- Never use floating point in ledger or API payloads.
- Client may display major units; server is authoritative.
- Unify account IDs (replace `kzt-primary` vs `acc_kzt` split) in API layer.

## Account model

- On registration create: **KZT + bonus + USD + RUB** (BR-ACC-001).
- Response must support home carousel and payment source picker.
- Balance UX: single visible available balance; optimistic debit on accept with server reconciliation (BR-ACC-002).

## Operation identity and status

- Every financial command returns `operation_id` (UUID or snowflake).
- Status lifecycle server-owned; client polls or subscribes — **client success screen ≠ proof**.
- Idempotency: `Idempotency-Key` header required on all financial commands.
- Cancel/reversal must restore or offset ledger (unlike prototype).

## Dynamic fees and quotes

- Pattern: `POST /quote` or `GET /quote` → `{ amount, fee, total, expires_at, quote_id }` then `POST /create` with `quote_id`.
- Top-up, withdraw, P2P, own-account transfer, service payment all use backend quotes where fees apply.
- **Do not hardcode** prototype values (30 ₸ fee, etc.).

## Dynamic limits

- Per-operation limits from backend; may depend on user, KYC tier, method, amount, velocity.
- Return structured limit errors with machine-readable codes.

## Catalog

- Categories, services, availability, fee/bonus captions, validation rules — all backend-owned.
- Favorites: optional user-scoped persistence.

## Auth and session

- `auth.resolvePhone(phone)` → `{ path: 'register' | 'login', session_id }`
- OTP via **WhatsApp** (provider TBD: Evolution/Meta).
- `auth.verifyOtp` → tokens + session.
- **One active session/device**; new login revokes previous (BR-AUTH-003).
- Secure token storage on client (Keychain/Keystore) — frontend task later.

## P2P

- `p2p.lookupRecipient(phone)` — **phone only** (BR-P2P-001).
- Preview/confirmation policies PARKED_ILYA — implement lookup + quote skeleton; confirm fields with owner.

## History and receipts

- Paginated `transactions.list` with filters matching UI kinds.
- `transactions.get(id)` with receipt fields.
- `transactions.receipt(id)` for share/download — format OWNER_DECISION_REQUIRED.

## Errors

- Structured: `{ code, message, details?, retryable? }`
- Distinguish: validation, limit, insufficient funds, provider timeout, auth expired.
- Retry-safe idempotent replays must return same result.

## Provider references

- Store external PSP/KYC/SMS provider IDs on operations for support and reconciliation.
- Webhooks: idempotent processing, signature verification.

## Pagination

- Cursor-based preferred for transaction history.
- Catalog may be static-cacheable with ETag.

## Out of scope for MVP backend

| Area | Status |
| --- | --- |
| Cash top-up / cash desks | OUT_OF_MVP |
| Cash withdrawal | OUT_OF_MVP |
| QR receive/pay | FUTURE |
| Card issuer APIs | PARKED_ILYA |
| KYC provider | PARKED_ILYA |
| Internal support tickets | LATER |

## WhatsApp OTP contract boundary

- Backend owns: send, resend cooldown, verify, attempt limits, session binding.
- Frontend owns: phone input UX, code entry, error display.
- Provider selection (Evolution vs Meta): technical — not blocking API shape definition.
