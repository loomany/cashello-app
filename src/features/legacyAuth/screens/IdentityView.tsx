import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { copy } from '@/features/legacyAuth/copy';

/** JUMP-only. Late UI has no identity intro; 924:24543 is the face-fail alert. */
export function IdentityView({ onContinue }: { onContinue: () => void }) {
  return (
    <AuthFormLayout
      title="Jump"
      support="924:24543 is face-fail, not an identity intro. Continue opens face."
      footer={<LegacyPrimaryButton label={copy.next} onPress={onContinue} />}
    />
  );
}
