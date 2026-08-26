import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { SupportContactFab } from '@/features/legacyHome/SupportContactFab';
import { SupportContactSheet } from '@/features/legacyHome/SupportContactSheet';
import { resolveSupportFabBottom } from '@/features/legacyHome/supportContact';
import { useLegacySessionStore } from '@/features/legacyHome/session';

/** Global support FAB + sheet overlay for all legacy screens. */
export function SupportContactHost() {
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const [supportOpen, setSupportOpen] = useState(false);
  const bottomOffset = resolveSupportFabBottom(isGuest);

  return (
    <View pointerEvents="box-none" style={styles.host}>
      <SupportContactFab bottomOffset={bottomOffset} onPress={() => setSupportOpen(true)} />
      <SupportContactSheet visible={supportOpen} onClose={() => setSupportOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFill,
    zIndex: 30,
  },
});
