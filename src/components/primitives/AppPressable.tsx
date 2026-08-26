import { type ReactNode } from 'react';
import { Pressable, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { motionOpacity, motionScale, timing } from '@/design/motion/presets';
import { tapFeedback } from '@/lib/haptics';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  haptic?: boolean;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  accessibilityRole?: 'button' | 'link';
};

export function AppPressable({
  children,
  onPress,
  disabled = false,
  haptic = false,
  selected,
  style,
  accessibilityLabel,
  accessibilityRole = 'button',
}: Props) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, motionScale.tap]) }],
    opacity: disabled ? 0.4 : interpolate(pressed.value, [0, 1], [1, motionOpacity.tap]),
  }));

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      style={style}
      onPressIn={() => {
        pressed.value = withTiming(1, timing.tap);
      }}
      onPressOut={() => {
        pressed.value = withTiming(0, timing.tapRelease);
      }}
      onPress={() => {
        if (haptic) {
          void tapFeedback();
        }
        onPress?.();
      }}
    >
      <Animated.View style={[{ alignSelf: 'stretch', width: '100%' }, animatedStyle]}>{children}</Animated.View>
    </Pressable>
  );
}
