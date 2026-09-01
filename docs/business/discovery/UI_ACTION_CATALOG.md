# Cashello UI action catalog

Every numbered screenshot callout resolves to an action below. Decorative SVGs are intentionally excluded.

Destination types: `ROUTE`, `SHEET`, `MODAL`, `LOCAL_STATE`, `EXTERNAL`, `NO_OP_STUB`, `GUEST_GATE`, `BACK`, `UNKNOWN`.

## Interactive icon legend

| Icon     | Meaning                                 | Where used                | Current behavior                  |
| -------- | --------------------------------------- | ------------------------- | --------------------------------- |
| Eye      | Показать/скрыть чувствительное значение | Home balances, card CVV   | toggle local visibility           |
| Back     | Вернуться к предыдущему экрану/fallback | Most stack screens        | BACK                              |
| Close    | Закрыть sheet/modal/camera              | Sheets and overlays       | LOCAL_STATE                       |
| Favorite | Добавить/убрать услугу из избранного    | PAY-002                   | local favorite or guest auth gate |
| QR       | Открыть получение по QR                 | LegacyTabBar              | ROUTE → /legacy/qr                |
| Top-up   | Пополнить                               | Home/account              | SHEET or ROUTE                    |
| Withdraw | Вывести                                 | Home/method screens       | SHEET or ROUTE                    |
| Share    | Поделиться чеком/результатом            | History/withdraw          | detail route or mock Alert        |
| Profile  | Профиль/вход                            | Headers/tab bar           | profile route or guest gate       |
| Calendar | Выбрать диапазон дат                    | History                   | SHEET                             |
| Camera   | Сканировать лицо/документ/карту         | Auth/withdraw             | mock local state                  |
| Block    | Заблокировать карту                     | Card                      | local confirmation                |
| Headset  | Служба поддержки                        | Global FAB on `/legacy/*` | SHEET → CAS-SUPPORT-002           |
| Telegram | Канал Telegram                          | Support sheet             | NO_OP_STUB Alert until owner URL  |
| WhatsApp | Канал WhatsApp                          | Support sheet             | NO_OP_STUB Alert until owner URL  |

## Button / CTA legend

Identical copy does not imply identical settlement semantics.

| Visible CTA         | Current meanings                                            | Action examples                                               |
| ------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| Войти               | Auth entry or submit phone                                  | `ACT-HOME-001-12`, `ACT-CAS-AUTH-003-04`                      |
| Продолжить / Далее  | Local auth state advance                                    | `ACT-CAS-AUTH-002-02`, `ACT-CAS-AUTH-010-03`                  |
| Подтвердить         | Cash-withdraw confirmation only                             | `ACT-LGC-SCR-097-01`                                          |
| Пополнить           | Open method sheet, own-account transfer, or fixed card mock | `ACT-HOME-001-04`, `ACT-LGC-SCR-073-08`, `ACT-LGC-SCR-087-03` |
| Вывести / Перевести | Open method sheet or execute local withdraw timer           | `ACT-HOME-001-05`, `ACT-WD-002-08`                            |
| Оплатить            | Guest gate or 900 ms Alert-only mock                        | `ACT-PAY-002-07`                                              |
| Повторить           | Navigate to operation repeatHref                            | `ACT-CAS-HIST-002-02`                                         |
| Отменить            | Close UI or mutate cancellable local history                | `ACT-LGC-SCR-115-03`                                          |

## Global support overlay

Present on every `/legacy/*` screen via `SupportContactHost`. Numbered on HOME-001 `[13]` and LGC-SCR-025 `[17]`; other screens share `ACT-GLOBAL-SUPPORT-01` without duplicating a callout on every PNG.

### ACT-GLOBAL-SUPPORT-01 — Headset FAB

- **Screen / element:** CAS-SUPPORT-002 / EL-GLOBAL-SUPPORT-FAB
- **Control:** icon
- **User intent:** Открыть службу поддержки
- **Precondition:** Any legacy product screen
- **Current destination:** SHEET → CAS-SUPPORT-002
- **Current code handler:** `SupportContactHost` `setOpen(true)`
- **Current mock effect:** Opens in-tree sheet
- **Guest/auth behavior:** Visible to guest (offset 98px) and authorized (offset 80px)
- **Potential backend requirement:** Owner-provided channel URLs
- **Source trace:** `src/app/legacy/_layout.tsx`, `src/features/legacyHome/SupportContactHost.tsx`, `src/features/legacyHome/SupportContactFab.tsx`
- **Owner dependency:** `Q-SUPPORT-001`, `Q-SUPPORT-003`

### ACT-HOME-001-13 — [13] Служба поддержки

- **Screen / element:** HOME-001 / EL-HOME-001-13
- **Control:** icon
- **User intent:** Открыть службу поддержки
- **Precondition:** HOME-001 visible
- **Current destination:** SHEET → CAS-SUPPORT-002
- **Current code handler:** `SupportContactHost`
- **Current mock effect:** Opens support sheet
- **Guest/auth behavior:** Enabled for guest
- **Source trace:** `src/features/legacyHome/SupportContactFab.tsx`
- **Owner dependency:** `Q-SUPPORT-001`

### ACT-LGC-SCR-025-17 — [17] Служба поддержки

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-17
- **Control:** icon
- **User intent:** Открыть службу поддержки
- **Precondition:** Authorized home visible
- **Current destination:** SHEET → CAS-SUPPORT-002
- **Current code handler:** `SupportContactHost`
- **Current mock effect:** Opens support sheet
- **Source trace:** `src/features/legacyHome/SupportContactFab.tsx`
- **Owner dependency:** `Q-SUPPORT-001`

### ACT-CAS-SUPPORT-002-01 — [02] Закрыть

- **Screen / element:** CAS-SUPPORT-002 / EL-CAS-SUPPORT-002-01
- **Control:** icon
- **User intent:** Закрыть sheet
- **Current destination:** LOCAL_STATE → close sheet
- **Current code handler:** `onClose`
- **Source trace:** `src/features/legacyHome/SupportContactSheet.tsx`

### ACT-CAS-SUPPORT-002-02 — [03] Телеграм 24/7

- **Screen / element:** CAS-SUPPORT-002 / EL-CAS-SUPPORT-002-02
- **Control:** row
- **User intent:** Написать в Telegram
- **Current destination:** NO_OP_STUB → Alert «Скоро»
- **Current code handler:** `openChannel(telegram)` where URL is `null`
- **Current mock effect:** `Alert.alert('Скоро', 'Ссылка на поддержку будет добавлена позже.')`
- **Owner dependency:** `Q-SUPPORT-001`, `Q-SUPPORT-004`

### ACT-CAS-SUPPORT-002-03 — [04] Whatsapp 24/7

- **Screen / element:** CAS-SUPPORT-002 / EL-CAS-SUPPORT-002-03
- **Control:** row
- **User intent:** Написать в WhatsApp
- **Current destination:** NO_OP_STUB → Alert «Скоро»
- **Current code handler:** `openChannel(whatsapp)` where URL is `null`
- **Owner dependency:** `Q-SUPPORT-001`, `Q-SUPPORT-004`

## CAS-AUTH-001 — Авторизация — заставка

### ACT-CAS-AUTH-001-01 — [01] Продолжить по касанию

- **Screen / element:** CAS-AUTH-001 / EL-CAS-AUTH-001-01
- **Control:** button
- **User intent:** Продолжить по касанию
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: iin
- **Current code handler:** ADVANCE_SPLASH
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-001-02 — [02] Автопереход через 1400 мс

- **Screen / element:** CAS-AUTH-001 / EL-CAS-AUTH-001-02
- **Control:** timer
- **User intent:** Автопереход через 1400 мс
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: iin
- **Current code handler:** setTimeout → ADVANCE_SPLASH
- **Current mock effect:** 1400 ms local timer
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

## CAS-AUTH-002 — Авторизация — онбординг

### ACT-CAS-AUTH-002-01 — [01] Пропустить

- **Screen / element:** CAS-AUTH-002 / EL-CAS-AUTH-002-01
- **Control:** button
- **User intent:** Пропустить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: iin
- **Current code handler:** ONBOARDING_SKIP
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-002-02 — [02] Далее

- **Screen / element:** CAS-AUTH-002 / EL-CAS-AUTH-002-02
- **Control:** button
- **User intent:** Далее
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Next onboarding page / auth step: iin
- **Current code handler:** ONBOARDING_NEXT
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

## CAS-AUTH-003 — Авторизация — ввод телефона

### ACT-CAS-AUTH-003-01 — [01] Cashhello — выйти

- **Screen / element:** CAS-AUTH-003 / EL-CAS-AUTH-003-01
- **Control:** button
- **User intent:** Cashhello — выйти
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** exitAuthToGuestHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-003-02 — [02] Назад / закрыть

- **Screen / element:** CAS-AUTH-003 / EL-CAS-AUTH-003-02
- **Control:** button
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** goHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-003-03 — [03] Номер телефона

- **Screen / element:** CAS-AUTH-003 / EL-CAS-AUTH-003-03
- **Control:** input
- **User intent:** Номер телефона
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth phoneDigits
- **Current code handler:** SET_PHONE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-003-04 — [04] Войти

- **Screen / element:** CAS-AUTH-003 / EL-CAS-AUTH-003-04
- **Control:** button
- **User intent:** Войти
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: verification
- **Current code handler:** SUBMIT_IIN
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** `Q-AUTH-001`

## CAS-AUTH-005 — Авторизация — сканирование лица

### ACT-CAS-AUTH-005-01 — [01] Сканировать / камера

- **Screen / element:** CAS-AUTH-005 / EL-CAS-AUTH-005-01
- **Control:** button; icon meaning: Camera
- **User intent:** Сканировать / камера
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: documentFront
- **Current code handler:** FACE_CONTINUE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** `Q-AUTH-012`

### ACT-CAS-AUTH-005-02 — [02] Отмена

- **Screen / element:** CAS-AUTH-005 / EL-CAS-AUTH-005-02
- **Control:** button
- **User intent:** Отмена
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: iin
- **Current code handler:** FACE_CANCEL
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

## CAS-AUTH-006 — Авторизация — резервный сценарий лица

### ACT-CAS-AUTH-006-01 — [01] Сканировать

- **Screen / element:** CAS-AUTH-006 / EL-CAS-AUTH-006-01
- **Control:** button
- **User intent:** Сканировать
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: documentFront
- **Current code handler:** FACE_CONTINUE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** `Q-KYC-004`

### ACT-CAS-AUTH-006-02 — [02] Отмена

- **Screen / element:** CAS-AUTH-006 / EL-CAS-AUTH-006-02
- **Control:** button
- **User intent:** Отмена
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: iin
- **Current code handler:** FACE_CANCEL
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

## CAS-AUTH-007 — Авторизация — документ, лицевая сторона

### ACT-CAS-AUTH-007-01 — [01] Закрыть

- **Screen / element:** CAS-AUTH-007 / EL-CAS-AUTH-007-01
- **Control:** button; icon meaning: Close
- **User intent:** Закрыть
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Previous auth capture step
- **Current code handler:** DOCUMENT_CANCEL
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-007-02 — [02] Снять

- **Screen / element:** CAS-AUTH-007 / EL-CAS-AUTH-007-02
- **Control:** button; icon meaning: Camera
- **User intent:** Снять
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Next auth capture step
- **Current code handler:** DOCUMENT_CAPTURE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** `Q-KYC-003`

## CAS-AUTH-008 — Авторизация — переворот документа

### ACT-CAS-AUTH-008-01 — [01] Закрыть

- **Screen / element:** CAS-AUTH-008 / EL-CAS-AUTH-008-01
- **Control:** button; icon meaning: Close
- **User intent:** Закрыть
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Previous auth capture step
- **Current code handler:** DOCUMENT_CANCEL
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-008-02 — [02] Снять

- **Screen / element:** CAS-AUTH-008 / EL-CAS-AUTH-008-02
- **Control:** button; icon meaning: Camera
- **User intent:** Снять
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Next auth capture step
- **Current code handler:** DOCUMENT_CAPTURE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

## CAS-AUTH-009 — Авторизация — документ, обратная сторона

### ACT-CAS-AUTH-009-01 — [01] Закрыть

- **Screen / element:** CAS-AUTH-009 / EL-CAS-AUTH-009-01
- **Control:** button; icon meaning: Close
- **User intent:** Закрыть
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Previous auth capture step
- **Current code handler:** DOCUMENT_CANCEL
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-009-02 — [02] Снять

- **Screen / element:** CAS-AUTH-009 / EL-CAS-AUTH-009-02
- **Control:** button; icon meaning: Camera
- **User intent:** Снять
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Next auth capture step
- **Current code handler:** DOCUMENT_CAPTURE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

## CAS-AUTH-010 — Авторизация — телефон после KYC

### ACT-CAS-AUTH-010-01 — [01] Номер телефона

- **Screen / element:** CAS-AUTH-010 / EL-CAS-AUTH-010-01
- **Control:** input
- **User intent:** Номер телефона
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth phoneDigits
- **Current code handler:** SET_PHONE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-010-02 — [02] Далее

- **Screen / element:** CAS-AUTH-010 / EL-CAS-AUTH-010-02
- **Control:** button
- **User intent:** Далее
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth step: verification
- **Current code handler:** SUBMIT_PHONE
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

## CAS-AUTH-011 — Авторизация — SMS-код

### ACT-CAS-AUTH-011-01 — [01] Назад / закрыть

- **Screen / element:** CAS-AUTH-011 / EL-CAS-AUTH-011-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/auth?qaStep=iin
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-011-02 — [02] SMS-код

- **Screen / element:** CAS-AUTH-011 / EL-CAS-AUTH-011-02
- **Control:** input
- **User intent:** SMS-код
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth sms
- **Current code handler:** SET_SMS
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** `Q-AUTH-002`, `Q-AUTH-003`, `Q-AUTH-005`

### ACT-CAS-AUTH-011-03 — [03] Отправить повторно через 00:34

- **Screen / element:** CAS-AUTH-011 / EL-CAS-AUTH-011-03
- **Control:** decorative_no_action
- **User intent:** Отправить повторно через 00:34
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → No handler
- **Current code handler:** None
- **Current mock effect:** Static countdown copy
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** `Q-AUTH-004`

## CAS-AUTH-012 — Авторизация — создание PIN

### ACT-CAS-AUTH-012-01 — [01] Cashhello — выйти

- **Screen / element:** CAS-AUTH-012 / EL-CAS-AUTH-012-01
- **Control:** button
- **User intent:** Cashhello — выйти
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** exitAuthToGuestHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-012-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** CAS-AUTH-012 / EL-CAS-AUTH-012-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → Auth PIN state machine
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** `Q-AUTH-006`

### ACT-CAS-AUTH-012-03 — [03] Удалить цифру

- **Screen / element:** CAS-AUTH-012 / EL-CAS-AUTH-012-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth PIN state machine
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** None recorded

## CAS-AUTH-013 — Авторизация — повтор PIN

### ACT-CAS-AUTH-013-01 — [01] Cashhello — выйти

- **Screen / element:** CAS-AUTH-013 / EL-CAS-AUTH-013-01
- **Control:** button
- **User intent:** Cashhello — выйти
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** exitAuthToGuestHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-013-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** CAS-AUTH-013 / EL-CAS-AUTH-013-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → Auth PIN state machine
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-013-03 — [03] Удалить цифру

- **Screen / element:** CAS-AUTH-013 / EL-CAS-AUTH-013-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth PIN state machine
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** None recorded

## CAS-AUTH-014 — Авторизация — ошибка PIN

### ACT-CAS-AUTH-014-01 — [01] Cashhello — выйти

- **Screen / element:** CAS-AUTH-014 / EL-CAS-AUTH-014-01
- **Control:** button
- **User intent:** Cashhello — выйти
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** exitAuthToGuestHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-014-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** CAS-AUTH-014 / EL-CAS-AUTH-014-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → Auth PIN state machine
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-014-03 — [03] Удалить цифру

- **Screen / element:** CAS-AUTH-014 / EL-CAS-AUTH-014-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth PIN state machine
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** None recorded

## CAS-AUTH-015 — Авторизация — вход по PIN

### ACT-CAS-AUTH-015-01 — [01] Cashhello — выйти

- **Screen / element:** CAS-AUTH-015 / EL-CAS-AUTH-015-01
- **Control:** button
- **User intent:** Cashhello — выйти
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** exitAuthToGuestHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-015-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** CAS-AUTH-015 / EL-CAS-AUTH-015-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → Auth PIN login
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** `Q-AUTH-008`, `Q-AUTH-010`

### ACT-CAS-AUTH-015-03 — [03] Удалить цифру

- **Screen / element:** CAS-AUTH-015 / EL-CAS-AUTH-015-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Auth PIN login
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/screens/PinView.tsx`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-015-04 — [04] Face ID

- **Screen / element:** CAS-AUTH-015 / EL-CAS-AUTH-015-04
- **Control:** icon; icon meaning: Biometric login
- **User intent:** Face ID
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → No handler
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-AUTH-015-05 — [05] Забыл код доступа

- **Screen / element:** CAS-AUTH-015 / EL-CAS-AUTH-015-05
- **Control:** decorative_no_action
- **User intent:** Забыл код доступа
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → No handler
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAuth/LegacyAuthRoute.tsx`, `src/features/legacyAuth/machine.ts`, `src/features/legacyAuth/store.ts`
- **Owner dependency:** `Q-AUTH-007`

## HOME-001 — Главная для гостя

### ACT-HOME-001-01 — [01] Cashhello — на главную

- **Screen / element:** HOME-001 / EL-HOME-001-01
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded

### ACT-HOME-001-02 — [02] Профиль

- **Screen / element:** HOME-001 / EL-HOME-001-02
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** GUEST_GATE → /legacy/auth?qaStep=iin
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Redirects to auth entry
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded

### ACT-HOME-001-03 — [03] Показать / скрыть балансы

- **Screen / element:** HOME-001 / EL-HOME-001-03
- **Control:** icon; icon meaning: Eye
- **User intent:** Показать / скрыть балансы
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → balancesHidden
- **Current code handler:** setBalancesHidden
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`, `src/features/legacyHome/session.ts`
- **Owner dependency:** None recorded

### ACT-HOME-001-04 — [04] Пополнить

- **Screen / element:** HOME-001 / EL-HOME-001-04
- **Control:** button; icon meaning: Top-up
- **User intent:** Пополнить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → TopupSelectSheet
- **Current code handler:** setTopupOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`, `src/features/legacyHome/session.ts`
- **Owner dependency:** None recorded

### ACT-HOME-001-05 — [05] Вывести

- **Screen / element:** HOME-001 / EL-HOME-001-05
- **Control:** button; icon meaning: Withdraw
- **User intent:** Вывести
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → WithdrawSelectSheet
- **Current code handler:** setWithdrawOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`, `src/features/legacyHome/session.ts`
- **Owner dependency:** None recorded

### ACT-HOME-001-06 — [06] Последние (segment)

- **Current destination:** LOCAL_STATE — active segment on guest Home

### ACT-HOME-001-15 — [07] Все (segment)

- **Current destination:** GUEST_GATE → /legacy/auth?qaStep=iin

### ACT-HOME-001-16 — [08] История (segment)

- **Current destination:** GUEST_GATE → /legacy/auth?qaStep=iin

### ACT-HOME-001-14 — [06] Бонус за регистрацию

- **Screen / element:** HOME-001 / EL-HOME-001-14
- **User intent:** Open auth from registration bonus preview row
- **Current destination:** GUEST_GATE → /legacy/auth?qaStep=iin
- **Classification:** PROTOTYPE_UI_ONLY / CURRENT_MOCK_BEHAVIOR (+500 Б copy is not production policy)

### ACT-HOME-001-12 — [12] Войти

- **Screen / element:** HOME-001 / EL-HOME-001-12
- **Control:** button
- **User intent:** Войти
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/auth?qaStep=iin
- **Current code handler:** router.push
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`, `src/features/legacyHome/session.ts`
- **Owner dependency:** None recorded

## LGC-SCR-025 — Главная авторизованного пользователя

### ACT-LGC-SCR-025-01 — [01] Cashhello — на главную

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-01
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-02 — [02] Профиль

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-02
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** `Q-AUTH-009`

### ACT-LGC-SCR-025-03 — [03] Показать / скрыть балансы

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-03
- **Control:** icon; icon meaning: Eye
- **User intent:** Показать / скрыть балансы
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → balancesHidden
- **Current code handler:** setBalancesHidden
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`, `src/features/legacyHome/session.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-04 — [04] Пополнить

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-04
- **Control:** button; icon meaning: Top-up
- **User intent:** Пополнить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → TopupSelectSheet
- **Current code handler:** setTopupOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`, `src/features/legacyHome/session.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-05 — [05] Вывести

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-05
- **Control:** button; icon meaning: Withdraw
- **User intent:** Вывести
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → WithdrawSelectSheet
- **Current code handler:** setWithdrawOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`, `src/features/legacyHome/session.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-06 — [06] Последние (segment)

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-06
- **User intent:** Keep active recent-operations preview on Home
- **Current destination:** LOCAL_STATE — paymentsTab=recent (no navigation)
- **Classification:** CURRENT_CODE_FACT at product SHA 86e9d3bee9ca13a82474f4acdcdec8f5d0eb3134

### ACT-LGC-SCR-025-07 — [07] Все (segment)

- **Current destination:** ROUTE → /legacy/payment
- **Classification:** CURRENT_CODE_FACT — alternate entry into BP-PAY-001 catalog browse

### ACT-LGC-SCR-025-10 — [08] История (segment)

- **Current destination:** ROUTE → /legacy/history
- **Classification:** CURRENT_CODE_FACT — alternate entry into BP-HIST-001 (replaces former «См. все» control)

### ACT-LGC-SCR-025-18 — [09] Ubet (recent operation)

- **Current destination:** ROUTE → /legacy/payment/ubet?phone=&amount= (prefill)
- **Classification:** CURRENT_MOCK_BEHAVIOR preview row with 2% bonus display

### ACT-LGC-SCR-025-19 … ACT-LGC-SCR-025-21 — [10–12] Other recent-operation rows

- **Current destination:** prefilled PAY-002 per service (4 rows total on Home)

### ACT-LGC-SCR-025-12 — [12] Главная

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-12
- **Control:** tab
- **User intent:** Главная
- **Precondition:** Tab bar visible; active=home
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-13 — [13] Оплата

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-13
- **Control:** tab
- **User intent:** Оплата
- **Precondition:** Tab bar visible; active=home
- **Current destination:** ROUTE → /legacy/payment
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-14 — [14] QR

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-14
- **Control:** tab; icon meaning: QR
- **User intent:** QR
- **Precondition:** Tab bar visible; active=home
- **Current destination:** ROUTE → /legacy/qr
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-15 — [15] История

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-15
- **Control:** tab
- **User intent:** История
- **Precondition:** Tab bar visible; active=home
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-025-16 — [16] Профиль

- **Screen / element:** LGC-SCR-025 / EL-LGC-SCR-025-16
- **Control:** tab; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Tab bar visible; active=home
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/HomeScreen.tsx`
- **Owner dependency:** None recorded


## LGC-SCR-029 — Счета — список

### ACT-LGC-SCR-029-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-029 / EL-LGC-SCR-029-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-029-02 — [02] Открыть счет

- **Screen / element:** LGC-SCR-029 / EL-LGC-SCR-029-02
- **Control:** button; icon meaning: Add
- **User intent:** Открыть счет
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-031 sheet
- **Current code handler:** setOpenSheet(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-029-03 — [03] Счет ₸ — основной

- **Screen / element:** LGC-SCR-029 / EL-LGC-SCR-029-03
- **Control:** row
- **User intent:** Счет ₸ — основной
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/accounts/kzt-primary
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-029-04 — [04] Счет ₸ — второй

- **Screen / element:** LGC-SCR-029 / EL-LGC-SCR-029-04
- **Control:** row
- **User intent:** Счет ₸ — второй
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/accounts/kzt-secondary
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-029-05 — [05] Счет $

- **Screen / element:** LGC-SCR-029 / EL-LGC-SCR-029-05
- **Control:** row
- **User intent:** Счет $
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/accounts/usd
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-029-06 — [06] Сделать основным

- **Screen / element:** LGC-SCR-029 / EL-LGC-SCR-029-06
- **Control:** swipe_action
- **User intent:** Сделать основным
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → accounts.primaryAccountId
- **Current code handler:** setPrimary
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** `Q-ACC-003`

## LGC-SCR-031 — Счета — выбор валюты нового счета

### ACT-LGC-SCR-031-01 — [01] Закрыть / фон

- **Screen / element:** LGC-SCR-031 / EL-LGC-SCR-031-01
- **Control:** button; icon meaning: Close
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-031-02 — [02] Тенге

- **Screen / element:** LGC-SCR-031 / EL-LGC-SCR-031-02
- **Control:** row
- **User intent:** Тенге
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → lastOpenCurrency=KZT
- **Current code handler:** markOpenCurrency
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** `Q-ACC-001`

### ACT-LGC-SCR-031-03 — [03] Доллар

- **Screen / element:** LGC-SCR-031 / EL-LGC-SCR-031-03
- **Control:** row
- **User intent:** Доллар
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → lastOpenCurrency=USD
- **Current code handler:** markOpenCurrency
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** `Q-ACC-002`

### ACT-LGC-SCR-031-04 — [04] Рубль

- **Screen / element:** LGC-SCR-031 / EL-LGC-SCR-031-04
- **Control:** row
- **User intent:** Рубль
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → lastOpenCurrency=RUB
- **Current code handler:** markOpenCurrency
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountsListScreen.tsx`, `src/features/legacyAccounts/store.ts`, `src/features/legacyAccounts/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-032 — Счет — реквизиты без карты

### ACT-LGC-SCR-032-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-032 / EL-LGC-SCR-032-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/accounts
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-032-02 — [02] Карта счета

- **Screen / element:** LGC-SCR-032 / EL-LGC-SCR-032-02
- **Control:** card
- **User intent:** Карта счета
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/card
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-032-03 — [03] Скачать

- **Screen / element:** LGC-SCR-032 / EL-LGC-SCR-032-03
- **Control:** button
- **User intent:** Скачать
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-034 sheet
- **Current code handler:** setSheet('download')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-032-04 — [04] Пополнить

- **Screen / element:** LGC-SCR-032 / EL-LGC-SCR-032-04
- **Control:** button
- **User intent:** Пополнить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-040 sheet
- **Current code handler:** setSheet('topup')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** `Q-ACC-004`, `Q-ACC-005`

### ACT-LGC-SCR-032-05 — [05] См. все — история

- **Screen / element:** LGC-SCR-032 / EL-LGC-SCR-032-05
- **Control:** link
- **User intent:** См. все — история
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-032-06 — [06] Операция истории

- **Screen / element:** LGC-SCR-032 / EL-LGC-SCR-032-06
- **Control:** row
- **User intent:** Операция истории
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/history/[id]
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

## LGC-SCR-033 — Счет — реквизиты с картой

### ACT-LGC-SCR-033-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-033 / EL-LGC-SCR-033-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/accounts
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-033-02 — [02] Карта счета

- **Screen / element:** LGC-SCR-033 / EL-LGC-SCR-033-02
- **Control:** card
- **User intent:** Карта счета
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/card
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** `Q-CARD-002`

### ACT-LGC-SCR-033-03 — [03] Скачать

- **Screen / element:** LGC-SCR-033 / EL-LGC-SCR-033-03
- **Control:** button
- **User intent:** Скачать
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-034 sheet
- **Current code handler:** setSheet('download')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-033-04 — [04] Пополнить

- **Screen / element:** LGC-SCR-033 / EL-LGC-SCR-033-04
- **Control:** button
- **User intent:** Пополнить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-040 sheet
- **Current code handler:** setSheet('topup')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-033-05 — [05] См. все — история

- **Screen / element:** LGC-SCR-033 / EL-LGC-SCR-033-05
- **Control:** link
- **User intent:** См. все — история
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

## LGC-SCR-034 — Счет — скачать данные

### ACT-LGC-SCR-034-01 — [01] Выписку

- **Screen / element:** LGC-SCR-034 / EL-LGC-SCR-034-01
- **Control:** button
- **User intent:** Выписку
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → lastDownload=statement
- **Current code handler:** markDownload
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** `Q-ACC-006`

### ACT-LGC-SCR-034-02 — [02] Реквизиты

- **Screen / element:** LGC-SCR-034 / EL-LGC-SCR-034-02
- **Control:** button
- **User intent:** Реквизиты
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → lastDownload=requisites
- **Current code handler:** markDownload
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-034-03 — [03] Отменить

- **Screen / element:** LGC-SCR-034 / EL-LGC-SCR-034-03
- **Control:** button
- **User intent:** Отменить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyAccounts/AccountDetailScreen.tsx`, `src/features/legacyAccounts/store.ts`
- **Owner dependency:** None recorded

## LGC-SCR-040 — Пополнение — выбор способа

### ACT-LGC-SCR-040-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-040 / EL-LGC-SCR-040-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-040-02 — [02] Между счетами

- **Screen / element:** LGC-SCR-040 / EL-LGC-SCR-040-02
- **Control:** button
- **User intent:** Между счетами
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/topup/between?to={accountId}
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** `Q-TOPUP-001`

### ACT-LGC-SCR-040-03 — [03] Картой другого банка

- **Screen / element:** LGC-SCR-040 / EL-LGC-SCR-040-03
- **Control:** button
- **User intent:** Картой другого банка
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/topup/card?to={accountId}
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-035 — Карта — данные скрыты

### ACT-LGC-SCR-035-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-035 / EL-LGC-SCR-035-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/accounts
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-035-02 — [02] Показать CVV

- **Screen / element:** LGC-SCR-035 / EL-LGC-SCR-035-02
- **Control:** button; icon meaning: Eye
- **User intent:** Показать CVV
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → card.face
- **Current code handler:** toggleCvv
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-035-03 — [03] Заблокировать

- **Screen / element:** LGC-SCR-035 / EL-LGC-SCR-035-03
- **Control:** button; icon meaning: Block
- **User intent:** Заблокировать
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-037 modal
- **Current code handler:** openBlockSheet
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** `Q-CARD-008`

### ACT-LGC-SCR-035-04 — [04] Лимиты

- **Screen / element:** LGC-SCR-035 / EL-LGC-SCR-035-04
- **Control:** button
- **User intent:** Лимиты
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/card/limits
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** `Q-CARD-001`, `Q-CARD-009`

### ACT-LGC-SCR-035-05 — [05] Сменить PIN-код

- **Screen / element:** LGC-SCR-035 / EL-LGC-SCR-035-05
- **Control:** button
- **User intent:** Сменить PIN-код
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/card/pin
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-035-06 — [06] Подключить Apple Pay

- **Screen / element:** LGC-SCR-035 / EL-LGC-SCR-035-06
- **Control:** button
- **User intent:** Подключить Apple Pay
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → applePayTapped=true
- **Current code handler:** tapApplePay
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** `Q-CARD-007`

### ACT-LGC-SCR-035-07 — [07] Подключить Google Pay

- **Screen / element:** LGC-SCR-035 / EL-LGC-SCR-035-07
- **Control:** button
- **User intent:** Подключить Google Pay
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → googlePayTapped=true
- **Current code handler:** tapGooglePay
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** `Q-CARD-007`

## LGC-SCR-036 — Карта — CVV показан

### ACT-LGC-SCR-036-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-036 / EL-LGC-SCR-036-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/accounts
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-036-02 — [02] Скрыть CVV

- **Screen / element:** LGC-SCR-036 / EL-LGC-SCR-036-02
- **Control:** button; icon meaning: Eye
- **User intent:** Скрыть CVV
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → card.face
- **Current code handler:** toggleCvv
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** `Q-CARD-010`

### ACT-LGC-SCR-036-03 — [03] Заблокировать

- **Screen / element:** LGC-SCR-036 / EL-LGC-SCR-036-03
- **Control:** button; icon meaning: Block
- **User intent:** Заблокировать
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-037 modal
- **Current code handler:** openBlockSheet
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-036-04 — [04] Лимиты

- **Screen / element:** LGC-SCR-036 / EL-LGC-SCR-036-04
- **Control:** button
- **User intent:** Лимиты
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/card/limits
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-036-05 — [05] Сменить PIN-код

- **Screen / element:** LGC-SCR-036 / EL-LGC-SCR-036-05
- **Control:** button
- **User intent:** Сменить PIN-код
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/card/pin
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-036-06 — [06] Подключить Apple Pay

- **Screen / element:** LGC-SCR-036 / EL-LGC-SCR-036-06
- **Control:** button
- **User intent:** Подключить Apple Pay
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → applePayTapped=true
- **Current code handler:** tapApplePay
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-036-07 — [07] Подключить Google Pay

- **Screen / element:** LGC-SCR-036 / EL-LGC-SCR-036-07
- **Control:** button
- **User intent:** Подключить Google Pay
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → googlePayTapped=true
- **Current code handler:** tapGooglePay
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

## LGC-SCR-037 — Карта — подтверждение блокировки

### ACT-LGC-SCR-037-01 — [01] Заблокировать

- **Screen / element:** LGC-SCR-037 / EL-LGC-SCR-037-01
- **Control:** button
- **User intent:** Заблокировать
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → card.blocked=true
- **Current code handler:** confirmBlock
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** `Q-CARD-003`, `Q-CARD-004`

### ACT-LGC-SCR-037-02 — [02] Отменить

- **Screen / element:** LGC-SCR-037 / EL-LGC-SCR-037-02
- **Control:** button
- **User intent:** Отменить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close modal
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

## LGC-SCR-038 — Карта — лимиты

### ACT-LGC-SCR-038-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-038 / EL-LGC-SCR-038-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/card
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/LimitsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-038-02 — [02] Изменить лимит

- **Screen / element:** LGC-SCR-038 / EL-LGC-SCR-038-02
- **Control:** button
- **User intent:** Изменить лимит
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-039 sheet
- **Current code handler:** openLimitSheet
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

## LGC-SCR-039 — Карта — выбор лимита

### ACT-LGC-SCR-039-01 — [01] Закрыть

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-01
- **Control:** button; icon meaning: Close
- **User intent:** Закрыть
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-039-02 — [02] 10 000₸

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-02
- **Control:** chip
- **User intent:** 10 000₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → limitDraft=10 000₸
- **Current code handler:** setLimitDraft
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-039-03 — [03] 20 000₸

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-03
- **Control:** chip
- **User intent:** 20 000₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → limitDraft=20 000₸
- **Current code handler:** setLimitDraft
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-039-04 — [04] 50 000₸

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-04
- **Control:** chip
- **User intent:** 50 000₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → limitDraft=50 000₸
- **Current code handler:** setLimitDraft
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-039-05 — [05] 100 000₸

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-05
- **Control:** chip
- **User intent:** 100 000₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → limitDraft=100 000₸
- **Current code handler:** setLimitDraft
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-039-06 — [06] 500 000₸

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-06
- **Control:** chip
- **User intent:** 500 000₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → limitDraft=500 000₸
- **Current code handler:** setLimitDraft
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-039-07 — [07] Без лимита

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-07
- **Control:** chip
- **User intent:** Без лимита
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → limitDraft=Без лимита
- **Current code handler:** setLimitDraft
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-039-08 — [08] Готово

- **Screen / element:** LGC-SCR-039 / EL-LGC-SCR-039-08
- **Control:** button
- **User intent:** Готово
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Apply limit and close
- **Current code handler:** applyLimit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardScreen.tsx`, `src/features/legacyCard/store.ts`
- **Owner dependency:** `Q-CARD-006`

## LGC-SCR-057 — Карта — новый PIN

### ACT-LGC-SCR-057-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-057 / EL-LGC-SCR-057-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/card
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-057-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** LGC-SCR-057 / EL-LGC-SCR-057-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → Card PIN state machine
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** `Q-CARD-005`

### ACT-LGC-SCR-057-03 — [03] Удалить цифру

- **Screen / element:** LGC-SCR-057 / EL-LGC-SCR-057-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Card PIN state machine
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

## LGC-SCR-059 — Карта — повтор PIN

### ACT-LGC-SCR-059-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-059 / EL-LGC-SCR-059-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/card
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-059-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** LGC-SCR-059 / EL-LGC-SCR-059-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → Card PIN state machine
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-059-03 — [03] Удалить цифру

- **Screen / element:** LGC-SCR-059 / EL-LGC-SCR-059-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Card PIN state machine
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

## LGC-SCR-060 — Карта — ошибка PIN

### ACT-LGC-SCR-060-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-060 / EL-LGC-SCR-060-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/card
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-060-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** LGC-SCR-060 / EL-LGC-SCR-060-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → Card PIN state machine
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-060-03 — [03] Удалить цифру

- **Screen / element:** LGC-SCR-060 / EL-LGC-SCR-060-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Card PIN state machine
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyCard/CardPinScreen.tsx`
- **Owner dependency:** None recorded

## LGC-SCR-066 — Профиль

### ACT-LGC-SCR-066-01 — [01] Cashhello — на главную

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-01
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-02 — [02] Профиль

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-02
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-03 — [03] Подробнее — статус

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-03
- **Control:** button
- **User intent:** Подробнее — статус
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile/status
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-KYC-007`

### ACT-LGC-SCR-066-04 — [04] Введите промокод

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-04
- **Control:** input
- **User intent:** Введите промокод
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → promoCode local state
- **Current code handler:** setPromoCode
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-PROFILE-003`

### ACT-LGC-SCR-066-05 — [05] Применить промокод

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-05
- **Control:** input_submit
- **User intent:** Применить промокод
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** onSubmitEditing
- **Current mock effect:** Alert only
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-06 — [06] Push-уведомления

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-06
- **Control:** switch
- **User intent:** Push-уведомления
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → profile.pushEnabled
- **Current code handler:** togglePush
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-PROFILE-004`

### ACT-LGC-SCR-066-07 — [07] Изменить PIN-код входа

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-07
- **Control:** button
- **User intent:** Изменить PIN-код входа
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile/pin
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-08 — [08] Документы

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-08
- **Control:** button
- **User intent:** Документы
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/stub/documents
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-09 — [09] Выйти

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-09
- **Control:** button
- **User intent:** Выйти
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-PROFILE-001 sheet
- **Current code handler:** setConfirm('logout')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-10 — [10] Удалить профиль

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-10
- **Control:** button
- **User intent:** Удалить профиль
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-PROFILE-002 sheet
- **Current code handler:** setConfirm('delete')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-11 — [11] Главная

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-11
- **Control:** tab
- **User intent:** Главная
- **Precondition:** Tab bar visible; active=profile
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-12 — [12] Оплата

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-12
- **Control:** tab
- **User intent:** Оплата
- **Precondition:** Tab bar visible; active=profile
- **Current destination:** ROUTE → /legacy/payment
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-13 — [13] QR

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-13
- **Control:** tab; icon meaning: QR
- **User intent:** QR
- **Precondition:** Tab bar visible; active=profile
- **Current destination:** ROUTE → /legacy/qr
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-14 — [14] История

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-14
- **Control:** tab
- **User intent:** История
- **Precondition:** Tab bar visible; active=profile
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-066-15 — [15] Профиль

- **Screen / element:** LGC-SCR-066 / EL-LGC-SCR-066-15
- **Control:** tab; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Tab bar visible; active=profile
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`
- **Owner dependency:** None recorded

## CAS-PROFILE-001 — Профиль — подтверждение выхода

### ACT-CAS-PROFILE-001-01 — [01] Выйти

- **Screen / element:** CAS-PROFILE-001 / EL-CAS-PROFILE-001-01
- **Control:** button
- **User intent:** Выйти
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home?guest=1
- **Current code handler:** goGuestHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-AUTH-011`

### ACT-CAS-PROFILE-001-02 — [02] Отмена

- **Screen / element:** CAS-PROFILE-001 / EL-CAS-PROFILE-001-02
- **Control:** button
- **User intent:** Отмена
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

## CAS-PROFILE-002 — Профиль — подтверждение удаления

### ACT-CAS-PROFILE-002-01 — [01] Удалить

- **Screen / element:** CAS-PROFILE-002 / EL-CAS-PROFILE-002-01
- **Control:** button
- **User intent:** Удалить
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/auth
- **Current code handler:** goAuth
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-PROFILE-005`, `Q-PROFILE-006`

### ACT-CAS-PROFILE-002-02 — [02] Отмена

- **Screen / element:** CAS-PROFILE-002 / EL-CAS-PROFILE-002-02
- **Control:** button
- **User intent:** Отмена
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-067 — Профиль — персональные данные

### ACT-LGC-SCR-067-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-067 / EL-LGC-SCR-067-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/profile
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/PersonalDataScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-067-02 — [02] Изменить

- **Screen / element:** LGC-SCR-067 / EL-LGC-SCR-067-02
- **Control:** button
- **User intent:** Изменить
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** Alert only
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-068 — Профиль — статус идентификации

### ACT-LGC-SCR-068-01 — [01] Cashhello — на главную

- **Screen / element:** LGC-SCR-068 / EL-LGC-SCR-068-01
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/IdentificationStatusScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-068-02 — [02] Профиль

- **Screen / element:** LGC-SCR-068 / EL-LGC-SCR-068-02
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/IdentificationStatusScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-068-03 — [03] Назад / закрыть

- **Screen / element:** LGC-SCR-068 / EL-LGC-SCR-068-03
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/profile
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/IdentificationStatusScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-068-04 — [04] Расширить лимиты

- **Screen / element:** LGC-SCR-068 / EL-LGC-SCR-068-04
- **Control:** button
- **User intent:** Расширить лимиты
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** Alert only
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-KYC-001`, `Q-KYC-002`, `Q-KYC-005`, `Q-KYC-006`

## LGC-SCR-122 — Профиль — новый телефон

### ACT-LGC-SCR-122-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-122 / EL-LGC-SCR-122-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/profile
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ChangePhoneScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-122-02 — [02] Телефон

- **Screen / element:** LGC-SCR-122 / EL-LGC-SCR-122-02
- **Control:** input
- **User intent:** Телефон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → profile.pendingPhoneDigits
- **Current code handler:** setPendingPhoneDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-122-03 — [03] Изменить

- **Screen / element:** LGC-SCR-122 / EL-LGC-SCR-122-03
- **Control:** button
- **User intent:** Изменить
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile/phone/verify
- **Current code handler:** router.push
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-PROFILE-001`, `Q-PROFILE-002`

## LGC-SCR-123 — Профиль — проверка нового телефона

### ACT-LGC-SCR-123-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-123 / EL-LGC-SCR-123-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/profile/phone
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-123-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** LGC-SCR-123 / EL-LGC-SCR-123-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → profile.phoneSms
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ChangePhoneVerifyScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-123-03 — [03] Удалить цифру

- **Screen / element:** LGC-SCR-123 / EL-LGC-SCR-123-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → profile.phoneSms
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ChangePhoneVerifyScreen.tsx`
- **Owner dependency:** None recorded

## LGC-SCR-124 — Профиль — изменение PIN входа

### ACT-LGC-SCR-124-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-124 / EL-LGC-SCR-124-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/profile
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ChangePinScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-124-02 — [02] Цифровая клавиатура 0–9

- **Screen / element:** LGC-SCR-124 / EL-LGC-SCR-124-02
- **Control:** keypad
- **User intent:** Цифровая клавиатура 0–9
- **Precondition:** PIN/OTP step visible
- **Current destination:** LOCAL_STATE → profile PIN state machine
- **Current code handler:** PIN_DIGIT / pinDigit / append digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ChangePinScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-124-03 — [03] Удалить цифру

- **Screen / element:** LGC-SCR-124 / EL-LGC-SCR-124-03
- **Control:** icon; icon meaning: Backspace
- **User intent:** Удалить цифру
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → profile PIN state machine
- **Current code handler:** PIN_DELETE / delete digit
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ChangePinScreen.tsx`
- **Owner dependency:** None recorded

## LGC-SCR-125 — Сообщения

### ACT-LGC-SCR-125-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-125 / EL-LGC-SCR-125-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/MessagesScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-125-02 — [02] Фильтр

- **Screen / element:** LGC-SCR-125 / EL-LGC-SCR-125-02
- **Control:** icon; icon meaning: Filter
- **User intent:** Фильтр
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-125-03 — [03] Помощь по сообщению

- **Screen / element:** LGC-SCR-125 / EL-LGC-SCR-125-03
- **Control:** repeated_link
- **User intent:** Помощь по сообщению
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/help
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-126 — Помощь

### ACT-LGC-SCR-126-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-126 / EL-LGC-SCR-126-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/messages
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/HelpScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-126-02 — [02] Описание ошибки

- **Screen / element:** LGC-SCR-126 / EL-LGC-SCR-126-02
- **Control:** textarea
- **User intent:** Описание ошибки
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → profile.helpText
- **Current code handler:** setHelpText
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-PROFILE-007`

### ACT-LGC-SCR-126-03 — [03] Прикрепить документ

- **Screen / element:** LGC-SCR-126 / EL-LGC-SCR-126-03
- **Control:** button
- **User intent:** Прикрепить документ
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** Alert only
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyProfile/ProfileScreen.tsx`, `src/features/legacyProfile/store.ts`, `src/features/legacyProfile/mockData.ts`
- **Owner dependency:** `Q-PROFILE-008`

## LGC-SCR-061 — Поиск действий

### ACT-LGC-SCR-061-01 — [01] Поиск

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-01
- **Control:** input
- **User intent:** Поиск
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → search.query
- **Current code handler:** setQuery
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-061-02 — [02] Отменить

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-02
- **Control:** button
- **User intent:** Отменить
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** clearQuery + back
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-061-03 — [03] Пополнить счет

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-03
- **Control:** result_row
- **User intent:** Пополнить счет
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/topup
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-061-04 — [04] Удалить счет

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-04
- **Control:** result_row
- **User intent:** Удалить счет
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-061-05 — [05] Открыть карту

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-05
- **Control:** result_row
- **User intent:** Открыть карту
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/card
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-061-06 — [06] Перевод между счетами

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-06
- **Control:** result_row
- **User intent:** Перевод между счетами
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/topup/between
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-061-07 — [07] Конвертация

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-07
- **Control:** result_row
- **User intent:** Конвертация
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-061-08 — [08] Вывести деньги

- **Screen / element:** LGC-SCR-061 / EL-LGC-SCR-061-08
- **Control:** button
- **User intent:** Вывести деньги
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacySearch/SearchScreen.tsx`, `src/features/legacySearch/store.ts`, `src/features/legacySearch/mockData.ts`
- **Owner dependency:** None recorded

## CAS-STUB-001 — Заглушка — регистрация

### ACT-CAS-STUB-001-01 — [01] Назад / закрыть

- **Screen / element:** CAS-STUB-001 / EL-CAS-STUB-001-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/GuestStubScreen.tsx`
- **Owner dependency:** None recorded

## CAS-STUB-002 — Заглушка — бонус

### ACT-CAS-STUB-002-01 — [01] Назад / закрыть

- **Screen / element:** CAS-STUB-002 / EL-CAS-STUB-002-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/GuestStubScreen.tsx`
- **Owner dependency:** None recorded

## CAS-STUB-003 — Заглушка — пользователь Cashhello

### ACT-CAS-STUB-003-01 — [01] Назад / закрыть

- **Screen / element:** CAS-STUB-003 / EL-CAS-STUB-003-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/GuestStubScreen.tsx`
- **Owner dependency:** None recorded

## CAS-STUB-004 — Заглушка — привязанные карты

### ACT-CAS-STUB-004-01 — [01] Назад / закрыть

- **Screen / element:** CAS-STUB-004 / EL-CAS-STUB-004-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/GuestStubScreen.tsx`
- **Owner dependency:** None recorded

## CAS-STUB-005 — Заглушка — предложить идею

### ACT-CAS-STUB-005-01 — [01] Назад / закрыть

- **Screen / element:** CAS-STUB-005 / EL-CAS-STUB-005-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/GuestStubScreen.tsx`
- **Owner dependency:** None recorded

## CAS-STUB-006 — Заглушка — документы

### ACT-CAS-STUB-006-01 — [01] Назад / закрыть

- **Screen / element:** CAS-STUB-006 / EL-CAS-STUB-006-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHome/GuestStubScreen.tsx`
- **Owner dependency:** None recorded

## LGC-SCR-069 — Между своими счетами — пустая форма

### ACT-LGC-SCR-069-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-069-02 — [02] Cashhello — на главную

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-069-03 — [03] Профиль

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-069-04 — [04] Откуда

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-04
- **Control:** account_card
- **User intent:** Откуда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → picker=from
- **Current code handler:** setPicker('from')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-069-05 — [05] Куда

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-05
- **Control:** account_card
- **User intent:** Куда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → picker=to
- **Current code handler:** setPicker('to')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** `Q-TRF-008`

### ACT-LGC-SCR-069-06 — [06] Сумма

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-06
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → topup.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-069-07 — [07] Все

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-07
- **Control:** button
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Fill source balance
- **Current code handler:** fillAll
- **Current mock effect:** Uses floored mock source balance
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-069-08 — [08] Пополнить

- **Screen / element:** LGC-SCR-069 / EL-LGC-SCR-069-08
- **Control:** button
- **User intent:** Пополнить
- **Precondition:** from/to differ and amount > 0
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** confirmBetween + navigateHome
- **Current mock effect:** Debits/credits local balances and appends successful history
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-070 — Между своими счетами — счета выбраны

### ACT-LGC-SCR-070-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-070-02 — [02] Cashhello — на главную

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-070-03 — [03] Профиль

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-070-04 — [04] Откуда

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-04
- **Control:** account_card
- **User intent:** Откуда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → picker=from
- **Current code handler:** setPicker('from')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** `Q-TRF-001`

### ACT-LGC-SCR-070-05 — [05] Куда

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-05
- **Control:** account_card
- **User intent:** Куда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → picker=to
- **Current code handler:** setPicker('to')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-070-06 — [06] Сумма

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-06
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → topup.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-070-07 — [07] Все

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-07
- **Control:** button
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Fill source balance
- **Current code handler:** fillAll
- **Current mock effect:** Uses floored mock source balance
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-070-08 — [08] Пополнить

- **Screen / element:** LGC-SCR-070 / EL-LGC-SCR-070-08
- **Control:** button
- **User intent:** Пополнить
- **Precondition:** Current CTA state
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** confirmBetween + navigateHome
- **Current mock effect:** Debits/credits local balances and appends successful history
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-071 — Между своими счетами — выбор счета

### ACT-LGC-SCR-071-01 — [01] Закрыть / фон

- **Screen / element:** LGC-SCR-071 / EL-LGC-SCR-071-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-071-02 — [02] Счет ₸

- **Screen / element:** LGC-SCR-071 / EL-LGC-SCR-071-02
- **Control:** row
- **User intent:** Счет ₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Set picker account
- **Current code handler:** setFromId / setToId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-071-03 — [03] Счет $

- **Screen / element:** LGC-SCR-071 / EL-LGC-SCR-071-03
- **Control:** row
- **User intent:** Счет $
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Set picker account
- **Current code handler:** setFromId / setToId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-073 — Между своими счетами — сумма введена

### ACT-LGC-SCR-073-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-073-02 — [02] Cashhello — на главную

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-073-03 — [03] Профиль

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/BetweenAccountsScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-073-04 — [04] Откуда

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-04
- **Control:** account_card
- **User intent:** Откуда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → picker=from
- **Current code handler:** setPicker('from')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-073-05 — [05] Куда

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-05
- **Control:** account_card
- **User intent:** Куда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → picker=to
- **Current code handler:** setPicker('to')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-073-06 — [06] Сумма

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-06
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → topup.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-073-07 — [07] Все

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-07
- **Control:** button
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Fill source balance
- **Current code handler:** fillAll
- **Current mock effect:** Uses floored mock source balance
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-073-08 — [08] Пополнить

- **Screen / element:** LGC-SCR-073 / EL-LGC-SCR-073-08
- **Control:** button
- **User intent:** Пополнить
- **Precondition:** Current CTA state
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** confirmBetween + navigateHome
- **Current mock effect:** Debits/credits local balances and appends successful history
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** `Q-TRF-002`, `Q-TRF-003`, `Q-TRF-004`, `Q-TRF-005`, `Q-TRF-006`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-085 — Пополнение картой — форма

### ACT-LGC-SCR-085-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-085 / EL-LGC-SCR-085-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/ExternalCardScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-085-02 — [02] Cashhello — на главную

- **Screen / element:** LGC-SCR-085 / EL-LGC-SCR-085-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/ExternalCardScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-085-03 — [03] Профиль

- **Screen / element:** LGC-SCR-085 / EL-LGC-SCR-085-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/ExternalCardScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-085-04 — [04] Сохранённая карта

- **Screen / element:** LGC-SCR-085 / EL-LGC-SCR-085-04
- **Control:** button
- **User intent:** Сохранённая карта
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-TOPUP-001 sheet
- **Current code handler:** setSavedOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** `Q-TOPUP-002`, `Q-TOPUP-003`, `Q-TOPUP-004`

### ACT-LGC-SCR-085-05 — [05] Пополнить

- **Screen / element:** LGC-SCR-085 / EL-LGC-SCR-085-05
- **Control:** button
- **User intent:** Пополнить
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** confirmCardTopUp
- **Current mock effect:** History only; fixed 1500
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## CAS-TOPUP-001 — Пополнение картой — сохраненные карты

### ACT-CAS-TOPUP-001-01 — [01] Закрыть / фон

- **Screen / element:** CAS-TOPUP-001 / EL-CAS-TOPUP-001-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-TOPUP-001-02 — [02] Карта •••• 8812

- **Screen / element:** CAS-TOPUP-001 / EL-CAS-TOPUP-001-02
- **Control:** row
- **User intent:** Карта •••• 8812
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedLast4=8812
- **Current code handler:** applySavedCard
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-087 — Пополнение картой — карта выбрана

### ACT-LGC-SCR-087-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-087 / EL-LGC-SCR-087-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-087-02 — [02] Сохранённая карта

- **Screen / element:** LGC-SCR-087 / EL-LGC-SCR-087-02
- **Control:** button
- **User intent:** Сохранённая карта
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-TOPUP-001 sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-087-03 — [03] Пополнить

- **Screen / element:** LGC-SCR-087 / EL-LGC-SCR-087-03
- **Control:** button
- **User intent:** Пополнить
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** confirmCardTopUp
- **Current mock effect:** Fixed 1500; history only
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** `Q-TOPUP-005`, `Q-TOPUP-006`, `Q-TOPUP-007`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-074 — Пополнение наличными — выбор кассы

### ACT-LGC-SCR-074-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-074 / EL-LGC-SCR-074-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/CashTopupScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-074-02 — [02] Поиск по адресу

- **Screen / element:** LGC-SCR-074 / EL-LGC-SCR-074-02
- **Control:** search_row
- **User intent:** Поиск по адресу
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/topup/cash-map
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-074-03 — [03] Выбрать

- **Screen / element:** LGC-SCR-074 / EL-LGC-SCR-074-03
- **Control:** button
- **User intent:** Выбрать
- **Precondition:** Always disabled in current code
- **Current destination:** NO_OP_STUB → Disabled
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-080 — Пополнение наличными — карта касс

### ACT-LGC-SCR-080-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-080 / EL-LGC-SCR-080-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup/cash
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-080-02 — [02] Микрорайон Таугуль 2

- **Screen / element:** LGC-SCR-080 / EL-LGC-SCR-080-02
- **Control:** row
- **User intent:** Микрорайон Таугуль 2
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-080-03 — [03] 4-й микрорайон

- **Screen / element:** LGC-SCR-080 / EL-LGC-SCR-080-03
- **Control:** row
- **User intent:** 4-й микрорайон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-080-04 — [04] ТРЦ MOSKVA Metropolitan

- **Screen / element:** LGC-SCR-080 / EL-LGC-SCR-080-04
- **Control:** row
- **User intent:** ТРЦ MOSKVA Metropolitan
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-080-05 — [05] 8-й микрорайон, 8

- **Screen / element:** LGC-SCR-080 / EL-LGC-SCR-080-05
- **Control:** row
- **User intent:** 8-й микрорайон, 8
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-080-06 — [06] ТЦ Тигрохауд

- **Screen / element:** LGC-SCR-080 / EL-LGC-SCR-080-06
- **Control:** row
- **User intent:** ТЦ Тигрохауд
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-081 — Пополнение наличными — касса выбрана

### ACT-LGC-SCR-081-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-081 / EL-LGC-SCR-081-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup/cash
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-081-02 — [02] Выбрать

- **Screen / element:** LGC-SCR-081 / EL-LGC-SCR-081-02
- **Control:** button
- **User intent:** Выбрать
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/topup/cash
- **Current code handler:** confirmCashDesk + onBack
- **Current mock effect:** Fixed 8000 pending history
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyTopup/store.ts`, `src/features/legacyTopup/mockData.ts`
- **Owner dependency:** `Q-TOPUP-008`, `Q-TOPUP-009`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

## LGC-SCR-041 — Вывод — выбор способа

### ACT-LGC-SCR-041-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-041 / EL-LGC-SCR-041-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/home
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/MethodSelectScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-041-02 — [02] Карта

- **Screen / element:** LGC-SCR-041 / EL-LGC-SCR-041-02
- **Control:** row
- **User intent:** Карта
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/card
- **Current code handler:** setMethod('card')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-041-03 — [03] Баланс телефона

- **Screen / element:** LGC-SCR-041 / EL-LGC-SCR-041-03
- **Control:** row
- **User intent:** Баланс телефона
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/phone
- **Current code handler:** setMethod('phone')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-041-04 — [04] Наличными

- **Screen / element:** LGC-SCR-041 / EL-LGC-SCR-041-04
- **Control:** row
- **User intent:** Наличными
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/cash
- **Current code handler:** setMethod('cash')
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-001`

### ACT-LGC-SCR-041-05 — [05] Другое

- **Screen / element:** LGC-SCR-041 / EL-LGC-SCR-041-05
- **Control:** row
- **User intent:** Другое
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** setMethod('other') + acknowledgeOther
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## WD-002 — Вывод на карту — форма

### ACT-WD-002-01 — [01] Назад / закрыть

- **Screen / element:** WD-002 / EL-WD-002-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-WD-002-02 — [02] Cashhello — на главную

- **Screen / element:** WD-002 / EL-WD-002-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-WD-002-03 — [03] Профиль

- **Screen / element:** WD-002 / EL-WD-002-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-WD-002-04 — [04] Счёт списания

- **Screen / element:** WD-002 / EL-WD-002-04
- **Control:** account_card
- **User intent:** Счёт списания
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-WD-002 account picker
- **Current code handler:** setAccountOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-013`

### ACT-WD-002-05 — [05] Номер карты

- **Screen / element:** WD-002 / EL-WD-002-05
- **Control:** input
- **User intent:** Номер карты
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.cardDigits
- **Current code handler:** setCardDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-WD-002-06 — [06] Сканировать карту

- **Screen / element:** WD-002 / EL-WD-002-06
- **Control:** button; icon meaning: Camera
- **User intent:** Сканировать карту
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-091 overlay
- **Current code handler:** setScanOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-WD-002-07 — [07] Сохранённая карта

- **Screen / element:** WD-002 / EL-WD-002-07
- **Control:** button
- **User intent:** Сохранённая карта
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-WD-001 sheet
- **Current code handler:** setSavedOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-WD-002-08 — [08] Сумма

- **Screen / element:** WD-002 / EL-WD-002-08
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-002`, `Q-KYC-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

### ACT-WD-002-09 — [09] Перевести

- **Screen / element:** WD-002 / EL-WD-002-09
- **Control:** button
- **User intent:** Перевести
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/loading?ready=1
- **Current code handler:** setTimeout(3000) → confirmAndSettle('success') → router.replace
- **Current mock effect:** Debits local balance, appends successful history, fee 30
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-091 — Вывод на карту — сканер

### ACT-LGC-SCR-091-01 — [01] Отмена

- **Screen / element:** LGC-SCR-091 / EL-LGC-SCR-091-01
- **Control:** button
- **User intent:** Отмена
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close scanner
- **Current code handler:** setScanOpen(false)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-091-02 — [02] Сканировать

- **Screen / element:** LGC-SCR-091 / EL-LGC-SCR-091-02
- **Control:** button; icon meaning: Camera
- **User intent:** Сканировать
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Fill synthetic card
- **Current code handler:** fillSyntheticCard
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-092 — Вывод на карту — карта выбрана

### ACT-LGC-SCR-092-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-02 — [02] Cashhello — на главную

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-03 — [03] Профиль

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/CardWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-04 — [04] Счёт списания

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-04
- **Control:** account_card
- **User intent:** Счёт списания
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-WD-002 account picker
- **Current code handler:** setAccountOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-05 — [05] Номер карты

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-05
- **Control:** input
- **User intent:** Номер карты
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.cardDigits
- **Current code handler:** setCardDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-06 — [06] Сканировать карту

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-06
- **Control:** button; icon meaning: Camera
- **User intent:** Сканировать карту
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-091 overlay
- **Current code handler:** setScanOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-07 — [07] Сохранённая карта

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-07
- **Control:** button
- **User intent:** Сохранённая карта
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-WD-001 sheet
- **Current code handler:** setSavedOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-08 — [08] Сумма

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-08
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-092-09 — [09] Перевести

- **Screen / element:** LGC-SCR-092 / EL-LGC-SCR-092-09
- **Control:** button
- **User intent:** Перевести
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/loading?ready=1
- **Current code handler:** setTimeout(3000) → confirmAndSettle('success') → router.replace
- **Current mock effect:** Debits local balance, appends successful history, fee 30
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## CAS-WD-001 — Вывод на карту — сохраненные карты

### ACT-CAS-WD-001-01 — [01] Закрыть / фон

- **Screen / element:** CAS-WD-001 / EL-CAS-WD-001-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-001-02 — [02] Карта •••• 8812

- **Screen / element:** CAS-WD-001 / EL-CAS-WD-001-02
- **Control:** row
- **User intent:** Карта •••• 8812
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.cardDigits
- **Current code handler:** setCardDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## CAS-WD-002 — Вывод — выбор счета списания

### ACT-CAS-WD-002-01 — [01] Закрыть / фон

- **Screen / element:** CAS-WD-002 / EL-CAS-WD-002-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-002-02 — [02] Счет ₸

- **Screen / element:** CAS-WD-002 / EL-CAS-WD-002-02
- **Control:** row
- **User intent:** Счет ₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.fromId
- **Current code handler:** setFromId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-002-03 — [03] Счет ₽

- **Screen / element:** CAS-WD-002 / EL-CAS-WD-002-03
- **Control:** row
- **User intent:** Счет ₽
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.fromId
- **Current code handler:** setFromId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-002-04 — [04] Счет $

- **Screen / element:** CAS-WD-002 / EL-CAS-WD-002-04
- **Control:** row
- **User intent:** Счет $
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.fromId
- **Current code handler:** setFromId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-002-05 — [05] Бонусный счет

- **Screen / element:** CAS-WD-002 / EL-CAS-WD-002-05
- **Control:** row
- **User intent:** Бонусный счет
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.fromId
- **Current code handler:** setFromId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## WD-004 — Вывод на баланс телефона

### ACT-WD-004-01 — [01] Назад / закрыть

- **Screen / element:** WD-004 / EL-WD-004-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-WD-004-02 — [02] Cashhello — на главную

- **Screen / element:** WD-004 / EL-WD-004-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-WD-004-03 — [03] Профиль

- **Screen / element:** WD-004 / EL-WD-004-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-WD-004-04 — [04] Счёт списания

- **Screen / element:** WD-004 / EL-WD-004-04
- **Control:** account_card
- **User intent:** Счёт списания
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Account picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-014`

### ACT-WD-004-05 — [05] Номер телефона

- **Screen / element:** WD-004 / EL-WD-004-05
- **Control:** input
- **User intent:** Номер телефона
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.phoneDigits
- **Current code handler:** setPhoneDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-WD-004-06 — [06] Сохранённые телефоны

- **Screen / element:** WD-004 / EL-WD-004-06
- **Control:** button
- **User intent:** Сохранённые телефоны
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-WD-003 sheet
- **Current code handler:** setSavedOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-WD-004-07 — [07] Сумма

- **Screen / element:** WD-004 / EL-WD-004-07
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-WD-004-08 — [08] Перевести

- **Screen / element:** WD-004 / EL-WD-004-08
- **Control:** button
- **User intent:** Перевести
- **Precondition:** phoneFilled and amount > 0
- **Current destination:** ROUTE → /legacy/withdraw/loading?ready=1
- **Current code handler:** setTimeout(3000) → confirmAndSettle('success')
- **Current mock effect:** Local debit/history after 3 seconds
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## CAS-WD-003 — Вывод на телефон — сохраненные номера

### ACT-CAS-WD-003-01 — [01] Закрыть / фон

- **Screen / element:** CAS-WD-003 / EL-CAS-WD-003-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-003-02 — [02] +7 (705) 234 68 87

- **Screen / element:** CAS-WD-003 / EL-CAS-WD-003-02
- **Control:** row
- **User intent:** +7 (705) 234 68 87
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.phoneDigits
- **Current code handler:** setPhoneDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## CAS-WD-005 — Перевод пользователю Cashhello

### ACT-CAS-WD-005-01 — [01] Назад / закрыть

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-CAS-WD-005-02 — [02] Cashhello — на главную

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-CAS-WD-005-03 — [03] Профиль

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/PhoneFormWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-CAS-WD-005-04 — [04] Счёт списания

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-04
- **Control:** account_card
- **User intent:** Счёт списания
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Account picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-P2P-001`, `Q-P2P-002`

### ACT-CAS-WD-005-05 — [05] Номер телефона

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-05
- **Control:** input
- **User intent:** Номер телефона
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.phoneDigits
- **Current code handler:** setPhoneDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-005-06 — [06] Сохранённые телефоны

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-06
- **Control:** button
- **User intent:** Сохранённые телефоны
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-WD-003 sheet
- **Current code handler:** setSavedOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-WD-005-07 — [07] Сумма

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-07
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-P2P-003`, `Q-P2P-004`, `Q-P2P-005`, `Q-P2P-006`, `Q-P2P-007`, `Q-P2P-008`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

### ACT-CAS-WD-005-08 — [08] Перевести

- **Screen / element:** CAS-WD-005 / EL-CAS-WD-005-08
- **Control:** button
- **User intent:** Перевести
- **Precondition:** Never enabled once phone input is non-empty
- **Current destination:** ROUTE → /legacy/withdraw/loading?ready=1
- **Current code handler:** Blocked by userNotFound condition
- **Current mock effect:** No settlement reachable
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-105 — Вывод наличными — выбор кассы

### ACT-LGC-SCR-105-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-105 / EL-LGC-SCR-105-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-105-02 — [02] Поиск по адресу

- **Screen / element:** LGC-SCR-105 / EL-LGC-SCR-105-02
- **Control:** search_row
- **User intent:** Поиск по адресу
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/cash-map
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-105-03 — [03] Выбрать

- **Screen / element:** LGC-SCR-105 / EL-LGC-SCR-105-03
- **Control:** button
- **User intent:** Выбрать
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Disabled
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-106 — Вывод наличными — карта касс

### ACT-LGC-SCR-106-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-106 / EL-LGC-SCR-106-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw/cash
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-106-02 — [02] Микрорайон Таугуль 2

- **Screen / element:** LGC-SCR-106 / EL-LGC-SCR-106-02
- **Control:** row
- **User intent:** Микрорайон Таугуль 2
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-106-03 — [03] 4-й микрорайон

- **Screen / element:** LGC-SCR-106 / EL-LGC-SCR-106-03
- **Control:** row
- **User intent:** 4-й микрорайон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-106-04 — [04] ТРЦ MOSKVA Metropolitan

- **Screen / element:** LGC-SCR-106 / EL-LGC-SCR-106-04
- **Control:** row
- **User intent:** ТРЦ MOSKVA Metropolitan
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-106-05 — [05] 8-й микрорайон, 8

- **Screen / element:** LGC-SCR-106 / EL-LGC-SCR-106-05
- **Control:** row
- **User intent:** 8-й микрорайон, 8
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-106-06 — [06] ТЦ Тигрохауд

- **Screen / element:** LGC-SCR-106 / EL-LGC-SCR-106-06
- **Control:** row
- **User intent:** ТЦ Тигрохауд
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → selectedDeskId
- **Current code handler:** selectDesk / setDeskId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-108 — Вывод наличными — касса выбрана

### ACT-LGC-SCR-108-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-108 / EL-LGC-SCR-108-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw/cash
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-108-02 — [02] Выбрать

- **Screen / element:** LGC-SCR-108 / EL-LGC-SCR-108-02
- **Control:** button
- **User intent:** Выбрать
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/amount
- **Current code handler:** setMethod('cash') + router.push
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-010`

## LGC-SCR-093 — Вывод — ввод суммы

### ACT-LGC-SCR-093-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-093 / EL-LGC-SCR-093-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw/cash-map
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-093-02 — [02] Касса / Откуда

- **Screen / element:** LGC-SCR-093 / EL-LGC-SCR-093-02
- **Control:** account_card
- **User intent:** Касса / Откуда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Desk/map selection
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-093-03 — [03] Счет / Куда

- **Screen / element:** LGC-SCR-093 / EL-LGC-SCR-093-03
- **Control:** account_card
- **User intent:** Счет / Куда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Destination account picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-093-04 — [04] Сумма

- **Screen / element:** LGC-SCR-093 / EL-LGC-SCR-093-04
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-093-05 — [05] Все

- **Screen / element:** LGC-SCR-093 / EL-LGC-SCR-093-05
- **Control:** button
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → amountDigits=1970
- **Current code handler:** fillAll
- **Current mock effect:** Uses MOCK_MAX_KZT, not wallet balance
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-093-06 — [06] Вывести

- **Screen / element:** LGC-SCR-093 / EL-LGC-SCR-093-06
- **Control:** button
- **User intent:** Вывести
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-097 modal
- **Current code handler:** setConfirmOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-095 — Вывод — сумма выше mock-лимита

### ACT-LGC-SCR-095-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-095 / EL-LGC-SCR-095-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw/cash-map
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-095-02 — [02] Касса / Откуда

- **Screen / element:** LGC-SCR-095 / EL-LGC-SCR-095-02
- **Control:** account_card
- **User intent:** Касса / Откуда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Desk/map selection
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-095-03 — [03] Счет / Куда

- **Screen / element:** LGC-SCR-095 / EL-LGC-SCR-095-03
- **Control:** account_card
- **User intent:** Счет / Куда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Destination account picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-095-04 — [04] Сумма

- **Screen / element:** LGC-SCR-095 / EL-LGC-SCR-095-04
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-095-05 — [05] Все

- **Screen / element:** LGC-SCR-095 / EL-LGC-SCR-095-05
- **Control:** button
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → amountDigits=1970
- **Current code handler:** fillAll
- **Current mock effect:** Uses MOCK_MAX_KZT, not wallet balance
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-095-06 — [06] Вывести

- **Screen / element:** LGC-SCR-095 / EL-LGC-SCR-095-06
- **Control:** button
- **User intent:** Вывести
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-097 modal
- **Current code handler:** setConfirmOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-096 — Вывод — сумма и комиссия

### ACT-LGC-SCR-096-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-096 / EL-LGC-SCR-096-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw/cash-map
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-096-02 — [02] Касса / Откуда

- **Screen / element:** LGC-SCR-096 / EL-LGC-SCR-096-02
- **Control:** account_card
- **User intent:** Касса / Откуда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Desk/map selection
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-096-03 — [03] Счет / Куда

- **Screen / element:** LGC-SCR-096 / EL-LGC-SCR-096-03
- **Control:** account_card
- **User intent:** Счет / Куда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Destination account picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-096-04 — [04] Сумма

- **Screen / element:** LGC-SCR-096 / EL-LGC-SCR-096-04
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-096-05 — [05] Все

- **Screen / element:** LGC-SCR-096 / EL-LGC-SCR-096-05
- **Control:** button
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → amountDigits=1970
- **Current code handler:** fillAll
- **Current mock effect:** Uses MOCK_MAX_KZT, not wallet balance
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-096-06 — [06] Вывести

- **Screen / element:** LGC-SCR-096 / EL-LGC-SCR-096-06
- **Control:** button
- **User intent:** Вывести
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-097 modal
- **Current code handler:** setConfirmOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-003`

## LGC-SCR-109 — Вывод наличными — сумма

### ACT-LGC-SCR-109-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-109 / EL-LGC-SCR-109-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/withdraw/cash-map
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/AmountWithdrawScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-109-02 — [02] Касса / Откуда

- **Screen / element:** LGC-SCR-109 / EL-LGC-SCR-109-02
- **Control:** account_card
- **User intent:** Касса / Откуда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Desk/map selection
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-109-03 — [03] Счет / Куда

- **Screen / element:** LGC-SCR-109 / EL-LGC-SCR-109-03
- **Control:** account_card
- **User intent:** Счет / Куда
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Destination account picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-109-04 — [04] Сумма

- **Screen / element:** LGC-SCR-109 / EL-LGC-SCR-109-04
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → withdraw.amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-109-05 — [05] Все

- **Screen / element:** LGC-SCR-109 / EL-LGC-SCR-109-05
- **Control:** button
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → amountDigits=1970
- **Current code handler:** fillAll
- **Current mock effect:** Uses MOCK_MAX_KZT, not wallet balance
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-109-06 — [06] Вывести

- **Screen / element:** LGC-SCR-109 / EL-LGC-SCR-109-06
- **Control:** button
- **User intent:** Вывести
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → LGC-SCR-097 modal
- **Current code handler:** setConfirmOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-097 — Вывод — подтверждение

### ACT-LGC-SCR-097-01 — [01] Подтвердить

- **Screen / element:** LGC-SCR-097 / EL-LGC-SCR-097-01
- **Control:** button
- **User intent:** Подтвердить
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/withdraw/loading
- **Current code handler:** router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-004`

### ACT-LGC-SCR-097-02 — [02] Закрыть / фон

- **Screen / element:** LGC-SCR-097 / EL-LGC-SCR-097-02
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close confirmation
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-099 — Вывод — ошибка

### ACT-LGC-SCR-099-01 — [01] Готово

- **Screen / element:** LGC-SCR-099 / EL-LGC-SCR-099-01
- **Control:** button
- **User intent:** Готово
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-005`, `Q-WD-006`

### ACT-LGC-SCR-099-02 — [02] Поделиться

- **Screen / element:** LGC-SCR-099 / EL-LGC-SCR-099-02
- **Control:** button
- **User intent:** Поделиться
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** None recorded

## WD-003 — Вывод — квитанция / результат

### ACT-WD-003-01 — [01] Готово / закрыть

- **Screen / element:** WD-003 / EL-WD-003-01
- **Control:** button
- **User intent:** Готово / закрыть
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home or /legacy/history
- **Current code handler:** onBack / navigateHome
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-008`, `Q-WD-009`, `Q-WD-011`

### ACT-WD-003-02 — [02] Поделиться

- **Screen / element:** WD-003 / EL-WD-003-02
- **Control:** button
- **User intent:** Поделиться
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert “Чек скопирован (mock)”
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyWithdraw/store.ts`, `src/features/legacyWithdraw/mockData.ts`
- **Owner dependency:** `Q-WD-015`

## CAS-HIST-005 — История — квитанция вывода на телефон

### ACT-CAS-HIST-005-01 — [01] Назад / закрыть

- **Screen / element:** CAS-HIST-005 / EL-CAS-HIST-005-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/history
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

## PAY-001 — Оплата — каталог услуг

### ACT-PAY-001-01 — [01] Cashhello — на главную

- **Screen / element:** PAY-001 / EL-PAY-001-01
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-001-02 — [02] Профиль

- **Screen / element:** PAY-001 / EL-PAY-001-02
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-001-03 — [03] Что хотите пополнить?

- **Screen / element:** PAY-001 / EL-PAY-001-03
- **Control:** input
- **User intent:** Что хотите пополнить?
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → payment.query
- **Current code handler:** setQuery
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** `Q-PAY-001`

### ACT-PAY-001-04 — [04] Категория

- **Screen / element:** PAY-001 / EL-PAY-001-04
- **Control:** button
- **User intent:** Категория
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-PAY-001 sheet
- **Current code handler:** setCategoryOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-05 — [05] Все

- **Screen / element:** PAY-001 / EL-PAY-001-05
- **Control:** tab
- **User intent:** Все
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → tab=all
- **Current code handler:** setTab
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-06 — [06] Избранные

- **Screen / element:** PAY-001 / EL-PAY-001-06
- **Control:** tab
- **User intent:** Избранные
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → tab=favorites
- **Current code handler:** setTab
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-07 — [07] Букмекеры

- **Screen / element:** PAY-001 / EL-PAY-001-07
- **Control:** section_header
- **User intent:** Букмекеры
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Toggle catalog section
- **Current code handler:** toggleSection
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-08 — [08] Цифровые товары

- **Screen / element:** PAY-001 / EL-PAY-001-08
- **Control:** section_header
- **User intent:** Цифровые товары
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Toggle catalog section
- **Current code handler:** toggleSection
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-09 — [09] МФО

- **Screen / element:** PAY-001 / EL-PAY-001-09
- **Control:** section_header
- **User intent:** МФО
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Toggle catalog section
- **Current code handler:** toggleSection
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-10 — [10] Ubet

- **Screen / element:** PAY-001 / EL-PAY-001-10
- **Control:** row
- **User intent:** Ubet
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/ubet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** `Q-PAY-004`

### ACT-PAY-001-11 — [11] Oinabet

- **Screen / element:** PAY-001 / EL-PAY-001-11
- **Control:** row
- **User intent:** Oinabet
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/oinabet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-12 — [12] Tennisi

- **Screen / element:** PAY-001 / EL-PAY-001-12
- **Control:** row
- **User intent:** Tennisi
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/tennisi
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-13 — [13] Робокэш / Займер

- **Screen / element:** PAY-001 / EL-PAY-001-13
- **Control:** row
- **User intent:** Робокэш / Займер
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/zaimer
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-14 — [14] CreditBar

- **Screen / element:** PAY-001 / EL-PAY-001-14
- **Control:** row
- **User intent:** CreditBar
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/creditbar
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-15 — [15] i-credit.kz

- **Screen / element:** PAY-001 / EL-PAY-001-15
- **Control:** row
- **User intent:** i-credit.kz
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/icredit
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-16 — [16] Kengo

- **Screen / element:** PAY-001 / EL-PAY-001-16
- **Control:** row
- **User intent:** Kengo
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/kengo
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-17 — [17] Sat Credit

- **Screen / element:** PAY-001 / EL-PAY-001-17
- **Control:** row
- **User intent:** Sat Credit
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment/satcredit
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-PAY-001-18 — [18] Недоступные сервисы (Fonbet, 1xbet, Parimatch, Steam)

- **Screen / element:** PAY-001 / EL-PAY-001-18
- **Control:** disabled_row
- **User intent:** Недоступные сервисы (Fonbet, 1xbet, Parimatch, Steam)
- **Precondition:** available=false
- **Current destination:** NO_OP_STUB → Disabled
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** `Q-PAY-006`

### ACT-PAY-001-19 — [19] Главная

- **Screen / element:** PAY-001 / EL-PAY-001-19
- **Control:** tab
- **User intent:** Главная
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-001-20 — [20] Оплата

- **Screen / element:** PAY-001 / EL-PAY-001-20
- **Control:** tab
- **User intent:** Оплата
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/payment
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-001-21 — [21] QR

- **Screen / element:** PAY-001 / EL-PAY-001-21
- **Control:** tab; icon meaning: QR
- **User intent:** QR
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/qr
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-001-22 — [22] История

- **Screen / element:** PAY-001 / EL-PAY-001-22
- **Control:** tab
- **User intent:** История
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-001-23 — [23] Профиль

- **Screen / element:** PAY-001 / EL-PAY-001-23
- **Control:** tab; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`
- **Owner dependency:** None recorded

## CAS-PAY-001 — Оплата — выбор категории

### ACT-CAS-PAY-001-01 — [01] Закрыть / фон

- **Screen / element:** CAS-PAY-001 / EL-CAS-PAY-001-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-001-02 — [02] Все категории

- **Screen / element:** CAS-PAY-001 / EL-CAS-PAY-001-02
- **Control:** row
- **User intent:** Все категории
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → categoryId=Все категории
- **Current code handler:** onSelect
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-001-03 — [03] Букмекеры

- **Screen / element:** CAS-PAY-001 / EL-CAS-PAY-001-03
- **Control:** row
- **User intent:** Букмекеры
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → categoryId=Букмекеры
- **Current code handler:** onSelect
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-001-04 — [04] Цифровые товары

- **Screen / element:** CAS-PAY-001 / EL-CAS-PAY-001-04
- **Control:** row
- **User intent:** Цифровые товары
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → categoryId=Цифровые товары
- **Current code handler:** onSelect
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-001-05 — [05] МФО

- **Screen / element:** CAS-PAY-001 / EL-CAS-PAY-001-05
- **Control:** row
- **User intent:** МФО
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → categoryId=МФО
- **Current code handler:** onSelect
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentScreen.tsx`, `src/features/legacyPayment/store.ts`, `src/features/legacyPayment/mockData.ts`
- **Owner dependency:** None recorded

## PAY-002 — Оплата — услуга

### ACT-PAY-002-01 — [01] Назад / закрыть

- **Screen / element:** PAY-002 / EL-PAY-002-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/payment
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

### ACT-PAY-002-02 — [02] Cashhello — на главную

- **Screen / element:** PAY-002 / EL-PAY-002-02
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-002-03 — [03] Профиль

- **Screen / element:** PAY-002 / EL-PAY-002-03
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`
- **Owner dependency:** `Q-PAY-011`

### ACT-PAY-002-04 — [04] Избранное

- **Screen / element:** PAY-002 / EL-PAY-002-04
- **Control:** icon; icon meaning: Favorite
- **User intent:** Избранное
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → payment.favorites
- **Current code handler:** toggleFavorite
- **Current mock effect:** None
- **Guest/auth behavior:** GUEST_GATE → auth
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** `Q-PAY-002`, `Q-PAY-009`

### ACT-PAY-002-05 — [05] Номер телефона

- **Screen / element:** PAY-002 / EL-PAY-002-05
- **Control:** input
- **User intent:** Номер телефона
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → phoneDigits
- **Current code handler:** setPhoneDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** `Q-PAY-005`

### ACT-PAY-002-06 — [06] Сумма

- **Screen / element:** PAY-002 / EL-PAY-002-06
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

### ACT-PAY-002-07 — [07] Оплатить со счёта

- **Screen / element:** PAY-002 / EL-PAY-002-07
- **Control:** button
- **User intent:** Оплатить со счёта
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-PAY-002 sheet
- **Current code handler:** setAccountPickerOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** GUEST_GATE → auth
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** `Q-PAY-007`, `Q-PAY-008`, `Q-PAY-010`, `Q-PAY-012`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

### ACT-PAY-002-08 — [08] Оплатить

- **Screen / element:** PAY-002 / EL-PAY-002-08
- **Control:** button
- **User intent:** Оплатить
- **Precondition:** valid phone + amount > 0; guest redirects to auth
- **Current destination:** LOCAL_STATE → 900 ms loading → success Alert
- **Current code handler:** onPay
- **Current mock effect:** No debit, history, receipt or transaction ID
- **Guest/auth behavior:** GUEST_GATE → /legacy/auth?qaStep=iin
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

### ACT-PAY-002-09 — [09] Главная

- **Screen / element:** PAY-002 / EL-PAY-002-09
- **Control:** tab
- **User intent:** Главная
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-002-10 — [10] Оплата

- **Screen / element:** PAY-002 / EL-PAY-002-10
- **Control:** tab
- **User intent:** Оплата
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/payment
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-002-11 — [11] QR

- **Screen / element:** PAY-002 / EL-PAY-002-11
- **Control:** tab; icon meaning: QR
- **User intent:** QR
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/qr
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-002-12 — [12] История

- **Screen / element:** PAY-002 / EL-PAY-002-12
- **Control:** tab
- **User intent:** История
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-002-13 — [13] Профиль

- **Screen / element:** PAY-002 / EL-PAY-002-13
- **Control:** tab; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Tab bar visible; active=payment
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-002-14 — [14] Оплата — вернуться в каталог (not found)

- **Screen / element:** PAY-002 / EL-PAY-002-14
- **Control:** button
- **User intent:** Оплата — вернуться в каталог (not found)
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/payment
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

## CAS-PAY-002 — Оплата — выбор счета

### ACT-CAS-PAY-002-01 — [01] Закрыть / фон

- **Screen / element:** CAS-PAY-002 / EL-CAS-PAY-002-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close picker
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-002-02 — [02] Счет ₸

- **Screen / element:** CAS-PAY-002 / EL-CAS-PAY-002-02
- **Control:** row
- **User intent:** Счет ₸
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → payment.sourceId
- **Current code handler:** setSourceId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-002-03 — [03] Счет ₽

- **Screen / element:** CAS-PAY-002 / EL-CAS-PAY-002-03
- **Control:** row
- **User intent:** Счет ₽
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → payment.sourceId
- **Current code handler:** setSourceId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-002-04 — [04] Счет $

- **Screen / element:** CAS-PAY-002 / EL-CAS-PAY-002-04
- **Control:** row
- **User intent:** Счет $
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → payment.sourceId
- **Current code handler:** setSourceId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** None recorded

### ACT-CAS-PAY-002-05 — [05] Бонусный счет

- **Screen / element:** CAS-PAY-002 / EL-CAS-PAY-002-05
- **Control:** row
- **User intent:** Бонусный счет
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → payment.sourceId
- **Current code handler:** setSourceId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyPayment/PaymentServiceScreen.tsx`, `src/features/legacyPayment/store.ts`
- **Owner dependency:** `Q-PAY-003`

## LGC-SCR-111 — История операций

### ACT-LGC-SCR-111-01 — [01] Cashhello — на главную

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-01
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/HistoryScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-111-02 — [02] Профиль

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-02
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/HistoryScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-111-03 — [03] Выбрать даты

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-03
- **Control:** button; icon meaning: Calendar
- **User intent:** Выбрать даты
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-HIST-001 sheet
- **Current code handler:** setCalendarOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** `Q-TRF-007`, `Q-HIST-001`, `Q-HIST-008`, `Q-HIST-010`

### ACT-LGC-SCR-111-04 — [04] Списание — операция

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-04
- **Control:** row
- **User intent:** Списание — операция
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → CAS-HIST-002 action sheet
- **Current code handler:** setActionOp
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-111-05 — [05] Главная

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-05
- **Control:** tab
- **User intent:** Главная
- **Precondition:** Tab bar visible; active=history
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/HistoryScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-111-06 — [06] Оплата

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-06
- **Control:** tab
- **User intent:** Оплата
- **Precondition:** Tab bar visible; active=history
- **Current destination:** ROUTE → /legacy/payment
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/HistoryScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-111-07 — [07] QR

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-07
- **Control:** tab; icon meaning: QR
- **User intent:** QR
- **Precondition:** Tab bar visible; active=history
- **Current destination:** ROUTE → /legacy/qr
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/HistoryScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-111-08 — [08] История

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-08
- **Control:** tab
- **User intent:** История
- **Precondition:** Tab bar visible; active=history
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/HistoryScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-111-09 — [09] Профиль

- **Screen / element:** LGC-SCR-111 / EL-LGC-SCR-111-09
- **Control:** tab; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Tab bar visible; active=history
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/HistoryScreen.tsx`
- **Owner dependency:** None recorded

## CAS-HIST-001 — История — выбор дат

### ACT-CAS-HIST-001-01 — [01] Закрыть / фон

- **Screen / element:** CAS-HIST-001 / EL-CAS-HIST-001-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close calendar
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-HIST-001-02 — [02] Предыдущий месяц

- **Screen / element:** CAS-HIST-001 / EL-CAS-HIST-001-02
- **Control:** button; icon meaning: Back
- **User intent:** Предыдущий месяц
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Calendar month
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-HIST-001-03 — [03] Следующий месяц

- **Screen / element:** CAS-HIST-001 / EL-CAS-HIST-001-03
- **Control:** button; icon meaning: Forward
- **User intent:** Следующий месяц
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Calendar month
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-HIST-001-04 — [04] День календаря

- **Screen / element:** CAS-HIST-001 / EL-CAS-HIST-001-04
- **Control:** calendar_day
- **User intent:** День календаря
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Draft date range
- **Current code handler:** selectDay
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-HIST-001-05 — [05] Сбросить

- **Screen / element:** CAS-HIST-001 / EL-CAS-HIST-001-05
- **Control:** button
- **User intent:** Сбросить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Clear date range
- **Current code handler:** onApply(null,null)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-HIST-001-06 — [06] Применить

- **Screen / element:** CAS-HIST-001 / EL-CAS-HIST-001-06
- **Control:** button
- **User intent:** Применить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Apply date range
- **Current code handler:** setDateRange
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

## CAS-HIST-002 — История — действия с операцией

### ACT-CAS-HIST-002-01 — [01] Закрыть / фон

- **Screen / element:** CAS-HIST-002 / EL-CAS-HIST-002-01
- **Control:** button
- **User intent:** Закрыть / фон
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Close action sheet
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-CAS-HIST-002-02 — [02] Повторить операцию

- **Screen / element:** CAS-HIST-002 / EL-CAS-HIST-002-02
- **Control:** button
- **User intent:** Повторить операцию
- **Precondition:** Screen visible
- **Current destination:** GUEST_GATE → operation.repeatHref
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** `Q-HIST-004`

### ACT-CAS-HIST-002-03 — [03] Поделиться чеком

- **Screen / element:** CAS-HIST-002 / EL-CAS-HIST-002-03
- **Control:** button
- **User intent:** Поделиться чеком
- **Precondition:** Screen visible
- **Current destination:** GUEST_GATE → /legacy/history/[id]
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-113 — История — фильтр

### ACT-LGC-SCR-113-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-113 / EL-LGC-SCR-113-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/history
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/FilterScreen.tsx`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-113-02 — [02] Период

- **Screen / element:** LGC-SCR-113 / EL-LGC-SCR-113-02
- **Control:** chip_group
- **User intent:** Период
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → draftPeriod
- **Current code handler:** setDraftPeriod
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-113-03 — [03] Тип операции

- **Screen / element:** LGC-SCR-113 / EL-LGC-SCR-113-03
- **Control:** chip_group
- **User intent:** Тип операции
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → draftOpType
- **Current code handler:** setDraftOpType
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-113-04 — [04] Счет

- **Screen / element:** LGC-SCR-113 / EL-LGC-SCR-113-04
- **Control:** chip_group
- **User intent:** Счет
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → draftAccountId
- **Current code handler:** setDraftAccountId
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-113-05 — [05] Сбросить фильтр

- **Screen / element:** LGC-SCR-113 / EL-LGC-SCR-113-05
- **Control:** button
- **User intent:** Сбросить фильтр
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Reset filters
- **Current code handler:** resetFilter
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-113-06 — [06] Применить

- **Screen / element:** LGC-SCR-113 / EL-LGC-SCR-113-06
- **Control:** button
- **User intent:** Применить
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/history
- **Current code handler:** applyFilter + onBack
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** `Q-HIST-009`

## LGC-SCR-115 — История — детали операции

### ACT-LGC-SCR-115-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-115 / EL-LGC-SCR-115-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/history
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-115-02 — [02] Поделиться

- **Screen / element:** LGC-SCR-115 / EL-LGC-SCR-115-02
- **Control:** icon; icon meaning: Share
- **User intent:** Поделиться
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-115-03 — [03] Отменить операцию

- **Screen / element:** LGC-SCR-115 / EL-LGC-SCR-115-03
- **Control:** button
- **User intent:** Отменить операцию
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Cancel confirmation
- **Current code handler:** setConfirmOpen(true)
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** `Q-TOPUP-009`, `Q-WD-007`, `Q-WD-012`, `Q-HIST-002`, `Q-HIST-003`

### ACT-LGC-SCR-115-04 — [04] Да — отменить

- **Screen / element:** LGC-SCR-115 / EL-LGC-SCR-115-04
- **Control:** button
- **User intent:** Да — отменить
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → operation.status=Отклонено
- **Current code handler:** cancelOperation
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

### ACT-LGC-SCR-115-05 — [05] Чек

- **Screen / element:** LGC-SCR-115 / EL-LGC-SCR-115-05
- **Control:** button
- **User intent:** Чек
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/history/[id]/receipt
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** `Q-HIST-005`

### ACT-LGC-SCR-115-06 — [06] Помощь

- **Screen / element:** LGC-SCR-115 / EL-LGC-SCR-115-06
- **Control:** button
- **User intent:** Помощь
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

## LGC-SCR-120 — История — чек

### ACT-LGC-SCR-120-01 — [01] Назад / закрыть

- **Screen / element:** LGC-SCR-120 / EL-LGC-SCR-120-01
- **Control:** icon; icon meaning: Back or close
- **User intent:** Назад / закрыть
- **Precondition:** Screen visible
- **Current destination:** BACK → /legacy/history/[id]
- **Current code handler:** useLegacyBack / local close handler
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/ReceiptScreen.tsx`
- **Owner dependency:** `Q-TOPUP-010`, `Q-HIST-006`

### ACT-LGC-SCR-120-02 — [02] Поделиться

- **Screen / element:** LGC-SCR-120 / EL-LGC-SCR-120-02
- **Control:** button
- **User intent:** Поделиться
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** `Q-HIST-007`

### ACT-LGC-SCR-120-03 — [03] Скачать

- **Screen / element:** LGC-SCR-120 / EL-LGC-SCR-120-03
- **Control:** button
- **User intent:** Скачать
- **Precondition:** Screen visible
- **Current destination:** NO_OP_STUB → Alert
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyHistory/store.ts`, `src/features/legacyHistory/mockData.ts`
- **Owner dependency:** None recorded

## QR-001 — Получить по QR

### ACT-QR-001-01 — [01] Cashhello — на главную

- **Screen / element:** QR-001 / EL-QR-001-01
- **Control:** logo; icon meaning: Brand / Home
- **User intent:** Cashhello — на главную
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** navigateHome / router.replace
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-QR-001-02 — [02] Профиль

- **Screen / element:** QR-001 / EL-QR-001-02
- **Control:** icon; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Screen visible
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** See source component
- **Current mock effect:** None
- **Guest/auth behavior:** Opens profile
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-QR-001-03 — [03] Сумма

- **Screen / element:** QR-001 / EL-QR-001-03
- **Control:** input
- **User intent:** Сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → amountDigits
- **Current code handler:** setAmountDigits
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** `Q-QR-002`

### ACT-QR-001-04 — [04] Сгенерировать QR

- **Screen / element:** QR-001 / EL-QR-001-04
- **Control:** button
- **User intent:** Сгенерировать QR
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → generatedAmount
- **Current code handler:** onGenerate
- **Current mock effect:** Client-only URI payload
- **Guest/auth behavior:** GUEST_GATE → auth
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** `Q-QR-001`, `Q-QR-003`, `Q-QR-004`, `Q-QR-005`, `Q-QR-006`, `Q-QR-007`, `Q-QR-008`, `Q-QR-009`, `Q-QR-010`, `Q-ERR-001`, `Q-ERR-002`, `Q-ERR-003`, `Q-ERR-004`, `Q-ERR-005`, `Q-ERR-006`, `Q-ERR-007`, `Q-ERR-008`

### ACT-QR-001-05 — [05] Новая сумма

- **Screen / element:** QR-001 / EL-QR-001-05
- **Control:** button
- **User intent:** Новая сумма
- **Precondition:** Screen visible
- **Current destination:** LOCAL_STATE → Clear generatedAmount
- **Current code handler:** onNewAmount
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-QR-001-06 — [06] Главная

- **Screen / element:** QR-001 / EL-QR-001-06
- **Control:** tab
- **User intent:** Главная
- **Precondition:** Tab bar visible; active=qr
- **Current destination:** ROUTE → /legacy/home
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-QR-001-07 — [07] Оплата

- **Screen / element:** QR-001 / EL-QR-001-07
- **Control:** tab
- **User intent:** Оплата
- **Precondition:** Tab bar visible; active=qr
- **Current destination:** ROUTE → /legacy/payment
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-QR-001-08 — [08] QR

- **Screen / element:** QR-001 / EL-QR-001-08
- **Control:** tab; icon meaning: QR
- **User intent:** QR
- **Precondition:** Tab bar visible; active=qr
- **Current destination:** ROUTE → /legacy/qr
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-QR-001-09 — [09] История

- **Screen / element:** QR-001 / EL-QR-001-09
- **Control:** tab
- **User intent:** История
- **Precondition:** Tab bar visible; active=qr
- **Current destination:** ROUTE → /legacy/history
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-QR-001-10 — [10] Профиль

- **Screen / element:** QR-001 / EL-QR-001-10
- **Control:** tab; icon meaning: Profile
- **User intent:** Профиль
- **Precondition:** Tab bar visible; active=qr
- **Current destination:** ROUTE → /legacy/profile
- **Current code handler:** LegacyTabBar.go
- **Current mock effect:** None
- **Guest/auth behavior:** Same observable behavior unless noted
- **Potential backend requirement:** None identified from current UI
- **Source trace:** `src/features/legacyQr/ReceiveQrScreen.tsx`
- **Owner dependency:** None recorded

### ACT-PAY-002-15 — Entry from Home recent operation (prefilled)

- **Screen:** PAY-002
- **Current destination:** phone/amount search params applied on mount
- **Classification:** CURRENT_CODE_FACT at product SHA 597754364ada9dc1f51f62fe86b41a2bc0b24e4b
