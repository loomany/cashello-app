import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacySize, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { formatKzPhone } from '@/features/legacyAuth/machine';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { profileCopy } from '@/features/legacyProfile/copy';
import { PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { phoneReady, useLegacyProfileStore } from '@/features/legacyProfile/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function ChangePhoneScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.phone);
  const pending = useLegacyProfileStore((s) => s.pendingPhoneDigits);
  const setPending = useLegacyProfileStore((s) => s.setPendingPhoneDigits);
  const ready = phoneReady(pending);

  useScreenMeta({
    screenName: 'Legacy Change phone',
    route: PROFILE_BRIDGES.phone,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-122',
    legacyNodeId: '648:16714',
  });

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.phone}>
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

        <Text style={styles.title}>{profileCopy.phoneTitle}</Text>

        <View style={styles.field}>
          <Text style={styles.label}>{profileCopy.phoneLabel}</Text>
          <TextInput
            accessibilityLabel={profileCopy.phoneLabel}
            keyboardType="phone-pad"
            value={pending ? formatKzPhone(pending) : ''}
            placeholder={profileCopy.phoneMask}
            placeholderTextColor={legacyColor.textTertiary}
            onChangeText={(v) => setPending(v)}
            style={styles.input}
          />
        </View>

        <View style={styles.cta}>
          <LegacyPrimaryButton
            label={profileCopy.change}
            disabled={!ready}
            onPress={() => {
              useLegacyProfileStore.getState().setPhoneSms('');
              router.push(PROFILE_BRIDGES.phoneVerify as never);
            }}
          />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.background, paddingHorizontal: legacySpace.screenX },
  back: { marginTop: 20, width: 24, height: 24 },
  title: { ...legacyType.title, color: legacyColor.textPrimary, marginTop: 20 },
  field: {
    marginTop: 30,
    height: legacySize.inputHeight,
    borderRadius: legacyRadius.field,
    borderWidth: 1,
    borderColor: legacyColor.primaryDisabledText,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  label: { ...legacyType.floating, color: legacyColor.primary },
  input: { ...legacyType.field, color: legacyColor.textPrimary, padding: 0, marginTop: 4 },
  cta: { marginTop: 30 },
});
