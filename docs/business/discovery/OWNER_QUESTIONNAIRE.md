# Cashello owner questionnaire

Status of every item: **UNANSWERED**. Choices are prompts, not recommended rules. The owner may always choose **OTHER / OWNER EXPLANATION**.

Priorities: P0 money/safety/blocking; P1 core behavior; P2 operations/support; P3 cosmetic.\
Required-by: `REQUIRED_BEFORE_BACKEND`, `REQUIRED_BEFORE_PRODUCTION`, `CAN_DECIDE_LATER`.

## Q-AUTH-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как продукт отличает нового пользователя от возвращающегося после ввода телефона?

- A — сервер определяет по телефону
- B — пользователь выбирает “вход/регистрация”
- C — другой сценарий
- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-001`, `BP-AUTH-002`\
**Affected screens:** `CAS-AUTH-003`, `CAS-AUTH-015`\
**Affected actions:** `ACT-CAS-AUTH-003-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: любой телефон идет в один и тот же сценарий создания PIN.

## Q-AUTH-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Каким способом подтверждаем владение номером телефона?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-001`\
**Affected screens:** `CAS-AUTH-011`\
**Affected actions:** `ACT-CAS-AUTH-011-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: принимаются любые четыре цифры.

## Q-AUTH-003 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Сколько действует SMS-код после отправки?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-001`\
**Affected screens:** `CAS-AUTH-011`\
**Affected actions:** `ACT-CAS-AUTH-011-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: показан статический текст 00:34, реального срока нет.

## Q-AUTH-004 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Когда и сколько раз пользователь может запросить SMS-код повторно?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-001`\
**Affected screens:** `CAS-AUTH-011`\
**Affected actions:** `ACT-CAS-AUTH-011-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: текст повторной отправки не нажимается.

## Q-AUTH-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что происходит после нескольких неверных SMS-кодов?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-001`\
**Affected screens:** `CAS-AUTH-011`\
**Affected actions:** `ACT-CAS-AUTH-011-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: неверного кода не существует.

## Q-AUTH-006 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие требования должны быть к шестизначному коду доступа и сколько попыток входа разрешено?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-001`, `BP-AUTH-002`\
**Affected screens:** `CAS-AUTH-012`, `CAS-AUTH-015`\
**Affected actions:** `ACT-CAS-AUTH-012-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: принимается любая последовательность из шести цифр.

## Q-AUTH-007 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что должен сделать пользователь, если забыл код доступа?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-002`\
**Affected screens:** `CAS-AUTH-015`\
**Affected actions:** `ACT-CAS-AUTH-015-05`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: надпись видима, но не имеет действия.

## Q-AUTH-008 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Считаем ли устройство доверенным после успешного входа и на какой срок?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-002`\
**Affected screens:** `CAS-AUTH-015`\
**Affected actions:** `ACT-CAS-AUTH-015-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: сессия — только локальный флаг guest/authorized.

## Q-AUTH-009 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Когда авторизованная сессия должна истекать без действий пользователя?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-002`\
**Affected screens:** `LGC-SCR-025`\
**Affected actions:** `ACT-LGC-SCR-025-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: автоматического истечения нет.

## Q-AUTH-010 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Можно ли использовать один аккаунт одновременно на нескольких устройствах?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-002`\
**Affected screens:** `CAS-AUTH-015`\
**Affected actions:** `ACT-CAS-AUTH-015-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: прототип не моделирует устройства или серверные сессии.

## Q-AUTH-011 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Нужно ли отзывать все серверные сессии при выходе или только текущую?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PROFILE-002`\
**Affected screens:** `CAS-PROFILE-001`\
**Affected actions:** `ACT-CAS-PROFILE-001-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: сбрасывается только локальное состояние.

## Q-AUTH-012 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

В какой момент регистрации обязательна идентификация: до счета, до пополнения, до перевода или позже?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-AUTH-001`, `BP-KYC-001`\
**Affected screens:** `CAS-AUTH-004`, `LGC-SCR-068`\
**Affected actions:** `ACT-CAS-AUTH-005-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: основной runtime-путь полностью обходит KYC-экраны.

## Q-ACC-001 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие счета создаются автоматически каждому пользователю?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-ACC-001`, `BP-ACC-002`\
**Affected screens:** `LGC-SCR-029`, `LGC-SCR-031`\
**Affected actions:** `ACT-LGC-SCR-031-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: показаны два KZT и один USD счет; RUB предлагается, но не создается.

## Q-ACC-002 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие валюты пользователь может открыть и сколько счетов одной валюты разрешено?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-ACC-002`\
**Affected screens:** `LGC-SCR-031`\
**Affected actions:** `ACT-LGC-SCR-031-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: KZT/USD/RUB варианты только записывают lastOpenCurrency.

## Q-ACC-003 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что означает “основной счет” и где он должен использоваться автоматически?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-ACC-001`\
**Affected screens:** `LGC-SCR-029`\
**Affected actions:** `ACT-LGC-SCR-029-06`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: меняется локальный primaryAccountId.

## Q-ACC-004 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Может ли доступный баланс быть отрицательным?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-ACC-001`\
**Affected screens:** `LGC-SCR-032`\
**Affected actions:** `ACT-LGC-SCR-032-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: UI не определяет правило; некоторые mock-операции ограничивают debit, другие не валидируют сумму.

## Q-ACC-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие суммы показываем отдельно: доступно, заблокировано, ожидает зачисления и бухгалтерский баланс?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-ACC-001`\
**Affected screens:** `LGC-SCR-032`\
**Affected actions:** `ACT-LGC-SCR-032-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: показано одно число balance на счет.

## Q-ACC-006 — P2 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Как формируется и в каком формате выдается выписка и реквизиты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-ACC-001`\
**Affected screens:** `LGC-SCR-034`\
**Affected actions:** `ACT-LGC-SCR-034-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: выбор только записывается локально; файла нет.

## Q-TOPUP-001 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Должно ли пополнение наличными быть доступно в основном выборе способов?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-002`\
**Affected screens:** `LGC-SCR-040`, `LGC-SCR-074`\
**Affected actions:** `ACT-LGC-SCR-040-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: cash-маршруты существуют, но способ не показан в основном sheet.

## Q-TOPUP-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Где пользователь вводит сумму пополнения внешней картой?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`\
**Affected screens:** `LGC-SCR-085`\
**Affected actions:** `ACT-LGC-SCR-085-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: используется фиксированная сумма 1500 ₸ без поля ввода.

## Q-TOPUP-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие минимальная и максимальная суммы пополнения действуют для каждого способа?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`\
**Affected screens:** `LGC-SCR-085`, `LGC-SCR-081`\
**Affected actions:** `ACT-LGC-SCR-085-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: производственных лимитов нет.

## Q-TOPUP-004 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Есть ли комиссия за пополнение и кто ее оплачивает?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`\
**Affected screens:** `LGC-SCR-085`, `LGC-SCR-081`\
**Affected actions:** `ACT-LGC-SCR-085-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: комиссия пополнения не рассчитывается.

## Q-TOPUP-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Нужно ли подтверждение 3-D Secure или другое подтверждение банка для внешней карты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`\
**Affected screens:** `LGC-SCR-087`\
**Affected actions:** `ACT-LGC-SCR-087-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: подтверждение банка отсутствует.

## Q-TOPUP-006 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

В какой момент баланс Cashhello увеличивается при карточном пополнении?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`\
**Affected screens:** `LGC-SCR-087`\
**Affected actions:** `ACT-LGC-SCR-087-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: баланс вообще не увеличивается; добавляется только успешная история.

## Q-TOPUP-007 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какой статус показываем, если банк принял пополнение, но окончательный результат еще неизвестен?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-111`\
**Affected actions:** `ACT-LGC-SCR-087-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: карточный mock сразу пишет “Успешно”.

## Q-TOPUP-008 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как пользователь задает сумму наличного пополнения в кассе?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-002`\
**Affected screens:** `LGC-SCR-081`\
**Affected actions:** `ACT-LGC-SCR-081-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: после выбора кассы создается фиксированная сумма 8000 ₸.

## Q-TOPUP-009 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Когда наличное пополнение можно отменить и кто подтверждает прием денег?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-002`, `BP-HIST-002`\
**Affected screens:** `LGC-SCR-081`, `LGC-SCR-115`\
**Affected actions:** `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-115-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: операция помечается cancellable и “В обработке”, но экран пополнения не ведет к отмене.

## Q-TOPUP-010 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что происходит с пополнением при возврате или оспаривании платежа?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`\
**Affected screens:** `LGC-SCR-120`\
**Affected actions:** `ACT-LGC-SCR-120-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: refund/reversal не моделируется.

## Q-TRF-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какой источник курса используется при переводе между разными валютами?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-070`\
**Affected actions:** `ACT-LGC-SCR-070-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: статические NBK 458.48 KZT/USD и 5.43 KZT/RUB на 2026-08-26.

## Q-TRF-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

На сколько времени фиксируется показанный курс перед подтверждением?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-073`\
**Affected actions:** `ACT-LGC-SCR-073-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: срока курса и повторного котирования нет.

## Q-TRF-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

По каким правилам округляется сумма зачисления в каждой валюте?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-073`\
**Affected actions:** `ACT-LGC-SCR-073-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: используется локальная числовая конвертация.

## Q-TRF-004 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Есть ли комиссия за перевод между своими счетами?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-073`\
**Affected actions:** `ACT-LGC-SCR-073-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: история записывает fee=0.

## Q-TRF-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие минимальная и максимальная суммы перевода между своими счетами?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-073`\
**Affected actions:** `ACT-LGC-SCR-073-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: поле допускает до 9 цифр; бизнес-лимита нет.

## Q-TRF-006 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что должно произойти при сумме больше доступного баланса?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-073`\
**Affected actions:** `ACT-LGC-SCR-073-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_RUNTIME_FACT: 999 999 999 ₸ проходит; debit ограничивается балансом, credit считается от запрошенной суммы.

## Q-TRF-007 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Можно ли отменить или развернуть уже выполненный перевод между своими счетами?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-111`\
**Affected actions:** `ACT-LGC-SCR-111-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: операция сразу “Успешно”; отмены нет.

## Q-TRF-008 — P1 / CAN_DECIDE_LATER

**Вопрос владельцу**

Должен ли вход со страницы конкретного счета заранее выбирать счет “Куда”?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TRF-001`\
**Affected screens:** `LGC-SCR-069`\
**Affected actions:** `ACT-LGC-SCR-069-05`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: параметр to передается, но экран сбрасывает destination.

## Q-P2P-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

По каким данным ищем получателя Cashhello: телефон, QR, имя пользователя или другое?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`\
**Affected screens:** `CAS-WD-005`\
**Affected actions:** `ACT-CAS-WD-005-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: форма принимает телефон, но любой ввод всегда дает “Пользователь не найден”.

## Q-P2P-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие данные получателя можно показать до перевода, чтобы подтвердить человека и не раскрыть лишнее?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`\
**Affected screens:** `CAS-WD-005`\
**Affected actions:** `ACT-CAS-WD-005-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: карточки подтверждения получателя нет.

## Q-P2P-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Нужно ли отдельное подтверждение имени и суммы перед отправкой?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`\
**Affected screens:** `CAS-WD-005`\
**Affected actions:** `ACT-CAS-WD-005-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: отдельного подтверждения нет; CTA сейчас недостижима.

## Q-P2P-004 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что делать, если пользователь указал не того получателя и уже подтвердил перевод?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`\
**Affected screens:** `CAS-WD-005`\
**Affected actions:** `ACT-CAS-WD-005-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: ошибочный получатель и возврат не моделируются.

## Q-P2P-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Когда перевод другому пользователю становится окончательным и можно ли его отменить?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`\
**Affected screens:** `CAS-WD-005`\
**Affected actions:** `ACT-CAS-WD-005-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: flow заблокирован до выполнения.

## Q-P2P-006 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие дневные и разовые лимиты действуют для P2P?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`\
**Affected screens:** `CAS-WD-005`\
**Affected actions:** `ACT-CAS-WD-005-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: лимиты не реализованы.

## Q-P2P-007 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какой уровень идентификации нужен отправителю и получателю?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`, `BP-KYC-001`\
**Affected screens:** `CAS-WD-005`, `LGC-SCR-068`\
**Affected actions:** `ACT-CAS-WD-005-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: KYC status не участвует в проверке.

## Q-P2P-008 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какие уведомления получают отправитель и получатель при успехе, ожидании и отказе?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-P2P-001`\
**Affected screens:** `CAS-WD-005`, `LGC-SCR-125`\
**Affected actions:** `ACT-CAS-WD-005-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: уведомления P2P отсутствуют.

## Q-WD-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какой набор способов вывода является основным: Home-sheet или отдельный экран?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-P2P-001`\
**Affected screens:** `CAS-HOME-004`, `LGC-SCR-041`\
**Affected actions:** `ACT-CAS-HOME-004-02`, `ACT-LGC-SCR-041-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: два меню содержат разные способы.

## Q-WD-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие минимальная и максимальная суммы действуют отдельно для карты, телефона и наличных?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`, `BP-WD-003`\
**Affected screens:** `WD-002`, `WD-004`, `LGC-SCR-095`\
**Affected actions:** `ACT-WD-002-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: 1000–1970 ₸ действует только на amount/cash path; card/phone принимают любую сумму >0.

## Q-WD-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как рассчитывается комиссия для каждого способа вывода?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`, `BP-WD-003`\
**Affected screens:** `LGC-SCR-096`, `WD-002`, `WD-004`\
**Affected actions:** `ACT-LGC-SCR-096-06`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: store использует плоские 30 ₸.

## Q-WD-004 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Пользователь подтвердил вывод, а провайдер еще не дал финальный ответ. Что происходит с деньгами?

- A — окончательно списать сразу
- B — временно заморозить до результата
- C — оставить доступными до успеха
- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`, `BP-WD-003`\
**Affected screens:** `LGC-SCR-097`, `LGC-SCR-098`, `WD-003`\
**Affected actions:** `ACT-LGC-SCR-097-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: success списывает локальный баланс после таймера; processing не описывает резерв.

## Q-WD-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Если провайдер отказал после предварительного принятия, когда и как деньги возвращаются в доступный баланс?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`\
**Affected screens:** `LGC-SCR-099`, `WD-003`\
**Affected actions:** `ACT-LGC-SCR-099-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: error ставит “Отклонено”; полноценного резерва/возврата нет.

## Q-WD-006 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Можно ли повторить вывод после технической ошибки и нужно ли повторно подтверждать реквизиты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`\
**Affected screens:** `LGC-SCR-099`\
**Affected actions:** `ACT-LGC-SCR-099-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: error receipt имеет только завершение/мок-share.

## Q-WD-007 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Когда пользователь может отменить вывод, который еще “В обработке”?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-HIST-002`\
**Affected screens:** `WD-003`, `LGC-SCR-115`\
**Affected actions:** `ACT-LGC-SCR-115-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: cancel доступен только live history op с cancellable=true.

## Q-WD-008 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Нужна ли ручная проверка отдельных выводов и что видит пользователь в это время?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`, `BP-WD-003`\
**Affected screens:** `WD-003`\
**Affected actions:** `ACT-WD-003-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: manual review не моделируется.

## Q-WD-009 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как долго действует заявка на получение наличных?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-003`\
**Affected screens:** `WD-003`\
**Affected actions:** `ACT-WD-003-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: статус “Готов к выдаче” не имеет срока.

## Q-WD-010 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Чем касса подтверждает, что наличные выданы именно владельцу?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-003`\
**Affected screens:** `LGC-SCR-108`, `WD-003`\
**Affected actions:** `ACT-LGC-SCR-108-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: нет кода выдачи, документа или подтверждения кассира.

## Q-WD-011 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что происходит, если получатель в кассе не совпадает с владельцем аккаунта?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-003`\
**Affected screens:** `WD-003`\
**Affected actions:** `ACT-WD-003-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: проверка получателя не определена.

## Q-WD-012 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что происходит с деньгами после истечения срока невыданной наличной заявки?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-003`\
**Affected screens:** `WD-003`, `LGC-SCR-115`\
**Affected actions:** `ACT-LGC-SCR-115-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: expiry/reversal cash pickup отсутствует.

## Q-WD-013 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие карты разрешены для вывода: собственные, чужие, локальные/международные?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`\
**Affected screens:** `WD-002`\
**Affected actions:** `ACT-WD-002-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: принимается любая строка от 16 цифр.

## Q-WD-014 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как проверяется номер телефона для вывода на баланс и какие операторы поддерживаются?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-002`\
**Affected screens:** `WD-004`\
**Affected actions:** `ACT-WD-004-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: проверяется только длина 10 цифр.

## Q-WD-015 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какой документ считается чеком вывода и когда он доступен?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-WD-001`, `BP-WD-002`, `BP-WD-003`\
**Affected screens:** `WD-003`, `LGC-SCR-120`\
**Affected actions:** `ACT-WD-003-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: экран и share-alert не являются подтвержденным фискальным/банковским документом.

## Q-PAY-001 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Кто управляет каталогом услуг, категориями и признаком доступности?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-001`\
**Affected actions:** `ACT-PAY-001-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: каталог и available находятся в static mockData.

## Q-PAY-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие поля и правила проверки нужны для каждого провайдера?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-002`\
**Affected actions:** `ACT-PAY-002-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: все сервисы используют одинаковый телефон + сумму.

## Q-PAY-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Можно ли оплачивать услуги с бонусного счета и для каких категорий?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `CAS-PAY-002`\
**Affected actions:** `ACT-CAS-PAY-002-05`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: бонусный счет всегда предлагается.

## Q-PAY-004 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Строки “Бонус +2%” и комиссии МФО являются реальными правилами? Если да, как они рассчитываются?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-001`, `PAY-002`\
**Affected actions:** `ACT-PAY-001-10`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: проценты — статические подписи.

## Q-PAY-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие минимальная и максимальная суммы оплаты действуют для каждого сервиса?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-002`\
**Affected actions:** `ACT-PAY-002-05`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: требуется только amount > 0.

## Q-PAY-006 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что показываем, если провайдер временно недоступен до ввода формы?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-001`, `PAY-002`\
**Affected actions:** `ACT-PAY-001-18`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: unavailable rows disabled; deep-link все равно открывает форму.

## Q-PAY-007 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Когда баланс списывается при оплате услуги?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-002`\
**Affected actions:** `ACT-PAY-002-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: баланс не списывается вообще.

## Q-PAY-008 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какой статус показываем, если провайдер принял запрос, но результат неизвестен?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-002`, `LGC-SCR-111`\
**Affected actions:** `ACT-PAY-002-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: через 900 мс показывается Alert “принято”; истории нет.

## Q-PAY-009 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что делать, если провайдер отклонил неверный логин/договор/телефон?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-002`\
**Affected actions:** `ACT-PAY-002-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: provider reject/error UI отсутствует.

## Q-PAY-010 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Можно ли отменить или вернуть уже успешную оплату услуги?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-002`, `LGC-SCR-115`\
**Affected actions:** `ACT-PAY-002-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: refund/correction не моделируются.

## Q-PAY-011 — P2 / CAN_DECIDE_LATER

**Вопрос владельцу**

Избранные услуги должны храниться только на устройстве или синхронизироваться с аккаунтом?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`\
**Affected screens:** `PAY-001`, `PAY-002`\
**Affected actions:** `ACT-PAY-002-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: favorites — локальный Zustand.

## Q-PAY-012 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что именно должно появиться в истории и чеке после оплаты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PAY-001`, `BP-HIST-001`\
**Affected screens:** `PAY-002`, `LGC-SCR-111`\
**Affected actions:** `ACT-PAY-002-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: оплата не добавляет историю и не создает чек.

## Q-QR-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

QR для получения денег должен быть статическим или создаваться для каждой операции?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: каждый клик создает локальную строку с суммой.

## Q-QR-002 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Разрешен ли QR без фиксированной суммы или сумма всегда обязательна?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: сумма >0 обязательна.

## Q-QR-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Кому зачисляются деньги по QR и можно ли выбрать счет получателя?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: payload содержит только amount и currency.

## Q-QR-004 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Сколько времени действует созданный QR?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: срока действия нет.

## Q-QR-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Можно ли оплатить один QR несколько раз?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: payload переиспользуем и не имеет intent ID.

## Q-QR-006 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какие данные плательщика видит получатель до и после оплаты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: плательщик и статус не представлены.

## Q-QR-007 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как получатель узнает, что деньги действительно поступили?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`, `LGC-SCR-125`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: нет polling, push или экрана результата.

## Q-QR-008 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Можно ли отменить или вернуть перевод по QR?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: cancel/refund отсутствуют.

## Q-QR-009 — P2 / CAN_DECIDE_LATER

**Вопрос владельцу**

Нужно ли делиться QR изображением/ссылкой из приложения?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`\
**Affected screens:** `QR-001`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: share-кнопки нет.

## Q-QR-010 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Один и тот же QR используется для P2P и оплаты продавцу или это разные продукты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-QR-001`, `BP-P2P-001`\
**Affected screens:** `QR-001`, `CAS-WD-005`\
**Affected actions:** `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: payload не содержит типа получателя/операции.

## Q-HIST-001 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие виды операций обязательно отображаются в истории?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `LGC-SCR-111`\
**Affected actions:** `ACT-LGC-SCR-111-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: показываются пять seed-операций и append из topup/withdraw; service payment не попадает.

## Q-HIST-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какой список статусов видит пользователь и какие из них финальные?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `LGC-SCR-111`, `LGC-SCR-115`, `WD-003`\
**Affected actions:** `ACT-LGC-SCR-115-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: используются строки “В обработке”, “Отклонено”, “Готов к выдаче”, “Успешно”.

## Q-HIST-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие операции пользователь может отменить?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-002`\
**Affected screens:** `LGC-SCR-115`\
**Affected actions:** `ACT-LGC-SCR-115-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: только операции с локальным cancellable=true.

## Q-HIST-004 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что означает “Повторить операцию”: открыть заполненную форму или сразу отправить запрос?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-002`\
**Affected screens:** `CAS-HIST-002`\
**Affected actions:** `ACT-CAS-HIST-002-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: используется repeatHref; одна seed-операция ведет через redirect в каталог.

## Q-HIST-005 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Для каких статусов и операций доступен чек?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `LGC-SCR-115`, `LGC-SCR-120`\
**Affected actions:** `ACT-LGC-SCR-115-05`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: receiptEligible задается в local history record.

## Q-HIST-006 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Сколько времени хранится история и чек?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `LGC-SCR-111`, `LGC-SCR-120`\
**Affected actions:** `ACT-LGC-SCR-120-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: retention не моделируется.

## Q-HIST-007 — P2 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

В каком формате пользователь делится или скачивает чек?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `LGC-SCR-120`, `WD-003`\
**Affected actions:** `ACT-LGC-SCR-120-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: share/download — Alert; action sheet “share” открывает detail.

## Q-HIST-008 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как отображаются исправления, возвраты и развороты операций?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `LGC-SCR-111`\
**Affected actions:** `ACT-LGC-SCR-111-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: correction/reversal relation отсутствует.

## Q-HIST-009 — P2 / CAN_DECIDE_LATER

**Вопрос владельцу**

Как должны совместно работать календарный диапазон и полный экран фильтра?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `CAS-HIST-001`, `LGC-SCR-113`\
**Affected actions:** `ACT-LGC-SCR-113-06`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: применение полного фильтра очищает dateFrom/dateTo.

## Q-HIST-010 — P2 / CAN_DECIDE_LATER

**Вопрос владельцу**

Должны ли входящие операции открываться так же, как списания?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-HIST-001`\
**Affected screens:** `LGC-SCR-111`\
**Affected actions:** `ACT-LGC-SCR-111-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: в History входящие строки не нажимаются, а Home preview нажимает все.

## Q-KYC-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие уровни идентификации существуют и как пользователь переходит между ними?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`\
**Affected screens:** `LGC-SCR-068`, `CAS-AUTH-004`\
**Affected actions:** `ACT-LGC-SCR-068-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: показан один “Неидентифицированный” статус и 25%.

## Q-KYC-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие функции и лимиты доступны на каждом уровне KYC?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`\
**Affected screens:** `LGC-SCR-068`\
**Affected actions:** `ACT-LGC-SCR-068-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: три значения 12 975 ₸ и locked features статичны.

## Q-KYC-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какой провайдер или ручной процесс подтверждает лицо и документы?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`\
**Affected screens:** `CAS-AUTH-005`, `CAS-AUTH-007`\
**Affected actions:** `ACT-CAS-AUTH-007-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: камера ничего не сохраняет и не отправляет.

## Q-KYC-004 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что видит пользователь, если проверка KYC не прошла или требует ручной проверки?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`\
**Affected screens:** `CAS-AUTH-006`, `LGC-SCR-068`\
**Affected actions:** `ACT-CAS-AUTH-006-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: есть только faceFallback; результата проверки нет.

## Q-KYC-005 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Когда требуется повторная идентификация?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`\
**Affected screens:** `LGC-SCR-068`\
**Affected actions:** `ACT-LGC-SCR-068-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: re-verification не моделируется.

## Q-KYC-006 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие возрастные ограничения действуют и что происходит с несовершеннолетним пользователем?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`\
**Affected screens:** `LGC-SCR-068`\
**Affected actions:** `ACT-LGC-SCR-068-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: есть статический age badge без поведения.

## Q-KYC-007 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что видит заблокированный или ограниченный пользователь?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`\
**Affected screens:** `LGC-SCR-068`, `LGC-SCR-066`\
**Affected actions:** `ACT-LGC-SCR-066-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: blocked-user state отсутствует.

## Q-KYC-008 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Нужно ли завершить KYC для вывода, P2P, QR и оплаты, и на каком шаге блокировать?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-KYC-001`, `BP-WD-001`, `BP-P2P-001`, `BP-QR-001`, `BP-PAY-001`\
**Affected screens:** `LGC-SCR-068`, `WD-002`, `CAS-WD-005`, `QR-001`, `PAY-002`\
**Affected actions:** `ACT-WD-002-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: ни один money screen не проверяет KYC status.

## Q-PROFILE-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как подтверждается смена телефона и что делать при потере старого номера?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PROFILE-001`\
**Affected screens:** `LGC-SCR-122`, `LGC-SCR-123`\
**Affected actions:** `ACT-LGC-SCR-122-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: локальная четырехзначная проверка; старый номер не участвует.

## Q-PROFILE-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что происходит, если новый телефон уже принадлежит другому аккаунту?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PROFILE-001`\
**Affected screens:** `LGC-SCR-122`\
**Affected actions:** `ACT-LGC-SCR-122-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: уникальность номера не проверяется.

## Q-PROFILE-003 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие промокоды существуют, что они дают и когда применяются?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PROFILE-002`\
**Affected screens:** `LGC-SCR-066`\
**Affected actions:** `ACT-LGC-SCR-066-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: submit показывает Alert и не меняет продукт.

## Q-PROFILE-004 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какие уведомления пользователь может отключить, а какие обязательны?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PROFILE-002`\
**Affected screens:** `LGC-SCR-066`\
**Affected actions:** `ACT-LGC-SCR-066-06`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: один локальный pushEnabled switch.

## Q-PROFILE-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что именно удаляется по кнопке “Удалить профиль”, можно ли отменить удаление и что происходит с деньгами?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PROFILE-002`\
**Affected screens:** `CAS-PROFILE-002`\
**Affected actions:** `ACT-CAS-PROFILE-002-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: только переход на auth; данные и деньги не удаляются.

## Q-PROFILE-006 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какие данные нужно хранить после удаления аккаунта и сколько времени?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-PROFILE-002`\
**Affected screens:** `CAS-PROFILE-002`\
**Affected actions:** `ACT-CAS-PROFILE-002-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: retention/deletion policy отсутствует.

## Q-PROFILE-007 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как пользователь отправляет обращение в поддержку и получает номер/статус ответа?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-SUPPORT-001`\
**Affected screens:** `LGC-SCR-126`\
**Affected actions:** `ACT-LGC-SCR-126-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: текст можно ввести, но кнопки отправки нет.

## Q-PROFILE-008 — P2 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какие типы файлов можно приложить к обращению и какие ограничения размера?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-SUPPORT-001`\
**Affected screens:** `LGC-SCR-126`\
**Affected actions:** `ACT-LGC-SCR-126-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: attachment — Alert без файла.

## Q-CARD-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Карта Cashello физическая, виртуальная или обе?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-035`\
**Affected actions:** `ACT-LGC-SCR-035-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: показан один синтетический card visual.

## Q-CARD-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как пользователь выпускает и активирует карту?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-033`, `LGC-SCR-035`\
**Affected actions:** `ACT-LGC-SCR-033-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: issuance/activation flow отсутствует.

## Q-CARD-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Чем отличается временная заморозка от окончательной блокировки?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-037`\
**Affected actions:** `ACT-LGC-SCR-037-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: есть только blocked=true и нет разблокировки.

## Q-CARD-004 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Можно ли разблокировать карту самостоятельно и при каких условиях?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-037`\
**Affected actions:** `ACT-LGC-SCR-037-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: unfreeze UI отсутствует.

## Q-CARD-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Как меняется PIN карты и нужна ли проверка старого PIN?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-002`\
**Affected screens:** `LGC-SCR-057`\
**Affected actions:** `ACT-LGC-SCR-057-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: вводится только новый PIN и повтор.

## Q-CARD-006 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие виды лимитов доступны и кто подтверждает их изменение?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-038`, `LGC-SCR-039`\
**Affected actions:** `ACT-LGC-SCR-039-08`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: один локальный preset limit применяется сразу.

## Q-CARD-007 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Поддерживаются ли Apple Pay и Google Pay, и какие условия подключения?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-035`\
**Affected actions:** `ACT-LGC-SCR-035-06`, `ACT-LGC-SCR-035-07`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: нажатия только ставят локальные flags.

## Q-CARD-008 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что происходит при перевыпуске, потере, окончании срока или компрометации карты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-035`\
**Affected actions:** `ACT-LGC-SCR-035-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: replacement/expiry flows отсутствуют.

## Q-CARD-009 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Какие комиссии связаны с выпуском и обслуживанием карты?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-035`\
**Affected actions:** `ACT-LGC-SCR-035-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: card fees не показаны.

## Q-CARD-010 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Нужно ли дополнительное подтверждение перед показом CVV?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-CARD-001`\
**Affected screens:** `LGC-SCR-036`\
**Affected actions:** `ACT-LGC-SCR-036-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_RUNTIME_FACT: CVV показывается одним нажатием без challenge.

## Q-ERR-001 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Если обязательное поле или реквизит неверны, показываем ошибку сразу или после ответа провайдера?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: в основном есть только локальная длина/amount>0; provider validation отсутствует.

## Q-ERR-002 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что видит пользователь, если backend Cashhello временно недоступен?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: backend error states не реализованы.

## Q-ERR-003 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что видит пользователь, если Cashhello работает, но внешний провайдер недоступен?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: только каталог может статически disable сервис.

## Q-ERR-004 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Провайдер принял запрос, но ответ потерян или истек таймаут. Какой статус и что происходит с деньгами?

- A — “В обработке”, деньги заморожены
- B — “Неизвестно”, деньги недоступны до сверки
- C — вернуть доступность и разбираться отдельно
- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_MOCK_BEHAVIOR: timers всегда выбирают заранее заданный локальный outcome.

## Q-ERR-005 — P0 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Что происходит при двойном нажатии пользователем или повторной доставке одного запроса?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: общей защиты от duplicate tap/idempotency в UI нет.

## Q-ERR-006 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Что видит пользователь, если закрыл приложение или потерял интернет во время операции?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: восстановление состояния и resume отсутствуют.

## Q-ERR-007 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Сколько операция может оставаться “В обработке” и когда подключается поддержка/ручная проверка?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: SLA pending/manual review не определен.

## Q-ERR-008 — P0 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Если провайдер сначала подтвердил успех, а позже прислал отказ или reversal, что видит пользователь и как меняется баланс?

- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Ответ определяет ожидаемое поведение продукта и границы backend-реализации.

**Affected processes:** `BP-TOPUP-001`, `BP-TOPUP-002`, `BP-TRF-001`, `BP-P2P-001`, `BP-WD-001`, `BP-WD-002`, `BP-WD-003`, `BP-PAY-001`, `BP-QR-001`\
**Affected screens:** `LGC-SCR-087`, `LGC-SCR-081`, `LGC-SCR-073`, `CAS-WD-005`, `WD-002`, `WD-004`, `LGC-SCR-097`, `PAY-002`, `QR-001`\
**Affected actions:** `ACT-LGC-SCR-087-03`, `ACT-LGC-SCR-081-02`, `ACT-LGC-SCR-073-08`, `ACT-CAS-WD-005-07`, `ACT-WD-002-08`, `ACT-PAY-002-07`, `ACT-QR-001-04`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** UNKNOWN: поздний reject/reversal не моделируется.

## Q-SUPPORT-001 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какие каналы поддержки должны быть доступны пользователю в приложении? Сейчас прототип показывает Telegram и WhatsApp, но ссылки пустые.

- A — только Telegram
- B — только WhatsApp
- C — Telegram и WhatsApp
- D — телефон / email / чат в приложении
- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Без рабочих каналов пользователь не может связаться с поддержкой в production.

**Affected processes:** `BP-SUPPORT-002`\
**Affected screens:** `CAS-SUPPORT-002`, `HOME-001`, `LGC-SCR-025`\
**Affected actions:** `ACT-GLOBAL-SUPPORT-01`, `ACT-CAS-SUPPORT-002-02`, `ACT-CAS-SUPPORT-002-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: FAB на всех `/legacy/*` экранах открывает sheet «Служба поддержки». CURRENT_MOCK_BEHAVIOR: ссылки `null` → Alert «Скоро».

## Q-SUPPORT-002 — P2 / CAN_DECIDE_LATER

**Вопрос владельцу**

Подпись «24/7» означает, что живой оператор реально отвечает круглосуточно, или это только маркетинговый текст?

- A — живые операторы 24/7
- B — бот 24/7, люди в рабочие часы
- C — убрать «24/7», указать часы
- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Нельзя обещать круглосуточную поддержку, если операционно это не так.

**Affected processes:** `BP-SUPPORT-002`, `BP-SUPPORT-001`\
**Affected screens:** `CAS-SUPPORT-002`, `LGC-SCR-126`\
**Affected actions:** `ACT-CAS-SUPPORT-002-02`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** PROTOTYPE_UI_ONLY: тексты «Телеграм 24/7» и «Whatsapp 24/7».

## Q-SUPPORT-003 — P1 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Гость без аккаунта может писать в поддержку, или канал только для авторизованных пользователей?

- A — гость может писать
- B — только после входа
- C — гость видит контакты, но тикеты не принимаются
- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Нужно понять, идентифицируется ли обратившийся и какие данные передавать оператору.

**Affected processes:** `BP-SUPPORT-002`\
**Affected screens:** `HOME-001`, `CAS-SUPPORT-002`\
**Affected actions:** `ACT-HOME-001-13`, `ACT-GLOBAL-SUPPORT-01`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_RUNTIME_FACT: FAB виден и гостю, и авторизованному пользователю.

## Q-SUPPORT-004 — P2 / REQUIRED_BEFORE_PRODUCTION

**Вопрос владельцу**

Какие рабочие ссылки Telegram и WhatsApp нужно открывать из приложения?

- OTHER / OWNER EXPLANATION: укажите URL / username / номер ______

**Why this matters:** Без URL кнопки останутся заглушкой «Скоро».

**Affected processes:** `BP-SUPPORT-002`\
**Affected screens:** `CAS-SUPPORT-002`\
**Affected actions:** `ACT-CAS-SUPPORT-002-02`, `ACT-CAS-SUPPORT-002-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: `SUPPORT_CONTACT_LINKS = { telegram: null, whatsapp: null }`.

## Q-SUPPORT-005 — P1 / REQUIRED_BEFORE_BACKEND

**Вопрос владельцу**

Глобальная кнопка поддержки, экран «Сообщения» и экран «Помощь» — это один процесс или разные? Куда должен попадать пользователь?

- A — FAB сразу открывает Telegram/WhatsApp
- B — FAB открывает внутриприложенческий чат/тикет
- C — FAB и «Помощь» — разные каналы
- OTHER / OWNER EXPLANATION: ______

**Why this matters:** Иначе в продукте будет три несогласованных «поддержки».

**Affected processes:** `BP-SUPPORT-002`, `BP-SUPPORT-001`\
**Affected screens:** `CAS-SUPPORT-002`, `LGC-SCR-125`, `LGC-SCR-126`\
**Affected actions:** `ACT-GLOBAL-SUPPORT-01`, `ACT-LGC-SCR-125-03`\
**Decision class:** BUSINESS_DECISION

**Current prototype:** CURRENT_CODE_FACT: FAB — внешние каналы-заглушки. `LGC-SCR-125`/`LGC-SCR-126` — отдельные экраны без отправки.
