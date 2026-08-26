import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import { legacyColor, legacyType } from '@/design/legacyTokens';
import { CurrencyGlyph, StarGlyph } from '@/features/legacyAccounts/AccountIcons';
import { accountsCopy } from '@/features/legacyAccounts/copy';
import type { LegacyAccount } from '@/features/legacyAccounts/mockData';

type Props = {
  account: LegacyAccount;
  primary: boolean;
  onPress: () => void;
  onMakePrimary: () => void;
  balanceLabel?: string;
};

export function AccountRow({ account, primary, onPress, onMakePrimary, balanceLabel }: Props) {
  const shown = balanceLabel ?? account.balance;
  const card = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${shown}, ${account.maskPrefix} ${account.maskSuffix}`}
      onPress={onPress}
      style={styles.card}
    >
      <CurrencyGlyph currency={account.currency} />
      <View style={styles.textCol}>
        <Text style={styles.balance}>{shown}</Text>
        <View style={styles.maskRow}>
          <Text style={styles.mask}>{account.maskPrefix}</Text>
          <View style={styles.dot} />
          <Text style={styles.mask}>{account.maskSuffix}</Text>
        </View>
      </View>
      {primary ? (
        <View style={styles.badge}>
          <StarGlyph />
          <Text style={styles.badgeLabel}>{accountsCopy.primary}</Text>
        </View>
      ) : null}
    </Pressable>
  );

  if (primary) {
    return card;
  }

  return (
    <View style={styles.swipeClip}>
      <Swipeable
        overshootRight={false}
        containerStyle={styles.swipeContainer}
        childrenContainerStyle={styles.swipeChild}
        renderRightActions={() => (
          <Pressable accessibilityRole="button" onPress={onMakePrimary} style={styles.makePrimary}>
            <StarGlyph filled={false} size={24} />
            <Text style={styles.makePrimaryLabel}>{accountsCopy.makePrimary}</Text>
          </Pressable>
        )}
      >
        {card}
      </Swipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  swipeClip: { overflow: 'hidden', borderRadius: 15 },
  swipeContainer: { overflow: 'hidden' },
  swipeChild: { width: '100%' },
  card: {
    height: 75,
    borderRadius: 15,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 10,
  },
  textCol: { flex: 1, gap: 4 },
  balance: { fontSize: 16, lineHeight: 21, fontWeight: '600', color: legacyColor.textPrimary },
  maskRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  mask: { ...legacyType.body, color: legacyColor.textSecondary },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: legacyColor.textSecondary },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  badgeLabel: { ...legacyType.body, color: legacyColor.primary },
  makePrimary: {
    width: 126,
    height: 75,
    backgroundColor: legacyColor.homeBackground,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  makePrimaryLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    color: legacyColor.primary,
    textAlign: 'center',
  },
});
