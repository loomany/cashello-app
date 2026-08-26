import { useLocalSearchParams } from 'expo-router';

import { LegacyHomeScreen } from '@/features/legacyHome/HomeScreen';

export default function LegacyHomeRoute() {
  const params = useLocalSearchParams<{ historyLink?: string; guest?: string; topup?: string }>();
  const historyLink = params.historyLink === 'filter' ? 'filter' : 'seeAll';
  const variant = params.guest === '1' || params.guest === 'true' ? 'guest' : 'authorized';
  const openTopup = params.topup === '1' || params.topup === 'true';
  return <LegacyHomeScreen historyLink={historyLink} variant={variant} openTopup={openTopup} />;
}
