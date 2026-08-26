# API Integration Map

**Audience:** Backend developer  
**Canonical repository:** [loomany/cashello-app](https://github.com/loomany/cashello-app) — branch `main`
**Companion docs:** [BACKEND_HANDOFF.md](./BACKEND_HANDOFF.md) · [FIGMA_HANDOFF.md](../design/FIGMA_HANDOFF.md)

Endpoint names are **DRAFT only**. Confidence labels: `CURRENT_CODE_FACT`, `PROTOTYPE_ONLY`, `TECHNICAL_RECOMMENDATION`, `OWNER_DECISION_REQUIRED`, `UNKNOWN`.

---

## AUTH

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Splash / entry | `/legacy/auth` | `src/features/legacyAuth/LegacyAuthRoute.tsx` | Auto-advance timer 1400ms | App config, maintenance mode | Query | `GET /v1/app/config` | TECHNICAL_RECOMMENDATION |
| Phone registration start | `/legacy/auth` (step `iin`) | `src/features/legacyAuth/screens/RegisterIinView.tsx` | 10-digit validation only | Registration session ID | Command | `POST /v1/auth/register/start` | TECHNICAL_RECOMMENDATION |
| SMS OTP send | step `verification` | `src/features/legacyAuth/screens/PhoneView.tsx` | Any 4 digits accepted | OTP delivery status, resend cooldown | Command | `POST /v1/auth/otp/send` | CURRENT_CODE_FACT (mock) |
| SMS OTP verify | step `verification` | `src/features/legacyAuth/machine.ts` | `SET_SMS` auto-advances | Valid/invalid, attempts remaining | Command | `POST /v1/auth/otp/verify` | CURRENT_CODE_FACT (mock) |
| PIN create | step `pinCreate`/`pinRepeat` | `src/features/legacyAuth/screens/PinView.tsx` | Local 6-digit match | PIN set confirmation | Command | `POST /v1/auth/pin/set` | CURRENT_CODE_FACT (mock) |
| PIN login (returning) | step `pinLogin` | `src/features/legacyAuth/machine.ts` | Any 6 digits → complete | Session tokens | Command | `POST /v1/auth/login` | PROTOTYPE_ONLY (no UI link) |
| KYC face capture | step `face` | `src/features/legacyAuth/components/CameraChrome.tsx` | Tap to continue | Liveness result | Command | `POST /v1/kyc/liveness` | PROTOTYPE_ONLY |
| KYC document capture | steps `document*` | `src/features/legacyAuth/components/CameraChrome.tsx` | Mock capture button | Document OCR result | Command | `POST /v1/kyc/documents` | PROTOTYPE_ONLY |
| Logout | `/legacy/profile` | `src/features/legacyProfile/ProfileScreen.tsx` | Client flag only | Session revoke | Command | `POST /v1/auth/logout` | CURRENT_CODE_FACT |
| Delete account | `/legacy/profile` | `src/features/legacyProfile/ProfileScreen.tsx` | Navigate to auth | Account deletion | Command | `DELETE /v1/users/me` | OWNER_DECISION_REQUIRED |

---

## SESSION

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Guest mode | `/legacy/home?guest=1` | `src/features/legacyHome/session.ts` | `isGuest: true` boolean | Unauthenticated state | — | — | CURRENT_CODE_FACT |
| Authorized mode | `/legacy/home` | `src/features/legacyHome/session.ts` | `enterAuthorized()` | Valid access + refresh tokens | Query | `GET /v1/auth/session` | CURRENT_CODE_FACT |
| Session refresh | (none) | — | Not implemented | New access token | Command | `POST /v1/auth/refresh` | TECHNICAL_RECOMMENDATION |
| Guest gate redirect | various | `src/features/legacyHome/HomeScreen.tsx` | `gateOr()` → login | 401 on protected resources | — | — | CURRENT_CODE_FACT |

---

## PROFILE

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Profile hub | `/legacy/profile` | `src/features/legacyProfile/ProfileScreen.tsx` | `CANONICAL_IDENTITY` | displayName, phone, status | Query | `GET /v1/users/me` | CURRENT_CODE_FACT |
| Personal data | `/legacy/profile/personal` | `src/features/legacyProfile/PersonalDataScreen.tsx` | Static identity fields | fullName, documentNumber, birthDate | Query | `GET /v1/users/me/profile` | CURRENT_CODE_FACT |
| Change phone | `/legacy/profile/phone` | `src/features/legacyProfile/ChangePhoneScreen.tsx` | Local digits | OTP + update | Command | `POST /v1/users/me/phone/change` | CURRENT_CODE_FACT (mock OTP 0000) |
| Change app PIN | `/legacy/profile/pin` | `src/features/legacyProfile/ChangePinScreen.tsx` | Local store | PIN change | Command | `POST /v1/users/me/pin/change` | CURRENT_CODE_FACT |
| Push preference | `/legacy/profile` | `src/features/legacyProfile/store.ts` | `pushEnabled` boolean | Notification settings | Command | `PATCH /v1/users/me/settings` | CURRENT_CODE_FACT |
| Promo code | `/legacy/profile` | `src/features/legacyProfile/ProfileScreen.tsx` | Alert stub | Validation result | Command | `POST /v1/promo/apply` | OWNER_DECISION_REQUIRED |
| Messages inbox | `/legacy/messages` | `src/features/legacyProfile/MessagesScreen.tsx` | `CANONICAL_MESSAGES` | Notification list | Query | `GET /v1/notifications` | CURRENT_CODE_FACT |
| Help ticket | `/legacy/help` | `src/features/legacyProfile/HelpScreen.tsx` | Alert stub | Ticket creation | Command | `POST /v1/support/tickets` | OWNER_DECISION_REQUIRED |

---

## KYC STATUS

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Identification badge | `/legacy/profile` | `src/features/legacyProfile/ProfileScreen.tsx` | Hardcoded "Неидентифицированный" | Tier, progress % | Query | `GET /v1/kyc/status` | CURRENT_CODE_FACT (static) |
| Status detail + limits | `/legacy/profile/status` | `src/features/legacyProfile/IdentificationStatusScreen.tsx` | Static 12 975 ₸ limits | Tier limits, locked features | Query | `GET /v1/kyc/limits` | PROTOTYPE_ONLY |
| Extend limits CTA | `/legacy/profile/status` | `src/features/legacyProfile/IdentificationStatusScreen.tsx` | Alert stub | KYC upgrade flow URL/steps | Command | `POST /v1/kyc/upgrade/start` | OWNER_DECISION_REQUIRED |

---

## ACCOUNTS

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Account list | `/legacy/accounts` | `src/features/legacyAccounts/AccountsListScreen.tsx` | `LEGACY_ACCOUNTS` + live balances | Account ID, currency, balance, IBAN mask | Query | `GET /v1/accounts` | CURRENT_CODE_FACT |
| Account detail | `/legacy/accounts/[id]` | `src/features/legacyAccounts/AccountDetailScreen.tsx` | `DEMO_REQUISITES` | Requisites, balance, primary flag | Query | `GET /v1/accounts/{id}` | CURRENT_CODE_FACT |
| Set primary account | `/legacy/accounts` | `src/features/legacyAccounts/store.ts` | `setPrimary()` local | Primary account preference | Command | `PATCH /v1/accounts/{id}/primary` | CURRENT_CODE_FACT |
| Home carousel balances | `/legacy/home` | `src/features/legacyHome/HomeScreen.tsx` | `useLegacyTopupStore.balances` | Per-currency balances | Query | `GET /v1/accounts` | CURRENT_CODE_FACT |
| Guest zero balances | `/legacy/home?guest=1` | `src/features/legacyHome/session.ts` | `guestBalanceLabel()` zeros | Empty/zero response | Query | `GET /v1/accounts` (401/empty) | CURRENT_CODE_FACT |

---

## BALANCES

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Legacy balance record | (cross-cutting) | `src/features/legacyTopup/store.ts` | `CANONICAL_BALANCES` major units | Authoritative minor-unit balances | Query | `GET /v1/balances` | CURRENT_CODE_FACT |
| Foundation balances | `/dev/foundation` | `src/state/store.ts` | `availableMinor` in accounts | Same, unified model | Query | `GET /v1/balances` | CURRENT_CODE_FACT |
| Hide/show balances | `/legacy/home` | `src/state/store.ts` | `balancesHidden` UI flag | Client-only UI state | — | — | CURRENT_CODE_FACT |
| Balance after transfer | `/legacy/topup/between` | `src/features/legacyTopup/store.ts` | `applyMockTransfer()` | Updated balances post-command | Query | Included in transfer response | CURRENT_CODE_FACT |
| Balance after withdraw | `/legacy/withdraw/loading` | `src/features/legacyWithdraw/store.ts` | Local debit | Updated balances post-command | Query | Included in withdraw response | CURRENT_CODE_FACT |

---

## BONUS

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Header bonus chip | `/legacy/home` | `src/features/legacyHome/copy.ts` | Hardcoded `500 Б` | Bonus balance | Query | `GET /v1/bonus` | CURRENT_MOCK_ONLY |
| Bonus as pay source | `/legacy/payment/[id]` | `src/features/legacyPayment/PaymentServiceScreen.tsx` | `SOURCE_ACCOUNTS` includes bonus | Bonus balance + eligibility | Query | `GET /v1/bonus` | CURRENT_CODE_FACT |
| Foundation bonus | `/dev/foundation` | `src/mocks/canonicalDemo.ts` | `acc_bonus.balanceMinor` | Bonus balance | Query | `GET /v1/bonus` | CURRENT_CODE_FACT |
| Cashback credit | `/dev/foundation` | `src/state/actions.ts` | `applyFoundationPayment()` credits bonus | Cashback rules + credit | Command | Internal ledger event | OWNER_DECISION_REQUIRED |

---

## HISTORY

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Operations list | `/legacy/history` | `src/features/legacyHistory/HistoryScreen.tsx` | `useLegacyHistoryStore.operations` | Paginated transaction list | Query | `GET /v1/transactions` | CURRENT_CODE_FACT |
| Home preview (last 2) | `/legacy/home` | `src/features/legacyHome/historyPreview.ts` | Latest 2 from history store | Recent transactions | Query | `GET /v1/transactions?limit=2` | CURRENT_CODE_FACT |
| Filter by type/period | `/legacy/history/filter` | `src/features/legacyHistory/store.ts` | Client-side filter | Filter params | Query | `GET /v1/transactions?kind=&from=&to=` | CURRENT_CODE_FACT |
| Operation detail | `/legacy/history/[id]` | `src/features/legacyHistory/OperationDetailsScreen.tsx` | `LegacyHistoryOp` fields | Full operation detail | Query | `GET /v1/transactions/{id}` | CURRENT_CODE_FACT |
| Cancel operation | `/legacy/history/[id]` | `src/features/legacyHistory/store.ts` | Status → `Отклонено` | Cancel eligibility + result | Command | `POST /v1/transactions/{id}/cancel` | CURRENT_CODE_FACT |
| Repeat operation | `/legacy/history/[id]` | seed ops only | `canRepeat`, `repeatHref` | Repeat prefill data | Query | `GET /v1/transactions/{id}/repeat` | PROTOTYPE_ONLY |

---

## TRANSACTION DETAIL / RECEIPT

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Receipt screen | `/legacy/history/[id]/receipt` | `src/features/legacyHistory/ReceiptScreen.tsx` | Mock barcode, Alert share | Receipt PDF/data, receipt number | Query | `GET /v1/transactions/{id}/receipt` | CURRENT_CODE_FACT |
| Withdraw success receipt | `/legacy/history/[id]` | `src/features/legacyWithdraw/WithdrawSuccessReceipt.tsx` | `detailVariant: withdraw_receipt` | Same | Query | `GET /v1/transactions/{id}/receipt` | CURRENT_CODE_FACT |
| Share receipt | receipt screens | `ReceiptScreen.tsx` | Alert stub | Share URL or file | Query | `GET /v1/transactions/{id}/receipt/share` | OWNER_DECISION_REQUIRED |

---

## TOPUP — BETWEEN ACCOUNTS

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Method selection | `/legacy/topup` | `src/features/legacyTopup/MethodSheetScreen.tsx` | Static method list | Available methods | Query | `GET /v1/topup/methods` | CURRENT_CODE_FACT |
| Between accounts form | `/legacy/topup/between` | `src/features/legacyTopup/BetweenAccountsScreen.tsx` | Local from/to/amount | Source accounts, FX rate preview | Query | `GET /v1/accounts` + `GET /v1/fx/rate` | CURRENT_CODE_FACT |
| Confirm transfer | `/legacy/topup/between` | `src/features/legacyTopup/store.ts` → `confirmBetween()` | `applyMockTransfer()` local | Transfer result, new balances, tx ID | Command | `POST /v1/transfers/internal` | CURRENT_CODE_FACT |
| FX conversion | between flow | `src/features/legacyTopup/mockData.ts` | NBK pivot rates | Authoritative rate | Query | `GET /v1/fx/rate?from=&to=` | PROTOTYPE_ONLY |

---

## TOPUP — EXTERNAL CARD

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Card form | `/legacy/topup/card` | `src/features/legacyTopup/ExternalCardScreen.tsx` | Synthetic PAN auto-fill | Saved cards list | Query | `GET /v1/cards/linked` | CURRENT_CODE_FACT |
| Confirm card topup | `/legacy/topup/card` | `src/features/legacyTopup/store.ts` → `confirmCardTopUp()` | History only, amount 1500 | Topup initiation, 3DS if needed | Command | `POST /v1/topup/card` | CURRENT_CODE_FACT |
| Add new card | `/legacy/topup/card` | `ExternalCardScreen.tsx` | `fillSyntheticCard()` | Tokenization session | Command | `POST /v1/cards/tokenize` | TECHNICAL_RECOMMENDATION |

---

## TOPUP — CASH

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Cash desk list | `/legacy/topup/cash-map` | `src/features/legacyTopup/CashMapScreen.tsx` | `CASH_DESKS` static | Desk locations | Query | `GET /v1/cash-desks` | CURRENT_CODE_FACT |
| Confirm cash topup | `/legacy/topup/cash-map` | `src/features/legacyTopup/store.ts` → `confirmCashDesk()` | Pending history, amount 8000 | Topup request, pickup code | Command | `POST /v1/topup/cash` | CURRENT_CODE_FACT |

---

## WITHDRAW

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Method selection | `/legacy/withdraw` | `src/features/legacyWithdraw/MethodSelectScreen.tsx` | Static methods | Available withdraw methods | Query | `GET /v1/withdraw/methods` | CURRENT_CODE_FACT |
| Home withdraw sheet | `/legacy/home` | `src/features/legacyHome/WithdrawSelectSheet.tsx` | card, phone, cashhello-user | Same | Query | `GET /v1/withdraw/methods` | CURRENT_CODE_FACT |
| Card withdraw | `/legacy/withdraw/card` | `src/features/legacyWithdraw/CardWithdrawScreen.tsx` | 3s timer → success | Saved cards, limits | Command | `POST /v1/withdraw/card` | CURRENT_CODE_FACT |
| Phone withdraw | `/legacy/withdraw/phone` | `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx` | Saved phones demo | Phone validation, limits | Command | `POST /v1/withdraw/phone` | CURRENT_CODE_FACT |
| Cashhello user | `/legacy/withdraw/cashhello-user` | `PhoneFormWithdrawScreen.tsx` (variant) | P2P-style | Recipient lookup | Command | `POST /v1/withdraw/p2p` | CURRENT_CODE_FACT |
| Cash pickup | `/legacy/withdraw/cash` → amount → loading | `AmountWithdrawScreen.tsx`, `LoadingWithdrawScreen.tsx` | Amount 1000–1970, fee 30 | Desk, amount validation, fee | Command | `POST /v1/withdraw/cash` | PROTOTYPE_ONLY limits |
| Withdraw settlement | `/legacy/withdraw/loading` | `src/features/legacyWithdraw/store.ts` → `confirmAndSettle()` | Local debit + history | Final status, tx ID | Query/Command | `GET /v1/withdraw/{id}` | CURRENT_CODE_FACT |
| Withdraw fee quote | amount screens | `src/features/legacyWithdraw/mockData.ts` | `MOCK_FEE_KZT: 30` | Fee calculation | Query | `GET /v1/withdraw/quote?amount=&method=` | PROTOTYPE_ONLY |

---

## SERVICE CATALOG

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Category list | `/legacy/payment` | `src/features/legacyPayment/PaymentScreen.tsx` | `PAYMENT_CATEGORIES` | Categories | Query | `GET /v1/catalog/categories` | CURRENT_CODE_FACT |
| Service list by category | `/legacy/payment` | `src/features/legacyPayment/mockData.ts` | `PAYMENT_SECTIONS` static | Services with availability, logos | Query | `GET /v1/catalog/services?category=` | CURRENT_CODE_FACT |
| Service search | `/legacy/payment` | `PaymentScreen.tsx` | Client-side filter | Search index | Query | `GET /v1/catalog/services?q=` | CURRENT_CODE_FACT |
| Service detail | `/legacy/payment/[id]` | `src/features/legacyPayment/PaymentServiceScreen.tsx` | `getPaymentService(id)` | Service config, economics | Query | `GET /v1/catalog/services/{id}` | CURRENT_CODE_FACT |
| Unavailable services | `/legacy/payment` | `PaymentScreen.tsx` | `available: false` flag | Availability status | Query | Included in catalog | CURRENT_CODE_FACT |

---

## SERVICE PAYMENT

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Pay form | `/legacy/payment/[id]` | `src/features/legacyPayment/PaymentServiceScreen.tsx` | Phone + amount + source account | Validation rules, min/max | Query | `GET /v1/catalog/services/{id}/rules` | CURRENT_CODE_FACT |
| Execute payment | `/legacy/payment/[id]` | `PaymentServiceScreen.tsx` | 900ms Alert | Payment result, tx ID | Command | `POST /v1/payments/service` | CURRENT_CODE_FACT |
| Source account picker | `/legacy/payment/[id]` | `PaymentServiceScreen.tsx` | `SOURCE_ACCOUNTS` hardcoded | Fundable accounts + balances | Query | `GET /v1/accounts` | CURRENT_CODE_FACT |
| Payment status poll | (none) | — | Not implemented | Processing/success/fail | Query | `GET /v1/payments/{id}` | TECHNICAL_RECOMMENDATION |

---

## FAVORITES

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Favorites tab | `/legacy/payment` | `src/features/legacyPayment/store.ts` | In-memory toggle | User favorite service IDs | Query | `GET /v1/users/me/favorites` | CURRENT_CODE_FACT |
| Toggle favorite | `/legacy/payment/[id]` | `src/features/legacyPayment/store.ts` | `toggleFavorite()` | Updated favorites | Command | `PUT /v1/users/me/favorites/{serviceId}` | CURRENT_CODE_FACT |

Server persistence: `OWNER_DECISION_REQUIRED` — currently client-only.

---

## QR RECEIVE

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| QR amount input | `/legacy/qr` | `src/features/legacyQr/ReceiveQrScreen.tsx` | Local `amountDigits` | Client-only form state | — | — | CURRENT_CODE_FACT |
| Generate QR | `/legacy/qr` | `src/features/legacyQr/mockData.ts` | `cashhello://pay?amount=&currency=KZT` | Payment intent ID, signed payload, expiry | Command | `POST /v1/qr/receive` | CURRENT_CODE_FACT (local draft) |
| QR payment status | (none) | — | Not implemented | Payer completion status | Query | `GET /v1/qr/intents/{id}` | BACKEND_DECISION_REQUIRED |
| Inbound QR pay | (none) | — | Not implemented | Payer-side scan + pay | Command | `POST /v1/qr/pay` | BACKEND_DECISION_REQUIRED |

---

## CARD (PayDala card)

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Card view | `/legacy/card` | `src/features/legacyCard/CardScreen.tsx` | `DEMO_CARD` static | Masked PAN, holder, expiry, status | Query | `GET /v1/card` | CURRENT_CODE_FACT |
| Show/hide CVV | `/legacy/card` | `src/features/legacyCard/store.ts` | UI face toggle — local face flip only | Issuer/provider-controlled reveal; PCI-scoped; step-up authenticated; short-lived/ephemeral; never persisted or logged by Cashello; prefer tokenized provider secure flow | Command (DRAFT) | `POST /v1/card/cvv/reveal` or provider-hosted step-up URL | TECHNICAL_RECOMMENDATION — if issuer architecture does not permit CVV reveal, return a secure provider flow instead |
| Block card | `/legacy/card` | `src/features/legacyCard/store.ts` | Local `blocked: true` | Block confirmation | Command | `POST /v1/card/block` | CURRENT_CODE_FACT |
| Spending limits | `/legacy/card/limits` | `src/features/legacyCard/LimitsScreen.tsx` | Local cap/remaining | Current limits | Query | `GET /v1/card/limits` | CURRENT_CODE_FACT |
| Set limit | `/legacy/card/limits` | `src/features/legacyCard/store.ts` | `applyLimit()` local | Updated limits | Command | `PUT /v1/card/limits` | CURRENT_CODE_FACT |
| Change card PIN | `/legacy/card/pin` | `src/features/legacyCard/CardPinScreen.tsx` | 3-phase local | PIN change | Command | `POST /v1/card/pin/change` | CURRENT_CODE_FACT |
| Apple/Google Pay | `/legacy/card` | `src/features/legacyCard/store.ts` | Tap flags only | Wallet provisioning | Command | `POST /v1/card/wallet/provision` | OWNER_DECISION_REQUIRED |

---

## SEARCH

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Search | `/legacy/search` | `src/features/legacySearch/SearchScreen.tsx` | `SEARCH_ITEMS` static | Services, accounts, actions | Query | `GET /v1/search?q=` | CURRENT_CODE_FACT |
| Recent queries | `/legacy/search` | `src/features/legacySearch/store.ts` | Local recent list | Recent searches | Query | `GET /v1/search/recent` | CURRENT_CODE_FACT |

---

## FOUNDATION (dev only)

| UI Feature | Route | Source File | Mock Source | Required Data from Backend | Command / Query | Possible Endpoint | Confidence |
|------------|-------|-------------|-------------|-------------------------|-----------------|-------------------|------------|
| Domain snapshot | `/dev/foundation` | `src/app/dev/foundation.tsx` | `useMockStore` persisted | Full user + accounts + tx | Query | Composite bootstrap API | CURRENT_CODE_FACT |
| Simulate payment | `/dev/foundation` | `src/state/actions.ts` | `applyFoundationPayment()` | N/A — dev only | — | — | PROTOTYPE_ONLY |
| Reset demo | Debug overlay | `src/prototype/DebugMetaHost.tsx` | `resetToCanonical()` | N/A — dev only | — | — | CURRENT_CODE_FACT |

---

## Cross-cutting

| Capability | Current State | Possible Endpoint | Confidence |
|------------|--------------|-------------------|------------|
| Idempotency on financial commands | Not implemented | `Idempotency-Key` header | TECHNICAL_RECOMMENDATION |
| Webhook processing | Not implemented | Provider-specific endpoints | TECHNICAL_RECOMMENDATION |
| Push notifications | Local toggle only | FCM/APNs registration | OWNER_DECISION_REQUIRED |
| Error codes | Alert stubs | Structured error response | TECHNICAL_RECOMMENDATION |
| Rate limiting | None | Gateway-level | TECHNICAL_RECOMMENDATION |
| API versioning | None | `/v1/` prefix | TECHNICAL_RECOMMENDATION |

---

## Integration priority summary

See [BACKEND_HANDOFF.md §22](./BACKEND_HANDOFF.md#22-recommended-integration-order).

**Highest-risk mock points to replace first:**

1. Auth OTP/PIN — `src/features/legacyAuth/machine.ts`
2. Legacy balance mutations — `src/features/legacyTopup/store.ts`, `src/features/legacyWithdraw/store.ts`
3. Withdraw settlement — `confirmAndSettle()`
4. Payment execution — `src/features/legacyPayment/PaymentServiceScreen.tsx`
5. QR payload generation — `src/features/legacyQr/mockData.ts`
