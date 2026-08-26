import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyFontFamily, legacySpace } from '@/design/legacyTokens';
import { SupportChatGlyph } from '@/features/legacyHome/SupportContactIcons';
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
        accessibilityLabel={supportContactCopy.bonusLabel}
        onPress={onPress}
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
      >
        <View style={styles.iconBubble}>
          <SupportChatGlyph />
        </View>
        <Text style={styles.label}>{supportContactCopy.bonusLabel}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingLeft: 6,
    paddingRight: 12,
    paddingVertical: 6,
    borderRadius: 24,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    shadowColor: '#050A26',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  fabPressed: {
    opacity: 0.88,
  },
  iconBubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: legacyColor.logoGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
    letterSpacing: -0.1,
  },
});
