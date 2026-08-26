import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { legacyColor, legacyFontFamily } from '@/design/legacyTokens';

export function AccountAvatarGlyph() {
  return (
    <Image
      source={require('../../../assets/legacy/profile/ic-account.png')}
      style={styles.avatar}
      accessibilityIgnoresInvertColors
    />
  );
}

/** Circular progress for identification status (0–100) — arc over light track. */
export function StatusProgressRing({ percent = 25, size = 72 }: { percent?: number; size?: number }) {
  const stroke = 7;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - stroke) / 2;
  const clamped = Math.max(0, Math.min(100, percent));
  const endAngle = (clamped / 100) * 360;

  const polar = (angleDeg: number) => {
    const a = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };

  const arcPath = (() => {
    if (clamped <= 0) return '';
    if (clamped >= 100) {
      // Full ring as two semicircles so SVG path closes cleanly.
      const mid = polar(180);
      const end = polar(360);
      const start = polar(0);
      return `M ${start.x} ${start.y} A ${r} ${r} 0 1 1 ${mid.x} ${mid.y} A ${r} ${r} 0 1 1 ${end.x} ${end.y}`;
    }
    const start = polar(0);
    const end = polar(endAngle);
    const largeArc = endAngle > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  })();

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={legacyColor.accountIconBg}
          strokeWidth={stroke}
          fill="none"
        />
        {arcPath ? (
          <Path
            d={arcPath}
            stroke={legacyColor.primary}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />
        ) : null}
      </Svg>
      <Text style={styles.progressLabel}>{`${clamped}%`}</Text>
    </View>
  );
}

export function LimitCheckGlyph() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Circle cx={10} cy={10} r={9} fill={legacyColor.logoGreen} />
      <Path
        d="M6 10.2l2.4 2.4L14 7.2"
        stroke="#FFFFFF"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function LimitLockGlyph() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20">
      <Rect x={5} y={9} width={10} height={8} rx={1.5} stroke={legacyColor.textPrimary} strokeWidth={1.5} fill="none" />
      <Path
        d="M7 9V7a3 3 0 0 1 6 0v2"
        stroke={legacyColor.textPrimary}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PhoneRowGlyph() {
  return (
    <View style={styles.rowIcon}>
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Path
          d="M6.2 3.5h2.1l1 3.2-1.4 1.4a10.5 10.5 0 0 0 4 4l1.4-1.4 3.2 1v2.1a1.6 1.6 0 0 1-1.6 1.6A11.9 11.9 0 0 1 4.6 5.1a1.6 1.6 0 0 1 1.6-1.6z"
          stroke={legacyColor.primary}
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

export function PromoTagGlyph() {
  return (
    <View style={styles.rowIcon}>
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Path
          d="M3.5 10.2V5.8A1.3 1.3 0 0 1 4.8 4.5h4.4c.3 0 .7.1.9.4l5.6 5.6a1.3 1.3 0 0 1 0 1.8l-3.4 3.4a1.3 1.3 0 0 1-1.8 0L4 11.1a1.3 1.3 0 0 1-.5-.9z"
          stroke={legacyColor.primary}
          strokeWidth={1.5}
          fill="none"
          strokeLinejoin="round"
        />
        <Circle cx={7.2} cy={7.2} r={1.1} fill={legacyColor.primary} />
      </Svg>
    </View>
  );
}

export function StatusHeroGlyph() {
  return (
    <Svg width={64} height={64} viewBox="0 0 64 64">
      <Rect x={14} y={8} width={28} height={48} rx={5} fill={legacyColor.primaryOnPrimary} opacity={0.95} />
      <Rect x={18} y={14} width={20} height={30} rx={2} fill={legacyColor.accountIconBg} />
      <Circle cx={28} cy={26} r={6} stroke={legacyColor.primary} strokeWidth={1.5} fill="none" />
      <Path
        d="M22 36c1.2-3 3.8-4.5 6-4.5s4.8 1.5 6 4.5"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Circle cx={48} cy={18} r={10} fill={legacyColor.logoGreen} />
      <Path
        d="M48 13v6M45 16h6"
        stroke="#FFFFFF"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function PersonRowGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={3} stroke={legacyColor.primary} strokeWidth={1.5} fill="none" />
      <Path
        d="M5 19c0-3.3 3.1-5 7-5s7 1.7 7 5"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export function LogoutGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M10 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M14 12H21"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M18 8l4 4-4 4"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function LinkedCardsGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Rect x={3.5} y={6} width={17} height={12} rx={2} stroke={legacyColor.primary} strokeWidth={1.5} fill="none" />
      <Path d="M3.5 10H20.5" stroke={legacyColor.primary} strokeWidth={1.5} />
      <Path d="M7 15H11" stroke={legacyColor.primary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function SupportGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M5 12a7 7 0 0 1 14 0"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M5 12v3.5A1.5 1.5 0 0 0 6.5 17H8v-5H5zM19 12v3.5A1.5 1.5 0 0 1 17.5 17H16v-5h3z"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={19} r={1.2} fill={legacyColor.primary} />
    </Svg>
  );
}

export function IdeaGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M9 18h6M10 21h4"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M12 3a5.5 5.5 0 0 0-3.2 9.9c.7.5 1.2 1.3 1.2 2.1V16h4v-.999c0-.8.5-1.6 1.2-2.1A5.5 5.5 0 0 0 12 3z"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function DeleteAccountGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M5 7h14M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M7 7l1 12a1.5 1.5 0 0 0 1.5 1.4h5A1.5 1.5 0 0 0 16 19L17 7"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function InfoGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={8} stroke={legacyColor.textSecondary} strokeWidth={1.5} fill="none" />
      <Path d="M12 11v5" stroke={legacyColor.textSecondary} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={12} cy={8} r={1} fill={legacyColor.textSecondary} />
    </Svg>
  );
}

export function AttachGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Rect
        x={5}
        y={4}
        width={14}
        height={16}
        rx={2}
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
      />
      <Path
        d="M12 8v7M9 12l3 3 3-3"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function WalletMessageGlyph() {
  return (
    <View style={styles.walletDisc}>
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Path
          d="M4 8h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z"
          stroke={legacyColor.primary}
          strokeWidth={1.5}
          fill="none"
        />
        <Path d="M4 8l2-3h10l2 3" stroke={legacyColor.primary} strokeWidth={1.5} fill="none" />
        <Circle cx={16} cy={14} r={1.2} fill={legacyColor.primary} />
      </Svg>
    </View>
  );
}

export function UserMessageGlyph() {
  return (
    <View style={styles.userDisc}>
      <Svg width={18} height={18} viewBox="0 0 24 24">
        <Circle cx={12} cy={9} r={3} fill={legacyColor.primaryOnPrimary} />
        <Path d="M6 18c0-2.8 2.7-4 6-4s6 1.2 6 4" fill={legacyColor.primaryOnPrimary} />
      </Svg>
    </View>
  );
}

export function LegacyToggle({ value, onValueChange }: { value: boolean; onValueChange: () => void }) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={onValueChange}
      style={[styles.toggleTrack, value ? styles.toggleOn : styles.toggleOff]}
      hitSlop={8}
    >
      <View style={[styles.toggleKnob, value ? styles.knobOn : styles.knobOff]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 40, height: 40 },
  progressLabel: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: legacyColor.textSecondary,
    fontFamily: legacyFontFamily,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletDisc: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: legacyColor.logoGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDisc: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C8C8C8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleTrack: {
    width: 40,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleOn: { backgroundColor: legacyColor.primary },
  toggleOff: { backgroundColor: legacyColor.toggleOff },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: legacyColor.primaryOnPrimary,
  },
  knobOn: { alignSelf: 'flex-end' },
  knobOff: { alignSelf: 'flex-start' },
});
