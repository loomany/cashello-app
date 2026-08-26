import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppPressable } from '@/components/primitives/AppPressable';
import { color, iconSize, radius, touchTarget } from '@/design/tokens';

type Variant = 'surface' | 'ghost';

type Props = {
  label: string;
  onPress?: () => void;
  children: ReactNode;
  disabled?: boolean;
  variant?: Variant;
};

export function IconButton({ label, onPress, children, disabled, variant = 'surface' }: Props) {
  return (
    <AppPressable accessibilityLabel={label} disabled={disabled} onPress={onPress}>
      <View style={[styles.hit, variant === 'ghost' ? styles.ghost : styles.surface]}>{children}</View>
    </AppPressable>
  );
}

export const primitiveIconSize = iconSize.lg;

const styles = StyleSheet.create({
  hit: {
    minWidth: touchTarget,
    minHeight: touchTarget,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  surface: {
    backgroundColor: color.surfaceSubtle,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
});
