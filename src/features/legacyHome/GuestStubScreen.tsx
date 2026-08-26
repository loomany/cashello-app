import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

type Props = {
  route: string;
  title: string;
  body: string;
  screenName: string;
};

export function GuestStubScreen({ route, title, body, screenName }: Props) {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.home);

  useScreenMeta({
    screenName,
    route,
    taskId: 'DESIGN-001',
    prototypeStatus: 'in_progress',
  });

  return (
    <DebugMetaHost route={route}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.back}>
          <Text style={styles.backLabel}>Назад</Text>
        </Pressable>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>Заглушка</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: legacyColor.homeBackground,
    paddingHorizontal: legacySpace.screenX,
  },
  back: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
  },
  backLabel: {
    ...legacyType.field,
    color: legacyColor.primary,
  },
  card: {
    marginTop: 24,
    backgroundColor: legacyColor.surface,
    borderRadius: legacyRadius.field,
    borderWidth: 1,
    borderColor: legacyColor.border,
    padding: 20,
    gap: 10,
  },
  eyebrow: {
    ...legacyType.caption,
    color: legacyColor.textSecondary,
  },
  title: {
    ...legacyType.homeSection,
    color: legacyColor.textPrimary,
  },
  body: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
  },
});
