import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { historyCopy } from '@/features/legacyHistory/copy';
import { FILTER_ACCOUNTS, FILTER_OP_TYPES, HISTORY_BRIDGES, PERIOD_CHIPS } from '@/features/legacyHistory/mockData';
import { type FilterOpType, type FilterPeriod, useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function FilterScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.historyFilter);
  const draftOpType = useLegacyHistoryStore((s) => s.draftOpType);
  const draftAccountId = useLegacyHistoryStore((s) => s.draftAccountId);
  const draftPeriod = useLegacyHistoryStore((s) => s.draftPeriod);
  const setDraftOpType = useLegacyHistoryStore((s) => s.setDraftOpType);
  const setDraftAccountId = useLegacyHistoryStore((s) => s.setDraftAccountId);
  const setDraftPeriod = useLegacyHistoryStore((s) => s.setDraftPeriod);
  const applyFilter = useLegacyHistoryStore((s) => s.applyFilter);
  const resetFilter = useLegacyHistoryStore((s) => s.resetFilter);

  useScreenMeta({
    screenName: 'Legacy History filter',
    route: HISTORY_BRIDGES.filter,
    taskId: 'RECON-007',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-113',
    legacyNodeId: '925:24765',
  });

  const onApply = () => {
    applyFilter();
    onBack();
  };

  return (
    <DebugMetaHost route={HISTORY_BRIDGES.filter}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" onPress={onBack} hitSlop={12}>
            <Text style={styles.back}>‹</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{historyCopy.filterTitle}</Text>

          <Text style={styles.section}>{historyCopy.periodLabel}</Text>
          <View style={styles.wrap}>
            {PERIOD_CHIPS.map((chip) => {
              const active = draftPeriod === chip.id;
              return (
                <Chip
                  key={chip.id}
                  label={chip.label}
                  active={active}
                  onPress={() => setDraftPeriod(chip.id as FilterPeriod)}
                />
              );
            })}
          </View>

          <Text style={styles.section}>{historyCopy.opTypeLabel}</Text>
          <View style={styles.wrap}>
            {FILTER_OP_TYPES.map((item) => (
              <Chip
                key={item.id}
                label={item.label}
                active={draftOpType === item.id}
                onPress={() => setDraftOpType(item.id as FilterOpType)}
              />
            ))}
          </View>

          <Text style={styles.section}>{historyCopy.accountLabel}</Text>
          <View style={styles.wrap}>
            {FILTER_ACCOUNTS.map((item) => (
              <Chip
                key={item.id}
                label={item.label}
                active={draftAccountId === item.id}
                onPress={() => setDraftAccountId(item.id)}
              />
            ))}
          </View>

          <Pressable accessibilityRole="button" onPress={resetFilter} style={styles.reset}>
            <Text style={styles.resetLabel}>{historyCopy.resetFilter}</Text>
          </Pressable>
        </ScrollView>

        <Pressable accessibilityRole="button" onPress={onApply} style={styles.cta}>
          <Text style={styles.ctaLabel}>{historyCopy.apply}</Text>
        </Pressable>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  header: { paddingHorizontal: legacySpace.screenX, paddingTop: 8 },
  back: { fontSize: 28, color: legacyColor.primary, lineHeight: 32 },
  content: { paddingHorizontal: legacySpace.screenX, paddingBottom: 24 },
  title: { ...legacyType.title, color: legacyColor.textPrimary, marginTop: 8 },
  section: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: legacyColor.historyLabel,
  },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: {
    backgroundColor: legacyColor.surface,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#1226AA',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  chipActive: { backgroundColor: legacyColor.primary },
  chipLabel: { ...legacyType.caption, color: legacyColor.textSecondary },
  chipLabelActive: { color: legacyColor.primaryOnPrimary },
  reset: { marginTop: 32, alignItems: 'center' },
  resetLabel: { ...legacyType.caption, color: legacyColor.primary },
  cta: {
    marginHorizontal: legacySpace.screenX,
    marginBottom: 16,
    height: 50,
    borderRadius: legacyRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: legacyColor.primary,
  },
  ctaLabel: { ...legacyType.cta, color: legacyColor.primaryOnPrimary },
});
