import { GuestStubScreen } from '@/features/legacyHome/GuestStubScreen';
import { profileCopy } from '@/features/legacyProfile/copy';

export default function SuggestIdeaStubRoute() {
  return (
    <GuestStubScreen
      route="/legacy/stub/suggest-idea"
      screenName="Suggest idea stub"
      title={profileCopy.suggestIdea}
      body={profileCopy.suggestIdeaStub}
    />
  );
}
