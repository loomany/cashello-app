import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import { WITHDRAW_BRIDGES } from '@/features/legacyWithdraw/mockData';
import { SearchPinGlyph } from '@/features/legacyWithdraw/WithdrawIcons';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function CashWithdrawScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.withdrawCash);
  useScreenMeta({
    screenName: 'Legacy Withdraw cash desk',
    route: WITHDRAW_BRIDGES.cash,
    taskId: 'RECON-006',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-105',
    legacyNodeId: '648:17478',
  });

  return (
    <DebugMetaHost route={WITHDRAW_BRIDGES.cash}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <Text style={styles.title}>{withdrawCopy.chooseKassa}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(WITHDRAW_BRIDGES.cashMap as never)}
          style={styles.search}
        >
          <TextInput
            editable={false}
            pointerEvents="none"
            placeholder={withdrawCopy.searchAddress}
            placeholderTextColor={legacyColor.textTertiary}
            style={styles.searchInput}
          />
          <SearchPinGlyph />
        </Pressable>
        <Text style={styles.section}>{withdrawCopy.addresses}</Text>
        <Text style={styles.empty}>{withdrawCopy.savedAddresses}</Text>
        <View style={styles.footer}>
          <Pressable accessibilityRole="button" disabled style={styles.cta}>
            <Text style={styles.ctaLabel}>{withdrawCopy.choose}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground, paddingHorizontal: legacySpace.screenX },
  back: { paddingTop: 8, height: 40, justifyContent: 'center' },
  title: { ...legacyType.title, color: legacyColor.textPrimary, marginBottom: 16 },
  search: {
    height: 70,
    borderRadius: 12,
    backgroundColor: legacyColor.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  searchInput: { flex: 1, ...legacyType.field, color: legacyColor.textPrimary },
  section: { ...legacyType.field, color: legacyColor.textPrimary, marginTop: 24 },
  empty: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 8 },
  footer: { marginTop: 'auto', paddingBottom: 24 },
  cta: {
    height: 70,
    borderRadius: 12,
    backgroundColor: legacyColor.primaryDisabled,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: { ...legacyType.cta, color: legacyColor.primaryDisabledText },
});
