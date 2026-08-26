import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View , ViewStyle, TextStyle} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import { legacyColor, legacyFontFamily, legacyRadius, legacySize, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph, CurrencyGlyph } from '@/features/legacyAccounts/AccountIcons';
import type { AccountCurrency } from '@/features/legacyAccounts/mockData';
import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { CameraChrome } from '@/features/legacyAuth/components/CameraChrome';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { homeCopy } from '@/features/legacyHome/copy';
import { CashhelloBrand, ChevronRightGlyph, BonusCoinGlyph, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { navigateHome, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { formatLegacyBalance } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import { DEMO_SAVED_CARDS, WITHDRAW_BRIDGES } from '@/features/legacyWithdraw/mockData';
import { CardMethodGlyph, ScanGlyph } from '@/features/legacyWithdraw/WithdrawIcons';
import {
  formatAmountGrouped,
  formatCardPan,
  parseWithdrawAmount,
  useLegacyWithdrawStore,
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
  { id: 'kzt', label: homeCopy.balanceLabel, fromId: 'kzt-primary', currency: 'KZT' },
  { id: 'rub', label: homeCopy.balanceLabelRub, fromId: 'rub', currency: 'RUB' },
  { id: 'usd', label: homeCopy.balanceLabelUsd, fromId: 'usd', currency: 'USD' },
  {
    id: 'bonus',
    label: withdrawCopy.bonusAccount,
    fromId: 'bonus',
    bonus: true,
  },
];

const KEYBOARD_NUMBER = Platform.OS === 'web' ? 'numeric' : 'number-pad';

function sourceIdFromFromId(fromId: string): SourceAccountId {
  if (fromId === 'rub') return 'rub';
  if (fromId === 'usd') return 'usd';
  if (fromId === 'bonus') return 'bonus';
  return 'kzt';
}

function amountUnitFor(sourceId: SourceAccountId): string {
  if (sourceId === 'rub') return withdrawCopy.amountUnitRub;
  if (sourceId === 'usd') return withdrawCopy.amountUnitUsd;
  if (sourceId === 'bonus') return withdrawCopy.amountUnitBonus;
  return withdrawCopy.amountUnitTenge;
}

function formatAmountWithUnit(digits: string, unit: string): string {
  const grouped = formatAmountGrouped(digits);
  if (!grouped) return '';
  return `${grouped} ${unit}`;
}

export function CardWithdrawScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.withdrawCard);
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const amountRef = useRef<TextInput>(null);
  const panRef = useRef<TextInput>(null);

  const cardFilled = useLegacyWithdrawStore((s) => s.cardFilled);
  const cardDigits = useLegacyWithdrawStore((s) => s.cardDigits);
  const amountDigits = useLegacyWithdrawStore((s) => s.amountDigits);
  const scanOpen = useLegacyWithdrawStore((s) => s.scanOpen);
  const fromId = useLegacyWithdrawStore((s) => s.fromId);
  const balances = useLegacyTopupStore((s) => s.balances);
  const fillSyntheticCard = useLegacyWithdrawStore((s) => s.fillSyntheticCard);
  const setScanOpen = useLegacyWithdrawStore((s) => s.setScanOpen);
  const setMethod = useLegacyWithdrawStore((s) => s.setMethod);
  const setFromId = useLegacyWithdrawStore((s) => s.setFromId);
  const setCardDigits = useLegacyWithdrawStore((s) => s.setCardDigits);
  const setAmountDigits = useLegacyWithdrawStore((s) => s.setAmountDigits);
  const confirmAndSettle = useLegacyWithdrawStore((s) => s.confirmAndSettle);

  const [accountPickerOpen, setAccountPickerOpen] = useState(false);
  const [savedInfoOpen, setSavedInfoOpen] = useState(false);
  const [panFocused, setPanFocused] = useState(false);
  const [amountFocused, setAmountFocused] = useState(false);
  const [transferring, setTransferring] = useState(false);
  const transferTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (transferTimer.current) clearTimeout(transferTimer.current);
    };
  }, []);

  const selectedSourceId = sourceIdFromFromId(fromId);
  const selectedAccount = useMemo(
    () => SOURCE_ACCOUNTS.find((row) => row.id === selectedSourceId) ?? SOURCE_ACCOUNTS[0],
    [selectedSourceId],
  );
  const sourceBalanceLabel = (account: (typeof SOURCE_ACCOUNTS)[number]) => {
    if (account.bonus) return homeCopy.headerBonus;
    return formatLegacyBalance(balances[account.fromId] ?? 0, account.currency!);
  };

  const panDisplay = formatCardPan(cardDigits);
  const amountUnit = amountUnitFor(selectedSourceId);
  const amountDisplay = formatAmountWithUnit(amountDigits, amountUnit);
  const amountValue = parseWithdrawAmount(amountDigits);
  const canContinue = cardFilled && amountValue > 0;
  const panActive = panFocused || cardDigits.length > 0;
  const amountActive = amountFocused || amountDigits.length > 0;

  useScreenMeta({
    screenName: 'Withdraw card select',
    route: WITHDRAW_BRIDGES.card,
    taskId: 'LOCAL_DRAFT',
    prototypeStatus: 'in_progress',
    screenId: scanOpen ? 'LGC-SCR-091' : cardFilled ? 'LGC-SCR-092' : 'WD-002',
    legacyNodeId: scanOpen ? '648:17578' : cardFilled ? '648:17672' : '804:23664',
  });

  if (scanOpen) {
    return (
      <DebugMetaHost route={WITHDRAW_BRIDGES.card}>
        <CameraChrome
          instruction={withdrawCopy.holdCard}
          onCancel={() => setScanOpen(false)}
          onContinue={fillSyntheticCard}
        />
      </DebugMetaHost>
    );
  }

  return (
    <DebugMetaHost route={WITHDRAW_BRIDGES.card}>
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
        title={withdrawCopy.chooseCard}
        support={withdrawCopy.chooseCardSupport}
        onBack={onBack}
        tabBar={<LegacyTabBar active="home" />}
        overlay={
          <>
      {accountPickerOpen ? (
        <View style={[styles.overlayRoot, styles.overlayEnd]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Закрыть"
            onPress={() => setAccountPickerOpen(false)}
            style={styles.overlayHit}
          >
            <BlurView intensity={18} tint="light" style={styles.blur}>
              <View style={styles.dim} />
            </BlurView>
          </Pressable>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHandle} />
            <View style={styles.pickerHead}>
              <Text style={styles.pickerTitle}>{withdrawCopy.chooseAccount}</Text>
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
                const selected = account.id === selectedSourceId;
                return (
                  <View key={account.id}>
                    {index > 0 ? <View style={styles.pickerDivider} /> : null}
                    <Pressable
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      accessibilityLabel={account.label}
                      onPress={() => {
                        setFromId(account.fromId);
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
      ) : null}

      {savedInfoOpen ? (
        <View style={[styles.overlayRoot, styles.overlayEnd]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Закрыть"
            onPress={() => setSavedInfoOpen(false)}
            style={styles.overlayHit}
          >
            <BlurView intensity={18} tint="light" style={styles.blur}>
              <View style={styles.dim} />
            </BlurView>
          </Pressable>
          <View style={styles.pickerSheet}>
            <View style={styles.pickerHandle} />
            <View style={styles.pickerHead}>
              <Text style={styles.pickerTitle}>{withdrawCopy.savedCardModalTitle}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Закрыть"
                onPress={() => setSavedInfoOpen(false)}
                style={styles.pickerClose}
                hitSlop={8}
              >
                <CloseGlyph />
              </Pressable>
            </View>
            <ScrollView
              style={styles.savedScroll}
              contentContainerStyle={styles.savedScrollContent}
              showsVerticalScrollIndicator
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.pickerList}>
                {DEMO_SAVED_CARDS.map((card, index) => {
                  const selected = cardDigits === card.digits;
                  return (
                    <View key={card.id}>
                      {index > 0 ? <View style={styles.pickerDivider} /> : null}
                      <Pressable
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={`Карта •••• ${card.last4}`}
                        onPress={() => {
                          setCardDigits(card.digits);
                          setSavedInfoOpen(false);
                        }}
                        style={({ pressed }) => [styles.savedCardRow, pressed && styles.pickerRowPressed]}
                      >
                        <View style={styles.savedCardIcon}>
                          <CardMethodGlyph />
                        </View>
                        <Text style={styles.savedCardMask}>•••• {card.last4}</Text>
                        {selected ? <Text style={styles.pickerCheck}>✓</Text> : <ChevronRightGlyph />}
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      ) : null}
          </>
        }
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${withdrawCopy.fromAccount}: ${selectedAccount.label}`}
          onPress={() => setAccountPickerOpen(true)}
          style={styles.accountCard}
        >
          <View style={styles.accountText}>
            <Text style={styles.accountLabel}>{selectedAccount.label}</Text>
            <Text style={styles.accountAmount}>{sourceBalanceLabel(selectedAccount)}</Text>
          </View>
          <ChevronRightGlyph />
        </Pressable>

        <View style={[styles.fieldRow, panActive && styles.fieldRowActive]}>
          <View style={styles.fieldCol}>
            <Text
              style={[
                styles.fieldLabel,
                panActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                styles.noPointer,
              ]}
            >
              {withdrawCopy.cardNumber}
            </Text>
            <TextInput
              ref={panRef}
              value={panDisplay}
              onChangeText={setCardDigits}
              keyboardType={KEYBOARD_NUMBER}
              inputMode="numeric"
              maxLength={24}
              onFocus={() => setPanFocused(true)}
              onBlur={() => setPanFocused(false)}
              style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
              accessibilityLabel={withdrawCopy.cardNumber}
            />
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={withdrawCopy.scanCard}
            onPress={() => setScanOpen(true)}
            style={styles.scanHit}
            hitSlop={8}
          >
            <ScanGlyph />
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={withdrawCopy.savedCardButton}
          onPress={() => setSavedInfoOpen(true)}
          style={({ pressed }) => [styles.savedBtn, pressed && styles.savedBtnPressed]}
        >
          <Text style={styles.savedBtnLabel}>{withdrawCopy.savedCardButton}</Text>
          <ChevronRightGlyph />
        </Pressable>

        <View style={[styles.fieldRow, amountActive && styles.fieldRowActive]}>
          <View style={styles.fieldCol}>
            <Text
              style={[
                styles.fieldLabel,
                amountActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                styles.noPointer,
              ]}
            >
              {withdrawCopy.amountLabel}
            </Text>
            <TextInput
              ref={amountRef}
              value={amountDisplay}
              onChangeText={setAmountDigits}
              keyboardType={KEYBOARD_NUMBER}
              inputMode="numeric"
              onFocus={() => setAmountFocused(true)}
              onBlur={() => setAmountFocused(false)}
              placeholder={amountFocused && !amountDigits ? `0 ${amountUnit}` : undefined}
              placeholderTextColor={legacyColor.textTertiary}
              style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
              accessibilityLabel={withdrawCopy.amountLabel}
            />
          </View>
        </View>

        <View style={styles.transferWrap}>
          <LegacyPrimaryButton
            label={withdrawCopy.transfer}
            disabled={!canContinue}
            loading={transferring}
            onPress={() => {
              if (transferring || !canContinue) return;
              setTransferring(true);
              setMethod('card');
              transferTimer.current = setTimeout(() => {
                confirmAndSettle('success');
                router.replace(`${WITHDRAW_BRIDGES.loading}?ready=1` as never);
              }, 3000);
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
  bonusIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
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
  accountText: { flex: 1, gap: 2 } as ViewStyle,
  accountLabel: { ...legacyType.field, color: legacyColor.textSecondary } as TextStyle,
  accountAmount: { ...legacyType.homeBalance, color: legacyColor.textPrimary } as TextStyle,
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
  scanHit: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(18, 38, 170, 0.06)',
  } as ViewStyle,
  savedBtn: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.14)',
    backgroundColor: legacyColor.surface,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  } as ViewStyle,
  savedBtnPressed: { opacity: 0.85 } as ViewStyle,
  savedBtnLabel: {
    ...legacyType.field,
    color: legacyColor.primary,
    flex: 1,
  } as TextStyle,
  transferWrap: {
    marginTop: 4,
  } as ViewStyle,
  overlayRoot: {
    ...StyleSheet.absoluteFill,
    zIndex: 40,
  } as ViewStyle,
  overlayEnd: { justifyContent: 'flex-end' } as ViewStyle,
  overlayHit: {
    ...StyleSheet.absoluteFill,
  } as ViewStyle,
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
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: legacyRadius.field,
    paddingHorizontal: 12,
    paddingVertical: 4,
  } as ViewStyle,
  pickerRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  } as ViewStyle,
  pickerRowPressed: { opacity: 0.72 } as ViewStyle,
  pickerText: { flex: 1, gap: 2 } as ViewStyle,
  pickerLabel: { ...legacyType.field, color: legacyColor.textSecondary } as TextStyle,
  pickerAmount: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  } as TextStyle,
  pickerCheck: {
    ...legacyType.field,
    color: legacyColor.primary,
    fontWeight: '700',
  } as TextStyle,
  pickerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginLeft: 52,
  } as ViewStyle,
  savedScroll: {
    maxHeight: 320,
  } as ViewStyle,
  savedScrollContent: {
    paddingBottom: 8,
  } as ViewStyle,
  savedCardRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  } as ViewStyle,
  savedCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  savedCardMask: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    flex: 1,
  } as TextStyle,
});
