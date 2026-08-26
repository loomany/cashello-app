import { StyleSheet, Text, View, type TextProps } from 'react-native';

import { color, typography } from '@/design/tokens';
import { currencySymbol, formatMoney, maskedMoney } from '@/lib/formatMoney';
import type { MoneyUnit } from '@/types/domain';

type Size = 'display' | 'title' | 'compact' | 'account';
type Tone = 'default' | 'credit' | 'debit' | 'bonus' | 'muted' | 'hero';

type Props = TextProps & {
  amountMinor: number;
  unit: MoneyUnit;
  size?: Size;
  tone?: Tone;
  compact?: boolean;
  hidden?: boolean;
};

const sizeStyle = {
  display: typography.display,
  title: typography.title,
  compact: typography.body,
  account: typography.account,
} as const;

const toneColor: Record<Tone, string> = {
  default: color.textPrimary,
  credit: color.success,
  debit: color.textPrimary,
  bonus: color.bonus,
  muted: color.textSecondary,
  hero: color.accentOnAccent,
};

const dotSize: Record<Size, number> = {
  display: 9,
  title: 7,
  compact: 6,
  account: 5,
};

function PrivacyMask({ unit, size, ink }: { unit: MoneyUnit; size: Size; ink: string }) {
  const dim = dotSize[size];
  return (
    <View style={styles.mask} accessible={false}>
      {[0, 1, 2, 3].map((index) => (
        <View
          key={index}
          style={{
            width: dim,
            height: dim,
            borderRadius: dim,
            backgroundColor: ink,
            opacity: 0.42,
          }}
        />
      ))}
      <Text style={[sizeStyle[size], styles.tabular, { color: ink, marginLeft: 2 }]}>{currencySymbol(unit)}</Text>
    </View>
  );
}

export function MoneyText({
  amountMinor,
  unit,
  size = 'title',
  tone = 'default',
  compact = false,
  hidden = false,
  style,
  accessibilityLabel,
  ...rest
}: Props) {
  const ink = toneColor[tone];
  if (hidden) {
    return (
      <View
        accessible
        accessibilityLabel={accessibilityLabel ?? maskedMoney(unit)}
        accessibilityRole="text"
      >
        <PrivacyMask unit={unit} size={size} ink={ink} />
      </View>
    );
  }

  return (
    <Text
      {...rest}
      accessibilityLabel={accessibilityLabel}
      style={[sizeStyle[size], styles.tabular, { color: ink }, style]}
    >
      {formatMoney(amountMinor, unit, compact)}
    </Text>
  );
}

const styles = StyleSheet.create({
  tabular: {
    fontVariant: ['tabular-nums'],
    letterSpacing: -0.25,
  },
  mask: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
