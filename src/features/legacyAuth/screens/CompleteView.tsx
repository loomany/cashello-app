import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { copy } from '@/features/legacyAuth/copy';

export function CompleteView({ onRestart }: { onRestart: () => void }) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.body}>
        <Text style={styles.title}>{copy.completeTitle}</Text>
        <Text style={styles.support}>{copy.completeSupport}</Text>
      </View>
      <View style={styles.footer}>
        <LegacyPrimaryButton label={copy.restart} onPress={onRestart} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.background },
  body: { flex: 1, paddingHorizontal: legacySpace.screenX, paddingTop: 72 },
  title: { ...legacyType.title, color: legacyColor.textPrimary },
  support: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 12 },
  footer: { paddingHorizontal: legacySpace.screenX, paddingBottom: legacySpace.bottom },
});
