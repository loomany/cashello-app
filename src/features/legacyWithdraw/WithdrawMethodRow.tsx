import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { legacyColor, legacyType } from '@/design/legacyTokens';

type Props = {
  label: string;
  icon: ReactNode;
  onPress: () => void;
};

/** LGC-CMP-016 WithdrawMethodRow */
export function WithdrawMethodRow({ label, icon, onPress }: Props) {
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
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  label: { ...legacyType.field, color: legacyColor.textPrimary, flex: 1 },
  icon: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
});
