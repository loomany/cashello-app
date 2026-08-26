import { useRouter } from 'expo-router';

import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { ConsentNotice } from '@/features/legacyAuth/components/ConsentRow';
import { LegacyInput } from '@/features/legacyAuth/components/LegacyInput';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { copy } from '@/features/legacyAuth/copy';
import { formatKzPhone, KZ_PHONE_CARET_MIN } from '@/features/legacyAuth/machine';
import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import { CashhelloBrand } from '@/features/legacyHome/HomeIcons';
import { exitAuthToGuestHome } from '@/features/legacyHome/session';

type Props = {
  phoneDigits: string;
  canSubmit: boolean;
  onChangePhone: (value: string) => void;
  onSubmit: () => void;
};

export function RegisterIinView({ phoneDigits, canSubmit, onChangePhone, onSubmit }: Props) {
  const router = useRouter();
  const goHome = () => {
    useLegacyAuthStore.getState().reset();
    exitAuthToGuestHome(router);
  };

  return (
    <AuthFormLayout
      centered
      framed
      titleCentered
      header={<CashhelloBrand onPress={goHome} />}
      title={copy.registerTitle}
      support={copy.registerSupport}
      onBack={goHome}
      onClose={goHome}
      footer={<LegacyPrimaryButton label={copy.loginAction} disabled={!canSubmit} onPress={onSubmit} />}
    >
      <LegacyInput
        label={copy.phoneLabel}
        value={formatKzPhone(phoneDigits)}
        onChangeText={onChangePhone}
        keyboardType="phone-pad"
        focusedBorder
        labelActive
        caretMin={KZ_PHONE_CARET_MIN}
        maskCaret
      />
      <ConsentNotice prefix={copy.termsPrefix} link={copy.termsLink} />
    </AuthFormLayout>
  );
}
