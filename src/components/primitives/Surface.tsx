import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';

import { color, elevation, radius, space } from '@/design/tokens';

type Props = ViewProps & {
  children: ReactNode;
  elevated?: boolean;
};

export function Surface({ children, elevated = false, style, ...rest }: Props) {
  return (
    <View
      {...rest}
      style={[styles.base, elevated ? elevation.surface : elevation.none, style]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: color.surface,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.border,
    padding: space[16],
  },
});
