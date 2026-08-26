import { Stack } from 'expo-router';

import { legacyColor } from '@/design/legacyTokens';

export default function LegacyHistoryLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: legacyColor.homeBackground },
      }}
    />
  );
}
