import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { legacyColor } from '@/design/legacyTokens';
import { SupportContactHost } from '@/features/legacyHome/SupportContactHost';

export default function LegacyLayout() {
  return (
    <View style={styles.root}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: legacyColor.homeBackground },
        }}
      />
      <SupportContactHost />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
