import { homeAccounts, homeCopy, homePromoBanners, homeServicesPreview } from '@/features/legacyHome/copy';
import { HOME_BRIDGES, HOME_HISTORY } from '@/features/legacyHome/mockData';
import {
  GUEST_RECENT_OPERATION,
  formatRecentOperationBonus,
  homeRecentOperationsPreview,
  recentOperationBonusPoints,
} from '@/features/legacyHome/recentOperationsPreview';
import { homeHref, profileHref, guestBalanceLabel } from '@/features/legacyHome/session';
import { reduceLegacyAuth } from '@/features/legacyAuth/machine';
import { INITIAL_LEGACY_AUTH } from '@/features/legacyAuth/types';

describe('legacy Home reconstruction (RECON-002)', () => {
  it('lands auth completion on the complete step that routes to legacy Home', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'pinCreate' as const };
    for (const d of '123456') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    for (const d of '123456') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    expect(state.step).toBe('complete');
  });

  it('renders expected primary Home copy and preview', () => {
    expect(homeCopy.title).toBe('Cashhello');
    expect(homeCopy.balanceLabel).toBe('Счет ₸');
    expect(homeCopy.balanceAmount).toBe('234 888 ₸');
    expect(homeCopy.balanceLabelRub).toBe('Счет ₽');
    expect(homeCopy.balanceAmountRub).toBe('43 900 ₽');
    expect(homeCopy.balanceLabelUsd).toBe('Счет $');
    expect(homeCopy.balanceAmountUsd).toBe('123 $');
    expect(homeAccounts.map((row) => row.id)).toEqual(['kzt', 'rub', 'usd']);
    expect(homeCopy.history).toBe('История');
    expect(homeCopy.recentOperations).toBe('Последние операции');
    expect(homeCopy.services).toBe('Сервисы');
    expect(homeCopy.seeAll).toBe('См. все');
    expect(homeServicesPreview.map((row) => row.name)).toEqual(['Ubet', 'Beeline', 'Zaimer']);
    expect(homePromoBanners).toHaveLength(3);
    expect(homePromoBanners.map((row) => row.id)).toEqual(['promo-ubet', 'promo-zaimer', 'promo-beeline']);
    expect(homeCopy.filter).toBe('Фильтр');
    expect(homeCopy.withdraw).toBe('Вывести деньги');
    expect(homeCopy.registrationBonus).toBe('Бонус за регистрацию');
    expect(homeCopy.registrationBonusHint).toBe('За регистрацию вам будет начислено 500 бонусов');
    expect(homeCopy.registrationBonusStatus).toBe('');
    expect(homeCopy.registrationBonusAmount).toBe('+500 Б');
    expect(HOME_HISTORY).toHaveLength(6);
    expect(HOME_HISTORY.map((row) => row.status)).toEqual([
      'В обработке',
      'Готов к выдаче',
      'Успешно',
      'Отклонено',
      'В обработке',
      'Отклонено',
    ]);
  });

  it('builds guest recent operation preview for registration bonus', () => {
    expect(GUEST_RECENT_OPERATION.title).toBe('Бонус за регистрацию');
    expect(GUEST_RECENT_OPERATION.subtitle).toBe('За регистрацию вам будет начислено 500 бонусов');
    expect(GUEST_RECENT_OPERATION.amount).toBe('+500 Б');
  });

  it('calculates recent-operation bonus at 2% of amount', () => {
    expect(recentOperationBonusPoints(5000)).toBe(100);
    expect(recentOperationBonusPoints(20000)).toBe(400);
    expect(recentOperationBonusPoints(1500)).toBe(30);
    expect(formatRecentOperationBonus(5000)).toBe('+100 Б');
    expect(formatRecentOperationBonus(20000)).toBe('+400 Б');
    expect(formatRecentOperationBonus(1500)).toBe('+30 Б');
  });

  it('builds recent operations preview from payment catalog', () => {
    const rows = homeRecentOperationsPreview(8);
    expect(rows).toHaveLength(8);
    expect(rows[0]?.name).toBe('Ubet');
    expect(rows[0]?.phone).toBe('+77078789911');
    expect(rows[0]?.phoneDigits).toBe('7078789911');
    expect(rows[0]?.amountKzt).toBe(5000);
    expect(rows[0]?.amount).toBe('−5 000 ₸');
    expect(rows[0]?.bonus).toBe('+100 Б');
    expect(rows[1]?.bonus).toBe('+400 Б');
    expect(rows[2]?.bonus).toBe('+30 Б');
    expect(rows.every((row) => row.amount.startsWith('−'))).toBe(true);
    expect(rows.every((row) => row.bonus.startsWith('+') && row.bonus.endsWith(' Б'))).toBe(true);
    expect(rows.map((row) => row.serviceId)).toEqual([
      'ubet',
      'oinabet',
      'tennisi',
      'zaimer',
      'creditbar',
      'icredit',
      'kengo',
      'satcredit',
    ]);
  });

  it('exposes clickable Home module entries', () => {
    expect(HOME_BRIDGES.home).toBe('/legacy/home');
    expect(HOME_BRIDGES.guestHome).toBe('/legacy/home?guest=1');
    expect(HOME_BRIDGES.accounts).toBe('/legacy/accounts');
    expect(HOME_BRIDGES.history).toBe('/legacy/history');
    expect(HOME_BRIDGES.payment).toBe('/legacy/payment');
    expect(HOME_BRIDGES.qr).toBe('/legacy/qr');
    expect(HOME_BRIDGES.withdraw).toBe('/legacy/withdraw');
    expect(HOME_BRIDGES.auth).toBe('/legacy/auth');
    expect(HOME_BRIDGES.login).toBe('/legacy/auth?qaStep=iin');
    expect(HOME_BRIDGES.registrationStub).toBe('/legacy/stub/registration');
    expect(HOME_BRIDGES.bonusStub).toBe('/legacy/stub/bonus');
    expect(HOME_BRIDGES.cashhelloUserStub).toBe('/legacy/stub/cashhello-user');
    expect(HOME_BRIDGES.profile).toBe('/legacy/profile');
  });

  it('exposes guest session helpers for browse vs auth-gate', () => {
    expect(homeHref(true)).toBe(HOME_BRIDGES.guestHome);
    expect(homeHref(false)).toBe(HOME_BRIDGES.home);
    expect(profileHref(true)).toBe(HOME_BRIDGES.login);
    expect(profileHref(false)).toBe(HOME_BRIDGES.profile);
    expect(guestBalanceLabel('KZT')).toBe('0 ₸');
    expect(guestBalanceLabel('bonus')).toBe('0 Б');
  });

  it('resets launch to splash deterministically', () => {
    const state = reduceLegacyAuth({ ...INITIAL_LEGACY_AUTH, step: 'complete' }, { type: 'RESET' });
    expect(state.step).toBe('splash');
  });
});
