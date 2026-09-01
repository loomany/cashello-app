import type { ImageSourcePropType } from 'react-native';

import { paymentCopy } from '@/features/legacyPayment/copy';

export type PaymentTab = 'all' | 'favorites';

export type PaymentCategoryId = 'all' | 'bookmakers' | 'digital' | 'mfo';

export type PaymentService = {
  id: string;
  name: string;
  logo: ImageSourcePropType;
  /** Brand tile behind the logo — matches baked-in logo background. */
  logoBackground: string;
  subtitle: string | null;
  available: boolean;
  favorite?: boolean;
};

export type PaymentSection = {
  id: string;
  title: string;
  items: PaymentService[];
};

export type PaymentServiceDraft = {
  phoneDigits?: string;
  amountKzt?: number;
};

export const PAYMENT_BRIDGES = {
  root: '/legacy/payment',
  service: (id: string, draft?: PaymentServiceDraft) => {
    const path = `/legacy/payment/${id}`;
    if (!draft?.phoneDigits && !draft?.amountKzt) return path;
    const qs = new URLSearchParams();
    if (draft.phoneDigits) qs.set('phone', draft.phoneDigits);
    if (draft.amountKzt != null && draft.amountKzt > 0) qs.set('amount', String(draft.amountKzt));
    const query = qs.toString();
    return query ? `${path}?${query}` : path;
  },
} as const;

export function getPaymentService(id: string): PaymentService | undefined {
  for (const section of PAYMENT_SECTIONS) {
    const found = section.items.find((item) => item.id === id);
    if (found) return found;
  }
  return undefined;
}

export const PAYMENT_CATEGORIES: { id: PaymentCategoryId; label: string }[] = [
  { id: 'all', label: paymentCopy.categoryAll },
  { id: 'bookmakers', label: paymentCopy.sectionBookmakers },
  { id: 'digital', label: paymentCopy.sectionDigital },
  { id: 'mfo', label: paymentCopy.sectionMfo },
];

export const PAYMENT_SECTIONS: PaymentSection[] = [
  {
    id: 'bookmakers',
    title: paymentCopy.sectionBookmakers,
    items: [
      {
        id: 'ubet',
        name: 'Ubet',
        logo: require('../../../assets/legacy/payment/services/ubet.png'),
        logoBackground: '#000000',
        subtitle: paymentCopy.bonusTopup,
        available: true,
        favorite: true,
      },
      {
        id: 'oinabet',
        name: 'Oinabet',
        logo: require('../../../assets/legacy/payment/services/oinabet.png'),
        logoBackground: '#1B4FE0',
        subtitle: paymentCopy.bonusTopup,
        available: true,
      },
      {
        id: 'tennisi',
        name: 'Tennisi',
        logo: require('../../../assets/legacy/payment/services/tennisi.png'),
        logoBackground: '#C8102E',
        subtitle: paymentCopy.bonusTopup,
        available: true,
      },
      {
        id: 'fonbet',
        name: 'Fonbet',
        logo: require('../../../assets/legacy/payment/services/fonbet.png'),
        logoBackground: '#E30613',
        subtitle: null,
        available: false,
      },
      {
        id: '1xbet',
        name: '1xbet',
        logo: require('../../../assets/legacy/payment/services/1xbet.png'),
        logoBackground: '#0A1640',
        subtitle: null,
        available: false,
      },
      {
        id: 'parimatch',
        name: 'Parimatch',
        logo: require('../../../assets/legacy/payment/services/parimatch.png'),
        logoBackground: '#000000',
        subtitle: null,
        available: false,
      },
    ],
  },
  {
    id: 'digital',
    title: paymentCopy.sectionDigital,
    items: [
      {
        id: 'steam',
        name: 'Steam',
        logo: require('../../../assets/legacy/payment/services/steam.png'),
        logoBackground: '#1B2838',
        subtitle: null,
        available: false,
      },
    ],
  },
  {
    id: 'mfo',
    title: paymentCopy.sectionMfo,
    items: [
      {
        id: 'zaimer',
        name: 'Робокэш/Займер',
        logo: require('../../../assets/legacy/payment/services/zaimer.png'),
        logoBackground: '#F2F2F2',
        subtitle: `${paymentCopy.commissionPrefix} -2,5%`,
        available: true,
        favorite: true,
      },
      {
        id: 'creditbar',
        name: 'CreditBar',
        logo: require('../../../assets/legacy/payment/services/creditbar.png'),
        logoBackground: '#1E6FE8',
        subtitle: `${paymentCopy.commissionPrefix} -2,5%`,
        available: true,
      },
      {
        id: 'icredit',
        name: 'i-credit.kz',
        logo: require('../../../assets/legacy/payment/services/icredit.png'),
        logoBackground: '#FFFFFF',
        subtitle: `${paymentCopy.commissionPrefix} -1,2%`,
        available: true,
      },
      {
        id: 'kengo',
        name: 'Kengo',
        logo: require('../../../assets/legacy/payment/services/kengo.png'),
        logoBackground: '#F7F7F7',
        subtitle: `${paymentCopy.commissionPrefix} -1,4%`,
        available: true,
      },
      {
        id: 'satcredit',
        name: 'Sat Credit',
        logo: require('../../../assets/legacy/payment/services/creditstar.png'),
        logoBackground: '#FFFFFF',
        subtitle: `${paymentCopy.commissionPrefix} -4%`,
        available: true,
      },
    ],
  },
];
