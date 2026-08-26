import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { homeCopy } from '@/features/legacyHome/copy';
import { CashhelloBrand, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { navigateHome } from '@/features/legacyHome/session';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { profileCopy } from '@/features/legacyProfile/copy';
import {
  LimitCheckGlyph,
  LimitLockGlyph,
  StatusHeroGlyph,
} from '@/features/legacyProfile/ProfileIcons';
import { PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

const STANDARD_LIMITS = [
  { label: profileCopy.limitSingleTx, value: profileCopy.limitAmount },
  { label: profileCopy.limitStorage, value: profileCopy.limitAmount },
  { label: profileCopy.limitDaily, value: profileCopy.limitAmount },
] as const;

const LOCKED_FEATURES = [
  profileCopy.lockedTransfers,
  profileCopy.lockedAbroad,
  profileCopy.lockedWithdraw,
  profileCopy.lockedPayments,
] as const;

function BackArrowGlyph() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M15 5L8 12l7 7"
        stroke={legacyColor.textPrimary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function IdentificationStatusScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.profileStatus);

  useScreenMeta({
    screenName: 'Legacy Identification status',
    route: PROFILE_BRIDGES.status,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-068',
  });

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.status}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <CashhelloBrand onPress={() => navigateHome(router)} />
          <ProfileBonusHeader
            amount={homeCopy.headerBonus}
            onProfilePress={() => router.replace(PROFILE_BRIDGES.profile as never)}
          />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.heroVisual}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Назад"
                onPress={onBack}
                style={styles.backBtn}
                hitSlop={8}
              >
                <BackArrowGlyph />
              </Pressable>
              <View style={styles.heroPhone}>
                <StatusHeroGlyph />
              </View>
            </View>
            <View style={styles.heroCopy}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{profileCopy.statusDetailBadge}</Text>
              </View>
              <Text style={styles.heroTitle}>{profileCopy.statusDetailTitle}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{profileCopy.standardLimitsTitle}</Text>
          <View style={styles.card}>
            {STANDARD_LIMITS.map((row, index) => (
              <View
                key={row.label}
                style={[styles.limitRow, index === STANDARD_LIMITS.length - 1 && styles.limitRowLast]}
              >
                <LimitCheckGlyph />
                <View style={styles.limitCopy}>
                  <Text style={styles.limitLabel}>{row.label}</Text>
                  <Text style={styles.limitValue}>{row.value}</Text>
                </View>
              </View>
            ))}
            <Text style={styles.lawNote}>{profileCopy.limitLawNote}</Text>
          </View>

          <View style={[styles.card, styles.lockedCard]}>
            {LOCKED_FEATURES.map((label, index) => (
              <View
                key={label}
                style={[styles.lockedRow, index === LOCKED_FEATURES.length - 1 && styles.lockedRowLast]}
              >
                <LimitLockGlyph />
                <Text style={styles.lockedLabel}>{label}</Text>
                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>{profileCopy.ageBadge}</Text>
                </View>
              </View>
            ))}
            <Text style={styles.lockedHint}>{profileCopy.lockedHint}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <LegacyPrimaryButton
            label={profileCopy.expandLimits}
            onPress={() => Alert.alert(profileCopy.expandLimits, profileCopy.expandLimitsStub)}
          />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 18,
    minHeight: 36,
    backgroundColor: legacyColor.homeBackground,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: legacySpace.screenX, paddingTop: 16, paddingBottom: 24 },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: legacyColor.primary,
    borderRadius: legacyRadius.button,
    paddingTop: 12,
    paddingBottom: 18,
    paddingHorizontal: 16,
  },
  heroVisual: {
    alignItems: 'center',
    gap: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: legacyColor.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPhone: {
    marginTop: 2,
  },
  heroCopy: { flex: 1, gap: 8 },
  heroBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  heroBadgeText: {
    ...legacyType.caption,
    color: legacyColor.primaryOnPrimary,
    fontWeight: '600',
  },
  heroTitle: {
    ...legacyType.title,
    color: legacyColor.primaryOnPrimary,
    fontSize: 20,
    lineHeight: 26,
  },
  sectionTitle: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 10,
  },
  card: {
    backgroundColor: legacyColor.surface,
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    padding: 15,
  },
  lockedCard: { marginTop: 16 },
  limitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: legacyColor.border,
  },
  limitRowLast: {
    borderBottomWidth: 0,
    marginBottom: 8,
    paddingBottom: 0,
  },
  limitCopy: { flex: 1, gap: 4 },
  limitLabel: { ...legacyType.body, color: legacyColor.textSecondary },
  limitValue: { ...legacyType.field, color: legacyColor.textPrimary, fontWeight: '700' },
  lawNote: { ...legacyType.caption, color: legacyColor.textTertiary, marginTop: 4 },
  lockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: legacyColor.border,
  },
  lockedRowLast: {
    borderBottomWidth: 0,
    marginBottom: 12,
    paddingBottom: 0,
  },
  lockedLabel: { ...legacyType.field, color: legacyColor.textPrimary, flex: 1 },
  ageBadge: {
    backgroundColor: legacyColor.accountIconBg,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  ageBadgeText: { ...legacyType.caption, color: legacyColor.primary, fontWeight: '700' },
  lockedHint: { ...legacyType.caption, color: legacyColor.textSecondary, lineHeight: 18 },
  footer: {
    paddingHorizontal: legacySpace.screenX,
    paddingBottom: legacySpace.bottom,
    paddingTop: 8,
    backgroundColor: legacyColor.homeBackground,
  },
});
