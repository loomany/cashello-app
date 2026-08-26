import { type ReactNode, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/primitives/AppText';
import { spring, timing } from '@/design/motion/presets';
import { color, elevation, radius, space } from '@/design/tokens';
import { PROTOTYPE_MODE } from '@/prototype/config';

type Props = {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function AppSheet({ visible, title, onClose, children }: Props) {
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const drag = useSharedValue(0);

  useEffect(() => {
    progress.value = visible ? withSpring(1, spring.modal) : withTiming(0, timing.standard);
    if (!visible) {
      drag.value = 0;
    }
  }, [drag, progress, visible]);

  const close = () => onClose();

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      drag.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      if (event.translationY > 96 || event.velocityY > 900) {
        scheduleOnRN(close);
      } else {
        drag.value = withSpring(0, spring.modal);
      }
    });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [420, 0]) + drag.value }],
  }));

  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Pressable accessibilityRole="button" accessibilityLabel="Dismiss sheet" onPress={onClose} style={styles.flex}>
        <Animated.View style={[styles.backdrop, backdropStyle]} />
      </Pressable>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.dock}>
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, space[16]) }, sheetStyle]}>
            <View style={styles.handle} />
            {PROTOTYPE_MODE ? (
              <AppText variant="caption" tone="tertiary">
                Прототип
              </AppText>
            ) : null}
            <AppText variant="heading">{title}</AppText>
            {children}
          </Animated.View>
        </GestureDetector>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: color.overlay,
  },
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    backgroundColor: color.elevated,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: space[20],
    paddingTop: space[8],
    gap: space[12],
    ...elevation.sheet,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: color.border,
    marginBottom: space[8],
  },
});
