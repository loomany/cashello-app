import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { formatKzPhone } from '@/features/legacyAuth/machine';
import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import { homeCopy } from '@/features/legacyHome/copy';
import { CashhelloBrand, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { navigateHome, useLegacySessionStore } from '@/features/legacyHome/session';
import { profileCopy } from '@/features/legacyProfile/copy';
import { ProfileConfirmSheet } from '@/features/legacyProfile/ProfileConfirmSheet';
import {
  DeleteAccountGlyph,
  LegacyToggle,
  LogoutGlyph,
  PhoneRowGlyph,
  PromoTagGlyph,
  StatusProgressRing,
} from '@/features/legacyProfile/ProfileIcons';
import { PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

type ConfirmKind = 'logout' | 'delete' | null;

function displayPhone(digits: string): string {
  return formatKzPhone(digits).replace(/_/g, '').replace(/\s+/g, ' ').trim();
}

export function ProfileScreen() {
  const router = useRouter();
  const phoneDigits = useLegacyProfileStore((s) => s.phoneDigits);
  const pushEnabled = useLegacyProfileStore((s) => s.pushEnabled);
  const togglePush = useLegacyProfileStore((s) => s.togglePush);
  const [promoCode, setPromoCode] = useState('');
  const [confirmKind, setConfirmKind] = useState<ConfirmKind>(null);

  useScreenMeta({
    screenName: 'Legacy Account / Profile',
    route: PROFILE_BRIDGES.profile,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-066',
    legacyNodeId: '648:19179',
  });

  const goGuestHome = () => {
    setConfirmKind(null);
    useLegacyAuthStore.getState().reset();
    useLegacySessionStore.getState().enterGuest();
    router.replace(HOME_BRIDGES.guestHome as never);
  };

  const goAuth = () => {
    setConfirmKind(null);
    useLegacyAuthStore.getState().reset();
    useLegacySessionStore.getState().enterGuest();
    router.replace(PROFILE_BRIDGES.auth as never);
  };

  const applyPromo = () => {
    const code = promoCode.trim();
    if (!code) {
      Alert.alert(profileCopy.promoPlaceholder, profileCopy.promoEmpty);
      return;
    }
    Alert.alert(profileCopy.promoApply, profileCopy.promoApplied);
    setPromoCode('');
  };

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.profile}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <CashhelloBrand onPress={() => navigateHome(router)} />
          <ProfileBonusHeader amount={homeCopy.headerBonus} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.statusCard}>
            <View style={styles.statusTop}>
              <StatusProgressRing percent={25} />
              <View style={styles.statusCopy}>
                <Text style={styles.statusEyebrow}>{profileCopy.statusEyebrow}</Text>
                <Text style={styles.statusTitle}>{profileCopy.statusUnidentified}</Text>
              </View>
            </View>
            <View style={styles.statusDivider} />
            <Text style={styles.statusHint}>{profileCopy.statusHint}</Text>
            <Pressable
              accessibilityRole="link"
              accessibilityLabel={profileCopy.statusMore}
              onPress={() => router.push(PROFILE_BRIDGES.status as never)}
              hitSlop={8}
            >
              <Text style={styles.statusMore}>{profileCopy.statusMore}</Text>
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <PhoneRowGlyph />
            <View style={styles.infoCopy}>
              <Text style={styles.infoLabel}>{profileCopy.phoneLabel}</Text>
              <Text
                style={styles.infoValue}
                accessibilityLabel={`${profileCopy.phoneLabel} ${displayPhone(phoneDigits)}`}
              >
                {displayPhone(phoneDigits)}
              </Text>
            </View>
          </View>

          <View style={styles.promoCard}>
            <PromoTagGlyph />
            <TextInput
              style={styles.promoInput}
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder={profileCopy.promoPlaceholder}
              placeholderTextColor={legacyColor.textTertiary}
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={applyPromo}
              accessibilityLabel={profileCopy.promoPlaceholder}
            />
          </View>

          <Text style={styles.section}>{profileCopy.settingsSection}</Text>

          <View style={styles.settingsCard}>
            <View style={styles.settingsRow}>
              <Text style={styles.rowLabel}>{profileCopy.pushNotifications}</Text>
              <LegacyToggle value={pushEnabled} onValueChange={togglePush} />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={profileCopy.changePin}
              onPress={() => {
                useLegacyProfileStore.getState().resetPinChange();
                router.push(PROFILE_BRIDGES.pin as never);
              }}
              style={styles.settingsRow}
            >
              <Text style={styles.rowLabel}>{profileCopy.changePin}</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={profileCopy.documents}
              onPress={() => router.push(PROFILE_BRIDGES.documentsStub as never)}
              style={[styles.settingsRow, styles.settingsRowLast]}
            >
              <Text style={styles.rowLabel}>{profileCopy.documents}</Text>
            </Pressable>
          </View>

          <Text style={styles.section}>{profileCopy.sessionSection}</Text>
          <Text style={styles.sessionSupport}>{profileCopy.sessionSupport}</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={profileCopy.logout}
            onPress={() => setConfirmKind('logout')}
            style={[styles.card, styles.logoutCard]}
          >
            <Text style={styles.rowLabel}>{profileCopy.logout}</Text>
            <LogoutGlyph />
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={profileCopy.deleteAccount}
            onPress={() => setConfirmKind('delete')}
            style={[styles.card, styles.deleteCard]}
          >
            <Text style={styles.rowLabel}>{profileCopy.deleteAccount}</Text>
            <DeleteAccountGlyph />
          </Pressable>
        </ScrollView>

        <LegacyTabBar active="profile" />
      </SafeAreaView>

      <ProfileConfirmSheet
        visible={confirmKind === 'logout'}
        title={profileCopy.logoutConfirmTitle}
        body={profileCopy.logoutConfirmBody}
        confirmLabel={profileCopy.logoutConfirmAction}
        onConfirm={goGuestHome}
        onCancel={() => setConfirmKind(null)}
      />
      <ProfileConfirmSheet
        visible={confirmKind === 'delete'}
        title={profileCopy.deleteConfirmTitle}
        body={profileCopy.deleteConfirmBody}
        confirmLabel={profileCopy.deleteConfirmAction}
        destructive
        onConfirm={goAuth}
        onCancel={() => setConfirmKind(null)}
      />
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
  content: { paddingHorizontal: legacySpace.screenX, paddingTop: 20, paddingBottom: 40 },
  statusCard: {
    backgroundColor: legacyColor.surface,
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    padding: 16,
  },
  statusTop: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  statusCopy: { flex: 1, gap: 4 },
  statusEyebrow: {
    ...legacyType.caption,
    color: legacyColor.textTertiary,
    letterSpacing: 0.6,
    fontWeight: '600',
  },
  statusTitle: { ...legacyType.title, color: legacyColor.textPrimary, fontSize: 18, lineHeight: 24 },
  statusDivider: {
    height: 1,
    backgroundColor: legacyColor.border,
    marginVertical: 14,
  },
  statusHint: { ...legacyType.body, color: legacyColor.textSecondary, lineHeight: 20 },
  statusMore: {
    ...legacyType.field,
    color: legacyColor.primary,
    fontWeight: '600',
    marginTop: 10,
  },
  infoCard: {
    marginTop: 16,
    minHeight: 64,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoCopy: { flex: 1, gap: 2 },
  infoLabel: { ...legacyType.floating, color: legacyColor.textTertiary },
  infoValue: { ...legacyType.field, color: legacyColor.textPrimary },
  promoCard: {
    marginTop: 12,
    minHeight: 64,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoInput: {
    flex: 1,
    ...legacyType.field,
    color: legacyColor.textPrimary,
    padding: 0,
  },
  section: {
    ...legacyType.field,
    color: legacyColor.historyLabel,
    marginTop: 24,
    marginBottom: 10,
  },
  sessionSupport: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    marginTop: -2,
    marginBottom: 12,
    lineHeight: 20,
  },
  card: {
    height: 60,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsCard: {
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    overflow: 'hidden',
    backgroundColor: legacyColor.surface,
  },
  settingsRow: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: legacyColor.surface,
  },
  settingsRowLast: {},
  rowLabel: { ...legacyType.field, color: legacyColor.textPrimary },
  logoutCard: { marginTop: 0 },
  deleteCard: { marginTop: 12 },
});
