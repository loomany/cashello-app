# Cashello product screen catalog

This catalog records **current observable product behavior**. It does not approve production business rules.

Classification labels used: `FIGMA_FACT`, `CURRENT_CODE_FACT`, `CURRENT_RUNTIME_FACT`, `CURRENT_MOCK_BEHAVIOR`, `PROTOTYPE_UI_ONLY`, `TECHNICAL_RECOMMENDATION`, `OWNER_DECISION_REQUIRED`, `UNKNOWN`.

## Stable ID policy

- Existing meaningful IDs are preserved.
- `HOME-002` is an alias of canonical `LGC-SCR-025` (authorized home). Source comments use HOME-002; `useScreenMeta` records `LGC-SCR-025`.
- `CAS-<MODULE>-###` IDs disambiguate states with no usable ID.
- Source collision: `WD-005` is used both for the Cashhello-user form and the phone-withdraw history receipt. This audit uses `CAS-WD-005` and `CAS-HIST-005` while retaining `WD-005` as an alias.
- Legacy node IDs outside the approved Figma file are traceability aliases only, **not Figma coverage**.

## Complete route audit

| Route                             | File                                         | Class       | Screen ID(s)                                                                                                                                                                                                                                   | Screenshot / reason                                                                                         |
| --------------------------------- | -------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `/`                               | `src/app/index.tsx`                          | PRODUCT     | HOME-001                                                                                                                                                                                                                                       | NO_SCREENSHOT_REASON — Immediate redirect to `/legacy/home?guest=1` (`PUBLIC_ROOT_HREF`); no independent UI |
| `+not-found`                      | `src/app/+not-found.tsx`                     | DEBUG       | —                                                                                                                                                                                                                                              | NO — Framework error placeholder, not a product screen                                                      |
| `/dev/foundation`                 | `src/app/dev/foundation.tsx`                 | DEV_ONLY    | —                                                                                                                                                                                                                                              | NO — Infrastructure lab explicitly marked non-product                                                       |
| `/legacy/auth`                    | `src/app/legacy/auth.tsx`                    | STATE       | `CAS-AUTH-001`, `CAS-AUTH-002`, `CAS-AUTH-003`, `CAS-AUTH-004`, `CAS-AUTH-005`, `CAS-AUTH-006`, `CAS-AUTH-007`, `CAS-AUTH-008`, `CAS-AUTH-009`, `CAS-AUTH-010`, `CAS-AUTH-011`, `CAS-AUTH-012`, `CAS-AUTH-013`, `CAS-AUTH-014`, `CAS-AUTH-015` | YES                                                                                                         |
| `/legacy/home`                    | `src/app/legacy/home.tsx`                    | STATE       | `HOME-001`, `LGC-SCR-025`, `LGC-SCR-026`, `CAS-HOME-003`, `CAS-HOME-004`                                                                                                                                                       | YES                                                                                                         |
| `/legacy/search`                  | `src/app/legacy/search.tsx`                  | PRODUCT     | `LGC-SCR-061`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/qr`                      | `src/app/legacy/qr.tsx`                      | PRODUCT     | `QR-001`                                                                                                                                                                                                                                       | YES                                                                                                         |
| `/legacy/messages`                | `src/app/legacy/messages.tsx`                | PRODUCT     | `LGC-SCR-125`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/help`                    | `src/app/legacy/help.tsx`                    | PRODUCT     | `LGC-SCR-126`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/withdraw`                | `src/app/legacy/withdraw/index.tsx`          | PRODUCT     | `LGC-SCR-041`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/withdraw/card`           | `src/app/legacy/withdraw/card.tsx`           | STATE       | `WD-002`, `LGC-SCR-091`, `LGC-SCR-092`, `CAS-WD-001`, `CAS-WD-002`                                                                                                                                                                             | YES                                                                                                         |
| `/legacy/withdraw/phone`          | `src/app/legacy/withdraw/phone.tsx`          | PRODUCT     | `WD-004`, `CAS-WD-003`                                                                                                                                                                                                                         | YES                                                                                                         |
| `/legacy/withdraw/cashhello-user` | `src/app/legacy/withdraw/cashhello-user.tsx` | PRODUCT     | `CAS-WD-005`                                                                                                                                                                                                                                   | YES                                                                                                         |
| `/legacy/withdraw/cash`           | `src/app/legacy/withdraw/cash.tsx`           | PRODUCT     | `LGC-SCR-105`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/withdraw/cash-map`       | `src/app/legacy/withdraw/cash-map.tsx`       | STATE       | `LGC-SCR-106`, `LGC-SCR-108`                                                                                                                                                                                                                   | YES                                                                                                         |
| `/legacy/withdraw/amount`         | `src/app/legacy/withdraw/amount.tsx`         | STATE       | `LGC-SCR-093`, `LGC-SCR-095`, `LGC-SCR-096`, `LGC-SCR-109`, `LGC-SCR-097`                                                                                                                                                                      | YES                                                                                                         |
| `/legacy/withdraw/loading`        | `src/app/legacy/withdraw/loading.tsx`        | STATE       | `LGC-SCR-098`, `LGC-SCR-099`, `WD-003`                                                                                                                                                                                                         | YES                                                                                                         |
| `/legacy/topup`                   | `src/app/legacy/topup/index.tsx`             | SHEET/MODAL | `LGC-SCR-040`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/topup/between`           | `src/app/legacy/topup/between.tsx`           | STATE       | `LGC-SCR-069`, `LGC-SCR-070`, `LGC-SCR-071`, `LGC-SCR-073`                                                                                                                                                                                     | YES                                                                                                         |
| `/legacy/topup/card`              | `src/app/legacy/topup/card.tsx`              | STATE       | `LGC-SCR-085`, `LGC-SCR-087`, `CAS-TOPUP-001`                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/topup/cash`              | `src/app/legacy/topup/cash.tsx`              | PRODUCT     | `LGC-SCR-074`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/topup/cash-map`          | `src/app/legacy/topup/cash-map.tsx`          | STATE       | `LGC-SCR-080`, `LGC-SCR-081`                                                                                                                                                                                                                   | YES                                                                                                         |
| `/legacy/payment`                 | `src/app/legacy/payment/index.tsx`           | PRODUCT     | `PAY-001`, `CAS-PAY-001`                                                                                                                                                                                                                       | YES                                                                                                         |
| `/legacy/payment/[id]`            | `src/app/legacy/payment/[id].tsx`            | PRODUCT     | `PAY-002`, `CAS-PAY-002`                                                                                                                                                                                                                       | YES                                                                                                         |
| `/legacy/history`                 | `src/app/legacy/history/index.tsx`           | PRODUCT     | `LGC-SCR-111`, `CAS-HIST-001`, `CAS-HIST-002`                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/history/filter`          | `src/app/legacy/history/filter.tsx`          | PRODUCT     | `LGC-SCR-113`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/history/[id]`            | `src/app/legacy/history/[id]/index.tsx`      | STATE       | `LGC-SCR-115`, `WD-003`, `CAS-HIST-005`                                                                                                                                                                                                        | YES                                                                                                         |
| `/legacy/history/[id]/receipt`    | `src/app/legacy/history/[id]/receipt.tsx`    | PRODUCT     | `LGC-SCR-120`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/card`                    | `src/app/legacy/card/index.tsx`              | STATE       | `LGC-SCR-035`, `LGC-SCR-036`, `LGC-SCR-037`                                                                                                                                                                                                    | YES                                                                                                         |
| `/legacy/card/limits`             | `src/app/legacy/card/limits.tsx`             | STATE       | `LGC-SCR-038`, `LGC-SCR-039`                                                                                                                                                                                                                   | YES                                                                                                         |
| `/legacy/card/pin`                | `src/app/legacy/card/pin.tsx`                | STATE       | `LGC-SCR-057`, `LGC-SCR-059`, `LGC-SCR-060`                                                                                                                                                                                                    | YES                                                                                                         |
| `/legacy/accounts`                | `src/app/legacy/accounts/index.tsx`          | STATE       | `LGC-SCR-029`, `LGC-SCR-031`                                                                                                                                                                                                                   | YES                                                                                                         |
| `/legacy/accounts/[id]`           | `src/app/legacy/accounts/[id].tsx`           | STATE       | `LGC-SCR-032`, `LGC-SCR-033`, `LGC-SCR-034`, `LGC-SCR-040`                                                                                                                                                                                     | YES                                                                                                         |
| `/legacy/profile`                 | `src/app/legacy/profile/index.tsx`           | PRODUCT     | `LGC-SCR-066`, `CAS-PROFILE-001`, `CAS-PROFILE-002`                                                                                                                                                                                            | YES                                                                                                         |
| `/legacy/profile/personal`        | `src/app/legacy/profile/personal.tsx`        | PRODUCT     | `LGC-SCR-067`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/profile/status`          | `src/app/legacy/profile/status.tsx`          | PRODUCT     | `LGC-SCR-068`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/profile/pin`             | `src/app/legacy/profile/pin.tsx`             | PRODUCT     | `LGC-SCR-124`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/profile/phone`           | `src/app/legacy/profile/phone/index.tsx`     | PRODUCT     | `LGC-SCR-122`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/profile/phone/verify`    | `src/app/legacy/profile/phone/verify.tsx`    | PRODUCT     | `LGC-SCR-123`                                                                                                                                                                                                                                  | YES                                                                                                         |
| `/legacy/stub/registration`       | `src/app/legacy/stub/registration.tsx`       | STUB        | `CAS-STUB-001`                                                                                                                                                                                                                                 | YES                                                                                                         |
| `/legacy/stub/bonus`              | `src/app/legacy/stub/bonus.tsx`              | STUB        | `CAS-STUB-002`                                                                                                                                                                                                                                 | YES                                                                                                         |
| `/legacy/stub/cashhello-user`     | `src/app/legacy/stub/cashhello-user.tsx`     | STUB        | `CAS-STUB-003`                                                                                                                                                                                                                                 | YES                                                                                                         |
| `/legacy/stub/linked-cards`       | `src/app/legacy/stub/linked-cards.tsx`       | STUB        | `CAS-STUB-004`                                                                                                                                                                                                                                 | YES                                                                                                         |
| `/legacy/stub/documents`          | `src/app/legacy/stub/documents.tsx`          | STUB        | `CAS-STUB-006`                                                                                                                                                                                                                                 | YES                                                                                                         |
| `/legacy/stub/suggest-idea`       | `src/app/legacy/stub/suggest-idea.tsx`       | STUB        | `CAS-STUB-005`                                                                                                                                                                                                                                 | YES                                                                                                         |
| `/legacy/stub/qr`                 | `src/app/legacy/stub/qr.tsx`                 | UNKNOWN     | —                                                                                                                                                                                                                                              | NO — Immediate redirect to /legacy/qr; no UI                                                                |
| `/legacy/stub/payment`            | `src/app/legacy/stub/payment.tsx`            | UNKNOWN     | —                                                                                                                                                                                                                                              | NO — Immediate redirect to /legacy/payment; no UI                                                           |

Non-route files under `src/app/**`: `src/app/+html.tsx`, `src/app/_layout.tsx`, `src/app/dev/_layout.tsx`, `src/app/legacy/_layout.tsx`, `src/app/legacy/accounts/_layout.tsx`, `src/app/legacy/card/_layout.tsx`, `src/app/legacy/history/_layout.tsx`, `src/app/legacy/profile/_layout.tsx`, `src/app/legacy/profile/phone/_layout.tsx`, `src/app/legacy/topup/_layout.tsx`, `src/app/legacy/withdraw/_layout.tsx`.

## CAS-AUTH-001 — Авторизация — заставка

**Canonical ID:** CAS-AUTH-001\
**Aliases:** LGC-SCR; legacyNodeId 648:16634\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=splash`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:16634\
**Frontend:** `src/features/legacyAuth/screens/OnboardingView.tsx`\
**Primary screenshot:** [Авторизация — заставка](./screenshots/annotated/CAS-AUTH-001__splash.png)\
**State screenshots:** [SPLASH](./screenshots/annotated/CAS-AUTH-001__splash.png)

**Purpose:** Transient entry state before registration/login input.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-001-01`, `ACT-CAS-AUTH-001-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-001-01` — Продолжить по касанию → LOCAL_STATE: Auth step: iin
- [02] `ACT-CAS-AUTH-001-02` — Автопереход через 1400 мс → LOCAL_STATE: Auth step: iin

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: tap or a 1400 ms timer advances to the IIN/phone entry step.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: the 1400 ms timing is not an approved session or authentication rule.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-AUTH-002 — Авторизация — онбординг

**Canonical ID:** CAS-AUTH-002\
**Aliases:** LGC-SCR; legacyNodeId 829:24292\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=onboarding`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 829:24292\
**Frontend:** `src/features/legacyAuth/screens/OnboardingView.tsx`\
**Primary screenshot:** [Авторизация — онбординг](./screenshots/annotated/CAS-AUTH-002__onboarding.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/CAS-AUTH-002__onboarding.png)

**Purpose:** Introductory slides reconstructed for QA access.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-002-01`, `ACT-CAS-AUTH-002-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-002-01` — Пропустить → LOCAL_STATE: Auth step: iin
- [02] `ACT-CAS-AUTH-002-02` — Далее → LOCAL_STATE: Next onboarding page / auth step: iin

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: the normal runtime path skips this state; it is reachable via qaStep/debug jump.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: slide progression and skip are local state only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-AUTH-003 — Авторизация — ввод телефона

**Canonical ID:** CAS-AUTH-003\
**Aliases:** LGC-SCR; legacyNodeId 770:23233\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=iin`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 770:23233\
**Frontend:** `src/features/legacyAuth/screens/RegisterIinView.tsx`\
**Primary screenshot:** [Авторизация — ввод телефона](./screenshots/annotated/CAS-AUTH-003__phone-entry.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/CAS-AUTH-003__phone-entry.png), [FORM_FILLED](./screenshots/annotated/CAS-AUTH-003__phone-entry-filled.png)

**Purpose:** Guest authentication/registration entry using a phone-shaped input despite the historical iin state name.

**Entry points:** `ACT-CAS-AUTH-011-01`, `ACT-HOME-001-02`, `ACT-HOME-001-12`\
**Exit points:** `ACT-CAS-AUTH-003-01`, `ACT-CAS-AUTH-003-02`, `ACT-CAS-AUTH-003-03`, `ACT-CAS-AUTH-003-04`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-003-01` — Cashhello — выйти → ROUTE: /legacy/home?guest=1
- [02] `ACT-CAS-AUTH-003-02` — Назад / закрыть → ROUTE: /legacy/home?guest=1
- [03] `ACT-CAS-AUTH-003-03` — Номер телефона → LOCAL_STATE: Auth phoneDigits
- [04] `ACT-CAS-AUTH-003-04` — Войти → LOCAL_STATE: Auth step: verification

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: pressing “Войти” advances to the verification state.
- CURRENT_CODE_FACT: brand/back exits to guest Home.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no account lookup distinguishes new and returning users.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-001`

## CAS-AUTH-004 — Авторизация — подтверждение личности

**Canonical ID:** CAS-AUTH-004\
**Aliases:** LGC-SCR; legacyNodeId 924:24543\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=identity`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 924:24543\
**Frontend:** `src/features/legacyAuth/screens/IdentityView.tsx`\
**Primary screenshot:** [Авторизация — подтверждение личности](./screenshots/annotated/CAS-AUTH-004__identity-intro.png)\
**State screenshots:** [QA_ONLY](./screenshots/annotated/CAS-AUTH-004__identity-intro.png)

**Purpose:** Reconstructed identity intro state.

**Entry points:** Direct route / state transition\
**Exit points:** Automatic/local-only state\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- None in this state.

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: not connected to the normal auth path; reachable through QA jump only.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no identity provider is called.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-012`, `Q-KYC-001`

## CAS-AUTH-005 — Авторизация — сканирование лица

**Canonical ID:** CAS-AUTH-005\
**Aliases:** LGC-SCR; legacyNodeId 648:17611\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=face`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17611\
**Frontend:** `src/features/legacyAuth/components/CameraChrome.tsx`\
**Primary screenshot:** [Авторизация — сканирование лица](./screenshots/annotated/CAS-AUTH-005__face-camera.png)\
**State screenshots:** [CAMERA_MOCK](./screenshots/annotated/CAS-AUTH-005__face-camera.png)

**Purpose:** Camera-shaped KYC face capture state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-005-01`, `ACT-CAS-AUTH-005-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-005-01` — Сканировать / камера → LOCAL_STATE: Auth step: documentFront
- [02] `ACT-CAS-AUTH-005-02` — Отмена → LOCAL_STATE: Auth step: iin

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: camera surface advances to documentFront; cancel returns to iin.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: synthetic camera grain; no image capture or KYC request.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-KYC-003`

## CAS-AUTH-006 — Авторизация — резервный сценарий лица

**Canonical ID:** CAS-AUTH-006\
**Aliases:** LGC-SCR; legacyNodeId 924:24543\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=faceFallback`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 924:24543\
**Frontend:** `src/features/legacyAuth/screens/FaceFallbackView.tsx`\
**Primary screenshot:** [Авторизация — резервный сценарий лица](./screenshots/annotated/CAS-AUTH-006__face-fallback.png)\
**State screenshots:** [FALLBACK](./screenshots/annotated/CAS-AUTH-006__face-fallback.png)

**Purpose:** Fallback prompt for face capture.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-006-01`, `ACT-CAS-AUTH-006-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-006-01` — Сканировать → LOCAL_STATE: Auth step: documentFront
- [02] `ACT-CAS-AUTH-006-02` — Отмена → LOCAL_STATE: Auth step: iin

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: scan continues to documentFront; cancel returns to iin.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: fallback is local navigation only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-KYC-004`

## CAS-AUTH-007 — Авторизация — документ, лицевая сторона

**Canonical ID:** CAS-AUTH-007\
**Aliases:** LGC-SCR; legacyNodeId 924:24618\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=documentFront`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 924:24618\
**Frontend:** `src/features/legacyAuth/components/CameraChrome.tsx`\
**Primary screenshot:** [Авторизация — документ, лицевая сторона](./screenshots/annotated/CAS-AUTH-007__document-front.png)\
**State screenshots:** [CAMERA_MOCK](./screenshots/annotated/CAS-AUTH-007__document-front.png)

**Purpose:** Reconstructed document capture state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-007-01`, `ACT-CAS-AUTH-007-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-007-01` — Закрыть → LOCAL_STATE: Previous auth capture step
- [02] `ACT-CAS-AUTH-007-02` — Снять → LOCAL_STATE: Next auth capture step

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: capture advances through the local document state machine.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no document image is stored or sent.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-KYC-003`

## CAS-AUTH-008 — Авторизация — переворот документа

**Canonical ID:** CAS-AUTH-008\
**Aliases:** LGC-SCR; legacyNodeId 930:25629\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=documentTurn`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 930:25629\
**Frontend:** `src/features/legacyAuth/components/CameraChrome.tsx`\
**Primary screenshot:** [Авторизация — переворот документа](./screenshots/annotated/CAS-AUTH-008__document-turn.png)\
**State screenshots:** [CAMERA_MOCK](./screenshots/annotated/CAS-AUTH-008__document-turn.png)

**Purpose:** Reconstructed document capture state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-008-01`, `ACT-CAS-AUTH-008-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-008-01` — Закрыть → LOCAL_STATE: Previous auth capture step
- [02] `ACT-CAS-AUTH-008-02` — Снять → LOCAL_STATE: Next auth capture step

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: capture advances through the local document state machine.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no document image is stored or sent.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-AUTH-009 — Авторизация — документ, обратная сторона

**Canonical ID:** CAS-AUTH-009\
**Aliases:** LGC-SCR; legacyNodeId 930:25673\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=documentBack`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 930:25673\
**Frontend:** `src/features/legacyAuth/components/CameraChrome.tsx`\
**Primary screenshot:** [Авторизация — документ, обратная сторона](./screenshots/annotated/CAS-AUTH-009__document-back.png)\
**State screenshots:** [CAMERA_MOCK](./screenshots/annotated/CAS-AUTH-009__document-back.png)

**Purpose:** Reconstructed document capture state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-009-01`, `ACT-CAS-AUTH-009-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-009-01` — Закрыть → LOCAL_STATE: Previous auth capture step
- [02] `ACT-CAS-AUTH-009-02` — Снять → LOCAL_STATE: Next auth capture step

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: capture advances through the local document state machine.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no document image is stored or sent.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-AUTH-010 — Авторизация — телефон после KYC

**Canonical ID:** CAS-AUTH-010\
**Aliases:** LGC-SCR; legacyNodeId 802:22943\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=phone`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 802:22943\
**Frontend:** `src/features/legacyAuth/screens/PhoneView.tsx`\
**Primary screenshot:** [Авторизация — телефон после KYC](./screenshots/annotated/CAS-AUTH-010__kyc-phone.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/CAS-AUTH-010__kyc-phone.png)

**Purpose:** Phone collection state in the extended QA-only KYC path.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-010-01`, `ACT-CAS-AUTH-010-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-010-01` — Номер телефона → LOCAL_STATE: Auth phoneDigits
- [02] `ACT-CAS-AUTH-010-02` — Далее → LOCAL_STATE: Auth step: verification

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: submit advances to verification.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no phone ownership check.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-AUTH-011 — Авторизация — SMS-код

**Canonical ID:** CAS-AUTH-011\
**Aliases:** LGC-SCR; legacyNodeId 648:17063\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=verification`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17063\
**Frontend:** `src/features/legacyAuth/screens/PhoneView.tsx`\
**Primary screenshot:** [Авторизация — SMS-код](./screenshots/annotated/CAS-AUTH-011__otp.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/CAS-AUTH-011__otp.png), [FORM_FILLED](./screenshots/annotated/CAS-AUTH-011__otp-filled.png)

**Purpose:** Four-digit verification state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-011-01`, `ACT-CAS-AUTH-011-02`, `ACT-CAS-AUTH-011-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-011-01` — Назад / закрыть → BACK: /legacy/auth?qaStep=iin
- [02] `ACT-CAS-AUTH-011-02` — SMS-код → LOCAL_STATE: Auth sms
- [03] `ACT-CAS-AUTH-011-03` — Отправить повторно через 00:34 → NO_OP_STUB: No handler

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: entering any four digits advances to PIN creation.
- CURRENT_CODE_FACT: resend text is not interactive.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no OTP provider, expiry, resend, or attempt policy.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-002`, `Q-AUTH-003`, `Q-AUTH-004`, `Q-AUTH-005`

## CAS-AUTH-012 — Авторизация — создание PIN

**Canonical ID:** CAS-AUTH-012\
**Aliases:** LGC-SCR; legacyNodeId 648:16740\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=pinCreate`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:16740\
**Frontend:** `src/features/legacyAuth/screens/PinView.tsx`\
**Primary screenshot:** [Авторизация — создание PIN](./screenshots/annotated/CAS-AUTH-012__pin-create.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/CAS-AUTH-012__pin-create.png), [FORM_FILLED](./screenshots/annotated/CAS-AUTH-012__pin-create-filled.png)

**Purpose:** Local six-digit access-code state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-012-01`, `ACT-CAS-AUTH-012-02`, `ACT-CAS-AUTH-012-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-012-01` — Cashhello — выйти → ROUTE: /legacy/home?guest=1
- [02] `ACT-CAS-AUTH-012-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: Auth PIN state machine
- [03] `ACT-CAS-AUTH-012-03` — Удалить цифру → LOCAL_STATE: Auth PIN state machine

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: six keypad taps automatically advance the local auth machine.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: PIN exists only in local state; no retry lockout or server/device credential.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-006`

## CAS-AUTH-013 — Авторизация — повтор PIN

**Canonical ID:** CAS-AUTH-013\
**Aliases:** LGC-SCR; legacyNodeId 648:16878\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=pinRepeat`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:16878\
**Frontend:** `src/features/legacyAuth/screens/PinView.tsx`\
**Primary screenshot:** [Авторизация — повтор PIN](./screenshots/annotated/CAS-AUTH-013__pin-repeat.png)\
**State screenshots:** [CONFIRMATION](./screenshots/annotated/CAS-AUTH-013__pin-repeat.png), [FORM_FILLED](./screenshots/annotated/CAS-AUTH-013__pin-repeat-filled.png)

**Purpose:** Local six-digit access-code state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-013-01`, `ACT-CAS-AUTH-013-02`, `ACT-CAS-AUTH-013-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-013-01` — Cashhello — выйти → ROUTE: /legacy/home?guest=1
- [02] `ACT-CAS-AUTH-013-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: Auth PIN state machine
- [03] `ACT-CAS-AUTH-013-03` — Удалить цифру → LOCAL_STATE: Auth PIN state machine

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: six keypad taps automatically advance the local auth machine.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: PIN exists only in local state; no retry lockout or server/device credential.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-AUTH-014 — Авторизация — ошибка PIN

**Canonical ID:** CAS-AUTH-014\
**Aliases:** LGC-SCR; legacyNodeId 648:16930\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=pinError`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:16930\
**Frontend:** `src/features/legacyAuth/screens/PinView.tsx`\
**Primary screenshot:** [Авторизация — ошибка PIN](./screenshots/annotated/CAS-AUTH-014__pin-error.png)\
**State screenshots:** [FAILED](./screenshots/annotated/CAS-AUTH-014__pin-error.png), [FAILED](./screenshots/annotated/CAS-AUTH-014__pin-mismatch-runtime.png)

**Purpose:** Local six-digit access-code state.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-014-01`, `ACT-CAS-AUTH-014-02`, `ACT-CAS-AUTH-014-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-014-01` — Cashhello — выйти → ROUTE: /legacy/home?guest=1
- [02] `ACT-CAS-AUTH-014-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: Auth PIN state machine
- [03] `ACT-CAS-AUTH-014-03` — Удалить цифру → LOCAL_STATE: Auth PIN state machine

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: six keypad taps automatically advance the local auth machine.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: PIN exists only in local state; no retry lockout or server/device credential.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-AUTH-015 — Авторизация — вход по PIN

**Canonical ID:** CAS-AUTH-015\
**Aliases:** LGC-SCR; legacyNodeId 804:23186\
**Module:** AUTH\
**Route:** `/legacy/auth?qaStep=pinLogin`\
**Auth state:** GUEST\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 804:23186\
**Frontend:** `src/features/legacyAuth/screens/PinView.tsx`\
**Primary screenshot:** [Авторизация — вход по PIN](./screenshots/annotated/CAS-AUTH-015__pin-login.png)\
**State screenshots:** [RETURNING_USER](./screenshots/annotated/CAS-AUTH-015__pin-login.png)

**Purpose:** Returning-user PIN entry reconstruction.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-AUTH-015-01`, `ACT-CAS-AUTH-015-02`, `ACT-CAS-AUTH-015-03`, `ACT-CAS-AUTH-015-04`, `ACT-CAS-AUTH-015-05`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-AUTH-015-01` — Cashhello — выйти → ROUTE: /legacy/home?guest=1
- [02] `ACT-CAS-AUTH-015-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: Auth PIN login
- [03] `ACT-CAS-AUTH-015-03` — Удалить цифру → LOCAL_STATE: Auth PIN login
- [04] `ACT-CAS-AUTH-015-04` — Face ID → NO_OP_STUB: No handler
- [05] `ACT-CAS-AUTH-015-05` — Забыл код доступа → NO_OP_STUB: No handler

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: any six digits transition to authorized Home.
- CURRENT_CODE_FACT: no normal UI path selects this state.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: forgotten PIN and Face ID are non-functional visual controls.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-001`, `Q-AUTH-006`, `Q-AUTH-007`, `Q-AUTH-008`, `Q-AUTH-010`

## HOME-001 — Главная для гостя

**Canonical ID:** HOME-001\
**Aliases:** Figma frame 7:5\
**Module:** HOME\
**Route:** `/legacy/home?guest=1`\
**Auth state:** GUEST\
**Figma:** FIGMA_FACT — node 7:5 (https://www.figma.com/design/RbjNBmxd2FERlisMJoru3I/Cashello-Daur?node-id=7-5)\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/HomeScreen.tsx`\
**Primary screenshot:** [Главная для гостя](./screenshots/annotated/HOME-001__guest-home.png)\
**State screenshots:** [GUEST](./screenshots/annotated/HOME-001__guest-home.png)

**Purpose:** Browsable guest landing page with zeroed account previews and login gates.

**Entry points:** `ACT-CAS-AUTH-003-01`, `ACT-CAS-AUTH-003-02`, `ACT-CAS-AUTH-012-01`, `ACT-CAS-AUTH-013-01`, `ACT-CAS-AUTH-014-01`, `ACT-CAS-AUTH-015-01`, `ACT-HOME-001-01`, `ACT-CAS-PROFILE-001-01`\
**Exit points:** `ACT-HOME-001-01`, `ACT-HOME-001-02`, `ACT-HOME-001-03`, `ACT-HOME-001-04`, `ACT-HOME-001-05`, `ACT-HOME-001-14`, `ACT-HOME-001-12`, `ACT-HOME-001-13`\
**Visible business data:** 0 ₸ / 0 ₽ / 0 $ / 0 Б; Service and history preview mock rows

**Interactive elements**

- [01] `ACT-HOME-001-01` — Cashhello — на главную → ROUTE: /legacy/home?guest=1
- [02] `ACT-HOME-001-02` — Профиль → GUEST_GATE: /legacy/auth?qaStep=iin
- [03] `ACT-HOME-001-03` — Показать / скрыть балансы → LOCAL_STATE: balancesHidden
- [04] `ACT-HOME-001-04` — Пополнить → LOCAL_STATE: TopupSelectSheet
- [05] `ACT-HOME-001-05` — Вывести → LOCAL_STATE: WithdrawSelectSheet
- [06] `ACT-HOME-001-14` — Бонус за регистрацию → GUEST_GATE: /legacy/auth?qaStep=iin (PROTOTYPE_UI_ONLY mock +500 Б copy)
- [12] `ACT-HOME-001-12` — Войти → ROUTE: /legacy/auth?qaStep=iin
- [13] `ACT-HOME-001-13` — Служба поддержки (headset FAB) → SHEET: CAS-SUPPORT-002

**CURRENT PRODUCT OBSERVATION**

- FIGMA_FACT: approved frame 7:5 is 375×812.
- CURRENT_RUNTIME_FACT: payment/history browsing is allowed; protected execution redirects to auth.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: guest balances display zero independent of the in-memory authorized balance store.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-025 — Главная авторизованного пользователя

**Canonical ID:** LGC-SCR-025\
**Aliases:** HOME-002; legacyNodeId 765:22510\
**Module:** HOME\
**Route:** `/legacy/home`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 765:22510\
**Frontend:** `src/features/legacyHome/HomeScreen.tsx`\
**Primary screenshot:** [Главная авторизованного пользователя](./screenshots/annotated/LGC-SCR-025__authorized-home.png)\
**State screenshots:** [AUTHORIZED](./screenshots/annotated/LGC-SCR-025__authorized-home.png), [BALANCES_HIDDEN](./screenshots/annotated/LGC-SCR-025__balances-hidden.png)

**Purpose:** Primary authorized navigation and balance overview.

**Entry points:** `ACT-CAS-AUTH-003-01`, `ACT-CAS-AUTH-003-02`, `ACT-CAS-AUTH-012-01`, `ACT-CAS-AUTH-013-01`, `ACT-CAS-AUTH-014-01`, `ACT-CAS-AUTH-015-01`, `ACT-HOME-001-01`, `ACT-LGC-SCR-025-01`, `ACT-LGC-SCR-025-12`, `ACT-LGC-SCR-026-01`, `ACT-LGC-SCR-026-12`, `ACT-LGC-SCR-029-01`\
**Exit points:** `ACT-LGC-SCR-025-01`, `ACT-LGC-SCR-025-02`, `ACT-LGC-SCR-025-03`, `ACT-LGC-SCR-025-04`, `ACT-LGC-SCR-025-05`, `ACT-LGC-SCR-025-06`, `ACT-LGC-SCR-025-07`, `ACT-LGC-SCR-025-08`, `ACT-LGC-SCR-025-09`, `ACT-LGC-SCR-025-10`, `ACT-LGC-SCR-025-11`, `ACT-LGC-SCR-025-12`, `ACT-LGC-SCR-025-13`, `ACT-LGC-SCR-025-14`, `ACT-LGC-SCR-025-15`, `ACT-LGC-SCR-025-16`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-025-01` — Cashhello — на главную → ROUTE: /legacy/home
- [02] `ACT-LGC-SCR-025-02` — Профиль → ROUTE: /legacy/profile
- [03] `ACT-LGC-SCR-025-03` — Показать / скрыть балансы → LOCAL_STATE: balancesHidden
- [04] `ACT-LGC-SCR-025-04` — Пополнить → LOCAL_STATE: TopupSelectSheet
- [05] `ACT-LGC-SCR-025-05` — Вывести → LOCAL_STATE: WithdrawSelectSheet
- [06] `ACT-LGC-SCR-025-10` — См. все → ROUTE: /legacy/history
- [07] `ACT-LGC-SCR-025-18` — Ubet (последняя операция) → ROUTE: /legacy/payment/ubet?phone=&amount= (CURRENT_MOCK_BEHAVIOR)
- [08] `ACT-LGC-SCR-025-19` — Oinabet → prefilled PAY-002
- [09] `ACT-LGC-SCR-025-20` — Tennisi → prefilled PAY-002
- [10] `ACT-LGC-SCR-025-21` — Робокэш / Займер → prefilled PAY-002
- [11] `ACT-LGC-SCR-025-22` — CreditBar → prefilled PAY-002
- [12] `ACT-LGC-SCR-025-23` — i-credit.kz → prefilled PAY-002
- [13] `ACT-LGC-SCR-025-24` — Kengo → prefilled PAY-002
- [14] `ACT-LGC-SCR-025-25` — Sat Credit → prefilled PAY-002
- [12] `ACT-LGC-SCR-025-12` — Главная → ROUTE: /legacy/home
- [13] `ACT-LGC-SCR-025-13` — Оплата → ROUTE: /legacy/payment
- [14] `ACT-LGC-SCR-025-14` — QR → ROUTE: /legacy/qr
- [15] `ACT-LGC-SCR-025-15` — История → ROUTE: /legacy/history
- [16] `ACT-LGC-SCR-025-16` — Профиль → ROUTE: /legacy/profile
- [17] `ACT-LGC-SCR-025-17` — Служба поддержки (headset FAB) → SHEET: CAS-SUPPORT-002

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: top-up, withdraw, service, history and bottom navigation are active.
- CURRENT_CODE_FACT: mounting resets the legacy top-up store to canonical demo balances.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: balances, bonus, services and operations are synthetic.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-009`

## LGC-SCR-026 — Главная — ссылка фильтра истории

**Canonical ID:** LGC-SCR-026\
**Aliases:** legacyNodeId 980:26275\
**Module:** HOME\
**Route:** `/legacy/home?historyLink=filter`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 980:26275\
**Frontend:** `src/features/legacyHome/HomeScreen.tsx`\
**Primary screenshot:** [Главная — ссылка фильтра истории](./screenshots/annotated/LGC-SCR-026__history-filter-link.png)\
**State screenshots:** [FILTER_LINK_VARIANT](./screenshots/annotated/LGC-SCR-026__history-filter-link.png)

**Purpose:** Authorized Home variant whose history header links to the full filter screen.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-LGC-SCR-026-01`, `ACT-LGC-SCR-026-02`, `ACT-LGC-SCR-026-03`, `ACT-LGC-SCR-026-04`, `ACT-LGC-SCR-026-05`, `ACT-LGC-SCR-026-06`, `ACT-LGC-SCR-026-07`, `ACT-LGC-SCR-026-08`, `ACT-LGC-SCR-026-09`, `ACT-LGC-SCR-026-10`, `ACT-LGC-SCR-026-11`, `ACT-LGC-SCR-026-12`, `ACT-LGC-SCR-026-13`, `ACT-LGC-SCR-026-14`, `ACT-LGC-SCR-026-15`, `ACT-LGC-SCR-026-16`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-026-01` — Cashhello — на главную → ROUTE: /legacy/home
- [02] `ACT-LGC-SCR-026-02` — Профиль → ROUTE: /legacy/profile
- [03] `ACT-LGC-SCR-026-03` — Показать / скрыть балансы → LOCAL_STATE: balancesHidden
- [04] `ACT-LGC-SCR-026-04` — Пополнить → LOCAL_STATE: TopupSelectSheet
- [05] `ACT-LGC-SCR-026-05` — Вывести → LOCAL_STATE: WithdrawSelectSheet
- [06] `ACT-LGC-SCR-026-10` — Фильтр → ROUTE: /legacy/history/filter
- [07–14] `ACT-LGC-SCR-026-17`…`026-24` — Последние операции rows → prefilled PAY-002 (CURRENT_MOCK_BEHAVIOR)
- [12] `ACT-LGC-SCR-026-12` — Главная → ROUTE: /legacy/home
- [13] `ACT-LGC-SCR-026-13` — Оплата → ROUTE: /legacy/payment
- [14] `ACT-LGC-SCR-026-14` — QR → ROUTE: /legacy/qr
- [15] `ACT-LGC-SCR-026-15` — История → ROUTE: /legacy/history
- [16] `ACT-LGC-SCR-026-16` — Профиль → ROUTE: /legacy/profile

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: selected only by the historyLink query parameter/debug jump.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: this query variant is a reconstruction aid, not an approved navigation rule.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-HOME-003 — Главная — выбор способа пополнения

**Canonical ID:** CAS-HOME-003\
**Aliases:** Home TopupSelectSheet; LGC-SCR-040 component reuse\
**Module:** HOME\
**Route:** `/legacy/home (sheet)`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyTopup/MethodSheetScreen.tsx`\
**Primary screenshot:** [Главная — выбор способа пополнения](./screenshots/annotated/CAS-HOME-003__topup-sheet-guest.png)\
**State screenshots:** [GUEST](./screenshots/annotated/CAS-HOME-003__topup-sheet-guest.png), [AUTHORIZED](./screenshots/annotated/CAS-HOME-003__topup-sheet-authorized.png)

**Purpose:** Home-local top-up method sheet.

**Entry points:** `ACT-CAS-AUTH-003-01`, `ACT-CAS-AUTH-003-02`, `ACT-CAS-AUTH-012-01`, `ACT-CAS-AUTH-013-01`, `ACT-CAS-AUTH-014-01`, `ACT-CAS-AUTH-015-01`, `ACT-HOME-001-01`, `ACT-LGC-SCR-025-01`, `ACT-LGC-SCR-025-12`, `ACT-LGC-SCR-026-01`, `ACT-LGC-SCR-026-12`, `ACT-LGC-SCR-029-01`\
**Exit points:** `ACT-CAS-HOME-003-01`, `ACT-CAS-HOME-003-02`, `ACT-CAS-HOME-003-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-HOME-003-01` — Закрыть → LOCAL_STATE: Close sheet
- [02] `ACT-CAS-HOME-003-02` — Между счетами → GUEST_GATE: /legacy/topup/between?to=kzt-primary
- [03] `ACT-CAS-HOME-003-03` — Картой другого банка → GUEST_GATE: /legacy/topup/card?to=kzt-primary

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: guest method selection redirects to auth; authorized selection opens the selected flow.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_CODE_FACT: cash top-up is not listed even though cash routes exist.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-HOME-004 — Главная — выбор способа вывода

**Canonical ID:** CAS-HOME-004\
**Aliases:** Home WithdrawSelectSheet\
**Module:** HOME\
**Route:** `/legacy/home (sheet)`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/WithdrawSelectSheet.tsx`\
**Primary screenshot:** [Главная — выбор способа вывода](./screenshots/annotated/CAS-HOME-004__withdraw-sheet-guest.png)\
**State screenshots:** [GUEST](./screenshots/annotated/CAS-HOME-004__withdraw-sheet-guest.png), [AUTHORIZED](./screenshots/annotated/CAS-HOME-004__withdraw-sheet-authorized.png)

**Purpose:** Home-local withdraw method sheet.

**Entry points:** `ACT-CAS-AUTH-003-01`, `ACT-CAS-AUTH-003-02`, `ACT-CAS-AUTH-012-01`, `ACT-CAS-AUTH-013-01`, `ACT-CAS-AUTH-014-01`, `ACT-CAS-AUTH-015-01`, `ACT-HOME-001-01`, `ACT-LGC-SCR-025-01`, `ACT-LGC-SCR-025-12`, `ACT-LGC-SCR-026-01`, `ACT-LGC-SCR-026-12`, `ACT-LGC-SCR-029-01`\
**Exit points:** `ACT-CAS-HOME-004-01`, `ACT-CAS-HOME-004-02`, `ACT-CAS-HOME-004-03`, `ACT-CAS-HOME-004-04`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-HOME-004-01` — Закрыть → LOCAL_STATE: Close sheet
- [02] `ACT-CAS-HOME-004-02` — Карта → GUEST_GATE: /legacy/withdraw/card
- [03] `ACT-CAS-HOME-004-03` — Баланс телефона → GUEST_GATE: /legacy/withdraw/phone
- [04] `ACT-CAS-HOME-004-04` — Пользователю Cashhello → GUEST_GATE: /legacy/withdraw/cashhello-user

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: guest method selection redirects to auth.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_CODE_FACT: this sheet lists card, phone and Cashhello user, while the full method route lists card, phone, cash and “other”.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-001`


## CAS-SUPPORT-002 — Служба поддержки

**Canonical ID:** CAS-SUPPORT-002\
**Aliases:** GLOBAL_SUPPORT_SHEET\
**Module:** SUPPORT\
**Route:** overlay on `/legacy/*` (no dedicated route)\
**Auth state:** ANY\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/SupportContactSheet.tsx`\
**Primary screenshot:** [Служба поддержки](./screenshots/annotated/CAS-SUPPORT-002__sheet-authorized.png)\
**State screenshots:** [GUEST_SHEET](./screenshots/annotated/CAS-SUPPORT-002__sheet-guest.png), [AUTHORIZED_SHEET](./screenshots/annotated/CAS-SUPPORT-002__sheet-authorized.png)

**Purpose:** Global contact sheet opened from the headset FAB on every legacy product screen.

**Entry points:** `ACT-GLOBAL-SUPPORT-01`, `ACT-HOME-001-13`, `ACT-LGC-SCR-025-17`\
**Exit points:** `ACT-CAS-SUPPORT-002-01`, `ACT-CAS-SUPPORT-002-02`, `ACT-CAS-SUPPORT-002-03`, `ACT-CAS-SUPPORT-002-04`\
**Visible business data:** Channel labels only; no ticket, SLA, or live chat.

**Interactive elements**

- [01] `ACT-GLOBAL-SUPPORT-01` — Headset FAB → SHEET: CAS-SUPPORT-002
- [02] `ACT-CAS-SUPPORT-002-01` — Закрыть → LOCAL_STATE: close sheet
- [03] `ACT-CAS-SUPPORT-002-02` — Телеграм 24/7 → NO_OP_STUB: Alert «Скоро»
- [04] `ACT-CAS-SUPPORT-002-03` — Whatsapp 24/7 → NO_OP_STUB: Alert «Скоро»
- [05] `ACT-CAS-SUPPORT-002-04` — Затемнение → LOCAL_STATE: close sheet

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: `SupportContactHost` is mounted in `src/app/legacy/_layout.tsx` on all `/legacy/*` screens.
- CURRENT_CODE_FACT: FAB bottom offset is 98px for guest and 80px for authorized (`resolveSupportFabBottom`).
- CURRENT_RUNTIME_FACT: guest and authorized users both see the FAB.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: `SUPPORT_CONTACT_LINKS.telegram` and `.whatsapp` are `null`.
- PROTOTYPE_UI_ONLY: copy «24/7» is not an approved staffing SLA.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-SUPPORT-001`, `Q-SUPPORT-002`, `Q-SUPPORT-003`, `Q-SUPPORT-004`, `Q-SUPPORT-005`

## LGC-SCR-029 — Счета — список

**Canonical ID:** LGC-SCR-029\
**Aliases:** legacyNodeId 648:19007\
**Module:** ACCOUNTS\
**Route:** `/legacy/accounts`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:19007\
**Frontend:** `src/features/legacyAccounts/AccountsListScreen.tsx`\
**Primary screenshot:** [Счета — список](./screenshots/annotated/LGC-SCR-029__accounts-list.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-029__accounts-list.png)

**Purpose:** List demo accounts, open account details, select a primary account and open the currency sheet.

**Entry points:** `ACT-LGC-SCR-029-03`, `ACT-LGC-SCR-029-04`, `ACT-LGC-SCR-029-05`, `ACT-LGC-SCR-032-01`, `ACT-LGC-SCR-033-01`, `ACT-LGC-SCR-035-01`, `ACT-LGC-SCR-036-01`\
**Exit points:** `ACT-LGC-SCR-029-01`, `ACT-LGC-SCR-029-02`, `ACT-LGC-SCR-029-03`, `ACT-LGC-SCR-029-04`, `ACT-LGC-SCR-029-05`, `ACT-LGC-SCR-029-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-029-01` — Назад / закрыть → BACK: /legacy/home
- [02] `ACT-LGC-SCR-029-02` — Открыть счет → LOCAL_STATE: LGC-SCR-031 sheet
- [03] `ACT-LGC-SCR-029-03` — Счет ₸ — основной → ROUTE: /legacy/accounts/kzt-primary
- [04] `ACT-LGC-SCR-029-04` — Счет ₸ — второй → ROUTE: /legacy/accounts/kzt-secondary
- [05] `ACT-LGC-SCR-029-05` — Счет $ → ROUTE: /legacy/accounts/usd
- [06] `ACT-LGC-SCR-029-06` — Сделать основным → LOCAL_STATE: accounts.primaryAccountId

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: account rows route to dynamic account detail screens.
- CURRENT_CODE_FACT: swipe action stores a primaryAccountId locally.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: three synthetic accounts and balances.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-ACC-001`, `Q-ACC-003`

## LGC-SCR-031 — Счета — выбор валюты нового счета

**Canonical ID:** LGC-SCR-031\
**Aliases:** legacyNodeId 648:19059\
**Module:** ACCOUNTS\
**Route:** `/legacy/accounts (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:19059\
**Frontend:** `src/features/legacyAccounts/AccountsListScreen.tsx`\
**Primary screenshot:** [Счета — выбор валюты нового счета](./screenshots/annotated/LGC-SCR-031__open-account-sheet.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/LGC-SCR-031__open-account-sheet.png), [SELECTED](./screenshots/annotated/LGC-SCR-031__open-account-request-recorded.png)

**Purpose:** Select the currency for an account-open request.

**Entry points:** `ACT-LGC-SCR-029-03`, `ACT-LGC-SCR-029-04`, `ACT-LGC-SCR-029-05`, `ACT-LGC-SCR-032-01`, `ACT-LGC-SCR-033-01`, `ACT-LGC-SCR-035-01`, `ACT-LGC-SCR-036-01`\
**Exit points:** `ACT-LGC-SCR-031-01`, `ACT-LGC-SCR-031-02`, `ACT-LGC-SCR-031-03`, `ACT-LGC-SCR-031-04`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-031-01` — Закрыть / фон → LOCAL_STATE: Close sheet
- [02] `ACT-LGC-SCR-031-02` — Тенге → LOCAL_STATE: lastOpenCurrency=KZT
- [03] `ACT-LGC-SCR-031-03` — Доллар → LOCAL_STATE: lastOpenCurrency=USD
- [04] `ACT-LGC-SCR-031-04` — Рубль → LOCAL_STATE: lastOpenCurrency=RUB

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: selecting a currency closes the sheet and leaves the visible account list unchanged.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: markOpenCurrency records only lastOpenCurrency; no account is created.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-ACC-001`, `Q-ACC-002`

## LGC-SCR-032 — Счет — реквизиты без карты

**Canonical ID:** LGC-SCR-032\
**Aliases:** legacyNodeId 648:20120; legacyNodeId 648:20152\
**Module:** ACCOUNTS\
**Route:** `/legacy/accounts/[id]`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20120\
**Frontend:** `src/features/legacyAccounts/AccountDetailScreen.tsx`\
**Primary screenshot:** [Счет — реквизиты без карты](./screenshots/annotated/LGC-SCR-032__kzt-primary.png)\
**State screenshots:** [KZT_PRIMARY](./screenshots/annotated/LGC-SCR-032__kzt-primary.png), [KZT_SECONDARY](./screenshots/annotated/LGC-SCR-032__kzt-secondary.png)

**Purpose:** Account requisites, balance, actions and related history.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-LGC-SCR-032-01`, `ACT-LGC-SCR-032-02`, `ACT-LGC-SCR-032-03`, `ACT-LGC-SCR-032-04`, `ACT-LGC-SCR-032-05`, `ACT-LGC-SCR-032-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-032-01` — Назад / закрыть → BACK: /legacy/accounts
- [02] `ACT-LGC-SCR-032-02` — Карта счета → ROUTE: /legacy/card
- [03] `ACT-LGC-SCR-032-03` — Скачать → LOCAL_STATE: LGC-SCR-034 sheet
- [04] `ACT-LGC-SCR-032-04` — Пополнить → LOCAL_STATE: LGC-SCR-040 sheet
- [05] `ACT-LGC-SCR-032-05` — См. все — история → ROUTE: /legacy/history
- [06] `ACT-LGC-SCR-032-06` — Операция истории → ROUTE: /legacy/history/[id]

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: dynamic account id selects static account metadata.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: requisites and balances are synthetic.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-ACC-004`, `Q-ACC-005`

## LGC-SCR-033 — Счет — реквизиты с картой

**Canonical ID:** LGC-SCR-033\
**Aliases:** legacyNodeId 648:20196\
**Module:** ACCOUNTS\
**Route:** `/legacy/accounts/usd`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20196\
**Frontend:** `src/features/legacyAccounts/AccountDetailScreen.tsx`\
**Primary screenshot:** [Счет — реквизиты с картой](./screenshots/annotated/LGC-SCR-033__usd-account.png)\
**State screenshots:** [HAS_CARD](./screenshots/annotated/LGC-SCR-033__usd-account.png)

**Purpose:** Account detail variant with a linked-card preview.

**Entry points:** `ACT-LGC-SCR-029-05`\
**Exit points:** `ACT-LGC-SCR-033-01`, `ACT-LGC-SCR-033-02`, `ACT-LGC-SCR-033-03`, `ACT-LGC-SCR-033-04`, `ACT-LGC-SCR-033-05`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-033-01` — Назад / закрыть → BACK: /legacy/accounts
- [02] `ACT-LGC-SCR-033-02` — Карта счета → ROUTE: /legacy/card
- [03] `ACT-LGC-SCR-033-03` — Скачать → LOCAL_STATE: LGC-SCR-034 sheet
- [04] `ACT-LGC-SCR-033-04` — Пополнить → LOCAL_STATE: LGC-SCR-040 sheet
- [05] `ACT-LGC-SCR-033-05` — См. все — история → ROUTE: /legacy/history

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: tapping the card preview routes to the shared card hub.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: card/account relationship is static mock data.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-002`

## LGC-SCR-034 — Счет — скачать данные

**Canonical ID:** LGC-SCR-034\
**Aliases:** legacyNodeId 821:29038\
**Module:** ACCOUNTS\
**Route:** `/legacy/accounts/[id] (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:29038\
**Frontend:** `src/features/legacyAccounts/AccountDetailScreen.tsx`\
**Primary screenshot:** [Счет — скачать данные](./screenshots/annotated/LGC-SCR-034__download-sheet.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/LGC-SCR-034__download-sheet.png)

**Purpose:** Choose statement or requisites download.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-LGC-SCR-034-01`, `ACT-LGC-SCR-034-02`, `ACT-LGC-SCR-034-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-034-01` — Выписку → LOCAL_STATE: lastDownload=statement
- [02] `ACT-LGC-SCR-034-02` — Реквизиты → LOCAL_STATE: lastDownload=requisites
- [03] `ACT-LGC-SCR-034-03` — Отменить → LOCAL_STATE: Close sheet

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: selecting an item only records the local lastDownload value.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no file is generated or downloaded.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-ACC-006`

## LGC-SCR-040 — Пополнение — выбор способа

**Canonical ID:** LGC-SCR-040\
**Aliases:** legacyNodeId 648:20275; Account-detail top-up component reuse\
**Module:** TOPUP\
**Route:** `/legacy/topup`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20275\
**Frontend:** `src/features/legacyTopup/MethodSheetScreen.tsx`\
**Primary screenshot:** [Пополнение — выбор способа](./screenshots/annotated/LGC-SCR-040__method-sheet.png)\
**State screenshots:** [ROUTE_SHEET](./screenshots/annotated/LGC-SCR-040__method-sheet.png), [EMBEDDED_SHEET](./screenshots/annotated/LGC-SCR-040__account-method-sheet.png)

**Purpose:** Top-up method selection used as a route and embedded account sheet.

**Entry points:** `ACT-CAS-HOME-003-02`, `ACT-CAS-HOME-003-03`, `ACT-LGC-SCR-040-02`, `ACT-LGC-SCR-040-03`, `ACT-LGC-SCR-061-03`, `ACT-LGC-SCR-061-06`, `ACT-LGC-SCR-069-01`, `ACT-LGC-SCR-070-01`, `ACT-LGC-SCR-073-01`, `ACT-LGC-SCR-085-01`, `ACT-LGC-SCR-087-01`, `ACT-LGC-SCR-074-01`\
**Exit points:** `ACT-LGC-SCR-040-01`, `ACT-LGC-SCR-040-02`, `ACT-LGC-SCR-040-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-040-01` — Назад / закрыть → BACK: /legacy/home
- [02] `ACT-LGC-SCR-040-02` — Между счетами → ROUTE: /legacy/topup/between?to={accountId}
- [03] `ACT-LGC-SCR-040-03` — Картой другого банка → ROUTE: /legacy/topup/card?to={accountId}

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: offers own-account transfer and external bank card only.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_CODE_FACT: cash copy/routes exist but cash is not rendered in this selector.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-001`

## LGC-SCR-035 — Карта — данные скрыты

**Canonical ID:** LGC-SCR-035\
**Aliases:** legacyNodeId 648:20359\
**Module:** CARD\
**Route:** `/legacy/card`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20359\
**Frontend:** `src/features/legacyCard/CardScreen.tsx`\
**Primary screenshot:** [Карта — данные скрыты](./screenshots/annotated/LGC-SCR-035__card-hidden.png)\
**State screenshots:** [CVV_HIDDEN](./screenshots/annotated/LGC-SCR-035__card-hidden.png)

**Purpose:** Card overview and local management actions.

**Entry points:** `ACT-LGC-SCR-032-02`, `ACT-LGC-SCR-033-02`, `ACT-LGC-SCR-035-04`, `ACT-LGC-SCR-035-05`, `ACT-LGC-SCR-036-04`, `ACT-LGC-SCR-036-05`, `ACT-LGC-SCR-038-01`, `ACT-LGC-SCR-057-01`, `ACT-LGC-SCR-059-01`, `ACT-LGC-SCR-060-01`, `ACT-LGC-SCR-061-05`\
**Exit points:** `ACT-LGC-SCR-035-01`, `ACT-LGC-SCR-035-02`, `ACT-LGC-SCR-035-03`, `ACT-LGC-SCR-035-04`, `ACT-LGC-SCR-035-05`, `ACT-LGC-SCR-035-06`, `ACT-LGC-SCR-035-07`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-035-01` — Назад / закрыть → BACK: /legacy/accounts
- [02] `ACT-LGC-SCR-035-02` — Показать CVV → LOCAL_STATE: card.face
- [03] `ACT-LGC-SCR-035-03` — Заблокировать → LOCAL_STATE: LGC-SCR-037 modal
- [04] `ACT-LGC-SCR-035-04` — Лимиты → ROUTE: /legacy/card/limits
- [05] `ACT-LGC-SCR-035-05` — Сменить PIN-код → ROUTE: /legacy/card/pin
- [06] `ACT-LGC-SCR-035-06` — Подключить Apple Pay → NO_OP_STUB: applePayTapped=true
- [07] `ACT-LGC-SCR-035-07` — Подключить Google Pay → NO_OP_STUB: googlePayTapped=true

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: block, wallet, limits and PIN actions are local/store navigation only.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: synthetic card and issuer behavior.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-001`, `Q-CARD-002`, `Q-CARD-007`, `Q-CARD-008`, `Q-CARD-009`

## LGC-SCR-036 — Карта — CVV показан

**Canonical ID:** LGC-SCR-036\
**Aliases:** legacyNodeId 648:20467\
**Module:** CARD\
**Route:** `/legacy/card`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20467\
**Frontend:** `src/features/legacyCard/CardScreen.tsx`\
**Primary screenshot:** [Карта — CVV показан](./screenshots/annotated/LGC-SCR-036__cvv-visible.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [CVV_VISIBLE](./screenshots/annotated/LGC-SCR-036__cvv-visible.png)

**Purpose:** Card face state with locally revealed CVV.

**Entry points:** `ACT-LGC-SCR-032-02`, `ACT-LGC-SCR-033-02`, `ACT-LGC-SCR-035-04`, `ACT-LGC-SCR-035-05`, `ACT-LGC-SCR-036-04`, `ACT-LGC-SCR-036-05`, `ACT-LGC-SCR-038-01`, `ACT-LGC-SCR-057-01`, `ACT-LGC-SCR-059-01`, `ACT-LGC-SCR-060-01`, `ACT-LGC-SCR-061-05`\
**Exit points:** `ACT-LGC-SCR-036-01`, `ACT-LGC-SCR-036-02`, `ACT-LGC-SCR-036-03`, `ACT-LGC-SCR-036-04`, `ACT-LGC-SCR-036-05`, `ACT-LGC-SCR-036-06`, `ACT-LGC-SCR-036-07`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-036-01` — Назад / закрыть → BACK: /legacy/accounts
- [02] `ACT-LGC-SCR-036-02` — Скрыть CVV → LOCAL_STATE: card.face
- [03] `ACT-LGC-SCR-036-03` — Заблокировать → LOCAL_STATE: LGC-SCR-037 modal
- [04] `ACT-LGC-SCR-036-04` — Лимиты → ROUTE: /legacy/card/limits
- [05] `ACT-LGC-SCR-036-05` — Сменить PIN-код → ROUTE: /legacy/card/pin
- [06] `ACT-LGC-SCR-036-06` — Подключить Apple Pay → NO_OP_STUB: applePayTapped=true
- [07] `ACT-LGC-SCR-036-07` — Подключить Google Pay → NO_OP_STUB: googlePayTapped=true

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: eye control toggles this state without authentication challenge.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: CVV reveal has no issuer/security integration.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-010`

## LGC-SCR-037 — Карта — подтверждение блокировки

**Canonical ID:** LGC-SCR-037\
**Aliases:** legacyNodeId 648:20509\
**Module:** CARD\
**Route:** `/legacy/card (modal)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20509\
**Frontend:** `src/features/legacyCard/CardScreen.tsx`\
**Primary screenshot:** [Карта — подтверждение блокировки](./screenshots/annotated/LGC-SCR-037__block-confirmation.png)\
**State screenshots:** [CONFIRMATION](./screenshots/annotated/LGC-SCR-037__block-confirmation.png), [BLOCKED_LOCAL](./screenshots/annotated/LGC-SCR-037__after-block.png)

**Purpose:** Confirm card block in the local prototype store.

**Entry points:** `ACT-LGC-SCR-032-02`, `ACT-LGC-SCR-033-02`, `ACT-LGC-SCR-035-04`, `ACT-LGC-SCR-035-05`, `ACT-LGC-SCR-036-04`, `ACT-LGC-SCR-036-05`, `ACT-LGC-SCR-038-01`, `ACT-LGC-SCR-057-01`, `ACT-LGC-SCR-059-01`, `ACT-LGC-SCR-060-01`, `ACT-LGC-SCR-061-05`\
**Exit points:** `ACT-LGC-SCR-037-01`, `ACT-LGC-SCR-037-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-037-01` — Заблокировать → LOCAL_STATE: card.blocked=true
- [02] `ACT-LGC-SCR-037-02` — Отменить → LOCAL_STATE: Close modal

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: confirm sets blocked=true; the base screen shows no material post-block visual change.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no issuer command, unfreeze or error handling.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-003`, `Q-CARD-004`

## LGC-SCR-038 — Карта — лимиты

**Canonical ID:** LGC-SCR-038\
**Aliases:** legacyNodeId 648:20425\
**Module:** CARD\
**Route:** `/legacy/card/limits`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20425\
**Frontend:** `src/features/legacyCard/LimitsScreen.tsx`\
**Primary screenshot:** [Карта — лимиты](./screenshots/annotated/LGC-SCR-038__limits.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-038__limits.png)

**Purpose:** Display the current local card spending limit.

**Entry points:** `ACT-LGC-SCR-035-04`, `ACT-LGC-SCR-036-04`\
**Exit points:** `ACT-LGC-SCR-038-01`, `ACT-LGC-SCR-038-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-038-01` — Назад / закрыть → BACK: /legacy/card
- [02] `ACT-LGC-SCR-038-02` — Изменить лимит → LOCAL_STATE: LGC-SCR-039 sheet

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: edit opens a local preset sheet.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: limit values and remaining amount are local.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-006`

## LGC-SCR-039 — Карта — выбор лимита

**Canonical ID:** LGC-SCR-039\
**Aliases:** legacyNodeId 821:29193\
**Module:** CARD\
**Route:** `/legacy/card/limits (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:29193\
**Frontend:** `src/features/legacyCard/LimitsScreen.tsx`\
**Primary screenshot:** [Карта — выбор лимита](./screenshots/annotated/LGC-SCR-039__limit-sheet.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/LGC-SCR-039__limit-sheet.png), [SELECTED](./screenshots/annotated/LGC-SCR-039__limit-selected.png), [APPLIED](./screenshots/annotated/LGC-SCR-039__limit-applied.png)

**Purpose:** Select and apply a local limit preset.

**Entry points:** `ACT-LGC-SCR-035-04`, `ACT-LGC-SCR-036-04`\
**Exit points:** `ACT-LGC-SCR-039-01`, `ACT-LGC-SCR-039-02`, `ACT-LGC-SCR-039-03`, `ACT-LGC-SCR-039-04`, `ACT-LGC-SCR-039-05`, `ACT-LGC-SCR-039-06`, `ACT-LGC-SCR-039-07`, `ACT-LGC-SCR-039-08`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-039-01` — Закрыть → LOCAL_STATE: Close sheet
- [02] `ACT-LGC-SCR-039-02` — 10 000₸ → LOCAL_STATE: limitDraft=10 000₸
- [03] `ACT-LGC-SCR-039-03` — 20 000₸ → LOCAL_STATE: limitDraft=20 000₸
- [04] `ACT-LGC-SCR-039-04` — 50 000₸ → LOCAL_STATE: limitDraft=50 000₸
- [05] `ACT-LGC-SCR-039-05` — 100 000₸ → LOCAL_STATE: limitDraft=100 000₸
- [06] `ACT-LGC-SCR-039-06` — 500 000₸ → LOCAL_STATE: limitDraft=500 000₸
- [07] `ACT-LGC-SCR-039-07` — Без лимита → LOCAL_STATE: limitDraft=Без лимита
- [08] `ACT-LGC-SCR-039-08` — Готово → LOCAL_STATE: Apply limit and close

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: choosing 100 000₸ and pressing Done changes local displayed values.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no issuer acknowledgement or pending/error state.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-006`

## LGC-SCR-057 — Карта — новый PIN

**Canonical ID:** LGC-SCR-057\
**Aliases:** legacyNodeId 821:26267\
**Module:** CARD\
**Route:** `/legacy/card/pin`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:26267\
**Frontend:** `src/features/legacyCard/CardPinScreen.tsx`\
**Primary screenshot:** [Карта — новый PIN](./screenshots/annotated/LGC-SCR-057__pin-create.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-057__pin-create.png)

**Purpose:** Local card PIN state machine.

**Entry points:** `ACT-LGC-SCR-035-05`, `ACT-LGC-SCR-036-05`\
**Exit points:** `ACT-LGC-SCR-057-01`, `ACT-LGC-SCR-057-02`, `ACT-LGC-SCR-057-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-057-01` — Назад / закрыть → BACK: /legacy/card
- [02] `ACT-LGC-SCR-057-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: Card PIN state machine
- [03] `ACT-LGC-SCR-057-03` — Удалить цифру → LOCAL_STATE: Card PIN state machine

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: six digits advance; a matching repeat returns to card.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: PIN is not sent to an issuer or secure element.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-CARD-005`

## LGC-SCR-059 — Карта — повтор PIN

**Canonical ID:** LGC-SCR-059\
**Aliases:** legacyNodeId 821:26507\
**Module:** CARD\
**Route:** `/legacy/card/pin`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:26507\
**Frontend:** `src/features/legacyCard/CardPinScreen.tsx`\
**Primary screenshot:** [Карта — повтор PIN](./screenshots/annotated/LGC-SCR-059__pin-repeat.png)\
**State screenshots:** [CONFIRMATION](./screenshots/annotated/LGC-SCR-059__pin-repeat.png)

**Purpose:** Local card PIN state machine.

**Entry points:** `ACT-LGC-SCR-035-05`, `ACT-LGC-SCR-036-05`\
**Exit points:** `ACT-LGC-SCR-059-01`, `ACT-LGC-SCR-059-02`, `ACT-LGC-SCR-059-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-059-01` — Назад / закрыть → BACK: /legacy/card
- [02] `ACT-LGC-SCR-059-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: Card PIN state machine
- [03] `ACT-LGC-SCR-059-03` — Удалить цифру → LOCAL_STATE: Card PIN state machine

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: six digits advance; a matching repeat returns to card.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: PIN is not sent to an issuer or secure element.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-060 — Карта — ошибка PIN

**Canonical ID:** LGC-SCR-060\
**Aliases:** legacyNodeId 821:26587\
**Module:** CARD\
**Route:** `/legacy/card/pin`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:26587\
**Frontend:** `src/features/legacyCard/CardPinScreen.tsx`\
**Primary screenshot:** [Карта — ошибка PIN](./screenshots/annotated/LGC-SCR-060__pin-error.png)\
**State screenshots:** [FAILED](./screenshots/annotated/LGC-SCR-060__pin-error.png)

**Purpose:** Local card PIN state machine.

**Entry points:** `ACT-LGC-SCR-035-05`, `ACT-LGC-SCR-036-05`\
**Exit points:** `ACT-LGC-SCR-060-01`, `ACT-LGC-SCR-060-02`, `ACT-LGC-SCR-060-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-060-01` — Назад / закрыть → BACK: /legacy/card
- [02] `ACT-LGC-SCR-060-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: Card PIN state machine
- [03] `ACT-LGC-SCR-060-03` — Удалить цифру → LOCAL_STATE: Card PIN state machine

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: six digits advance; a matching repeat returns to card.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: PIN is not sent to an issuer or secure element.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-066 — Профиль

**Canonical ID:** LGC-SCR-066\
**Aliases:** legacyNodeId 648:19179\
**Module:** PROFILE\
**Route:** `/legacy/profile`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:19179\
**Frontend:** `src/features/legacyProfile/ProfileScreen.tsx`\
**Primary screenshot:** [Профиль](./screenshots/annotated/LGC-SCR-066__profile.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-066__profile.png), [DEFAULT](./screenshots/annotated/LGC-SCR-066__notification-control-visible.png), [PHONE_CHANGED_LOCAL](./screenshots/annotated/LGC-SCR-066__after-phone-change.png)

**Purpose:** Profile status, promo, notification toggle, settings, documents and session actions.

**Entry points:** `ACT-LGC-SCR-025-02`, `ACT-LGC-SCR-025-16`, `ACT-LGC-SCR-026-02`, `ACT-LGC-SCR-026-16`, `ACT-LGC-SCR-066-02`, `ACT-LGC-SCR-066-03`, `ACT-LGC-SCR-066-07`, `ACT-LGC-SCR-066-15`, `ACT-LGC-SCR-067-01`, `ACT-LGC-SCR-068-02`, `ACT-LGC-SCR-068-03`, `ACT-LGC-SCR-122-01`\
**Exit points:** `ACT-LGC-SCR-066-01`, `ACT-LGC-SCR-066-02`, `ACT-LGC-SCR-066-03`, `ACT-LGC-SCR-066-04`, `ACT-LGC-SCR-066-05`, `ACT-LGC-SCR-066-06`, `ACT-LGC-SCR-066-07`, `ACT-LGC-SCR-066-08`, `ACT-LGC-SCR-066-09`, `ACT-LGC-SCR-066-10`, `ACT-LGC-SCR-066-11`, `ACT-LGC-SCR-066-12`, `ACT-LGC-SCR-066-13`, `ACT-LGC-SCR-066-14`, `ACT-LGC-SCR-066-15`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-066-01` — Cashhello — на главную → ROUTE: /legacy/home
- [02] `ACT-LGC-SCR-066-02` — Профиль → ROUTE: /legacy/profile
- [03] `ACT-LGC-SCR-066-03` — Подробнее — статус → ROUTE: /legacy/profile/status
- [04] `ACT-LGC-SCR-066-04` — Введите промокод → LOCAL_STATE: promoCode local state
- [05] `ACT-LGC-SCR-066-05` — Применить промокод → NO_OP_STUB: Alert
- [06] `ACT-LGC-SCR-066-06` — Push-уведомления → LOCAL_STATE: profile.pushEnabled
- [07] `ACT-LGC-SCR-066-07` — Изменить PIN-код входа → ROUTE: /legacy/profile/pin
- [08] `ACT-LGC-SCR-066-08` — Документы → ROUTE: /legacy/stub/documents
- [09] `ACT-LGC-SCR-066-09` — Выйти → LOCAL_STATE: CAS-PROFILE-001 sheet
- [10] `ACT-LGC-SCR-066-10` — Удалить профиль → LOCAL_STATE: CAS-PROFILE-002 sheet
- [11] `ACT-LGC-SCR-066-11` — Главная → ROUTE: /legacy/home
- [12] `ACT-LGC-SCR-066-12` — Оплата → ROUTE: /legacy/payment
- [13] `ACT-LGC-SCR-066-13` — QR → ROUTE: /legacy/qr
- [14] `ACT-LGC-SCR-066-14` — История → ROUTE: /legacy/history
- [15] `ACT-LGC-SCR-066-15` — Профиль → ROUTE: /legacy/profile

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: several existing profile routes are not linked from this screen.
- CURRENT_RUNTIME_FACT: logout returns to guest Home; delete returns to auth.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: 25% KYC progress, 500 Б, promo alert and local push toggle.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-KYC-007`, `Q-PROFILE-003`, `Q-PROFILE-004`

## CAS-PROFILE-001 — Профиль — подтверждение выхода

**Canonical ID:** CAS-PROFILE-001\
**Aliases:** ProfileConfirmSheet logout\
**Module:** PROFILE\
**Route:** `/legacy/profile (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyProfile/ProfileConfirmSheet.tsx`\
**Primary screenshot:** [Профиль — подтверждение выхода](./screenshots/annotated/CAS-PROFILE-001__logout-confirmation.png)\
**State screenshots:** [CONFIRMATION](./screenshots/annotated/CAS-PROFILE-001__logout-confirmation.png)

**Purpose:** Confirm ending the local authorized session.

**Entry points:** `ACT-LGC-SCR-025-02`, `ACT-LGC-SCR-025-16`, `ACT-LGC-SCR-026-02`, `ACT-LGC-SCR-026-16`, `ACT-LGC-SCR-066-02`, `ACT-LGC-SCR-066-03`, `ACT-LGC-SCR-066-07`, `ACT-LGC-SCR-066-15`, `ACT-LGC-SCR-067-01`, `ACT-LGC-SCR-068-02`, `ACT-LGC-SCR-068-03`, `ACT-LGC-SCR-122-01`\
**Exit points:** `ACT-CAS-PROFILE-001-01`, `ACT-CAS-PROFILE-001-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-PROFILE-001-01` — Выйти → ROUTE: /legacy/home?guest=1
- [02] `ACT-CAS-PROFILE-001-02` — Отмена → LOCAL_STATE: Close sheet

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: confirm resets auth store, enters guest mode and routes to /legacy/home?guest=1.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no server-side session revocation.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-011`

## CAS-PROFILE-002 — Профиль — подтверждение удаления

**Canonical ID:** CAS-PROFILE-002\
**Aliases:** ProfileConfirmSheet delete\
**Module:** PROFILE\
**Route:** `/legacy/profile (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyProfile/ProfileConfirmSheet.tsx`\
**Primary screenshot:** [Профиль — подтверждение удаления](./screenshots/annotated/CAS-PROFILE-002__delete-confirmation.png)\
**State screenshots:** [CONFIRMATION](./screenshots/annotated/CAS-PROFILE-002__delete-confirmation.png)

**Purpose:** Confirm the prototype account-deletion action.

**Entry points:** `ACT-LGC-SCR-025-02`, `ACT-LGC-SCR-025-16`, `ACT-LGC-SCR-026-02`, `ACT-LGC-SCR-026-16`, `ACT-LGC-SCR-066-02`, `ACT-LGC-SCR-066-03`, `ACT-LGC-SCR-066-07`, `ACT-LGC-SCR-066-15`, `ACT-LGC-SCR-067-01`, `ACT-LGC-SCR-068-02`, `ACT-LGC-SCR-068-03`, `ACT-LGC-SCR-122-01`\
**Exit points:** `ACT-CAS-PROFILE-002-01`, `ACT-CAS-PROFILE-002-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-PROFILE-002-01` — Удалить → ROUTE: /legacy/auth
- [02] `ACT-CAS-PROFILE-002-02` — Отмена → LOCAL_STATE: Close sheet

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: confirm enters guest mode and routes to /legacy/auth.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no profile, money, KYC or retained data is deleted.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PROFILE-005`, `Q-PROFILE-006`

## LGC-SCR-067 — Профиль — персональные данные

**Canonical ID:** LGC-SCR-067\
**Aliases:** legacyNodeId 648:19230\
**Module:** PROFILE\
**Route:** `/legacy/profile/personal`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:19230\
**Frontend:** `src/features/legacyProfile/PersonalDataScreen.tsx`\
**Primary screenshot:** [Профиль — персональные данные](./screenshots/annotated/LGC-SCR-067__personal-data.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-067__personal-data.png)

**Purpose:** Display static personal data.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-LGC-SCR-067-01`, `ACT-LGC-SCR-067-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-067-01` — Назад / закрыть → BACK: /legacy/profile
- [02] `ACT-LGC-SCR-067-02` — Изменить → NO_OP_STUB: Alert

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: route is not linked from current Profile UI.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: change action displays an alert only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-068 — Профиль — статус идентификации

**Canonical ID:** LGC-SCR-068\
**Aliases:** None\
**Module:** KYC\
**Route:** `/legacy/profile/status`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyProfile/IdentificationStatusScreen.tsx`\
**Primary screenshot:** [Профиль — статус идентификации](./screenshots/annotated/LGC-SCR-068__identification-status.png)\
**State screenshots:** [UNIDENTIFIED](./screenshots/annotated/LGC-SCR-068__identification-status.png)

**Purpose:** Explain current synthetic identification status and displayed limits.

**Entry points:** `ACT-LGC-SCR-066-03`\
**Exit points:** `ACT-LGC-SCR-068-01`, `ACT-LGC-SCR-068-02`, `ACT-LGC-SCR-068-03`, `ACT-LGC-SCR-068-04`\
**Visible business data:** 25%; 12 975 ₸; Неидентифицированный

**Interactive elements**

- [01] `ACT-LGC-SCR-068-01` — Cashhello — на главную → ROUTE: /legacy/home
- [02] `ACT-LGC-SCR-068-02` — Профиль → ROUTE: /legacy/profile
- [03] `ACT-LGC-SCR-068-03` — Назад / закрыть → BACK: /legacy/profile
- [04] `ACT-LGC-SCR-068-04` — Расширить лимиты → NO_OP_STUB: Alert

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: “Расширить лимиты” produces an alert and does not enter the auth KYC capture states.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: 25% progress, status, locked features and 12 975 ₸ values are hardcoded.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-AUTH-012`, `Q-P2P-007`, `Q-KYC-001`, `Q-KYC-002`, `Q-KYC-004`, `Q-KYC-005`, `Q-KYC-006`, `Q-KYC-007`, `Q-KYC-008`

## LGC-SCR-122 — Профиль — новый телефон

**Canonical ID:** LGC-SCR-122\
**Aliases:** legacyNodeId 648:16714\
**Module:** PROFILE\
**Route:** `/legacy/profile/phone`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:16714\
**Frontend:** `src/features/legacyProfile/ChangePhoneScreen.tsx`\
**Primary screenshot:** [Профиль — новый телефон](./screenshots/annotated/LGC-SCR-122__phone-change.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-122__phone-change.png), [FORM_FILLED](./screenshots/annotated/LGC-SCR-122__phone-change-filled.png)

**Purpose:** Collect a replacement phone number.

**Entry points:** `ACT-LGC-SCR-122-03`, `ACT-LGC-SCR-123-01`\
**Exit points:** `ACT-LGC-SCR-122-01`, `ACT-LGC-SCR-122-02`, `ACT-LGC-SCR-122-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-122-01` — Назад / закрыть → BACK: /legacy/profile
- [02] `ACT-LGC-SCR-122-02` — Телефон → LOCAL_STATE: profile.pendingPhoneDigits
- [03] `ACT-LGC-SCR-122-03` — Изменить → ROUTE: /legacy/profile/phone/verify

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: a ten-digit value routes to local verification.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no ownership, uniqueness or risk checks.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PROFILE-001`, `Q-PROFILE-002`

## LGC-SCR-123 — Профиль — проверка нового телефона

**Canonical ID:** LGC-SCR-123\
**Aliases:** legacyNodeId 821:31991\
**Module:** PROFILE\
**Route:** `/legacy/profile/phone/verify`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:31991\
**Frontend:** `src/features/legacyProfile/ChangePhoneVerifyScreen.tsx`\
**Primary screenshot:** [Профиль — проверка нового телефона](./screenshots/annotated/LGC-SCR-123__phone-verification.png)\
**State screenshots:** [VERIFICATION](./screenshots/annotated/LGC-SCR-123__phone-verification.png)

**Purpose:** Four-digit local verification before committing the pending phone.

**Entry points:** `ACT-LGC-SCR-122-03`\
**Exit points:** `ACT-LGC-SCR-123-01`, `ACT-LGC-SCR-123-02`, `ACT-LGC-SCR-123-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-123-01` — Назад / закрыть → BACK: /legacy/profile/phone
- [02] `ACT-LGC-SCR-123-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: profile.phoneSms
- [03] `ACT-LGC-SCR-123-03` — Удалить цифру → LOCAL_STATE: profile.phoneSms

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: a missing pending phone redirects back to /legacy/profile/phone.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: demo code is 0000 in source; runtime keypad sequence commits local data.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PROFILE-001`

## LGC-SCR-124 — Профиль — изменение PIN входа

**Canonical ID:** LGC-SCR-124\
**Aliases:** legacyNodeId 648:19215\
**Module:** PROFILE\
**Route:** `/legacy/profile/pin`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:19215\
**Frontend:** `src/features/legacyProfile/ChangePinScreen.tsx`\
**Primary screenshot:** [Профиль — изменение PIN входа](./screenshots/annotated/LGC-SCR-124__pin-change.png)\
**State screenshots:** [PIN_CREATE](./screenshots/annotated/LGC-SCR-124__pin-change.png), [PIN_REPEAT](./screenshots/annotated/LGC-SCR-124__pin-repeat.png), [FAILED](./screenshots/annotated/LGC-SCR-124__pin-error.png)

**Purpose:** Change the local app access code.

**Entry points:** `ACT-LGC-SCR-066-07`\
**Exit points:** `ACT-LGC-SCR-124-01`, `ACT-LGC-SCR-124-02`, `ACT-LGC-SCR-124-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-124-01` — Назад / закрыть → BACK: /legacy/profile
- [02] `ACT-LGC-SCR-124-02` — Цифровая клавиатура 0–9 → LOCAL_STATE: profile PIN state machine
- [03] `ACT-LGC-SCR-124-03` — Удалить цифру → LOCAL_STATE: profile PIN state machine

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: mismatch displays the same “Код доступа не совпадают” copy.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: sessionPin is local; no old-PIN check or server/device operation.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-125 — Сообщения

**Canonical ID:** LGC-SCR-125\
**Aliases:** legacyNodeId 648:19263\
**Module:** MESSAGES\
**Route:** `/legacy/messages`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:19263\
**Frontend:** `src/features/legacyProfile/MessagesScreen.tsx`\
**Primary screenshot:** [Сообщения](./screenshots/annotated/LGC-SCR-125__messages.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-125__messages.png)

**Purpose:** Static notification list with per-message help links.

**Entry points:** `ACT-LGC-SCR-126-01`\
**Exit points:** `ACT-LGC-SCR-125-01`, `ACT-LGC-SCR-125-02`, `ACT-LGC-SCR-125-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-125-01` — Назад / закрыть → BACK: /legacy/home
- [02] `ACT-LGC-SCR-125-02` — Фильтр → NO_OP_STUB: Alert
- [03] `ACT-LGC-SCR-125-03` — Помощь по сообщению → ROUTE: /legacy/help

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: no current Home/Profile control links to this route.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: feed is static and filter shows an alert.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-P2P-008`, `Q-QR-007`

## LGC-SCR-126 — Помощь

**Canonical ID:** LGC-SCR-126\
**Aliases:** legacyNodeId 648:19334\
**Module:** SUPPORT\
**Route:** `/legacy/help`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:19334\
**Frontend:** `src/features/legacyProfile/HelpScreen.tsx`\
**Primary screenshot:** [Помощь](./screenshots/annotated/LGC-SCR-126__help.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-126__help.png), [FORM_FILLED](./screenshots/annotated/LGC-SCR-126__help-filled.png)

**Purpose:** Describe a support issue and invoke a mock attachment action.

**Entry points:** `ACT-LGC-SCR-125-03`\
**Exit points:** `ACT-LGC-SCR-126-01`, `ACT-LGC-SCR-126-02`, `ACT-LGC-SCR-126-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-126-01` — Назад / закрыть → BACK: /legacy/messages
- [02] `ACT-LGC-SCR-126-02` — Описание ошибки → LOCAL_STATE: profile.helpText
- [03] `ACT-LGC-SCR-126-03` — Прикрепить документ → NO_OP_STUB: Alert

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: there is no submit/send control.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: attachment displays an alert; help text is local store state.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PROFILE-007`, `Q-PROFILE-008`

## LGC-SCR-061 — Поиск действий

**Canonical ID:** LGC-SCR-061\
**Aliases:** legacyNodeId 736:48670\
**Module:** SEARCH\
**Route:** `/legacy/search`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 736:48670\
**Frontend:** `src/features/legacySearch/SearchScreen.tsx`\
**Primary screenshot:** [Поиск действий](./screenshots/annotated/LGC-SCR-061__search.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-061__search.png), [RESULTS](./screenshots/annotated/LGC-SCR-061__deferred-result.png), [EMPTY](./screenshots/annotated/LGC-SCR-061__no-results.png)

**Purpose:** Search a static action catalog and keep local recent items.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-LGC-SCR-061-01`, `ACT-LGC-SCR-061-02`, `ACT-LGC-SCR-061-03`, `ACT-LGC-SCR-061-04`, `ACT-LGC-SCR-061-05`, `ACT-LGC-SCR-061-06`, `ACT-LGC-SCR-061-07`, `ACT-LGC-SCR-061-08`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-061-01` — Поиск → LOCAL_STATE: search.query
- [02] `ACT-LGC-SCR-061-02` — Отменить → BACK: /legacy/home
- [03] `ACT-LGC-SCR-061-03` — Пополнить счет → ROUTE: /legacy/topup
- [04] `ACT-LGC-SCR-061-04` — Удалить счет → NO_OP_STUB: Alert
- [05] `ACT-LGC-SCR-061-05` — Открыть карту → ROUTE: /legacy/card
- [06] `ACT-LGC-SCR-061-06` — Перевод между счетами → ROUTE: /legacy/topup/between
- [07] `ACT-LGC-SCR-061-07` — Конвертация → NO_OP_STUB: Alert
- [08] `ACT-LGC-SCR-061-08` — Вывести деньги → ROUTE: /legacy/withdraw

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: Home defines a search bridge but exposes no search control.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: delete/conversion results show alerts; recents are client-only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-STUB-001 — Заглушка — регистрация

**Canonical ID:** CAS-STUB-001\
**Aliases:** GuestStubScreen; no source screenId\
**Module:** STUB\
**Route:** `/legacy/stub/registration`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/GuestStubScreen.tsx`\
**Primary screenshot:** [Заглушка — регистрация](./screenshots/annotated/CAS-STUB-001__registration.png)\
**State screenshots:** [STUB](./screenshots/annotated/CAS-STUB-001__registration.png)

**Purpose:** Explicit placeholder for “Регистрация”.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-STUB-001-01`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-STUB-001-01` — Назад / закрыть → BACK: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screen is labeled “Заглушка” and has no product continuation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: placeholder only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-STUB-002 — Заглушка — бонус

**Canonical ID:** CAS-STUB-002\
**Aliases:** GuestStubScreen; no source screenId\
**Module:** STUB\
**Route:** `/legacy/stub/bonus`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/GuestStubScreen.tsx`\
**Primary screenshot:** [Заглушка — бонус](./screenshots/annotated/CAS-STUB-002__bonus.png)\
**State screenshots:** [STUB](./screenshots/annotated/CAS-STUB-002__bonus.png)

**Purpose:** Explicit placeholder for “Бонус”.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-STUB-002-01`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-STUB-002-01` — Назад / закрыть → BACK: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screen is labeled “Заглушка” and has no product continuation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: placeholder only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-STUB-003 — Заглушка — пользователь Cashhello

**Canonical ID:** CAS-STUB-003\
**Aliases:** GuestStubScreen; no source screenId\
**Module:** STUB\
**Route:** `/legacy/stub/cashhello-user`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/GuestStubScreen.tsx`\
**Primary screenshot:** [Заглушка — пользователь Cashhello](./screenshots/annotated/CAS-STUB-003__cashhello-user.png)\
**State screenshots:** [STUB](./screenshots/annotated/CAS-STUB-003__cashhello-user.png)

**Purpose:** Explicit placeholder for “Cashhello”.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-STUB-003-01`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-STUB-003-01` — Назад / закрыть → BACK: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screen is labeled “Заглушка” and has no product continuation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: placeholder only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-STUB-004 — Заглушка — привязанные карты

**Canonical ID:** CAS-STUB-004\
**Aliases:** GuestStubScreen; no source screenId\
**Module:** STUB\
**Route:** `/legacy/stub/linked-cards`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/GuestStubScreen.tsx`\
**Primary screenshot:** [Заглушка — привязанные карты](./screenshots/annotated/CAS-STUB-004__linked-cards.png)\
**State screenshots:** [STUB](./screenshots/annotated/CAS-STUB-004__linked-cards.png)

**Purpose:** Explicit placeholder for “Привязанные карты”.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-STUB-004-01`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-STUB-004-01` — Назад / закрыть → BACK: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screen is labeled “Заглушка” and has no product continuation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: placeholder only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-STUB-005 — Заглушка — предложить идею

**Canonical ID:** CAS-STUB-005\
**Aliases:** GuestStubScreen; no source screenId\
**Module:** STUB\
**Route:** `/legacy/stub/suggest-idea`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/GuestStubScreen.tsx`\
**Primary screenshot:** [Заглушка — предложить идею](./screenshots/annotated/CAS-STUB-005__suggest-idea.png)\
**State screenshots:** [STUB](./screenshots/annotated/CAS-STUB-005__suggest-idea.png)

**Purpose:** Explicit placeholder for “Предложить идею”.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-STUB-005-01`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-STUB-005-01` — Назад / закрыть → BACK: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screen is labeled “Заглушка” and has no product continuation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: placeholder only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-STUB-006 — Заглушка — документы

**Canonical ID:** CAS-STUB-006\
**Aliases:** GuestStubScreen; no source screenId\
**Module:** STUB\
**Route:** `/legacy/stub/documents`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHome/GuestStubScreen.tsx`\
**Primary screenshot:** [Заглушка — документы](./screenshots/annotated/CAS-STUB-006__documents.png)\
**State screenshots:** [STUB](./screenshots/annotated/CAS-STUB-006__documents.png)

**Purpose:** Explicit placeholder for “Документы”.

**Entry points:** `ACT-LGC-SCR-066-08`\
**Exit points:** `ACT-CAS-STUB-006-01`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-STUB-006-01` — Назад / закрыть → BACK: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: screen is labeled “Заглушка” and has no product continuation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: placeholder only.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-069 — Между своими счетами — пустая форма

**Canonical ID:** LGC-SCR-069\
**Aliases:** legacyNodeId 648:18900\
**Module:** TRANSFER\
**Route:** `/legacy/topup/between`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:18900\
**Frontend:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`\
**Primary screenshot:** [Между своими счетами — пустая форма](./screenshots/annotated/LGC-SCR-069__between-default.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-069__between-default.png)

**Purpose:** Begin an own-account transfer and select source/destination.

**Entry points:** `ACT-CAS-HOME-003-02`, `ACT-LGC-SCR-040-02`, `ACT-LGC-SCR-061-06`\
**Exit points:** `ACT-LGC-SCR-069-01`, `ACT-LGC-SCR-069-02`, `ACT-LGC-SCR-069-03`, `ACT-LGC-SCR-069-04`, `ACT-LGC-SCR-069-05`, `ACT-LGC-SCR-069-06`, `ACT-LGC-SCR-069-07`, `ACT-LGC-SCR-069-08`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-069-01` — Назад / закрыть → BACK: /legacy/topup
- [02] `ACT-LGC-SCR-069-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-LGC-SCR-069-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-LGC-SCR-069-04` — Откуда → LOCAL_STATE: picker=from
- [05] `ACT-LGC-SCR-069-05` — Куда → LOCAL_STATE: picker=to
- [06] `ACT-LGC-SCR-069-06` — Сумма → LOCAL_STATE: topup.amountDigits
- [07] `ACT-LGC-SCR-069-07` — Все → LOCAL_STATE: Fill source balance
- [08] `ACT-LGC-SCR-069-08` — Пополнить → ROUTE: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: the to query parameter is parsed by the route but reset/ignored by the screen mount effect.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: source defaults to kzt-primary and destination is empty.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TRF-008`

## LGC-SCR-070 — Между своими счетами — счета выбраны

**Canonical ID:** LGC-SCR-070\
**Aliases:** legacyNodeId 648:18928\
**Module:** TRANSFER\
**Route:** `/legacy/topup/between`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:18928\
**Frontend:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`\
**Primary screenshot:** [Между своими счетами — счета выбраны](./screenshots/annotated/LGC-SCR-070__accounts-selected-fx.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [ACCOUNTS_SELECTED](./screenshots/annotated/LGC-SCR-070__accounts-selected-fx.png)

**Purpose:** Own-account transfer with both accounts selected.

**Entry points:** `ACT-CAS-HOME-003-02`, `ACT-LGC-SCR-040-02`, `ACT-LGC-SCR-061-06`\
**Exit points:** `ACT-LGC-SCR-070-01`, `ACT-LGC-SCR-070-02`, `ACT-LGC-SCR-070-03`, `ACT-LGC-SCR-070-04`, `ACT-LGC-SCR-070-05`, `ACT-LGC-SCR-070-06`, `ACT-LGC-SCR-070-07`, `ACT-LGC-SCR-070-08`\
**Visible business data:** NBK_KZT_PER_USD=458.48; NBK_KZT_PER_RUB=5.43; Rate date 2026-08-26

**Interactive elements**

- [01] `ACT-LGC-SCR-070-01` — Назад / закрыть → BACK: /legacy/topup
- [02] `ACT-LGC-SCR-070-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-LGC-SCR-070-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-LGC-SCR-070-04` — Откуда → LOCAL_STATE: picker=from
- [05] `ACT-LGC-SCR-070-05` — Куда → LOCAL_STATE: picker=to
- [06] `ACT-LGC-SCR-070-06` — Сумма → LOCAL_STATE: topup.amountDigits
- [07] `ACT-LGC-SCR-070-07` — Все → LOCAL_STATE: Fill source balance
- [08] `ACT-LGC-SCR-070-08` — Пополнить → ROUTE: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: cross-currency selection displays a local rate preview.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: NBK date/rates are static demo constants.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TRF-001`

## LGC-SCR-071 — Между своими счетами — выбор счета

**Canonical ID:** LGC-SCR-071\
**Aliases:** legacyNodeId 648:18958\
**Module:** TRANSFER\
**Route:** `/legacy/topup/between (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:18958\
**Frontend:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`\
**Primary screenshot:** [Между своими счетами — выбор счета](./screenshots/annotated/LGC-SCR-071__account-picker.png)\
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/LGC-SCR-071__account-picker.png)

**Purpose:** Select an eligible source or destination account.

**Entry points:** `ACT-CAS-HOME-003-02`, `ACT-LGC-SCR-040-02`, `ACT-LGC-SCR-061-06`\
**Exit points:** `ACT-LGC-SCR-071-01`, `ACT-LGC-SCR-071-02`, `ACT-LGC-SCR-071-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-071-01` — Закрыть / фон → LOCAL_STATE: Close picker
- [02] `ACT-LGC-SCR-071-02` — Счет ₸ → LOCAL_STATE: Set picker account
- [03] `ACT-LGC-SCR-071-03` — Счет $ → LOCAL_STATE: Set picker account

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: the currently selected opposite account is excluded.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: account rows and balances are static/local.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-073 — Между своими счетами — сумма введена

**Canonical ID:** LGC-SCR-073\
**Aliases:** legacyNodeId 833:27842\
**Module:** TRANSFER\
**Route:** `/legacy/topup/between`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 833:27842\
**Frontend:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`\
**Primary screenshot:** [Между своими счетами — сумма введена](./screenshots/annotated/LGC-SCR-073__fx-filled.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [FORM_FILLED](./screenshots/annotated/LGC-SCR-073__fx-filled.png), [OVER_BALANCE](./screenshots/annotated/LGC-SCR-073__over-balance-enabled.png)

**Purpose:** Review amount and FX preview before executing an own-account transfer.

**Entry points:** `ACT-CAS-HOME-003-02`, `ACT-LGC-SCR-040-02`, `ACT-LGC-SCR-061-06`\
**Exit points:** `ACT-LGC-SCR-073-01`, `ACT-LGC-SCR-073-02`, `ACT-LGC-SCR-073-03`, `ACT-LGC-SCR-073-04`, `ACT-LGC-SCR-073-05`, `ACT-LGC-SCR-073-06`, `ACT-LGC-SCR-073-07`, `ACT-LGC-SCR-073-08`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-073-01` — Назад / закрыть → BACK: /legacy/topup
- [02] `ACT-LGC-SCR-073-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-LGC-SCR-073-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-LGC-SCR-073-04` — Откуда → LOCAL_STATE: picker=from
- [05] `ACT-LGC-SCR-073-05` — Куда → LOCAL_STATE: picker=to
- [06] `ACT-LGC-SCR-073-06` — Сумма → LOCAL_STATE: topup.amountDigits
- [07] `ACT-LGC-SCR-073-07` — Все → LOCAL_STATE: Fill source balance
- [08] `ACT-LGC-SCR-073-08` — Пополнить → ROUTE: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: a 999 999 999 ₸ amount remains actionable and returns Home.
- CURRENT_CODE_FACT: applyMockTransfer caps the debit at the source balance but computes the destination credit from the requested amount.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: over-balance execution can create inconsistent local balances; this is not a rule.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TRF-002`, `Q-TRF-003`, `Q-TRF-004`, `Q-TRF-005`, `Q-TRF-006`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-085 — Пополнение картой — форма

**Canonical ID:** LGC-SCR-085\
**Aliases:** legacyNodeId 648:20712\
**Module:** TOPUP\
**Route:** `/legacy/topup/card`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:20712\
**Frontend:** `src/features/legacyTopup/ExternalCardScreen.tsx`\
**Primary screenshot:** [Пополнение картой — форма](./screenshots/annotated/LGC-SCR-085__external-card.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-085__external-card.png)

**Purpose:** Select a synthetic external card and submit a fixed mock top-up.

**Entry points:** `ACT-CAS-HOME-003-03`, `ACT-LGC-SCR-040-03`\
**Exit points:** `ACT-LGC-SCR-085-01`, `ACT-LGC-SCR-085-02`, `ACT-LGC-SCR-085-03`, `ACT-LGC-SCR-085-04`, `ACT-LGC-SCR-085-05`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-085-01` — Назад / закрыть → BACK: /legacy/topup
- [02] `ACT-LGC-SCR-085-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-LGC-SCR-085-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-LGC-SCR-085-04` — Сохранённая карта → LOCAL_STATE: CAS-TOPUP-001 sheet
- [05] `ACT-LGC-SCR-085-05` — Пополнить → ROUTE: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: PAN/expiry/CVV are non-editable and auto-filled.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: confirmation appends a 1500 ₸ successful history item but does not credit any balance.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-002`, `Q-TOPUP-003`, `Q-TOPUP-004`

## CAS-TOPUP-001 — Пополнение картой — сохраненные карты

**Canonical ID:** CAS-TOPUP-001\
**Aliases:** ExternalCardScreen saved card sheet\
**Module:** TOPUP\
**Route:** `/legacy/topup/card (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyTopup/ExternalCardScreen.tsx`\
**Primary screenshot:** [Пополнение картой — сохраненные карты](./screenshots/annotated/CAS-TOPUP-001__saved-card-picker.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-TOPUP-001__saved-card-picker.png)

**Purpose:** Select a synthetic saved external card.

**Entry points:** `ACT-CAS-HOME-003-03`, `ACT-LGC-SCR-040-03`\
**Exit points:** `ACT-CAS-TOPUP-001-01`, `ACT-CAS-TOPUP-001-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-TOPUP-001-01` — Закрыть / фон → LOCAL_STATE: Close sheet
- [02] `ACT-CAS-TOPUP-001-02` — Карта •••• 8812 → LOCAL_STATE: selectedLast4=8812

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: selection fills the static card fields and closes the sheet.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: saved-card data is synthetic.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-087 — Пополнение картой — карта выбрана

**Canonical ID:** LGC-SCR-087\
**Aliases:** legacyNodeId 821:30114\
**Module:** TOPUP\
**Route:** `/legacy/topup/card`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:30114\
**Frontend:** `src/features/legacyTopup/ExternalCardScreen.tsx`\
**Primary screenshot:** [Пополнение картой — карта выбрана](./screenshots/annotated/LGC-SCR-087__saved-card-selected.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SELECTED](./screenshots/annotated/LGC-SCR-087__saved-card-selected.png)

**Purpose:** External-card form after selecting a saved demo card.

**Entry points:** `ACT-CAS-HOME-003-03`, `ACT-LGC-SCR-040-03`\
**Exit points:** `ACT-LGC-SCR-087-01`, `ACT-LGC-SCR-087-02`, `ACT-LGC-SCR-087-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-087-01` — Назад / закрыть → BACK: /legacy/topup
- [02] `ACT-LGC-SCR-087-02` — Сохранённая карта → LOCAL_STATE: CAS-TOPUP-001 sheet
- [03] `ACT-LGC-SCR-087-03` — Пополнить → ROUTE: /legacy/home

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: CTA is enabled and routes Home after local history append.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no amount entry, 3DS, provider, fee or settlement.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-005`, `Q-TOPUP-006`, `Q-TOPUP-007`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-074 — Пополнение наличными — выбор кассы

**Canonical ID:** LGC-SCR-074\
**Aliases:** legacyNodeId 648:17510\
**Module:** TOPUP\
**Route:** `/legacy/topup/cash`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17510\
**Frontend:** `src/features/legacyTopup/CashTopupScreen.tsx`\
**Primary screenshot:** [Пополнение наличными — выбор кассы](./screenshots/annotated/LGC-SCR-074__cash-picker.png)\
**State screenshots:** [EMPTY](./screenshots/annotated/LGC-SCR-074__cash-picker.png), [DESK_SELECTED_RETURN](./screenshots/annotated/LGC-SCR-074__cash-picker-returned.png)

**Purpose:** Open the top-up cash-desk map.

**Entry points:** `ACT-LGC-SCR-074-02`, `ACT-LGC-SCR-080-01`, `ACT-LGC-SCR-081-01`, `ACT-LGC-SCR-081-02`\
**Exit points:** `ACT-LGC-SCR-074-01`, `ACT-LGC-SCR-074-02`, `ACT-LGC-SCR-074-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-074-01` — Назад / закрыть → BACK: /legacy/topup
- [02] `ACT-LGC-SCR-074-02` — Поиск по адресу → ROUTE: /legacy/topup/cash-map
- [03] `ACT-LGC-SCR-074-03` — Выбрать → NO_OP_STUB: Disabled

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: route is not linked from the main method sheet.
- CURRENT_CODE_FACT: choose CTA is always disabled.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: search row is a non-editable route trigger.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-001`

## LGC-SCR-080 — Пополнение наличными — карта касс

**Canonical ID:** LGC-SCR-080\
**Aliases:** legacyNodeId 821:30474\
**Module:** TOPUP\
**Route:** `/legacy/topup/cash-map`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:30474\
**Frontend:** `src/features/legacyTopup/CashMapScreen.tsx`\
**Primary screenshot:** [Пополнение наличными — карта касс](./screenshots/annotated/LGC-SCR-080__cash-map.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-080__cash-map.png)

**Purpose:** Browse static demo cash desks.

**Entry points:** `ACT-LGC-SCR-074-02`\
**Exit points:** `ACT-LGC-SCR-080-01`, `ACT-LGC-SCR-080-02`, `ACT-LGC-SCR-080-03`, `ACT-LGC-SCR-080-04`, `ACT-LGC-SCR-080-05`, `ACT-LGC-SCR-080-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-080-01` — Назад / закрыть → BACK: /legacy/topup/cash
- [02] `ACT-LGC-SCR-080-02` — Микрорайон Таугуль 2 → LOCAL_STATE: selectedDeskId
- [03] `ACT-LGC-SCR-080-03` — 4-й микрорайон → LOCAL_STATE: selectedDeskId
- [04] `ACT-LGC-SCR-080-04` — ТРЦ MOSKVA Metropolitan → LOCAL_STATE: selectedDeskId
- [05] `ACT-LGC-SCR-080-05` — 8-й микрорайон, 8 → LOCAL_STATE: selectedDeskId
- [06] `ACT-LGC-SCR-080-06` — ТЦ Тигрохауд → LOCAL_STATE: selectedDeskId

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: map label explicitly states MOCK MAP · NO GEOLOCATION.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: map, filters, distances and opening status are static.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-081 — Пополнение наличными — касса выбрана

**Canonical ID:** LGC-SCR-081\
**Aliases:** legacyNodeId 821:30532\
**Module:** TOPUP\
**Route:** `/legacy/topup/cash-map`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:30532\
**Frontend:** `src/features/legacyTopup/CashMapScreen.tsx`\
**Primary screenshot:** [Пополнение наличными — касса выбрана](./screenshots/annotated/LGC-SCR-081__cash-desk-selected.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SELECTED](./screenshots/annotated/LGC-SCR-081__cash-desk-selected.png)

**Purpose:** Confirm a selected top-up cash desk.

**Entry points:** `ACT-LGC-SCR-074-02`\
**Exit points:** `ACT-LGC-SCR-081-01`, `ACT-LGC-SCR-081-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-081-01` — Назад / закрыть → BACK: /legacy/topup/cash
- [02] `ACT-LGC-SCR-081-02` — Выбрать → BACK: /legacy/topup/cash

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: choose returns to the picker route.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: appends a fixed 8000 ₸ “В обработке” history operation; no balance credit.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-003`, `Q-TOPUP-004`, `Q-TOPUP-008`, `Q-TOPUP-009`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-041 — Вывод — выбор способа

**Canonical ID:** LGC-SCR-041\
**Aliases:** legacyNodeId 804:23390; Figma component only: WD / Method Row node 97:272\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 804:23390\
**Frontend:** `src/features/legacyWithdraw/MethodSelectScreen.tsx`\
**Primary screenshot:** [Вывод — выбор способа](./screenshots/annotated/LGC-SCR-041__method-selection.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-041__method-selection.png)

**Purpose:** Full-route withdraw method selector.

**Entry points:** `ACT-CAS-HOME-004-02`, `ACT-CAS-HOME-004-03`, `ACT-CAS-HOME-004-04`, `ACT-LGC-SCR-061-08`, `ACT-LGC-SCR-041-02`, `ACT-LGC-SCR-041-03`, `ACT-LGC-SCR-041-04`, `ACT-WD-002-01`, `ACT-WD-002-09`, `ACT-LGC-SCR-092-01`, `ACT-LGC-SCR-092-09`, `ACT-WD-004-01`\
**Exit points:** `ACT-LGC-SCR-041-01`, `ACT-LGC-SCR-041-02`, `ACT-LGC-SCR-041-03`, `ACT-LGC-SCR-041-04`, `ACT-LGC-SCR-041-05`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-041-01` — Назад / закрыть → BACK: /legacy/home
- [02] `ACT-LGC-SCR-041-02` — Карта → ROUTE: /legacy/withdraw/card
- [03] `ACT-LGC-SCR-041-03` — Баланс телефона → ROUTE: /legacy/withdraw/phone
- [04] `ACT-LGC-SCR-041-04` — Наличными → ROUTE: /legacy/withdraw/cash
- [05] `ACT-LGC-SCR-041-05` — Другое → NO_OP_STUB: Alert

**CURRENT PRODUCT OBSERVATION**

- FIGMA_FACT: the approved Figma file contains only the reusable WD / Method Row component, not this screen.
- CURRENT_CODE_FACT: methods differ from the Home sheet.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: “Другое” displays an alert and explicitly leaves continuation unknown.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-001`

## WD-002 — Вывод на карту — форма

**Canonical ID:** WD-002\
**Aliases:** legacyNodeId 804:23664\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/card`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 804:23664\
**Frontend:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод на карту — форма](./screenshots/annotated/WD-002__card-form.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/WD-002__card-form.png), [FORM_FILLED](./screenshots/annotated/WD-002__card-form-filled.png), [TRANSFER_DELAY](./screenshots/annotated/WD-002__card-transfer-delay.png)

**Purpose:** Collect destination card, source account and amount.

**Entry points:** `ACT-CAS-HOME-004-02`, `ACT-LGC-SCR-041-02`\
**Exit points:** `ACT-WD-002-01`, `ACT-WD-002-02`, `ACT-WD-002-03`, `ACT-WD-002-04`, `ACT-WD-002-05`, `ACT-WD-002-06`, `ACT-WD-002-07`, `ACT-WD-002-08`, `ACT-WD-002-09`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-WD-002-01` — Назад / закрыть → BACK: /legacy/withdraw
- [02] `ACT-WD-002-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-WD-002-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-WD-002-04` — Счёт списания → LOCAL_STATE: CAS-WD-002 account picker
- [05] `ACT-WD-002-05` — Номер карты → LOCAL_STATE: withdraw.cardDigits
- [06] `ACT-WD-002-06` — Сканировать карту → LOCAL_STATE: LGC-SCR-091 overlay
- [07] `ACT-WD-002-07` — Сохранённая карта → LOCAL_STATE: CAS-WD-001 sheet
- [08] `ACT-WD-002-08` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [09] `ACT-WD-002-09` — Перевести → ROUTE: /legacy/withdraw/loading?ready=1

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: valid form waits about 3 seconds before local settlement and receipt navigation.
- CURRENT_CODE_FACT: only amount > 0 is checked; cash min/max are not applied.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: synthetic cards, flat 30 ₸ fee and 3-second delay.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-002`, `Q-WD-003`, `Q-WD-013`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-091 — Вывод на карту — сканер

**Canonical ID:** LGC-SCR-091\
**Aliases:** legacyNodeId 648:17578\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/card (overlay)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17578\
**Frontend:** `src/features/legacyAuth/components/CameraChrome.tsx`\
**Primary screenshot:** [Вывод на карту — сканер](./screenshots/annotated/LGC-SCR-091__card-camera.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [CAMERA_MOCK](./screenshots/annotated/LGC-SCR-091__card-camera.png)

**Purpose:** Camera-shaped card scan overlay.

**Entry points:** `ACT-CAS-HOME-004-02`, `ACT-LGC-SCR-041-02`\
**Exit points:** `ACT-LGC-SCR-091-01`, `ACT-LGC-SCR-091-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-091-01` — Отмена → LOCAL_STATE: Close scanner
- [02] `ACT-LGC-SCR-091-02` — Сканировать → LOCAL_STATE: Fill synthetic card

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: continue fills a synthetic card; cancel returns to the form.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no OCR, camera image or card validation.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-092 — Вывод на карту — карта выбрана

**Canonical ID:** LGC-SCR-092\
**Aliases:** legacyNodeId 648:17672\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/card`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17672\
**Frontend:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод на карту — карта выбрана](./screenshots/annotated/LGC-SCR-092__card-selected.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [CARD_SELECTED](./screenshots/annotated/LGC-SCR-092__card-selected.png)

**Purpose:** Card withdraw state with a complete destination card.

**Entry points:** `ACT-CAS-HOME-004-02`, `ACT-LGC-SCR-041-02`\
**Exit points:** `ACT-LGC-SCR-092-01`, `ACT-LGC-SCR-092-02`, `ACT-LGC-SCR-092-03`, `ACT-LGC-SCR-092-04`, `ACT-LGC-SCR-092-05`, `ACT-LGC-SCR-092-06`, `ACT-LGC-SCR-092-07`, `ACT-LGC-SCR-092-08`, `ACT-LGC-SCR-092-09`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-092-01` — Назад / закрыть → BACK: /legacy/withdraw
- [02] `ACT-LGC-SCR-092-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-LGC-SCR-092-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-LGC-SCR-092-04` — Счёт списания → LOCAL_STATE: CAS-WD-002 account picker
- [05] `ACT-LGC-SCR-092-05` — Номер карты → LOCAL_STATE: withdraw.cardDigits
- [06] `ACT-LGC-SCR-092-06` — Сканировать карту → LOCAL_STATE: LGC-SCR-091 overlay
- [07] `ACT-LGC-SCR-092-07` — Сохранённая карта → LOCAL_STATE: CAS-WD-001 sheet
- [08] `ACT-LGC-SCR-092-08` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [09] `ACT-LGC-SCR-092-09` — Перевести → ROUTE: /legacy/withdraw/loading?ready=1

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: cardFilled means at least 16 digits; no Luhn/provider check.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: synthetic card accepted locally.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-WD-001 — Вывод на карту — сохраненные карты

**Canonical ID:** CAS-WD-001\
**Aliases:** CardWithdrawScreen saved card sheet\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/card (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод на карту — сохраненные карты](./screenshots/annotated/CAS-WD-001__saved-card-picker.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-WD-001__saved-card-picker.png)

**Purpose:** Choose a synthetic saved destination card.

**Entry points:** `ACT-CAS-HOME-004-02`, `ACT-LGC-SCR-041-02`\
**Exit points:** `ACT-CAS-WD-001-01`, `ACT-CAS-WD-001-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-WD-001-01` — Закрыть / фон → LOCAL_STATE: Close sheet
- [02] `ACT-CAS-WD-001-02` — Карта •••• 8812 → LOCAL_STATE: withdraw.cardDigits

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: a selected row fills the PAN and closes the sheet.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: saved cards are hardcoded demo records.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-WD-002 — Вывод — выбор счета списания

**Canonical ID:** CAS-WD-002\
**Aliases:** CardWithdrawScreen account picker\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/card (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — выбор счета списания](./screenshots/annotated/CAS-WD-002__account-picker.png)\
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-WD-002__account-picker.png)

**Purpose:** Choose the local source balance for withdrawal.

**Entry points:** `ACT-CAS-HOME-004-02`, `ACT-LGC-SCR-041-02`\
**Exit points:** `ACT-CAS-WD-002-01`, `ACT-CAS-WD-002-02`, `ACT-CAS-WD-002-03`, `ACT-CAS-WD-002-04`, `ACT-CAS-WD-002-05`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-WD-002-01` — Закрыть / фон → LOCAL_STATE: Close picker
- [02] `ACT-CAS-WD-002-02` — Счет ₸ → LOCAL_STATE: withdraw.fromId
- [03] `ACT-CAS-WD-002-03` — Счет ₽ → LOCAL_STATE: withdraw.fromId
- [04] `ACT-CAS-WD-002-04` — Счет $ → LOCAL_STATE: withdraw.fromId
- [05] `ACT-CAS-WD-002-05` — Бонусный счет → LOCAL_STATE: withdraw.fromId

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: account picker includes KZT/RUB/USD/bonus mock balances.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: source eligibility is not validated against a production product matrix.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## WD-004 — Вывод на баланс телефона

**Canonical ID:** WD-004\
**Aliases:** legacyNodeId local-draft\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/phone`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** local-draft\
**Frontend:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод на баланс телефона](./screenshots/annotated/WD-004__phone-form.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/WD-004__phone-form.png), [FORM_FILLED](./screenshots/annotated/WD-004__phone-filled.png), [TRANSFER_DELAY](./screenshots/annotated/WD-004__phone-transfer-delay.png)

**Purpose:** Send a withdrawal to a KZ phone balance.

**Entry points:** `ACT-CAS-HOME-004-03`, `ACT-LGC-SCR-041-03`\
**Exit points:** `ACT-WD-004-01`, `ACT-WD-004-02`, `ACT-WD-004-03`, `ACT-WD-004-04`, `ACT-WD-004-05`, `ACT-WD-004-06`, `ACT-WD-004-07`, `ACT-WD-004-08`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-WD-004-01` — Назад / закрыть → BACK: /legacy/withdraw
- [02] `ACT-WD-004-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-WD-004-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-WD-004-04` — Счёт списания → LOCAL_STATE: Account picker
- [05] `ACT-WD-004-05` — Номер телефона → LOCAL_STATE: withdraw.phoneDigits
- [06] `ACT-WD-004-06` — Сохранённые телефоны → LOCAL_STATE: CAS-WD-003 sheet
- [07] `ACT-WD-004-07` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [08] `ACT-WD-004-08` — Перевести → ROUTE: /legacy/withdraw/loading?ready=1

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: a saved synthetic phone can fill the form and complete local success.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no operator/provider validation, limits or pending behavior.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-002`, `Q-WD-003`, `Q-WD-014`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## CAS-WD-003 — Вывод на телефон — сохраненные номера

**Canonical ID:** CAS-WD-003\
**Aliases:** PhoneFormWithdrawScreen saved phone sheet\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/phone (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод на телефон — сохраненные номера](./screenshots/annotated/CAS-WD-003__saved-phone-picker.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-WD-003__saved-phone-picker.png)

**Purpose:** Choose a synthetic saved phone.

**Entry points:** `ACT-CAS-HOME-004-03`, `ACT-LGC-SCR-041-03`\
**Exit points:** `ACT-CAS-WD-003-01`, `ACT-CAS-WD-003-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-WD-003-01` — Закрыть / фон → LOCAL_STATE: Close sheet
- [02] `ACT-CAS-WD-003-02` — +7 (705) 234 68 87 → LOCAL_STATE: withdraw.phoneDigits

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: row selection fills phoneDigits.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: saved phone list is hardcoded.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## CAS-WD-005 — Перевод пользователю Cashhello

**Canonical ID:** CAS-WD-005\
**Aliases:** source screenId WD-005 (collision with phone-withdraw receipt); legacyNodeId local-draft\
**Module:** P2P\
**Route:** `/legacy/withdraw/cashhello-user`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** local-draft\
**Frontend:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`\
**Primary screenshot:** [Перевод пользователю Cashhello](./screenshots/annotated/CAS-WD-005__cashhello-user.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/CAS-WD-005__cashhello-user.png), [USER_NOT_FOUND](./screenshots/annotated/CAS-WD-005__user-not-found.png)

**Purpose:** Recipient-by-phone P2P form.

**Entry points:** `ACT-CAS-HOME-004-04`\
**Exit points:** `ACT-CAS-WD-005-01`, `ACT-CAS-WD-005-02`, `ACT-CAS-WD-005-03`, `ACT-CAS-WD-005-04`, `ACT-CAS-WD-005-05`, `ACT-CAS-WD-005-06`, `ACT-CAS-WD-005-07`, `ACT-CAS-WD-005-08`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-WD-005-01` — Назад / закрыть → BACK: /legacy/withdraw
- [02] `ACT-CAS-WD-005-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-CAS-WD-005-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-CAS-WD-005-04` — Счёт списания → LOCAL_STATE: Account picker
- [05] `ACT-CAS-WD-005-05` — Номер телефона → LOCAL_STATE: withdraw.phoneDigits
- [06] `ACT-CAS-WD-005-06` — Сохранённые телефоны → LOCAL_STATE: CAS-WD-003 sheet
- [07] `ACT-CAS-WD-005-07` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [08] `ACT-CAS-WD-005-08` — Перевести → ROUTE: /legacy/withdraw/loading?ready=1

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: any non-empty phone sets userNotFound=true; CTA can never become enabled.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: recipient lookup is a permanent blocking placeholder.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-P2P-001`, `Q-P2P-002`, `Q-P2P-003`, `Q-P2P-004`, `Q-P2P-005`, `Q-P2P-006`, `Q-P2P-007`, `Q-P2P-008`, `Q-QR-010`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-105 — Вывод наличными — выбор кассы

**Canonical ID:** LGC-SCR-105\
**Aliases:** legacyNodeId 648:17478\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/cash`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17478\
**Frontend:** `src/features/legacyWithdraw/CashWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод наличными — выбор кассы](./screenshots/annotated/LGC-SCR-105__cash-picker.png)\
**State screenshots:** [EMPTY](./screenshots/annotated/LGC-SCR-105__cash-picker.png)

**Purpose:** Open the cash-withdraw desk map.

**Entry points:** `ACT-CAS-HOME-004-04`, `ACT-LGC-SCR-041-04`, `ACT-LGC-SCR-105-02`, `ACT-LGC-SCR-106-01`, `ACT-LGC-SCR-108-01`, `ACT-LGC-SCR-093-01`, `ACT-LGC-SCR-095-01`, `ACT-LGC-SCR-096-01`, `ACT-LGC-SCR-109-01`\
**Exit points:** `ACT-LGC-SCR-105-01`, `ACT-LGC-SCR-105-02`, `ACT-LGC-SCR-105-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-105-01` — Назад / закрыть → BACK: /legacy/withdraw
- [02] `ACT-LGC-SCR-105-02` — Поиск по адресу → ROUTE: /legacy/withdraw/cash-map
- [03] `ACT-LGC-SCR-105-03` — Выбрать → NO_OP_STUB: Disabled

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: search row opens map; choose CTA is always disabled on this screen.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: no saved location/search implementation.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-106 — Вывод наличными — карта касс

**Canonical ID:** LGC-SCR-106\
**Aliases:** legacyNodeId 648:17787\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/cash-map`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17787\
**Frontend:** `src/features/legacyWithdraw/CashMapWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод наличными — карта касс](./screenshots/annotated/LGC-SCR-106__cash-map.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-106__cash-map.png)

**Purpose:** Browse static cash-withdraw desks.

**Entry points:** `ACT-LGC-SCR-105-02`, `ACT-LGC-SCR-093-01`, `ACT-LGC-SCR-095-01`, `ACT-LGC-SCR-096-01`, `ACT-LGC-SCR-109-01`\
**Exit points:** `ACT-LGC-SCR-106-01`, `ACT-LGC-SCR-106-02`, `ACT-LGC-SCR-106-03`, `ACT-LGC-SCR-106-04`, `ACT-LGC-SCR-106-05`, `ACT-LGC-SCR-106-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-106-01` — Назад / закрыть → BACK: /legacy/withdraw/cash
- [02] `ACT-LGC-SCR-106-02` — Микрорайон Таугуль 2 → LOCAL_STATE: selectedDeskId
- [03] `ACT-LGC-SCR-106-03` — 4-й микрорайон → LOCAL_STATE: selectedDeskId
- [04] `ACT-LGC-SCR-106-04` — ТРЦ MOSKVA Metropolitan → LOCAL_STATE: selectedDeskId
- [05] `ACT-LGC-SCR-106-05` — 8-й микрорайон, 8 → LOCAL_STATE: selectedDeskId
- [06] `ACT-LGC-SCR-106-06` — ТЦ Тигрохауд → LOCAL_STATE: selectedDeskId

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: shared static CASH_DESKS data; no geolocation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: map and filter chips are not functional.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-108 — Вывод наличными — касса выбрана

**Canonical ID:** LGC-SCR-108\
**Aliases:** legacyNodeId 648:18091\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/cash-map`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:18091\
**Frontend:** `src/features/legacyWithdraw/CashMapWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод наличными — касса выбрана](./screenshots/annotated/LGC-SCR-108__cash-desk-selected.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SELECTED](./screenshots/annotated/LGC-SCR-108__cash-desk-selected.png)

**Purpose:** Confirm a selected cash-withdraw desk and continue to amount.

**Entry points:** `ACT-LGC-SCR-105-02`, `ACT-LGC-SCR-093-01`, `ACT-LGC-SCR-095-01`, `ACT-LGC-SCR-096-01`, `ACT-LGC-SCR-109-01`\
**Exit points:** `ACT-LGC-SCR-108-01`, `ACT-LGC-SCR-108-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-108-01` — Назад / закрыть → BACK: /legacy/withdraw/cash
- [02] `ACT-LGC-SCR-108-02` — Выбрать → ROUTE: /legacy/withdraw/amount

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: choose sets method=cash and routes to amount.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: selected desk is local store state.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-010`

## LGC-SCR-093 — Вывод — ввод суммы

**Canonical ID:** LGC-SCR-093\
**Aliases:** legacyNodeId 648:18324\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/amount`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:18324\
**Frontend:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — ввод суммы](./screenshots/annotated/LGC-SCR-093__amount-default.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-093__amount-default.png)

**Purpose:** Enter amount for the legacy/cash withdraw path.

**Entry points:** `ACT-LGC-SCR-108-02`\
**Exit points:** `ACT-LGC-SCR-093-01`, `ACT-LGC-SCR-093-02`, `ACT-LGC-SCR-093-03`, `ACT-LGC-SCR-093-04`, `ACT-LGC-SCR-093-05`, `ACT-LGC-SCR-093-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-093-01` — Назад / закрыть → BACK: /legacy/withdraw/cash-map
- [02] `ACT-LGC-SCR-093-02` — Касса / Откуда → LOCAL_STATE: Desk/map selection
- [03] `ACT-LGC-SCR-093-03` — Счет / Куда → LOCAL_STATE: Destination account picker
- [04] `ACT-LGC-SCR-093-04` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [05] `ACT-LGC-SCR-093-05` — Все → LOCAL_STATE: amountDigits=1970
- [06] `ACT-LGC-SCR-093-06` — Вывести → LOCAL_STATE: LGC-SCR-097 modal

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: CTA valid only for local 1000–1970 range.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: min/max are demo constants, not approved limits.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-095 — Вывод — сумма выше mock-лимита

**Canonical ID:** LGC-SCR-095\
**Aliases:** legacyNodeId 804:25789\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/amount`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 804:25789\
**Frontend:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — сумма выше mock-лимита](./screenshots/annotated/LGC-SCR-095__amount-over-limit.png)\
**State screenshots:** [OVER_LIMIT](./screenshots/annotated/LGC-SCR-095__amount-over-limit.png)

**Purpose:** Visible local over-limit validation state.

**Entry points:** `ACT-LGC-SCR-108-02`\
**Exit points:** `ACT-LGC-SCR-095-01`, `ACT-LGC-SCR-095-02`, `ACT-LGC-SCR-095-03`, `ACT-LGC-SCR-095-04`, `ACT-LGC-SCR-095-05`, `ACT-LGC-SCR-095-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-095-01` — Назад / закрыть → BACK: /legacy/withdraw/cash-map
- [02] `ACT-LGC-SCR-095-02` — Касса / Откуда → LOCAL_STATE: Desk/map selection
- [03] `ACT-LGC-SCR-095-03` — Счет / Куда → LOCAL_STATE: Destination account picker
- [04] `ACT-LGC-SCR-095-04` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [05] `ACT-LGC-SCR-095-05` — Все → LOCAL_STATE: amountDigits=1970
- [06] `ACT-LGC-SCR-095-06` — Вывести → LOCAL_STATE: LGC-SCR-097 modal

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: 2000 displays “Сумма превышает допустимую”.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: maximum 1970 is a demo constant.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-002`

## LGC-SCR-096 — Вывод — сумма и комиссия

**Canonical ID:** LGC-SCR-096\
**Aliases:** legacyNodeId 804:25863\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/amount`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 804:25863\
**Frontend:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — сумма и комиссия](./screenshots/annotated/LGC-SCR-096__amount-fee.png)\
**State screenshots:** [FEE_VISIBLE](./screenshots/annotated/LGC-SCR-096__amount-fee.png)

**Purpose:** Valid amount state showing the local fee.

**Entry points:** `ACT-LGC-SCR-108-02`\
**Exit points:** `ACT-LGC-SCR-096-01`, `ACT-LGC-SCR-096-02`, `ACT-LGC-SCR-096-03`, `ACT-LGC-SCR-096-04`, `ACT-LGC-SCR-096-05`, `ACT-LGC-SCR-096-06`\
**Visible business data:** 30 ₸ fee; 1000–1970 ₸ local range

**Interactive elements**

- [01] `ACT-LGC-SCR-096-01` — Назад / закрыть → BACK: /legacy/withdraw/cash-map
- [02] `ACT-LGC-SCR-096-02` — Касса / Откуда → LOCAL_STATE: Desk/map selection
- [03] `ACT-LGC-SCR-096-03` — Счет / Куда → LOCAL_STATE: Destination account picker
- [04] `ACT-LGC-SCR-096-04` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [05] `ACT-LGC-SCR-096-05` — Все → LOCAL_STATE: amountDigits=1970
- [06] `ACT-LGC-SCR-096-06` — Вывести → LOCAL_STATE: LGC-SCR-097 modal

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: 1500 displays a 30 ₸ fee and enabled CTA.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: flat 30 ₸ fee is not approved production economics.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-003`

## LGC-SCR-109 — Вывод наличными — сумма

**Canonical ID:** LGC-SCR-109\
**Aliases:** legacyNodeId 821:31425\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/amount`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 821:31425\
**Frontend:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод наличными — сумма](./screenshots/annotated/LGC-SCR-109__cash-amount.png)\
**State screenshots:** [CASH_LAYOUT](./screenshots/annotated/LGC-SCR-109__cash-amount.png)

**Purpose:** Cash-specific amount layout with desk and wallet direction labels.

**Entry points:** `ACT-LGC-SCR-108-02`\
**Exit points:** `ACT-LGC-SCR-109-01`, `ACT-LGC-SCR-109-02`, `ACT-LGC-SCR-109-03`, `ACT-LGC-SCR-109-04`, `ACT-LGC-SCR-109-05`, `ACT-LGC-SCR-109-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-109-01` — Назад / закрыть → BACK: /legacy/withdraw/cash-map
- [02] `ACT-LGC-SCR-109-02` — Касса / Откуда → LOCAL_STATE: Desk/map selection
- [03] `ACT-LGC-SCR-109-03` — Счет / Куда → LOCAL_STATE: Destination account picker
- [04] `ACT-LGC-SCR-109-04` — Сумма → LOCAL_STATE: withdraw.amountDigits
- [05] `ACT-LGC-SCR-109-05` — Все → LOCAL_STATE: amountDigits=1970
- [06] `ACT-LGC-SCR-109-06` — Вывести → LOCAL_STATE: LGC-SCR-097 modal

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: desk is rendered as “Откуда” and wallet as “Куда”; store debits the wallet on success.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: direction labels do not establish production cash settlement semantics.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## LGC-SCR-097 — Вывод — подтверждение

**Canonical ID:** LGC-SCR-097\
**Aliases:** legacyNodeId 648:18857\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/amount (modal)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:18857\
**Frontend:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — подтверждение](./screenshots/annotated/LGC-SCR-097__confirmation.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [CONFIRMATION](./screenshots/annotated/LGC-SCR-097__confirmation.png)

**Purpose:** Confirm amount and displayed fee before local processing.

**Entry points:** `ACT-LGC-SCR-108-02`\
**Exit points:** `ACT-LGC-SCR-097-01`, `ACT-LGC-SCR-097-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-097-01` — Подтвердить → ROUTE: /legacy/withdraw/loading
- [02] `ACT-LGC-SCR-097-02` — Закрыть / фон → LOCAL_STATE: Close confirmation

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: confirm routes to /legacy/withdraw/loading.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: displayed fee and settlement timing are demo behavior.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-004`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-098 — Вывод — обработка

**Canonical ID:** LGC-SCR-098\
**Aliases:** legacyNodeId 648:17221\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/loading`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17221\
**Frontend:** `src/features/legacyWithdraw/LoadingWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — обработка](./screenshots/annotated/LGC-SCR-098__loading.png)\
**State screenshots:** [LOADING](./screenshots/annotated/LGC-SCR-098__loading.png), [LOADING](./screenshots/annotated/LGC-SCR-098__cash-loading.png), [LOADING_ERROR_SCENARIO](./screenshots/annotated/LGC-SCR-098__error-loading.png), [LOADING_PROCESSING_SCENARIO](./screenshots/annotated/LGC-SCR-098__processing-loading.png)

**Purpose:** Transient local settlement spinner.

**Entry points:** `ACT-WD-002-09`, `ACT-LGC-SCR-092-09`, `ACT-WD-004-08`, `ACT-CAS-WD-005-08`, `ACT-LGC-SCR-097-01`\
**Exit points:** Automatic/local-only state\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- None in this state.

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: default delay is 700 ms; ready=1 bypasses it.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: timer does not represent provider or ledger timing.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-004`

## LGC-SCR-099 — Вывод — ошибка

**Canonical ID:** LGC-SCR-099\
**Aliases:** legacyNodeId 648:17246\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/loading?scenario=error`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17246\
**Frontend:** `src/features/legacyWithdraw/LoadingWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — ошибка](./screenshots/annotated/LGC-SCR-099__error.png)\
**State screenshots:** [FAILED](./screenshots/annotated/LGC-SCR-099__error.png)

**Purpose:** Mock withdrawal failure receipt.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-LGC-SCR-099-01`, `ACT-LGC-SCR-099-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-099-01` — Готово → ROUTE: /legacy/home
- [02] `ACT-LGC-SCR-099-02` — Поделиться → NO_OP_STUB: Alert

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: only reachable through a scenario query or QA navigation.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: local history status is “Отклонено”; no provider error taxonomy.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-005`, `Q-WD-006`

## WD-003 — Вывод — квитанция / результат

**Canonical ID:** WD-003\
**Aliases:** legacyNodeId 648:17298; history detail alias legacyNodeId 107:144\
**Module:** WITHDRAW\
**Route:** `/legacy/withdraw/loading; /legacy/history/[id]`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 648:17298\
**Frontend:** `src/features/legacyWithdraw/LoadingWithdrawScreen.tsx`\
**Primary screenshot:** [Вывод — квитанция / результат](./screenshots/annotated/WD-003__success.png)\
**State screenshots:** [SUCCESS](./screenshots/annotated/WD-003__success.png), [SUCCESS](./screenshots/annotated/WD-003__card-success.png), [SUCCESS](./screenshots/annotated/WD-003__phone-success.png), [READY_FOR_PICKUP](./screenshots/annotated/WD-003__cash-ready.png), [PROCESSING](./screenshots/annotated/WD-003__processing.png), [HISTORY_RECEIPT](./screenshots/annotated/WD-003__history-card-receipt.png)

**Purpose:** Shared withdrawal result/receipt visual for live and history routes.

**Entry points:** `ACT-WD-002-09`, `ACT-LGC-SCR-092-09`, `ACT-WD-004-08`, `ACT-CAS-WD-005-08`, `ACT-LGC-SCR-097-01`\
**Exit points:** `ACT-WD-003-01`, `ACT-WD-003-02`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-WD-003-01` — Готово / закрыть → ROUTE: /legacy/home or /legacy/history
- [02] `ACT-WD-003-02` — Поделиться → NO_OP_STUB: Alert “Чек скопирован (mock)”

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: processing/success/cash-ready copy is selected from local outcome/history fields.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: receipt numbers, fee and statuses are synthetic; share is an alert.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-WD-004`, `Q-WD-005`, `Q-WD-007`, `Q-WD-008`, `Q-WD-009`, `Q-WD-010`, `Q-WD-011`, `Q-WD-012`, `Q-WD-015`, `Q-HIST-002`, `Q-HIST-007`

## CAS-HIST-005 — История — квитанция вывода на телефон

**Canonical ID:** CAS-HIST-005\
**Aliases:** source screenId WD-005 (collision with Cashhello-user form); legacyNodeId 118:226\
**Module:** HISTORY\
**Route:** `/legacy/history/wd-phone`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 118:226\
**Frontend:** `src/features/legacyHistory/OperationDetailsScreen.tsx`\
**Primary screenshot:** [История — квитанция вывода на телефон](./screenshots/annotated/CAS-HIST-005__phone-withdraw-receipt.png)\
**State screenshots:** [HISTORY_RECEIPT](./screenshots/annotated/CAS-HIST-005__phone-withdraw-receipt.png)

**Purpose:** Phone-withdraw receipt rendered from history.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-HIST-005-01`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-HIST-005-01` — Назад / закрыть → BACK: /legacy/history

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: source reuses WD-005, colliding with the Cashhello-user form ID; this canonical ID disambiguates it.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: seed operation and receipt fields are static.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## PAY-001 — Оплата — каталог услуг

**Canonical ID:** PAY-001\
**Aliases:** None\
**Module:** PAYMENT\
**Route:** `/legacy/payment`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyPayment/PaymentScreen.tsx`\
**Primary screenshot:** [Оплата — каталог услуг](./screenshots/annotated/PAY-001__catalog.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/PAY-001__catalog.png), [CATEGORY_SELECTED](./screenshots/annotated/PAY-001__category-mfo.png), [FAVORITES_EMPTY](./screenshots/annotated/PAY-001__favorites-empty.png), [SEARCH_RESULTS](./screenshots/annotated/PAY-001__search-result.png), [EMPTY](./screenshots/annotated/PAY-001__search-empty.png), [GUEST](./screenshots/annotated/PAY-001__guest-browse.png)

**Purpose:** Browse/search/filter a static bookmaker, digital and MFO service catalog.

**Entry points:** `ACT-LGC-SCR-025-18`…`025-25`, `ACT-LGC-SCR-026-17`…`026-24`, `ACT-LGC-SCR-025-13`\
**Exit points:** `ACT-PAY-001-01`, `ACT-PAY-001-02`, `ACT-PAY-001-03`, `ACT-PAY-001-04`, `ACT-PAY-001-05`, `ACT-PAY-001-06`, `ACT-PAY-001-07`, `ACT-PAY-001-08`, `ACT-PAY-001-09`, `ACT-PAY-001-10`, `ACT-PAY-001-11`, `ACT-PAY-001-12`, `ACT-PAY-001-13`, `ACT-PAY-001-14`, `ACT-PAY-001-15`, `ACT-PAY-001-16`, `ACT-PAY-001-17`, `ACT-PAY-001-18`, `ACT-PAY-001-19`, `ACT-PAY-001-20`, `ACT-PAY-001-21`, `ACT-PAY-001-22`, `ACT-PAY-001-23`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-PAY-001-01` — Cashhello — на главную → ROUTE: /legacy/home
- [02] `ACT-PAY-001-02` — Профиль → ROUTE: /legacy/profile
- [03] `ACT-PAY-001-03` — Что хотите пополнить? → LOCAL_STATE: payment.query
- [04] `ACT-PAY-001-04` — Категория → LOCAL_STATE: CAS-PAY-001 sheet
- [05] `ACT-PAY-001-05` — Все → LOCAL_STATE: tab=all
- [06] `ACT-PAY-001-06` — Избранные → LOCAL_STATE: tab=favorites
- [07] `ACT-PAY-001-07` — Букмекеры → LOCAL_STATE: Toggle catalog section
- [08] `ACT-PAY-001-08` — Цифровые товары → LOCAL_STATE: Toggle catalog section
- [09] `ACT-PAY-001-09` — МФО → LOCAL_STATE: Toggle catalog section
- [10] `ACT-PAY-001-10` — Ubet → ROUTE: /legacy/payment/ubet
- [11] `ACT-PAY-001-11` — Oinabet → ROUTE: /legacy/payment/oinabet
- [12] `ACT-PAY-001-12` — Tennisi → ROUTE: /legacy/payment/tennisi
- [13] `ACT-PAY-001-13` — Робокэш / Займер → ROUTE: /legacy/payment/zaimer
- [14] `ACT-PAY-001-14` — CreditBar → ROUTE: /legacy/payment/creditbar
- [15] `ACT-PAY-001-15` — i-credit.kz → ROUTE: /legacy/payment/icredit
- [16] `ACT-PAY-001-16` — Kengo → ROUTE: /legacy/payment/kengo
- [17] `ACT-PAY-001-17` — Sat Credit → ROUTE: /legacy/payment/satcredit
- [18] `ACT-PAY-001-18` — Недоступные сервисы (Fonbet, 1xbet, Parimatch, Steam) → NO_OP_STUB: Disabled
- [19] `ACT-PAY-001-19` — Главная → ROUTE: /legacy/home
- [20] `ACT-PAY-001-20` — Оплата → ROUTE: /legacy/payment
- [21] `ACT-PAY-001-21` — QR → ROUTE: /legacy/qr
- [22] `ACT-PAY-001-22` — История → ROUTE: /legacy/history
- [23] `ACT-PAY-001-23` — Профиль → ROUTE: /legacy/profile

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: guest browsing and service detail navigation are allowed.
- CURRENT_CODE_FACT: unavailable rows are disabled.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: +2% bonuses and -1.2%…-4% commission subtitles are static copy.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PAY-001`, `Q-PAY-004`, `Q-PAY-006`, `Q-PAY-011`

## CAS-PAY-001 — Оплата — выбор категории

**Canonical ID:** CAS-PAY-001\
**Aliases:** PaymentCategorySheet\
**Module:** PAYMENT\
**Route:** `/legacy/payment (sheet)`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyPayment/PaymentCategorySheet.tsx`\
**Primary screenshot:** [Оплата — выбор категории](./screenshots/annotated/CAS-PAY-001__category-sheet.png)\
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-PAY-001__category-sheet.png)

**Purpose:** Select a catalog category.

**Entry points:** `ACT-LGC-SCR-025-18`…`025-25`, `ACT-LGC-SCR-026-17`…`026-24`, `ACT-LGC-SCR-025-13`\
**Exit points:** `ACT-CAS-PAY-001-01`, `ACT-CAS-PAY-001-02`, `ACT-CAS-PAY-001-03`, `ACT-CAS-PAY-001-04`, `ACT-CAS-PAY-001-05`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-PAY-001-01` — Закрыть / фон → LOCAL_STATE: Close sheet
- [02] `ACT-CAS-PAY-001-02` — Все категории → LOCAL_STATE: categoryId=Все категории
- [03] `ACT-CAS-PAY-001-03` — Букмекеры → LOCAL_STATE: categoryId=Букмекеры
- [04] `ACT-CAS-PAY-001-04` — Цифровые товары → LOCAL_STATE: categoryId=Цифровые товары
- [05] `ACT-CAS-PAY-001-05` — МФО → LOCAL_STATE: categoryId=МФО

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: selecting a category closes the sheet and filters client-side.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: category list is static.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: None recorded

## PAY-002 — Оплата — услуга

**Canonical ID:** PAY-002\
**Aliases:** None\
**Module:** PAYMENT\
**Route:** `/legacy/payment/[id]`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyPayment/PaymentServiceScreen.tsx`\
**Primary screenshot:** [Оплата — услуга](./screenshots/annotated/PAY-002__ubet.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/PAY-002__ubet.png), [DEFAULT_MFO](./screenshots/annotated/PAY-002__zaimer.png), [UNAVAILABLE_DEEP_LINK](./screenshots/annotated/PAY-002__unavailable.png), [NOT_FOUND](./screenshots/annotated/PAY-002__not-found.png), [GUEST_FORM_FILLED](./screenshots/annotated/PAY-002__guest-filled.png), [FORM_FILLED](./screenshots/annotated/PAY-002__filled-bonus.png), [LOADING](./screenshots/annotated/PAY-002__loading.png), [AFTER_ALERT](./screenshots/annotated/PAY-002__after-success-alert.png)

**Purpose:** Enter service identifier/phone, amount and source account.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-PAY-002-01`, `ACT-PAY-002-02`, `ACT-PAY-002-03`, `ACT-PAY-002-04`, `ACT-PAY-002-05`, `ACT-PAY-002-06`, `ACT-PAY-002-07`, `ACT-PAY-002-08`, `ACT-PAY-002-09`, `ACT-PAY-002-10`, `ACT-PAY-002-11`, `ACT-PAY-002-12`, `ACT-PAY-002-13`, `ACT-PAY-002-14`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-PAY-002-01` — Назад / закрыть → BACK: /legacy/payment
- [02] `ACT-PAY-002-02` — Cashhello — на главную → ROUTE: /legacy/home
- [03] `ACT-PAY-002-03` — Профиль → ROUTE: /legacy/profile
- [04] `ACT-PAY-002-04` — Избранное → LOCAL_STATE: payment.favorites
- [05] `ACT-PAY-002-05` — Номер телефона → LOCAL_STATE: phoneDigits
- [06] `ACT-PAY-002-06` — Сумма → LOCAL_STATE: amountDigits
- [07] `ACT-PAY-002-07` — Оплатить со счёта → LOCAL_STATE: CAS-PAY-002 sheet
- [08] `ACT-PAY-002-08` — Оплатить → LOCAL_STATE: 900 ms loading → success Alert
- [09] `ACT-PAY-002-09` — Главная → ROUTE: /legacy/home
- [10] `ACT-PAY-002-10` — Оплата → ROUTE: /legacy/payment
- [11] `ACT-PAY-002-11` — QR → ROUTE: /legacy/qr
- [12] `ACT-PAY-002-12` — История → ROUTE: /legacy/history
- [13] `ACT-PAY-002-13` — Профиль → ROUTE: /legacy/profile
- [14] `ACT-PAY-002-14` — Оплата — вернуться в каталог (not found) → ROUTE: /legacy/payment

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: guest may fill the form but pay redirects to auth.
- CURRENT_RUNTIME_FACT: authorized pay waits 900 ms then displays an Alert.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: no balance debit, history append, provider request or receipt.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PAY-002`, `Q-PAY-004`, `Q-PAY-005`, `Q-PAY-006`, `Q-PAY-007`, `Q-PAY-008`, `Q-PAY-009`, `Q-PAY-010`, `Q-PAY-011`, `Q-PAY-012`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## CAS-PAY-002 — Оплата — выбор счета

**Canonical ID:** CAS-PAY-002\
**Aliases:** PaymentServiceScreen account picker\
**Module:** PAYMENT\
**Route:** `/legacy/payment/[id] (sheet)`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyPayment/PaymentServiceScreen.tsx`\
**Primary screenshot:** [Оплата — выбор счета](./screenshots/annotated/CAS-PAY-002__account-picker.png)\
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-PAY-002__account-picker.png)

**Purpose:** Select a mock source account for service payment.

**Entry points:** Direct route / state transition\
**Exit points:** `ACT-CAS-PAY-002-01`, `ACT-CAS-PAY-002-02`, `ACT-CAS-PAY-002-03`, `ACT-CAS-PAY-002-04`, `ACT-CAS-PAY-002-05`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-PAY-002-01` — Закрыть / фон → LOCAL_STATE: Close picker
- [02] `ACT-CAS-PAY-002-02` — Счет ₸ → LOCAL_STATE: payment.sourceId
- [03] `ACT-CAS-PAY-002-03` — Счет ₽ → LOCAL_STATE: payment.sourceId
- [04] `ACT-CAS-PAY-002-04` — Счет $ → LOCAL_STATE: payment.sourceId
- [05] `ACT-CAS-PAY-002-05` — Бонусный счет → LOCAL_STATE: payment.sourceId

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: includes bonus as a source option.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: selecting a source affects display only; payment does not debit it.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-PAY-003`

## LGC-SCR-111 — История операций

**Canonical ID:** LGC-SCR-111\
**Aliases:** legacyNodeId 980:26609\
**Module:** HISTORY\
**Route:** `/legacy/history`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 980:26609\
**Frontend:** `src/features/legacyHistory/HistoryScreen.tsx`\
**Primary screenshot:** [История операций](./screenshots/annotated/LGC-SCR-111__history-list.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-111__history-list.png), [GUEST](./screenshots/annotated/LGC-SCR-111__guest-history.png), [DATE_FILTERED](./screenshots/annotated/LGC-SCR-111__date-filtered.png)

**Purpose:** Browse local canonical/live operation history.

**Entry points:** `ACT-LGC-SCR-025-10`, `ACT-LGC-SCR-025-18`, `ACT-LGC-SCR-025-15`, `ACT-LGC-SCR-026-10`, `ACT-LGC-SCR-026-15`, `ACT-LGC-SCR-032-05`, `ACT-LGC-SCR-032-06`, `ACT-LGC-SCR-033-05`, `ACT-LGC-SCR-066-14`, `ACT-WD-003-01`, `ACT-CAS-HIST-005-01`\
**Exit points:** `ACT-LGC-SCR-111-01`, `ACT-LGC-SCR-111-02`, `ACT-LGC-SCR-111-03`, `ACT-LGC-SCR-111-04`, `ACT-LGC-SCR-111-05`, `ACT-LGC-SCR-111-06`, `ACT-LGC-SCR-111-07`, `ACT-LGC-SCR-111-08`, `ACT-LGC-SCR-111-09`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-111-01` — Cashhello — на главную → ROUTE: /legacy/home
- [02] `ACT-LGC-SCR-111-02` — Профиль → ROUTE: /legacy/profile
- [03] `ACT-LGC-SCR-111-03` — Выбрать даты → LOCAL_STATE: CAS-HIST-001 sheet
- [04] `ACT-LGC-SCR-111-04` — Списание — операция → LOCAL_STATE: CAS-HIST-002 action sheet
- [05] `ACT-LGC-SCR-111-05` — Главная → ROUTE: /legacy/home
- [06] `ACT-LGC-SCR-111-06` — Оплата → ROUTE: /legacy/payment
- [07] `ACT-LGC-SCR-111-07` — QR → ROUTE: /legacy/qr
- [08] `ACT-LGC-SCR-111-08` — История → ROUTE: /legacy/history
- [09] `ACT-LGC-SCR-111-09` — Профиль → ROUTE: /legacy/profile

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: debit rows open action sheets; credit rows are not pressable.
- CURRENT_RUNTIME_FACT: guest can browse but repeat/share actions gate to auth.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: operation dates, amounts, parties and receipt numbers are synthetic.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-007`, `Q-TRF-007`, `Q-PAY-008`, `Q-PAY-012`, `Q-HIST-001`, `Q-HIST-002`, `Q-HIST-006`, `Q-HIST-008`, `Q-HIST-010`

## CAS-HIST-001 — История — выбор дат

**Canonical ID:** CAS-HIST-001\
**Aliases:** HistoryDateSheet\
**Module:** HISTORY\
**Route:** `/legacy/history (sheet)`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHistory/HistoryDateSheet.tsx`\
**Primary screenshot:** [История — выбор дат](./screenshots/annotated/CAS-HIST-001__calendar.png)\
**Screenshot QA:** CAPTURE_GAP — requested state was not runtime-confirmed; linked PNG is a base-state fallback.
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-HIST-001__calendar.png), [DATE_SELECTED](./screenshots/annotated/CAS-HIST-001__calendar-selected.png)

**Purpose:** Select or reset a date range.

**Entry points:** `ACT-LGC-SCR-025-10`, `ACT-LGC-SCR-025-18`, `ACT-LGC-SCR-025-15`, `ACT-LGC-SCR-026-10`, `ACT-LGC-SCR-026-15`, `ACT-LGC-SCR-032-05`, `ACT-LGC-SCR-032-06`, `ACT-LGC-SCR-033-05`, `ACT-LGC-SCR-066-14`, `ACT-WD-003-01`, `ACT-CAS-HIST-005-01`\
**Exit points:** `ACT-CAS-HIST-001-01`, `ACT-CAS-HIST-001-02`, `ACT-CAS-HIST-001-03`, `ACT-CAS-HIST-001-04`, `ACT-CAS-HIST-001-05`, `ACT-CAS-HIST-001-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-HIST-001-01` — Закрыть / фон → LOCAL_STATE: Close calendar
- [02] `ACT-CAS-HIST-001-02` — Предыдущий месяц → LOCAL_STATE: Calendar month
- [03] `ACT-CAS-HIST-001-03` — Следующий месяц → LOCAL_STATE: Calendar month
- [04] `ACT-CAS-HIST-001-04` — День календаря → LOCAL_STATE: Draft date range
- [05] `ACT-CAS-HIST-001-05` — Сбросить → LOCAL_STATE: Clear date range
- [06] `ACT-CAS-HIST-001-06` — Применить → LOCAL_STATE: Apply date range

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: date tap followed by Apply filters the local operation list.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: calendar filtering is client-side.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-HIST-009`

## CAS-HIST-002 — История — действия с операцией

**Canonical ID:** CAS-HIST-002\
**Aliases:** HistoryActionSheet\
**Module:** HISTORY\
**Route:** `/legacy/history (sheet)`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHistory/HistoryActionSheet.tsx`\
**Primary screenshot:** [История — действия с операцией](./screenshots/annotated/CAS-HIST-002__action-sheet.png)\
**State screenshots:** [SHEET_OPEN](./screenshots/annotated/CAS-HIST-002__action-sheet.png), [GUEST](./screenshots/annotated/CAS-HIST-002__action-sheet-guest.png)

**Purpose:** Repeat an operation or open its receipt/detail.

**Entry points:** `ACT-LGC-SCR-025-10`, `ACT-LGC-SCR-025-18`, `ACT-LGC-SCR-025-15`, `ACT-LGC-SCR-026-10`, `ACT-LGC-SCR-026-15`, `ACT-LGC-SCR-032-05`, `ACT-LGC-SCR-032-06`, `ACT-LGC-SCR-033-05`, `ACT-LGC-SCR-066-14`, `ACT-WD-003-01`, `ACT-CAS-HIST-005-01`\
**Exit points:** `ACT-CAS-HIST-002-01`, `ACT-CAS-HIST-002-02`, `ACT-CAS-HIST-002-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-CAS-HIST-002-01` — Закрыть / фон → LOCAL_STATE: Close action sheet
- [02] `ACT-CAS-HIST-002-02` — Повторить операцию → GUEST_GATE: operation.repeatHref
- [03] `ACT-CAS-HIST-002-03` — Поделиться чеком → GUEST_GATE: /legacy/history/[id]

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: both actions redirect guests to auth.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_CODE_FACT: share action navigates to detail rather than sharing.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-HIST-004`

## LGC-SCR-113 — История — фильтр

**Canonical ID:** LGC-SCR-113\
**Aliases:** legacyNodeId 925:24765\
**Module:** HISTORY\
**Route:** `/legacy/history/filter`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 925:24765\
**Frontend:** `src/features/legacyHistory/FilterScreen.tsx`\
**Primary screenshot:** [История — фильтр](./screenshots/annotated/LGC-SCR-113__filter.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/LGC-SCR-113__filter.png), [SELECTED](./screenshots/annotated/LGC-SCR-113__filter-selected.png), [EMPTY_RESULT](./screenshots/annotated/LGC-SCR-113__filter-empty-result.png)

**Purpose:** Draft and apply period, operation type and account filters.

**Entry points:** `ACT-LGC-SCR-026-10`\
**Exit points:** `ACT-LGC-SCR-113-01`, `ACT-LGC-SCR-113-02`, `ACT-LGC-SCR-113-03`, `ACT-LGC-SCR-113-04`, `ACT-LGC-SCR-113-05`, `ACT-LGC-SCR-113-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-113-01` — Назад / закрыть → BACK: /legacy/history
- [02] `ACT-LGC-SCR-113-02` — Период → LOCAL_STATE: draftPeriod
- [03] `ACT-LGC-SCR-113-03` — Тип операции → LOCAL_STATE: draftOpType
- [04] `ACT-LGC-SCR-113-04` — Счет → LOCAL_STATE: draftAccountId
- [05] `ACT-LGC-SCR-113-05` — Сбросить фильтр → LOCAL_STATE: Reset filters
- [06] `ACT-LGC-SCR-113-06` — Применить → BACK: /legacy/history

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: Apply clears the calendar date range.
- CURRENT_CODE_FACT: current/previous period logic is hardcoded to August/July UTC.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: fixed demo periods and local filtering.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-HIST-009`

## LGC-SCR-115 — История — детали операции

**Canonical ID:** LGC-SCR-115\
**Aliases:** legacyNodeId varies by status\
**Module:** HISTORY\
**Route:** `/legacy/history/[id]`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyHistory/OperationDetailsScreen.tsx`\
**Primary screenshot:** [История — детали операции](./screenshots/annotated/LGC-SCR-115__processing-detail.png)\
**State screenshots:** [PROCESSING](./screenshots/annotated/LGC-SCR-115__processing-detail.png), [CANCEL_CONFIRMATION](./screenshots/annotated/LGC-SCR-115__cancel-confirmation.png), [REJECTED](./screenshots/annotated/LGC-SCR-115__cancelled-rejected.png), [SUCCESS](./screenshots/annotated/LGC-SCR-115__success-detail.png)

**Purpose:** Legacy detail sheet for live-appended operations without withdraw_receipt variant.

**Entry points:** `ACT-LGC-SCR-111-08`, `ACT-LGC-SCR-032-06`, `ACT-CAS-HIST-002-03`, `ACT-LGC-SCR-115-05`, `ACT-LGC-SCR-120-01`\
**Exit points:** `ACT-LGC-SCR-115-01`, `ACT-LGC-SCR-115-02`, `ACT-LGC-SCR-115-03`, `ACT-LGC-SCR-115-04`, `ACT-LGC-SCR-115-05`, `ACT-LGC-SCR-115-06`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-115-01` — Назад / закрыть → BACK: /legacy/history
- [02] `ACT-LGC-SCR-115-02` — Поделиться → NO_OP_STUB: Alert
- [03] `ACT-LGC-SCR-115-03` — Отменить операцию → LOCAL_STATE: Cancel confirmation
- [04] `ACT-LGC-SCR-115-04` — Да — отменить → LOCAL_STATE: operation.status=Отклонено
- [05] `ACT-LGC-SCR-115-05` — Чек → ROUTE: /legacy/history/[id]/receipt
- [06] `ACT-LGC-SCR-115-06` — Помощь → NO_OP_STUB: Alert

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: cancellable processing operation can be locally changed to “Отклонено”.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- CURRENT_MOCK_BEHAVIOR: cancel mutates local history only; help/share are alerts.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-009`, `Q-WD-007`, `Q-WD-012`, `Q-PAY-010`, `Q-HIST-002`, `Q-HIST-003`, `Q-HIST-005`

## LGC-SCR-120 — История — чек

**Canonical ID:** LGC-SCR-120\
**Aliases:** legacyNodeId 933:25268\
**Module:** HISTORY\
**Route:** `/legacy/history/[id]/receipt`\
**Auth state:** AUTHORIZED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** 933:25268\
**Frontend:** `src/features/legacyHistory/ReceiptScreen.tsx`\
**Primary screenshot:** [История — чек](./screenshots/annotated/LGC-SCR-120__receipt.png)\
**State screenshots:** [RECEIPT](./screenshots/annotated/LGC-SCR-120__receipt.png), [RECEIPT](./screenshots/annotated/LGC-SCR-120__receipt-out.png)

**Purpose:** Mock barcode receipt for eligible legacy details.

**Entry points:** `ACT-LGC-SCR-115-05`\
**Exit points:** `ACT-LGC-SCR-120-01`, `ACT-LGC-SCR-120-02`, `ACT-LGC-SCR-120-03`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-LGC-SCR-120-01` — Назад / закрыть → BACK: /legacy/history/[id]
- [02] `ACT-LGC-SCR-120-02` — Поделиться → NO_OP_STUB: Alert
- [03] `ACT-LGC-SCR-120-03` — Скачать → NO_OP_STUB: Alert

**CURRENT PRODUCT OBSERVATION**

- CURRENT_CODE_FACT: source explicitly labels barcode as visual mock, not fiscal receipt.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: share/download display alerts.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-TOPUP-010`, `Q-WD-015`, `Q-HIST-005`, `Q-HIST-006`, `Q-HIST-007`

## QR-001 — Получить по QR

**Canonical ID:** QR-001\
**Aliases:** None\
**Module:** QR\
**Route:** `/legacy/qr`\
**Auth state:** MIXED\
**Figma:** NONE — CODE_ONLY\
**Legacy node alias:** None\
**Frontend:** `src/features/legacyQr/ReceiveQrScreen.tsx`\
**Primary screenshot:** [Получить по QR](./screenshots/annotated/QR-001__qr-entry.png)\
**State screenshots:** [DEFAULT](./screenshots/annotated/QR-001__qr-entry.png), [FORM_FILLED](./screenshots/annotated/QR-001__amount-filled.png), [GENERATED](./screenshots/annotated/QR-001__generated.png), [DEFAULT_AFTER_RESET](./screenshots/annotated/QR-001__reset.png), [GUEST_FORM_FILLED](./screenshots/annotated/QR-001__guest-filled.png)

**Purpose:** Create a local receive-QR payload for a fixed amount.

**Entry points:** `ACT-LGC-SCR-025-14`, `ACT-LGC-SCR-026-14`, `ACT-LGC-SCR-066-13`, `ACT-PAY-001-21`, `ACT-PAY-002-11`, `ACT-LGC-SCR-111-07`, `ACT-QR-001-08`\
**Exit points:** `ACT-QR-001-01`, `ACT-QR-001-02`, `ACT-QR-001-03`, `ACT-QR-001-04`, `ACT-QR-001-05`, `ACT-QR-001-06`, `ACT-QR-001-07`, `ACT-QR-001-08`, `ACT-QR-001-09`, `ACT-QR-001-10`\
**Visible business data:** See annotated screenshot; no production truth inferred.

**Interactive elements**

- [01] `ACT-QR-001-01` — Cashhello — на главную → ROUTE: /legacy/home
- [02] `ACT-QR-001-02` — Профиль → ROUTE: /legacy/profile
- [03] `ACT-QR-001-03` — Сумма → LOCAL_STATE: amountDigits
- [04] `ACT-QR-001-04` — Сгенерировать QR → LOCAL_STATE: generatedAmount
- [05] `ACT-QR-001-05` — Новая сумма → LOCAL_STATE: Clear generatedAmount
- [06] `ACT-QR-001-06` — Главная → ROUTE: /legacy/home
- [07] `ACT-QR-001-07` — Оплата → ROUTE: /legacy/payment
- [08] `ACT-QR-001-08` — QR → ROUTE: /legacy/qr
- [09] `ACT-QR-001-09` — История → ROUTE: /legacy/history
- [10] `ACT-QR-001-10` — Профиль → ROUTE: /legacy/profile

**CURRENT PRODUCT OBSERVATION**

- CURRENT_RUNTIME_FACT: guest can enter amount but generation redirects to auth.
- CURRENT_CODE_FACT: “Новая сумма” clears generatedAmount.

**CURRENT MOCK / PROTOTYPE BEHAVIOR**

- PROTOTYPE_UI_ONLY: payload is client-generated cashhello://pay?amount=…&currency=KZT with no intent, signature, expiry or status.

**OWNER BUSINESS DECISION**

- OWNER_DECISION_REQUIRED: `Q-QR-001`, `Q-QR-002`, `Q-QR-003`, `Q-QR-004`, `Q-QR-005`, `Q-QR-006`, `Q-QR-007`, `Q-QR-008`, `Q-QR-009`, `Q-QR-010`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`
