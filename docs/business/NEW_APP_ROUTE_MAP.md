# NEW app route map

**Audit date:** 2026-09-01  
**Entry:** `/legacy/home?guest=1`  
**Source:** current `src/app/**` + reachability from entry  
**Machine-readable:** [NEW_APP_ROUTE_MAP.json](./NEW_APP_ROUTE_MAP.json)

> Previous Cashhello screenshot/UI generation is **not** evidence for routes. Classification is by current navigation reachability.

## Summary

| Status | Count |
| --- | ---: |
| CURRENT_NEW_APP | 19 |
| STUB | 6 |
| OLD_APP_ONLY / ORPHANED / DEAD_CODE | 21 |
| DEV_ONLY | 1 |
| **Total routes** | **47** |

## Reachability graph (from entry)

```
APP ENTRY (/)
  ↓
GUEST HOME (/legacy/home?guest=1)
  ├── AUTH (/legacy/auth?qaStep=iin)
  ├── SHEETS: topup, withdraw, support
  └── LOGIN CTA → auth

AUTH COMPLETE
  ↓
AUTHORIZED HOME (/legacy/home) + TAB BAR
  ├── PAYMENT (/legacy/payment → /legacy/payment/[id])
  ├── QR (/legacy/qr) [FUTURE backend]
  ├── HISTORY (/legacy/history → detail → receipt)
  ├── PROFILE (/legacy/profile → status, pin, documents stub)
  ├── TOPUP FLOWS (/legacy/topup/between, /legacy/topup/card)
  └── WITHDRAW FLOWS (/legacy/withdraw/card, phone, cashhello-user → loading)
```

## All routes

| route | component | new_app_status | runtime_status | auth_mode | reachable_from |
| --- | --- | --- | --- | --- | --- |
| `/` | Redirect | CURRENT_NEW_APP | CURRENT_REACHABLE | PUBLIC | APP_ENTRY |
| `/legacy/home?guest=1` | LegacyHomeScreen(variant=guest) | CURRENT_NEW_APP | CURRENT_REACHABLE | GUEST | APP_ENTRY; / |
| `/legacy/home` | LegacyHomeScreen(variant=authorized) | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | /legacy/auth complete; TAB:home |
| `/legacy/auth` | LegacyAuthRoute | CURRENT_NEW_APP | CURRENT_REACHABLE | GUEST_OR_FLOW | HOME:login CTA; HOME:gated actions; PROFILE:delete confirm |
| `/legacy/payment` | PaymentScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | GUEST_OR_AUTHORIZED | TAB:payment; HOME:payments Все |
| `/legacy/payment/[id]` | PaymentServiceScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | GUEST_OR_AUTHORIZED | /legacy/payment; HOME:recent ops |
| `/legacy/qr` | ReceiveQrScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | GUEST_OR_AUTHORIZED | TAB:qr |
| `/legacy/history` | HistoryScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | TAB:history; HOME:payments История |
| `/legacy/history/[id]` | OperationDetailsScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | HISTORY:action sheet; DEBUG |
| `/legacy/history/[id]/receipt` | ReceiptScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | /legacy/history/[id] |
| `/legacy/profile` | ProfileScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | TAB:profile; HOME:avatar guest |
| `/legacy/profile/status` | IdentificationStatusScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | /legacy/profile |
| `/legacy/profile/pin` | ChangePinScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | /legacy/profile |
| `/legacy/stub/documents` | GuestStubScreen | STUB | CURRENT_REACHABLE | AUTHORIZED | /legacy/profile |
| `/legacy/topup/between` | BetweenAccountsScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | SHEET:topup authorized |
| `/legacy/topup/card` | ExternalCardScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | SHEET:topup authorized |
| `/legacy/withdraw/card` | CardWithdrawScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | SHEET:withdraw authorized |
| `/legacy/withdraw/phone` | PhoneWithdrawScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | SHEET:withdraw authorized |
| `/legacy/withdraw/cashhello-user` | CashhelloUserWithdrawScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | SHEET:withdraw authorized |
| `/legacy/withdraw/loading` | LoadingWithdrawScreen | CURRENT_NEW_APP | CURRENT_REACHABLE | AUTHORIZED | withdraw flows submit |
| `/legacy/search` | SearchScreen | ORPHANED | ORPHANED | AUTHORIZED | — |
| `/legacy/accounts` | AccountsListScreen | ORPHANED | ORPHANED | AUTHORIZED | — |
| `/legacy/accounts/[id]` | AccountDetailScreen | ORPHANED | ORPHANED | AUTHORIZED | — |
| `/legacy/card` | CardScreen | OLD_APP_ONLY | ORPHANED | AUTHORIZED | — |
| `/legacy/card/limits` | LimitsScreen | OLD_APP_ONLY | ORPHANED | AUTHORIZED | — |
| `/legacy/card/pin` | CardPinScreen | OLD_APP_ONLY | ORPHANED | AUTHORIZED | — |
| `/legacy/messages` | MessagesScreen | OLD_APP_ONLY | ORPHANED | AUTHORIZED | — |
| `/legacy/help` | HelpScreen | OLD_APP_ONLY | ORPHANED | AUTHORIZED | — |
| `/legacy/profile/personal` | PersonalDataScreen | ORPHANED | ORPHANED | AUTHORIZED | — |
| `/legacy/profile/phone` | ChangePhoneScreen | ORPHANED | ORPHANED | AUTHORIZED | — |
| `/legacy/profile/phone/verify` | ChangePhoneVerifyScreen | ORPHANED | ORPHANED | AUTHORIZED | — |
| `/legacy/topup` | MethodSheetScreen(route) | DEAD_CODE | ORPHANED | AUTHORIZED | — |
| `/legacy/topup/cash` | CashTopupScreen | OLD_APP_ONLY | UNREACHABLE | AUTHORIZED | — |
| `/legacy/topup/cash-map` | CashMapScreen | OLD_APP_ONLY | UNREACHABLE | AUTHORIZED | — |
| `/legacy/withdraw` | MethodSelectScreen | DEAD_CODE | ORPHANED | AUTHORIZED | — |
| `/legacy/withdraw/cash` | CashWithdrawScreen | OLD_APP_ONLY | UNREACHABLE | AUTHORIZED | — |
| `/legacy/withdraw/cash-map` | CashMapWithdrawScreen | OLD_APP_ONLY | UNREACHABLE | AUTHORIZED | — |
| `/legacy/withdraw/amount` | AmountWithdrawScreen | OLD_APP_ONLY | UNREACHABLE | AUTHORIZED | — |
| `/legacy/history/filter` | FilterScreen | ORPHANED | DEV_ONLY | AUTHORIZED | DEBUG only |
| `/legacy/stub/registration` | GuestStubScreen | STUB | ORPHANED | GUEST | — |
| `/legacy/stub/bonus` | GuestStubScreen | STUB | ORPHANED | ANY | — |
| `/legacy/stub/cashhello-user` | GuestStubScreen | STUB | ORPHANED | ANY | — |
| `/legacy/stub/linked-cards` | GuestStubScreen | STUB | ORPHANED | AUTHORIZED | — |
| `/legacy/stub/suggest-idea` | GuestStubScreen | STUB | ORPHANED | AUTHORIZED | — |
| `/legacy/stub/qr` | Redirect | DEAD_CODE | ALIAS | ANY | — |
| `/legacy/stub/payment` | Redirect | DEAD_CODE | ALIAS | ANY | — |
| `/dev/foundation` | FoundationScreen | DEV_ONLY | DEV_ONLY | DEV | +not-found |
