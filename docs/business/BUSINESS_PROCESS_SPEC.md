# Business process specification

**Audit date:** 2026-09-01  
**Source:** derived from current new app screens/actions, reconciled with owner decisions  
**Machine-readable:** [BUSINESS_PROCESS_SPEC.json](./BUSINESS_PROCESS_SPEC.json)

## BP-AUTH-001 — Регистрация нового пользователя

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | GUEST |
| Trigger | Guest login CTA or gated action |
| Happy path | Phone → WhatsApp OTP → PIN create → confirm → authorized home |
| Money effect | None |
| Backend-owned | auth.resolvePhone, auth.requestOtp, auth.verifyOtp, auth.setPin, session |
| Screens (NEW-*) | NEW-AUTH-003,NEW-AUTH-011,NEW-AUTH-012,NEW-AUTH-013,NEW-HOME-001 |
| Actions | NEW-ACT-HOME-G10,NEW-ACT-AUTH-01,NEW-ACT-AUTH-02,NEW-ACT-AUTH-03 |
| Owner decisions | Q-AUTH-001,Q-AUTH-002,Q-AUTH-010 |
| Stop conditions | Do not implement KYC steps as registration requirement until Q-KYC-001 resolved |

## BP-AUTH-002 — Вход возвращающегося пользователя

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | GUEST |
| Trigger | Phone resolves as returning user |
| Happy path | Phone → OTP → PIN login → authorized home |
| Money effect | None |
| Backend-owned | auth.loginPin, session revoke |
| Screens (NEW-*) | NEW-AUTH-011,NEW-AUTH-015 |
| Actions | NEW-ACT-AUTH-02,NEW-ACT-AUTH-04 |
| Owner decisions | Q-AUTH-010 |
| Stop conditions | — |

## BP-KYC-001 — Идентификация (KYC prototype)

| Field | Value |
| --- | --- |
| MVP status | PARKED_ILYA |
| Actors | AUTHORIZED |
| Trigger | Auth KYC chain or profile status |
| Happy path | OWNER_DECISION_REQUIRED |
| Money effect | UNKNOWN |
| Backend-owned | DO_NOT_IMPLEMENT |
| Screens (NEW-*) | NEW-AUTH-004..010,NEW-PROF-002 |
| Actions | NEW-ACT-KYC-01,NEW-ACT-PROF-01 |
| Owner decisions | Q-KYC-001 |
| Stop conditions | PARKED — no backend |

## BP-ACC-001 — Просмотр балансов на Home

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | AUTHORIZED |
| Trigger | Authorized home load |
| Happy path | Display KZT/RUB/USD + bonus balances |
| Money effect | Read-only |
| Backend-owned | accounts.list, balances |
| Screens (NEW-*) | NEW-HOME-002 |
| Actions | NEW-ACT-HOME-A01,NEW-ACT-HOME-G03 |
| Owner decisions | Q-ACC-001,Q-ACC-005 |
| Stop conditions | — |

## BP-ACC-002 — Открытие счета

| Field | Value |
| --- | --- |
| MVP status | PARKED_ILYA |
| Actors | AUTHORIZED |
| Trigger | Orphaned accounts UI only |
| Happy path | N/A in current nav |
| Money effect | N/A |
| Backend-owned | PARKED |
| Screens (NEW-*) | NEW-ORPH-002 |
| Actions | NONE_IN_CURRENT_APP |
| Owner decisions | Q-ACC-002 |
| Stop conditions | Not reachable in current app |

## BP-TOPUP-001 — Пополнение картой

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | AUTHORIZED |
| Trigger | Home top-up → card method |
| Happy path | Select card top-up → enter amount/card → submit → balance update |
| Money effect | Credit account |
| Backend-owned | topup.card, dynamic fee Q-TOPUP-004 |
| Screens (NEW-*) | NEW-SHEET-TOPUP-001,NEW-TOPUP-002 |
| Actions | NEW-ACT-TOP-S02,NEW-ACT-TOP-02 |
| Owner decisions | Q-TOPUP-001,Q-TOPUP-004 |
| Stop conditions | No cash desks |

## BP-TOPUP-002 — Пополнение наличными

| Field | Value |
| --- | --- |
| MVP status | OUT_OF_MVP |
| Actors | N/A |
| Trigger | Unreachable cash routes |
| Happy path | DO NOT IMPLEMENT |
| Money effect | N/A |
| Backend-owned | DO_NOT_IMPLEMENT |
| Screens (NEW-*) | NEW-OLD-CASH-TOPUP |
| Actions | NONE |
| Owner decisions | Q-TOPUP-001 |
| Stop conditions | OUT_OF_MVP |

## BP-TRF-001 — Между своими счетами

| Field | Value |
| --- | --- |
| MVP status | MVP_PARTIAL_PENDING |
| Actors | AUTHORIZED |
| Trigger | Top-up sheet → between accounts |
| Happy path | Select from/to → amount → FX quote → confirm |
| Money effect | Transfer between own accounts |
| Backend-owned | transfers.internal, FX quote Q-TRF-001 |
| Screens (NEW-*) | NEW-TOPUP-001 |
| Actions | NEW-ACT-TOP-S01,NEW-ACT-TOP-01 |
| Owner decisions | Q-TRF-001,Q-TRF-004,Q-ACC-005 |
| Stop conditions | FX rules parked |

## BP-P2P-001 — P2P Cashello user by phone

| Field | Value |
| --- | --- |
| MVP status | MVP_PARTIAL_PENDING |
| Actors | AUTHORIZED |
| Trigger | Withdraw sheet → Cashhello user |
| Happy path | Enter phone → lookup → amount → confirm → send |
| Money effect | Debit sender; credit recipient |
| Backend-owned | p2p.lookupRecipient, p2p.create, limits Q-P2P-006 |
| Screens (NEW-*) | NEW-WD-003 |
| Actions | NEW-ACT-WD-S03,NEW-ACT-WD-03,NEW-ACT-WD-04 |
| Owner decisions | Q-P2P-001,Q-P2P-006 |
| Stop conditions | NOT cash withdrawal — route /withdraw/cashhello-user |

## BP-WD-001 — Вывод на карту

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | AUTHORIZED |
| Trigger | Withdraw sheet → card |
| Happy path | Enter card/amount → fee quote → submit → processing |
| Money effect | Debit account |
| Backend-owned | withdraw.create, dynamic fee Q-WD-003 |
| Screens (NEW-*) | NEW-WD-001,NEW-WD-004 |
| Actions | NEW-ACT-WD-S01,NEW-ACT-WD-01 |
| Owner decisions | Q-WD-001,Q-WD-003 |
| Stop conditions | — |

## BP-WD-002 — Вывод на телефон

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | AUTHORIZED |
| Trigger | Withdraw sheet → phone |
| Happy path | Phone + amount → submit |
| Money effect | Debit account |
| Backend-owned | withdraw.create |
| Screens (NEW-*) | NEW-WD-002 |
| Actions | NEW-ACT-WD-S02,NEW-ACT-WD-02 |
| Owner decisions | Q-WD-003 |
| Stop conditions | Distinct from P2P |

## BP-WD-003 — Вывод наличными

| Field | Value |
| --- | --- |
| MVP status | OUT_OF_MVP |
| Actors | N/A |
| Trigger | Unreachable cash routes |
| Happy path | DO NOT IMPLEMENT |
| Money effect | N/A |
| Backend-owned | DO_NOT_IMPLEMENT |
| Screens (NEW-*) | NEW-OLD-CASH-WD |
| Actions | NONE |
| Owner decisions | Q-WD-001 |
| Stop conditions | OUT_OF_MVP |

## BP-PAY-001 — Оплата услуги

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | GUEST_OR_AUTHORIZED |
| Trigger | Payment tab or home recent |
| Happy path | Browse/search → service → fill fields → pay from account |
| Money effect | Debit selected account |
| Backend-owned | catalog.*, payments.service |
| Screens (NEW-*) | NEW-PAY-001,NEW-PAY-002 |
| Actions | NEW-ACT-PAY-01..07 |
| Owner decisions | Q-PAY-001,Q-PAY-003 |
| Stop conditions | — |

## BP-QR-001 — QR receive

| Field | Value |
| --- | --- |
| MVP status | FUTURE |
| Actors | AUTHORIZED |
| Trigger | QR tab |
| Happy path | Enter amount → generate QR |
| Money effect | Future credit flow |
| Backend-owned | DO NOT IMPLEMENT MVP |
| Screens (NEW-*) | NEW-QR-001 |
| Actions | NEW-ACT-QR-01,NEW-ACT-TAB-03 |
| Owner decisions | Q-QR-001..010 |
| Stop conditions | NO MVP backend |

## BP-HIST-001 — История и чек

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | AUTHORIZED |
| Trigger | History tab |
| Happy path | List → filter by date → detail → receipt |
| Money effect | Read-only |
| Backend-owned | transactions.query, transactions.receipt |
| Screens (NEW-*) | NEW-HIST-001,NEW-HIST-002,NEW-HIST-003 |
| Actions | NEW-ACT-HIST-01..05 |
| Owner decisions | Q-ACC-006 for receipt format |
| Stop conditions | — |

## BP-HIST-002 — Повтор операции

| Field | Value |
| --- | --- |
| MVP status | MVP_PARTIAL_PENDING |
| Actors | AUTHORIZED |
| Trigger | History action sheet repeat |
| Happy path | Prefill withdraw/payment form from op |
| Money effect | New operation if confirmed |
| Backend-owned | transactions.repeat |
| Screens (NEW-*) | NEW-HIST-SHEET-002 |
| Actions | NEW-ACT-HIST-03 |
| Owner decisions | Q-P2P-003 |
| Stop conditions | — |

## BP-CARD-001 — Карта PayDala

| Field | Value |
| --- | --- |
| MVP status | PARKED_ILYA |
| Actors | AUTHORIZED |
| Trigger | Orphaned card routes |
| Happy path | N/A current app |
| Money effect | N/A |
| Backend-owned | DO_NOT_IMPLEMENT |
| Screens (NEW-*) | NEW-OLD-CARD-001 |
| Actions | NONE_IN_CURRENT_APP |
| Owner decisions | Q-CARD-001 |
| Stop conditions | Not in current nav |

## BP-CARD-002 — PIN карты

| Field | Value |
| --- | --- |
| MVP status | PARKED_ILYA |
| Actors | AUTHORIZED |
| Trigger | Orphaned /legacy/card/pin |
| Happy path | N/A current app |
| Money effect | N/A |
| Backend-owned | DO_NOT_IMPLEMENT |
| Screens (NEW-*) | NEW-OLD-CARD-001 |
| Actions | NONE_IN_CURRENT_APP |
| Owner decisions | Q-CARD-001 |
| Stop conditions | PARKED with card product |

## BP-PROFILE-001 — Смена телефона

| Field | Value |
| --- | --- |
| MVP status | MVP_TARGET |
| Actors | AUTHORIZED |
| Trigger | NOT_LINKED — Profile shows phone read-only |
| Happy path | Profile → change phone → OTP verify → updated phone |
| Money effect | None |
| Backend-owned | users.changePhone |
| Screens (NEW-*) | NEW-PROF-001,NEW-ORPH phone routes |
| Actions | NEW-ACT-PROF-GAP-01 |
| Owner decisions | Q-AUTH-002 |
| Stop conditions | CURRENT_UI_GAP — backend may prepare API but UI entry missing |

## BP-PROFILE-002 — Выход и удаление аккаунта

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | AUTHORIZED |
| Trigger | Profile logout/delete |
| Happy path | Confirm → revoke session → guest home or auth |
| Money effect | None |
| Backend-owned | auth.logout, users.delete |
| Screens (NEW-*) | NEW-PROF-001,NEW-PROF-SHEET-001,NEW-PROF-SHEET-002 |
| Actions | NEW-ACT-PROF-05..07 |
| Owner decisions | Q-AUTH-010 |
| Stop conditions | — |

## BP-SUPPORT-001 — Internal help form

| Field | Value |
| --- | --- |
| MVP status | LATER |
| Actors | AUTHORIZED |
| Trigger | Orphaned messages/help |
| Happy path | DO NOT IMPLEMENT MVP |
| Money effect | None |
| Backend-owned | LATER |
| Screens (NEW-*) | NEW-OLD-MSG-001 |
| Actions | NONE |
| Owner decisions | Q-PROFILE-007 |
| Stop conditions | Use external support instead |

## BP-SUPPORT-002 — External support FAB

| Field | Value |
| --- | --- |
| MVP status | MVP |
| Actors | ANY |
| Trigger | Support FAB any screen |
| Happy path | Open sheet → WA or TG deep link |
| Money effect | None |
| Backend-owned | support.contactConfig only |
| Screens (NEW-*) | NEW-SUPPORT-001 |
| Actions | NEW-ACT-SUP-01..04,NEW-ACT-SUP-GAP-01 |
| Owner decisions | Q-SUPPORT-001,Q-SUPPORT-002 |
| Stop conditions | Not ticket system |

