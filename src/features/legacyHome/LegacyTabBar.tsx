import { type ComponentType } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePathname, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { legacyColor, legacyFontFamily, legacySpace } from '@/design/legacyTokens';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { homeHref, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';

export type LegacyTabId = 'home' | 'payment' | 'qr' | 'history' | 'profile';

const SIDE_TABS: {
  id: Exclude<LegacyTabId, 'qr'>;
  label: string;
  Icon: ComponentType<{ color: string }>;
}[] = [
  { id: 'home', label: 'Главная', Icon: HomeTabIcon },
  { id: 'payment', label: 'Оплата', Icon: PaymentTabIcon },
  { id: 'history', label: 'История', Icon: HistoryTabIcon },
  { id: 'profile', label: 'Профиль', Icon: ProfileTabIcon },
];

type Props = {
  active: LegacyTabId;
};

export function LegacyTabBar({ active }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const leftTabs = SIDE_TABS.slice(0, 2);
  const rightTabs = SIDE_TABS.slice(2);

  const hrefFor = (id: Exclude<LegacyTabId, 'qr'>): string => {
    if (id === 'home') return homeHref(isGuest);
    if (id === 'payment') return HOME_BRIDGES.payment;
    if (id === 'history') return HOME_BRIDGES.history;
    return profileHref(isGuest);
  };

  const go = (href: string) => {
    const targetPath = href.split('?')[0] ?? href;
    // Allow leaving nested home-flows (top-up / withdraw) even when tab looks selected.
    if (pathname === targetPath && !href.includes('?')) return;
    router.replace(href as never);
  };

  return (
    <View style={[styles.bar, { paddingBottom: Math.min(Math.max(insets.bottom, 4), 8) }]}>
      <View style={styles.row}>
        {leftTabs.map((tab) => (
          <SideTab
            key={tab.id}
            label={tab.label}
            selected={active === tab.id}
            Icon={tab.Icon}
            onPress={() => go(hrefFor(tab.id))}
          />
        ))}

        <View style={styles.qrSlot}>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: active === 'qr' }}
            accessibilityLabel="QR"
            onPress={() => go(HOME_BRIDGES.qr)}
            style={styles.qrButton}
          >
            <QrGlyph color={legacyColor.primaryOnPrimary} />
          </Pressable>
        </View>

        {rightTabs.map((tab) => (
          <SideTab
            key={tab.id}
            label={tab.label}
            selected={active === tab.id}
            Icon={tab.Icon}
            onPress={() => go(hrefFor(tab.id))}
          />
        ))}
      </View>
    </View>
  );
}

function SideTab({
  label,
  selected,
  Icon,
  onPress,
}: {
  label: string;
  selected: boolean;
  Icon: ComponentType<{ color: string }>;
  onPress: () => void;
}) {
  const color = selected ? legacyColor.primary : legacyColor.textTertiary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.tab}
    >
      <View style={[styles.indicator, selected && styles.indicatorOn]} />
      <Icon color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

function HomeTabIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Path
        d="M3.5 9.8L11 3.5L18.5 9.8V17.5C18.5 18.3 17.8 19 17 19H5C4.2 19 3.5 18.3 3.5 17.5V9.8Z"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M8.5 19V12.5H13.5V19"
        stroke={color}
        strokeWidth={1.6}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function PaymentTabIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Rect
        x={3}
        y={5.5}
        width={16}
        height={11}
        rx={2.2}
        stroke={color}
        strokeWidth={1.6}
        fill="none"
      />
      <Path d="M3 9.2H19" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M7 13.5H10.5" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

function HistoryTabIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={7.25} stroke={color} strokeWidth={1.6} fill="none" />
      <Path
        d="M11 7.5V11.2L13.8 13"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ProfileTabIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={8} r={3.2} stroke={color} strokeWidth={1.6} fill="none" />
      <Path
        d="M4.8 17.5C5.7 14.6 8 12.8 11 12.8C14 12.8 16.3 14.6 17.2 17.5"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

function QrGlyph({ color = legacyColor.primary }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 26 26">
      <Rect x={2} y={2} width={9} height={9} rx={1.4} stroke={color} strokeWidth={1.8} fill="none" />
      <Rect x={4.6} y={4.6} width={3.8} height={3.8} rx={0.6} fill={color} />
      <Rect x={15} y={2} width={9} height={9} rx={1.4} stroke={color} strokeWidth={1.8} fill="none" />
      <Rect x={17.6} y={4.6} width={3.8} height={3.8} rx={0.6} fill={color} />
      <Rect x={2} y={15} width={9} height={9} rx={1.4} stroke={color} strokeWidth={1.8} fill="none" />
      <Rect x={4.6} y={17.6} width={3.8} height={3.8} rx={0.6} fill={color} />
      <Rect x={15} y={15} width={3.2} height={3.2} rx={0.4} fill={color} />
      <Rect x={19.4} y={15} width={4.6} height={3.2} rx={0.4} fill={color} />
      <Rect x={15} y={19.4} width={4.6} height={4.6} rx={0.4} fill={color} />
      <Rect x={20.8} y={20.8} width={3.2} height={3.2} rx={0.4} fill={color} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: legacyColor.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: legacyColor.border,
    paddingTop: 8,
    paddingHorizontal: legacySpace.screenX,
    overflow: 'visible',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
    minHeight: 44,
  },
  indicator: {
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'transparent',
    marginBottom: 2,
  },
  indicatorOn: {
    backgroundColor: legacyColor.primary,
  },
  label: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: -0.1,
    fontFamily: legacyFontFamily,
  },
  qrSlot: {
    width: 52,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  qrButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // Slightly above neighbor icons, still fully inside the bar.
    marginBottom: 6,
    shadowColor: '#1226AA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
