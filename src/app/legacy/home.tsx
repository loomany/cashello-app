import { useLocalSearchParams } from 'expo-router';

import { LegacyHomeScreen } from '@/features/legacyHome/HomeScreen';

export default function LegacyHomeRoute() {
  const params = useLocalSearchParams<{ guest?: string; topup?: string }>();
  const variant = params.guest === '1' || params.guest === 'true' ? 'guest' : 'authorized';
  const openTopup = params.topup === '1' || params.topup === 'true';
  return <LegacyHomeScreen variant={variant} openTopup={openTopup} />;
}
