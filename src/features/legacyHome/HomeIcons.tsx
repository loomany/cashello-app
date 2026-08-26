import { useId } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { legacyColor, legacyFontFamily } from '@/design/legacyTokens';
import type { HomeHistoryDirection, HomeHistoryTone } from '@/features/legacyHome/mockData';

/** Compact Cashhello brand mark + wordmark for Home header. */
export function CashhelloBrand({
  size = 32,
  onPress,
}: {
  size?: number;
  onPress?: () => void;
}) {
  const content = (
    <>
      <CashhelloMark size={size} />
      <Text style={styles.brandName}>ashhello</Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="link"
        accessibilityLabel="Cashhello — на главную"
        style={styles.brand}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View style={styles.brand} accessibilityRole="header" accessibilityLabel="Cashhello">
      {content}
    </View>
  );
}

/** Pac-Man style C mark — mouth opens toward the wordmark. */
export function CashhelloMark({ size = 32 }: { size?: number }) {
  const uid = useId().replace(/:/g, '');
  const bgGradId = `cashhelloBg-${uid}`;
  const bodyGradId = `cashhelloBody-${uid}`;

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Defs>
        <LinearGradient id={bgGradId} x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#2235CF" />
          <Stop offset="1" stopColor={legacyColor.primaryDark} />
        </LinearGradient>
        <LinearGradient id={bodyGradId} x1="8" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#52D04E" />
          <Stop offset="1" stopColor={legacyColor.logoGreen} />
        </LinearGradient>
      </Defs>
      <Rect x={0.5} y={0.5} width={31} height={31} rx={10.5} fill={`url(#${bgGradId})`} />
      <Path
        d="M13.5 16L22.5 12.9A9.6 9.6 0 1 1 22.5 19.1Z"
        fill={`url(#${bodyGradId})`}
      />
      <Circle cx={11.2} cy={12.6} r={1.35} fill="rgba(255,255,255,0.55)" />
    </Svg>
  );
}

const TONE: Record<HomeHistoryTone, string> = {
  yellow: legacyColor.statusYellow,
  blue: legacyColor.primary,
  green: legacyColor.logoGreen,
  red: legacyColor.danger,
};

export function SearchGlyph() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Circle cx={8.5} cy={8.5} r={5.4} stroke={legacyColor.primary} strokeWidth={1.5} fill="none" />
      <Path
        d="M12.6 12.6L16.4 16.4"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function HistoryArrow({
  direction,
  tone,
}: {
  direction: HomeHistoryDirection;
  tone: HomeHistoryTone;
}) {
  const rotate = direction === 'out' ? '45deg' : '-135deg';
  return (
    <View style={[styles.arrowBox, { transform: [{ rotate }] }]}>
      <Svg width={12} height={16} viewBox="0 0 12 15.5">
        <Path
          d="M6 0.75L6 14.75M0.75 6L6 0.75L11.25 6"
          stroke={TONE[tone]}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

export function GiftGlyph() {
  return (
    <View style={styles.arrowBox}>
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path
          d="M20 12V20H4V12"
          stroke={legacyColor.primary}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M2 7H22V12H2V7Z"
          stroke={legacyColor.primary}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M12 20V7"
          stroke={legacyColor.primary}
          strokeWidth={1.7}
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d="M12 7C12 7 10.2 3.5 7.8 4.2C6.2 4.7 6.1 6.8 7.5 7.5C9.2 8.3 12 7 12 7Z"
          stroke={legacyColor.logoGreen}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M12 7C12 7 13.8 3.5 16.2 4.2C17.8 4.7 17.9 6.8 16.5 7.5C14.8 8.3 12 7 12 7Z"
          stroke={legacyColor.logoGreen}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

export function ChevronRightGlyph() {
  return (
    <View style={styles.chevronDisc}>
      <Svg width={8} height={12} viewBox="0 0 6 10">
        <Path
          d="M1 1L5 5L1 9"
          stroke={legacyColor.primary}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

export function SendArrowGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path d="M5 12H19" stroke={legacyColor.primaryOnPrimary} strokeWidth={1.5} strokeLinecap="round" />
      <Path
        d="M14 7L19 12L14 17"
        stroke={legacyColor.primaryOnPrimary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** Compact withdraw mark for account cards — outbound arrow reads clearer than a card. */
export function WithdrawGlyph() {
  return (
    <View style={styles.withdrawIconDisc}>
      <Svg width={16} height={16} viewBox="0 0 16 16">
        <Path
          d="M8 11.5V3.5"
          stroke={legacyColor.primary}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Path
          d="M4.8 6.2L8 3.2L11.2 6.2"
          stroke={legacyColor.primary}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M3.2 12.8H12.8"
          stroke={legacyColor.primary}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

/** Compact top-up mark — inbound arrow into tray. */
export function TopupGlyph() {
  return (
    <View style={styles.withdrawIconDisc}>
      <Svg width={16} height={16} viewBox="0 0 16 16">
        <Path
          d="M8 3.2V10.2"
          stroke={legacyColor.primary}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
        <Path
          d="M4.8 7.8L8 10.8L11.2 7.8"
          stroke={legacyColor.primary}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path
          d="M3.2 12.8H12.8"
          stroke={legacyColor.primary}
          strokeWidth={1.6}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export function EyeGlyph({ hidden = false }: { hidden?: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path
        d="M1.5 8C2.9 5.3 5.2 3.8 8 3.8C10.8 3.8 13.1 5.3 14.5 8C13.1 10.7 10.8 12.2 8 12.2C5.2 12.2 2.9 10.7 1.5 8Z"
        stroke={legacyColor.primary}
        strokeWidth={1.4}
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={8} cy={8} r={2.2} stroke={legacyColor.primary} strokeWidth={1.4} fill="none" />
      {hidden ? (
        <Path
          d="M3 13L13 3"
          stroke={legacyColor.primary}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ) : null}
    </Svg>
  );
}

export function PersonHeaderIcon() {
  return (
    <View style={styles.profileHit} accessibilityElementsHidden>
      <Svg width={40} height={40} viewBox="0 0 40 40">
        <Circle cx={20} cy={20} r={19.25} fill={legacyColor.surface} stroke={legacyColor.border} strokeWidth={1.5} />
        <Circle cx={20} cy={20} r={17} fill={legacyColor.accountIconBg} />
        <Circle cx={20} cy={15} r={5.2} fill={legacyColor.primary} />
        <Path
          d="M10.5 29.2C11.8 24.9 15.5 22.2 20 22.2C24.5 22.2 28.2 24.9 29.5 29.2C27.1 31.3 23.7 32.5 20 32.5C16.3 32.5 12.9 31.3 10.5 29.2Z"
          fill={legacyColor.primary}
        />
      </Svg>
    </View>
  );
}

/**
 * Bonus chip (display-only) + profile avatar.
 * «500 Б» is not tappable; avatar opens profile when `onProfilePress` is set.
 */
export function ProfileBonusHeader({
  amount = '500 Б',
  onProfilePress,
}: {
  amount?: string;
  onProfilePress?: () => void;
}) {
  return (
    <View style={styles.bonusProfile}>
      <View
        style={styles.bonusSide}
        accessible
        accessibilityRole="text"
        accessibilityLabel={`Бонусный баланс ${amount}`}
      >
        <BonusCoinGlyph />
        <Text style={styles.bonusAmount}>{amount}</Text>
      </View>
      <View style={styles.bonusDivider} />
      <Pressable
        style={styles.profileInner}
        accessibilityRole="button"
        accessibilityLabel="Профиль"
        disabled={!onProfilePress}
        onPress={onProfilePress}
      >
        <Svg width={28} height={28} viewBox="0 0 28 28">
          <Circle cx={14} cy={10.5} r={4.2} fill={legacyColor.primary} />
          <Path
            d="M5.5 22.2C6.6 18.7 9.7 16.5 14 16.5C18.3 16.5 21.4 18.7 22.5 22.2C20.4 23.9 17.4 25 14 25C10.6 25 7.6 23.9 5.5 22.2Z"
            fill={legacyColor.primary}
          />
        </Svg>
      </Pressable>
    </View>
  );
}

export function BonusCoinGlyph() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Circle cx={9} cy={9} r={8} fill={legacyColor.logoGreen} />
      {/* Cashhello bonus mark — stylized gift / spark, not currency */}
      <Path
        d="M5.2 8.1H12.8V13.2C12.8 13.7 12.4 14.1 11.9 14.1H6.1C5.6 14.1 5.2 13.7 5.2 13.2V8.1Z"
        fill="#FFFFFF"
      />
      <Path
        d="M4.6 6.4H13.4V8.1H4.6V6.4Z"
        fill="#FFFFFF"
      />
      <Path
        d="M9 6.4V14.1"
        stroke={legacyColor.logoGreen}
        strokeWidth={1.15}
        strokeLinecap="round"
      />
      <Path
        d="M9 6.4C9 6.4 7.7 4.2 6.35 4.55C5.5 4.8 5.45 5.85 6.25 6.25C7.2 6.7 9 6.4 9 6.4Z"
        fill="#FFFFFF"
      />
      <Path
        d="M9 6.4C9 6.4 10.3 4.2 11.65 4.55C12.5 4.8 12.55 5.85 11.75 6.25C10.8 6.7 9 6.4 9 6.4Z"
        fill="#FFFFFF"
      />
      <Circle cx={9} cy={3.35} r={0.85} fill="#FFFFFF" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
    minWidth: 0,
  },
  brandName: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  profileHit: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bonusProfile: {
    height: 40,
    borderRadius: 20,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 3,
    gap: 6,
  },
  bonusSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bonusAmount: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: legacyColor.textPrimary,
    letterSpacing: -0.2,
  },
  bonusDivider: {
    width: 1,
    height: 18,
    backgroundColor: legacyColor.border,
  },
  profileInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowBox: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronDisc: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: legacyColor.homeChevronFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawIconDisc: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
