import { GuestStubScreen } from '@/features/legacyHome/GuestStubScreen';
import { profileCopy } from '@/features/legacyProfile/copy';

export default function DocumentsStubRoute() {
  return (
    <GuestStubScreen
      route="/legacy/stub/documents"
      screenName="Documents stub"
      title={profileCopy.documents}
      body={profileCopy.documentsStub}
    />
  );
}
