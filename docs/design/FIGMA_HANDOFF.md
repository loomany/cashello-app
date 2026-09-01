# Cashello Figma / Design Handoff

**Audience:** Frontend and backend developers integrating against the current Cashello prototype  
**Canonical repository:** [loomany/cashello-app](https://github.com/loomany/cashello-app) — branch `main`  
**Public baseline:** `75ce303c037f57d5fc50d1f3f22ade5025ac157e`

For backend integration contracts, see [../backend/BACKEND_HANDOFF.md](../backend/BACKEND_HANDOFF.md) and [../backend/API_INTEGRATION_MAP.md](../backend/API_INTEGRATION_MAP.md).

**Confidence labels:** `FIGMA_FACT` · `CURRENT_CODE_FACT` · `MATCHED_IMPLEMENTATION` · `PARTIAL_MATCH` · `PROTOTYPE_UI_ONLY` · `TECHNICAL_RECOMMENDATION` · `OWNER_DECISION_REQUIRED` · `UNKNOWN`

**FIGMA MODIFIED:** NO — this task performed read-only Figma inspection only.

---

## 1. Purpose

Provide a self-contained design and implementation handoff so a new developer can:

- Find the owner-approved visual source of truth in Figma
- Map Figma frames to Expo Router routes and React Native screens
- Understand which UI is fully designed in Figma vs implemented from prior reconstruction work
- Preserve owner-approved visuals while integrating backend APIs
- Avoid treating Figma labels, amounts, or flows as production business rules

This document does **not** replace owner-approved business process documentation (future).

---

## 2. Source of truth

| Layer | Source | Notes |
|-------|--------|-------|
| **Visual design (owner-approved)** | Figma file **Cashello — Daur** | File key `RbjNBmxd2FERlisMJoru3I` — see §3 |
| **Current implementation** | `loomany/cashello-app` `main` | Expo Router + legacy feature modules under `src/features/**` |
| **Backend technical handoff** | `docs/backend/BACKEND_HANDOFF.md`, `API_INTEGRATION_MAP.md` | Mock vs production boundaries |
| **Business rules** | Not in this repo | `OWNER_DECISION_REQUIRED` |

When sources conflict: **do not guess** — escalate as `OWNER_DECISION_REQUIRED`.

---

## 3. Figma file overview

| Property | Value | Label |
|----------|-------|-------|
| File name | Cashello — Daur | `FIGMA_FACT` |
| File key | `RbjNBmxd2FERlisMJoru3I` | `FIGMA_FACT` |
| Main link | https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur | public-safe |
| Read-only access | YES (Figma MCP, Aug 2026) | `FIGMA_FACT` |
| Formal Figma variables | **None found** on audited nodes | `FIGMA_FACT` |
| Prototype links | Not audited as navigation spec | `UNKNOWN` |

### Critical scope note (`FIGMA_FACT`)

As of this audit, the owner-approved Figma file contains **two top-level pages** only:

1. **01 — Главная не авторизованный пользователь** — guest home screen + section banner
2. **Components** — shared HOME chrome/components + one withdraw method row

The **full product UI** (auth, authorized home, accounts, card, history, top-up, withdraw flows, payments, QR, profile, etc.) is **implemented in code** with reconstruction-era screen IDs (`LGC-SCR-*`, `WD-*`, `PAY-*`, `QR-001`) and reference PNGs under `assets/legacy/**`. Those screens are **not** currently present as frames in this Figma file.

Do **not** assume missing Figma frames are unapproved — they may be pending Figma professionalization. Do **not** delete working frontend flows because Figma coverage is partial.

---

## 4. Figma pages and sections

### Page: `1:3` — 01 — Главная не авторизованный пользователь

| Section | Node ID | Contents |
|---------|---------|----------|
| ГЛАВНАЯ | `2:143` | Page banner + **HOME-001** guest home frame |

**Primary frame:** `7:5` — **HOME-001 — Главная для гостя** (375×812)  
Link: https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur?node-id=7-5

Sub-regions inside `7:5`: Header (`20:3`), Content (`20:4`), CTA Bar (`20:5`).

### Page: `50:85` — Components

| Area | Node ID | Contents |
|------|---------|----------|
| HOME — Components | `44:199` | Symbols for guest home building blocks |
| Withdraw | `256:761` | **WD / Method Row** symbol `97:272` |

Link: https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur?node-id=50-85

---

## 5. Product screen inventory (Figma)

| Screen ID | Figma frame | Node ID | State | In current Figma? |
|-----------|-------------|---------|-------|-------------------|
| HOME-001 | HOME-001 — Главная для гостя | `7:5` | Guest | YES |
| HOME-002 | — | — | Authorized home | NO (`CODE_ONLY`) |
| LGC-SCR (auth) | — | — | Auth machine steps | NO (`CODE_ONLY`) |
| LGC-SCR-029…034 | — | — | Accounts | NO (`CODE_ONLY`) |
| LGC-SCR-035…039 | — | — | Card | NO (`CODE_ONLY`) |
| LGC-SCR-111…120 | — | — | History / receipt | NO (`CODE_ONLY`) |
| LGC-SCR-040, 069…087 | — | — | Top-up | NO (`CODE_ONLY`) |
| WD-002…005, LGC-SCR-091…109 | WD / Method Row only | `97:272` | Withdraw (partial) | PARTIAL — row component only |
| PAY-001, PAY-002 | — | — | Payment catalog | NO (`CODE_ONLY`) |
| QR-001 | — | — | QR receive | NO (`CODE_ONLY`) |
| LGC-SCR-066…068, 122…126 | — | — | Profile / KYC / help | NO (`CODE_ONLY`) |
| LGC-SCR-061 | — | — | Search | NO (`CODE_ONLY`) |

Reference PNGs under `assets/legacy/**` are **reconstruction captures** used by the running app — not substitutes for the current Figma file inventory.

---

## 6. Navigation model

`CURRENT_CODE_FACT` — from `src/app/**` and feature navigation helpers.

### App entry

| Step | Route | Behavior |
|------|-------|----------|
| Launch | `/` | Redirect → `/legacy/home?guest=1` |
| After auth complete | `/legacy/home` | Authorized home |
| Guest browse | `/legacy/home?guest=1` | Guest home (HOME-001) |

### Bottom tab bar (`LegacyTabBar`)

Present on: Home, Payment, History, Profile (guest home replaces tabs with login CTA bar).

| Tab | Route |
|-----|-------|
| Home | `/legacy/home` or `?guest=1` |
| Payment | `/legacy/payment` |
| History | `/legacy/history` |
| Profile | `/legacy/profile` (guest → login) |
| QR (center) | `/legacy/qr` |

### Major push flows (stack, no tab bar)

Auth, accounts, card, top-up, withdraw, profile sub-screens, history detail, payment service, search, messages, help, stubs.

### Sheets / modals (not always separate routes)

| UI | Parent | Component |
|----|--------|-----------|
| Withdraw methods | Home | `WithdrawSelectSheet` |
| Top-up methods | Home, Account detail | `TopupSelectSheet` / `MethodSheetContent` |
| History actions | Home, History | `HistoryActionSheet` |
| Payment categories | Payment | `PaymentCategorySheet` |
| Profile confirm | Profile | `ProfileConfirmSheet` |

Equivalent full routes: `/legacy/withdraw`, `/legacy/topup` (sheet chrome).

### Back navigation

`useLegacyBack` / `safeBack.ts` — fallback map when stack empty.

**Figma prototype links:** not used as navigation spec in this handoff (`UNKNOWN`).

---

## 7. Guest vs authorized states

### Guest Home — HOME-001 (`FIGMA_FACT` + `MATCHED_IMPLEMENTATION`)

| Area | Figma | Frontend (`HomeScreen.tsx`, `?guest=1`) | Status |
|------|-------|----------------------------------------|--------|
| Route | — | `/legacy/home?guest=1` | `MATCHED_IMPLEMENTATION` |
| Brand header | Cashhello / Brand `44:233` | `HomeIcons` + brand mark | `MATCHED_IMPLEMENTATION` |
| Bonus chip | 500 Б `44:236` | `homeCopy.headerBonus` hardcoded `500 Б` | `PARTIAL_MATCH` — value mock |
| Account card | Hidden balance •••••• | `guestBalanceLabel()` zeros / hidden | `MATCHED_IMPLEMENTATION` |
| Top-up / Withdraw controls | Visible on card | Shown; gated to login on action | `MATCHED_IMPLEMENTATION` |
| Recent operations | «Последние операции» (guest: 1 bonus row; authorized: 8 mock rows) | `PARTIAL_MATCH` — runtime ahead of Figma frame `7:5` |
| Bottom CTA | **Войти** primary button | Guest CTA bar replaces tab bar | `MATCHED_IMPLEMENTATION` |
| Tab bar | Absent in Figma | Absent for guest | `MATCHED_IMPLEMENTATION` |

### Authorized Home — HOME-002 / LGC-SCR-025 (`CODE_ONLY` in Figma)

| Area | Frontend | Figma |
|------|----------|-------|
| Route | `/legacy/home` | No frame in current file |
| Balances | Live mock balances from `useLegacyTopupStore` | — |
| Tab bar | Full `LegacyTabBar` | — |
| Top-up / withdraw | Opens sheets → real mock flows | — |

---

## 8. Figma → frontend route map (summary)

| Module | Figma coverage | Primary routes | Feature path |
|--------|----------------|----------------|--------------|
| Auth | None in current file | `/legacy/auth` | `legacyAuth/LegacyAuthRoute.tsx` |
| Home | HOME-001 only | `/legacy/home`, `?guest=1` | `legacyHome/HomeScreen.tsx` |
| Accounts | None | `/legacy/accounts`, `/legacy/accounts/[id]` | `legacyAccounts/*` |
| Card | None | `/legacy/card`, limits, pin | `legacyCard/*` |
| History | None | `/legacy/history/**` | `legacyHistory/*` |
| Top-up | None | `/legacy/topup/**` | `legacyTopup/*` |
| Withdraw | Method row component only | `/legacy/withdraw/**` | `legacyWithdraw/*` |
| Payment | None | `/legacy/payment`, `[id]` | `legacyPayment/*` |
| QR | None | `/legacy/qr` | `legacyQr/ReceiveQrScreen.tsx` |
| Profile | None | `/legacy/profile/**`, messages, help | `legacyProfile/*` |
| Search | None | `/legacy/search` | `legacySearch/SearchScreen.tsx` |
| Dev | N/A | `/dev/foundation` | `DEV_ONLY` |

---

## 9. Component system

### Figma components (`FIGMA_FACT` — Components page)

| Figma name | Node ID | Variants/states | Frontend equivalent | Reuse status |
|------------|---------|-----------------|---------------------|--------------|
| Cashhello / Mark | `44:202` | — | `HomeIcons` brand mark | `SHARED_IN_FIGMA_AND_CODE` |
| Cashhello / Brand | `44:233` | — | Header brand row | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Bonus Profile Chip | `44:236` | — | Header bonus + avatar chip | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Pagination Dots | `44:245` | active/inactive | Home carousel dots | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Section Header | `44:249` | title + link | Section headers on Home | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Withdraw Control | `44:252` | — | Account card withdraw control | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Topup Control | `148:134` | — | Account card top-up control | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Promo Banner | `44:257` | — | Promo carousel card | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Account Card | `44:262` | show balance | Wallet carousel card | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Service Row | `44:271` | optional badge | Home + payment rows | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / History Row | `44:275` | — | History preview row | `SHARED_IN_FIGMA_AND_CODE` |
| HOME / Primary CTA | `44:282` | — | Guest login CTA | `SHARED_IN_FIGMA_AND_CODE` |
| WD / Method Row | `97:272` | — | `WithdrawMethodRow` | `PARTIAL_MATCH` — one row pattern |

Icons (symbols): Eye Hidden, Withdraw Arrow, Send Arrow, Gift, Bonus Coin, Topup Arrow.

### Code-only shared primitives (`SHARED_IN_CODE_ONLY`)

`src/components/primitives/`: `AppButton`, `AppSheet`, `AppScreen`, `MoneyText`, `StatusChip`, `Skeleton`, etc.

Auth components: `NumericKeypad`, `PinDots`, `CameraChrome`, `LegacyInput`.

---

## 10. Design tokens and observed values

**NO FORMAL FIGMA TOKEN FOUND** — `get_variable_defs` returned empty for HOME-001.

Values below are **`REPEATED_OBSERVED_VALUE`** from frame `7:5` and component symbols, compared to `src/design/legacyTokens.ts` (`CURRENT_CODE_FACT`).

| Role | Figma (HOME-001) | Code (`legacyColor` / tokens) | Match |
|------|------------------|--------------------------------|-------|
| Screen background | `#F9F9F9` | `homeBackground: #F9F9F9` | YES |
| Primary accent | `#1226AA` | `primary: #1226AA` | YES |
| Primary text | `#050A26` | `textPrimary: #050A26` | YES |
| Secondary text | `#4E5661` | `textSecondary: #4E5661` | YES |
| Border / divider | `#F1F1F1` | `border: #F1F1F1` | YES |
| Success / bonus green | `#39C236` | `logoGreen: #39C236` | YES |
| Promo banner bg | `#0B1020` | (inline in Home) | PARTIAL |
| Account icon disc | `#F3F5FF` | `accountIconBg: #F3F5FF` | YES |
| Card radius | 12px | `legacyRadius.button: 12` | YES |
| Screen horizontal padding | 15px | `legacySpace.screenX: 15` | YES |
| Primary CTA height | 60px | guest CTA (differs from `ctaHeight: 50` elsewhere) | PARTIAL |
| Account card height | 90px | Home carousel card | YES |

PayDala reference tokens in `src/design/tokens.ts` are used by `/dev/foundation` — **not** the legacy Cashello screens.

---

## 11. Typography

`REPEATED_OBSERVED_VALUE` from HOME-001 (`FIGMA_FACT`). Font family in Figma: **Inter**; code uses system stack (`legacyFontFamily`) — `IMPLEMENTATION_DETAIL_ONLY`.

| Role | Figma | Size / weight | Code (`legacyType`) |
|------|-------|---------------|---------------------|
| Brand wordmark | Inter Bold | 22px / 700 | Close via home header styles |
| Section title | Inter Medium | 20px / 500 | Section headers |
| Body / row title | Inter Medium | 16px / 500 | List rows |
| Secondary line | Inter Regular | 14px / 400 | Subtitles |
| Balance amount | Inter Bold | 30px / 700 | Carousel balance |
| Button label | Inter Semi Bold | 16px / 600 | Primary CTA |
| Small control | Inter Semi Bold / Regular | 12–13px | Top-up/withdraw labels |

---

## 12. Colors

See §10. Semantic mapping:

| Semantic | Hex | Usage |
|----------|-----|-------|
| Main background | `#F9F9F9` | Guest home screen |
| Surface / card | `#FFFFFF` | Cards, chips |
| Primary accent | `#1226AA` | Links, CTA, controls |
| Primary text | `#050A26` | Headings, amounts |
| Secondary text | `#4E5661` | Labels, subtitles |
| Border | `#F1F1F1` | Card borders, dividers |
| Success / promo green | `#39C236` | Bonus badges |
| Promo dark | `#0B1020` | Promo banner |
| Overlay (sheets) | — | Code: `rgba(0,0,0,0.4)` — not in current Figma file |

---

## 13. Layout / spacing / geometry

| Property | Figma HOME-001 | Code / web shell |
|----------|----------------|------------------|
| Mobile frame width | **375px** | Native: full width; Web phone frame: **390px** (`WebViewportShell.tsx`) |
| Mobile frame height | **812px** | Web phone frame: **844px** |
| Horizontal padding | 15px | `legacySpace.screenX: 15` |
| Corner radius (cards/buttons) | 12px | `legacyRadius.button: 12` |
| Account card | 345×90 | Matches `legacySize.cardWidth: 345` |
| Primary CTA | 345×60 | Guest bar |
| Bottom nav | N/A on guest | Authorized tab bar in code |

**Note:** Web wrapper dimensions (390×844) differ slightly from Figma artboard (375×812) — `VISUAL_MISMATCH` severity **LOW** for desktop browser preview only.

---

## 14. Device and responsive model

| Context | Behavior | Source |
|---------|----------|--------|
| Figma primary artboard | 375×812 mobile | `FIGMA_FACT` |
| iOS / Android | Full-bleed native | `CURRENT_CODE_FACT` |
| Web (wide viewport) | Centered 390×844 phone frame, dark studio bg | `WebViewportShell.tsx` |
| Web (narrow) | Full width, no frame | `WebViewportShell.tsx` |
| Tablet / desktop product layout | Not designed in current Figma file | `OWNER_DECISION_REQUIRED` |

The web phone frame is a **prototype capture aid**, not necessarily the final desktop product layout.

---

## 15. Global application shell

- Root: `src/app/_layout.tsx` — splash/hydration, error boundary, web viewport shell
- Legacy stack: fade transitions (`legacy/_layout.tsx`)
- Debug: triple-tap `DebugMetaHost` on most legacy screens (prototype only)
- Not found in current Figma file: global loading/splash frames (`CODE_ONLY`)

---

## 16. Auth / onboarding

**Figma:** no frames in current file (`FIGMA_ONLY` coverage: none).

**Frontend:** single route `/legacy/auth` — state machine in `legacyAuth/machine.ts`.

| Step | Screen component | Backend relevance |
|------|------------------|-------------------|
| splash, onboarding | `SplashView`, `OnboardingView` | `PROTOTYPE_UI_ONLY` |
| phone (step `iin`) | `RegisterIinView` | `PROTOTYPE_UI_ONLY` |
| SMS | `VerificationView` | `PROTOTYPE_UI_ONLY` |
| PIN create/repeat/login | `PinView` | `PROTOTYPE_UI_ONLY` |
| face / documents | `CameraChrome` | `PROTOTYPE_UI_ONLY` — mock capture |

Figma visual flow must **not** be read as production authentication architecture. See backend handoff §7.

---

## 17. Home

Covered in §7. Authorized home uses screen IDs `LGC-SCR-025` / `LGC-SCR-026` in code — **not** in current Figma file.

---

## 18. Accounts

**Figma:** none in current file.  
**Routes:** `/legacy/accounts`, `/legacy/accounts/[id]`  
**Screens:** `AccountsListScreen`, `AccountDetailScreen`  
**Store:** `useLegacyAccountsStore`, balances from `useLegacyTopupStore`  
**Status:** `CODE_ONLY` (reference PNGs: `assets/legacy/accounts/`)

Do not infer ledger/account architecture from visuals alone.

---

## 19. Card

**Figma:** none in current file.  
**Routes:** `/legacy/card`, `/legacy/card/limits`, `/legacy/card/pin`  
**Screens:** `CardScreen`, `LimitsScreen`, `CardPinScreen`  
**Status:** `CODE_ONLY`

**Warning:** Figma/code card visuals are **not** a PCI or security specification. CVV toggle is local UI only (`legacyCard/store.ts`).

---

## 20. History / receipts

**Figma:** none in current file.  
**Routes:** `/legacy/history`, filter, `[id]`, receipt  
**Statuses (Russian UI):** `В обработке`, `Отклонено`, `Готов к выдаче`, `Успешно` — `PROTOTYPE_UI_ONLY`; do not map directly to production ledger enums (see backend handoff §9).

Withdraw receipt variants: `WD-003`, `WD-005` in code.

---

## 21. Top-up

**Figma:** none in current file (method sheet referenced by reconstruction PNGs only).  
**Routes:** `/legacy/topup`, between, card, cash, cash-map  
**Store:** `useLegacyTopupStore`

Displayed fees, rates, amounts: **`PROTOTYPE_UI_ONLY`**.

---

## 22. Withdraw

**Figma:** **WD / Method Row** component only (`97:272`).  
**Routes:** `/legacy/withdraw/**` (card, phone, cashhello-user, cash, amount, loading)  
**Store:** `useLegacyWithdrawStore`

Mock fee 30 ₸, cash band 1000–1970: **`PROTOTYPE_UI_ONLY`**.

---

## 23. Payment catalog

**Figma:** none in current file.  
**Routes:** `/legacy/payment`, `/legacy/payment/[id]`  
**Screens:** `PaymentScreen` (PAY-001), `PaymentServiceScreen` (PAY-002)  
**Catalog:** static `legacyPayment/mockData.ts`

Commission/bonus subtitles: **`PROTOTYPE_UI_ONLY`**.

---

## 24. QR

**Figma:** none in current file.  
**Route:** `/legacy/qr` — `ReceiveQrScreen` (QR-001)

### Explicit warning

**FIGMA DOES NOT DEFINE PRODUCTION QR PAYLOAD.**

Neither Figma nor current frontend defines: signature, recipient binding, expiration, server registration, one-time semantics, or security model. Client builds `cashhello://pay?amount=&currency=KZT` locally — see backend handoff §13.

---

## 25. Profile / KYC

**Figma:** none in current file.  
**Routes:** profile hub, personal, status, pin, phone, messages, help  
**Identity:** synthetic demo data (`legacyProfile/mockData.ts`)

Limits such as **12 975 ₸** on identification screen: **`PROTOTYPE_UI_ONLY`**.

---

## 26. Search / messages / help

| Feature | Route | Screen ID (code) | Figma |
|---------|-------|------------------|-------|
| Search | `/legacy/search` | LGC-SCR-061 | None |
| Messages | `/legacy/messages` | LGC-SCR-125 | None |
| Help | `/legacy/help` | LGC-SCR-126 | None |

---

## 27. Screen coverage matrix

| Module | Figma frame | Node ID | State | Frontend route | Component | Status | Notes |
|--------|-------------|---------|-------|----------------|-----------|--------|-------|
| Home | HOME-001 — Главная для гостя | `7:5` | Guest | `/legacy/home?guest=1` | `HomeScreen` | `MATCHED_IMPLEMENTATION` | Owner-approved frame |
| Home | — | — | Authorized | `/legacy/home` | `HomeScreen` | `CODE_ONLY` | LGC-SCR-025 |
| Auth | — | — | All steps | `/legacy/auth` | `LegacyAuthRoute` | `CODE_ONLY` | State machine |
| Accounts | — | — | List | `/legacy/accounts` | `AccountsListScreen` | `CODE_ONLY` | |
| Accounts | — | — | Detail | `/legacy/accounts/[id]` | `AccountDetailScreen` | `CODE_ONLY` | |
| Card | — | — | Hub | `/legacy/card` | `CardScreen` | `CODE_ONLY` | |
| Card | — | — | Limits | `/legacy/card/limits` | `LimitsScreen` | `CODE_ONLY` | |
| Card | — | — | PIN | `/legacy/card/pin` | `CardPinScreen` | `CODE_ONLY` | |
| History | — | — | List | `/legacy/history` | `HistoryScreen` | `CODE_ONLY` | |
| History | — | — | Filter | `/legacy/history/filter` | `FilterScreen` | `CODE_ONLY` | |
| History | — | — | Detail | `/legacy/history/[id]` | `OperationDetailsScreen` | `CODE_ONLY` | |
| History | — | — | Receipt | `/legacy/history/[id]/receipt` | `ReceiptScreen` | `CODE_ONLY` | |
| Top-up | — | — | Sheet | `/legacy/topup` | `MethodSheetScreen` | `CODE_ONLY` | |
| Top-up | — | — | Between | `/legacy/topup/between` | `BetweenAccountsScreen` | `CODE_ONLY` | |
| Top-up | — | — | Card | `/legacy/topup/card` | `ExternalCardScreen` | `CODE_ONLY` | |
| Top-up | — | — | Cash | `/legacy/topup/cash`, cash-map | `CashTopupScreen`, `CashMapScreen` | `CODE_ONLY` | |
| Withdraw | WD / Method Row | `97:272` | Row pattern | `/legacy/withdraw` | `MethodSelectScreen` | `PARTIAL_MATCH` | Full flows code-only |
| Withdraw | — | — | Card | `/legacy/withdraw/card` | `CardWithdrawScreen` | `CODE_ONLY` | WD-002 |
| Withdraw | — | — | Phone | `/legacy/withdraw/phone` | `PhoneFormWithdrawScreen` | `CODE_ONLY` | WD-004/005 |
| Withdraw | — | — | Cashhello user | `/legacy/withdraw/cashhello-user` | `PhoneFormWithdrawScreen` | `CODE_ONLY` | |
| Withdraw | — | — | Cash | `/legacy/withdraw/cash` → amount → loading | Multiple | `CODE_ONLY` | |
| Payment | — | — | Catalog | `/legacy/payment` | `PaymentScreen` | `CODE_ONLY` | PAY-001 |
| Payment | — | — | Service | `/legacy/payment/[id]` | `PaymentServiceScreen` | `CODE_ONLY` | PAY-002 |
| QR | — | — | Receive | `/legacy/qr` | `ReceiveQrScreen` | `CODE_ONLY` | QR-001 |
| Profile | — | — | Hub | `/legacy/profile` | `ProfileScreen` | `CODE_ONLY` | |
| Profile | — | — | KYC status | `/legacy/profile/status` | `IdentificationStatusScreen` | `CODE_ONLY` | |
| Profile | — | — | Personal | `/legacy/profile/personal` | `PersonalDataScreen` | `CODE_ONLY` | |
| Profile | — | — | Phone/PIN | `/legacy/profile/phone/**`, pin | Change phone/PIN screens | `CODE_ONLY` | |
| Search | — | — | — | `/legacy/search` | `SearchScreen` | `CODE_ONLY` | |
| Messages | — | — | — | `/legacy/messages` | `MessagesScreen` | `CODE_ONLY` | |
| Help | — | — | — | `/legacy/help` | `HelpScreen` | `CODE_ONLY` | |
| Dev | — | — | — | `/dev/foundation` | `foundation.tsx` | `DEV_ONLY` | Not product UI |

---

## 28. Component coverage matrix

| Pattern | Figma | Code | Status |
|---------|-------|------|--------|
| Brand header | YES | `HomeIcons`, auth headers | `SHARED_IN_FIGMA_AND_CODE` |
| Bonus/profile chip | YES | Home header | `SHARED_IN_FIGMA_AND_CODE` |
| Account carousel card | YES | Home carousel | `SHARED_IN_FIGMA_AND_CODE` |
| Service row | YES | Home, Payment | `SHARED_IN_FIGMA_AND_CODE` |
| History row | YES | Home preview, History list | `PARTIAL_MATCH` |
| Primary CTA | YES | Guest login | `SHARED_IN_FIGMA_AND_CODE` |
| Withdraw method row | YES | Withdraw sheets | `PARTIAL_MATCH` |
| Bottom tab bar | NO | `LegacyTabBar` | `SHARED_IN_CODE_ONLY` |
| Numeric keypad / PIN dots | NO | `legacyAuth` | `SHARED_IN_CODE_ONLY` |
| Bottom sheet chrome | NO | `AppSheet`, blur sheets | `SHARED_IN_CODE_ONLY` |
| Receipt block | NO | `ReceiptScreen`, `WithdrawSuccessReceipt` | `SHARED_IN_CODE_ONLY` |
| QR container | NO | `ReceiveQrScreen` | `SHARED_IN_CODE_ONLY` |

---

## 29. Figma ↔ frontend mismatches

| Area | Figma | Frontend | Type | Severity | Recommended handling |
|------|-------|----------|------|----------|-------------------|
| Product name spelling | Cashhello | Docs: Cashello; code mix | `COPY_MISMATCH` | LOW | `OWNER_DECISION_REQUIRED` for final brand |
| Figma file coverage | Guest home + components only | Full app implemented | `FIGMA_ONLY` / `CODE_ONLY` | **HIGH** | Extend Figma professionally; do not delete code flows |
| Authorized home | Not in file | `/legacy/home` | `CODE_ONLY` | MEDIUM | Add HOME-002 to Figma when approved |
| Web preview frame | 375×812 artboard | 390×844 wrapper | `VISUAL_MISMATCH` | LOW | Accept for prototype web; not production desktop |
| Bonus chip value | 500 Б | Hardcoded mock | `IMPLEMENTATION_DETAIL_ONLY` | LOW | Backend will replace with real balance |
| Inter vs system font | Inter specified | System font stack | `VISUAL_MISMATCH` | LOW | Documented platform substitution |
| Auth/KYC/ledger screens | Not in file | Full flows in code | `CODE_ONLY` | MEDIUM | Preserve code; align Figma over time |
| Historical Figma file ref | — | `legacyTokens.ts` cites old file ID | `IMPLEMENTATION_DETAIL_ONLY` | LOW | Tokens align with HOME-001 colors; update comment in separate task |

---

## 30. Owner-approved visual freeze

Current Figma visual design in **Cashello — Daur** is **owner-approved** and must be preserved unless the owner explicitly requests change.

Backend/API integration may change:

- **DATA** (balances, names, statuses)
- **LOADING / ERROR content**
- **REAL transaction states**

It must **not** silently change:

- Layout and visual hierarchy
- Colors, typography, spacing
- Navigation intent
- Component appearance
- Screen composition

If a backend constraint appears to require a visual change: **`OWNER_DECISION_REQUIRED`**.

---

## 31. Figma is not a backend or business specification

Figma does **not** define production:

- Commissions, fees, limits, FX sources
- Ledger logic, settlement, balances, refund policy
- AML / KYC legal thresholds, provider behavior
- Database schema, API implementation, idempotency
- QR security model, card/token PCI boundaries

Values shown in UI (500 Б, +2% bonus, 12 975 ₸ limits, withdraw fees, etc.) are **`PROTOTYPE_UI_ONLY`** unless separately approved in business documentation.

---

## 32. Source-of-truth hierarchy

1. **Visual design** — current owner-approved Figma (`RbjNBmxd2FERlisMJoru3I`) for frames that exist  
2. **Current implementation** — `loomany/cashello-app` `main` for behavior, routes, and screens not yet in Figma  
3. **Backend handoff** — `docs/backend/**` for integration and mock boundaries  
4. **Business rules** — future owner-approved business docs  

On conflict: **`OWNER_DECISION_REQUIRED`**.

---

## 33. Developer implementation rules

The frontend contains **working mock flows**. Do **not** delete and rebuild from scratch.

**Rule:** `PRESERVE EXISTING WORKING FUNCTIONALITY` + `MATCH OWNER-APPROVED FIGMA`

When integrating backend:

- Replace mock data and local mutations progressively
- Preserve routes, navigation, back behavior, screen states, tests, reset/debug utilities
- Match new/edited UI to Figma frames when they exist

### Checklist before editing a screen

1. Open the corresponding Figma frame (if it exists)
2. Identify exact frontend route (`src/app/**`)
3. Identify feature module and store
4. Identify shared components already in use
5. Preserve existing navigation and guest/authorized behavior
6. Make only task-required changes
7. Compare against Figma when frame exists
8. Test loading / error / success states
9. Run `npm test -- --runInBand` and `npm run typecheck`
10. Request owner review for any visual change

---

## 34. Design QA checklist

- [ ] Correct Figma frame referenced (or documented as CODE_ONLY)
- [ ] Correct route and query params
- [ ] Correct screen state (guest/authorized/loading/error)
- [ ] Typography matches Figma where frame exists
- [ ] Colors match observed Figma values / `legacyTokens`
- [ ] Spacing and radius match
- [ ] Assets/icons match
- [ ] Safe-area behavior correct
- [ ] Bottom sheets / modals behave as before
- [ ] Guest gates preserved
- [ ] No business rule inferred from mock UI
- [ ] Existing functionality preserved
- [ ] Owner review for visual changes

---

## 35. Open questions

| Topic | Status |
|-------|--------|
| Final product spelling (Cashello vs Cashhello) | `OWNER_DECISION_REQUIRED` |
| Figma professionalization of remaining modules | `OWNER_DECISION_REQUIRED` |
| Whether historical reconstruction PNGs remain reference | `OWNER_DECISION_REQUIRED` |
| Production desktop/web layout beyond phone frame | `OWNER_DECISION_REQUIRED` |
| Formal Figma variables / design tokens | Not yet in file |

---

## 36. Important Figma links

| Area | Link |
|------|------|
| File root | https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur |
| HOME-001 guest home | https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur?node-id=7-5 |
| Components page | https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur?node-id=50-85 |
| HOME components board | https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur?node-id=44-199 |
| WD Method Row | https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-%E2%80%94-Daur?node-id=97-272 |

No authentication tokens or private URLs are included.

---

## 37. Source code reference index

| Topic | Path |
|-------|------|
| Routes | `src/app/**` |
| Legacy tokens | `src/design/legacyTokens.ts` |
| Web phone frame | `src/prototype/WebViewportShell.tsx` |
| Guest/authorized home | `src/features/legacyHome/HomeScreen.tsx`, `session.ts` |
| Tab bar | `src/features/legacyHome/LegacyTabBar.tsx` |
| Screen meta IDs | `useScreenMeta` in each `*Screen.tsx` |
| Reference PNGs | `assets/legacy/**` |
| Backend contracts | `docs/backend/BACKEND_HANDOFF.md` |

## Post-design code drift (5977543)

- **Figma file:** Cashello — Daur (`RbjNBmxd2FERlisMJoru3I`)
- **HOME-001 node:** `7:5` — **UNCHANGED in Figma**
- **Current code:** Home uses «Последние операции» instead of separate Services + History sections.
- **Runtime is ahead of Figma** for these Home sections; do not treat Figma frame `7:5` as full current-product spec.
- **+500 Б registration bonus** on guest Home is PROTOTYPE_UI_ONLY evidence, not an answered owner policy.
