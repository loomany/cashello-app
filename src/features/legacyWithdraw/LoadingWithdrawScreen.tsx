import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyType } from '@/design/legacyTokens';
import { homeCopy } from '@/features/legacyHome/copy';
import { navigateHome } from '@/features/legacyHome/session';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import { WITHDRAW_BRIDGES } from '@/features/legacyWithdraw/mockData';
import { CardMethodGlyph, CashhelloUserMethodGlyph, PhoneMethodGlyph } from '@/features/legacyWithdraw/WithdrawIcons';
import { WithdrawSuccessReceipt } from '@/features/legacyWithdraw/WithdrawSuccessReceipt';
import {
  formatCardPan,
  formatPhoneDisplay,
  type WithdrawResult,
  useLegacyWithdrawStore,
} from '@/features/legacyWithdraw/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

const LOADING_MS = 700;

function formatReceiptDate(date = new Date()): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  return `${dd}.${mm}.${yy} · ${hh}:${mi}`;
}

function homeLabelFromFromId(fromId: string): string {
  if (fromId === 'rub') return homeCopy.balanceLabelRub;
  if (fromId === 'usd') return homeCopy.balanceLabelUsd;
  if (fromId === 'bonus') return withdrawCopy.bonusAccount;
  return homeCopy.balanceLabel;
}

function amountUnitFromFromId(fromId: string): string {
  if (fromId === 'rub') return withdrawCopy.amountUnitRub;
  if (fromId === 'usd') return withdrawCopy.amountUnitUsd;
  if (fromId === 'bonus') return withdrawCopy.amountUnitBonus;
  return withdrawCopy.amountUnitTenge;
}

function formatReceiptAmount(amount: number, fromId: string): string {
  const grouped = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${grouped} ${amountUnitFromFromId(fromId)}`;
}

export function LoadingWithdrawScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ scenario?: string; ready?: string }>();
  const confirmAndSettle = useLegacyWithdrawStore((s) => s.confirmAndSettle);
  const lastResult = useLegacyWithdrawStore((s) => s.lastResult);
  const lastOperation = useLegacyWithdrawStore((s) => s.lastOperation);
  const cardDigits = useLegacyWithdrawStore((s) => s.cardDigits);
  const phoneDigits = useLegacyWithdrawStore((s) => s.phoneDigits);
  const fromId = useLegacyWithdrawStore((s) => s.fromId);
  const method = useLegacyWithdrawStore((s) => s.method);
  const alreadyReady = params.ready === '1';
  const [phase, setPhase] = useState<'loading' | 'done'>(alreadyReady ? 'done' : 'loading');
  const settled = useRef(alreadyReady);
  const receiptDate = useMemo(() => formatReceiptDate(), []);

  const scenario: WithdrawResult =
    params.scenario === 'error' ? 'error' : params.scenario === 'processing' ? 'processing' : 'success';

  useScreenMeta({
    screenName: 'Legacy Withdraw loading',
    route: WITHDRAW_BRIDGES.loading,
    taskId: alreadyReady ? 'LOCAL_DRAFT' : 'RECON-006',
    prototypeStatus: 'in_progress',
    screenId: phase === 'loading' ? 'LGC-SCR-098' : lastResult === 'error' ? 'LGC-SCR-099' : 'WD-003',
    legacyNodeId: phase === 'loading' ? '648:17221' : lastResult === 'error' ? '648:17246' : '648:17298',
  });

  useEffect(() => {
    if (alreadyReady) {
      return;
    }
    const t = setTimeout(() => {
      if (!settled.current) {
        settled.current = true;
        confirmAndSettle(scenario);
      }
      setPhase('done');
    }, LOADING_MS);
    return () => clearTimeout(t);
  }, [alreadyReady, confirmAndSettle, scenario]);

  const goHome = () => navigateHome(router);

  if (phase === 'loading') {
    return (
      <DebugMetaHost route={WITHDRAW_BRIDGES.loading}>
        <SafeAreaView style={styles.safe}>
          <View style={styles.loadingCenter}>
            <ActivityIndicator size="large" color={legacyColor.primary} />
            <Text style={styles.loadingTitle}>{withdrawCopy.processing}</Text>
          </View>
        </SafeAreaView>
      </DebugMetaHost>
    );
  }

  const amount = lastOperation?.amount ?? 0;
  const fee = lastOperation?.fee ?? 0;
  const status =
    lastResult === 'error'
      ? withdrawCopy.failed
      : lastResult === 'processing'
        ? 'В обработке'
        : withdrawCopy.receiptSuccess;
  const opMethod = lastOperation?.method ?? method;
  const isPhone = opMethod === 'phone';
  const isUser = opMethod === 'cashhelloUser';
  const cardMask = cardDigits.length >= 4 ? `•••• ${cardDigits.slice(-4)}` : formatCardPan(cardDigits) || '••••';
  const phoneMask = phoneDigits ? formatPhoneDisplay(phoneDigits) : '—';
  const destLabel = isUser ? withdrawCopy.receiptRecipient : isPhone ? withdrawCopy.receiptPhone : withdrawCopy.receiptCard;
  const destValue = isPhone || isUser ? phoneMask : cardMask;
  const opTypeValue = isUser
    ? withdrawCopy.receiptOpTypeUser
    : isPhone
      ? withdrawCopy.receiptOpTypePhone
      : withdrawCopy.receiptOpTypeValue;
  const serviceValue = isUser
    ? withdrawCopy.receiptServiceUser
    : isPhone
      ? withdrawCopy.receiptServicePhone
      : withdrawCopy.receiptServiceValue;
  const amountLabel = `−${formatReceiptAmount(amount, fromId)}`;
  const feeLabel =
    fromId === 'bonus' ? `${fee} ${withdrawCopy.amountUnitBonus}` : `${fee} ${withdrawCopy.amountUnitTenge}`;

  return (
    <DebugMetaHost route={WITHDRAW_BRIDGES.loading}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <WithdrawSuccessReceipt
          amountLabel={amountLabel}
          icon={isUser ? <CashhelloUserMethodGlyph /> : isPhone ? <PhoneMethodGlyph /> : <CardMethodGlyph />}
          rows={[
            { label: withdrawCopy.receiptOpType, value: opTypeValue },
            { label: withdrawCopy.receiptService, value: serviceValue },
            { label: destLabel, value: destValue },
            { label: withdrawCopy.receiptFrom, value: homeLabelFromFromId(fromId) },
            { label: withdrawCopy.receiptAmount, value: amountLabel },
            { label: withdrawCopy.receiptFee, value: feeLabel },
            { label: withdrawCopy.receiptDate, value: receiptDate },
            { label: withdrawCopy.receiptStatus, value: status },
          ]}
          onClose={goHome}
          onDone={goHome}
        />
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  loadingCenter: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  loadingTitle: { ...legacyType.title, color: legacyColor.textPrimary, textAlign: 'center' },
});
