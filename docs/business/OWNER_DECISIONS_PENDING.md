# Cashello owner decisions pending

This page is the owner-decision queue for the [Cashello AI handoff](./AI_HANDOFF_INDEX.md). It summarizes the existing discovery package; it does not answer or reinterpret any question.

Snapshot at packaging start `176408dfcb16b0583ef7620ae179d2461890ae4a`:

- 130 questions total
- 130 `UNANSWERED`
- 91 P0, 30 P1, 9 P2
- 95 `REQUIRED_BEFORE_BACKEND`
- 29 `REQUIRED_BEFORE_PRODUCTION`
- 6 `CAN_DECIDE_LATER`

The complete prompts, options, affected processes, screens, actions, and current prototype facts are in the [owner questionnaire](./discovery/OWNER_QUESTIONNAIRE.md). The machine-readable source is [owner_questions.json](./discovery/manifests/owner_questions.json). Options are prompts, not recommended answers.

## Decision gates

- Before backend implementation: 95 decisions — 75 P0 and 20 P1.
- Before production: 29 additional decisions — 16 P0, 9 P1, and 4 P2.
- Can decide later: 6 decisions — 1 P1 and 5 P2.

Do not convert a prototype value or behavior into a backend rule while its related decision remains unanswered.

## First queue — P0 required before backend

These 75 IDs are the immediate business blockers, grouped by module:

- Accounts (2): `Q-ACC-004`, `Q-ACC-005`
- Authentication (8): `Q-AUTH-001`, `Q-AUTH-002`, `Q-AUTH-005`, `Q-AUTH-006`, `Q-AUTH-007`, `Q-AUTH-009`, `Q-AUTH-011`, `Q-AUTH-012`
- Card (6): `Q-CARD-001`, `Q-CARD-002`, `Q-CARD-003`, `Q-CARD-004`, `Q-CARD-005`, `Q-CARD-006`
- Errors and provider outcomes (5): `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`
- History (3): `Q-HIST-002`, `Q-HIST-003`, `Q-HIST-008`
- KYC (5): `Q-KYC-001`, `Q-KYC-002`, `Q-KYC-003`, `Q-KYC-006`, `Q-KYC-008`
- P2P (6): `Q-P2P-001`, `Q-P2P-002`, `Q-P2P-003`, `Q-P2P-005`, `Q-P2P-006`, `Q-P2P-007`
- Payments (8): `Q-PAY-002`, `Q-PAY-003`, `Q-PAY-004`, `Q-PAY-005`, `Q-PAY-007`, `Q-PAY-008`, `Q-PAY-009`, `Q-PAY-012`
- Profile (3): `Q-PROFILE-001`, `Q-PROFILE-002`, `Q-PROFILE-005`
- QR (6): `Q-QR-001`, `Q-QR-003`, `Q-QR-004`, `Q-QR-005`, `Q-QR-007`, `Q-QR-010`
- Top-up (8): `Q-TOPUP-002`, `Q-TOPUP-003`, `Q-TOPUP-004`, `Q-TOPUP-005`, `Q-TOPUP-006`, `Q-TOPUP-007`, `Q-TOPUP-008`, `Q-TOPUP-009`
- Own-account transfer (5): `Q-TRF-001`, `Q-TRF-002`, `Q-TRF-003`, `Q-TRF-005`, `Q-TRF-006`
- Withdraw (10): `Q-WD-001`, `Q-WD-002`, `Q-WD-003`, `Q-WD-004`, `Q-WD-005`, `Q-WD-007`, `Q-WD-009`, `Q-WD-010`, `Q-WD-013`, `Q-WD-014`

The remaining 20 backend-gating P1 questions and all later gates remain mandatory according to their `required_by` value in the manifest.

## Answering protocol

For every owner answer:

1. Include the exact `Q-*` ID.
2. State the approved behavior explicitly; an option label alone is insufficient if constraints or exceptions apply.
3. Include limits, timing, statuses, failure behavior, and operational ownership where relevant.
4. Do not treat the answer as implemented until product, backend, and operational follow-up tasks are separately accepted.
5. Update the human-readable and JSON representations together in a dedicated decision-recording change, then run discovery validation.

If no explicit owner answer exists, the status remains `UNANSWERED`.
