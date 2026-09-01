# Cashello owner decisions pending

Updated after handoff closure audit **2026-09-01**. Resolved decisions: [OWNER_DECISIONS_RESOLVED.md](./OWNER_DECISIONS_RESOLVED.md). Machine-readable answers in [owner_questions.json](./discovery/manifests/owner_questions.json).

## Current snapshot (post Phase C)

| Status | Count |
| --- | ---: |
| Total questions | 130 |
| ANSWERED | 15 |
| PARKED_ILYA | 11 |
| FUTURE | 4 |
| LATER | 1 |
| N/A | 2 |
| UNANSWERED | 97 |

## Still required before backend (unanswered P0/P1)

97 questions remain `UNANSWERED`. Highest-impact open areas:

- **Auth details** — OTP timing, PIN policy, lockout (Q-AUTH-003–009, Q-AUTH-011–012)
- **Top-up/withdraw operations** — settlement timing, error codes, provider rules (Q-TOPUP-002–007, Q-WD-*)
- **Payments** — field validation, receipt rules (Q-PAY-002, Q-PAY-004–012)
- **History** — cancel/repeat policy (Q-HIST-*)
- **Errors** — provider outcome matrix (Q-ERR-*)
- **P2P** — remaining non-parked items (Q-P2P-004, Q-P2P-007–008)

**PARKED_ILYA items must not be implemented** until owner resolves — see resolved ledger.

## Decision gates (unchanged structure)

- Before backend: unanswered `REQUIRED_BEFORE_BACKEND` items still block full production rules
- Before production: `REQUIRED_BEFORE_PRODUCTION` items
- Can decide later: `CAN_DECIDE_LATER` items

## Answering protocol

1. Include exact `Q-*` ID
2. State approved behavior explicitly
3. Update both [OWNER_QUESTIONNAIRE.md](./discovery/OWNER_QUESTIONNAIRE.md) status columns and [owner_questions.json](./discovery/manifests/owner_questions.json)
4. Run `node docs/business/discovery/tools/validate-discovery.js`

Do not treat prototype UI values as approved while related questions remain unanswered.
