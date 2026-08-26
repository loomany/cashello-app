import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySize, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { AccessCheckGlyph } from '@/features/legacyCard/CardIcons';
import { cardCopy } from '@/features/legacyCard/copy';
import { CARD_BRIDGES, LIMIT_PRESETS, remainderCopy } from '@/features/legacyCard/mockData';
import { useLegacyCardStore } from '@/features/legacyCard/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function LimitsScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.cardLimits);
  const limitCap = useLegacyCardStore((s) => s.limitCap);
  const limitRemaining = useLegacyCardStore((s) => s.limitRemaining);
  const limitSheetOpen = useLegacyCardStore((s) => s.limitSheetOpen);
  const limitDraft = useLegacyCardStore((s) => s.limitDraft);
  const openLimitSheet = useLegacyCardStore((s) => s.openLimitSheet);
  const closeLimitSheet = useLegacyCardStore((s) => s.closeLimitSheet);
  const setLimitDraft = useLegacyCardStore((s) => s.setLimitDraft);
  const applyLimit = useLegacyCardStore((s) => s.applyLimit);

  useScreenMeta({
    screenName: 'Legacy Card Limits',
    route: CARD_BRIDGES.limits,
    taskId: 'RECON-004',
    prototypeStatus: 'in_progress',
    screenId: limitSheetOpen ? 'LGC-SCR-039' : 'LGC-SCR-038',
    legacyNodeId: limitSheetOpen ? '821:29193' : '648:20425',
  });

  const fill = limitCap && limitCap > 0 ? Math.min(1, limitRemaining / limitCap) : 0;

  return (
    <DebugMetaHost route={CARD_BRIDGES.limits}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <Text style={styles.title}>{cardCopy.limits}</Text>

        <View style={styles.access}>
          <AccessCheckGlyph />
          <View style={styles.accessText}>
            <Text style={styles.accessTitle}>{cardCopy.accessOpen}</Text>
            <Text style={styles.accessSupport}>{cardCopy.accessSupport}</Text>
          </View>
        </View>

        <View style={styles.limitCard}>
          <Text style={styles.month}>{cardCopy.monthLimits}</Text>
          <Text style={styles.remainder}>{remainderCopy(limitRemaining, limitCap)}</Text>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${fill * 100}%` }]} />
          </View>
          <Text style={styles.channel}>{cardCopy.internetPay}</Text>
        </View>

        <View style={styles.footer}>
          <Pressable accessibilityRole="button" onPress={openLimitSheet} style={styles.cta}>
            <Text style={styles.ctaLabel}>{cardCopy.changeLimit}</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <Modal animationType="fade" transparent visible={limitSheetOpen} onRequestClose={closeLimitSheet}>
        <View style={styles.sheetRoot}>
          <Pressable style={styles.overlayFlex} onPress={closeLimitSheet} />
          <View style={styles.sheet}>
            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>{cardCopy.limitAmount}</Text>
              <Pressable accessibilityRole="button" onPress={closeLimitSheet} style={styles.closeHit}>
                <Text style={styles.closeX}>×</Text>
              </Pressable>
            </View>
            <View style={styles.grid}>
              {LIMIT_PRESETS.map((preset) => {
                const selected = limitDraft === preset.value;
                return (
                  <Pressable
                    key={preset.id}
                    accessibilityRole="button"
                    onPress={() => setLimitDraft(preset.value)}
                    style={[styles.chip, selected && styles.chipSelected]}
                  >
                    <Text style={[styles.chipLabel, selected && styles.chipLabelSelected]}>{preset.label}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable accessibilityRole="button" onPress={applyLimit} style={styles.cta}>
              <Text style={styles.ctaLabel}>{cardCopy.done}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' },
  title: { ...legacyType.title, color: legacyColor.textPrimary, paddingHorizontal: legacySpace.screenX, marginTop: 4 },
  access: {
    marginTop: 20,
    marginHorizontal: legacySpace.screenX,
    backgroundColor: legacyColor.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: legacyColor.cardGroupBorder,
    paddingHorizontal: 15,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accessText: { flex: 1 },
  accessTitle: { ...legacyType.field, color: legacyColor.textPrimary },
  accessSupport: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 2 },
  limitCard: {
    marginTop: 12,
    marginHorizontal: legacySpace.screenX,
    backgroundColor: legacyColor.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: legacyColor.cardGroupBorder,
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  month: { fontSize: 16, lineHeight: 21, fontWeight: '700', color: legacyColor.textPrimary },
  remainder: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 8 },
  track: {
    marginTop: 14,
    height: 5,
    borderRadius: 4,
    backgroundColor: legacyColor.limitTrack,
    overflow: 'hidden',
  },
  fill: { height: 5, backgroundColor: legacyColor.primary, borderRadius: 4 },
  channel: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 10 },
  footer: { marginTop: 'auto', paddingHorizontal: legacySpace.screenX, paddingBottom: 24 },
  cta: {
    height: legacySize.ctaHeight,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: { ...legacyType.cta, color: legacyColor.primaryOnPrimary },
  sheetRoot: { flex: 1, justifyContent: 'flex-end' },
  overlayFlex: { ...StyleSheet.absoluteFill, backgroundColor: legacyColor.overlay, zIndex: 0 },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 28,
    zIndex: 1,
  },
  sheetHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  sheetTitle: { ...legacyType.homeSection, color: legacyColor.textPrimary },
  closeHit: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  closeX: { fontSize: 28, color: legacyColor.textPrimary, lineHeight: 28 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  chip: {
    width: 165,
    height: 60,
    borderRadius: 10,
    backgroundColor: legacyColor.homeBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: { backgroundColor: legacyColor.primary },
  chipLabel: { ...legacyType.field, color: legacyColor.textPrimary },
  chipLabelSelected: { color: legacyColor.primaryOnPrimary },
});
