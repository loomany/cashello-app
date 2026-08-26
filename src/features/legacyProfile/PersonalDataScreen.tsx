import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { profileCopy } from '@/features/legacyProfile/copy';
import { PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { InfoGlyph } from '@/features/legacyProfile/ProfileIcons';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function PersonalDataScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.personal);
  const identity = useLegacyProfileStore((s) => s.identity);

  useScreenMeta({
    screenName: 'Legacy Personal data',
    route: PROFILE_BRIDGES.personal,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-067',
    legacyNodeId: '648:19230',
  });

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.personal}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={onBack}
          style={styles.back}
          hitSlop={8}
        >
          <ChevronBackGlyph />
        </Pressable>

        <Text style={styles.title}>{profileCopy.personalTitle}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>{profileCopy.fioLabel}</Text>
          <Text style={styles.value}>{identity.fullName}</Text>
          <Text style={[styles.label, styles.labelGap]}>{profileCopy.documentLabel}</Text>
          <Text style={styles.value}>{identity.documentNumber}</Text>
          <Text style={[styles.label, styles.labelGap]}>{profileCopy.birthLabel}</Text>
          <Text style={styles.value}>{identity.birthDate}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.hintRow}>
            <InfoGlyph />
            <Text style={styles.hint}>{profileCopy.personalHint}</Text>
          </View>
          <LegacyPrimaryButton
            label={profileCopy.change}
            onPress={() => Alert.alert(profileCopy.change, profileCopy.personalChangeUnavailable)}
          />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground, paddingHorizontal: legacySpace.screenX },
  back: { marginTop: 20, width: 24, height: 24 },
  title: { ...legacyType.title, color: legacyColor.textPrimary, marginTop: 20 },
  card: {
    marginTop: 30,
    backgroundColor: legacyColor.surface,
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    padding: 15,
  },
  label: { ...legacyType.floating, color: legacyColor.textTertiary },
  labelGap: { marginTop: 20 },
  value: { ...legacyType.field, color: legacyColor.textPrimary, marginTop: 5 },
  footer: { marginTop: 'auto', paddingBottom: 12, gap: 20 },
  hintRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 5 },
  hint: { ...legacyType.body, color: legacyColor.textSecondary, flex: 1 },
});
