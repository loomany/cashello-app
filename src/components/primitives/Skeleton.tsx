import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { color, radius } from '@/design/tokens';

type Props = {
  height?: number;
  width?: number | `${number}%`;
};

export function Skeleton({ height = 16, width = '100%' }: Props) {
  const reduced = useReducedMotion();
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (reduced) {
      pulse.value = 1;
      return;
    }
    pulse.value = withRepeat(withTiming(0.45, { duration: 900 }), -1, true);
  }, [pulse, reduced]);

  const style = useAnimatedStyle(() => ({ opacity: pulse.value }));

  return <Animated.View style={[styles.block, { height, width }, style]} />;
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: color.skeleton,
    borderRadius: radius.sm,
  },
});
