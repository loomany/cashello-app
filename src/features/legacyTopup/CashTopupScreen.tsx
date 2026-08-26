import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { topupCopy } from '@/features/legacyTopup/copy';
import { TOPUP_BRIDGES } from '@/features/legacyTopup/mockData';
import { SearchPinGlyph } from '@/features/legacyTopup/TopupIcons';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function CashTopupScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.topupCash);
  useScreenMeta({
    screenName: 'Legacy Cash desk picker',
    route: TOPUP_BRIDGES.cash,
    taskId: 'RECON-005',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-074',
    legacyNodeId: '648:17510',
  });

  return (
    <DebugMetaHost route={TOPUP_BRIDGES.cash}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <Text style={styles.title}>{topupCopy.chooseKassa}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(TOPUP_BRIDGES.cashMap as never)}
          style={styles.search}
        >
          <TextInput editable={false} pointerEvents="none" placeholder={topupCopy.searchAddress} placeholderTextColor={legacyColor.textTertiary} style={styles.searchInput} />
          <SearchPinGlyph />
        </Pressable>
        <Text style={styles.section}>{topupCopy.addresses}</Text>
        <Text style={styles.empty}>{topupCopy.savedAddresses}</Text>
        <View style={styles.footer}>
          <Pressable accessibilityRole="button" disabled style={styles.cta}>
            <Text style={styles.ctaLabel}>{topupCopy.choose}</Text>
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
