# Cashello

## Status

Frontend/mobile/web prototype. `main` is the canonical branch.

No production backend is integrated. Balances, transactions, and financial flows are prototype/mock unless source code proves otherwise (`src/prototype/config.ts`: `realMoney: false`, `realBackend: false`).

## Stack

| Component | Version |
|-----------|---------|
| Expo | ~57.0.15 |
| React Native | 0.86.2 |
| React | 19.2.3 |
| TypeScript | ~6.0.3 |
| Expo Router | ~57.0.15 |
| Zustand | ^5.0.15 |
| AsyncStorage | 2.2.0 |
| Reanimated | 4.5.1 |
| React Native SVG | 15.15.4 |
| React Native Web | ~0.21.0 |
| Expo Blur | ~57.0.2 |
| react-native-qrcode-svg | ^6.3.21 |
| Jest / jest-expo | ^29.7.0 / ^57.0.4 |
| ESLint | ^9.39.5 |
| Prettier | ^3.9.6 |
| EAS CLI | >= 16.0.0 (see `eas.json`) |

**Node:** >= 22.13.0 (`package.json` engines)  
**Package manager:** npm (`package-lock.json`, lockfileVersion 3)  
**Routing:** Expo Router file-based (`src/app/**`)  
**State:** Zustand (1 persisted store + 10 ephemeral feature stores)  
**Persistence:** AsyncStorage key `@paydala/mock-state` (`src/state/store.ts`)  
**Platforms:** Web, Android, iOS

## Platforms

- Web (`npm run web`)
- Android (`npm run android` / EAS preview APK)
- iOS (`npm run ios` / EAS preview)

## Current frontend

Implemented prototype modules (legacy UI under `/legacy/**`):

- Auth / onboarding (mock state machine)
- Home (guest + authorized modes)
- Accounts (multi-currency list/detail)
- Card (PayDala card view, limits, PIN)
- History (operations list, detail, receipt)
- Top-up (between accounts, external card, cash desk)
- Withdraw (card, phone, cash, Cashhello user)
- Payment catalog (bookmakers, MFO, digital)
- QR receive
- Profile / KYC status screens
- Search
- Dev foundation screen (`/dev/foundation`)

## Backend status

No production backend is currently integrated.

See backend handoff docs:

- [docs/backend/BACKEND_HANDOFF.md](docs/backend/BACKEND_HANDOFF.md)
- [docs/backend/API_INTEGRATION_MAP.md](docs/backend/API_INTEGRATION_MAP.md)

## Run

```bash
npm install
npm run dev          # expo start
npm run web          # web
npm run android      # android
npm run ios          # ios
npm run typecheck    # tsc --noEmit
npm run lint         # expo lint
npm run reset-demo   # reset persisted mock state
```

## Tests

```bash
npm test -- --runInBand
```

Current baseline: **18 test suites**, **125 tests** (`src/**/*.test.ts`).

## Backend handoff

Start here before implementing backend APIs:

- [BACKEND_HANDOFF.md](docs/backend/BACKEND_HANDOFF.md) — architecture, mock state, domain contracts, integration guidance
- [API_INTEGRATION_MAP.md](docs/backend/API_INTEGRATION_MAP.md) — feature-by-feature API capability map

## Design handoff

Start here before editing screens or visual behavior:

- [FIGMA_HANDOFF.md](docs/design/FIGMA_HANDOFF.md) — owner-approved Figma audit, screen/route mapping, component and token reference

## Business process discovery

- [AI_HANDOFF_INDEX.md](docs/business/discovery/AI_HANDOFF_INDEX.md) — screen, action, flow, screenshot, and owner-question inventory
