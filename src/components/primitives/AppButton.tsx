import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppPressable } from '@/components/primitives/AppPressable';
import { AppText } from '@/components/primitives/AppText';
import { color, controlHeight, radius, space } from '@/design/tokens';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  haptic?: boolean;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  haptic = false,
}: Props) {
  const palette = palettes[variant];
  return (
    <AppPressable
      accessibilityLabel={label}
      disabled={disabled || loading}
      haptic={haptic}
      onPress={onPress}
    >
      <View style={[styles.base, { backgroundColor: palette.bg, borderColor: palette.border }]}>
        {loading ? (
          <ActivityIndicator color={palette.fg} />
        ) : (
          <AppText variant="label" style={{ color: palette.fg }}>
            {label}
          </AppText>
        )}
      </View>
    </AppPressable>
  );
}

const palettes = {
  primary: { bg: color.accent, border: color.accent, fg: color.accentOnAccent },
  secondary: { bg: 'transparent', border: color.border, fg: color.textPrimary },
  ghost: { bg: 'transparent', border: 'transparent', fg: color.textSecondary },
} as const;

const styles = StyleSheet.create({
  base: {
    minHeight: controlHeight.md,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space[20],
  },
});
