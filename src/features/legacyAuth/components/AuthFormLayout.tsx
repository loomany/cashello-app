import { type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';

type Props = {
  title: string;
  support?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  bottom?: ReactNode;
  /** Full-bleed chrome under the primary CTA (e.g. home tab bar). */
  tabBar?: ReactNode;
  /** Absolute overlay (sheets) — rendered inside SafeArea so backdrop blur works on web. */
  overlay?: ReactNode;
  header?: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  /** Vertically center title + fields + footer as one block. */
  centered?: boolean;
  /** Soft modern card outline around the form block. */
  framed?: boolean;
  /** Title centered between back / close. */
  titleCentered?: boolean;
};

function BackChevron() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M15.5 4.5L8 12l7.5 7.5"
        stroke={legacyColor.textPrimary}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function CloseIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M6 6l12 12M18 6L6 18"
        stroke={legacyColor.textPrimary}
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export function AuthFormLayout({
  title,
  support,
  children,
  footer,
  bottom,
  tabBar,
  overlay,
  header,
  onBack,
  onClose,
  centered,
  framed,
  titleCentered,
}: Props) {
  const centerTitle = titleCentered ?? Boolean(onBack && onClose);
  const edges = tabBar ? (['top'] as const) : (['top', 'bottom'] as const);

  const form = (
    <>
      <View style={styles.titleRow}>
        <View style={styles.titleSide}>
          {onBack ? (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel="Назад"
              style={styles.iconHit}
              hitSlop={8}
            >
              <BackChevron />
            </Pressable>
          ) : (
            <View style={styles.iconHit} />
          )}
        </View>
        <Text
          style={[styles.title, centerTitle ? styles.titleCentered : styles.titleStart]}
          numberOfLines={2}
        >
          {title}
        </Text>
        <View style={[styles.titleSide, styles.titleSideEnd]}>
          {onClose ? (
            <Pressable
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Закрыть"
              style={styles.iconHit}
              hitSlop={8}
            >
              <CloseIcon />
            </Pressable>
          ) : (
            <View style={styles.iconHit} />
          )}
        </View>
      </View>
      {support ? (
        typeof support === 'string' ? (
          <Text style={[styles.support, centerTitle && styles.supportCentered]}>{support}</Text>
        ) : (
          support
        )
      ) : null}
      <View style={styles.fields}>{children}</View>
      {footer ? <View style={styles.inlineFooter}>{footer}</View> : null}
    </>
  );

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        {header ? <View style={styles.header}>{header}</View> : null}
        <View
          style={[
            styles.body,
            centered && styles.bodyCentered,
            Boolean(header) && !centered && styles.bodyAfterHeader,
          ]}
        >
          {framed ? (
            <View style={styles.frame}>{form}</View>
          ) : (
            <View style={centered ? styles.block : undefined}>{form}</View>
          )}
        </View>
        {bottom ? (
          <View style={[styles.bottom, tabBar ? styles.bottomAboveTab : null]}>{bottom}</View>
        ) : null}
        {tabBar}
      </KeyboardAvoidingView>
      {overlay}
    </SafeAreaView>
  );
}

const ICON = legacyType.title.lineHeight;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground, position: 'relative' },
  flex: { flex: 1 },
  header: {
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 18,
    minHeight: 36,
  },
  body: { flex: 1, paddingHorizontal: legacySpace.screenX, paddingTop: legacySpace.titleTop },
  bodyCentered: { justifyContent: 'center', paddingTop: 0 },
  bodyAfterHeader: { paddingTop: 20 },
  block: { width: '100%' },
  frame: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(18, 38, 170, 0.14)',
    backgroundColor: legacyColor.surface,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 18,
    shadowColor: '#050A26',
    shadowOpacity: 0.07,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ICON,
  },
  titleSide: {
    width: ICON,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleSideEnd: { alignItems: 'flex-end' },
  iconHit: {
    width: ICON,
    height: ICON,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...legacyType.title, color: legacyColor.textPrimary, flex: 1 },
  titleCentered: { textAlign: 'center' },
  titleStart: { textAlign: 'left' },
  support: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 2 },
  supportCentered: { textAlign: 'center' },
  fields: { marginTop: 28, gap: legacySpace.fieldGap },
  inlineFooter: { marginTop: 20 },
  bottom: { paddingHorizontal: legacySpace.screenX, paddingBottom: legacySpace.bottom, alignItems: 'center' },
  bottomAboveTab: { paddingBottom: 12 },
});
