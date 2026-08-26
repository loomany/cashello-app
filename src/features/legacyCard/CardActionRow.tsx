import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { legacyColor, legacySize, legacyType } from '@/design/legacyTokens';

type Props = {
  label: string;
  icon: ReactNode;
  onPress: () => void;
  last?: boolean;
};

export function CardActionRow({ label, icon, onPress, last = false }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.row}>
      <View style={styles.icon}>{icon}</View>
      <View style={[styles.body, !last && styles.divider]}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: legacySize.cardRow,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
  },
  icon: { width: 28, alignItems: 'center' },
  body: { flex: 1, height: '100%', justifyContent: 'center', marginLeft: 8, paddingRight: 12 },
  divider: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: legacyColor.cardGroupBorder },
  label: { ...legacyType.field, color: legacyColor.cardActionText },
});
