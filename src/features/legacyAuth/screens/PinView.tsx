import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { legacyColor, legacyType } from '@/design/legacyTokens';
import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { NumericKeypad } from '@/features/legacyAuth/components/NumericKeypad';
import { PinDots } from '@/features/legacyAuth/components/PinDots';
import { copy } from '@/features/legacyAuth/copy';
import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import { CashhelloBrand } from '@/features/legacyHome/HomeIcons';
import { exitAuthToGuestHome } from '@/features/legacyHome/session';
import { PIN_LENGTH } from '@/features/legacyAuth/types';

type Props = {
  title: string;
  support?: string;
  filled: number;
  previousFilled?: number;
  error?: boolean;
  errorMessage?: string;
  login?: boolean;
  onDigit: (digit: string) => void;
  onDelete: () => void;
};

export function PinView({
  title,
  support,
  filled,
  previousFilled,
  error,
  errorMessage,
  login = false,
  onDigit,
  onDelete,
}: Props) {
  const router = useRouter();
  const goHome = () => {
    useLegacyAuthStore.getState().reset();
    exitAuthToGuestHome(router);
  };
  const bottomFilled = error && filled === 0 ? PIN_LENGTH : filled;

  return (
    <AuthFormLayout
      centered
      framed
      titleCentered
      header={<CashhelloBrand onPress={goHome} />}
      title={title}
      support={support}
      bottom={
        <NumericKeypad onDigit={onDigit} onDelete={onDelete} leftSlot={login ? 'face' : 'empty'} />
      }
    >
      <View style={styles.dots}>
        {previousFilled != null ? <PinDots filled={previousFilled} /> : null}
        <PinDots filled={bottomFilled} error={error} />
      </View>
      {error && errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      {login ? <Text style={styles.forgot}>{copy.pinForgot}</Text> : null}
    </AuthFormLayout>
  );
}

const styles = StyleSheet.create({
  dots: { marginTop: 0, gap: 20, alignItems: 'center' },
  error: { ...legacyType.field, color: legacyColor.danger, marginTop: 16, textAlign: 'center' },
  forgot: { ...legacyType.body, color: legacyColor.primary, marginTop: 14, textAlign: 'center' },
});
