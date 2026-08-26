import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { legacyColor } from '@/design/legacyTokens';
import type { AccountCurrency } from '@/features/legacyAccounts/mockData';

export function CurrencyGlyph({ currency, size = 45 }: { currency: AccountCurrency; size?: number }) {
  if (currency === 'USD') {
    return (
      <Image
        source={require('../../../assets/legacy/accounts/ic-dollar.png')}
        style={{ width: size, height: size, borderRadius: 12 }}
        accessibilityIgnoresInvertColors
      />
    );
  }
  if (currency === 'RUB') {
    return (
      <View style={[styles.rubleBox, { width: size, height: size, borderRadius: size > 32 ? 12 : 8 }]}>
        <Text style={[styles.ruble, { fontSize: size > 32 ? 18 : 14 }]}>₽</Text>
      </View>
    );
  }
  return (
    <Image
      source={require('../../../assets/legacy/accounts/ic-tenge.png')}
      style={{ width: size, height: size, borderRadius: 12 }}
      accessibilityIgnoresInvertColors
    />
  );
}

export function ChevronBackGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M14.5 5L8.5 12L14.5 19"
        stroke={legacyColor.textPrimary}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function PlusGlyph() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path d="M8 3V13M3 8H13" stroke={legacyColor.primaryOnPrimary} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function StarGlyph({ filled = true, color = legacyColor.primary, size = 16 }: { filled?: boolean; color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 3.5L14.6 9.2L20.8 10L16.4 14.2L17.5 20.4L12 17.4L6.5 20.4L7.6 14.2L3.2 10L9.4 9.2L12 3.5Z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ClockGlyph() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Circle cx={10} cy={10} r={7.2} stroke={legacyColor.primary} strokeWidth={1.4} fill="none" />
      <Path d="M10 6.5V10.2L12.4 12" stroke={legacyColor.primary} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function CloseGlyph() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Path d="M4 4L14 14M14 4L4 14" stroke={legacyColor.textPrimary} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function DownloadGlyph({ color = legacyColor.primary }: { color?: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Path d="M7 20H21" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M14 6V18" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
      <Path d="M9 14L14 19L19 14" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function TopUpGlyph() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Path
        d="M8 16C8 11.6 11.6 8 16 8H20"
        stroke={legacyColor.primaryOnPrimary}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M16 5L21 8L16 11"
        stroke={legacyColor.primaryOnPrimary}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={11} cy={18} r={5.2} stroke={legacyColor.primaryOnPrimary} strokeWidth={1.5} fill="none" />
    </Svg>
  );
}

export function ChevronDownGlyph({ color = legacyColor.primary }: { color?: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12">
      <Path d="M2 4L6 8L10 4" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  rubleBox: {
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruble: {
    color: legacyColor.primary,
    fontWeight: '600',
  },
});
