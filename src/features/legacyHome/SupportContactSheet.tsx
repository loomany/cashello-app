import type { ReactNode } from 'react';
import { Alert, Linking, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyFontFamily, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { ChevronRightGlyph } from '@/features/legacyHome/HomeIcons';
import { TelegramGlyph, WhatsAppGlyph } from '@/features/legacyHome/SupportContactIcons';
import {
  SUPPORT_CONTACT_LINKS,
  supportContactCopy,
} from '@/features/legacyHome/supportContact';

type Props = {
  visible: boolean;
  onClose: () => void;
};

/**
 * In-tree sheet (not RN Modal) so it stays inside WebViewportShell phone frame.
 */
export function SupportContactSheet({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  const openChannel = async (label: string, url: string | null) => {
    if (!url) {
      Alert.alert(label, supportContactCopy.linkUnavailableBody);
      return;
    }
    try {
      await Linking.openURL(url);
      onClose();
    } catch {
      Alert.alert(label, supportContactCopy.linkUnavailableBody);
    }
  };

  return (
    <View pointerEvents="box-none" style={styles.root}>
      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Закрыть"
        style={styles.overlayHit}
      >
        <BlurView intensity={18} tint="light" style={styles.blur}>
          <View style={styles.dim} />
        </BlurView>
      </Pressable>
      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <View style={styles.handle} />
        <View style={styles.head}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Закрыть"
            onPress={onClose}
            style={styles.closeHit}
            hitSlop={8}
          >
            <CloseGlyph />
          </Pressable>
        </View>

        <View style={styles.list}>
          <OptionRow
            label={supportContactCopy.telegram}
            icon={<TelegramGlyph />}
            onPress={() => void openChannel(supportContactCopy.telegram, SUPPORT_CONTACT_LINKS.telegram)}
          />
          <View style={styles.divider} />
          <OptionRow
            label={supportContactCopy.whatsapp}
            icon={<WhatsAppGlyph />}
            onPress={() => void openChannel(supportContactCopy.whatsapp, SUPPORT_CONTACT_LINKS.whatsapp)}
          />
        </View>
      </View>
    </View>
  );
}

function OptionRow({ label, icon, onPress }: { label: string; icon: ReactNode; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.iconSlot}>{icon}</View>
      <Text style={styles.rowLabel}>{label}</Text>
      <ChevronRightGlyph />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 45,
  },
  overlayHit: {
    ...StyleSheet.absoluteFill,
  },
  blur: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Platform.OS === 'web' ? 'rgba(5, 10, 38, 0.22)' : 'rgba(5, 10, 38, 0.18)',
  },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 10,
    zIndex: 1,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.border,
    marginBottom: 8,
  },
  head: {
    height: 32,
    justifyContent: 'center',
    marginBottom: 8,
  },
  closeHit: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: legacyColor.homeBackground,
  },
  list: {
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: legacyRadius.field,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 4,
  },
  row: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowPressed: {
    opacity: 0.72,
  },
  iconSlot: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    ...legacyType.field,
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginLeft: 56,
  },
});
