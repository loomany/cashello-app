import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import { legacyColor, legacySize, legacyType } from '@/design/legacyTokens';

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  /** Shows spinner left of label; keeps primary look, blocks presses. */
  loading?: boolean;
};

export function LegacyPrimaryButton({ label, onPress, disabled = false, loading = false }: Props) {
  const blocked = disabled || loading;
  const showDisabledLook = disabled && !loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: blocked, busy: loading }}
      disabled={blocked}
      onPress={onPress}
      style={[styles.btn, showDisabledLook ? styles.disabled : styles.enabled]}
    >
      <View style={styles.row}>
        {loading ? <ActivityIndicator color={legacyColor.primaryOnPrimary} /> : null}
        <Text style={[styles.label, showDisabledLook && styles.labelDisabled]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: legacySize.ctaHeight,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  enabled: {
    backgroundColor: legacyColor.primary,
    shadowColor: '#1226AA',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  disabled: {
    backgroundColor: legacyColor.surface,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.14)',
  },
  label: { ...legacyType.cta, color: legacyColor.primaryOnPrimary },
  labelDisabled: { color: legacyColor.primaryDisabledText },
});
