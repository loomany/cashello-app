import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/primitives/AppText';
import { color, radius, space } from '@/design/tokens';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'bonus';

type Props = {
  label: string;
  tone?: Tone;
};

const toneBg: Record<Tone, string> = {
  neutral: color.skeleton,
  success: color.statusSuccessBg,
  warning: color.statusWarningBg,
  danger: color.statusDangerBg,
  info: color.statusInfoBg,
  bonus: color.bonusSurface,
};

const toneFg: Record<Tone, 'primary' | 'success' | 'danger' | 'bonus'> = {
  neutral: 'primary',
  success: 'success',
  warning: 'primary',
  danger: 'danger',
  info: 'primary',
  bonus: 'bonus',
};

export function StatusChip({ label, tone = 'neutral' }: Props) {
  return (
    <View style={[styles.chip, { backgroundColor: toneBg[tone] }]}>
      <AppText variant="caption" tone={toneFg[tone]}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: space[12],
    paddingVertical: space[4],
  },
});
