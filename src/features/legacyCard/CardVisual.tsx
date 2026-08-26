import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { legacyColor, legacyRadius, legacySize } from '@/design/legacyTokens';
import { BrandCircles } from '@/features/legacyCard/CardIcons';
import { cardCopy } from '@/features/legacyCard/copy';
import { DEMO_CARD } from '@/features/legacyCard/mockData';
import type { CardFace } from '@/features/legacyCard/store';

type Props = {
  face: CardFace;
  onToggleCvv: () => void;
};

export function CardVisual({ face, onToggleCvv }: Props) {
  const showCvv = face === 'cvv';
  return (
    <View style={styles.card}>
      <Svg style={StyleSheet.absoluteFill} width={legacySize.cardWidth} height={legacySize.cardHeight}>
        <Path d="M-20 40 L120 -20 L160 20 L20 80 Z" fill="rgba(255,255,255,0.06)" />
        <Path d="M80 220 L280 80 L320 120 L120 260 Z" fill="rgba(255,255,255,0.05)" />
        <Path d="M200 -10 L380 90 L340 140 L160 40 Z" fill="rgba(255,255,255,0.04)" />
      </Svg>
      <View style={styles.top}>
        {showCvv ? (
          <Text style={styles.cvv}>
            {cardCopy.cvvPrefix}
            {DEMO_CARD.cvvMask}
          </Text>
        ) : (
          <Text style={styles.pan}>{DEMO_CARD.panMask}</Text>
        )}
        <BrandCircles />
      </View>
      {showCvv ? null : (
        <>
          <Text style={styles.holder}>{DEMO_CARD.holder}</Text>
          <View style={styles.bottom}>
            <View style={styles.valid}>
              <Text style={styles.validLabel}>{cardCopy.validThru}</Text>
              <Text style={styles.validValue}>{DEMO_CARD.validThru}</Text>
            </View>
            <Pressable accessibilityRole="button" onPress={onToggleCvv} style={styles.cvvBtn}>
              <Text style={styles.cvvBtnLabel}>{cardCopy.showCvv}</Text>
            </Pressable>
          </View>
        </>
      )}
      {showCvv ? (
        <Pressable accessibilityRole="button" onPress={onToggleCvv} style={[styles.cvvBtn, styles.cvvBtnSolo]}>
          <Text style={styles.cvvBtnLabel}>{cardCopy.hideCvv}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: legacySize.cardWidth,
    height: legacySize.cardHeight,
    borderRadius: legacyRadius.card,
    backgroundColor: legacyColor.cardFacePrimary,
    paddingHorizontal: 18,
    paddingTop: 18,
    overflow: 'hidden',
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  pan: { fontSize: 16, fontWeight: '700', color: '#FDFDFD', letterSpacing: 0.4, flex: 1, paddingRight: 8 },
  cvv: { fontSize: 16, fontWeight: '700', color: '#FDFDFD', flex: 1 },
  holder: {
    marginTop: 28,
    fontSize: 14,
    fontWeight: '500',
    color: legacyColor.primaryOnPrimary,
    letterSpacing: 1.2,
  },
  bottom: {
    marginTop: 'auto',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  valid: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  validLabel: {
    width: 42,
    fontSize: 8,
    lineHeight: 10,
    fontWeight: '500',
    color: legacyColor.primaryOnPrimary,
  },
  validValue: { fontSize: 14, fontWeight: '500', color: legacyColor.primaryOnPrimary },
  cvvBtn: {
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cvvBtnSolo: { position: 'absolute', right: 18, bottom: 16 },
  cvvBtnLabel: { fontSize: 12, lineHeight: 16, fontWeight: '600', color: legacyColor.primaryOnPrimary },
});
