import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph, CloseGlyph, CurrencyGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_ACCOUNTS } from '@/features/legacyAccounts/mockData';
import { SendArrowGlyph } from '@/features/legacyHome/HomeIcons';
import { AccountSelector } from '@/features/legacyTopup/AccountSelector';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { ChevronRightGlyph } from '@/features/legacyTopup/TopupIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import {
  CASH_DESKS,
  formatLegacyBalance,
  formatWithdrawAmount,
  MOCK_FEE_KZT,
  MOCK_MAX_KZT,
  MOCK_MIN_KZT,
  SYNTHETIC_DEST_CARD,
  WITHDRAW_BRIDGES,
} from '@/features/legacyWithdraw/mockData';
import { DestCardGlyph } from '@/features/legacyWithdraw/WithdrawIcons';
import {
  formatPhoneDisplay,
  parseWithdrawAmount,
  useLegacyWithdrawStore,
} from '@/features/legacyWithdraw/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function AmountWithdrawScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.withdrawAmount);
  const balances = useLegacyTopupStore((s) => s.balances);
  const method = useLegacyWithdrawStore((s) => s.method);
  const fromId = useLegacyWithdrawStore((s) => s.fromId);
  const toAccountId = useLegacyWithdrawStore((s) => s.toAccountId);
  const deskId = useLegacyWithdrawStore((s) => s.deskId);
  const amountDigits = useLegacyWithdrawStore((s) => s.amountDigits);
  const confirmOpen = useLegacyWithdrawStore((s) => s.confirmOpen);
  const phoneDigits = useLegacyWithdrawStore((s) => s.phoneDigits);
  const setFromId = useLegacyWithdrawStore((s) => s.setFromId);
  const setToAccountId = useLegacyWithdrawStore((s) => s.setToAccountId);
  const setAmountDigits = useLegacyWithdrawStore((s) => s.setAmountDigits);
  const fillAll = useLegacyWithdrawStore((s) => s.fillAll);
  const setConfirmOpen = useLegacyWithdrawStore((s) => s.setConfirmOpen);

  const [picker, setPicker] = useState<'none' | 'from' | 'to'>('none');

  const from = LEGACY_ACCOUNTS.find((row) => row.id === fromId);
  const toAccount = LEGACY_ACCOUNTS.find((row) => row.id === (toAccountId ?? 'kzt-primary'));
  const desk = CASH_DESKS.find((row) => row.id === deskId);
  const amount = parseWithdrawAmount(amountDigits);
  const overLimit = amount > MOCK_MAX_KZT;
  const inRange = amount >= MOCK_MIN_KZT && amount <= MOCK_MAX_KZT;
  const showFee = amount >= MOCK_MIN_KZT;
  const enabled = Boolean(method && method !== 'other' && inRange && (method !== 'cash' || desk));

  const nodeId = overLimit ? '804:25789' : showFee ? '804:25863' : method === 'cash' ? '821:31425' : '648:18324';
  const screenId = overLimit ? 'LGC-SCR-095' : showFee ? 'LGC-SCR-096' : method === 'cash' ? 'LGC-SCR-109' : 'LGC-SCR-093';

  useScreenMeta({
    screenName: 'Legacy Withdraw amount',
    route: WITHDRAW_BRIDGES.amount,
    taskId: 'RECON-006',
    prototypeStatus: 'in_progress',
    screenId: confirmOpen ? 'LGC-SCR-097' : screenId,
    legacyNodeId: confirmOpen ? '648:18857' : nodeId,
  });

  const ctaLabel = withdrawCopy.withdrawAmount(formatWithdrawAmount(amount || 0));

  const destinationBlock = useMemo(() => {
    if (method === 'cash') {
      return (
        <AccountSelector
          label={withdrawCopy.to}
          account={toAccount}
          balanceLabel={toAccount ? formatLegacyBalance(balances[toAccount.id] ?? 0, toAccount.currency) : undefined}
          onPress={() => setPicker('to')}
        />
      );
    }
    if (method === 'phone') {
      return (
        <View style={styles.destCard}>
          <Text style={styles.destLabel}>{withdrawCopy.to}</Text>
          <View style={styles.destRow}>
            <View style={styles.textCol}>
              <Text style={styles.destPrimary}>{formatPhoneDisplay(phoneDigits)}</Text>
              <Text style={styles.destSecondary}>{withdrawCopy.phone}</Text>
            </View>
            <ChevronRightGlyph />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.destCard}>
        <Text style={styles.destLabel}>{withdrawCopy.to}</Text>
        <View style={styles.destRow}>
          <DestCardGlyph />
          <View style={styles.textCol}>
            <Text style={styles.destPrimary}>{SYNTHETIC_DEST_CARD.holder}</Text>
            <Text style={styles.destSecondary}>{SYNTHETIC_DEST_CARD.last4}</Text>
          </View>
          <ChevronRightGlyph />
        </View>
      </View>
    );
  }, [balances, method, phoneDigits, toAccount]);

  return (
    <DebugMetaHost route={WITHDRAW_BRIDGES.amount}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>{withdrawCopy.title}</Text>

          {method === 'cash' ? (
            <>
              <Pressable style={styles.destCard} onPress={() => router.push(WITHDRAW_BRIDGES.cashMap as never)}>
                <Text style={styles.destLabel}>{withdrawCopy.from}</Text>
                <View style={styles.destRow}>
                  <View style={styles.textCol}>
                    <Text style={styles.destPrimary}>{desk?.title ?? withdrawCopy.choose}</Text>
                    <Text style={styles.destSecondary}>{desk?.address ?? ''}</Text>
                  </View>
                  <ChevronRightGlyph />
                </View>
              </Pressable>
              <View style={{ height: 10 }} />
              {destinationBlock}
            </>
          ) : (
            <>
              <AccountSelector
                label={withdrawCopy.from}
                account={from}
                balanceLabel={from ? formatLegacyBalance(balances[from.id] ?? 0, from.currency) : undefined}
                empty={!from}
                onPress={() => setPicker('from')}
              />
              <View style={{ height: 10 }} />
              {destinationBlock}
            </>
          )}

          <View style={{ height: 16 }} />
          <View style={styles.amountHead}>
            <Text style={styles.caption}>
              Сумма <Text style={styles.range}>(от 1000₸ до 1970₸)</Text>
            </Text>
            <Pressable accessibilityRole="button" onPress={fillAll}>
              <Text style={styles.all}>{withdrawCopy.all}</Text>
            </Pressable>
          </View>
          <View style={styles.amountField}>
            <Text style={styles.amountValue}>{amount > 0 ? formatWithdrawAmount(amount) : '0 ₸'}</Text>
            <TextInput
              accessibilityLabel="Сумма"
              keyboardType="number-pad"
              value={amountDigits}
              onChangeText={setAmountDigits}
              style={styles.hiddenInput}
            />
          </View>
          {overLimit ? <Text style={styles.error}>{withdrawCopy.overLimit}</Text> : null}
          {showFee && !overLimit ? <Text style={styles.fee}>{withdrawCopy.feeInline}</Text> : null}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={ctaLabel}
            disabled={!enabled}
            onPress={() => setConfirmOpen(true)}
            style={[styles.cta, enabled ? styles.ctaOn : styles.ctaOff]}
          >
            <Text style={[styles.ctaLabel, !enabled && styles.ctaLabelOff]}>{ctaLabel}</Text>
            {enabled ? <SendArrowGlyph /> : null}
          </Pressable>
        </View>
      </SafeAreaView>

      <Modal animationType="fade" transparent visible={picker !== 'none'} onRequestClose={() => setPicker('none')}>
        <View style={styles.sheetRoot}>
          <Pressable style={styles.overlayFlex} onPress={() => setPicker('none')} />
          <View style={styles.pickSheet}>
            <View style={styles.pickHead}>
              <Text style={styles.pickTitle}>{picker === 'from' ? withdrawCopy.from : withdrawCopy.to}</Text>
              <Pressable onPress={() => setPicker('none')}>
                <CloseGlyph />
              </Pressable>
            </View>
            {LEGACY_ACCOUNTS.filter((row) =>
              picker === 'from' ? row.id !== toAccount?.id : row.id !== fromId,
            ).map((row) => (
              <Pressable
                key={row.id}
                accessibilityRole="button"
                onPress={() => {
                  if (picker === 'from') setFromId(row.id);
                  else setToAccountId(row.id);
                  setPicker('none');
                }}
                style={styles.pickRow}
              >
                <CurrencyGlyph currency={row.currency} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.balance}>{formatLegacyBalance(balances[row.id] ?? 0, row.currency)}</Text>
                  <Text style={styles.mask}>
                    {row.maskPrefix} • {row.maskSuffix}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={confirmOpen} onRequestClose={() => setConfirmOpen(false)}>
        <View style={styles.sheetRoot}>
          <Pressable style={styles.overlayFlex} onPress={() => setConfirmOpen(false)} />
          <View style={styles.confirmSheet}>
            <View style={styles.pickHead}>
              <Text style={styles.pickTitle}>{withdrawCopy.confirmTitle}</Text>
              <Pressable onPress={() => setConfirmOpen(false)}>
                <CloseGlyph />
              </Pressable>
            </View>
            <Text style={styles.confirmAmount}>{formatWithdrawAmount(amount)}</Text>
            <Text style={styles.fee}>{`Комиссия: ${MOCK_FEE_KZT} ₸`}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={withdrawCopy.confirmCta}
              onPress={() => {
                setConfirmOpen(false);
                router.push(WITHDRAW_BRIDGES.loading as never);
              }}
              style={[styles.cta, styles.ctaOn, { marginTop: 16 }]}
            >
              <Text style={styles.ctaLabel}>{withdrawCopy.confirmCta}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' },
  scroll: { paddingHorizontal: legacySpace.screenX, paddingBottom: 120, alignItems: 'center' },
  title: { ...legacyType.title, color: legacyColor.textPrimary, alignSelf: 'flex-start', marginBottom: 16 },
  destCard: {
    width: 345,
    minHeight: 92,
    borderRadius: 12,
    backgroundColor: legacyColor.surface,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  destLabel: { fontSize: 12, lineHeight: 16, color: legacyColor.textSecondary, marginBottom: 8 },
  destRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  textCol: { flex: 1, gap: 2 },
  destPrimary: { ...legacyType.field, color: legacyColor.textPrimary },
  destSecondary: { ...legacyType.body, color: legacyColor.textSecondary },
  amountHead: { width: 345, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  caption: { ...legacyType.body, color: legacyColor.textPrimary },
  range: { color: legacyColor.textTertiary },
  all: { ...legacyType.caption, color: legacyColor.primary },
  amountField: {
    width: 345,
    height: 70,
    borderRadius: 12,
    backgroundColor: legacyColor.surface,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  amountValue: { fontSize: 20, lineHeight: 26, fontWeight: '500', color: legacyColor.textPrimary },
  hiddenInput: { ...StyleSheet.absoluteFill, opacity: 0.02, color: legacyColor.textPrimary },
  error: { width: 345, marginTop: 8, color: legacyColor.danger, ...legacyType.body },
  fee: { width: 345, marginTop: 8, color: legacyColor.textSecondary, ...legacyType.body, textAlign: 'center' },
  footer: { paddingHorizontal: 15, paddingBottom: 24 },
  cta: {
    width: 345,
    height: 70,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
  },
  ctaOn: { backgroundColor: legacyColor.primary },
  ctaOff: { backgroundColor: legacyColor.primaryDisabled },
  ctaLabel: { ...legacyType.cta, color: legacyColor.primaryOnPrimary },
  ctaLabelOff: { color: legacyColor.primaryDisabledText },
  sheetRoot: { flex: 1, justifyContent: 'flex-end', backgroundColor: legacyColor.overlay },
  overlayFlex: { flex: 1 },
  pickSheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 36,
  },
  confirmSheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 36,
    alignItems: 'center',
  },
  pickHead: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pickTitle: { ...legacyType.homeSection, color: legacyColor.textPrimary },
  pickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: legacyColor.border,
  },
  balance: { ...legacyType.field, color: legacyColor.textPrimary },
  mask: { ...legacyType.body, color: legacyColor.textSecondary },
  confirmAmount: { ...legacyType.title, color: legacyColor.textPrimary, marginTop: 8 },
});
