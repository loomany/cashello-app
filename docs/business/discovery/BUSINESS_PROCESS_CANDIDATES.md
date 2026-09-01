# Business process candidates

These are interview and implementation-scope candidates only. They do **not** contain approved business rules.

## BP-AUTH-001 — Регистрация нового пользователя

**Actor:** GUEST\
**Entry screen:** `CAS-AUTH-003`\
**Screens:** `HOME-001`, `CAS-AUTH-003`, `CAS-AUTH-011`, `CAS-AUTH-012`, `CAS-AUTH-013`, `CAS-AUTH-014`, `LGC-SCR-025`\
**Actions:** `ACT-HOME-001-14`, `ACT-CAS-AUTH-003-04`, `ACT-CAS-AUTH-011-02`, `ACT-CAS-AUTH-012-02`\
**Current exit states:** AUTHORIZED_HOME, PIN_MISMATCH

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: authentication is a local state machine with no backend.
- PROTOTYPE_UI_ONLY: guest Home «+500 Б» row (`ACT-HOME-001-14`) is an alternate auth entry; bonus copy is not production policy.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-001`, `Q-AUTH-002`, `Q-AUTH-003`, `Q-AUTH-004`, `Q-AUTH-005`, `Q-AUTH-006`, `Q-AUTH-012`

## BP-AUTH-002 — Вход возвращающегося пользователя

**Actor:** GUEST\
**Entry screen:** `CAS-AUTH-015`\
**Screens:** `CAS-AUTH-015`, `LGC-SCR-025`\
**Actions:** `ACT-CAS-AUTH-015-02`\
**Current exit states:** AUTHORIZED_HOME

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: authentication is a local state machine with no backend.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-001`, `Q-AUTH-006`, `Q-AUTH-007`, `Q-AUTH-008`, `Q-AUTH-009`, `Q-AUTH-010`

## BP-KYC-001 — Идентификация

**Actor:** GUEST_OR_AUTHORIZED\
**Entry screen:** `CAS-AUTH-004`\
**Screens:** `CAS-AUTH-004`, `CAS-AUTH-005`, `CAS-AUTH-006`, `CAS-AUTH-007`, `CAS-AUTH-008`, `CAS-AUTH-009`, `LGC-SCR-068`\
**Actions:** `ACT-CAS-AUTH-005-01`, `ACT-CAS-AUTH-007-02`, `ACT-LGC-SCR-068-04`\
**Current exit states:** LOCAL_CAPTURE_COMPLETE, CANCELLED

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-012`, `Q-P2P-007`, `Q-KYC-001`, `Q-KYC-002`, `Q-KYC-003`, `Q-KYC-004`, `Q-KYC-005`, `Q-KYC-006`, `Q-KYC-007`, `Q-KYC-008`

## BP-ACC-001 — Просмотр и выбор счетов

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-029`\
**Screens:** `LGC-SCR-029`, `LGC-SCR-032`, `LGC-SCR-033`\
**Actions:** `ACT-LGC-SCR-029-03`, `ACT-LGC-SCR-029-06`\
**Current exit states:** ACCOUNT_DETAIL, PRIMARY_CHANGED_LOCAL

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-ACC-001`, `Q-ACC-003`, `Q-ACC-004`, `Q-ACC-005`, `Q-ACC-006`

## BP-ACC-002 — Открытие счета

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-029`\
**Screens:** `LGC-SCR-029`, `LGC-SCR-031`\
**Actions:** `ACT-LGC-SCR-029-02`, `ACT-LGC-SCR-031-02`\
**Current exit states:** REQUEST_RECORDED_LOCAL

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-ACC-001`, `Q-ACC-002`

## BP-TOPUP-001 — Пополнение внешней картой

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-040`\
**Screens:** `LGC-SCR-040`, `LGC-SCR-085`, `CAS-TOPUP-001`, `LGC-SCR-087`, `LGC-SCR-025`\
**Actions:** `ACT-LGC-SCR-040-03`, `ACT-LGC-SCR-085-04`\
**Current exit states:** MOCK_SUCCESS_HOME

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: balances/history are local Zustand data; prototypeConfig.realMoney=false and realBackend=false.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-002`, `Q-TOPUP-003`, `Q-TOPUP-004`, `Q-TOPUP-005`, `Q-TOPUP-006`, `Q-TOPUP-007`, `Q-TOPUP-010`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-TOPUP-002 — Пополнение наличными

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-074`\
**Screens:** `LGC-SCR-074`, `LGC-SCR-080`, `LGC-SCR-081`\
**Actions:** `ACT-LGC-SCR-074-02`, `ACT-LGC-SCR-081-02`\
**Current exit states:** MOCK_PROCESSING_HISTORY

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: balances/history are local Zustand data; prototypeConfig.realMoney=false and realBackend=false.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-001`, `Q-TOPUP-003`, `Q-TOPUP-004`, `Q-TOPUP-008`, `Q-TOPUP-009`, `Q-TOPUP-010`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-TRF-001 — Перевод между своими счетами

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-069`\
**Screens:** `LGC-SCR-069`, `LGC-SCR-070`, `LGC-SCR-071`, `LGC-SCR-073`, `LGC-SCR-025`\
**Actions:** `ACT-LGC-SCR-069-04`, `ACT-LGC-SCR-073-08`\
**Current exit states:** MOCK_SUCCESS_HOME

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: balances/history are local Zustand data; prototypeConfig.realMoney=false and realBackend=false.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TRF-001`, `Q-TRF-002`, `Q-TRF-003`, `Q-TRF-004`, `Q-TRF-005`, `Q-TRF-006`, `Q-TRF-007`, `Q-TRF-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-P2P-001 — Перевод пользователю Cashhello

**Actor:** AUTHORIZED\
**Entry screen:** `CAS-WD-005`\
**Screens:** `CAS-WD-005`\
**Actions:** `ACT-CAS-WD-005-04`, `ACT-CAS-WD-005-07`\
**Current exit states:** BLOCKED_USER_NOT_FOUND

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: balances/history are local Zustand data; prototypeConfig.realMoney=false and realBackend=false.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-P2P-001`, `Q-P2P-002`, `Q-P2P-003`, `Q-P2P-004`, `Q-P2P-005`, `Q-P2P-006`, `Q-P2P-007`, `Q-P2P-008`, `Q-WD-001`, `Q-QR-010`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-WD-001 — Вывод на карту

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-041`\
**Screens:** `LGC-SCR-041`, `WD-002`, `LGC-SCR-091`, `CAS-WD-001`, `CAS-WD-002`, `LGC-SCR-098`, `WD-003`, `LGC-SCR-099`\
**Actions:** `ACT-LGC-SCR-041-02`, `ACT-WD-002-08`\
**Current exit states:** SUCCESS, FAILED, PROCESSING

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: balances/history are local Zustand data; prototypeConfig.realMoney=false and realBackend=false.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-001`, `Q-WD-002`, `Q-WD-003`, `Q-WD-004`, `Q-WD-005`, `Q-WD-006`, `Q-WD-007`, `Q-WD-008`, `Q-WD-013`, `Q-WD-015`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-WD-002 — Вывод на баланс телефона

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-041`\
**Screens:** `LGC-SCR-041`, `WD-004`, `CAS-WD-003`, `LGC-SCR-098`, `WD-003`\
**Actions:** `ACT-LGC-SCR-041-03`, `ACT-WD-004-07`\
**Current exit states:** SUCCESS

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: balances/history are local Zustand data; prototypeConfig.realMoney=false and realBackend=false.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-001`, `Q-WD-002`, `Q-WD-003`, `Q-WD-004`, `Q-WD-005`, `Q-WD-006`, `Q-WD-007`, `Q-WD-008`, `Q-WD-014`, `Q-WD-015`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-WD-003 — Вывод наличными

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-041`\
**Screens:** `LGC-SCR-041`, `LGC-SCR-105`, `LGC-SCR-106`, `LGC-SCR-108`, `LGC-SCR-109`, `LGC-SCR-097`, `LGC-SCR-098`, `WD-003`\
**Actions:** `ACT-LGC-SCR-041-04`, `ACT-LGC-SCR-108-02`, `ACT-LGC-SCR-097-01`\
**Current exit states:** READY_FOR_PICKUP

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: balances/history are local Zustand data; prototypeConfig.realMoney=false and realBackend=false.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-001`, `Q-WD-002`, `Q-WD-003`, `Q-WD-004`, `Q-WD-007`, `Q-WD-008`, `Q-WD-009`, `Q-WD-010`, `Q-WD-011`, `Q-WD-012`, `Q-WD-015`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-PAY-001 — Оплата услуги

**Actor:** GUEST_OR_AUTHORIZED\
**Entry screen:** `PAY-001`\
**Screens:** `LGC-SCR-025`, `LGC-SCR-026`, `PAY-001`, `CAS-PAY-001`, `PAY-002`, `CAS-PAY-002`\
**Actions:** `ACT-LGC-SCR-025-18`…`025-25`, `ACT-LGC-SCR-026-17`…`026-24`, `ACT-PAY-001-10`, `ACT-PAY-002-07`, `ACT-PAY-002-15`\
**Current exit states:** AUTH_GATE, MOCK_ALERT_SUCCESS

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: pay ends in a 900 ms Alert without debit/history.
- CURRENT_MOCK_BEHAVIOR: authorized Home «Последние операции» rows are preview catalog data; row tap is an alternate entry to prefilled `PAY-002` within this process (not a separate business process).

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PAY-001`, `Q-PAY-002`, `Q-PAY-003`, `Q-PAY-004`, `Q-PAY-005`, `Q-PAY-006`, `Q-PAY-007`, `Q-PAY-008`, `Q-PAY-009`, `Q-PAY-010`, `Q-PAY-011`, `Q-PAY-012`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-QR-001 — Получение по QR

**Actor:** GUEST_OR_AUTHORIZED\
**Entry screen:** `QR-001`\
**Screens:** `QR-001`\
**Actions:** `ACT-QR-001-04`, `ACT-QR-001-05`\
**Current exit states:** AUTH_GATE, QR_GENERATED_LOCAL

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: QR is a local cashhello:// URI.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-QR-001`, `Q-QR-002`, `Q-QR-003`, `Q-QR-004`, `Q-QR-005`, `Q-QR-006`, `Q-QR-007`, `Q-QR-008`, `Q-QR-009`, `Q-QR-010`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## BP-HIST-001 — Просмотр истории и чека

**Actor:** GUEST_OR_AUTHORIZED\
**Entry screen:** `LGC-SCR-111`\
**Screens:** `LGC-SCR-111`, `CAS-HIST-001`, `CAS-HIST-002`, `LGC-SCR-115`, `LGC-SCR-120`, `WD-003`, `CAS-HIST-005`\
**Actions:** `ACT-LGC-SCR-111-03`, `ACT-CAS-HIST-002-03`, `ACT-LGC-SCR-115-05`\
**Current exit states:** DETAIL, RECEIPT, AUTH_GATE

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: history is canonical mock data plus local appended operations.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PAY-012`, `Q-HIST-001`, `Q-HIST-002`, `Q-HIST-005`, `Q-HIST-006`, `Q-HIST-007`, `Q-HIST-008`, `Q-HIST-009`, `Q-HIST-010`

## BP-HIST-002 — Повтор и отмена операции

**Actor:** AUTHORIZED\
**Entry screen:** `CAS-HIST-002`\
**Screens:** `CAS-HIST-002`, `LGC-SCR-115`\
**Actions:** `ACT-CAS-HIST-002-02`, `ACT-LGC-SCR-115-03`, `ACT-LGC-SCR-115-04`\
**Current exit states:** REPEAT_ROUTE, REJECTED_LOCAL

**CURRENT PRODUCT OBSERVATION**

- CURRENT_MOCK_BEHAVIOR: history is canonical mock data plus local appended operations.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-009`, `Q-WD-007`, `Q-HIST-003`, `Q-HIST-004`

## BP-CARD-001 — Управление картой

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-035`\
**Screens:** `LGC-SCR-035`, `LGC-SCR-036`, `LGC-SCR-037`, `LGC-SCR-038`, `LGC-SCR-039`\
**Actions:** `ACT-LGC-SCR-035-02`, `ACT-LGC-SCR-035-03`, `ACT-LGC-SCR-038-02`\
**Current exit states:** LOCAL_STATE_CHANGED

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-001`, `Q-CARD-002`, `Q-CARD-003`, `Q-CARD-004`, `Q-CARD-006`, `Q-CARD-007`, `Q-CARD-008`, `Q-CARD-009`, `Q-CARD-010`

## BP-CARD-002 — Изменение PIN карты

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-057`\
**Screens:** `LGC-SCR-057`, `LGC-SCR-059`, `LGC-SCR-060`\
**Actions:** `ACT-LGC-SCR-057-02`\
**Current exit states:** LOCAL_SUCCESS, PIN_MISMATCH

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-005`

## BP-PROFILE-001 — Изменение телефона

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-122`\
**Screens:** `LGC-SCR-122`, `LGC-SCR-123`, `LGC-SCR-066`\
**Actions:** `ACT-LGC-SCR-122-03`, `ACT-LGC-SCR-123-02`\
**Current exit states:** PROFILE_LOCAL_UPDATED

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PROFILE-001`, `Q-PROFILE-002`

## BP-PROFILE-002 — Выход и удаление профиля

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-066`\
**Screens:** `LGC-SCR-066`, `CAS-PROFILE-001`, `CAS-PROFILE-002`, `HOME-001`, `CAS-AUTH-003`\
**Actions:** `ACT-LGC-SCR-066-09`, `ACT-LGC-SCR-066-10`, `ACT-CAS-PROFILE-002-01`\
**Current exit states:** GUEST_HOME, AUTH_ENTRY

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-011`, `Q-PROFILE-003`, `Q-PROFILE-004`, `Q-PROFILE-005`, `Q-PROFILE-006`

## BP-SUPPORT-001 — Обращение в поддержку

**Actor:** AUTHORIZED\
**Entry screen:** `LGC-SCR-125`\
**Screens:** `LGC-SCR-125`, `LGC-SCR-126`\
**Actions:** `ACT-LGC-SCR-125-03`, `ACT-LGC-SCR-126-02`\
**Current exit states:** FORM_FILLED_NO_SUBMIT

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screens/actions are traced in the manifests; production policy remains unapproved.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PROFILE-007`, `Q-PROFILE-008`

## BP-SUPPORT-002 — Контакт поддержки через глобальный FAB

**Actor:** ANY (guest and authorized)\
**Entry screen:** any `/legacy/*` product screen (documented on `HOME-001` / `LGC-SCR-025`)\
**Screens:** `HOME-001`, `LGC-SCR-025`, `CAS-SUPPORT-002`\
**Actions:** `ACT-GLOBAL-SUPPORT-01`, `ACT-CAS-SUPPORT-002-02`, `ACT-CAS-SUPPORT-002-03`\
**Current exit states:** SHEET_OPEN, ALERT_LINK_UNAVAILABLE

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: headset FAB is mounted globally in `src/app/legacy/_layout.tsx`.
- CURRENT_MOCK_BEHAVIOR: Telegram/WhatsApp URLs are `null`; tap shows Alert «Скоро».
- PROTOTYPE_UI_ONLY: «24/7» is on-screen copy only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-SUPPORT-001`, `Q-SUPPORT-002`, `Q-SUPPORT-003`, `Q-SUPPORT-004`, `Q-SUPPORT-005`
