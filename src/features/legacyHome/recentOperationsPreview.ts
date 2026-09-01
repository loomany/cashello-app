import type { ImageSourcePropType } from 'react-native';

import { homeCopy } from '@/features/legacyHome/copy';
import { formatLegacyBalance } from '@/features/legacyTopup/mockData';
import { PAYMENT_SECTIONS, type PaymentService } from '@/features/legacyPayment/mockData';

export type GuestRecentOperationPreview = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
};

export const GUEST_RECENT_OPERATION: GuestRecentOperationPreview = {
  id: 'guest-registration-bonus',
  title: homeCopy.registrationBonus,
  subtitle: homeCopy.registrationBonusHint,
  amount: homeCopy.registrationBonusAmount,
};

export type RecentOperationPreview = {
  id: string;
  serviceId: string;
  name: string;
  logo: ImageSourcePropType;
  logoBackground: string;
  phone: string;
  phoneDigits: string;
  amount: string;
  amountKzt: number;
  bonus: string;
};

function kzPhoneToDigits(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('7') && digits.length >= 11) digits = digits.slice(1);
  return digits.slice(0, 10);
}

const RECENT_PHONES = [
  '+77078789911',
  '+77051234567',
  '+77017891234',
  '+77055551234',
  '+77070112233',
  '+77088887766',
  '+77012345678',
  '+77098765432',
] as const;

const RECENT_AMOUNTS_KZT = [5_000, 20_000, 1_500, 10_000, 3_500, 7_500, 12_000, 2_500] as const;

/** Prototype display rate for authorized Home recent-operation bonus chips. */
export const RECENT_OPERATION_BONUS_RATE = 0.02;

export function recentOperationBonusPoints(amountKzt: number): number {
  return Math.round(amountKzt * RECENT_OPERATION_BONUS_RATE);
}

export function formatRecentOperationBonus(amountKzt: number): string {
  const grouped = String(recentOperationBonusPoints(amountKzt)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `+${grouped} Б`;
}

function availablePaymentServices(): PaymentService[] {
  const services: PaymentService[] = [];
  for (const section of PAYMENT_SECTIONS) {
    for (const item of section.items) {
      if (item.available) services.push(item);
    }
  }
  return services;
}

/** Kaspi-style recent top-up preview rows for authorized Home. */
export function homeRecentOperationsPreview(limit = 8): RecentOperationPreview[] {
  return availablePaymentServices().slice(0, limit).map((service, index) => ({
    id: `recent-${service.id}`,
    serviceId: service.id,
    name: service.name,
    logo: service.logo,
    logoBackground: service.logoBackground,
    phone: RECENT_PHONES[index] ?? '+77070000000',
    phoneDigits: kzPhoneToDigits(RECENT_PHONES[index] ?? '+77070000000'),
    amountKzt: RECENT_AMOUNTS_KZT[index] ?? 1_000,
    amount: `−${formatLegacyBalance(RECENT_AMOUNTS_KZT[index] ?? 1_000, 'KZT')}`,
    bonus: formatRecentOperationBonus(RECENT_AMOUNTS_KZT[index] ?? 1_000),
  }));
}
