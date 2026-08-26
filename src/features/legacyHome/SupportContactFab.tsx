import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacySpace } from '@/design/legacyTokens';
import { SupportHeadsetGlyph } from '@/features/legacyHome/SupportContactIcons';
import {
  SUPPORT_FAB_AUTH_BOTTOM,
  SUPPORT_FAB_GUEST_BOTTOM,
  supportContactCopy,
} from '@/features/legacyHome/supportContact';

type Props = {
  variant: 'guest' | 'authorized';
  onPress: () => void;
};

export function SupportContactFab({ variant, onPress }: Props) {
  const insets = useSafeAreaInsets();
  const baseOffset = variant === 'guest' ? SUPPORT_FAB_GUEST_BOTTOM : SUPPORT_FAB_AUTH_BOTTOM;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.layer, { bottom: baseOffset + insets.bottom }]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={supportContactCopy.sheetTitle}
        onPress={onPress}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      >
        <SupportHeadsetGlyph />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    right: legacySpace.screenX,
    zIndex: 20,
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: legacyColor.logoGreen,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#050A26',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  fabPressed: {
    opacity: 0.88,
  },
});
