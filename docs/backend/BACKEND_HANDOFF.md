# Cashello Backend Handoff

**Audience:** Backend developer  
**Canonical repository:** [loomany/cashello-app](https://github.com/loomany/cashello-app) — branch `main`
**Public baseline:** `75ce303c037f57d5fc50d1f3f22ade5025ac157e` (root commit of this repository)
**Method:** Read-only audit of application source code in the imported approved frontend snapshot. Private archive repository SHAs are not required to use this document.

For visual/screen behavior, see [../design/FIGMA_HANDOFF.md](../design/FIGMA_HANDOFF.md).

**Confidence labels used throughout:**

| Label | Meaning |
|-------|---------|
| `CURRENT_CODE_FACT` | Verified in current source |
| `PROTOTYPE_ONLY` | Exists for UI demo; not approved for production |
| `TECHNICAL_RECOMMENDATION` | Engineering suggestion, not product fact |
| `OWNER_DECISION_REQUIRED` | Business/product owner must decide |
| `UNKNOWN` | Not determinable from code |

---

## 1. Executive summary

Cashello (package name `paydala-app`, display name **Cashhello**) is an Expo/React Native prototype with a full legacy UI for wallet, payments, top-up, withdraw, QR, profile, and card flows. **No production backend is integrated** (`src/prototype/config.ts`: `realBackend: false`, `realMoney: false`).

The frontend currently follows:

```
SCREEN → ZUSTAND MOCK STORE → LOCAL MUTATION
```

Production integration should evolve toward:

```
SCREEN → API CLIENT / SERVICE LAYER → BACKEND API → DATABASE / LEDGER / PROVIDERS
```

**Critical facts for backend developers:**

1. **Two parallel money models** coexist and are not unified:
   - Foundation layer: minor units, IDs like `acc_kzt` (`useMockStore`, persisted)
   - Legacy UI layer: major units, IDs like `kzt-primary` (`useLegacyTopupStore.balances`, ephemeral)
2. **Two parallel transaction models** coexist:
   - Domain `Transaction[]` in `useMockStore` (dev foundation only)
   - Legacy `LegacyHistoryOp[]` in `useLegacyHistoryStore` (what Home/History actually show)
3. **Client-side balance mutations** exist for between-account transfer and withdraw; card/cash top-up append history only without crediting balances.
4. **Auth is a local state machine** — any 4-digit SMS and 6-digit PIN advance the flow; no tokens, no server validation.
5. **Business rules** (fees, limits, KYC thresholds, provider rules) are **not** defined in code as production facts — mock values are `PROTOTYPE_ONLY`.

Business process documentation is **out of scope** for this handoff.

---

## 2. Current frontend stack

`CURRENT_CODE_FACT` — from `package.json`, `app.json`, `eas.json`:

| Component | Version / detail |
|-----------|------------------|
| Expo | ~57.0.15 |
| React Native | 0.86.2 |
| React / React DOM | 19.2.3 |
| TypeScript | ~6.0.3 |
| Expo Router | ~57.0.15 (typed routes, React Compiler experiment) |
| Zustand | ^5.0.15 |
| AsyncStorage | 2.2.0 |
| Reanimated | 4.5.1 |
| React Native SVG | 15.15.4 |
| React Native Web | ~0.21.0 |
| Expo Blur | ~57.0.2 |
| react-native-qrcode-svg | ^6.3.21 |
| Jest / jest-expo | ^29.7.0 / ^57.0.4 |
| ESLint (eslint-config-expo) | ^9.39.5 / ^57.0.1 |
| Prettier | ^3.9.6 |
| Node | >= 22.13.0 |
| Package manager | npm (`package-lock.json`) |
| EAS CLI | >= 16.0.0 |
| App version | 0.1.0 |
| URL scheme | `paydala` |
| iOS bundle ID | `app.paydala.prototype` (TEMPORARY_PROTOTYPE) |
| Android package | `app.paydala.prototype` |

**Build profiles** (`eas.json`): `development` (dev client, internal APK), `preview` (internal), `production` (AAB).

**Test model:** Jest with `jest-expo` preset; 18 suites, 125 tests (`src/**/*.test.ts`).

### Temporary / legacy identifiers

| Identifier | Current value | Classification |
|------------|---------------|----------------|
| Product name (handoff) | **Cashello** | `CURRENT_CODE_FACT` — documentation/product label |
| npm package name | `paydala-app` | `TEMPORARY_PROTOTYPE` |
| Expo display name (`app.json`) | Cashhello | `TEMPORARY_PROTOTYPE` — spelling differs from handoff product name |
| URL scheme | `paydala` | `TEMPORARY_PROTOTYPE` |
| iOS bundle ID | `app.paydala.prototype` | `TEMPORARY_PROTOTYPE` |
| Android package | `app.paydala.prototype` | `TEMPORARY_PROTOTYPE` |
| AsyncStorage key | `@paydala/mock-state` | `TEMPORARY_PROTOTYPE` |
| Production store IDs / branding | — | `OWNER_DECISION_REQUIRED` |

Some source and config identifiers still originate from the prototype import. They must **not** be interpreted as approved production branding or permanent mobile identifiers. A separate owner-approved migration is required before App Store / Play Store release.

---

## 3. Current application architecture

### Routing layer

`CURRENT_CODE_FACT` — Expo Router, entry `expo-router/entry`.

- Root layout: `src/app/_layout.tsx` — hydration gate, `PrototypeErrorBoundary`, `WebViewportShell`
- App entry: `src/app/index.tsx` → redirect to `/legacy/auth`
- Route groups: `legacy/**` (58 route files), `dev/foundation`

Legacy routes are thin wrappers re-exporting screens from `src/features/**`.

### Screen / features layer

| Module | Path | Purpose |
|--------|------|---------|
| legacyAuth | `src/features/legacyAuth/` | Onboarding/auth state machine |
| legacyHome | `src/features/legacyHome/` | Home, tab bar, guest/authorized |
| legacyAccounts | `src/features/legacyAccounts/` | Account list/detail |
| legacyCard | `src/features/legacyCard/` | PayDala card UI |
| legacyHistory | `src/features/legacyHistory/` | Operations list/detail/receipt |
| legacyPayment | `src/features/legacyPayment/` | Service catalog + pay form |
| legacyProfile | `src/features/legacyProfile/` | Profile, KYC status, phone/PIN |
| legacySearch | `src/features/legacySearch/` | Search |
| legacyQr | `src/features/legacyQr/` | Receive QR |
| legacyTopup | `src/features/legacyTopup/` | Top-up flows |
| legacyWithdraw | `src/features/legacyWithdraw/` | Withdraw flows |
| legacyNavigation | `src/features/legacyNavigation/` | Safe back navigation |

### Zustand stores (11 total)

| Store | File | Persisted |
|-------|------|-----------|
| `useMockStore` | `src/state/store.ts` | Yes — AsyncStorage `@paydala/mock-state` |
| `useLegacyAuthStore` | `src/features/legacyAuth/store.ts` | No |
| `useLegacySessionStore` | `src/features/legacyHome/session.ts` | No |
| `useLegacyAccountsStore` | `src/features/legacyAccounts/store.ts` | No |
| `useLegacyCardStore` | `src/features/legacyCard/store.ts` | No |
| `useLegacyHistoryStore` | `src/features/legacyHistory/store.ts` | No |
| `useLegacyPaymentStore` | `src/features/legacyPayment/store.ts` | No |
| `useLegacyProfileStore` | `src/features/legacyProfile/store.ts` | No |
| `useLegacySearchStore` | `src/features/legacySearch/store.ts` | No |
| `useLegacyTopupStore` | `src/features/legacyTopup/store.ts` | No |
| `useLegacyWithdrawStore` | `src/features/legacyWithdraw/store.ts` | No |

### Mock / domain layer

- Domain types: `src/types/domain.ts`
- Canonical seed: `src/mocks/canonicalDemo.ts`, `src/mocks/demoServices.ts`
- Actions: `src/state/actions.ts` — `createCanonicalSnapshot()`, `applyFoundationPayment()`
- Presentation: `src/state/homePresentation.ts`
- Per-feature mock data: `src/features/*/mockData.ts` (10 files)

### Prototype / debug layer

- `src/prototype/config.ts` — build metadata, `realMoney: false`
- `src/prototype/DebugMetaHost.tsx` — triple-tap debug overlay, reset demo
- `src/prototype/WebViewportShell.tsx` — web phone frame
- `src/prototype/ErrorBoundary.tsx`
- `src/app/dev/foundation.tsx` — foundation dev screen

### Shared vs persisted state

**Persisted** (`useMockStore` partialize): `user`, `accounts`, `bonus`, `headlineKztMinor`, `paydalaCard`, `linkedCards`, `categories`, `services`, `transactions`

**Ephemeral:** all feature stores, `balancesHidden`, `selectedAccountId`, `hydrated`, session guest flag

**Reset:** `useMockStore.resetToCanonical()` resets persisted snapshot + all feature stores. Does **not** reset `useLegacySessionStore.isGuest`.

---

## 4. Module map

| Feature | Primary routes | Primary store(s) | Mock data |
|---------|---------------|------------------|-----------|
| Auth | `/legacy/auth` | `useLegacyAuthStore` | `legacyAuth/types.ts` |
| Session | (cross-cutting) | `useLegacySessionStore` | `legacyHome/session.ts` |
| Home | `/legacy/home` | session + topup balances | `legacyHome/mockData.ts` |
| Accounts | `/legacy/accounts`, `/legacy/accounts/[id]` | `useLegacyAccountsStore`, topup balances | `legacyAccounts/mockData.ts` |
| Card | `/legacy/card`, limits, pin | `useLegacyCardStore` | `legacyCard/mockData.ts` |
| History | `/legacy/history/**` | `useLegacyHistoryStore` | `legacyHistory/mockData.ts` |
| Top-up | `/legacy/topup/**` | `useLegacyTopupStore` | `legacyTopup/mockData.ts` |
| Withdraw | `/legacy/withdraw/**` | `useLegacyWithdrawStore` | `legacyWithdraw/mockData.ts` |
| Payment | `/legacy/payment`, `/legacy/payment/[id]` | `useLegacyPaymentStore` | `legacyPayment/mockData.ts` |
| QR | `/legacy/qr` | (local component state) | `legacyQr/mockData.ts` |
| Profile | `/legacy/profile/**`, messages, help | `useLegacyProfileStore` | `legacyProfile/mockData.ts` |
| Search | `/legacy/search` | `useLegacySearchStore` | `legacySearch/mockData.ts` |
| Foundation | `/dev/foundation` | `useMockStore` | `mocks/canonicalDemo.ts` |

---

## 5. Current data / domain shapes

Source: `src/types/domain.ts`, feature `mockData.ts` files.

### UserProfile

| Field | Classification |
|-------|---------------|
| `id`, `displayName`, `phone`, `email`, `city` | `LIKELY_BACKEND_FIELD` |
| `verificationStatus: 'LIGHT' \| 'FULL'` | `PROTOTYPE_ONLY` enum — `BACKEND_DECISION_REQUIRED` for production tiers |

### WalletAccount

| Field | Classification |
|-------|---------------|
| `id` | `CURRENT_UI_REQUIRED` (foundation); legacy uses different IDs |
| `currency: 'KZT' \| 'USD' \| 'RUB'` | `CURRENT_UI_REQUIRED` |
| `availableMinor` | `LIKELY_BACKEND_FIELD` — integer minor units |

Foundation IDs (`CURRENT_CODE_FACT`, `mocks/canonicalDemo.ts`): `acc_kzt`, `acc_rub`, `acc_usd`.

Legacy IDs (`CURRENT_CODE_FACT`, `legacyTopup/mockData.ts`): `kzt-primary`, `rub`, `usd`, `bonus`.

### BonusAccount

| Field | Classification |
|-------|---------------|
| `id: 'acc_bonus'` | `CURRENT_UI_REQUIRED` (foundation) |
| `balanceMinor` | `LIKELY_BACKEND_FIELD` |

Legacy bonus key: `bonus` (major units). Header chip shows hardcoded `500 Б` (`legacyHome/copy.ts`) — `CURRENT_MOCK_ONLY`.

### PayDalaCard / LinkedBankCard

| Field | Classification |
|-------|---------------|
| `last4`, `expiry`, `status` | `CURRENT_UI_REQUIRED` |
| Full PAN/CVV | **Never stored** — legacy card shows masks only (`**** **** **** 2343`) |
| `boundAccountId` | `LIKELY_BACKEND_FIELD` |

### ServiceCategory / CatalogService

Foundation catalog in `useMockStore` (`demoServices.ts`). Legacy payment uses separate static `PAYMENT_SECTIONS` in `legacyPayment/mockData.ts` — **not unified**.

| Field | Classification |
|-------|---------------|
| `name`, category | `CURRENT_UI_REQUIRED` |
| `mockEconomics.percent/caption` | `CURRENT_MOCK_ONLY` — `OWNER_DECISION_REQUIRED` |
| `feeMinor`, `cashbackMinor` | `LIKELY_BACKEND_FIELD` when approved |

### Transaction (domain)

| Field | Classification |
|-------|---------------|
| `type` (7 enum values) | `PROTOTYPE_ONLY` — `BACKEND_DECISION_REQUIRED` |
| `status` (6 enum values) | `PROTOTYPE_ONLY` — comment in code: "Not production ledger enums" |
| `amountMinor` (signed) | `LIKELY_BACKEND_FIELD` |
| `title`, `subtitle`, `createdAt` | `CURRENT_UI_REQUIRED` (presentation) |

### LegacyHistoryOp (actual UI ledger)

Defined in `src/features/legacyHistory/mockData.ts`. Rich receipt fields: `kind`, `listStatus` (Russian strings), `direction`, `fee`, `receiptNumber`, `cancellable`, `receiptEligible`, etc. All `UI_OBSERVED` / `PROTOTYPE_ONLY`.

---

## 6. Mock state architecture

### Foundation persisted store

`useMockStore` (`src/state/store.ts`):
- Storage: AsyncStorage `@paydala/mock-state`, version 3
- Migrate always returns `createCanonicalSnapshot()`
- Only used by `/dev/foundation` and tests for domain model — **not wired to legacy Home UI**

### Legacy runtime balances

`useLegacyTopupStore.balances` (`src/features/legacyTopup/mockData.ts` → `CANONICAL_BALANCES`):

```
kzt-primary: 234888, rub: 43900, usd: 123, bonus: 500
```

Major units (whole currency display values, not minor). Label in code: "MOCK STATE ONLY / NO LEDGER".

### History operations

`useLegacyHistoryStore.operations` — seeded from `CANONICAL_HISTORY`, appended by topup/withdraw flows. Not synced with domain `transactions[]`.

### FX conversion (between accounts only)

`applyMockTransfer()` uses NBK pivot rates (`NBK_KZT_PER_USD`, `NBK_KZT_PER_RUB`) in `legacyTopup/mockData.ts` — `PROTOTYPE_ONLY`, display-only.

---

## 7. Authentication / session frontend contract

### Current UI contract (`CURRENT_CODE_FACT`)

**Guest mode:**
- Enabled via `?guest=1` on home or `useLegacySessionStore.enterGuest()`
- Source: `src/features/legacyHome/session.ts`, `src/app/legacy/home.tsx`
- Balances shown as zero (`guestBalanceLabel()`)
- Financial actions gated → `/legacy/auth?qaStep=iin`

**Authorized mode:**
- Set by `enterAuthorized()` after auth complete or visiting `/legacy/home` without guest param
- Source: `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyHome/HomeScreen.tsx`
- Also resets topup balances to canonical on authorized home mount

**Auth state machine** (`src/features/legacyAuth/machine.ts`):

Default path: `splash → iin (phone entry) → verification (SMS) → pinCreate → pinRepeat → complete`

| Step | Validation |
|------|-----------|
| Phone (`iin` step — misnamed, no IIN field) | 10 national digits |
| SMS verification | Any 4 digits auto-advances |
| PIN create/repeat | 6 digits; repeat must match session |
| PIN login (returning user) | Any 6 digits → complete; **no UI entry point** |

Extended KYC path exists (face, document capture) — mock camera taps only, reachable via debug jumps.

**Logout** (`src/features/legacyProfile/ProfileScreen.tsx`): resets auth store, `enterGuest()`, navigates to guest home. Mock balances **preserved**.

### Real backend auth recommendation (`TECHNICAL_RECOMMENDATION`)

- Do **not** treat current mock auth as secure or production-ready
- Replace local state machine transitions with async API calls
- Persist session tokens securely (Keychain/Keystore)
- Gate `enterAuthorized()` on valid server session
- Unify auth `phoneDigits`, profile identity, and `useMockStore.user` on login
- KYC steps need real provider integration — `OWNER_DECISION_REQUIRED`

---

## 8. Account / balance frontend contract

### Currencies

`CURRENT_CODE_FACT`: KZT, USD, RUB (+ BONUS points as separate unit).

### Balance representation

| Layer | Units | Example |
|-------|-------|---------|
| Foundation | Minor (÷100) | `115_000_000` → 1 150 000.00 ₸ |
| Legacy UI | Major (whole) | `234888` → "234 888 ₸" |

### Selected account

- Foundation: `selectedAccountId` in `useMockStore` — dev only
- Legacy: `primaryAccountId` in `useLegacyAccountsStore` (default `kzt-primary`)
- Home carousel: local `accountIndex` state in `HomeScreen.tsx`

### Client-side balance mutations (`CURRENT_CODE_FACT`)

| Location | Function | Effect |
|----------|----------|--------|
| `src/state/actions.ts` | `applyFoundationPayment()` | Debits `acc_kzt`, credits bonus (minor units) |
| `src/features/legacyTopup/mockData.ts` | `applyMockTransfer()` | Between-accounts debit/credit (major units) |
| `src/features/legacyTopup/store.ts` | `confirmBetween()` | Calls applyMockTransfer + history append |
| `src/features/legacyWithdraw/store.ts` | `confirmAndSettle('success')` | Debits legacy balance |
| `src/features/legacyTopup/store.ts` | `confirmCardTopUp()` | History only — **no balance credit** |
| `src/features/legacyTopup/store.ts` | `confirmCashDesk()` | History only — **no balance credit** |

### Production recommendation (`TECHNICAL_RECOMMENDATION`)

**Backend must be authoritative for balances.** Client must never be the final source of truth for real-money balance changes. Use integer minor units server-side. Client displays cached presentation data only.

---

## 9. History / transaction frontend contract

### Domain transactions (`PROTOTYPE_ONLY`)

Types: `top_up`, `withdrawal`, `p2p`, `bookmaker_payout`, `service_payment`, `cashback`, `currency_conversion`

Statuses: `pending`, `processing`, `success`, `failed`, `rejected`, `ready_for_pickup`

Only mutated by `applyFoundationPayment()` in dev — not by legacy flows.

### Legacy history (`UI_OBSERVED`)

Kinds: `withdrawal`, `topup`, `transfer`, `cash_pickup`, `phone`, `card`

List statuses (Russian): `В обработке`, `Отклонено`, `Готов к выдаче`, `Успешно`

Detail status for cash: `Готово к выдаче` (differs from list label)

### Transaction creation points

**Domain `Transaction[]`:**
1. Seed in `mocks/canonicalDemo.ts`
2. `applyFoundationPayment()` in `state/actions.ts`

**Legacy `LegacyHistoryOp[]`:**
1. Seed in `legacyHistory/mockData.ts`
2. `confirmBetween()` — transfer
3. `confirmCardTopUp()` — topup (amount hardcoded 1500)
4. `confirmCashDesk()` — topup pending (amount hardcoded 8000)
5. `confirmAndSettle()` — withdraw variants
6. `cancelOperation()` — status → `Отклонено` only; **no balance restore**

### Receipt assumptions (`PROTOTYPE_ONLY`)

- Default fee in `appendOperation`: 30 ₸
- Synthetic payer: `Керейдин А.Е.`
- Receipt share/download are `Alert` stubs
- Cancel does not reverse balance debits

**Do not map TypeScript prototype enums directly to production ledger enums** — mark as `BACKEND_DECISION_REQUIRED`.

---

## 10. Top-up frontend contract

### Flows

| Flow | Route | Store action | Balance effect |
|------|-------|-------------|----------------|
| Between accounts | `/legacy/topup/between` | `confirmBetween()` | Debits/credits via FX |
| External card | `/legacy/topup/card` | `confirmCardTopUp()` | None (history only, amount 1500) |
| Cash desk | `/legacy/topup/cash-map` | `confirmCashDesk()` | None (history only, amount 8000, pending) |

Entry: Home sheet, account detail method sheet. Cash route exists but removed from method sheet UI.

### Mock values (`PROTOTYPE_ONLY`)

- External card: synthetic PAN auto-fill, saved cards from `legacyWithdraw/mockData.ts`
- Cash desks: `CASH_DESKS` shared with withdraw
- NBK FX rates for between-accounts — not production approved

---

## 11. Withdraw frontend contract

### Flows

| Method | Route | Settlement |
|--------|-------|-----------|
| Card | `/legacy/withdraw/card` | 3s timer → success → debit + history |
| Phone | `/legacy/withdraw/phone` | Same pattern |
| Cashhello user | `/legacy/withdraw/cashhello-user` | Same (P2P-style) |
| Cash pickup | `/legacy/withdraw/cash` → map → amount → loading | Amount band 1000–1970, fee display |

### Mock limits/fees (`PROTOTYPE_ONLY` — `NOT PRODUCTION APPROVED`)

From `src/features/legacyWithdraw/mockData.ts`:
- `MOCK_FEE_KZT`: 30
- `MOCK_MIN_KZT`: 1000
- `MOCK_MAX_KZT`: 1970 (cash only)

Card/phone/user: any amount > 0 accepted.

Fee displayed but **not deducted** from balance.

Cash success sets `direction: 'in'` (quirk) vs `'out'` for others.

Loading screen scenarios via `?scenario=error|processing`.

---

## 12. Payment catalog frontend contract

Static catalog in `src/features/legacyPayment/mockData.ts`:
- Categories: bookmakers, digital, MFO
- Services with availability flags, logos, commission/bonus subtitles
- Favorites: in-memory Zustand toggle (seed: ubet, zaimer)

Pay action (`PaymentServiceScreen.tsx`): 900ms timeout + Alert — **no balance debit, no history append**.

Guest gates: favorite toggle, account picker, pay button.

### API separation recommendation (`TECHNICAL_RECOMMENDATION`)

- Catalog read API (categories, services, availability)
- Service detail API
- Payment command API (initiate, poll status)
- Favorites sync API (if server-persisted)

---

## 13. QR frontend contract

`CURRENT_CODE_FACT` — `src/features/legacyQr/mockData.ts`:

```typescript
buildReceiveQrPayload(amountKzt: number): string
// → `cashhello://pay?amount=${amountKzt}&currency=KZT`
```

**Local draft only.** No server registration, no recipient ID, expiry, or signature.

Guest blocked at generate.

### Production decisions required (`BACKEND_DECISION_REQUIRED`)

- Payment intent model
- Token/ID format
- Expiry policy
- Recipient binding
- Signature/security
- One-time vs reusable QR behavior

**Do not blindly use `cashhello://pay` payload in production.**

---

## 14. Profile / KYC frontend contract

### UI fields (`CURRENT_CODE_FACT`)

Synthetic identity (`legacyProfile/mockData.ts`):
- `displayName`, `fullName`, `documentNumber`, `birthDate`, `phoneDigits: 7777777777`

KYC status: hardcoded "Неидентифицированный", 25% progress — copy only, not store-driven.

Limits screen shows static `12 975 ₸` for all tiers — `PROTOTYPE_ONLY`.

Change phone: SMS code must be `0000` (`DEMO_CHANGE_PHONE_SMS`).

Messages: 4 static withdrawal notifications.

Promo code: Alert stub.

### Frontend-required data (for API design)

- Phone number (display + change with OTP)
- Full name, document number, birth date (read display)
- KYC/identification tier + limits
- Push notification preference
- App PIN (separate from auth registration PIN in current prototype)

**Do not assume production KYC provider** — `OWNER_DECISION_REQUIRED`.

---

## 15. Card frontend contract

Synthetic card (`legacyCard/mockData.ts`):
- PAN mask: `**** **** **** 2343`
- Holder: `ТАНИРБЕРГЕН И.А.`
- Expiry: `03/24`, CVV mask: `***`

Actions (all local):
- Show/hide CVV (UI face toggle)
- Block card (sets `blocked: true`, no visual change)
- Limits (local cap, presets 10k–500k)
- PIN change (3-phase, old PIN not validated)
- Apple/Google Pay (tap flags only)

### Security recommendation (`TECHNICAL_RECOMMENDATION`)

Sensitive payment card data should be tokenized/provider-owned. Do not store full PAN/CVV in app or backend.

---

## 16. Backend replacement points

Summary table — see `API_INTEGRATION_MAP.md` for full capability map.

| Feature | File | Current local behavior | Backend must provide | Risk |
|---------|------|----------------------|---------------------|------|
| Auth SMS | `legacyAuth/machine.ts` | Any 4 digits accepted | OTP send/verify | HIGH — no real auth |
| Auth PIN | `legacyAuth/machine.ts` | Local 6-digit, not persisted | Secure PIN hash/verify | HIGH |
| Session | `legacyHome/session.ts` | Boolean `isGuest` | Token session | HIGH |
| Balances display | `legacyTopup/store.ts` | Local major-unit record | Authoritative balance API | HIGH — dual models |
| Between transfer | `legacyTopup/store.ts` | Local FX + debit/credit | Transfer command + ledger | HIGH |
| Card topup | `legacyTopup/store.ts` | History only | Topup provider + credit | MEDIUM |
| Cash topup | `legacyTopup/store.ts` | Pending history only | Cash desk integration | MEDIUM |
| Withdraw | `legacyWithdraw/store.ts` | Local debit + history | Withdraw command + provider | HIGH |
| Payment | `PaymentServiceScreen.tsx` | Alert only | Payment initiation | HIGH |
| QR | `legacyQr/mockData.ts` | Client-built URL | Payment intent API | HIGH |
| Catalog | `legacyPayment/mockData.ts` | Static array | Catalog API | LOW |
| Favorites | `legacyPayment/store.ts` | In-memory | User favorites API | LOW |
| Profile | `legacyProfile/store.ts` | Static identity | User/me API | MEDIUM |
| KYC status | Profile screens | Hardcoded copy | KYC status API | MEDIUM |
| Card details | `legacyCard/mockData.ts` | Static demo | Issuer token API | HIGH — PCI |
| History | `legacyHistory/store.ts` | Local append | Transaction query API | HIGH |
| Cancel op | `legacyHistory/store.ts` | Status change only | Cancel/reversal API | MEDIUM |

---

## 17. Recommended frontend / backend boundary

`TECHNICAL_RECOMMENDATION`

### Zustand may remain for:
- Ephemeral UI state (selected tabs, form drafts, sheet open/close)
- Cached presentation data (with TTL/invalidation)
- Optimistic UI with server reconciliation

### Zustand must NOT be authoritative for:
- Real-money balances
- Transaction ledger
- Auth session/tokens
- KYC status
- Payment/withdraw settlement state

### Recommended API client structure (do not implement yet)

```
src/api/client.ts       — base HTTP client, auth headers, error handling
src/api/auth.ts
src/api/accounts.ts
src/api/history.ts
src/api/topup.ts
src/api/withdraw.ts
src/api/payments.ts
src/api/profile.ts
src/api/qr.ts
```

Each module wraps backend endpoints; stores call API modules instead of local mutators.

---

## 18. Recommended backend architecture

`TECHNICAL_RECOMMENDATION — NOT CURRENT PRODUCT FACTS`

### Suggested domain modules

- Auth
- Users
- KYC
- Wallet Accounts
- Ledger
- Transactions
- Topups
- Withdrawals
- Payments / Service Catalog
- QR / Payment Intents
- Cards / Tokens
- Notifications

### Cross-cutting concerns

| Concern | Recommendation |
|---------|---------------|
| API versioning | URL prefix (`/v1/`) or header; plan breaking changes |
| Authentication | JWT or opaque tokens + refresh; secure storage on client |
| Authorization | User-scoped resources; account ownership checks |
| Database | Relational for ledger integrity; document store for catalog if needed |
| Ledger | Append-only entries; balance derived from entries |
| Money representation | Integer minor units only; never float |
| Idempotency | `Idempotency-Key` header on all financial commands |
| Transactions / locking | DB transactions for balance updates; row-level locks |
| Audit log | Immutable event log for all money movements |
| Webhooks | Idempotent provider webhook processing |
| Provider adapters | Isolate PSP, KYC, SMS, card issuer behind interfaces |
| Background jobs | Async settlement, webhook retry, notification dispatch |
| Rate limiting | Per-user and per-IP on auth and financial endpoints |
| Observability | Structured logging, metrics, tracing on payment paths |
| Error codes | Machine-readable codes + human messages |
| API validation | Request schema validation at boundary |
| Secrets | Vault/KMS; never in client bundle |
| PCI boundaries | Tokenize card data; app never sees full PAN/CVV |

Backend stack choice is `OWNER_DECISION_REQUIRED` unless already decided.

---

## 19. Financial safety requirements

`TECHNICAL_RECOMMENDATION`

1. Use **integer minor units** for all real money — never floating-point in ledger
2. Balance must be **derived/controlled server-side**
3. Financial commands must support **idempotency keys**
4. Critical state transitions must be **transactional** (DB ACID)
5. Provider webhook processing must be **idempotent**
6. **Client success screen is NOT proof** that money movement succeeded — confirm via server state / polling / push
7. Unify the two current frontend money models before production
8. Cancel/reversal must restore or offset ledger entries — current client cancel does not

---

## 20. Security considerations

| Area | Current state | Production requirement |
|------|--------------|----------------------|
| Auth | Local boolean + mock OTP/PIN | Real authentication, lockout, secure PIN storage |
| Session | In-memory, lost on restart | Persistent secure session with expiry |
| Balances | Client-mutable | Server authoritative |
| Card data | Masks only (good) | Tokenization via issuer/PSP |
| QR | Unsigned client URL | Signed, expiring payment intents |
| Guest gating | Partial (some routes ungated) | Consistent auth middleware |
| Debug overlay | Triple-tap reset in prototype | Disabled in production builds |
| AsyncStorage | Mock domain snapshot | No secrets in AsyncStorage |

---

## 21. Unknowns / owner decisions

| Topic | Status |
|-------|--------|
| Commission rates | `OWNER_DECISION_REQUIRED` — mock values in UI only |
| Withdraw limits/fees | `OWNER_DECISION_REQUIRED` — MOCK_MIN/MAX/Fee in code |
| KYC tiers and thresholds | `OWNER_DECISION_REQUIRED` |
| KYC provider | `OWNER_DECISION_REQUIRED` |
| Payment provider rules | `OWNER_DECISION_REQUIRED` |
| Cash pickup policy | `OWNER_DECISION_REQUIRED` |
| Currency conversion model | `OWNER_DECISION_REQUIRED` — NBK pivot is prototype |
| Bonus economics | `OWNER_DECISION_REQUIRED` |
| Bookmaker/MFO rules | `OWNER_DECISION_REQUIRED` |
| AML/refund rules | `OWNER_DECISION_REQUIRED` |
| Production QR format | `BACKEND_DECISION_REQUIRED` |
| Production ledger enums | `BACKEND_DECISION_REQUIRED` |
| Backend technology stack | `OWNER_DECISION_REQUIRED` |
| Unified account ID scheme | `BACKEND_DECISION_REQUIRED` (acc_kzt vs kzt-primary) |

---

## 22. Recommended integration order

Based on technical dependencies observed in source:

1. **API foundation** — HTTP client, error handling, auth header injection
2. **Auth / session** — replaces mock state machine; gates all financial routes
3. **User / profile** — unified identity; hydrates profile on login
4. **Accounts / balances** — authoritative balance reads; unify ID scheme
5. **Ledger / transactions / history** — query API; replace `LegacyHistoryOp` append
6. **Top-up / internal transfers** — first money movement; replaces `confirmBetween`
7. **Withdraw** — depends on balances + ledger; replaces `confirmAndSettle`
8. **Service catalog / payment** — catalog read then payment commands
9. **QR / payment intents** — receive flow; inbound payment handling
10. **KYC / provider integrations** — identity verification, tier limits
11. **Notifications / webhooks / ops hardening** — async settlement, monitoring

---

## 23. Source file reference index

### Core

| Topic | Path |
|-------|------|
| Domain types | `src/types/domain.ts` |
| Persisted mock store | `src/state/store.ts` |
| Canonical seed | `src/mocks/canonicalDemo.ts` |
| Demo services | `src/mocks/demoServices.ts` |
| Foundation actions | `src/state/actions.ts` |
| Prototype config | `src/prototype/config.ts` |
| App config | `app.json`, `package.json`, `eas.json` |

### Auth / session

| Topic | Path |
|-------|------|
| Auth machine | `src/features/legacyAuth/machine.ts` |
| Auth types/steps | `src/features/legacyAuth/types.ts` |
| Auth route | `src/features/legacyAuth/LegacyAuthRoute.tsx` |
| Session store | `src/features/legacyHome/session.ts` |
| Guest gating | `src/features/legacyHome/HomeScreen.tsx` |

### Money / transactions

| Topic | Path |
|-------|------|
| Legacy balances | `src/features/legacyTopup/mockData.ts`, `store.ts` |
| Transfer logic | `src/features/legacyTopup/mockData.ts` → `applyMockTransfer()` |
| Withdraw settlement | `src/features/legacyWithdraw/store.ts` → `confirmAndSettle()` |
| Withdraw mock limits | `src/features/legacyWithdraw/mockData.ts` |
| History ops | `src/features/legacyHistory/store.ts`, `mockData.ts` |
| Foundation payment sim | `src/state/actions.ts` → `applyFoundationPayment()` |

### Features

| Topic | Path |
|-------|------|
| Payment catalog | `src/features/legacyPayment/mockData.ts` |
| Payment execution | `src/features/legacyPayment/PaymentServiceScreen.tsx` |
| QR payload | `src/features/legacyQr/mockData.ts` |
| Profile identity | `src/features/legacyProfile/mockData.ts` |
| Card demo | `src/features/legacyCard/mockData.ts` |
| Accounts metadata | `src/features/legacyAccounts/mockData.ts` |

### Routes

All under `src/app/legacy/**` — see Module map section 4.

### Tests

18 files under `src/**/*.test.ts` — 125 test cases total.
