/**
 * Canonical reconstruction identity + messages.
 * DEMO / NOT REAL PERSONAL DATA — synthetic stand-ins (format preserved).
 */

export const PROFILE_BRIDGES = {
  profile: '/legacy/profile',
  personal: '/legacy/profile/personal',
  phone: '/legacy/profile/phone',
  phoneVerify: '/legacy/profile/phone/verify',
  pin: '/legacy/profile/pin',
  status: '/legacy/profile/status',
  messages: '/legacy/messages',
  help: '/legacy/help',
  linkedCardsStub: '/legacy/stub/linked-cards',
  suggestIdeaStub: '/legacy/stub/suggest-idea',
  documentsStub: '/legacy/stub/documents',
  auth: '/legacy/auth',
} as const;


/** 10 national digits; display via formatKzPhone. Matches auth SMS demo line. */
export const CANONICAL_PHONE_DIGITS = '7777777777';

export const DEMO_CHANGE_PHONE_SMS = '0000';

export type CanonicalIdentity = {
  /** Header short name on Account. */
  displayName: string;
  fullName: string;
  documentNumber: string;
  birthDate: string;
  /** Destination label inside notification bubbles. */
  cardHolderShort: string;
};

export const CANONICAL_IDENTITY: CanonicalIdentity = {
  displayName: 'Демопользов Д.П',
  fullName: 'Демопользов Демонстрационный Пример',
  documentNumber: '12345678',
  birthDate: '01.01.1990',
  cardHolderShort: 'Демокарта',
};

export type MessageAlignment = 'system' | 'user';

export type LegacyMessage = {
  id: string;
  dateGroup: string;
  title: string;
  subtitle: string;
  time: string;
  alignment: MessageAlignment;
};

export const CANONICAL_MESSAGES: LegacyMessage[] = [
  {
    id: 'm1',
    dateGroup: '30.01.2022',
    title: 'Вывод денег: 1500 ₸',
    subtitle: 'На карту: Демокарта',
    time: '15.04',
    alignment: 'system',
  },
  {
    id: 'm2',
    dateGroup: '30.01.2022',
    title: 'Вывод денег: 2500 ₸',
    subtitle: 'На карту: Демокарта',
    time: '16.55',
    alignment: 'system',
  },
  {
    id: 'm3',
    dateGroup: '01.02.2022',
    title: 'Вывод денег: 2500 ₸',
    subtitle: 'На карту: Демокарта',
    time: '16.04',
    alignment: 'user',
  },
  {
    id: 'm4',
    dateGroup: 'Сегодня',
    title: 'Вывод денег: 3500 ₸',
    subtitle: 'На карту: Демокарта',
    time: '17.04',
    alignment: 'system',
  },
];

export type MessageFeedItem =
  | { kind: 'date'; label: string }
  | { kind: 'message'; message: LegacyMessage };

export function buildMessageFeed(messages: LegacyMessage[]): MessageFeedItem[] {
  const items: MessageFeedItem[] = [];
  let lastGroup: string | null = null;
  for (const message of messages) {
    if (message.dateGroup !== lastGroup) {
      items.push({ kind: 'date', label: message.dateGroup });
      lastGroup = message.dateGroup;
    }
    items.push({ kind: 'message', message });
  }
  return items;
}
