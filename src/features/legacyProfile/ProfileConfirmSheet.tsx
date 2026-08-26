import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacyType } from '@/design/legacyTokens';
import { profileCopy } from '@/features/legacyProfile/copy';

type Props = {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * In-tree confirm (not RN Modal / window.confirm) so it stays inside
 * WebViewportShell phone frame on web.
 */
export function ProfileConfirmSheet({
  visible,
  title,
  body,
  confirmLabel,
  destructive = false,
  onConfirm,
  onCancel,
}: Props) {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.root}>
      <Pressable
        onPress={onCancel}
        accessibilityRole="button"
        accessibilityLabel={profileCopy.logoutCancel}
        style={styles.overlayHit}
      >
        <BlurView intensity={18} tint="light" style={styles.blur}>
          <View style={styles.dim} />
        </BlurView>
      </Pressable>

      <View style={[styles.panel, { paddingBottom: Math.max(insets.bottom, 10) }]}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <View style={styles.sep} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={confirmLabel}
            onPress={onConfirm}
            style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
          >
            <Text style={[styles.actionLabel, destructive && styles.actionDanger]}>{confirmLabel}</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={profileCopy.logoutCancel}
          onPress={onCancel}
          style={({ pressed }) => [styles.cancelBtn, pressed && styles.actionPressed]}
        >
          <Text style={styles.cancelLabel}>{profileCopy.logoutCancel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 50,
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
    backgroundColor: Platform.OS === 'web' ? 'rgba(5, 10, 38, 0.28)' : 'rgba(5, 10, 38, 0.22)',
  },
  panel: {
    paddingHorizontal: 7,
    zIndex: 1,
  },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderRadius: legacyRadius.alert,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    ...legacyType.alertTitle,
    color: legacyColor.textPrimary,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  body: {
    ...legacyType.alertBody,
    color: legacyColor.sheetBody,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sep: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(60, 60, 67, 0.36)',
    alignSelf: 'stretch',
    marginTop: 16,
  },
  action: {
    height: 56,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionLabel: {
    ...legacyType.alertTitle,
    color: legacyColor.primary,
  },
  actionDanger: {
    color: legacyColor.cardDanger,
  },
  cancelBtn: {
    marginTop: 8,
    height: 56,
    borderRadius: legacyRadius.alert,
    backgroundColor: legacyColor.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelLabel: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: legacyColor.textPrimary,
    fontFamily: legacyType.alertTitle.fontFamily,
  },
});
