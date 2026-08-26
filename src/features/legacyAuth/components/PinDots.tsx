import { StyleSheet, View } from 'react-native';

import { legacyColor, legacyRadius, legacySize } from '@/design/legacyTokens';
import { PIN_LENGTH } from '@/features/legacyAuth/types';

type Props = {
  length?: number;
  filled: number;
  error?: boolean;
};

export function PinDots({ length = PIN_LENGTH, filled, error = false }: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length }, (_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index < filled && { backgroundColor: error ? legacyColor.danger : legacyColor.pinDot },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', width: 240, alignSelf: 'center' },
  dot: {
    width: legacySize.pinDot,
    height: legacySize.pinDot,
    borderRadius: legacyRadius.pin,
    backgroundColor: legacyColor.pinDotEmpty,
  },
});
