import { Alert, Pressable, StyleSheet, Text, View , ViewStyle, TextStyle} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph, CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import { WITHDRAW_BRIDGES } from '@/features/legacyWithdraw/mockData';
import {
  CardMethodGlyph,
  CashMethodGlyph,
  OtherMethodGlyph,
  PhoneMethodGlyph,
} from '@/features/legacyWithdraw/WithdrawIcons';
import { WithdrawMethodRow } from '@/features/legacyWithdraw/WithdrawMethodRow';
import { useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function MethodSelectContent({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const setMethod = useLegacyWithdrawStore((s) => s.setMethod);
  const acknowledgeOther = useLegacyWithdrawStore((s) => s.acknowledgeOther);

  const go = (path: string) => {
    onClose?.();
    router.push(path as never);
  };

  return (
    <View style={styles.sheet}>
      <View style={styles.head}>
        <Text style={styles.title}>{withdrawCopy.methodTitle}</Text>
        {onClose ? (
          <Pressable accessibilityRole="button" onPress={onClose} style={styles.closeHit}>
            <CloseGlyph />
          </Pressable>
        ) : null}
      </View>
      <WithdrawMethodRow
        label={withdrawCopy.card}
        icon={<CardMethodGlyph />}
        onPress={() => {
          setMethod('card');
          go(WITHDRAW_BRIDGES.card);
        }}
      />
      <WithdrawMethodRow
        label={withdrawCopy.phone}
        icon={<PhoneMethodGlyph />}
        onPress={() => {
          setMethod('phone');
          go(WITHDRAW_BRIDGES.phone);
        }}
      />
      <WithdrawMethodRow
        label={withdrawCopy.cash}
        icon={<CashMethodGlyph />}
        onPress={() => {
          setMethod('cash');
          go(WITHDRAW_BRIDGES.cash);
        }}
      />
      <WithdrawMethodRow
        label={withdrawCopy.other}
        icon={<OtherMethodGlyph />}
        onPress={() => {
          setMethod('other');
          acknowledgeOther();
          Alert.alert(withdrawCopy.other, withdrawCopy.otherBody);
        }}
      />
    </View>
  );
}

export function MethodSelectScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.withdraw);
  useScreenMeta({
    screenName: 'Legacy Withdraw methods',
    route: WITHDRAW_BRIDGES.root,
    taskId: 'RECON-006',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-041',
    legacyNodeId: '804:23390',
  });

  return (
    <DebugMetaHost route={WITHDRAW_BRIDGES.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <View style={styles.fill}>
          <MethodSelectContent onClose={onBack} />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.overlay } as ViewStyle,
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' } as ViewStyle,
  fill: { flex: 1, justifyContent: 'flex-end' } as ViewStyle,
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 36,
    gap: 10,
    alignItems: 'center',
    zIndex: 1,
  } as ViewStyle,
  head: {
    width: 345,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  } as ViewStyle,
  title: { ...legacyType.homeSection, color: legacyColor.textPrimary } as TextStyle,
  closeHit: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' } as ViewStyle,
});
