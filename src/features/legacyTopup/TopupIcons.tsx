import Svg, { Circle, Path, Rect, Text as SvgText } from 'react-native-svg';

import { legacyColor } from '@/design/legacyTokens';

export function BetweenMethodGlyph() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Path
        d="M8 10C8 10 10 6 16 8C22 10 22 16 22 16"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M20 18C20 18 18 22 12 20C6 18 6 12 6 12"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <SvgText x={10} y={18} fill={legacyColor.primary} fontSize={10} fontWeight="600">
        ₸
      </SvgText>
    </Svg>
  );
}

export function CardMethodGlyph() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Rect
        x={5}
        y={8}
        width={18}
        height={12}
        rx={2}
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
      />
      <Path d="M5 12H23" stroke={legacyColor.primary} strokeWidth={1.5} />
    </Svg>
  );
}

export function CashMethodGlyph() {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28">
      <Circle cx={14} cy={14} r={11} stroke={legacyColor.primaryDisabledText} strokeWidth={1.4} fill="none" />
      <Path
        d="M14 20C14 20 19 16.8 19 13.2C19 10.5 16.8 8.4 14 8.4C11.2 8.4 9 10.5 9 13.2C9 16.8 14 20 14 20Z"
        stroke={legacyColor.textPrimary}
        strokeWidth={1.4}
        fill="none"
      />
      <Circle cx={14} cy={13.2} r={1.4} fill={legacyColor.textPrimary} />
    </Svg>
  );
}

export function ScanGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path d="M4 8V5H7" stroke={legacyColor.primary} strokeWidth={1.6} strokeLinecap="round" fill="none" />
      <Path d="M20 8V5H17" stroke={legacyColor.primary} strokeWidth={1.6} strokeLinecap="round" fill="none" />
      <Path d="M4 16V19H7" stroke={legacyColor.primary} strokeWidth={1.6} strokeLinecap="round" fill="none" />
      <Path d="M20 16V19H17" stroke={legacyColor.primary} strokeWidth={1.6} strokeLinecap="round" fill="none" />
      <Path d="M6 12H18" stroke={legacyColor.primary} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

export function SearchPinGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M12 20C12 20 18 15.5 18 11C18 7.7 15.3 5 12 5C8.7 5 6 7.7 6 11C6 15.5 12 20 12 20Z"
        stroke={legacyColor.primary}
        strokeWidth={1.5}
        fill="none"
      />
      <Circle cx={12} cy={11} r={1.8} fill={legacyColor.primary} />
    </Svg>
  );
}

export function ChevronRightGlyph() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Path
        d="M6 3L11 8L6 13"
        stroke={legacyColor.textTertiary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function PlusCircleGlyph() {
  return (
    <Svg width={45} height={45} viewBox="0 0 45 45">
      <Circle cx={22.5} cy={22.5} r={22.5} fill={legacyColor.primary} />
      <Path d="M22.5 14V31M14 22.5H31" stroke={legacyColor.primaryOnPrimary} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}
