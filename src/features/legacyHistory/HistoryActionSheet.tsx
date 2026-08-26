import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { legacyColor, legacyFontFamily, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { historyCopy } from '@/features/legacyHistory/copy';
import { HistoryOpIcon } from '@/features/legacyHistory/HistoryOpIcon';
import { type LegacyHistoryOp } from '@/features/legacyHistory/mockData';
import { ChevronRightGlyph } from '@/features/legacyHome/HomeIcons';

type Props = {
  visible: boolean;
  op: LegacyHistoryOp | null;
  onClose: () => void;
  onRepeat: () => void;
  onShareReceipt: () => void;
};

/**
 * Intermediate action sheet after tapping a history row.
 * In-tree (not RN Modal) so it stays inside WebViewportShell phone frame.
 */
export function HistoryActionSheet({ visible, op, onClose, onRepeat, onShareReceipt }: Props) {
  const insets = useSafeAreaInsets();

  if (!visible || !op) {
    return null;
  }

  const showRepeat = Boolean(op.canRepeat && op.repeatHref);

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
          <View style={styles.headMain}>
            <HistoryOpIcon op={op} size="md" />
            <Text style={styles.title} numberOfLines={2}>
              {op.title}
            </Text>
          </View>
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
          {showRepeat ? (
            <>
              <ActionRow label={historyCopy.repeatOp} icon={<RepeatGlyph />} onPress={onRepeat} />
              <View style={styles.divider} />
            </>
          ) : null}
          <ActionRow label={historyCopy.shareReceipt} icon={<ShareGlyph />} onPress={onShareReceipt} />
        </View>
      </View>
    </View>
  );
}

function ActionRow({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: ReactNode;
  onPress: () => void;
}) {
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

function RepeatGlyph() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Path
        d="M4.5 11a6.5 6.5 0 0 1 11.2-4.4"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M15.2 3.8V6.8H12.2"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M17.5 11a6.5 6.5 0 0 1-11.2 4.4"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M6.8 18.2V15.2H9.8"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ShareGlyph() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Path
        d="M5 12.5V16.5C5 17.3 5.7 18 6.5 18H15.5C16.3 18 17 17.3 17 16.5V12.5"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
      <Path d="M11 4.5V13.5" stroke={legacyColor.primary} strokeWidth={1.6} strokeLinecap="round" />
      <Path
        d="M7.5 8L11 4.5L14.5 8"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 40,
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
    borderTopWidth: 1,
    borderColor: legacyColor.border,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.border,
    marginBottom: 12,
  },
  head: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 40,
  },
  headMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    maxWidth: '100%',
    paddingHorizontal: 4,
  },
  title: {
    ...legacyType.homeSection,
    color: legacyColor.textPrimary,
    textAlign: 'left',
    flexShrink: 1,
  },
  closeHit: {
    position: 'absolute',
    right: 0,
    top: 4,
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
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginBottom: 4,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 12,
    borderRadius: 10,
  },
  rowPressed: {
    opacity: 0.72,
  },
  iconSlot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginLeft: 64,
  },
});
