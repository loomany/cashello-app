/** Exact visible late-UI copy from live Figma (RECON-001.2). Do not polish. */

export const copy = {
  registerTitle: 'Авторизация',
  registerSupport: 'Мы проверим ваш номер телефона. Если аккаунта ещё нет — создадим его.',
  iin: 'ИИН',
  termsPrefix: 'Нажимая «Войти», вы соглашаетесь с условиями ',
  termsLink: 'пользовательского соглашения',
  next: 'Далее',
  haveAccount: 'У вас уже есть аккаунт?',
  login: ' Войти',
  loginAction: 'Войти',
  skip: 'Пропустить',
  faceInstruction: 'Держите лицо внутри рамки ',
  cancel: 'Отмена',
  faceFailTitle: 'Лицо не распознано',
  faceFailBody: 'Пожалуйста, отсканируйте  удостоверение личности или паспорт',
  faceFailAction: 'Сканировать',
  documentFront: 'Сканируйте лицевую сторону УДВ',
  documentBack: 'Сканируйте заднюю сторону УДВ',
  documentWait: 'Пожалуйста, подождите',
  phoneTitle: 'Введите номер телефона',
  phoneLabel: 'Номер телефона',
  smsTitle: 'Введите код',
  smsSupportLine1: 'Код отправлен в WhatsApp',
  smsSupportLine2Prefix: 'на номер ',
  smsSupportPrefix: 'Код отправлен в WhatsApp на номер ',
  smsSupport: 'Код отправлен в WhatsApp на номер +7 777 777 77 77',
  smsResend: 'Отправить повторно через 00:34',
  pinCreateTitle: 'Придумайте код доступа',
  pinCreateSupport: 'Используется для входа в приложение',
  pinRepeatTitle: 'Повторите код доступа',
  pinRepeatSupport: 'Используется для входа в приложение',
  pinErrorMessage: 'Код доступа не совпадают',
  pinLoginTitle: 'Введите код доступа',
  pinForgot: 'Забыл код доступа',
  completeTitle: 'Готово',
  completeSupport:
    'Реконструкция регистрации завершена. Главная Cashello — задача RECON-002. Это не PayDala Home.',
  restart: 'Начать сначала',
} as const;

/** Alias used by Home guest CTA and other non-auth screens. */
export const authCopy = copy;

export const onboardingPages = [
  {
    title: 'Выводи деньги легко',
    body: 'Выбирай любой удобный способ и выводи деньги прямо в приложении.',
    art: require('../../../assets/legacy/auth/onboarding-1.png') as number,
  },
  {
    title: 'Пользуйся разными способами вывода',
    body: 'Переводи деньги на карту, номер телефона, наличными и другие счета.',
    art: require('../../../assets/legacy/auth/onboarding-2.png') as number,
  },
  {
    title: 'Управляй счетами в приложении',
    body: 'Создавай несколько счетов и управляй операциями для каждого.',
    art: require('../../../assets/legacy/auth/onboarding-3.png') as number,
  },
] as const;
