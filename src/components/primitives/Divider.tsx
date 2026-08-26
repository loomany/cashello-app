import { StyleSheet, View } from 'react-native';

import { color, space } from '@/design/tokens';

export function Divider() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.border,
    marginVertical: space[16],
  },
});
