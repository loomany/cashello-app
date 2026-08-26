import { Text, type TextProps } from 'react-native';

import { color, typography, type TypographyVariant } from '@/design/tokens';

type Tone = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent' | 'success' | 'warning' | 'danger' | 'bonus';

type Props = TextProps & {
  variant?: TypographyVariant;
  tone?: Tone;
};

const toneColor: Record<Tone, string> = {
  primary: color.textPrimary,
  secondary: color.textSecondary,
  tertiary: color.textTertiary,
  inverse: color.accentOnAccent,
  accent: color.accent,
  success: color.success,
  warning: color.warning,
  danger: color.danger,
  bonus: color.bonus,
};

export function AppText({ variant = 'body', tone = 'primary', style, ...rest }: Props) {
  return <Text {...rest} style={[typography[variant], { color: toneColor[tone] }, style]} />;
}
