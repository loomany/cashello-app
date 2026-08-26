import { useLocalSearchParams } from 'expo-router';

import { BetweenAccountsScreen } from '@/features/legacyTopup/BetweenAccountsScreen';

export default function LegacyBetweenRoute() {
  const { to } = useLocalSearchParams<{ to?: string }>();
  return <BetweenAccountsScreen toAccountId={typeof to === 'string' ? to : 'kzt-primary'} />;
}
