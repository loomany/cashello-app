import { Pressable, ScrollView, StyleSheet, Text, View , ViewStyle, TextStyle} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { topupCopy } from '@/features/legacyTopup/copy';
import { CASH_DESKS, TOPUP_BRIDGES } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function CashMapScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.topupCashMap);
  const selectedDeskId = useLegacyTopupStore((s) => s.selectedDeskId);
  const selectDesk = useLegacyTopupStore((s) => s.selectDesk);
  const confirmCashDesk = useLegacyTopupStore((s) => s.confirmCashDesk);
  const desk = CASH_DESKS.find((row) => row.id === selectedDeskId);
  const detail = Boolean(desk);

  useScreenMeta({
    screenName: 'Legacy Cash map',
    route: TOPUP_BRIDGES.cashMap,
    taskId: 'RECON-005',
    prototypeStatus: 'in_progress',
    screenId: detail ? 'LGC-SCR-081' : 'LGC-SCR-080',
    legacyNodeId: detail ? '821:30532' : '821:30474',
  });

  return (
    <DebugMetaHost route={TOPUP_BRIDGES.cashMap}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <View style={styles.mapMock}>
          <View style={styles.chips}>
            <Chip label={topupCopy.open} />
            <Chip label={topupCopy.nearby} />
            <Chip label={topupCopy.roundClock} />
          </View>
          <Text style={styles.mapHint}>MOCK MAP · NO GEOLOCATION</Text>
        </View>
        <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
          {(detail ? [desk!] : CASH_DESKS).map((row) => (
            <Pressable
              key={row.id}
              accessibilityRole="button"
              onPress={() => selectDesk(row.id)}
              style={[styles.desk, selectedDeskId === row.id && styles.deskOn]}
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
            accessibilityLabel={topupCopy.choose}
            disabled={!selectedDeskId}
            onPress={() => {
              confirmCashDesk();
              onBack();
            }}
            style={[styles.cta, selectedDeskId ? styles.ctaOn : styles.ctaOff]}
          >
            <Text style={[styles.ctaLabel, !selectedDeskId && styles.ctaLabelOff]}>{topupCopy.choose}</Text>
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
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground } as ViewStyle,
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' } as ViewStyle,
  mapMock: {
    height: 220,
    marginHorizontal: legacySpace.screenX,
    borderRadius: 12,
    backgroundColor: '#D9E2EC',
    padding: 12,
  } as ViewStyle,
  chips: { flexDirection: 'row', gap: 8 } as ViewStyle,
  chip: { backgroundColor: legacyColor.surface, borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 } as ViewStyle,
  chipLabel: { fontSize: 12, color: legacyColor.textPrimary } as TextStyle,
  mapHint: { marginTop: 48, textAlign: 'center', color: legacyColor.textSecondary, fontSize: 12 } as TextStyle,
  list: { flex: 1, marginTop: 12 } as ViewStyle,
  listContent: { paddingHorizontal: legacySpace.screenX, paddingBottom: 16, gap: 10 } as ViewStyle,
  desk: {
    backgroundColor: legacyColor.surface,
    borderRadius: 12,
    padding: 15,
  } as ViewStyle,
  deskOn: { borderWidth: 1, borderColor: legacyColor.primary } as ViewStyle,
  deskTitle: { ...legacyType.field, color: legacyColor.textPrimary } as TextStyle,
  deskMeta: { ...legacyType.body, color: legacyColor.primary, marginTop: 4 } as TextStyle,
  deskAddr: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 2 } as TextStyle,
  footer: { paddingHorizontal: 15, paddingBottom: 24 } as ViewStyle,
  cta: { height: 70, borderRadius: 12, alignItems: 'center', justifyContent: 'center' } as ViewStyle,
  ctaOn: { backgroundColor: legacyColor.primary } as ViewStyle,
  ctaOff: { backgroundColor: legacyColor.primaryDisabled } as ViewStyle,
  ctaLabel: { ...legacyType.cta, color: legacyColor.primaryOnPrimary } as TextStyle,
  ctaLabelOff: { color: legacyColor.primaryDisabledText } as TextStyle,
});
