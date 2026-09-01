/**
 * Runtime capture recipes for annotated discovery screenshots.
 * Keys are screenshot filenames (not paths). Unlisted files use screens.json route.
 */
module.exports = {
  'CAS-AUTH-001__splash.png': {
    url: '/legacy/auth?qaStep=splash',
    waitMs: 350,
    waitText: null,
  },
  'CAS-AUTH-002__onboarding.png': { url: '/legacy/auth?qaStep=onboarding', waitText: 'Пропустить' },
  'CAS-AUTH-003__phone-entry.png': { url: '/legacy/auth?qaStep=iin', waitText: 'Авторизация' },
  'CAS-AUTH-003__phone-entry-filled.png': {
    url: '/legacy/auth?qaStep=iin',
    waitText: 'Авторизация',
    steps: [{ typeInto: 'input', text: '7771234567' }],
  },
  'CAS-AUTH-004__identity-intro.png': {
    url: '/legacy/auth?qaStep=identity',
    waitText: 'Сканировать',
  },
  'CAS-AUTH-005__face-camera.png': { url: '/legacy/auth?qaStep=face', waitText: 'Отмена' },
  'CAS-AUTH-006__face-fallback.png': {
    url: '/legacy/auth?qaStep=faceFallback',
    waitText: 'Лицо не распознано',
  },
  'CAS-AUTH-007__document-front.png': { url: '/legacy/auth?qaStep=documentFront', waitText: 'УДВ' },
  'CAS-AUTH-008__document-turn.png': {
    url: '/legacy/auth?qaStep=documentTurn',
    waitText: 'Переверните',
  },
  'CAS-AUTH-009__document-back.png': {
    url: '/legacy/auth?qaStep=documentBack',
    waitText: 'оборот',
  },
  'CAS-AUTH-010__kyc-phone.png': { url: '/legacy/auth?qaStep=phone', waitText: 'Номер телефона' },
  'CAS-AUTH-011__otp.png': { url: '/legacy/auth?qaStep=verification', waitText: 'Введите код' },
  'CAS-AUTH-011__otp-filled.png': {
    url: '/legacy/auth?qaStep=verification',
    waitText: 'Введите код',
    steps: [{ clickAria: '0' }, { clickAria: '0' }, { clickAria: '0' }, { wait: 200 }],
  },
  'CAS-AUTH-012__pin-create.png': {
    url: '/legacy/auth?qaStep=pinCreate',
    waitText: 'Придумайте код',
  },
  'CAS-AUTH-012__pin-create-filled.png': {
    url: '/legacy/auth?qaStep=pinCreate',
    waitText: 'Придумайте код',
    steps: [{ digits: '111111' }],
  },
  'CAS-AUTH-013__pin-repeat.png': {
    url: '/legacy/auth?qaStep=pinRepeat',
    waitText: 'Повторите код',
  },
  'CAS-AUTH-013__pin-repeat-filled.png': {
    url: '/legacy/auth?qaStep=pinRepeat',
    waitText: 'Повторите код',
    steps: [{ digits: '11111' }],
  },
  'CAS-AUTH-014__pin-error.png': { url: '/legacy/auth?qaStep=pinError', waitText: 'не совпадают' },
  'CAS-AUTH-014__pin-mismatch-runtime.png': {
    url: '/legacy/auth?qaStep=pinCreate',
    waitText: 'Придумайте код',
    steps: [{ digits: '111111' }, { wait: 400 }, { digits: '222222' }],
  },
  'CAS-AUTH-015__pin-login.png': {
    url: '/legacy/auth?qaStep=pinLogin',
    waitText: 'Введите код доступа',
  },

  'HOME-001__guest-home.png': { url: '/legacy/home?guest=1', waitText: 'Последние' },
  'LGC-SCR-025__authorized-home.png': { url: '/legacy/home', waitText: 'Последние' },
  'LGC-SCR-025__balances-hidden.png': {
    url: '/legacy/home',
    waitText: 'Вывести',
    steps: [{ clickAria: 'Скрыть' }],
  },
  'CAS-HOME-003__topup-sheet-guest.png': {
    url: '/legacy/home?guest=1',
    waitText: 'Войти',
    steps: [{ clickAria: 'Пополнить' }],
  },
  'CAS-HOME-003__topup-sheet-authorized.png': {
    url: '/legacy/home?topup=1',
    waitText: 'Пополнить',
  },
  'CAS-HOME-004__withdraw-sheet-guest.png': {
    url: '/legacy/home?guest=1',
    waitText: 'Войти',
    steps: [{ clickAria: 'Вывести' }],
  },
  'CAS-HOME-004__withdraw-sheet-authorized.png': {
    url: '/legacy/home',
    waitText: 'Вывести',
    steps: [{ clickAria: 'Вывести' }],
  },
  'CAS-SUPPORT-002__sheet-guest.png': {
    url: '/legacy/home?guest=1',
    waitText: 'Войти',
    steps: [{ clickXY: [338, 700] }],
  },
  'CAS-SUPPORT-002__sheet-authorized.png': {
    url: '/legacy/home',
    waitText: 'Вывести',
    steps: [{ clickXY: [338, 718] }],
  },

  'LGC-SCR-029__accounts-list.png': { url: '/legacy/accounts', waitText: 'Счета' },
  'LGC-SCR-031__open-account-sheet.png': {
    url: '/legacy/accounts',
    waitText: 'Счета',
    steps: [{ clickText: 'Открыть счет' }],
  },
  'LGC-SCR-031__open-account-request-recorded.png': {
    url: '/legacy/accounts',
    waitText: 'Счета',
    steps: [{ clickText: 'Открыть счет' }, { clickText: 'Отправить' }],
  },
  'LGC-SCR-032__kzt-primary.png': { url: '/legacy/accounts/kzt-primary', waitText: 'Счет' },
  'LGC-SCR-032__kzt-secondary.png': { url: '/legacy/accounts/kzt-secondary', waitText: 'Счет' },
  'LGC-SCR-033__usd-account.png': { url: '/legacy/accounts/usd', waitText: 'Счет' },
  'LGC-SCR-034__download-sheet.png': {
    url: '/legacy/accounts/kzt-primary',
    waitText: 'Счет',
    steps: [{ clickText: 'Выписка' }],
  },
  'LGC-SCR-040__method-sheet.png': { url: '/legacy/topup', waitText: 'Пополнить' },
  'LGC-SCR-040__account-method-sheet.png': {
    url: '/legacy/accounts/kzt-primary',
    waitText: 'Счет',
    steps: [{ clickAria: 'Пополнить' }],
  },

  'LGC-SCR-035__card-hidden.png': { url: '/legacy/card', waitText: 'Карта' },
  'LGC-SCR-036__cvv-visible.png': {
    url: '/legacy/card',
    waitText: 'Карта',
    steps: [{ clickAria: 'Показать' }],
  },
  'LGC-SCR-037__block-confirmation.png': {
    url: '/legacy/card',
    waitText: 'Карта',
    steps: [{ clickText: 'Заблокировать' }],
  },
  'LGC-SCR-037__after-block.png': {
    url: '/legacy/card',
    waitText: 'Карта',
    steps: [{ clickText: 'Заблокировать' }, { clickText: 'Заблокировать' }],
  },
  'LGC-SCR-038__limits.png': { url: '/legacy/card/limits', waitText: 'лимит' },
  'LGC-SCR-039__limit-sheet.png': {
    url: '/legacy/card/limits',
    waitText: 'лимит',
    steps: [{ clickText: 'Суточный' }],
  },
  'LGC-SCR-039__limit-selected.png': {
    url: '/legacy/card/limits',
    waitText: 'лимит',
    steps: [{ clickText: 'Суточный' }, { clickText: '50 000' }],
  },
  'LGC-SCR-039__limit-applied.png': {
    url: '/legacy/card/limits',
    waitText: 'лимит',
    steps: [{ clickText: 'Суточный' }, { clickText: '50 000' }, { clickText: 'Применить' }],
  },
  'LGC-SCR-057__pin-create.png': { url: '/legacy/card/pin', waitText: 'код' },
  'LGC-SCR-059__pin-repeat.png': {
    url: '/legacy/card/pin',
    waitText: 'код',
    steps: [{ digits: '1234' }],
  },
  'LGC-SCR-060__pin-error.png': {
    url: '/legacy/card/pin',
    waitText: 'код',
    steps: [{ digits: '1234' }, { wait: 300 }, { digits: '9999' }],
  },

  'LGC-SCR-066__profile.png': { url: '/legacy/profile', waitText: 'Профиль' },
  'LGC-SCR-066__after-phone-change.png': { url: '/legacy/profile', waitText: 'Профиль' },
  'LGC-SCR-066__notification-control-visible.png': {
    url: '/legacy/profile',
    waitText: 'Профиль',
    steps: [{ clickText: 'Уведомления' }],
  },
  'CAS-PROFILE-001__logout-confirmation.png': {
    url: '/legacy/profile',
    waitText: 'Профиль',
    steps: [{ clickText: 'Выйти' }],
  },
  'CAS-PROFILE-002__delete-confirmation.png': {
    url: '/legacy/profile',
    waitText: 'Профиль',
    steps: [{ clickText: 'Удалить' }],
  },
  'LGC-SCR-067__personal-data.png': { url: '/legacy/profile/personal', waitText: 'Данные' },
  'LGC-SCR-068__identification-status.png': { url: '/legacy/profile/status', waitText: 'идентиф' },
  'LGC-SCR-122__phone-change.png': { url: '/legacy/profile/phone', waitText: 'телефон' },
  'LGC-SCR-122__phone-change-filled.png': {
    url: '/legacy/profile/phone',
    waitText: 'телефон',
    steps: [{ typeInto: 'input', text: '7770001122' }],
  },
  'LGC-SCR-123__phone-verification.png': { url: '/legacy/profile/phone/verify', waitText: 'код' },
  'LGC-SCR-124__pin-change.png': { url: '/legacy/profile/pin', waitText: 'код' },
  'LGC-SCR-124__pin-repeat.png': {
    url: '/legacy/profile/pin',
    waitText: 'код',
    steps: [{ digits: '111111' }],
  },
  'LGC-SCR-124__pin-error.png': {
    url: '/legacy/profile/pin',
    waitText: 'код',
    steps: [{ digits: '111111' }, { wait: 300 }, { digits: '222222' }],
  },
  'LGC-SCR-125__messages.png': { url: '/legacy/messages', waitText: 'Сообщен' },
  'LGC-SCR-126__help.png': { url: '/legacy/help', waitText: 'Помощь' },
  'LGC-SCR-126__help-filled.png': {
    url: '/legacy/help',
    waitText: 'Помощь',
    steps: [{ typeInto: 'textarea,input', text: 'Тестовое обращение Cashello QA' }],
  },
  'LGC-SCR-061__search.png': { url: '/legacy/search', waitText: 'Поиск' },
  'LGC-SCR-061__no-results.png': {
    url: '/legacy/search',
    waitText: 'Поиск',
    steps: [{ typeInto: 'input', text: 'zzzz-not-found' }],
  },
  'LGC-SCR-061__deferred-result.png': {
    url: '/legacy/search',
    waitText: 'Поиск',
    steps: [{ typeInto: 'input', text: 'ubet' }],
  },

  'CAS-STUB-001__registration.png': { url: '/legacy/stub/registration', waitText: 'Войти' },
  'CAS-STUB-002__bonus.png': { url: '/legacy/stub/bonus', waitText: 'Войти' },
  'CAS-STUB-003__cashhello-user.png': { url: '/legacy/stub/cashhello-user', waitText: 'Войти' },
  'CAS-STUB-004__linked-cards.png': { url: '/legacy/stub/linked-cards', waitText: 'Войти' },
  'CAS-STUB-005__suggest-idea.png': { url: '/legacy/stub/suggest-idea', waitText: 'Войти' },
  'CAS-STUB-006__documents.png': { url: '/legacy/stub/documents', waitText: 'Войти' },

  'LGC-SCR-069__between-default.png': { url: '/legacy/topup/between', waitText: 'между' },
  'LGC-SCR-070__accounts-selected-fx.png': {
    url: '/legacy/topup/between',
    waitText: 'между',
    steps: [{ clickText: 'Счет ₸' }, { clickText: 'Счет $' }],
  },
  'LGC-SCR-071__account-picker.png': {
    url: '/legacy/topup/between',
    waitText: 'между',
    steps: [{ clickText: 'Откуда' }],
  },
  'LGC-SCR-073__fx-filled.png': {
    url: '/legacy/topup/between',
    waitText: 'между',
    steps: [{ clickText: 'Счет ₸' }, { clickText: 'Счет $' }, { typeInto: 'input', text: '1000' }],
  },
  'LGC-SCR-073__over-balance-enabled.png': {
    url: '/legacy/topup/between',
    waitText: 'между',
    steps: [
      { clickText: 'Счет $' },
      { clickText: 'Счет ₸' },
      { typeInto: 'input', text: '999999' },
    ],
  },
  'LGC-SCR-085__external-card.png': { url: '/legacy/topup/card', waitText: 'карт' },
  'CAS-TOPUP-001__saved-card-picker.png': {
    url: '/legacy/topup/card',
    waitText: 'карт',
    steps: [{ clickText: 'сохранен' }],
  },
  'LGC-SCR-087__saved-card-selected.png': {
    url: '/legacy/topup/card',
    waitText: 'карт',
    steps: [{ clickText: 'сохранен' }, { clickNth: 0 }],
  },
  'LGC-SCR-074__cash-picker.png': { url: '/legacy/topup/cash', waitText: 'наличн' },
  'LGC-SCR-074__cash-picker-returned.png': { url: '/legacy/topup/cash', waitText: 'наличн' },
  'LGC-SCR-080__cash-map.png': { url: '/legacy/topup/cash-map', waitText: 'карт' },
  'LGC-SCR-081__cash-desk-selected.png': {
    url: '/legacy/topup/cash-map',
    waitText: 'карт',
    steps: [{ clickText: 'Cashhello' }],
  },

  'LGC-SCR-041__method-selection.png': { url: '/legacy/withdraw', waitText: 'Вывести' },
  'WD-002__card-form.png': { url: '/legacy/withdraw/card', waitText: 'карт' },
  'WD-002__card-form-filled.png': {
    url: '/legacy/withdraw/card',
    waitText: 'карт',
    steps: [{ typeInto: 'input', text: '4111111111111111' }],
  },
  'WD-002__card-transfer-delay.png': {
    url: '/legacy/withdraw/card',
    waitText: 'карт',
    steps: [
      { typeInto: 'input', text: '4111111111111111' },
      { clickText: 'Перевести' },
      { wait: 400 },
    ],
  },
  'LGC-SCR-091__card-camera.png': {
    url: '/legacy/withdraw/card',
    waitText: 'карт',
    steps: [{ clickAria: 'Камера' }],
  },
  'LGC-SCR-092__card-selected.png': {
    url: '/legacy/withdraw/card',
    waitText: 'карт',
    steps: [{ clickText: 'сохранен' }, { clickNth: 0 }],
  },
  'CAS-WD-001__saved-card-picker.png': {
    url: '/legacy/withdraw/card',
    waitText: 'карт',
    steps: [{ clickText: 'сохранен' }],
  },
  'CAS-WD-002__account-picker.png': {
    url: '/legacy/withdraw/card',
    waitText: 'карт',
    steps: [{ clickText: 'Счет' }],
  },
  'WD-004__phone-form.png': { url: '/legacy/withdraw/phone', waitText: 'телефон' },
  'WD-004__phone-filled.png': {
    url: '/legacy/withdraw/phone',
    waitText: 'телефон',
    steps: [{ typeInto: 'input', text: '7771234567' }],
  },
  'WD-004__phone-transfer-delay.png': {
    url: '/legacy/withdraw/phone',
    waitText: 'телефон',
    steps: [{ typeInto: 'input', text: '7771234567' }, { clickText: 'Перевести' }, { wait: 400 }],
  },
  'CAS-WD-003__saved-phone-picker.png': {
    url: '/legacy/withdraw/phone',
    waitText: 'телефон',
    steps: [{ clickText: 'сохранен' }],
  },
  'CAS-WD-005__cashhello-user.png': {
    url: '/legacy/withdraw/cashhello-user',
    waitText: 'пользовател',
  },
  'CAS-WD-005__user-not-found.png': {
    url: '/legacy/withdraw/cashhello-user',
    waitText: 'пользовател',
    steps: [{ typeInto: 'input', text: '7000000000' }, { clickText: 'Продолжить' }],
  },
  'LGC-SCR-105__cash-picker.png': { url: '/legacy/withdraw/cash', waitText: 'наличн' },
  'LGC-SCR-106__cash-map.png': { url: '/legacy/withdraw/cash-map', waitText: 'карт' },
  'LGC-SCR-108__cash-desk-selected.png': {
    url: '/legacy/withdraw/cash-map',
    waitText: 'карт',
    steps: [{ clickText: 'Cashhello' }],
  },
  'LGC-SCR-093__amount-default.png': { url: '/legacy/withdraw/amount', waitText: 'Сумма' },
  'LGC-SCR-095__amount-over-limit.png': {
    url: '/legacy/withdraw/amount',
    waitText: 'Сумма',
    steps: [{ typeInto: 'input', text: '999999' }],
  },
  'LGC-SCR-096__amount-fee.png': {
    url: '/legacy/withdraw/amount',
    waitText: 'Сумма',
    steps: [{ typeInto: 'input', text: '1500' }],
  },
  'LGC-SCR-109__cash-amount.png': {
    url: '/legacy/withdraw/amount',
    waitText: 'Сумма',
    steps: [{ typeInto: 'input', text: '1500' }],
  },
  'LGC-SCR-097__confirmation.png': {
    url: '/legacy/withdraw/amount',
    waitText: 'Сумма',
    steps: [{ typeInto: 'input', text: '1500' }, { clickText: 'Продолжить' }],
  },
  'LGC-SCR-098__loading.png': { url: '/legacy/withdraw/loading', waitMs: 250, waitText: null },
  'LGC-SCR-098__cash-loading.png': { url: '/legacy/withdraw/loading', waitMs: 250, waitText: null },
  'LGC-SCR-098__error-loading.png': {
    url: '/legacy/withdraw/loading?scenario=error',
    waitMs: 250,
    waitText: null,
  },
  'LGC-SCR-098__processing-loading.png': {
    url: '/legacy/withdraw/loading?scenario=processing',
    waitMs: 250,
    waitText: null,
  },
  'LGC-SCR-099__error.png': { url: '/legacy/withdraw/loading?scenario=error', waitText: 'Отклон' },
  'WD-003__success.png': { url: '/legacy/withdraw/loading?ready=1', waitText: 'Успешн' },
  'WD-003__card-success.png': { url: '/legacy/withdraw/loading?ready=1', waitText: 'Успешн' },
  'WD-003__phone-success.png': { url: '/legacy/withdraw/loading?ready=1', waitText: 'Успешн' },
  'WD-003__cash-ready.png': { url: '/legacy/withdraw/loading?ready=1', waitText: 'выдач' },
  'WD-003__processing.png': {
    url: '/legacy/withdraw/loading?scenario=processing',
    waitText: 'обработ',
  },
  'WD-003__history-card-receipt.png': { url: '/legacy/history/wd-card', waitText: 'Вывод' },
  'CAS-HIST-005__phone-withdraw-receipt.png': {
    url: '/legacy/history/wd-phone',
    waitText: 'Вывод',
  },

  'PAY-001__catalog.png': { url: '/legacy/payment', waitText: 'Оплата' },
  'PAY-001__guest-browse.png': {
    url: '/legacy/home?guest=1',
    waitText: 'Войти',
    steps: [{ clickText: 'См. все' }],
  },
  'PAY-001__category-mfo.png': {
    url: '/legacy/payment',
    waitText: 'Оплата',
    steps: [{ clickText: 'МФО' }],
  },
  'PAY-001__favorites-empty.png': {
    url: '/legacy/payment',
    waitText: 'Оплата',
    steps: [{ clickText: 'Избранн' }],
  },
  'PAY-001__search-empty.png': {
    url: '/legacy/payment',
    waitText: 'Оплата',
    steps: [{ typeInto: 'input', text: 'zzzz-not-found' }],
  },
  'PAY-001__search-result.png': {
    url: '/legacy/payment',
    waitText: 'Оплата',
    steps: [{ typeInto: 'input', text: 'ubet' }],
  },
  'CAS-PAY-001__category-sheet.png': {
    url: '/legacy/payment',
    waitText: 'Оплата',
    steps: [{ clickText: 'Категор' }],
  },
  'PAY-002__prefilled-from-home.png': {
    url: '/legacy/home',
    waitText: 'Последние',
    steps: [{ clickAria: 'Ubet' }, { wait: 600 }],
  }, { wait: 600 }],
  }, { wait: 600 }],
  }, { wait: 600 }],
  },
  'PAY-002__ubet.png': { url: '/legacy/payment/ubet', waitText: 'Ubet' },
  'PAY-002__zaimer.png': { url: '/legacy/payment/zaimer', waitText: 'Zaimer' },
  'PAY-002__unavailable.png': { url: '/legacy/payment/fonbet', waitText: 'Fonbet' },
  'PAY-002__not-found.png': { url: '/legacy/payment/does-not-exist', waitText: null, waitMs: 800 },
  'PAY-002__guest-filled.png': {
    from: 'guest',
    clicks: [{ clickAria: 'Оплата' }, { clickText: 'Ubet' }],
    waitText: 'Ubet',
    steps: [
      { typeAriaContains: 'телефон', text: '7771234567' },
      { typeAriaContains: 'Сумма', text: '1000' },
    ],
  },
  'PAY-002__filled-bonus.png': {
    url: '/legacy/payment/ubet',
    waitText: 'Ubet',
    steps: [
      { typeAriaContains: 'телефон', text: '7771234567' },
      { typeAriaContains: 'Сумма', text: '1000' },
      { clickText: 'Бонус' },
    ],
  },
  'PAY-002__loading.png': {
    url: '/legacy/payment/ubet',
    waitText: 'Ubet',
    steps: [
      { typeAriaContains: 'телефон', text: '7771234567' },
      { typeAriaContains: 'Сумма', text: '1000' },
      { clickText: 'Оплатить' },
      { wait: 200 },
    ],
  },
  'PAY-002__after-success-alert.png': {
    url: '/legacy/payment/ubet',
    waitText: 'Ubet',
    steps: [
      { typeAriaContains: 'телефон', text: '7771234567' },
      { typeAriaContains: 'Сумма', text: '1000' },
      { clickText: 'Оплатить' },
      { wait: 1200 },
    ],
  },
  'CAS-PAY-002__account-picker.png': {
    url: '/legacy/payment/ubet',
    waitText: 'Ubet',
    steps: [{ clickText: 'Счет' }],
  },

  'LGC-SCR-111__history-list.png': { url: '/legacy/history', waitText: 'История' },
  'LGC-SCR-111__guest-history.png': {
    from: 'guest',
    clicks: [{ clickAria: 'История' }],
    waitText: 'История',
  },
  'LGC-SCR-111__date-filtered.png': {
    url: '/legacy/history',
    waitText: 'История',
    steps: [{ clickAria: 'Календарь' }, { clickText: 'Применить' }],
  },
  'CAS-HIST-001__calendar.png': {
    url: '/legacy/history',
    waitText: 'История',
    steps: [{ clickAria: 'Календарь' }],
  },
  'CAS-HIST-001__calendar-selected.png': {
    url: '/legacy/history',
    waitText: 'История',
    steps: [{ clickAria: 'Календарь' }, { clickText: 'Текущий' }],
  },
  'CAS-HIST-002__action-sheet.png': {
    url: '/legacy/history',
    waitText: 'История',
    steps: [{ clickText: 'Вывод на карту' }],
  },
  'CAS-HIST-002__action-sheet-guest.png': {
    from: 'guest',
    clicks: [{ clickAria: 'История' }],
    waitText: 'История',
    steps: [{ clickText: 'Вывод' }],
  },
  'LGC-SCR-113__filter.png': { url: '/legacy/history/filter', waitText: 'Фильтр' },
  'LGC-SCR-113__filter-selected.png': {
    url: '/legacy/history/filter',
    waitText: 'Фильтр',
    steps: [{ clickText: 'Вывод' }],
  },
  'LGC-SCR-113__filter-empty-result.png': {
    url: '/legacy/history/filter',
    waitText: 'Фильтр',
    steps: [{ clickText: 'Пополнение' }, { clickText: 'Применить' }],
  },
  'LGC-SCR-115__processing-detail.png': { url: '/legacy/history/in-yubet', waitText: 'обработ' },
  'LGC-SCR-115__success-detail.png': { url: '/legacy/history/in-cashhello', waitText: 'Успешн' },
  'LGC-SCR-115__cancel-confirmation.png': {
    url: '/legacy/history/in-yubet',
    waitText: 'обработ',
    steps: [{ clickText: 'Отменить' }],
  },
  'LGC-SCR-115__cancelled-rejected.png': {
    url: '/legacy/history/in-yubet',
    waitText: 'обработ',
    steps: [{ clickText: 'Отменить' }, { clickText: 'Отменить' }],
  },
  'LGC-SCR-120__receipt.png': { url: '/legacy/history/wd-card/receipt', waitText: 'Чек' },
  'LGC-SCR-120__receipt-out.png': { url: '/legacy/history/out-ubet/receipt', waitText: 'Чек' },

  'QR-001__qr-entry.png': { url: '/legacy/qr', waitText: 'QR' },
  'QR-001__amount-filled.png': {
    url: '/legacy/qr',
    waitText: 'QR',
    steps: [{ typeAriaContains: 'Сумма', text: '1500' }],
  },
  'QR-001__generated.png': {
    url: '/legacy/qr',
    waitText: 'QR',
    steps: [{ typeAriaContains: 'Сумма', text: '1500' }, { clickText: 'Сгенерировать QR' }],
  },
  'QR-001__reset.png': {
    url: '/legacy/qr',
    waitText: 'QR',
    steps: [
      { typeAriaContains: 'Сумма', text: '1500' },
      { clickText: 'Сформировать' },
      { clickText: 'Новая' },
    ],
  },
  'QR-001__guest-filled.png': {
    from: 'guest',
    clicks: [{ clickAria: 'QR' }],
    waitText: 'QR',
    steps: [{ typeAriaContains: 'Сумма', text: '1500' }],
  },
};
