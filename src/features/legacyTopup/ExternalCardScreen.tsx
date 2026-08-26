import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View , ViewStyle, TextStyle} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';

import { legacyColor, legacySize, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { CashhelloBrand, ChevronRightGlyph, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { homeCopy } from '@/features/legacyHome/copy';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { navigateHome, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { topupCopy } from '@/features/legacyTopup/copy';
import { SYNTHETIC_EXTERNAL_CARD, TOPUP_BRIDGES } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { DEMO_SAVED_CARDS } from '@/features/legacyWithdraw/mockData';
import { CardMethodGlyph } from '@/features/legacyWithdraw/WithdrawIcons';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

const DEFAULT_LAST4 = DEMO_SAVED_CARDS[0]?.last4 ?? '2343';

export function ExternalCardScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.topupCard);
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const cardFilled = useLegacyTopupStore((s) => s.cardFilled);
  const fillSyntheticCard = useLegacyTopupStore((s) => s.fillSyntheticCard);
  const confirmCardTopUp = useLegacyTopupStore((s) => s.confirmCardTopUp);

  const [panFocused, setPanFocused] = useState(false);
  const [expiryFocused, setExpiryFocused] = useState(false);
  const [cvvFocused, setCvvFocused] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const [selectedLast4, setSelectedLast4] = useState<string>(DEFAULT_LAST4);

  useEffect(() => {
    fillSyntheticCard();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- seed card row on mount
    setSelectedLast4(DEFAULT_LAST4);
  }, [fillSyntheticCard]);

  const panActive = panFocused || cardFilled;
  const expiryActive = expiryFocused || cardFilled;
  const cvvActive = cvvFocused || cardFilled;
  const panMask = cardFilled ? `**** **** **** ${selectedLast4}` : '';

  useScreenMeta({
    screenName: 'Legacy External card top-up',
    route: TOPUP_BRIDGES.card,
    taskId: 'RECON-005',
    prototypeStatus: 'in_progress',
    screenId: cardFilled ? 'LGC-SCR-087' : 'LGC-SCR-085',
    legacyNodeId: cardFilled ? '821:30114' : '648:20712',
  });

  const applySavedCard = (last4: string) => {
    setSelectedLast4(last4);
    fillSyntheticCard();
    setSavedOpen(false);
  };

  return (
    <DebugMetaHost route={TOPUP_BRIDGES.card}>
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
        title={topupCopy.funding}
        support={topupCopy.cardSupport}
        onBack={onBack}
        tabBar={<LegacyTabBar active="home" />}
        overlay={
          savedOpen ? (
            <View style={[styles.overlayRoot, styles.overlayEnd]}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Закрыть"
                onPress={() => setSavedOpen(false)}
                style={styles.overlayHit}
              >
                <BlurView intensity={18} tint="light" style={styles.blur}>
                  <View style={styles.dim} />
                </BlurView>
              </Pressable>
              <View style={styles.pickerSheet}>
                <View style={styles.pickerHandle} />
                <View style={styles.pickerHead}>
                  <Text style={styles.pickerTitle}>{topupCopy.savedCardModalTitle}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Закрыть"
                    onPress={() => setSavedOpen(false)}
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
                      const selected = selectedLast4 === card.last4;
                      return (
                        <View key={card.id}>
                          {index > 0 ? <View style={styles.pickerDivider} /> : null}
                          <Pressable
                            accessibilityRole="button"
                            accessibilityState={{ selected }}
                            accessibilityLabel={`Карта •••• ${card.last4}`}
                            onPress={() => applySavedCard(card.last4)}
                            style={({ pressed }) => [
                              styles.savedCardRow,
                              pressed && styles.pickerRowPressed,
                            ]}
                          >
                            <View style={styles.savedCardIcon}>
                              <CardMethodGlyph />
                            </View>
                            <Text style={styles.savedCardMask}>•••• {card.last4}</Text>
                            {selected ? (
                              <Text style={styles.pickerCheck}>✓</Text>
                            ) : (
                              <ChevronRightGlyph />
                            )}
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : null
        }
      >
        <View style={[styles.fieldRow, panActive && styles.fieldRowActive]}>
          <View style={[styles.fieldCol, styles.fieldColFull]}>
            <Text
              style={[
                styles.fieldLabel,
                panActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                styles.noPointer,
              ]}
            >
              {topupCopy.cardNumber}
            </Text>
            <TextInput
              editable={false}
              value={panMask}
              onFocus={() => setPanFocused(true)}
              onBlur={() => setPanFocused(false)}
              style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
              accessibilityLabel={topupCopy.cardNumber}
            />
          </View>
        </View>

        <View style={styles.halfRow}>
          <View style={[styles.fieldRow, styles.halfField, expiryActive && styles.fieldRowActive]}>
            <View style={styles.fieldCol}>
              <Text
                style={[
                  styles.fieldLabel,
                  expiryActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                  styles.noPointer,
                ]}
              >
                {topupCopy.expiry}
              </Text>
              <TextInput
                editable={false}
                value={cardFilled ? SYNTHETIC_EXTERNAL_CARD.expiry : ''}
                onFocus={() => setExpiryFocused(true)}
                onBlur={() => setExpiryFocused(false)}
                style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
                accessibilityLabel={topupCopy.expiry}
              />
            </View>
          </View>
          <View style={[styles.fieldRow, styles.halfField, cvvActive && styles.fieldRowActive]}>
            <View style={styles.fieldCol}>
              <Text
                style={[
                  styles.fieldLabel,
                  cvvActive ? styles.fieldLabelFloat : styles.fieldLabelIdle,
                  styles.noPointer,
                ]}
              >
                {topupCopy.cvv}
              </Text>
              <TextInput
                editable={false}
                value={cardFilled ? SYNTHETIC_EXTERNAL_CARD.cvvMask : ''}
                onFocus={() => setCvvFocused(true)}
                onBlur={() => setCvvFocused(false)}
                style={[styles.fieldInput, Platform.OS === 'web' && styles.fieldInputWeb]}
                accessibilityLabel={topupCopy.cvv}
              />
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={topupCopy.savedCardButton}
          onPress={() => setSavedOpen(true)}
          style={({ pressed }) => [styles.savedBtn, pressed && styles.savedBtnPressed]}
        >
          <Text style={styles.savedBtnLabel}>{topupCopy.savedCardButton}</Text>
          <ChevronRightGlyph />
        </Pressable>

        <View style={styles.ctaWrap}>
          <LegacyPrimaryButton
            label={topupCopy.topUp}
            disabled={!cardFilled}
            onPress={() => {
              confirmCardTopUp();
              navigateHome(router);
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
  fieldRow: {
    minHeight: legacySize.inputHeight,
    borderRadius: 14,
    backgroundColor: '#F7F8FC',
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
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
  halfRow: {
    flexDirection: 'row',
    gap: 12,
  } as ViewStyle,
  halfField: {
    flex: 1,
    paddingRight: 16,
  } as ViewStyle,
  fieldCol: {
    flex: 1,
    justifyContent: 'center',
    minHeight: legacySize.inputHeight - 4,
    paddingTop: 10,
    paddingBottom: 8,
  } as ViewStyle,
  fieldColFull: {
    paddingRight: 0,
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
  savedBtn: {
    minHeight: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.14)',
    backgroundColor: legacyColor.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  } as ViewStyle,
  savedBtnPressed: { opacity: 0.85 } as ViewStyle,
  savedBtnLabel: {
    ...legacyType.field,
    color: legacyColor.primary,
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
  pickerRowPressed: { opacity: 0.72 } as ViewStyle,
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
