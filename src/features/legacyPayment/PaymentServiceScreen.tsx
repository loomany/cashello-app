import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type ImageStyle,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';

import { legacyColor, legacyRadius, legacySize, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph, CurrencyGlyph } from '@/features/legacyAccounts/AccountIcons';
import type { AccountCurrency } from '@/features/legacyAccounts/mockData';
import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import {
  formatKzPhone,
  KZ_PHONE_CARET_MIN,
  kzPhoneCaretPosition,
  parseKzPhoneInput,
} from '@/features/legacyAuth/machine';
import { homeCopy } from '@/features/legacyHome/copy';
import { BonusCoinGlyph, CashhelloBrand, ChevronRightGlyph, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { guestBalanceLabel, homeHref, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { paymentCopy } from '@/features/legacyPayment/copy';
import { getPaymentService, PAYMENT_BRIDGES } from '@/features/legacyPayment/mockData';
import { useLegacyPaymentStore } from '@/features/legacyPayment/store';
import { formatLegacyBalance } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import {
  formatAmountGrouped,
  parseWithdrawAmount,
  phoneFilled,
} from '@/features/legacyWithdraw/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

type SourceAccountId = 'kzt' | 'rub' | 'usd' | 'bonus';

const SOURCE_ACCOUNTS: {
  id: SourceAccountId;
  label: string;
  fromId: string;
  currency?: AccountCurrency;
  bonus?: boolean;
}[] = [
  { id: 'bonus', label: paymentCopy.bonusAccount, fromId: 'bonus', bonus: true },
  { id: 'kzt', label: homeCopy.balanceLabel, fromId: 'kzt-primary', currency: 'KZT' },
  { id: 'rub', label: homeCopy.balanceLabelRub, fromId: 'rub', currency: 'RUB' },
  { id: 'usd', label: homeCopy.balanceLabelUsd, fromId: 'usd', currency: 'USD' },
];

const KEYBOARD_NUMBER = Platform.OS === 'web' ? 'numeric' : 'number-pad';

function amountUnitFor(sourceId: SourceAccountId): string {
  if (sourceId === 'rub') return paymentCopy.amountUnitRub;
  if (sourceId === 'usd') return paymentCopy.amountUnitUsd;
  if (sourceId === 'bonus') return paymentCopy.amountUnitBonus;
  return paymentCopy.amountUnitTenge;
}

function formatAmountWithUnit(digits: string, unit: string): string {
  const grouped = formatAmountGrouped(digits);
  if (!grouped) return '';
  return `${grouped} ${unit}`;
}

function HeartGlyph({ filled }: { filled: boolean }) {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24">
      <Path
        d="M12 20.5S4.5 15.2 4.5 9.8A3.9 3.9 0 0 1 12 7.2a3.9 3.9 0 0 1 7.5 2.6C19.5 15.2 12 20.5 12 20.5z"
        fill={filled ? legacyColor.primary : 'none'}
        stroke={legacyColor.primary}
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Service top-up: phone, amount, pay-from account (bonus / KZT / FX), favorite. */
export function PaymentServiceScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.paymentService);
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const params = useLocalSearchParams<{ id?: string; phone?: string; amount?: string }>();
  const serviceId = typeof params.id === 'string' ? params.id : '';
  const service = getPaymentService(serviceId);

  const phoneRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const balances = useLegacyTopupStore((s) => s.balances);
  const isFavorite = useLegacyPaymentStore((s) => Boolean(s.favorites[serviceId]));
  const toggleFavorite = useLegacyPaymentStore((s) => s.toggleFavorite);

  const [sourceId, setSourceId] = useState<SourceAccountId>('kzt');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [amountDigits, setAmountDigits] = useState('');
  const [accountPickerOpen, setAccountPickerOpen] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [phoneSelection, setPhoneSelection] = useState<{ start: number; end: number } | undefined>();
  const [paying, setPaying] = useState(false);
  const payTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (payTimer.current) clearTimeout(payTimer.current);
    };
  }, []);

  useEffect(() => {
    const phoneParam = typeof params.phone === 'string' ? params.phone : '';
    if (phoneParam) {
      setPhoneDigits(parseKzPhoneInput(phoneParam, ''));
    } else {
      setPhoneDigits('');
    }

    const amountParam = typeof params.amount === 'string' ? params.amount : '';
    if (amountParam) {
      setAmountDigits(amountParam.replace(/\D/g, '').slice(0, 12));
    } else {
      setAmountDigits('');
    }
  }, [params.phone, params.amount, serviceId]);

  const route = service ? PAYMENT_BRIDGES.service(service.id) : PAYMENT_BRIDGES.root;

  useScreenMeta({
    screenName: service ? `Payment ${service.name}` : 'Payment service',
    route,
    taskId: 'LOCAL_DRAFT',
    prototypeStatus: 'in_progress',
    screenId: 'PAY-002',
  });

  const selectedAccount = useMemo(
    () => SOURCE_ACCOUNTS.find((row) => row.id === sourceId) ?? SOURCE_ACCOUNTS[1],
    [sourceId],
  );

  const sourceBalanceLabel = (account: (typeof SOURCE_ACCOUNTS)[number]) => {
    if (isGuest) {
      return guestBalanceLabel(account.bonus ? 'bonus' : account.currency!);
    }
    if (account.bonus) return homeCopy.headerBonus;
    return formatLegacyBalance(balances[account.fromId] ?? 0, account.currency!);
  };

  const phoneDisplay = formatKzPhone(phoneDigits);
  const amountUnit = amountUnitFor(sourceId);
  const amountDisplay = formatAmountWithUnit(amountDigits, amountUnit);
  const amountValue = parseWithdrawAmount(amountDigits);
  const canPay = Boolean(service) && phoneFilled(phoneDigits) && amountValue > 0;
  const phoneActive = true;
  const amountActive = amountFocused || amountDigits.length > 0;

  const placePhoneCaret = () => {
    const pos = kzPhoneCaretPosition(phoneDisplay);
    setPhoneSelection({ start: pos, end: pos });
    phoneRef.current?.setNativeProps?.({ selection: { start: pos, end: pos } });
  };

  useEffect(() => {
    if (!phoneFocused) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- caret must follow mask reformat
    placePhoneCaret();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-place after mask reformats
  }, [phoneDisplay, phoneFocused]);

  const onPhoneSelectionChange = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    const { start, end } = event.nativeEvent.selection;
    const pos = kzPhoneCaretPosition(phoneDisplay);
    const min = KZ_PHONE_CARET_MIN;
    setPhoneSelection({
      start: Math.min(Math.max(start, min), pos),
      end: Math.min(Math.max(end, min), Math.max(pos, min)),
    });
  };

  if (!service) {
    return (
      <DebugMetaHost route={PAYMENT_BRIDGES.root}>
        <AuthFormLayout
          title={paymentCopy.serviceNotFound}
          onBack={onBack}
          tabBar={<LegacyTabBar active="payment" />}
        >
          <LegacyPrimaryButton label={paymentCopy.title} onPress={() => router.replace(PAYMENT_BRIDGES.root as never)} />
        </AuthFormLayout>
      </DebugMetaHost>
    );
  }

  return (
    <DebugMetaHost route={route}>
      <AuthFormLayout
        titleCentered
        title={service.name}
        onBack={onBack}
        header={
          <View style={styles.topHeader}>
            <CashhelloBrand onPress={() => router.replace(homeHref(isGuest) as never)} />
            <ProfileBonusHeader
              amount={homeCopy.headerBonus}
              onProfilePress={() => router.push(profileHref(isGuest) as never)}
            />
          </View>
        }
        tabBar={<LegacyTabBar active="payment" />}
        overlay={
          accountPickerOpen ? (
            <View style={[styles.overlayRoot, styles.overlayEnd]}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Закрыть"
                onPress={() => setAccountPickerOpen(false)}
                style={styles.overlayHit}
              >
                {Platform.OS === 'web' ? (
                  <View style={[styles.blur, styles.dim]} />
                ) : (
                  <BlurView intensity={18} tint="light" style={styles.blur}>
                    <View style={styles.dim} />
                  </BlurView>
                )}
              </Pressable>
              <View style={styles.pickerSheet}>
                <View style={styles.pickerHandle} />
                <View style={styles.pickerHead}>
                  <Text style={styles.pickerTitle}>{paymentCopy.chooseAccount}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Закрыть"
                    onPress={() => setAccountPickerOpen(false)}
                    style={styles.pickerClose}
                    hitSlop={8}
                  >
                    <CloseGlyph />
                  </Pressable>
                </View>
                <View style={styles.pickerList}>
                  {SOURCE_ACCOUNTS.map((account, index) => {
                    const selected = account.id === sourceId;
                    return (
                      <View key={account.id}>
                        {index > 0 ? <View style={styles.pickerDivider} /> : null}
                        <Pressable
                          accessibilityRole="button"
                          accessibilityState={{ selected }}
                          accessibilityLabel={account.label}
                          onPress={() => {
                            setSourceId(account.id);
                            setAccountPickerOpen(false);
                          }}
                          style={({ pressed }) => [styles.pickerRow, pressed && styles.pickerRowPressed]}
                        >
                          {account.bonus ? (
                            <View style={styles.bonusIcon}>
                              <BonusCoinGlyph />
                            </View>
                          ) : (
                            <CurrencyGlyph currency={account.currency!} size={40} />
                          )}
                          <View style={styles.pickerText}>
                            <Text style={styles.pickerLabel}>{account.label}</Text>
                            <Text style={styles.pickerAmount}>{sourceBalanceLabel(account)}</Text>
                          </View>
                          {selected ? <Text style={styles.pickerCheck}>✓</Text> : null}
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
        <View style={styles.serviceCard}>
          <View style={[styles.logoSlot, { backgroundColor: service.logoBackground }]}>
            <Image source={service.logo} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.serviceCopy}>
            <Text style={styles.serviceName}>{service.name}</Text>
            {service.subtitle ? <Text style={styles.serviceSub}>{service.subtitle}</Text> : null}
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? paymentCopy.favoriteRemove : paymentCopy.favoriteAdd}
            accessibilityState={{ selected: isFavorite }}
            onPress={() => {
              if (isGuest) {
                router.push(HOME_BRIDGES.login as never);
                return;
              }
              toggleFavorite(service.id);
            }}
            style={styles.heartHit}
            hitSlop={8}
          >
            <HeartGlyph filled={isFavorite} />
          </Pressable>
        </View>

        <View style={[styles.fieldRow, phoneFocused && styles.fieldRowActive]}>
          <View style={styles.fieldCol}>
            <Text
              style={[
                styles.fieldLabel,
                phoneActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                styles.noPointer,
              ]}
            >
              {paymentCopy.phoneNumber}
            </Text>
            <TextInput
              ref={phoneRef}
              value={phoneDisplay}
              onChangeText={(t) => setPhoneDigits(parseKzPhoneInput(t, phoneDigits))}
              keyboardType="phone-pad"
              inputMode="tel"
              selection={phoneSelection}
              onSelectionChange={onPhoneSelectionChange}
              onFocus={() => {
                setPhoneFocused(true);
                requestAnimationFrame(placePhoneCaret);
              }}
              onBlur={() => {
                setPhoneFocused(false);
                setPhoneSelection(undefined);
              }}
              style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
              accessibilityLabel={paymentCopy.phoneNumber}
            />
          </View>
        </View>

        <View style={[styles.fieldRow, amountActive && styles.fieldRowActive]}>
          <View style={styles.fieldCol}>
            <Text
              style={[
                styles.fieldLabel,
                amountActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                styles.noPointer,
              ]}
            >
              {paymentCopy.amountLabel}
            </Text>
            <TextInput
              ref={amountRef}
              value={amountDisplay}
              onChangeText={(t) => setAmountDigits(t.replace(/\D/g, '').slice(0, 12))}
              keyboardType={KEYBOARD_NUMBER}
              inputMode="numeric"
              onFocus={() => setAmountFocused(true)}
              onBlur={() => setAmountFocused(false)}
              placeholder={amountFocused && !amountDigits ? `0 ${amountUnit}` : undefined}
              placeholderTextColor={legacyColor.textTertiary}
              style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
              accessibilityLabel={paymentCopy.amountLabel}
            />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${paymentCopy.payFrom}: ${selectedAccount.label}`}
          onPress={() => {
            if (isGuest) {
              router.push(HOME_BRIDGES.login as never);
              return;
            }
            setAccountPickerOpen(true);
          }}
          style={styles.accountCard}
        >
          <View style={styles.accountLead}>
            {selectedAccount.bonus ? (
              <View style={styles.bonusIcon}>
                <BonusCoinGlyph />
              </View>
            ) : (
              <CurrencyGlyph currency={selectedAccount.currency!} size={40} />
            )}
            <View style={styles.accountText}>
              <Text style={styles.accountLabel}>{paymentCopy.payFrom}</Text>
              <Text style={styles.accountName}>{selectedAccount.label}</Text>
              <Text style={styles.accountAmount}>{sourceBalanceLabel(selectedAccount)}</Text>
            </View>
          </View>
          <ChevronRightGlyph />
        </Pressable>

        <View style={styles.payWrap}>
          <LegacyPrimaryButton
            label={paymentCopy.payCta}
            disabled={!canPay}
            loading={paying}
            onPress={() => {
              if (isGuest) {
                router.push(HOME_BRIDGES.login as never);
                return;
              }
              if (paying || !canPay) return;
              setPaying(true);
              payTimer.current = setTimeout(() => {
                setPaying(false);
                Alert.alert(service.name, paymentCopy.paySuccess);
              }, 900);
            }}
          />
        </View>
      </AuthFormLayout>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  serviceCard: {
    minHeight: 72,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  } as ViewStyle,
  logoSlot: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: legacyColor.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  logo: { width: '100%', height: '100%' } as ImageStyle,
  serviceCopy: { flex: 1, gap: 2 } as ViewStyle,
  serviceName: { ...legacyType.field, color: legacyColor.textPrimary, fontWeight: '700' } as TextStyle,
  serviceSub: { ...legacyType.caption, color: legacyColor.primary } as TextStyle,
  heartHit: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
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
  accountCard: {
    minHeight: 90,
    borderRadius: 14,
    backgroundColor: legacyColor.surface,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.12)',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  } as ViewStyle,
  accountLead: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 } as ViewStyle,
  accountText: { flex: 1, gap: 2 } as ViewStyle,
  accountLabel: { ...legacyType.floating, color: legacyColor.textTertiary } as TextStyle,
  accountName: { ...legacyType.field, color: legacyColor.textPrimary, fontWeight: '700' } as TextStyle,
  accountAmount: { ...legacyType.caption, color: legacyColor.textSecondary } as TextStyle,
  bonusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  payWrap: { marginTop: 4 } as ViewStyle,
  overlayRoot: { ...StyleSheet.absoluteFill, zIndex: 40 } as ViewStyle,
  overlayEnd: { justifyContent: 'flex-end' } as ViewStyle,
  overlayHit: { ...StyleSheet.absoluteFill } as ViewStyle,
  blur: { ...StyleSheet.absoluteFill, overflow: 'hidden' } as ViewStyle,
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
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.accountIconBg,
    marginBottom: 10,
  } as ViewStyle,
  pickerHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  } as ViewStyle,
  pickerTitle: { ...legacyType.title, color: legacyColor.textPrimary, fontSize: 18, lineHeight: 24 } as TextStyle,
  pickerClose: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' } as ViewStyle,
  pickerList: {
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    overflow: 'hidden',
  } as ViewStyle,
  pickerDivider: { height: 1, backgroundColor: legacyColor.border } as ViewStyle,
  pickerRow: {
    minHeight: 64,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: legacyColor.surface,
  } as ViewStyle,
  pickerRowPressed: { backgroundColor: legacyColor.accountIconBg } as ViewStyle,
  pickerText: { flex: 1, gap: 2 } as ViewStyle,
  pickerLabel: { ...legacyType.field, color: legacyColor.textPrimary, fontWeight: '700' } as TextStyle,
  pickerAmount: { ...legacyType.caption, color: legacyColor.textSecondary } as TextStyle,
  pickerCheck: { ...legacyType.field, color: legacyColor.primary, fontWeight: '700' } as TextStyle,
});
