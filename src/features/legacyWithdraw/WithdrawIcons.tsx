import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { legacyColor } from '@/design/legacyTokens';

export function CardMethodGlyph() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      <Rect x={5} y={9} width={20} height={12} rx={2} stroke={legacyColor.textPrimary} strokeWidth={1.5} fill="none" />
      <Path d="M5 13H25" stroke={legacyColor.textPrimary} strokeWidth={1.5} />
      <Path d="M18 18H22" stroke={legacyColor.textPrimary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function PhoneMethodGlyph() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      <Rect x={9} y={5} width={12} height={20} rx={2} stroke={legacyColor.textPrimary} strokeWidth={1.5} fill="none" />
      <Path d="M13 8H17" stroke={legacyColor.textPrimary} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M13 22H17" stroke={legacyColor.textPrimary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function CashMethodGlyph() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      <Path
        d="M15 24C15 24 22 18.5 22 13.5C22 9.9 18.9 7 15 7C11.1 7 8 9.9 8 13.5C8 18.5 15 24 15 24Z"
        stroke={legacyColor.textPrimary}
        strokeWidth={1.5}
        fill="none"
      />
      <Circle cx={15} cy={13.5} r={2} fill={legacyColor.textPrimary} />
      <Path d="M8 24H22" stroke={legacyColor.textPrimary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function OtherMethodGlyph() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      <Circle cx={15} cy={8} r={2} fill={legacyColor.textPrimary} />
      <Circle cx={15} cy={15} r={2} fill={legacyColor.textPrimary} />
      <Circle cx={15} cy={22} r={2} fill={legacyColor.textPrimary} />
    </Svg>
  );
}

/** P2P to another Cashhello user — person silhouette. */
export function CashhelloUserMethodGlyph() {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30">
      <Circle cx={15} cy={11} r={4.2} fill={legacyColor.primary} />
      <Path
        d="M7.5 22.5C8.6 18.8 11.4 16.5 15 16.5C18.6 16.5 21.4 18.8 22.5 22.5"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export function DestCardGlyph() {
  return (
    <Svg width={45} height={45} viewBox="0 0 45 45">
      <Circle cx={22.5} cy={22.5} r={22.5} fill="#E53935" />
      <Circle cx={17} cy={20} r={5} fill="#FFFFFF" opacity={0.95} />
      <Circle cx={28} cy={20} r={4} fill="#FFFFFF" opacity={0.85} />
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

export function ContactGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={10} stroke={legacyColor.primary} strokeWidth={1.4} fill="none" />
      <Circle cx={12} cy={10} r={3} fill={legacyColor.primary} />
      <Path d="M6.5 18C7.5 15.5 9.5 14 12 14C14.5 14 16.5 15.5 17.5 18" stroke={legacyColor.primary} strokeWidth={1.4} fill="none" />
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

export function ClockInfoGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={8} stroke={legacyColor.textSecondary} strokeWidth={1.4} fill="none" />
      <Path d="M12 8V12L14.5 14" stroke={legacyColor.textSecondary} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}
