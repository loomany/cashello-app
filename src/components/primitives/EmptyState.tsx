import { StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/primitives/AppButton';
import { AppText } from '@/components/primitives/AppText';
import { space } from '@/design/tokens';

type Props = {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, body, actionLabel, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <AppText variant="heading">{title}</AppText>
      <AppText variant="body" tone="secondary">
        {body}
      </AppText>
      {actionLabel && onAction ? <AppButton label={actionLabel} variant="secondary" onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: space[8],
    paddingVertical: space[24],
  },
});
