import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { legacyColor, legacyType } from '@/design/legacyTokens';

type Props = {
  label: string;
  icon: ReactNode;
  onPress: () => void;
};

/** LGC-CMP-013 PaymentMethodRow — 345×60 method sheet row. */
export function PaymentMethodRow({ label, icon, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.icon}>{icon}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    width: 345,
    height: 60,
    borderRadius: 12,
    backgroundColor: legacyColor.homeBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  label: { ...legacyType.field, color: legacyColor.textPrimary, flex: 1 },
  icon: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
});
