import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { legacyColor, legacyRadius, legacySize, legacyType } from '@/design/legacyTokens';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'left', '0', 'del'] as const;

type Props = {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  leftSlot?: 'empty' | 'face';
};

export function NumericKeypad({ onDigit, onDelete, leftSlot = 'empty' }: Props) {
  return (
    <View style={styles.grid}>
      {KEYS.map((key) => {
        if (key === 'left') {
          if (leftSlot === 'face') {
            return (
              <View key="face" style={styles.hit} accessibilityLabel="Face ID (mock)">
                <Svg width={28} height={28} viewBox="0 0 24 24">
                  <Path
                    d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2M8 10h.01M16 10h.01M8.5 15c.8 1.2 2 1.8 3.5 1.8s2.7-.6 3.5-1.8"
                    stroke={legacyColor.keypad}
                    strokeWidth={1.6}
                    fill="none"
                    strokeLinecap="round"
                  />
                </Svg>
              </View>
            );
          }
          return <View key="blank" style={styles.hit} />;
        }
        if (key === 'del') {
          return (
            <Pressable key="del" accessibilityLabel="Удалить" onPress={onDelete} style={styles.hit}>
              <Svg width={26} height={20} viewBox="0 0 26 20">
                <Path d="M9 0H23C24.6569 0 26 1.34315 26 3V17C26 18.6569 24.6569 20 23 20H9L0.602068 10.669C0.259794 10.2887 0.259794 9.71134 0.602068 9.33104L9 0Z" fill={legacyColor.keypadKey} />
                <Path
                  d="M23 0.5C24.3807 0.5 25.5 1.61929 25.5 3V17C25.5 18.3807 24.3807 19.5 23 19.5H9.22363L0.973633 10.335C0.802495 10.1448 0.802496 9.85519 0.973633 9.66504L9.22363 0.5H23Z"
                  stroke={legacyColor.keypad}
                />
                <Path d="M12 6L20 14" stroke={legacyColor.keypad} strokeWidth={1.5} strokeLinecap="round" />
                <Path d="M20 6L12 14" stroke={legacyColor.keypad} strokeWidth={1.5} strokeLinecap="round" />
              </Svg>
            </Pressable>
          );
        }
        return (
          <Pressable key={key} accessibilityLabel={key} onPress={() => onDigit(key)} style={styles.hit}>
            <View style={styles.key}>
              <Text style={styles.num}>{key}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 315,
    alignSelf: 'center',
    paddingBottom: 24,
  },
  hit: {
    width: 105,
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
  },
  key: {
    width: legacySize.keypadHit,
    height: legacySize.keypadHit,
    borderRadius: legacyRadius.key,
    backgroundColor: '#F7F8FC',
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: { ...legacyType.keypad, color: legacyColor.textPrimary },
});
