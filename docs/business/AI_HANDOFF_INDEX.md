# Cashello AI handoff

This is the canonical repository entrypoint for AI agents working with Cashello business behavior.

- Repository: [loomany/cashello-app](https://github.com/loomany/cashello-app)
- Canonical branch: `main`
- Packaging start: `176408dfcb16b0583ef7620ae179d2461890ae4a`
- Discovery evidence baseline: `cd991994caf961b7182ae9839791ba558a4593a3`

The application is a frontend prototype with mock financial behavior and no production backend. This handoff package describes observed behavior; it is not a final business specification.

## Read in this order

1. [Owner decisions pending](./OWNER_DECISIONS_PENDING.md) — unresolved decisions that must not be inferred from the prototype.
2. [Discovery handoff index](./discovery/AI_HANDOFF_INDEX.md) — evidence classes, stable-ID lookup, and discovery boundaries.
3. [Business process candidates](./discovery/BUSINESS_PROCESS_CANDIDATES.md) and [current flow map](./discovery/CURRENT_FLOW_MAP.md) — candidate processes and currently observed transitions.
4. [Product screen catalog](./discovery/PRODUCT_SCREEN_CATALOG.md) and [UI action catalog](./discovery/UI_ACTION_CATALOG.md) — screen- and control-level evidence.
5. [Owner questionnaire](./discovery/OWNER_QUESTIONNAIRE.md) — complete human-readable decision prompts.
6. [Coverage report](./discovery/COVERAGE_REPORT.md) — scope, counts, runtime coverage, and known capture gaps.

For implementation-specific context, also consult the [backend handoff](../backend/BACKEND_HANDOFF.md), [API integration map](../backend/API_INTEGRATION_MAP.md), and [Figma handoff](../design/FIGMA_HANDOFF.md).

## Source-of-truth order

1. Explicit owner-approved business decisions
2. `BUSINESS_PROCESS_SPEC.md` and `BUSINESS_RULES.md` when they exist
3. Discovery manifests and catalogs
4. Backend and design handoff documents
5. Source code and observed prototype runtime

Current mock behavior, UI copy, delays, amounts, fees, limits, statuses, and static rates are evidence about the prototype only. They are not production rules unless the owner explicitly approves them.

## Stable-ID lookup

Use the machine-readable manifests for precise lookup and cross-references:

- [screens.json](./discovery/manifests/screens.json)
- [actions.json](./discovery/manifests/actions.json)
- [flows.json](./discovery/manifests/flows.json)
- [owner_questions.json](./discovery/manifests/owner_questions.json)

Stable ID prefixes:

- `HOME-*`, `CAS-*`, `LGC-SCR-*`, `PAY-*`, `QR-*`, `WD-*` — logical screens
- `ACT-*` — UI actions
- `BP-*` — business process candidates
- `Q-*` — owner decisions

Follow IDs across manifests instead of inferring behavior from filenames or screenshots. Annotated evidence is under [screenshots/annotated](./discovery/screenshots/annotated/); states marked `CAPTURE_GAP` are not runtime-validated captures of the named state.

## AI working rules

- Preserve evidence labels such as `CURRENT_CODE_FACT`, `CURRENT_RUNTIME_FACT`, `CURRENT_MOCK_BEHAVIOR`, `PROTOTYPE_UI_ONLY`, `OWNER_DECISION_REQUIRED`, and `UNKNOWN`.
- If an affected `Q-*` item is unanswered, report the decision dependency and do not invent a business rule.
- Keep technical recommendations separate from owner policy.
- Treat local balances, history, timers, provider outcomes, QR payloads, and financial flows as prototype data unless stronger evidence exists.
- Use the coverage report before claiming that a screen or interaction state was runtime-validated.

## Package snapshot

The discovery package records 95 logical screens, 444 actions, 22 business process candidates, and 130 owner questions. Every owner question is currently `UNANSWERED`; see [Owner decisions pending](./OWNER_DECISIONS_PENDING.md) for the decision queue.

## Validation

Run the repository validator after changing discovery documents or manifests:

```bash
node docs/business/discovery/tools/validate-discovery.js
```

It validates JSON parsing, stable-ID uniqueness and cross-references, screenshot references, and relative links in the discovery package.

## Reconciled product baseline

- **Product SHA:** `597754364ada9dc1f51f62fe86b41a2bc0b24e4b` (director visual pass)
- **Pre-design SHA:** `2359692f3ded08fdea66b5ea260f485e894dfd7b`
- Home changed after original discovery; manifests/screenshots reconciled against current code.
- Figma HOME-001 frame unchanged; runtime Home sections may differ (see FIGMA_HANDOFF.md).
- Bonus +500 Б UI is prototype evidence only — owner questions remain UNANSWERED unless explicitly decided.
- Delta record: [2026-09-01 director visual delta](../changes/2026-09-01-director-visual-delta.md)
