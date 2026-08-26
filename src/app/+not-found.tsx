import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/primitives/AppText';
import { color, space } from '@/design/tokens';

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerShadowVisible: false }} />
      <View style={styles.wrap}>
        <AppText variant="title">Route not found</AppText>
        <AppText variant="body" tone="secondary">
          This path is not part of the reference prototype yet.
        </AppText>
        <Link href="/dev/foundation">
          <AppText variant="label" tone="accent">
            Back to foundation
          </AppText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: color.background,
    padding: space[24],
    gap: space[12],
    justifyContent: 'center',
  },
});
