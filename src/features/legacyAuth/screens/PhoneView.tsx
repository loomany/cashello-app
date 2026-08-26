import { useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { legacyColor, legacyType } from '@/design/legacyTokens';
import { AuthFormLayout } from '@/features/legacyAuth/components/AuthFormLayout';
import { LegacyInput } from '@/features/legacyAuth/components/LegacyInput';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { copy } from '@/features/legacyAuth/copy';
import { formatKzPhone, KZ_PHONE_CARET_MIN } from '@/features/legacyAuth/machine';
import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import { CashhelloBrand } from '@/features/legacyHome/HomeIcons';
import { exitAuthToGuestHome } from '@/features/legacyHome/session';
import { SMS_LENGTH } from '@/features/legacyAuth/types';

type PhoneProps = {
  digits: string;
  canSubmit: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function PhoneView({ digits, canSubmit, onChange, onSubmit }: PhoneProps) {
  return (
    <AuthFormLayout
      title={copy.phoneTitle}
      footer={<LegacyPrimaryButton label={copy.next} disabled={!canSubmit} onPress={onSubmit} />}
    >
      <LegacyInput
        label={copy.phoneLabel}
        value={formatKzPhone(digits)}
        onChangeText={onChange}
        keyboardType="phone-pad"
        focusedBorder
        labelActive
        caretMin={KZ_PHONE_CARET_MIN}
        maskCaret
      />
    </AuthFormLayout>
  );
}

type SmsProps = {
  sms: string;
  phoneDigits: string;
  onChange: (value: string) => void;
  onBack: () => void;
};

function displayPhone(digits: string): string {
  return formatKzPhone(digits).replace(/_/g, '').replace(/\s+/g, ' ').trim();
}

export function VerificationView({ sms, phoneDigits, onChange, onBack }: SmsProps) {
  const inputRef = useRef<TextInput>(null);
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
      title={copy.smsTitle}
      support={
        <View style={styles.supportBlock}>
          <Text style={styles.supportLine}>{copy.smsSupportLine1}</Text>
          <Text style={styles.supportPhone}>
            {copy.smsSupportLine2Prefix}
            <Text style={styles.supportPhoneValue}>{displayPhone(phoneDigits)}</Text>
          </Text>
        </View>
      }
      onBack={onBack}
      onClose={goHome}
      footer={<Text style={styles.resend}>{copy.smsResend}</Text>}
    >
      <Pressable style={styles.otp} onPress={() => inputRef.current?.focus()} accessibilityRole="button">
        {Array.from({ length: SMS_LENGTH }, (_, i) => (
          <View key={i} style={[styles.box, sms[i] ? styles.boxFilled : null]}>
            <Text style={styles.digit}>{sms[i] ?? '–'}</Text>
          </View>
        ))}
        <TextInput
          ref={inputRef}
          value={sms}
          onChangeText={onChange}
          keyboardType="number-pad"
          maxLength={SMS_LENGTH}
          autoFocus
          caretHidden
          style={styles.hidden}
        />
      </Pressable>
    </AuthFormLayout>
  );
}

const styles = StyleSheet.create({
  supportBlock: {
    marginTop: 2,
    alignItems: 'center',
    gap: 4,
  },
  supportLine: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    textAlign: 'center',
  },
  supportPhone: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    textAlign: 'center',
  },
  supportPhoneValue: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    fontSize: 15,
    lineHeight: 20,
  },
  otp: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 4,
    marginBottom: 4,
  },
  box: {
    width: 52,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.14)',
    backgroundColor: '#F7F8FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxFilled: {
    borderColor: 'rgba(18, 38, 170, 0.45)',
    backgroundColor: legacyColor.surface,
  },
  digit: { ...legacyType.field, color: legacyColor.textPrimary, fontSize: 20, lineHeight: 26 },
  resend: { ...legacyType.body, color: legacyColor.textTertiary, textAlign: 'center' },
  hidden: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.02,
    color: 'transparent',
  },
});
