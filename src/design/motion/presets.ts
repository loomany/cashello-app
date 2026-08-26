import { Easing, ReduceMotion, type WithSpringConfig, type WithTimingConfig } from 'react-native-reanimated';

/**
 * Central motion presets. Do not scatter animation constants in screens.
 * Feeling: premium fintech, not an animation demo.
 */
export const motionDuration = {
  tap: 120,
  tapRelease: 160,
  standard: 240,
  modal: 320,
  success: 400,
  valueChange: 280,
} as const;

export const motionScale = {
  tap: 0.98,
} as const;

export const motionOpacity = {
  tap: 0.92,
} as const;

export const stagger = {
  delayMs: 40,
  maxItems: 6,
} as const;

export const timing = {
  tap: {
    duration: motionDuration.tap,
    easing: Easing.out(Easing.quad),
    reduceMotion: ReduceMotion.System,
  } satisfies WithTimingConfig,
  tapRelease: {
    duration: motionDuration.tapRelease,
    easing: Easing.out(Easing.cubic),
    reduceMotion: ReduceMotion.System,
  } satisfies WithTimingConfig,
  standard: {
    duration: motionDuration.standard,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
    reduceMotion: ReduceMotion.System,
  } satisfies WithTimingConfig,
  valueChange: {
    duration: motionDuration.valueChange,
    easing: Easing.out(Easing.cubic),
    reduceMotion: ReduceMotion.System,
  } satisfies WithTimingConfig,
} as const;

export const spring = {
  modal: {
    damping: 28,
    stiffness: 260,
    mass: 0.9,
    reduceMotion: ReduceMotion.System,
  } satisfies WithSpringConfig,
  success: {
    damping: 16,
    stiffness: 220,
    mass: 0.7,
    reduceMotion: ReduceMotion.System,
  } satisfies WithSpringConfig,
} as const;
