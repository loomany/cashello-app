# Cashello AI handoff

This is the canonical repository entrypoint for AI agents working with Cashello business behavior.

- Repository: [loomany/cashello-app](https://github.com/loomany/cashello-app)
- Canonical branch: `main`
- Packaging start: `176408dfcb16b0583ef7620ae179d2461890ae4a`
- Discovery evidence baseline: `cd991994caf961b7182ae9839791ba558a4593a3`

The application is a frontend prototype with mock financial behavior and no production backend. This handoff package describes observed behavior; it is not a final business specification.

## Read in this order

1. **[Talgat handoff](../backend/TALGAT_HANDOFF.md)** — single backend entry point (NEW app only, audit 2026-09-01).
2. **[NEW app route map](./NEW_APP_ROUTE_MAP.md)** · **[NEW app screen catalog](./NEW_APP_SCREEN_CATALOG.md)** · **[NEW app action catalog](./NEW_APP_ACTION_CATALOG.md)** — current product from source code.
3. [Owner decisions resolved](./OWNER_DECISIONS_RESOLVED.md) — approved answers from Phase C audit.
4. [Owner decisions pending](./OWNER_DECISIONS_PENDING.md) — remaining unanswered questions.
5. [Business rules](./BUSINESS_RULES.md) and [Business process spec](./BUSINESS_PROCESS_SPEC.md) — approved rules and processes (NEW-* IDs).
6. [Screen API matrix](../backend/SCREEN_API_MATRIX.md) — screen → API mapping (no screenshot evidence).
7. [Old Cashhello purge report](./OLD_CASHHELLO_PURGE_REPORT.md) — what is historical vs current.

**Historical only (do not use for backend):** [discovery/PRODUCT_SCREEN_CATALOG.md](./discovery/PRODUCT_SCREEN_CATALOG.md), [discovery/UI_ACTION_CATALOG.md](./discovery/UI_ACTION_CATALOG.md), [discovery/CURRENT_FLOW_MAP.md](./discovery/CURRENT_FLOW_MAP.md), [discovery/manifests/screens.json](./discovery/manifests/screens.json). Previous annotated screenshots were **deleted** and are not evidence.

For implementation-specific context, also consult [backend handoff](../backend/BACKEND_HANDOFF.md), [API integration map](../backend/API_INTEGRATION_MAP.md), and [Figma handoff](../design/FIGMA_HANDOFF.md).

## Source-of-truth order

1. **Current app entry** — `/` → `/legacy/home?guest=1` (`src/app/index.tsx`, `publicRoot.ts`)
2. **Reachable navigation** from entry (see NEW_APP_ROUTE_MAP)
3. **`src/**` implementation**
4. Explicit owner-approved business decisions
5. NEW_APP_* catalogs and BUSINESS_PROCESS_SPEC
6. Historical discovery manifests (reconciliation only — not evidence)

Previous Cashhello screenshots are **NOT** a source of truth. They were intentionally removed.

Current mock behavior, UI copy, delays, amounts, fees, limits, statuses, and static rates are evidence about the prototype only. They are not production rules unless the owner explicitly approves them.

## Stable-ID lookup

**Use NEW-* IDs for current handoff:**

- [NEW_APP_SCREEN_CATALOG.json](./NEW_APP_SCREEN_CATALOG.json) — `NEW-HOME-001`, `NEW-AUTH-*`, `NEW-PAY-*`, etc.
- [NEW_APP_ACTION_CATALOG.json](./NEW_APP_ACTION_CATALOG.json) — `NEW-ACT-*`
- [BUSINESS_PROCESS_SPEC.json](./BUSINESS_PROCESS_SPEC.json) — `BP-*`
- [owner_questions.json](./discovery/manifests/owner_questions.json) — `Q-*`

Legacy CAS-/LGC-/ACT-* IDs in discovery manifests are **historical only**.

## AI working rules

- Preserve evidence labels such as `CURRENT_CODE_FACT`, `CURRENT_RUNTIME_FACT`, `CURRENT_MOCK_BEHAVIOR`, `PROTOTYPE_UI_ONLY`, `OWNER_DECISION_REQUIRED`, and `UNKNOWN`.
- If an affected `Q-*` item is unanswered, report the decision dependency and do not invent a business rule.
- Keep technical recommendations separate from owner policy.
- Treat local balances, history, timers, provider outcomes, QR payloads, and financial flows as prototype data unless stronger evidence exists.
- Use the coverage report before claiming that a screen or interaction state was runtime-validated.

## Package snapshot

The discovery package records 93 logical screens, 425 actions, 22 business process candidates, and 130 owner questions. After handoff audit 2026-09-01: **15 answered**, **11 PARKED_ILYA**, **97 UNANSWERED** — see [Owner decisions resolved](./OWNER_DECISIONS_RESOLVED.md).

## Validation

Run the repository validator after changing discovery documents or manifests:

```bash
node docs/business/discovery/tools/validate-discovery.js
```

It validates JSON parsing, stable-ID uniqueness and cross-references, screenshot references, and relative links in the discovery package.

## Reconciled product baseline

- **Product SHA:** `86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134` (owner visual pass VIS2 — home payment navigation)
- **Previous baseline:** `dbb0acd38228321e7e3dd0132974bbcf294a878c`
- Home segmented navigation: `Последние | Все | История`
- Authorized `Последние`: 4 recent-operation rows; 2% bonus display preserved
- Guest `+500 Б` registration row preserved
- `LGC-SCR-026` retired; `/legacy/home?historyLink=filter` is compatibility alias of `LGC-SCR-025`
- Logical screens: **93**; actions: **425**; business processes: **22**
- Delta record: [2026-09-01 home payment navigation](../changes/2026-09-01-home-payment-navigation.md)
- Delta records: [2026-09-01 director visual delta](./changes/2026-09-01-director-visual-delta.md), [2026-09-01 recent operations bonus](./changes/2026-09-01-recent-operations-bonus.md)
