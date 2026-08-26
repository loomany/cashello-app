import { useLocalSearchParams } from 'expo-router';

import { AccountDetailScreen } from '@/features/legacyAccounts/AccountDetailScreen';

export default function LegacyAccountDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <AccountDetailScreen accountId={typeof id === 'string' ? id : 'kzt-primary'} />;
}
