import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacySize, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { profileCopy } from '@/features/legacyProfile/copy';
import { PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { AttachGlyph } from '@/features/legacyProfile/ProfileIcons';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function HelpScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.help);
  const helpText = useLegacyProfileStore((s) => s.helpText);
  const setHelpText = useLegacyProfileStore((s) => s.setHelpText);

  useScreenMeta({
    screenName: 'Legacy Help',
    route: PROFILE_BRIDGES.help,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-126',
    legacyNodeId: '648:19334',
  });

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.help}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={onBack}
          style={styles.back}
          hitSlop={8}
        >
          <ChevronBackGlyph />
        </Pressable>

        <Text style={styles.title}>{profileCopy.helpTitle}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>{profileCopy.helpDescription}</Text>
          <TextInput
            value={helpText}
            onChangeText={setHelpText}
            style={styles.input}
            multiline
            accessibilityLabel={profileCopy.helpDescription}
          />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={profileCopy.attachDocument}
          onPress={() => Alert.alert(profileCopy.attachDocument, profileCopy.attachUnavailable)}
          style={styles.attach}
        >
          <AttachGlyph />
          <Text style={styles.attachText}>{profileCopy.attachDocument}</Text>
        </Pressable>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground, paddingHorizontal: legacySpace.screenX },
  back: { marginTop: 20, width: 24, height: 24 },
  title: { ...legacyType.title, color: legacyColor.textPrimary, marginTop: 20 },
  field: {
    marginTop: 30,
    minHeight: legacySize.inputHeight,
    borderRadius: legacyRadius.field,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.surface,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
  label: { ...legacyType.floating, color: legacyColor.primary },
  input: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    padding: 0,
    marginTop: 6,
    minHeight: 28,
  },
  attach: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  attachText: { fontSize: 14, lineHeight: 18, fontWeight: '500', color: legacyColor.primary },
});
