export type CurrencyCode = 'KZT' | 'USD' | 'RUB';
export type MoneyUnit = CurrencyCode | 'BONUS';
export type VerificationStatus = 'LIGHT' | 'FULL';

export type TransactionType =
  | 'top_up'
  | 'withdrawal'
  | 'p2p'
  | 'bookmaker_payout'
  | 'service_payment'
  | 'cashback'
  | 'currency_conversion';

/**
 * Conceptual prototype statuses. Not production ledger enums.
 */
export type TransactionStatus =
  | 'pending'
  | 'processing'
  | 'success'
  | 'failed'
  | 'rejected'
  | 'ready_for_pickup';

export type PaymentMethodKind = 'wallet' | 'kaspi' | 'linked_card';

export type ServiceCategoryId = 'cat_bookmakers' | 'cat_mfo' | 'cat_digital_goods' | 'cat_mobile';

/**
 * Prototype display economics copied from owner Freebee references.
 * NOT approved PayDala production rates (Q-025).
 */
export type MockEconomics = {
  source: 'owner_freebee_reference';
  mock: true;
  kind: 'topup_bonus_percent' | 'topup_commission_percent';
  percent: number;
  caption: string;
};

export type UserProfile = {
  id: string;
  displayName: string;
  phone: string;
  email: string;
  city: string;
  verificationStatus: VerificationStatus;
};

export type WalletAccount = {
  id: string;
  currency: CurrencyCode;
  availableMinor: number;
};

export type BonusAccount = {
  id: string;
  balanceMinor: number;
};

export type PayDalaCard = {
  id: string;
  last4: string;
  expiry: string;
  status: 'active' | 'blocked';
  boundAccountId: string;
};

export type LinkedBankCard = {
  id: string;
  bankName: string;
  last4: string;
  expiry: string;
  status: 'active' | 'blocked';
};

export type ServiceCategory = {
  id: ServiceCategoryId;
  name: string;
};

export type ServiceEconomics = {
  method: PaymentMethodKind;
  feeMinor: number | null;
  cashbackMinor: number | null;
};

export type CatalogService = {
  id: string;
  categoryId: ServiceCategoryId;
  name: string;
  supportedMethods: PaymentMethodKind[];
  economics: ServiceEconomics[];
  mockEconomics: MockEconomics | null;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  amountMinor: number;
  currency: MoneyUnit;
  title: string;
  subtitle: string;
  createdAt: string;
  accountId?: string;
};

export type MockSnapshot = {
  user: UserProfile;
  accounts: WalletAccount[];
  bonus: BonusAccount;
  /**
   * Director-demo headline in KZT. Not a live FX conversion (Q-022).
   */
  headlineKztMinor: number;
  paydalaCard: PayDalaCard;
  linkedCards: LinkedBankCard[];
  categories: ServiceCategory[];
  services: CatalogService[];
  transactions: Transaction[];
};

export type SelectedAccountId = WalletAccount['id'] | 'all';
