import type { CatalogService, MockEconomics, PaymentMethodKind, ServiceCategory } from '@/types/domain';

/**
 * DEMO CONTENT — not a product-rule catalog.
 *
 * Service names and percentages come from owner-provided Freebee references
 * for the prototype. They are NOT approved PayDala production economics (Q-025).
 *
 * Product rule (separate): the catalog supports categories and per-method
 * economics. Concrete names and rates below are mock display data only.
 */
export const MOCK_ECONOMICS_SOURCE = 'owner_freebee_reference' as const;

export const DEMO_CATEGORIES: ServiceCategory[] = [
  { id: 'cat_bookmakers', name: 'Bookmakers' },
  { id: 'cat_mfo', name: 'MFO' },
  { id: 'cat_digital_goods', name: 'Digital goods' },
  { id: 'cat_mobile', name: 'Mobile' },
];

/** Home strip order. First three are the primary bookmaker services. */
export const HOME_SERVICE_IDS = [
  'svc_ubet',
  'svc_oinabet',
  'svc_tennisi',
  'svc_fonbet',
  'svc_1xbet',
  'svc_parimatch',
  'svc_zaimer',
  'svc_creditbar',
  'svc_icredit',
  'svc_kengo',
  'svc_satcredit',
  'svc_steam',
  'svc_beeline',
  'svc_altel',
  'svc_activ',
  'svc_kcell',
  'svc_tele2',
  'svc_izi',
] as const;

const METHODS: PaymentMethodKind[] = ['wallet', 'kaspi', 'linked_card'];

function nullEconomics() {
  return METHODS.map((method) => ({ method, feeMinor: null, cashbackMinor: null }));
}

function bonus(percent: number, caption: string): MockEconomics {
  return {
    source: MOCK_ECONOMICS_SOURCE,
    mock: true,
    kind: 'topup_bonus_percent',
    percent,
    caption,
  };
}

function commission(percent: number, caption: string): MockEconomics {
  return {
    source: MOCK_ECONOMICS_SOURCE,
    mock: true,
    kind: 'topup_commission_percent',
    percent,
    caption,
  };
}

function service(
  id: string,
  categoryId: CatalogService['categoryId'],
  name: string,
  mockEconomics: MockEconomics | null,
): CatalogService {
  return {
    id,
    categoryId,
    name,
    supportedMethods: METHODS,
    economics: nullEconomics(),
    mockEconomics,
  };
}

const BOOKMAKER_BONUS = bonus(2, 'Бонус за пополнение +2%');

export const DEMO_SERVICES: CatalogService[] = [
  service('svc_ubet', 'cat_bookmakers', 'Ubet', BOOKMAKER_BONUS),
  service('svc_oinabet', 'cat_bookmakers', 'Oinabet', BOOKMAKER_BONUS),
  service('svc_tennisi', 'cat_bookmakers', 'Tennisi', BOOKMAKER_BONUS),
  service('svc_fonbet', 'cat_bookmakers', 'Fonbet', BOOKMAKER_BONUS),
  service('svc_1xbet', 'cat_bookmakers', '1xbet', BOOKMAKER_BONUS),
  service('svc_parimatch', 'cat_bookmakers', 'Parimatch', BOOKMAKER_BONUS),
  service('svc_zaimer', 'cat_mfo', 'Робокэш/Займер', commission(2.5, 'Комиссия за пополнение -2.5%')),
  service('svc_creditbar', 'cat_mfo', 'CreditBar', commission(2.5, 'Комиссия за пополнение -2.5%')),
  service('svc_icredit', 'cat_mfo', 'i-credit.kz', commission(1.2, 'Комиссия за пополнение -1.2%')),
  service('svc_kengo', 'cat_mfo', 'Kengo', commission(1.4, 'Комиссия за пополнение -1.4%')),
  service('svc_satcredit', 'cat_mfo', 'Sat Credit', commission(4, 'Комиссия за пополнение -4%')),
  service('svc_steam', 'cat_digital_goods', 'Steam', null),
  service('svc_beeline', 'cat_mobile', 'Beeline', commission(2, 'Комиссия -2%')),
  service('svc_altel', 'cat_mobile', 'Altel', commission(2, 'Комиссия -2%')),
  service('svc_activ', 'cat_mobile', 'Activ', commission(2, 'Комиссия -2%')),
  service('svc_kcell', 'cat_mobile', 'Kcell', commission(2, 'Комиссия -2%')),
  service('svc_tele2', 'cat_mobile', 'Tele 2', commission(2, 'Комиссия -2%')),
  service('svc_izi', 'cat_mobile', 'izi', commission(2, 'Комиссия -2%')),
];
