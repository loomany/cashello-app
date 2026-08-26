import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { NumericKeypad } from '@/features/legacyAuth/components/NumericKeypad';
import { formatKzPhone } from '@/features/legacyAuth/machine';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { profileCopy } from '@/features/legacyProfile/copy';
import { PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function ChangePhoneVerifyScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.phoneVerify);
  const pending = useLegacyProfileStore((s) => s.pendingPhoneDigits);
  const sms = useLegacyProfileStore((s) => s.phoneSms);
  const setSms = useLegacyProfileStore((s) => s.setPhoneSms);
  const commit = useLegacyProfileStore((s) => s.commitPendingPhone);

  useScreenMeta({
    screenName: 'Legacy Change phone verify',
    route: PROFILE_BRIDGES.phoneVerify,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-123',
    legacyNodeId: '821:31991',
  });

  useEffect(() => {
    if (pending.length !== 10) {
      router.replace(PROFILE_BRIDGES.phone as never);
    }
  }, [pending.length, router]);

  useEffect(() => {
    if (sms.length === 4) {
      const ok = commit();
      if (ok) {
        router.replace(PROFILE_BRIDGES.profile as never);
      }
    }
  }, [sms, commit, router]);

  const cells = [0, 1, 2, 3].map((i) => sms[i] ?? '_');

  if (pending.length !== 10) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.support}> </Text>
      </SafeAreaView>
    );
  }

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.phoneVerify}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={onBack}
          style={styles.back}
          hitSlop={8}
        >
          <ChevronBackGlyph />
        </Pressable>

        <Text style={styles.title}>{profileCopy.smsTitle}</Text>
        <Text style={styles.support}>{`Код отправлен на номер ${formatKzPhone(pending)}`}</Text>

        <View style={styles.cells}>
          {cells.map((ch, i) => (
            <View key={i} style={styles.cell}>
              <Text style={styles.cellText}>{ch}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.resend}>{profileCopy.smsResend}</Text>

        <View style={styles.keypad}>
          <NumericKeypad
            onDigit={(d) => setSms(`${sms}${d}`)}
            onDelete={() => setSms(sms.slice(0, -1))}
            leftSlot="empty"
          />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.background },
  back: { marginLeft: legacySpace.screenX, marginTop: 20, width: 24, height: 24 },
  title: {
    ...legacyType.title,
    color: legacyColor.textPrimary,
    marginTop: 20,
    marginHorizontal: legacySpace.screenX,
  },
  support: {
    ...legacyType.field,
    color: legacyColor.textSecondary,
    marginTop: 16,
    marginHorizontal: legacySpace.screenX,
  },
  cells: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  cell: {
    width: 40,
    height: 49,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: legacyColor.primaryDisabledText,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: legacyColor.surface,
  },
  cellText: { ...legacyType.field, color: legacyColor.textPrimary },
  resend: {
    ...legacyType.caption,
    color: legacyColor.textTertiary,
    textAlign: 'center',
    marginTop: 160,
  },
  keypad: { marginTop: 'auto' },
});
