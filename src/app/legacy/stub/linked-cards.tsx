import { GuestStubScreen } from '@/features/legacyHome/GuestStubScreen';
import { profileCopy } from '@/features/legacyProfile/copy';

export default function LinkedCardsStubRoute() {
  return (
    <GuestStubScreen
      route="/legacy/stub/linked-cards"
      screenName="Linked cards stub"
      title={profileCopy.linkedCards}
      body={profileCopy.linkedCardsStub}
    />
  );
}
