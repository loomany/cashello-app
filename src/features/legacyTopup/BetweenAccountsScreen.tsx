import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View , ViewStyle, TextStyle} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import { legacyColor, legacySize, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph, CurrencyGlyph } from '@/features/legacyAccounts/AccountIcons';
import type { AccountCurrency } from '@/features/legacyAccounts/mockData';
import { LEGACY_ACCOUNTS } from '@/features/legacyAccounts/mockData';
import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { CashhelloBrand, ChevronRightGlyph, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { homeCopy } from '@/features/legacyHome/copy';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { navigateHome, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { topupCopy } from '@/features/legacyTopup/copy';
import { formatLegacyBalance, formatFxRateLabel, convertAmount, currencyUnit, TOPUP_BRIDGES } from '@/features/legacyTopup/mockData';
import { parseAmountDigits, useLegacyTopupStore } from '@/features/legacyTopup/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';
import Svg, { Path } from 'react-native-svg';

type Props = {
  toAccountId: string;
};

const KEYBOARD_NUMBER = Platform.OS === 'web' ? 'numeric' : 'number-pad';
const DEFAULT_FROM_ID = 'kzt-primary';

function accountTitle(currency: AccountCurrency): string {
  if (currency === 'RUB') return homeCopy.balanceLabelRub;
  if (currency === 'USD') return homeCopy.balanceLabelUsd;
  return homeCopy.balanceLabel;
}

function SelectPlusGlyph() {
  return (
    <View style={styles.selectPlus}>
      <Svg width={14} height={14} viewBox="0 0 14 14">
        <Path d="M7 3V11M3 7H11" stroke={legacyColor.primary} strokeWidth={1.6} strokeLinecap="round" />
      </Svg>
    </View>
  );
}

export function BetweenAccountsScreen({ toAccountId }: Props) {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.topupBetween);
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const balances = useLegacyTopupStore((s) => s.balances);
  const fromId = useLegacyTopupStore((s) => s.fromId);
  const toId = useLegacyTopupStore((s) => s.toId);
  const amountDigits = useLegacyTopupStore((s) => s.amountDigits);
  const picker = useLegacyTopupStore((s) => s.picker);
  const setToId = useLegacyTopupStore((s) => s.setToId);
  const setFromId = useLegacyTopupStore((s) => s.setFromId);
  const setAmountDigits = useLegacyTopupStore((s) => s.setAmountDigits);
  const setPicker = useLegacyTopupStore((s) => s.setPicker);
  const fillAll = useLegacyTopupStore((s) => s.fillAll);
  const confirmBetween = useLegacyTopupStore((s) => s.confirmBetween);

  const [amountFocused, setAmountFocused] = useState(false);

  useEffect(() => {
    // Default: Откуда = тенге, Куда = выбрать.
    useLegacyTopupStore.setState({
      fromId: DEFAULT_FROM_ID,
      toId: null,
      amountDigits: '',
      displayCurrency: 'KZT',
      picker: 'none',
    });
  }, [toAccountId]);

  const from = LEGACY_ACCOUNTS.find((row) => row.id === fromId);
  const to = LEGACY_ACCOUNTS.find((row) => row.id === toId);
  const amount = parseAmountDigits(amountDigits);
  const cross = Boolean(from && to && from.currency !== to.currency);
  const enabled = Boolean(from && to && from.id !== to.id && amount > 0);
  const amountActive = amountFocused || amountDigits.length > 0;
  const amountCurrency = from?.currency ?? 'KZT';
  const amountUnit = currencyUnit(amountCurrency);
  const amountDisplay = amountDigits
    ? `${amountDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} ${amountUnit}`
    : '';
  const fxRateLabel = cross && from && to ? formatFxRateLabel(from.currency, to.currency) : '';
  const creditAmount =
    cross && from && to && amount > 0 ? convertAmount(amount, from.currency, to.currency) : 0;
  const creditLabel =
    creditAmount > 0 && to
      ? topupCopy.willCredit(
          `${(() => {
            const [whole, frac] = creditAmount.toFixed(2).split('.');
            return `${(whole ?? '0').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${frac}`;
          })()} ${currencyUnit(to.currency)}`,
        )
      : '';
  const nodeId = !to ? '648:18900' : amount > 0 ? '833:27842' : '648:18928';
  const screenId = !to ? 'LGC-SCR-069' : amount > 0 ? 'LGC-SCR-073' : 'LGC-SCR-070';

  useScreenMeta({
    screenName: 'Legacy Between accounts',
    route: TOPUP_BRIDGES.between,
    taskId: 'RECON-005',
    prototypeStatus: 'in_progress',
    screenId: picker === 'from' || picker === 'to' ? 'LGC-SCR-071' : screenId,
    legacyNodeId: picker === 'from' || picker === 'to' ? '648:18958' : nodeId,
  });

  const amountGrouped = String(amount || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const ctaLabel = topupCopy.topUpAmount(`${amountGrouped} ${amountUnit}`);
  const pickerRows = LEGACY_ACCOUNTS.filter((row) =>
    picker === 'from' ? row.id !== toId : row.id !== fromId,
  );

  return (
    <DebugMetaHost route={TOPUP_BRIDGES.between}>
      <AuthFormLayout
        centered
        framed
        titleCentered
        header={
          <View style={styles.topHeader}>
            <CashhelloBrand onPress={() => navigateHome(router)} />
            <ProfileBonusHeader
              amount={homeCopy.headerBonus}
              onProfilePress={() => router.push(profileHref(isGuest) as never)}
            />
          </View>
        }
        title={topupCopy.betweenAccounts}
        support={topupCopy.betweenSupport}
        onBack={onBack}
        tabBar={<LegacyTabBar active="home" />}
        overlay={
          picker !== 'none' ? (
            <View style={[styles.overlayRoot, styles.overlayEnd]}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Закрыть"
                onPress={() => setPicker('none')}
                style={styles.overlayHit}
              >
                <BlurView intensity={18} tint="light" style={styles.blur}>
                  <View style={styles.dim} />
                </BlurView>
              </Pressable>
              <View style={styles.pickerSheet}>
                <View style={styles.pickerHandle} />
                <View style={styles.pickerHead}>
                  <Text style={styles.pickerTitle}>
                    {picker === 'from' ? topupCopy.from : topupCopy.to}
                  </Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Закрыть"
                    onPress={() => setPicker('none')}
                    style={styles.pickerClose}
                    hitSlop={8}
                  >
                    <CloseGlyph />
                  </Pressable>
                </View>
                <View style={styles.pickerList}>
                  {pickerRows.map((row, index) => {
                    const title = accountTitle(row.currency);
                    const amount = formatLegacyBalance(balances[row.id] ?? 0, row.currency);
                    return (
                      <View key={row.id}>
                        {index > 0 ? <View style={styles.pickerDivider} /> : null}
                        <Pressable
                          accessibilityRole="button"
                          accessibilityLabel={`${title}: ${amount}`}
                          onPress={() => {
                            if (picker === 'from') setFromId(row.id);
                            else setToId(row.id);
                            setPicker('none');
                          }}
                          style={({ pressed }) => [styles.pickerRow, pressed && styles.pickerRowPressed]}
                        >
                          <CurrencyGlyph currency={row.currency} size={40} />
                          <View style={styles.pickerText}>
                            <Text style={styles.pickerLabel}>{title}</Text>
                            <Text style={styles.pickerAmount}>{amount}</Text>
                          </View>
                          <ChevronRightGlyph />
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          ) : null
        }
      >
        <AccountCard
          label={topupCopy.from}
          empty={!from}
          balance={from ? formatLegacyBalance(balances[from.id] ?? 0, from.currency) : undefined}
          onPress={() => setPicker('from')}
        />

        <AccountCard
          label={topupCopy.to}
          empty={!to}
          balance={to ? formatLegacyBalance(balances[to.id] ?? 0, to.currency) : undefined}
          onPress={() => setPicker('to')}
        />

        {cross ? (
          <View style={styles.fxBox}>
            {creditLabel ? <Text style={styles.fxCredit}>{creditLabel}</Text> : null}
            <Text style={styles.fxRate}>{fxRateLabel}</Text>
          </View>
        ) : null}

        <View style={[styles.fieldRow, amountActive && styles.fieldRowActive]}>
          <View style={styles.fieldCol}>
            <Text
              style={[
                styles.fieldLabel,
                amountActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                styles.noPointer,
              ]}
            >
              {topupCopy.amountLabel}
            </Text>
            <TextInput
              value={amountDisplay}
              onChangeText={(value) => setAmountDigits(value.replace(/\D/g, ''))}
              keyboardType={KEYBOARD_NUMBER}
              inputMode="numeric"
              onFocus={() => setAmountFocused(true)}
              onBlur={() => setAmountFocused(false)}
              placeholder={amountFocused && !amountDigits ? `0 ${amountUnit}` : undefined}
              placeholderTextColor={legacyColor.textTertiary}
              style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
              accessibilityLabel={topupCopy.amountLabel}
            />
          </View>
          <Pressable accessibilityRole="button" onPress={fillAll} hitSlop={8} style={styles.allHit}>
            <Text style={styles.allLabel}>{topupCopy.all}</Text>
          </Pressable>
        </View>

        <View style={styles.ctaWrap}>
          <LegacyPrimaryButton
            label={ctaLabel}
            disabled={!enabled}
            onPress={() => {
              if (confirmBetween()) navigateHome(router);
            }}
          />
        </View>
      </AuthFormLayout>
    </DebugMetaHost>
  );
}

function AccountCard({
  label,
  empty,
  balance,
  onPress,
}: {
  label: string;
  empty?: boolean;
  balance?: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.accountCard, empty && styles.accountCardEmpty]}
    >
      {empty ? (
        <>
          <Text style={[styles.accountLabel, styles.accountLabelTop]}>{label}</Text>
          <View style={styles.emptyRow}>
            <SelectPlusGlyph />
            <Text style={styles.choose}>{topupCopy.choose}</Text>
          </View>
          <View style={styles.accountChevron}>
            <ChevronRightGlyph />
          </View>
        </>
      ) : (
        <>
          <View style={styles.accountText}>
            <Text style={styles.accountLabel}>{label}</Text>
            <Text style={styles.accountAmount}>{balance}</Text>
          </View>
          <ChevronRightGlyph />
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  accountCard: {
    minHeight: 90,
    borderRadius: 14,
    backgroundColor: legacyColor.surface,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.12)',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  } as ViewStyle,
  accountCardEmpty: {
    position: 'relative',
    justifyContent: 'center',
    paddingTop: 22,
    paddingBottom: 18,
  } as ViewStyle,
  accountText: { flex: 1, gap: 2 } as ViewStyle,
  accountLabel: { ...legacyType.field, color: legacyColor.textSecondary } as TextStyle,
  accountLabelTop: {
    position: 'absolute',
    top: 14,
    left: 18,
  } as TextStyle,
  accountAmount: { ...legacyType.homeBalance, color: legacyColor.textPrimary } as TextStyle,
  accountChevron: {
    position: 'absolute',
    right: 18,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  } as ViewStyle,
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
  } as ViewStyle,
  selectPlus: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  choose: { ...legacyType.field, color: legacyColor.primary } as TextStyle,
  fxBox: {
    gap: 4,
    paddingHorizontal: 4,
    marginTop: -4,
  } as ViewStyle,
  fxCredit: {
    ...legacyType.field,
    color: legacyColor.primary,
    fontWeight: '600',
  } as TextStyle,
  fxRate: {
    ...legacyType.caption,
    color: legacyColor.textPrimary,
    fontWeight: '600',
  } as TextStyle,
  fieldRow: {
    minHeight: legacySize.inputHeight,
    borderRadius: 14,
    backgroundColor: '#F7F8FC',
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 12,
    gap: 8,
  } as ViewStyle,
  fieldRowActive: {
    borderColor: 'rgba(18, 38, 170, 0.45)',
    backgroundColor: legacyColor.surface,
    shadowColor: '#1226AA',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  } as ViewStyle,
  fieldCol: {
    flex: 1,
    justifyContent: 'center',
    minHeight: legacySize.inputHeight - 4,
    paddingTop: 10,
    paddingBottom: 8,
  } as ViewStyle,
  fieldLabel: {
    ...legacyType.field,
    position: 'absolute',
    left: 0,
    zIndex: 1,
  } as TextStyle,
  fieldLabelIdle: {
    top: 24,
    color: legacyColor.textSecondary,
  } as TextStyle,
  fieldLabelFloat: {
    top: 10,
    ...legacyType.floating,
    color: legacyColor.textTertiary,
  } as TextStyle,
  noPointer: {
    pointerEvents: 'none',
  } as TextStyle,
  fieldInput: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    padding: 0,
    marginTop: 14,
    width: '100%',
    minHeight: 24,
    zIndex: 2,
  } as TextStyle,
  fieldInputWeb: {
    outlineStyle: 'none',
  } as unknown as TextStyle,
  allHit: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  } as ViewStyle,
  allLabel: {
    ...legacyType.caption,
    color: legacyColor.primary,
    fontWeight: '600',
  } as TextStyle,
  ctaWrap: { marginTop: 4 } as ViewStyle,
  overlayRoot: {
    ...StyleSheet.absoluteFill,
    zIndex: 40,
  } as ViewStyle,
  overlayEnd: { justifyContent: 'flex-end' } as ViewStyle,
  overlayHit: { ...StyleSheet.absoluteFill } as ViewStyle,
  blur: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    backdropFilter: Platform.OS === 'web' ? 'blur(14px)' : undefined,
    WebkitBackdropFilter: Platform.OS === 'web' ? 'blur(14px)' : undefined,
  } as ViewStyle,
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Platform.OS === 'web' ? 'rgba(5, 10, 38, 0.22)' : 'rgba(5, 10, 38, 0.18)',
  } as ViewStyle,
  pickerSheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 10,
    paddingBottom: 24,
    zIndex: 1,
  } as ViewStyle,
  pickerHandle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.border,
    marginBottom: 12,
  } as ViewStyle,
  pickerHead: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 12,
  } as ViewStyle,
  pickerTitle: {
    ...legacyType.homeSection,
    color: legacyColor.textPrimary,
    textAlign: 'center',
  } as TextStyle,
  pickerClose: {
    position: 'absolute',
    right: 0,
    top: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: legacyColor.homeBackground,
  } as ViewStyle,
  pickerList: {
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 4,
  } as ViewStyle,
  pickerRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  } as ViewStyle,
  pickerRowPressed: { opacity: 0.72 } as ViewStyle,
  pickerText: { flex: 1, gap: 2 } as ViewStyle,
  pickerLabel: { ...legacyType.field, color: legacyColor.textSecondary } as TextStyle,
  pickerAmount: { ...legacyType.homeBalance, color: legacyColor.textPrimary, fontSize: 18, lineHeight: 24 } as TextStyle,
  pickerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginLeft: 52,
  } as ViewStyle,
});
