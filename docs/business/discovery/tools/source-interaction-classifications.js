/**
 * Manual classification rules for auto-scanned source interactions.
 * Scan output is automatic; this table classifies each candidate.
 */
const { scanKey } = require('./source-interaction-scan');

/** @type {Record<string, { mapping_status: string, catalog_action_id?: string|null, notes?: string|null }>} */
const EXPLICIT = {
  'src/features/legacyTopup/MethodSheetScreen.tsx:56:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-TOP-S03',
    notes: 'Close (X)',
  },
  'src/features/legacyTopup/MethodSheetScreen.tsx:104:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-TOP-S04',
    notes: 'Backdrop dismiss',
  },
  'src/features/legacyHome/WithdrawSelectSheet.tsx:51:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-WD-S05',
    notes: 'Backdrop dismiss',
  },
  'src/features/legacyHome/WithdrawSelectSheet.tsx:67:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-WD-S04',
    notes: 'Close (X)',
  },
  'src/features/legacyPayment/PaymentCategorySheet.tsx:28:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-PAY-10',
    notes: 'Backdrop dismiss',
  },
  'src/features/legacyPayment/PaymentCategorySheet.tsx:49:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-PAY-09',
    notes: 'Close (X)',
  },
  'src/features/legacyPayment/PaymentCategorySheet.tsx:67:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-PAY-08',
    notes: 'Category select row',
  },
  'src/features/legacyHome/LegacyTabBar.tsx:59:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-TAB-01',
    notes: 'Left tabs (home + payment)',
  },
  'src/features/legacyHome/LegacyTabBar.tsx:81:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-TAB-04',
    notes: 'Right tabs (history + profile)',
  },
  'src/features/legacyHome/HomeScreen.tsx:328:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-HOME-G06',
    notes: 'Payments segment tabs',
  },
  'src/features/legacyHome/HomeScreen.tsx:201:onProfilePress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-HOME-G02',
    notes: 'Profile avatar',
  },
  'src/features/legacyAuth/screens/RegisterIinView.tsx:37:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-AUTH-01',
    notes: 'Submit phone (loginAction)',
  },
  'src/features/legacyAuth/screens/RegisterIinView.tsx:32:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-AUTH-05',
    notes: 'Back/close/home brand',
  },
  'src/features/legacyAuth/screens/RegisterIinView.tsx:36:onClose': {
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-AUTH-05',
    notes: 'Same as back',
  },
  'src/features/legacyWithdraw/LoadingWithdrawScreen.tsx:153:onClose': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-WD-05',
    notes: 'Done/close after withdraw',
  },
  'src/features/legacyProfile/ProfileConfirmSheet.tsx:58:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-PROF-07',
    notes: 'Confirm action (logout or delete — runtime context)',
  },
  'src/features/legacyProfile/ProfileConfirmSheet.tsx:40:onPress': {
    mapping_status: 'MAPPED',
    catalog_action_id: 'NEW-ACT-PROF-10',
    notes: 'Backdrop cancel',
  },
  'src/features/legacyProfile/ProfileConfirmSheet.tsx:68:onPress': {
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-PROF-10',
    notes: 'Cancel button same as backdrop',
  },
};

/**
 * @typedef {{ fileSuffix: string, interaction_kind?: string|RegExp, handlerIncludes?: string|string[], handlerMatch?: RegExp, handlerExcludes?: string|string[], mapping_status: string, catalog_action_id?: string|null, notes?: string }} PatternRule
 * @type {PatternRule[]}
 */
const PATTERN_RULES = [
  // Tab bar
  { fileSuffix: 'LegacyTabBar.tsx', handlerIncludes: 'hrefFor', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-TAB-01', notes: 'Tab navigation (home/payment/history/profile)' },
  { fileSuffix: 'LegacyTabBar.tsx', handlerIncludes: 'HOME_BRIDGES.qr', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-TAB-03' },
  { fileSuffix: 'LegacyTabBar.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Tab shell passthrough' },
  { fileSuffix: 'LegacyTabBar.tsx', interaction_kind: 'router.replace', mapping_status: 'UI_LOCAL', notes: 'go() tab helper' },
  // Support
  { fileSuffix: 'SupportContactHost.tsx', handlerIncludes: 'setSupportOpen', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-SUP-01' },
  { fileSuffix: 'SupportContactFab.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'FAB shell passthrough' },
  { fileSuffix: 'SupportContactSheet.tsx', handlerIncludes: 'telegram', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-SUP-02' },
  { fileSuffix: 'SupportContactSheet.tsx', handlerIncludes: 'whatsapp', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-SUP-03' },
  { fileSuffix: 'SupportContactSheet.tsx', handlerIncludes: 'onClose', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-SUP-04' },
  { fileSuffix: 'SupportContactSheet.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Sheet row shell' },
  // Home
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'navigateHome', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-G01' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'setBalancesHidden', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-G03' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'onTopup', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-G04' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'onWithdraw', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-G05' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: "setPaymentsTab('recent')", mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-G06' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: "setPaymentsTab('all')", mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-A03' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: "setPaymentsTab('history')", mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-A04' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'go(HOME_BRIDGES.login)', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-G10' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'recentOperationPaymentHref', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-A05' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'onProfilePress', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HOME-G02' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'HOME_HISTORY_LINK_FILTER_ALIAS', mapping_status: 'UI_LOCAL', notes: 'DebugMeta jump' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: "router.replace('/legacy/home')", mapping_status: 'UI_LOCAL', notes: 'DebugMeta jump' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: 'enterGuest', mapping_status: 'UI_LOCAL', notes: 'DebugMeta jump' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: "router.replace('/legacy/auth')", mapping_status: 'UI_LOCAL', notes: 'DebugMeta jump' },
  { fileSuffix: 'HomeScreen.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Home shell passthrough' },
  { fileSuffix: 'HomeScreen.tsx', interaction_kind: 'router.push', mapping_status: 'UI_LOCAL', notes: 'go() navigation helper' },
  { fileSuffix: 'HomeIcons.tsx', mapping_status: 'UI_LOCAL', notes: 'Presentational home icons' },
  // Topup sheet + flows
  { fileSuffix: 'MethodSheetScreen.tsx', handlerIncludes: 'TOPUP_BRIDGES.between', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-TOP-S01' },
  { fileSuffix: 'MethodSheetScreen.tsx', handlerIncludes: 'TOPUP_BRIDGES.card', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-TOP-S02' },
  { fileSuffix: 'MethodSheetScreen.tsx', handlerIncludes: 'onBack', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-TOP-S03' },
  { fileSuffix: 'MethodSheetScreen.tsx', interaction_kind: 'router.push', mapping_status: 'UI_LOCAL', notes: 'go() helper guest/path wiring' },
  { fileSuffix: 'MethodSheetScreen.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Sheet shell' },
  { fileSuffix: 'BetweenAccountsScreen.tsx', handlerIncludes: 'confirmBetween', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-TOP-01' },
  { fileSuffix: 'BetweenAccountsScreen.tsx', handlerIncludes: 'fillAll', mapping_status: 'UI_LOCAL', notes: 'Fill amount helper' },
  { fileSuffix: 'BetweenAccountsScreen.tsx', handlerIncludes: 'setPicker', mapping_status: 'UI_LOCAL', notes: 'Account picker local UI' },
  { fileSuffix: 'BetweenAccountsScreen.tsx', handlerIncludes: 'navigateHome', mapping_status: 'UI_LOCAL', notes: 'Header home brand' },
  { fileSuffix: 'BetweenAccountsScreen.tsx', handlerIncludes: 'profileHref', mapping_status: 'UI_LOCAL', notes: 'Header profile avatar' },
  { fileSuffix: 'BetweenAccountsScreen.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Primary button shell' },
  { fileSuffix: 'ExternalCardScreen.tsx', handlerIncludes: 'confirmCardTopUp', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-TOP-02' },
  { fileSuffix: 'ExternalCardScreen.tsx', handlerIncludes: 'setPicker', mapping_status: 'UI_LOCAL', notes: 'Local picker UI' },
  { fileSuffix: 'ExternalCardScreen.tsx', handlerIncludes: 'navigateHome', mapping_status: 'UI_LOCAL', notes: 'Header navigation' },
  // Withdraw sheet + flows
  { fileSuffix: 'WithdrawSelectSheet.tsx', handlerIncludes: 'WITHDRAW_BRIDGES.card', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-S01' },
  { fileSuffix: 'WithdrawSelectSheet.tsx', handlerIncludes: 'WITHDRAW_BRIDGES.phone', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-S02' },
  { fileSuffix: 'WithdrawSelectSheet.tsx', handlerIncludes: 'cashhelloUser', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-S03' },
  { fileSuffix: 'WithdrawSelectSheet.tsx', handlerIncludes: 'onClose', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-S04' },
  { fileSuffix: 'WithdrawSelectSheet.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Sheet shell' },
  { fileSuffix: 'WithdrawSelectSheet.tsx', interaction_kind: 'router.push', mapping_status: 'UI_LOCAL', notes: 'go() guest gate wiring' },
  { fileSuffix: 'CardWithdrawScreen.tsx', handlerIncludes: 'setTransferring', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-01' },
  { fileSuffix: 'CardWithdrawScreen.tsx', handlerIncludes: 'WITHDRAW_BRIDGES.loading', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-01' },
  { fileSuffix: 'PhoneFormWithdrawScreen.tsx', handlerIncludes: 'lookupRecipient', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-03' },
  { fileSuffix: 'PhoneFormWithdrawScreen.tsx', handlerIncludes: 'setTransferring', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-04', notes: 'P2P send submit' },
  { fileSuffix: 'PhoneFormWithdrawScreen.tsx', handlerIncludes: 'WITHDRAW_BRIDGES.loading', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-02', notes: 'Phone withdraw submit' },
  { fileSuffix: 'LoadingWithdrawScreen.tsx', handlerIncludes: '/legacy/home', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-05' },
  { fileSuffix: 'WithdrawSuccessReceipt.tsx', handlerIncludes: 'onDone', mapping_status: 'UI_LOCAL', notes: 'Receipt dismiss' },
  { fileSuffix: 'WithdrawSuccessReceipt.tsx', handlerIncludes: 'onClose', mapping_status: 'UI_LOCAL', notes: 'Receipt close' },
  { fileSuffix: 'WithdrawSuccessReceipt.tsx', handlerIncludes: 'shareMock', mapping_status: 'UI_LOCAL', notes: 'Mock share' },
  // Payment
  { fileSuffix: 'PaymentScreen.tsx', interaction_kind: 'onChangeText', handlerIncludes: 'setQuery', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-03' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: 'setCategoryOpen', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-01' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: 'onService', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-02' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: 'PAYMENT_BRIDGES.service', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-02' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: 'setTab', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-04' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: 'toggleSection', mapping_status: 'UI_LOCAL', notes: 'Catalog section expand/collapse' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: 'homeHref', mapping_status: 'UI_LOCAL', notes: 'Header navigation' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: 'profileHref', mapping_status: 'UI_LOCAL', notes: 'Header profile' },
  { fileSuffix: 'PaymentScreen.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Payment shell passthrough' },
  { fileSuffix: 'PaymentCategorySheet.tsx', handlerIncludes: 'onSelect', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-08' },
  { fileSuffix: 'PaymentCategorySheet.tsx', handlerIncludes: 'onClose', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-09' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'setAccountPickerOpen(true)', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-07' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'canPay', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-05' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'paying', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-05' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'toggleFavorite', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PAY-06' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'setAccountPickerOpen(false)', mapping_status: 'UI_LOCAL', notes: 'Dismiss account picker' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'navigateHome', mapping_status: 'UI_LOCAL', notes: 'Header navigation' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'profileHref', mapping_status: 'UI_LOCAL', notes: 'Header profile' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'PAYMENT_BRIDGES.root', mapping_status: 'UI_LOCAL', notes: 'Header back' },
  { fileSuffix: 'PaymentServiceScreen.tsx', handlerIncludes: 'homeHref', mapping_status: 'UI_LOCAL', notes: 'Header home' },
  // Profile
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'PROFILE_BRIDGES.status', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-01' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'togglePush', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-02' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'PROFILE_BRIDGES.pin', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-03' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'documentsStub', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-04' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: "'logout'", mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-05' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: "'delete'", mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-06' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'applyPromo', mapping_status: 'UI_LOCAL', notes: 'Promo code local input' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'navigateHome', mapping_status: 'UI_LOCAL', notes: 'Header home brand' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'PROFILE_BRIDGES.auth', mapping_status: 'UI_LOCAL', notes: 'Auth redirect wiring' },
  { fileSuffix: 'ProfileScreen.tsx', handlerIncludes: 'guestHome', mapping_status: 'UI_LOCAL', notes: 'Guest redirect wiring' },
  { fileSuffix: 'ProfileConfirmSheet.tsx', handlerIncludes: 'onConfirm', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-07', notes: 'Confirm action' },
  { fileSuffix: 'ProfileConfirmSheet.tsx', handlerIncludes: 'onCancel', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-10', notes: 'Cancel action' },
  { fileSuffix: 'ChangePinScreen.tsx', interaction_kind: 'onPress', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-08' },
  { fileSuffix: 'IdentificationStatusScreen.tsx', handlerIncludes: 'onBack', mapping_status: 'UI_LOCAL', notes: 'Back navigation' },
  { fileSuffix: 'IdentificationStatusScreen.tsx', handlerIncludes: 'expandLimits', mapping_status: 'UI_LOCAL', notes: 'KYC stub alert' },
  { fileSuffix: 'IdentificationStatusScreen.tsx', handlerIncludes: 'navigateHome', mapping_status: 'UI_LOCAL', notes: 'Header navigation' },
  { fileSuffix: 'ProfileIcons.tsx', mapping_status: 'UI_LOCAL', notes: 'Presentational profile icons' },
  // Auth normal + prototype
  { fileSuffix: 'RegisterIinView.tsx', handlerIncludes: 'loginAction', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-AUTH-01' },
  { fileSuffix: 'RegisterIinView.tsx', handlerIncludes: 'exitAuthToGuestHome', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-AUTH-05' },
  { fileSuffix: 'PhoneView.tsx', handlerIncludes: 'onSubmit', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-AUTH-02' },
  { fileSuffix: 'PhoneView.tsx', handlerIncludes: 'goHome', mapping_status: 'UI_LOCAL', notes: 'Auth home escape' },
  { fileSuffix: 'PhoneView.tsx', handlerIncludes: 'focus()', mapping_status: 'UI_LOCAL', notes: 'OTP input focus' },
  { fileSuffix: 'NumericKeypad.tsx', interaction_kind: 'onPress', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-AUTH-03', notes: 'PIN keypad digit/delete' },
  { fileSuffix: 'PhoneFormWithdrawScreen.tsx', interaction_kind: 'onChangeText', handlerIncludes: 'parseKzPhoneInput', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-WD-03', notes: 'P2P phone lookup on input' },
  { fileSuffix: 'PinView.tsx', handlerIncludes: 'PIN_DIGIT', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-AUTH-03' },
  { fileSuffix: 'PinView.tsx', handlerIncludes: 'complete', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-AUTH-04' },
  { fileSuffix: 'PinView.tsx', interaction_kind: 'onDigit', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-AUTH-03' },
  { fileSuffix: 'PinView.tsx', interaction_kind: 'onDelete', mapping_status: 'DUPLICATE_BEHAVIOR', catalog_action_id: 'NEW-ACT-AUTH-03' },
  { fileSuffix: 'PinView.tsx', handlerIncludes: 'goHome', mapping_status: 'UI_LOCAL', notes: 'Auth home escape' },
  { fileSuffix: 'ChangePinScreen.tsx', interaction_kind: 'onDigit', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-PROF-08' },
  { fileSuffix: 'ChangePinScreen.tsx', interaction_kind: 'onDelete', mapping_status: 'DUPLICATE_BEHAVIOR', catalog_action_id: 'NEW-ACT-PROF-08' },
  { fileSuffix: 'LegacyInput.tsx', mapping_status: 'UI_LOCAL', notes: 'Auth input component' },
  { fileSuffix: 'LegacyAuthRoute.tsx', mapping_status: 'UI_LOCAL', notes: 'Auth flow controller / dev jumps' },
  { fileSuffix: 'CompleteView.tsx', mapping_status: 'UI_LOCAL', notes: 'KYC prototype' },
  { fileSuffix: 'FaceFallbackView.tsx', mapping_status: 'UI_LOCAL', notes: 'KYC prototype' },
  // History
  { fileSuffix: 'HistoryScreen.tsx', handlerIncludes: 'setCalendarOpen', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HIST-01' },
  { fileSuffix: 'HistoryScreen.tsx', handlerIncludes: 'setActionOp', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HIST-02' },
  { fileSuffix: 'HistoryScreen.tsx', handlerIncludes: 'HISTORY_BRIDGES.filter', mapping_status: 'UI_LOCAL', notes: 'Debug filter route jump' },
  { fileSuffix: 'HistoryScreen.tsx', handlerIncludes: 'homeHref', mapping_status: 'UI_LOCAL', notes: 'Header home navigation' },
  { fileSuffix: 'HistoryScreen.tsx', handlerIncludes: 'HISTORY_BRIDGES.detail', mapping_status: 'UI_LOCAL', notes: 'Debug detail jumps' },
  { fileSuffix: 'HistoryScreen.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'History row shell' },
  { fileSuffix: 'HistoryScreen.tsx', interaction_kind: 'router.push', mapping_status: 'UI_LOCAL', notes: 'go() helper / guest gate wiring' },
  { fileSuffix: 'HistoryActionSheet.tsx', handlerIncludes: 'onRepeat', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HIST-03' },
  { fileSuffix: 'HistoryActionSheet.tsx', handlerIncludes: 'onShareReceipt', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HIST-04' },
  { fileSuffix: 'HistoryActionSheet.tsx', handlerIncludes: 'onClose', mapping_status: 'UI_LOCAL', notes: 'Dismiss action sheet' },
  { fileSuffix: 'HistoryActionSheet.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Sheet row shell' },
  { fileSuffix: 'HistoryDateSheet.tsx', handlerIncludes: 'onApply', mapping_status: 'UI_LOCAL', notes: 'Date filter apply (local state → list filter)' },
  { fileSuffix: 'HistoryDateSheet.tsx', handlerIncludes: 'onSelectDay', mapping_status: 'UI_LOCAL', notes: 'Calendar day pick' },
  { fileSuffix: 'HistoryDateSheet.tsx', handlerIncludes: 'goMonth', mapping_status: 'UI_LOCAL', notes: 'Calendar month nav' },
  { fileSuffix: 'HistoryDateSheet.tsx', handlerIncludes: 'onClose', mapping_status: 'UI_LOCAL', notes: 'Dismiss date sheet' },
  { fileSuffix: 'HistoryDateSheet.tsx', handlerIncludes: 'setFrom', mapping_status: 'UI_LOCAL', notes: 'Clear date range' },
  { fileSuffix: 'HistoryOpTypeSheet.tsx', mapping_status: 'UI_LOCAL', notes: 'Op type filter sheet (local UI)' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: 'HISTORY_BRIDGES.receipt', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-HIST-05' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: 'onBack', mapping_status: 'UI_LOCAL', notes: 'Back navigation' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: 'mockShare', mapping_status: 'UI_LOCAL', notes: 'Mock share alert' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: 'mockHelp', mapping_status: 'UI_LOCAL', notes: 'Mock help alert' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: 'setCancelOpen', mapping_status: 'UI_LOCAL', notes: 'Cancel-op sheet local UI' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: 'onCancelConfirm', mapping_status: 'UI_LOCAL', notes: 'Mock cancel confirm' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: 'HISTORY_BRIDGES.root', mapping_status: 'UI_LOCAL', notes: 'Header navigation' },
  { fileSuffix: 'OperationDetailsScreen.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Shell passthrough' },
  { fileSuffix: 'ReceiptScreen.tsx', handlerIncludes: 'mockShare', mapping_status: 'UI_LOCAL', notes: 'Mock share' },
  { fileSuffix: 'ReceiptScreen.tsx', handlerIncludes: 'mockDownload', mapping_status: 'UI_LOCAL', notes: 'Mock download' },
  { fileSuffix: 'ReceiptScreen.tsx', handlerIncludes: 'onBack', mapping_status: 'UI_LOCAL', notes: 'Back navigation' },
  { fileSuffix: 'ReceiptScreen.tsx', handlerIncludes: 'HISTORY_BRIDGES.root', mapping_status: 'UI_LOCAL', notes: 'Header navigation' },
  { fileSuffix: 'HistoryRow.tsx', handlerIncludes: '{onPress}', mapping_status: 'UI_LOCAL', notes: 'Presentational history row' },
  // QR
  { fileSuffix: 'ReceiveQrScreen.tsx', handlerIncludes: 'onGenerate', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-QR-01' },
  { fileSuffix: 'ReceiveQrScreen.tsx', handlerIncludes: 'onNewAmount', mapping_status: 'MAPPED', catalog_action_id: 'NEW-ACT-QR-02' },
  { fileSuffix: 'ReceiveQrScreen.tsx', handlerIncludes: 'homeHref', mapping_status: 'UI_LOCAL', notes: 'Header navigation' },
  { fileSuffix: 'ReceiveQrScreen.tsx', handlerIncludes: 'profileHref', mapping_status: 'UI_LOCAL', notes: 'Header profile' },
  { fileSuffix: 'ReceiveQrScreen.tsx', handlerIncludes: 'HOME_BRIDGES.login', mapping_status: 'UI_LOCAL', notes: 'Guest login gate wiring' },
  // Shared presentational / navigation helpers
  { fileSuffix: 'PaymentMethodRow.tsx', mapping_status: 'UI_LOCAL', notes: 'Presentational row' },
  { fileSuffix: 'WithdrawMethodRow.tsx', mapping_status: 'UI_LOCAL', notes: 'Presentational row' },
  { fileSuffix: 'AccountSelector.tsx', mapping_status: 'UI_LOCAL', notes: 'Presentational selector' },
  { fileSuffix: 'AmountInput.tsx', mapping_status: 'UI_LOCAL', notes: 'Presentational amount input' },
  { fileSuffix: 'session.ts', mapping_status: 'UI_LOCAL', notes: 'Session navigation helper' },
  { fileSuffix: 'safeBack.ts', mapping_status: 'UI_LOCAL', notes: 'Safe back navigation helper' },
];

const ORPHAN_SOURCE_SUFFIXES = [
  'AmountWithdrawScreen.tsx',
  'MethodSelectScreen.tsx',
  'CashWithdrawScreen.tsx',
  'CashTopupScreen.tsx',
  'CashMapScreen.tsx',
  'CashMapWithdrawScreen.tsx',
  'FilterScreen.tsx',
  'AccountsListScreen.tsx',
  'AccountDetailScreen.tsx',
  'CardScreen.tsx',
  'LimitsScreen.tsx',
  'CardPinScreen.tsx',
  'MessagesScreen.tsx',
  'HelpScreen.tsx',
  'PersonalDataScreen.tsx',
  'ChangePhoneScreen.tsx',
  'ChangePhoneVerifyScreen.tsx',
  'SearchScreen.tsx',
  'GuestStubScreen.tsx',
];

/** @param {string} sourceFile */
function isOrphanSource(sourceFile) {
  return ORPHAN_SOURCE_SUFFIXES.some((s) => sourceFile.endsWith(s));
}

/** @param {string} sourceFile */
function isKycPrototypeSource(sourceFile) {
  return (
    /legacyAuth\/screens\/(Identity|Document|Selfie|Camera|Register|Onboarding)/.test(sourceFile) ||
    /legacyAuth\/components\/(CameraChrome|ConsentRow|DocumentFrame)/.test(sourceFile)
  );
}

/** @param {string} sourceFile */
function isAuthComponentSource(sourceFile) {
  return /legacyAuth\/components\//.test(sourceFile);
}

/** @param {PatternRule} rule @param {{ source_file: string, interaction_kind: string, handler: string }} row */
function matchesPattern(rule, row) {
  if (!row.source_file.endsWith(rule.fileSuffix)) return false;
  if (rule.interaction_kind && rule.interaction_kind !== row.interaction_kind) {
    if (!(rule.interaction_kind instanceof RegExp && rule.interaction_kind.test(row.interaction_kind))) return false;
  }
  if (rule.handlerIncludes) {
    const needles = Array.isArray(rule.handlerIncludes) ? rule.handlerIncludes : [rule.handlerIncludes];
    if (!needles.every((n) => row.handler.includes(n))) return false;
  }
  if (rule.handlerExcludes) {
    const banned = Array.isArray(rule.handlerExcludes) ? rule.handlerExcludes : [rule.handlerExcludes];
    if (banned.some((n) => row.handler.includes(n))) return false;
  }
  if (rule.handlerMatch && !rule.handlerMatch.test(row.handler)) return false;
  return true;
}

/** @type {WeakMap<object, object|null>} */
const memo = new WeakMap();

/**
 * @param {{ source_file: string, line: number, interaction_kind: string, handler: string }} row
 * @param {Array<{ source_file: string, line: number, interaction_kind: string, handler: string }>} allRows
 * @param {boolean} [skipRouterDedupe]
 */
function classifyInteraction(row, allRows, skipRouterDedupe = false) {
  if (memo.has(row)) return memo.get(row);

  /** @type {{ mapping_status: string, catalog_action_id?: string|null, notes?: string|null }|null} */
  let result = null;

  const key = scanKey(row);
  if (EXPLICIT[key]) {
    result = { ...EXPLICIT[key] };
    memo.set(row, result);
    return result;
  }

  for (const rule of PATTERN_RULES) {
    if (matchesPattern(rule, row)) {
      result = {
        mapping_status: rule.mapping_status,
        catalog_action_id: rule.catalog_action_id ?? null,
        notes: rule.notes ?? null,
      };
      memo.set(row, result);
      return result;
    }
  }

  if (isOrphanSource(row.source_file)) {
    result = { mapping_status: 'UI_LOCAL', catalog_action_id: null, notes: 'Orphan/unreachable route source file' };
    memo.set(row, result);
    return result;
  }
  if (isKycPrototypeSource(row.source_file)) {
    result = { mapping_status: 'UI_LOCAL', catalog_action_id: null, notes: 'KYC prototype path — PARKED_ILYA' };
    memo.set(row, result);
    return result;
  }
  if (isAuthComponentSource(row.source_file)) {
    result = { mapping_status: 'UI_LOCAL', catalog_action_id: null, notes: 'Auth presentational component handler' };
    memo.set(row, result);
    return result;
  }

  if (!skipRouterDedupe && row.interaction_kind.startsWith('router.')) {
    const nearby = allRows.find(
      (other) =>
        other.source_file === row.source_file &&
        other.interaction_kind === 'onPress' &&
        Math.abs(other.line - row.line) <= 8,
    );
    if (nearby) {
      const parentCls = classifyInteraction(nearby, allRows, true);
      if (parentCls?.mapping_status && parentCls.mapping_status !== 'UI_LOCAL') {
        result = {
          mapping_status: 'DUPLICATE_BEHAVIOR',
          catalog_action_id: parentCls.catalog_action_id ?? null,
          notes: `Router ${row.interaction_kind} nested in nearby onPress`,
        };
        memo.set(row, result);
        return result;
      }
      if (parentCls?.mapping_status === 'UI_LOCAL') {
        result = {
          mapping_status: 'UI_LOCAL',
          catalog_action_id: null,
          notes: `Router ${row.interaction_kind} nested in UI_LOCAL onPress`,
        };
        memo.set(row, result);
        return result;
      }
    }
  }

  if (['onClose', 'onCancel', 'onConfirm'].includes(row.interaction_kind)) {
    result = { mapping_status: 'UI_LOCAL', catalog_action_id: null, notes: 'Sheet/modal prop wiring' };
    memo.set(row, result);
    return result;
  }

  // Withdraw/topup screen local picker UI
  if (
    (row.source_file.endsWith('CardWithdrawScreen.tsx') ||
      row.source_file.endsWith('PhoneFormWithdrawScreen.tsx') ||
      row.source_file.endsWith('ExternalCardScreen.tsx')) &&
    (row.handler.includes('setAccountPickerOpen') ||
      row.handler.includes('setSaved') ||
      row.handler.includes('setScanOpen') ||
      row.handler.includes('navigateHome') ||
      row.handler.includes('profileHref'))
  ) {
    result = { mapping_status: 'UI_LOCAL', catalog_action_id: null, notes: 'Withdraw/topup form local UI' };
    memo.set(row, result);
    return result;
  }

  // Generic input/header wiring — local UI unless matched above
  if (['onChangeText', 'onBack', 'onProfilePress', 'onDigit', 'onDelete'].includes(row.interaction_kind)) {
    result = { mapping_status: 'UI_LOCAL', catalog_action_id: null, notes: 'Input/header wiring (local UI)' };
    memo.set(row, result);
    return result;
  }

  memo.set(row, null);
  return null;
}

/** Same source control, different runtime catalog action (logout vs delete sheets). */
const RUNTIME_DUPLICATE_MAPPINGS = [
  {
    scan_key: 'src/features/legacyHome/LegacyTabBar.tsx:59:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-TAB-02',
    notes: 'Payment tab shares left-side tab control',
  },
  {
    scan_key: 'src/features/legacyHome/LegacyTabBar.tsx:81:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-TAB-05',
    notes: 'Profile tab shares right-side tab control',
  },
  {
    scan_key: 'src/features/legacyHome/HomeScreen.tsx:328:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-HOME-G07',
    notes: 'Guest payments Все tab',
  },
  {
    scan_key: 'src/features/legacyHome/HomeScreen.tsx:328:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-HOME-G08',
    notes: 'Guest payments История tab',
  },
  {
    scan_key: 'src/features/legacyHome/HomeScreen.tsx:328:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-HOME-A03',
    notes: 'Authorized payments Все tab',
  },
  {
    scan_key: 'src/features/legacyHome/HomeScreen.tsx:328:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-HOME-A04',
    notes: 'Authorized payments История tab',
  },
  {
    scan_key: 'src/features/legacyHome/HomeScreen.tsx:291:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-HOME-A01',
    notes: 'Authorized top-up same control as guest',
  },
  {
    scan_key: 'src/features/legacyHome/HomeScreen.tsx:300:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-HOME-A02',
    notes: 'Authorized withdraw same control as guest',
  },
  {
    scan_key: 'src/features/legacyHome/HomeScreen.tsx:353:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-HOME-G09',
    notes: 'Guest recent operation row login gate',
  },
  {
    scan_key: 'src/features/legacyAuth/components/NumericKeypad.tsx:52:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-AUTH-04',
    notes: 'PIN login shares keypad with PIN create',
  },
  {
    scan_key: 'src/features/legacyAuth/components/NumericKeypad.tsx:52:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-PROF-08',
    notes: 'Change PIN shares auth NumericKeypad component',
  },
  {
    scan_key: 'src/features/legacyProfile/ProfileConfirmSheet.tsx:58:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-PROF-09',
    notes: 'Delete confirm shares onConfirm control with logout sheet',
  },
  {
    scan_key: 'src/features/legacyProfile/ProfileConfirmSheet.tsx:40:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-PROF-11',
    notes: 'Delete cancel backdrop shares onCancel with logout sheet',
  },
  {
    scan_key: 'src/features/legacyProfile/ProfileConfirmSheet.tsx:68:onPress',
    mapping_status: 'DUPLICATE_BEHAVIOR',
    catalog_action_id: 'NEW-ACT-PROF-11',
    notes: 'Delete cancel button shares onCancel with logout sheet',
  },
];

const SYNTHETIC_GAPS = [
  {
    interaction_id: 'SRC-SUP-GAP-01',
    source_file: 'src/features/legacyHome/SupportContactSheet.tsx',
    line: 0,
    interaction_kind: 'sheet_option',
    handler: 'NOT_IN_SOURCE',
    mapping_status: 'CURRENT_UI_GAP',
    catalog_action_id: 'NEW-ACT-SUP-GAP-01',
    notes: 'Owner target Q-SUPPORT-001 WA+TG+phone; phone row absent in current UI',
  },
  {
    interaction_id: 'SRC-PROF-GAP-01',
    source_file: 'src/features/legacyProfile/ProfileScreen.tsx',
    line: 0,
    interaction_kind: 'list_row',
    handler: 'NOT_IN_SOURCE',
    mapping_status: 'CURRENT_UI_GAP',
    catalog_action_id: 'NEW-ACT-PROF-GAP-01',
    notes: 'Phone read-only; /legacy/profile/phone routes exist but unlinked',
  },
];

module.exports = {
  EXPLICIT,
  PATTERN_RULES,
  SYNTHETIC_GAPS,
  RUNTIME_DUPLICATE_MAPPINGS,
  classifyInteraction,
};
