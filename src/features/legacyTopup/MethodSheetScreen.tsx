import type { ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, Text, View , ViewStyle, TextStyle} from 'react-native';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyFontFamily, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { ChevronRightGlyph } from '@/features/legacyHome/HomeIcons';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { topupCopy } from '@/features/legacyTopup/copy';
import { TOPUP_BRIDGES } from '@/features/legacyTopup/mockData';
import { BetweenMethodGlyph, CardMethodGlyph } from '@/features/legacyTopup/TopupIcons';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

type SheetBodyProps = {
  toAccountId?: string;
  onClose: () => void;
  /** Extra bottom padding when embedded in a route / Modal. */
  bottomInset?: number;
  /** Guest: method rows close sheet and open login instead of top-up flows. */
  requireAuth?: boolean;
};

/**
 * Top-up method sheet body — same chrome language as WithdrawSelectSheet
 * (handle, centered title, close, icon-left rows). Cash desk removed.
 */
export function MethodSheetContent({
  toAccountId = 'kzt-primary',
  onClose,
  bottomInset = 24,
  requireAuth = false,
}: SheetBodyProps) {
  const router = useRouter();

  const go = (path: string) => {
    onClose();
    if (requireAuth) {
      router.push(HOME_BRIDGES.login as never);
      return;
    }
    router.push(path as never);
  };

  return (
    <View style={[styles.sheet, { paddingBottom: bottomInset }]}>
      <View style={styles.handle} />
      <View style={styles.head}>
        <Text style={styles.title}>{topupCopy.methodTitle}</Text>
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
          label={topupCopy.betweenAccounts}
          icon={<BetweenMethodGlyph />}
          onPress={() => go(`${TOPUP_BRIDGES.between}?to=${toAccountId}`)}
        />
        <View style={styles.divider} />
        <OptionRow
          label={topupCopy.otherBankCard}
          icon={<CardMethodGlyph />}
          onPress={() => go(`${TOPUP_BRIDGES.card}?to=${toAccountId}`)}
        />
      </View>
    </View>
  );
}

type OverlayProps = {
  visible: boolean;
  onClose: () => void;
  toAccountId?: string;
  requireAuth?: boolean;
};

/** In-tree sheet (not RN Modal) so it stays inside WebViewportShell phone frame. */
export function TopupSelectSheet({
  visible,
  onClose,
  toAccountId = 'kzt-primary',
  requireAuth = false,
}: OverlayProps) {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

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
      <MethodSheetContent
        toAccountId={toAccountId}
        onClose={onClose}
        bottomInset={Math.max(insets.bottom, 16) + 8}
        requireAuth={requireAuth}
      />
    </View>
  );
}

type ScreenProps = {
  toAccountId?: string;
};

export function MethodSheetScreen({ toAccountId = 'kzt-primary' }: ScreenProps) {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.topup);
  const insets = useSafeAreaInsets();

  useScreenMeta({
    screenName: 'Legacy Top-up methods',
    route: TOPUP_BRIDGES.root,
    taskId: 'RECON-005',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-040',
    legacyNodeId: '648:20275',
  });

  return (
    <DebugMetaHost route={TOPUP_BRIDGES.root}>
      <SafeAreaView style={styles.routeSafe} edges={['top']}>
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Закрыть"
          style={styles.overlayHit}
        >
          <BlurView intensity={18} tint="light" style={styles.blur}>
            <View style={styles.dim} />
          </BlurView>
        </Pressable>
        <View style={styles.routeSheetWrap}>
          <MethodSheetContent
            toAccountId={toAccountId}
            onClose={onBack}
            bottomInset={Math.max(insets.bottom, 16) + 8}
          />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
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
  } as ViewStyle,
  routeSafe: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  } as ViewStyle,
  routeSheetWrap: {
    zIndex: 1,
  } as ViewStyle,
  overlayHit: {
    ...StyleSheet.absoluteFill,
  } as ViewStyle,
  blur: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  } as ViewStyle,
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Platform.OS === 'web' ? 'rgba(5, 10, 38, 0.22)' : 'rgba(5, 10, 38, 0.18)',
  } as ViewStyle,
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 10,
    zIndex: 1,
  } as ViewStyle,
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.border,
    marginBottom: 12,
  } as ViewStyle,
  head: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 12,
  } as ViewStyle,
  title: {
    ...legacyType.homeSection,
    color: legacyColor.textPrimary,
    textAlign: 'center',
  } as TextStyle,
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
  } as ViewStyle,
  list: {
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: legacyRadius.field,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginBottom: 4,
  } as ViewStyle,
  row: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  } as ViewStyle,
  rowPressed: {
    opacity: 0.72,
  } as ViewStyle,
  iconSlot: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  rowLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  } as TextStyle,
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginLeft: 56,
  } as ViewStyle,
});
