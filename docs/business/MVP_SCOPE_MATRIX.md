# MVP scope matrix

**Reconciliation:** CASHELLO_HANDOFF_FINAL_RECONCILIATION · 2026-09-01  
**Machine-readable:** [MVP_SCOPE_MATRIX.json](./MVP_SCOPE_MATRIX.json)

## Business processes (22)

| flow_id | screen/flow | current UI | approved MVP | backend needed | status |
| --- | --- | --- | --- | --- | --- |
| BP-AUTH-001 | Регистрация | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-AUTH-002 | Вход | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-KYC-001 | Идентификация | PROTOTYPE_MOCK | PARKED_ILYA | no | PARKED_ILYA |
| BP-ACC-001 | Просмотр счетов | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-ACC-002 | Открытие счета | PROTOTYPE_MOCK | PARKED_ILYA | no | PARKED_ILYA |
| BP-TOPUP-001 | Пополнение картой | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-TOPUP-002 | Пополнение наличными | PROTOTYPE_MOCK | OUT_OF_MVP | **no** | OUT_OF_MVP |
| BP-TRF-001 | Между своими счетами | PROTOTYPE_MOCK | MVP_PARTIAL_PENDING | yes | MVP_PARTIAL_PENDING |
| BP-P2P-001 | Cashhello user (P2P) | PROTOTYPE_MOCK | MVP_PARTIAL_PENDING | yes | MVP_PARTIAL_PENDING |
| BP-WD-001 | Вывод на карту | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-WD-002 | Вывод на телефон | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-WD-003 | Вывод наличными | PROTOTYPE_MOCK | OUT_OF_MVP | **no** | OUT_OF_MVP |
| BP-PAY-001 | Оплата услуги | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-QR-001 | QR | PROTOTYPE_MOCK | FUTURE | **no** | FUTURE |
| BP-HIST-001 | История/чек | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-HIST-002 | Повтор/отмена | PROTOTYPE_MOCK | MVP_PARTIAL_PENDING | yes | MVP_PARTIAL_PENDING |
| BP-CARD-001 | Карта | PROTOTYPE_MOCK | PARKED_ILYA | **no** | PARKED_ILYA |
| BP-CARD-002 | PIN карты | PROTOTYPE_MOCK | PARKED_ILYA | **no** | PARKED_ILYA |
| BP-PROFILE-001 | Смена телефона | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-PROFILE-002 | Выход/удаление | PROTOTYPE_MOCK | MVP | yes | MVP |
| BP-SUPPORT-001 | Help form | PROTOTYPE_MOCK | LATER | **no** | LATER |
| BP-SUPPORT-002 | Support FAB | PROTOTYPE_MOCK | MVP | config_only | MVP |

**Sum: 22** (11 MVP + 3 MVP_PARTIAL_PENDING + 4 PARKED_ILYA + 2 OUT_OF_MVP + 1 FUTURE + 1 LATER)

## Route classification notes

| Route | Classification | Notes |
| --- | --- | --- |
| `/legacy/withdraw/cashhello-user` | MVP_PARTIAL_PENDING | **P2P** — NOT `/withdraw/cash` |
| `/legacy/withdraw/cash*` | OUT_OF_MVP | Cash pickup only |
| `/legacy/topup/cash*` | OUT_OF_MVP | |
| `/legacy/qr` | FUTURE | Home QR tab nav → same |
| `/legacy/card/**` | PARKED_ILYA | |
| `/legacy/messages`, `/legacy/help` | LATER | |
| CAS-AUTH-004..010, LGC-SCR-068 | PARKED_ILYA | KYC prototype — separate from normal auth |

## Account actions (PARKED until owner resolves)

| Action | Q-ID | Topic |
| --- | --- | --- |
| Открыть счет | Q-ACC-002 | Open account policy |
| Сделать основным | Q-ACC-003 | Primary account |
| Balance/overdraft UI | Q-ACC-004 | Negative balance |
| Выписка / Реквизиты | Q-ACC-006 | Statement format |
