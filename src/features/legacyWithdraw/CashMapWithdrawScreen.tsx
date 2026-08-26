import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import { CASH_DESKS, WITHDRAW_BRIDGES } from '@/features/legacyWithdraw/mockData';
import { useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function CashMapWithdrawScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.withdrawCashMap);
  const deskId = useLegacyWithdrawStore((s) => s.deskId);
  const setDeskId = useLegacyWithdrawStore((s) => s.setDeskId);
  const setMethod = useLegacyWithdrawStore((s) => s.setMethod);
  const desk = CASH_DESKS.find((row) => row.id === deskId);
  const detail = Boolean(desk);

  useScreenMeta({
    screenName: 'Legacy Withdraw cash map',
    route: WITHDRAW_BRIDGES.cashMap,
    taskId: 'RECON-006',
    prototypeStatus: 'in_progress',
    screenId: detail ? 'LGC-SCR-108' : 'LGC-SCR-106',
    legacyNodeId: detail ? '648:18091' : '648:17787',
  });

  return (
    <DebugMetaHost route={WITHDRAW_BRIDGES.cashMap}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <View style={styles.mapMock}>
          <View style={styles.chips}>
            <Chip label={withdrawCopy.open} />
            <Chip label={withdrawCopy.nearby} />
            <Chip label={withdrawCopy.roundClock} />
          </View>
          <Text style={styles.mapHint}>MOCK MAP · NO GEOLOCATION</Text>
        </View>
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {(detail ? [desk!] : CASH_DESKS).map((row) => (
            <Pressable
              key={row.id}
              accessibilityRole="button"
              onPress={() => setDeskId(row.id)}
              style={[styles.desk, deskId === row.id && styles.deskOn]}
            >
              <Text style={styles.deskTitle}>{row.title}</Text>
              <Text style={styles.deskMeta}>
                {row.distance} · {row.hours}
              </Text>
              <Text style={styles.deskAddr}>{row.address}</Text>
              {detail && row.phones ? <Text style={styles.deskAddr}>{row.phones.join(', ')}</Text> : null}
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={withdrawCopy.choose}
            disabled={!deskId}
            onPress={() => {
              setMethod('cash');
              router.push(WITHDRAW_BRIDGES.amount as never);
            }}
            style={[styles.cta, deskId ? styles.ctaOn : styles.ctaOff]}
          >
            <Text style={[styles.ctaLabel, !deskId && styles.ctaLabelOff]}>{withdrawCopy.choose}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.chipLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' },
  mapMock: {
    height: 220,
    marginHorizontal: legacySpace.screenX,
    borderRadius: 12,
    backgroundColor: '#D9E2EC',
    padding: 12,
  },
  chips: { flexDirection: 'row', gap: 8 },
  chip: { backgroundColor: legacyColor.surface, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  chipLabel: { fontSize: 12, color: legacyColor.textPrimary },
  mapHint: { marginTop: 48, textAlign: 'center', color: legacyColor.textSecondary, fontSize: 12 },
  list: { flex: 1, marginTop: 12 },
  listContent: { paddingHorizontal: legacySpace.screenX, paddingBottom: 16, gap: 10 },
  desk: {
    backgroundColor: legacyColor.surface,
    borderRadius: 12,
    padding: 15,
  },
  deskOn: { borderWidth: 1, borderColor: legacyColor.primary },
  deskTitle: { ...legacyType.field, color: legacyColor.textPrimary },
  deskMeta: { ...legacyType.body, color: legacyColor.primary, marginTop: 4 },
  deskAddr: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 2 },
  footer: { paddingHorizontal: 15, paddingBottom: 24 },
  cta: { height: 70, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  ctaOn: { backgroundColor: legacyColor.primary },
  ctaOff: { backgroundColor: legacyColor.primaryDisabled },
  ctaLabel: { ...legacyType.cta, color: legacyColor.primaryOnPrimary },
  ctaLabelOff: { color: legacyColor.primaryDisabledText },
});
