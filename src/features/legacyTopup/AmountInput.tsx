import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { legacyColor, legacyType } from '@/design/legacyTokens';
import type { AccountCurrency } from '@/features/legacyAccounts/mockData';
import { topupCopy } from '@/features/legacyTopup/copy';
import { formatAmountWithUnit } from '@/features/legacyTopup/mockData';

type Props = {
  amount: number;
  currency: AccountCurrency;
  digits: string;
  onChangeDigits: (value: string) => void;
  onFillAll: () => void;
  showRange?: boolean;
};

/** LGC-CMP-015 AmountInput — 345×70 amount field. */
export function AmountInput({ amount, currency, digits, onChangeDigits, onFillAll, showRange = true }: Props) {
  const display = amount > 0 ? formatAmountWithUnit(amount, currency) : `0 ${currency === 'USD' ? '$' : '₸'}`;
  return (
    <View>
      <View style={styles.head}>
        <Text style={styles.caption}>
          {topupCopy.amountLabel}
          {showRange ? <Text style={styles.range}>{topupCopy.amountRange}</Text> : null}
        </Text>
        <Pressable accessibilityRole="button" onPress={onFillAll}>
          <Text style={styles.all}>{topupCopy.all}</Text>
        </Pressable>
      </View>
      <View style={styles.field}>
        <Text style={styles.value}>{display}</Text>
        <TextInput
          accessibilityLabel={topupCopy.amountLabel}
          keyboardType="number-pad"
          value={digits}
          onChangeText={onChangeDigits}
          style={styles.hidden}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: { width: 345, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  caption: { ...legacyType.body, color: legacyColor.textPrimary },
  range: { color: legacyColor.textTertiary },
  all: { ...legacyType.caption, color: legacyColor.primary },
  field: {
    width: 345,
    height: 70,
    borderRadius: 12,
    backgroundColor: legacyColor.surface,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  value: { fontSize: 20, lineHeight: 26, fontWeight: '500', color: legacyColor.textPrimary },
  hidden: { ...StyleSheet.absoluteFill, opacity: 0.02, color: legacyColor.textPrimary },
});
