export type HistoryDirection = 'in' | 'out';
export type HistoryTone = 'yellow' | 'blue' | 'green' | 'red';

/** Exact late-UI list labels (Home / History rows). */
export type HistoryListStatus = 'В обработке' | 'Отклонено' | 'Готов к выдаче' | 'Успешно';

/**
 * Details badge for cash pickup uses a different exact string than the list.
 * Frame title: «Подготовлено к выдаче»; badge: «Готово к выдаче».
 */
export type HistoryDetailStatus =
  | HistoryListStatus
  | 'Готово к выдаче';

export type HistoryOpKind = 'withdrawal' | 'topup' | 'transfer' | 'cash_pickup' | 'phone' | 'card';

export type HistoryListIcon = 'card' | 'phone' | 'arrow' | 'ubet';

export type LegacyHistoryOp = {
  id: string;
  title: string;
  listStatus: HistoryListStatus;
  amount: number;
  currency: '₸' | '$';
  /** When true, amount string may include a leading minus as in Figma sample. */
  showMinus?: boolean;
  /** List amount unit word, e.g. «Тенге» for WD receipts. */
  amountUnit?: string;
  direction: HistoryDirection;
  /** Short list label (e.g. «Вывод на карту»). */
  directionLabel?: string;
  /** Optional second line under list title (e.g. phone). */
  listSubtitle?: string;
  /** Optional third list line (e.g. phone under partner name). */
  listDetail?: string;
  /** Put title + subtitle on one line (short suffixes like **42). */
  listInline?: boolean;
  tone: HistoryTone;
  amountEmphasis: boolean;
  kind: HistoryOpKind;
  listIcon?: HistoryListIcon;
  /** ISO date for filter (synthetic). */
  createdAt: string;
  accountId: string;
  accountMask: string;
  /** Debit account label on WD receipt («Счет ₸»). */
  fromLabel?: string;
  fee: number;
  receiptNumber: string;
  payerName: string;
  destination?: string;
  opType?: string;
  service?: string;
  dateLabel: string;
  timeLabel: string;
  /** Compact date for WD receipt («26.08.26 · 18:31»). */
  receiptDateLabel?: string;
  receiptEligible: boolean;
  cancellable: boolean;
  seed: boolean;
  /** Open WD-003 / WD-005 style receipt instead of legacy details sheet. */
  detailVariant?: 'withdraw_receipt' | 'legacy';
  /** Show «Повторить операцию» in the action sheet. */
  canRepeat?: boolean;
  /** Route for repeat (e.g. withdraw card/phone). */
  repeatHref?: string;
};

export const HISTORY_BRIDGES = {
  root: '/legacy/history',
  filter: '/legacy/history/filter',
  detail: (id: string) => `/legacy/history/${id}`,
  receipt: (id: string) => `/legacy/history/${id}/receipt`,
} as const;

export const FILTER_OP_TYPES = [
  { id: 'all', label: 'Все операции' },
  { id: 'withdrawal', label: 'Вывод' },
  { id: 'topup', label: 'Пополнение' },
] as const;

export const FILTER_ACCOUNTS = [
  { id: 'all', label: 'Все счета', mask: null as string | null },
  { id: 'kzt-primary', label: 'KZ31 · 2070', mask: 'KZ31 · 2070' },
  { id: 'rub', label: 'KZ44 · 1188', mask: 'KZ44 · 1188' },
  { id: 'usd', label: 'KZ66 · 6056', mask: 'KZ66 · 6056' },
] as const;

export const PERIOD_CHIPS = [
  { id: 'current', label: 'Текущий месяц' },
  { id: 'previous', label: 'Предыдущий месяц' },
  { id: 'custom', label: 'Период' },
] as const;

export const SYNTHETIC_PAYER = 'Керейдин А.Е.';

/**
 * Local History seed — WD receipts (26.08) + incoming demo (25.08).
 */
export const CANONICAL_HISTORY: LegacyHistoryOp[] = [
  {
    id: 'wd-phone',
    title: 'Вывод на баланс тел.',
    directionLabel: 'Вывод на баланс тел.',
    listSubtitle: '+7 (705) 234 68 87',
    listStatus: 'Успешно',
    amount: 1000,
    currency: '₸',
    amountUnit: 'Тенге',
    showMinus: true,
    direction: 'out',
    tone: 'green',
    amountEmphasis: true,
    kind: 'phone',
    listIcon: 'phone',
    createdAt: '2026-08-26T14:00:00.000Z',
    accountId: 'kzt-primary',
    accountMask: 'KZ31 · 2070',
    fromLabel: 'Счет ₸',
    fee: 30,
    receiptNumber: 'WD-005',
    payerName: SYNTHETIC_PAYER,
    destination: '+7 (705) 234 68 87',
    opType: 'Вывод на баланс телефона',
    service: 'Пополнение баланса телефона',
    dateLabel: '26.08.2026',
    timeLabel: '19:00:00',
    receiptDateLabel: '26.08.26 · 19:00',
    receiptEligible: true,
    cancellable: false,
    seed: true,
    detailVariant: 'withdraw_receipt',
    canRepeat: true,
    repeatHref: '/legacy/withdraw/phone',
  },
  {
    id: 'wd-card',
    title: 'Вывод на карту',
    directionLabel: 'Вывод на карту',
    listSubtitle: '**42',
    listInline: true,
    listStatus: 'Успешно',
    amount: 100,
    currency: '₸',
    amountUnit: 'Тенге',
    showMinus: true,
    direction: 'out',
    tone: 'green',
    amountEmphasis: true,
    kind: 'card',
    listIcon: 'card',
    createdAt: '2026-08-26T13:31:00.000Z',
    accountId: 'kzt-primary',
    accountMask: 'KZ31 · 2070',
    fromLabel: 'Счет ₸',
    fee: 30,
    receiptNumber: 'WD-003',
    payerName: SYNTHETIC_PAYER,
    destination: '•••• 1242',
    opType: 'Вывод на карту',
    service: 'Вывод на банковскую карту',
    dateLabel: '26.08.2026',
    timeLabel: '18:31:00',
    receiptDateLabel: '26.08.26 · 18:31',
    receiptEligible: true,
    cancellable: false,
    seed: true,
    detailVariant: 'withdraw_receipt',
    canRepeat: true,
    repeatHref: '/legacy/withdraw/card',
  },
  {
    id: 'in-yubet',
    title: 'Ubet снятие с аккаунта',
    directionLabel: 'Ubet снятие с аккаунта',
    listStatus: 'Успешно',
    amount: 5000,
    currency: '₸',
    amountUnit: 'Тенге',
    direction: 'in',
    tone: 'green',
    amountEmphasis: true,
    kind: 'topup',
    createdAt: '2026-08-25T16:40:00.000Z',
    accountId: 'kzt-primary',
    accountMask: 'KZ31 · 2070',
    fromLabel: 'Счет ₸',
    fee: 0,
    receiptNumber: 'IN-YUBET-001',
    payerName: 'Ubet',
    destination: 'Счет ₸',
    opType: 'Пополнение',
    service: 'Ubet снятие с аккаунта',
    dateLabel: '25.08.2026',
    timeLabel: '21:40:00',
    receiptDateLabel: '25.08.26 · 21:40',
    receiptEligible: true,
    cancellable: false,
    seed: true,
    detailVariant: 'withdraw_receipt',
  },
  {
    id: 'out-ubet',
    title: 'Пополнение Ubet',
    directionLabel: 'Пополнение',
    listSubtitle: 'Ubet +77788177771',
    listStatus: 'Успешно',
    amount: 20000,
    currency: '₸',
    amountUnit: 'Тенге',
    showMinus: true,
    direction: 'out',
    tone: 'green',
    amountEmphasis: true,
    kind: 'withdrawal',
    createdAt: '2026-08-25T14:20:00.000Z',
    accountId: 'kzt-primary',
    accountMask: 'KZ31 · 2070',
    fromLabel: 'Счет ₸',
    fee: 0,
    receiptNumber: 'OUT-UBET-001',
    payerName: SYNTHETIC_PAYER,
    destination: '+77788177771',
    opType: 'Списание',
    service: 'Пополнение Ubet',
    dateLabel: '25.08.2026',
    timeLabel: '19:20:00',
    receiptDateLabel: '25.08.26 · 19:20',
    receiptEligible: true,
    cancellable: false,
    seed: true,
    detailVariant: 'withdraw_receipt',
    listIcon: 'ubet',
    canRepeat: true,
    repeatHref: '/legacy/stub/payment',
  },
  {
    id: 'in-cashhello',
    title: 'От пользователя',
    directionLabel: 'От пользователя',
    listSubtitle: 'Cashhello',
    listDetail: '+7 (705) 234 68 87',
    listStatus: 'Успешно',
    amount: 2500,
    currency: '₸',
    amountUnit: 'Тенге',
    direction: 'in',
    tone: 'green',
    amountEmphasis: true,
    kind: 'transfer',
    createdAt: '2026-08-25T12:15:00.000Z',
    accountId: 'kzt-primary',
    accountMask: 'KZ31 · 2070',
    fromLabel: 'Счет ₸',
    fee: 0,
    receiptNumber: 'IN-CH-001',
    payerName: 'Cashhello',
    destination: '+7 (705) 234 68 87',
    opType: 'Пополнение',
    service: 'Перевод от пользователя Cashhello',
    dateLabel: '25.08.2026',
    timeLabel: '17:15:00',
    receiptDateLabel: '25.08.26 · 17:15',
    receiptEligible: true,
    cancellable: false,
    seed: true,
    detailVariant: 'withdraw_receipt',
  },
];

function formatGroupedAmount(amount: number): string {
  return String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function formatHistoryAmount(op: LegacyHistoryOp): string {
  const unit = op.amountUnit ?? op.currency;
  const body = `${formatGroupedAmount(op.amount)} ${unit}`;
  return op.showMinus ? `−${body}` : body;
}

export function formatHistoryListAmount(op: LegacyHistoryOp): string {
  const body = `${formatGroupedAmount(op.amount)} ${op.currency}`;
  return op.showMinus ? `−${body}` : body;
}

export function detailStatusFor(op: LegacyHistoryOp): HistoryDetailStatus {
  if (op.listStatus === 'Готов к выдаче') return 'Готово к выдаче';
  return op.listStatus;
}

export function statusTone(status: HistoryListStatus): HistoryTone {
  switch (status) {
    case 'В обработке':
      return 'yellow';
    case 'Готов к выдаче':
      return 'blue';
    case 'Успешно':
      return 'green';
    case 'Отклонено':
      return 'red';
  }
}

export function cloneCanonicalHistory(): LegacyHistoryOp[] {
  return CANONICAL_HISTORY.map((op) => ({ ...op }));
}
