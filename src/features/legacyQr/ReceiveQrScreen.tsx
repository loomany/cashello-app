import { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View , ViewStyle, TextStyle} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';

import { legacyColor, legacyRadius, legacySize, legacySpace, legacyType } from '@/design/legacyTokens';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { homeCopy } from '@/features/legacyHome/copy';
import { CashhelloBrand, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { homeHref, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { qrCopy } from '@/features/legacyQr/copy';
import { buildReceiveQrPayload, QR_BRIDGES } from '@/features/legacyQr/mockData';
import { formatAmountGrouped, parseWithdrawAmount } from '@/features/legacyWithdraw/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

const KEYBOARD_NUMBER = Platform.OS === 'web' ? 'numeric' : 'number-pad';

function formatAmountWithUnit(digits: string): string {
  const grouped = formatAmountGrouped(digits);
  if (!grouped) return '';
  return `${grouped} ${qrCopy.amountUnit}`;
}

/** Unified receive-QR: amount → generate → show code. */
export function ReceiveQrScreen() {
  const router = useRouter();
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const [amountDigits, setAmountDigits] = useState('');
  const [amountFocused, setAmountFocused] = useState(false);
  const [generatedAmount, setGeneratedAmount] = useState<number | null>(null);

  useScreenMeta({
    screenName: 'Legacy Receive QR',
    route: QR_BRIDGES.root,
    taskId: 'LOCAL_DRAFT',
    prototypeStatus: 'in_progress',
    screenId: 'QR-001',
  });

  const amountValue = parseWithdrawAmount(amountDigits);
  const amountDisplay = formatAmountWithUnit(amountDigits);
  const amountActive = amountFocused || amountDigits.length > 0;
  const canGenerate = amountValue > 0;
  const showingQr = generatedAmount !== null && generatedAmount > 0;

  const payload = useMemo(
    () => (showingQr ? buildReceiveQrPayload(generatedAmount!) : ''),
    [showingQr, generatedAmount],
  );

  const onGenerate = () => {
    if (!canGenerate) return;
    if (isGuest) {
      router.push(HOME_BRIDGES.login as never);
      return;
    }
    setGeneratedAmount(amountValue);
  };

  const onNewAmount = () => {
    setGeneratedAmount(null);
    setAmountDigits('');
  };

  return (
    <DebugMetaHost route={QR_BRIDGES.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.shell}>
          <View style={styles.header}>
            <CashhelloBrand onPress={() => router.replace(homeHref(isGuest) as never)} />
            <ProfileBonusHeader
              amount={homeCopy.headerBonus}
              onProfilePress={() => router.push(profileHref(isGuest) as never)}
            />
          </View>

          <View style={styles.body}>
            <Text style={styles.title}>{qrCopy.title}</Text>
            <Text style={styles.hero}>{qrCopy.hero}</Text>
            <Text style={styles.support}>{qrCopy.support}</Text>

            {showingQr ? (
              <View style={styles.qrBlock}>
                <View style={styles.qrCard}>
                  <QRCode
                    value={payload}
                    size={220}
                    color={legacyColor.textPrimary}
                    backgroundColor={legacyColor.surface}
                  />
                </View>
                <Text style={styles.qrAmount}>
                  {qrCopy.amountPrefix} {formatAmountGrouped(String(generatedAmount))} {qrCopy.amountUnit}
                </Text>
                <Text style={styles.qrHint}>{qrCopy.qrHint}</Text>
                <View style={styles.ctaWrap}>
                  <LegacyPrimaryButton label={qrCopy.regenerateCta} onPress={onNewAmount} />
                </View>
              </View>
            ) : (
              <View style={styles.formBlock}>
                <View style={[styles.fieldRow, amountActive && styles.fieldRowActive]}>
                  <View style={styles.fieldCol}>
                    <Text
                      style={[
                        styles.fieldLabel,
                        amountActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                        styles.noPointer,
                      ]}
                    >
                      {qrCopy.amountLabel}
                    </Text>
                    <TextInput
                      value={amountDisplay}
                      onChangeText={(t) => setAmountDigits(t.replace(/\D/g, '').slice(0, 12))}
                      keyboardType={KEYBOARD_NUMBER}
                      inputMode="numeric"
                      onFocus={() => setAmountFocused(true)}
                      onBlur={() => setAmountFocused(false)}
                      placeholder={amountFocused && !amountDigits ? `0 ${qrCopy.amountUnit}` : undefined}
                      placeholderTextColor={legacyColor.textTertiary}
                      style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
                      accessibilityLabel={qrCopy.amountLabel}
                    />
                  </View>
                </View>
                <View style={styles.ctaWrap}>
                  <LegacyPrimaryButton
                    label={qrCopy.generateCta}
                    disabled={!canGenerate}
                    onPress={onGenerate}
                  />
                </View>
              </View>
            )}
          </View>

          <LegacyTabBar active="qr" />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground } as ViewStyle,
  shell: { flex: 1 } as ViewStyle,
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 18,
    minHeight: 36,
  } as ViewStyle,
  body: {
    flex: 1,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 20,
    gap: 10,
  } as ViewStyle,
  title: { ...legacyType.title, color: legacyColor.textPrimary } as TextStyle,
  hero: {
    ...legacyType.homeSection,
    color: legacyColor.primary,
    marginTop: 4,
  } as TextStyle,
  support: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    marginBottom: 8,
  } as TextStyle,
  formBlock: { gap: 16, marginTop: 8 } as ViewStyle,
  ctaWrap: { width: '100%' } as ViewStyle,
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
  qrBlock: {
    marginTop: 12,
    alignItems: 'center',
    gap: 14,
  } as ViewStyle,
  qrCard: {
    width: 260,
    height: 260,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  qrAmount: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  } as TextStyle,
  qrHint: {
    ...legacyType.caption,
    color: legacyColor.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  } as TextStyle,
});
