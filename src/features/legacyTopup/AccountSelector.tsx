import { Pressable, StyleSheet, Text, View } from 'react-native';

import { legacyColor, legacyType } from '@/design/legacyTokens';
import { CurrencyGlyph } from '@/features/legacyAccounts/AccountIcons';
import type { LegacyAccount } from '@/features/legacyAccounts/mockData';
import { topupCopy } from '@/features/legacyTopup/copy';
import { ChevronRightGlyph, PlusCircleGlyph } from '@/features/legacyTopup/TopupIcons';

type Props = {
  label: string;
  account?: LegacyAccount;
  balanceLabel?: string;
  empty?: boolean;
  onPress: () => void;
};

/** LGC-CMP-014 AccountSelector — 345×92 from/to card. */
export function AccountSelector({ label, account, balanceLabel, empty, onPress }: Props) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      {empty || !account ? (
        <View style={styles.row}>
          <PlusCircleGlyph />
          <Text style={styles.choose}>{topupCopy.choose}</Text>
        </View>
      ) : (
        <View style={styles.row}>
          <CurrencyGlyph currency={account.currency} />
          <View style={styles.textCol}>
            <Text style={styles.balance}>{balanceLabel ?? account.balance}</Text>
            <View style={styles.maskRow}>
              <Text style={styles.mask}>{account.maskPrefix}</Text>
              <View style={styles.dot} />
              <Text style={styles.mask}>{account.maskSuffix}</Text>
            </View>
          </View>
          <ChevronRightGlyph />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 345,
    minHeight: 92,
    borderRadius: 12,
    backgroundColor: legacyColor.surface,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  label: { fontSize: 12, lineHeight: 16, color: legacyColor.textSecondary, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  choose: { ...legacyType.field, color: legacyColor.primary },
  textCol: { flex: 1, gap: 2 },
  balance: { ...legacyType.field, color: legacyColor.textPrimary },
  maskRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  mask: { ...legacyType.body, color: legacyColor.textSecondary },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: legacyColor.textTertiary },
});
