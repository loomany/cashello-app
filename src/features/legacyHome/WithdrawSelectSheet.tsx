import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyFontFamily, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { ChevronRightGlyph } from '@/features/legacyHome/HomeIcons';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import { WITHDRAW_BRIDGES } from '@/features/legacyWithdraw/mockData';
import { useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import {
  CardMethodGlyph,
  CashhelloUserMethodGlyph,
  PhoneMethodGlyph,
} from '@/features/legacyWithdraw/WithdrawIcons';

type Props = {
  visible: boolean;
  onClose: () => void;
  /** Guest: method rows close sheet and open login instead of withdraw flows. */
  requireAuth?: boolean;
};

/**
 * In-tree sheet (not RN Modal) so it stays inside WebViewportShell phone frame.
 */
export function WithdrawSelectSheet({ visible, onClose, requireAuth = false }: Props) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setMethod = useLegacyWithdrawStore((s) => s.setMethod);

  if (!visible) {
    return null;
  }

  const go = (path: string) => {
    onClose();
    if (requireAuth) {
      router.push(HOME_BRIDGES.login as never);
      return;
    }
    router.push(path as never);
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
          <Text style={styles.title}>{withdrawCopy.methodTitle}</Text>
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
            label={withdrawCopy.card}
            icon={<CardMethodGlyph />}
            onPress={() => {
              setMethod('card');
              go(WITHDRAW_BRIDGES.card);
            }}
          />
          <View style={styles.divider} />
          <OptionRow
            label={withdrawCopy.phone}
            icon={<PhoneMethodGlyph />}
            onPress={() => {
              setMethod('phone');
              go(WITHDRAW_BRIDGES.phone);
            }}
          />
          <View style={styles.divider} />
          <OptionRow
            label={withdrawCopy.cashhelloUser}
            icon={<CashhelloUserMethodGlyph />}
            onPress={() => {
              setMethod('cashhelloUser');
              go(WITHDRAW_BRIDGES.cashhelloUser);
            }}
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
    // Soft navy wash so content stays readable under light blur.
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
    marginBottom: 12,
  },
  head: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    ...legacyType.homeSection,
    color: legacyColor.textPrimary,
    textAlign: 'center',
  },
  closeHit: {
    position: 'absolute',
    right: 0,
    top: 2,
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
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginLeft: 56,
  },
});
