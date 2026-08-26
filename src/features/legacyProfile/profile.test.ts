import { formatKzPhone } from '@/features/legacyAuth/machine';
import { profileCopy } from '@/features/legacyProfile/copy';
import {
  buildMessageFeed,
  CANONICAL_IDENTITY,
  CANONICAL_MESSAGES,
  CANONICAL_PHONE_DIGITS,
  DEMO_CHANGE_PHONE_SMS,
  PROFILE_BRIDGES,
} from '@/features/legacyProfile/mockData';
import { phoneReady, useLegacyProfileStore } from '@/features/legacyProfile/store';
import { useMockStore } from '@/state/store';

describe('RECON-009 profile / messages', () => {
  beforeEach(() => {
    useLegacyProfileStore.getState().reset();
  });

  it('wires Home bridges to profile and messages', () => {
    expect(PROFILE_BRIDGES.profile).toBe('/legacy/profile');
    expect(PROFILE_BRIDGES.messages).toBe('/legacy/messages');
  });

  it('renders canonical synthetic identity', () => {
    const { identity, phoneDigits } = useLegacyProfileStore.getState();
    expect(identity).toEqual(CANONICAL_IDENTITY);
    expect(phoneDigits).toBe(CANONICAL_PHONE_DIGITS);
    expect(identity.displayName).toContain('Демо');
    expect(profileCopy.demoNote).toContain('DEMO');
  });

  it('preserves exact late-UI chrome copy including typo', () => {
    expect(profileCopy.personalRow).toBe('Личный данные');
    expect(profileCopy.notificationsTitle).toBe('Уведомления');
    expect(profileCopy.settingsSection).toBe('Настройки');
    expect(profileCopy.linkedCards).toBe('Привязанные карты');
    expect(profileCopy.supportService).toBe('Служба поддержки');
    expect(profileCopy.suggestIdea).toBe('Предложить идею');
    expect(profileCopy.logout).toBe('Выйти');
    expect(profileCopy.deleteAccount).toBe('Удалить профиль');
    expect(profileCopy.sessionSection).toBe('Сессия');
    expect(profileCopy.sessionSupport).toBe('Вы можете выйти из кабинета или удалить профиль.');
  });

  it('exposes linked-cards / suggest-idea stubs and help', () => {
    expect(PROFILE_BRIDGES.linkedCardsStub).toBe('/legacy/stub/linked-cards');
    expect(PROFILE_BRIDGES.suggestIdeaStub).toBe('/legacy/stub/suggest-idea');
    expect(PROFILE_BRIDGES.help).toBe('/legacy/help');
  });

  it('supports local change-phone flow and updates phone', () => {
    const store = useLegacyProfileStore.getState();
    store.setPendingPhoneDigits('7054564356');
    expect(phoneReady(useLegacyProfileStore.getState().pendingPhoneDigits)).toBe(true);
    expect(formatKzPhone('7054564356')).toContain('705');
    store.setPhoneSms(DEMO_CHANGE_PHONE_SMS);
    expect(store.commitPendingPhone()).toBe(true);
    expect(useLegacyProfileStore.getState().phoneDigits).toBe('7054564356');
  });

  it('rejects wrong SMS and keeps canonical phone', () => {
    const store = useLegacyProfileStore.getState();
    store.setPendingPhoneDigits('7054564356');
    store.setPhoneSms('9999');
    expect(store.commitPendingPhone()).toBe(false);
    expect(useLegacyProfileStore.getState().phoneDigits).toBe(CANONICAL_PHONE_DIGITS);
  });

  it('reset restores canonical phone and toggles', () => {
    useLegacyProfileStore.getState().setPendingPhoneDigits('7054564356');
    useLegacyProfileStore.getState().setPhoneSms(DEMO_CHANGE_PHONE_SMS);
    useLegacyProfileStore.getState().commitPendingPhone();
    useLegacyProfileStore.getState().togglePush();
    useLegacyProfileStore.getState().toggleFingerprint();
    useLegacyProfileStore.getState().reset();
    const s = useLegacyProfileStore.getState();
    expect(s.phoneDigits).toBe(CANONICAL_PHONE_DIGITS);
    expect(s.pushEnabled).toBe(true);
    expect(s.fingerprintEnabled).toBe(true);
  });

  it('prototype reset restores profile store', () => {
    useLegacyProfileStore.getState().togglePush();
    useMockStore.getState().resetToCanonical();
    expect(useLegacyProfileStore.getState().pushEnabled).toBe(true);
  });

  it('messages feed renders with help routes', () => {
    expect(CANONICAL_MESSAGES.length).toBe(4);
    const feed = buildMessageFeed(CANONICAL_MESSAGES);
    expect(feed.some((i) => i.kind === 'date' && i.label === 'Сегодня')).toBe(true);
    expect(feed.filter((i) => i.kind === 'message')).toHaveLength(4);
    expect(PROFILE_BRIDGES.help).toBe('/legacy/help');
  });

  it('supports app PIN change mock without touching card PIN', () => {
    for (const d of '123456') useLegacyProfileStore.getState().appendPinDigit(d);
    expect(useLegacyProfileStore.getState().pinPhase).toBe('repeat');
    let done = false;
    for (const d of '123456') {
      done = useLegacyProfileStore.getState().appendPinDigit(d);
    }
    expect(done).toBe(true);
    expect(useLegacyProfileStore.getState().sessionPin).toBe('123456');
    expect(PROFILE_BRIDGES.pin).toBe('/legacy/profile/pin');
  });

  it('exposes nested personal / phone / status routes', () => {
    expect(PROFILE_BRIDGES.personal).toBe('/legacy/profile/personal');
    expect(PROFILE_BRIDGES.phone).toBe('/legacy/profile/phone');
    expect(PROFILE_BRIDGES.phoneVerify).toBe('/legacy/profile/phone/verify');
    expect(PROFILE_BRIDGES.status).toBe('/legacy/profile/status');
  });

  it('exposes identification status copy', () => {
    expect(profileCopy.statusUnidentified).toBe('Неидентифицированный');
    expect(profileCopy.statusMore).toBe('Подробнее');
    expect(profileCopy.expandLimits).toBe('Расширить лимиты');
    expect(profileCopy.limitAmount).toBe('12 975 ₸');
  });

  it('exposes phone and promo copy on profile', () => {
    expect(profileCopy.phoneLabel).toBe('Телефон');
    expect(profileCopy.promoPlaceholder).toBe('Введите промокод');
  });
});
