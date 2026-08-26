import { Image, StyleSheet, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { legacyColor } from '@/design/legacyTokens';
import { type HistoryListIcon, type LegacyHistoryOp } from '@/features/legacyHistory/mockData';

const UBET_LOGO = require('../../../assets/legacy/home/services/ubet.png');

type Size = 'sm' | 'md';

const SLOT: Record<Size, number> = { sm: 32, md: 40 };
const GLYPH: Record<Size, number> = { sm: 22, md: 28 };

export function resolveHistoryListIcon(op: LegacyHistoryOp): HistoryListIcon | null {
  if (op.listIcon) return op.listIcon;
  if (op.kind === 'phone') return 'phone';
  if (op.kind === 'card') return 'card';
  if (/ubet/i.test(op.title) || /ubet/i.test(op.service ?? '') || /ubet/i.test(op.listSubtitle ?? '')) {
    return 'ubet';
  }
  return null;
}

export function HistoryOpIcon({ op, size = 'sm' }: { op: LegacyHistoryOp; size?: Size }) {
  const icon = resolveHistoryListIcon(op);
  if (!icon) return null;
  return <HistoryListIconView icon={icon} size={size} />;
}

export function HistoryListIconView({ icon, size = 'sm' }: { icon: HistoryListIcon; size?: Size }) {
  const slot = SLOT[size];
  const glyph = GLYPH[size];
  const radius = size === 'sm' ? 10 : 12;

  if (icon === 'ubet') {
    return (
      <View style={[styles.slot, styles.ubetSlot, { width: slot, height: slot, borderRadius: radius }]}>
        <Image source={UBET_LOGO} style={styles.ubetLogo} resizeMode="contain" />
      </View>
    );
  }

  if (icon === 'arrow') {
    return null;
  }

  return (
    <View style={[styles.slot, styles.methodSlot, { width: slot, height: slot, borderRadius: radius }]}>
      {icon === 'phone' ? <PhoneGlyph size={glyph} /> : <CardGlyph size={glyph} />}
    </View>
  );
}

function CardGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30">
      <Rect x={5} y={9} width={20} height={12} rx={2} stroke={legacyColor.textPrimary} strokeWidth={1.5} fill="none" />
      <Path d="M5 13H25" stroke={legacyColor.textPrimary} strokeWidth={1.5} />
      <Path d="M18 18H22" stroke={legacyColor.textPrimary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function PhoneGlyph({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30">
      <Rect x={9} y={5} width={12} height={20} rx={2} stroke={legacyColor.textPrimary} strokeWidth={1.5} fill="none" />
      <Path d="M13 8H17" stroke={legacyColor.textPrimary} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M13 22H17" stroke={legacyColor.textPrimary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  slot: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  methodSlot: {
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
  },
  ubetSlot: {
    backgroundColor: '#000000',
    paddingHorizontal: 2,
  },
  ubetLogo: {
    width: '100%',
    height: '100%',
  },
});
