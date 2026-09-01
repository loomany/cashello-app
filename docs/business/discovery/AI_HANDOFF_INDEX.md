# Cashello business process discovery — AI handoff index

If you are an AI agent working on Cashello, start here.

This package is a **current-product discovery**, not a final business specification. Never promote `CURRENT_MOCK_BEHAVIOR` or `PROTOTYPE_UI_ONLY` values into production rules without an owner answer.

Audited `main` SHA: `0c79651ebd6be0c77078e18e031587aaebe08a4a` (GitHub `loomany/cashello-app`).

## Source-of-truth order

1. Current user-approved business decisions
2. `BUSINESS_PROCESS_SPEC.md` (future; intentionally absent)
3. `BUSINESS_RULES.md` (future; intentionally absent)
4. [Screen/action manifests](./manifests/)
5. [Backend handoff](../../backend/BACKEND_HANDOFF.md)
6. [Figma handoff](../../design/FIGMA_HANDOFF.md)
7. Source code

## Discovery artifacts

- [Product screen catalog](./PRODUCT_SCREEN_CATALOG.md)
- [UI action catalog](./UI_ACTION_CATALOG.md)
- [Current flow map](./CURRENT_FLOW_MAP.md)
- [Business process candidates](./BUSINESS_PROCESS_CANDIDATES.md)
- [Owner questionnaire](./OWNER_QUESTIONNAIRE.md)
- [Coverage report](./COVERAGE_REPORT.md)
- [screens.json](./manifests/screens.json)
- [actions.json](./manifests/actions.json)
- [flows.json](./manifests/flows.json)
- [owner_questions.json](./manifests/owner_questions.json)
- [Annotated screenshots](./screenshots/annotated/)

## Lookup examples

- Find `HOME-001` → search [screens.json](./manifests/screens.json), then open its screenshot/route/actions.
- Find `ACT-HOME-001-03` → search [actions.json](./manifests/actions.json) for control, destination, handler and owner dependencies.
- Find `Q-WD-007` → search [owner_questions.json](./manifests/owner_questions.json) for the unresolved decision and affected flows.
- Find `BP-WD-001` → search [flows.json](./manifests/flows.json), then follow screen/action/question IDs.
- Find `CAS-SUPPORT-002` / `ACT-GLOBAL-SUPPORT-01` → global headset FAB on every `/legacy/*` screen.

## Classification rules

- `FIGMA_FACT`: observed in approved file `RbjNBmxd2FERlisMJoru3I`.
- `CURRENT_CODE_FACT`: directly implemented/declared.
- `CURRENT_RUNTIME_FACT`: exercised in the local web app.
- `CURRENT_MOCK_BEHAVIOR`: local simulated effect.
- `PROTOTYPE_UI_ONLY`: copy/value/timer not approved as a business rule.
- `TECHNICAL_RECOMMENDATION`: implementation guidance, never owner policy.
- `OWNER_DECISION_REQUIRED`: unresolved product/business behavior.
- `UNKNOWN`: insufficient evidence.

## High-risk prototype facts

- `prototypeConfig.realMoney=false` and `realBackend=false`.
- 30 ₸, 1000–1970 ₸, 1500 ₸, 8000 ₸, 900 ms, 700 ms and 3 seconds are prototype-only values.
- Money/history/catalog models are local and not a production ledger.
- Figma covers only HOME-001 plus components/one withdraw method row.

## Reconciled product baseline

- **Product SHA:** `86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134` (owner visual pass VIS2 — home payment navigation)
- **Previous baseline:** `dbb0acd38228321e7e3dd0132974bbcf294a878c`
- Home segmented navigation: `Последние | Все | История`
- Authorized `Последние`: 4 recent-operation rows; 2% bonus display preserved
- Guest `+500 Б` registration row preserved
- `LGC-SCR-026` retired; `/legacy/home?historyLink=filter` is compatibility alias of `LGC-SCR-025`
- Logical screens: **93**; actions: **425**; business processes: **22**
- Delta record: [2026-09-01 home payment navigation](../changes/2026-09-01-home-payment-navigation.md)
- Delta records: [2026-09-01 director visual delta](../changes/2026-09-01-director-visual-delta.md), [2026-09-01 recent operations bonus](../changes/2026-09-01-recent-operations-bonus.md)
