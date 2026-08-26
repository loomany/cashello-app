import { Platform } from 'react-native';

import { PROTOTYPE_MODE } from '@/prototype/config';

export async function tapFeedback(): Promise<void> {
  if (!PROTOTYPE_MODE || Platform.OS === 'web') return;
  try {
    const Haptics = await import('expo-haptics');
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {
    // Haptics are optional. Web and unsupported devices must stay silent.
  }
}

export async function successFeedback(): Promise<void> {
  if (!PROTOTYPE_MODE || Platform.OS === 'web') return;
  try {
    const Haptics = await import('expo-haptics');
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {
    // Optional.
  }
}
