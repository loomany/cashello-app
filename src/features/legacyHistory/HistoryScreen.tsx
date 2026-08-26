import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Rect } from 'react-native-svg';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { historyCopy } from '@/features/legacyHistory/copy';
import {
  formatHistoryDateLabel,
  formatHistoryDayHeader,
  opDayKey,
} from '@/features/legacyHistory/dateUtils';
import { HistoryActionSheet } from '@/features/legacyHistory/HistoryActionSheet';
import { HistoryDateSheet } from '@/features/legacyHistory/HistoryDateSheet';
import { HistoryRow } from '@/features/legacyHistory/HistoryRow';
import { HISTORY_BRIDGES, type LegacyHistoryOp } from '@/features/legacyHistory/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { CashhelloBrand, ProfileBonusHeader } from '@/features/legacyHome/HomeIcons';
import { homeCopy } from '@/features/legacyHome/copy';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { homeHref, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

function groupByDay(ops: LegacyHistoryOp[]): { day: string; items: LegacyHistoryOp[] }[] {
  const map = new Map<string, LegacyHistoryOp[]>();
  for (const op of ops) {
    const day = opDayKey(op.createdAt);
    const bucket = map.get(day);
    if (bucket) bucket.push(op);
    else map.set(day, [op]);
  }
  return [...map.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([day, items]) => ({
      day,
      items: [...items].sort((a, b) => (a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0)),
    }));
}

export function HistoryScreen() {
  const router = useRouter();
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [actionOp, setActionOp] = useState<LegacyHistoryOp | null>(null);
  const dateFrom = useLegacyHistoryStore((s) => s.dateFrom);
  const dateTo = useLegacyHistoryStore((s) => s.dateTo);
  const setDateRange = useLegacyHistoryStore((s) => s.setDateRange);
  const filtered = useLegacyHistoryStore((s) => s.filtered);
  const rows = filtered();
  const dayGroups = useMemo(() => groupByDay(rows), [rows]);
  const dateLabel = formatHistoryDateLabel(dateFrom, dateTo);
  const hasDates = Boolean(dateFrom || dateTo);

  useScreenMeta({
    screenName: 'Legacy History',
    route: HISTORY_BRIDGES.root,
    taskId: 'RECON-007',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-111',
    legacyNodeId: '980:26609',
  });

  const go = (href: string) => () => router.push(href as never);

  const closeActionSheet = () => setActionOp(null);

  const onRepeat = () => {
    const href = actionOp?.repeatHref;
    closeActionSheet();
    if (isGuest) {
      router.push(HOME_BRIDGES.login as never);
      return;
    }
    if (href) router.push(href as never);
  };

  const onShareReceipt = () => {
    const id = actionOp?.id;
    closeActionSheet();
    if (isGuest) {
      router.push(HOME_BRIDGES.login as never);
      return;
    }
    if (id) router.push(HISTORY_BRIDGES.detail(id) as never);
  };

  return (
    <DebugMetaHost
      route={HISTORY_BRIDGES.root}
      extra={
        <View style={styles.jumps}>
          <Jump label="WD-003 card" onPress={() => router.push(HISTORY_BRIDGES.detail('wd-card') as never)} />
          <Jump label="WD-005 phone" onPress={() => router.push(HISTORY_BRIDGES.detail('wd-phone') as never)} />
          <Jump label="Filter sheet" onPress={() => router.push(HISTORY_BRIDGES.filter as never)} />
        </View>
      }
    >
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <CashhelloBrand onPress={() => router.replace(homeHref(isGuest) as never)} />
          <View style={styles.headerActions}>
            <ProfileBonusHeader
              amount={homeCopy.headerBonus}
              onProfilePress={go(profileHref(isGuest))}
            />
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.sectionHead}>
            <Text style={styles.section}>{historyCopy.title}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={dateLabel}
              onPress={() => setCalendarOpen(true)}
              style={[styles.dateTrigger, hasDates && styles.dateTriggerActive]}
            >
              <CalendarGlyph active={hasDates} />
              <Text style={[styles.dateTriggerLabel, hasDates && styles.dateTriggerLabelActive]} numberOfLines={1}>
                {dateLabel}
              </Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            {rows.length === 0 ? (
              <Text style={styles.empty}>{historyCopy.empty}</Text>
            ) : (
              dayGroups.map((group) => (
                <View key={group.day} style={styles.dayGroup}>
                  <Text style={styles.dayHeader}>{formatHistoryDayHeader(group.day)}</Text>
                  {group.items.map((op) => {
                    const isDebit = op.direction === 'out' || Boolean(op.showMinus);
                    return (
                      <HistoryRow
                        key={op.id}
                        op={op}
                        onPress={isDebit ? () => setActionOp(op) : undefined}
                      />
                    );
                  })}
                </View>
              ))
            )}
          </View>
        </ScrollView>

        <LegacyTabBar active="history" />
      </SafeAreaView>

      <HistoryDateSheet
        visible={calendarOpen}
        initialFrom={dateFrom}
        initialTo={dateTo}
        onClose={() => setCalendarOpen(false)}
        onApply={(from, to) => {
          setDateRange(from, to);
          setCalendarOpen(false);
        }}
      />

      <HistoryActionSheet
        visible={Boolean(actionOp)}
        op={actionOp}
        onClose={closeActionSheet}
        onRepeat={onRepeat}
        onShareReceipt={onShareReceipt}
      />
    </DebugMetaHost>
  );
}

function CalendarGlyph({ active }: { active: boolean }) {
  const stroke = active ? legacyColor.primaryOnPrimary : legacyColor.primary;
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16">
      <Rect x={2} y={3.2} width={12} height={10.3} rx={2} stroke={stroke} strokeWidth={1.4} fill="none" />
      <Path d="M2 6.5H14" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M5.2 2.2V4.2" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
      <Path d="M10.8 2.2V4.2" stroke={stroke} strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

function Jump({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.jump}>
      <Text style={styles.jumpLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 18,
    minHeight: 36,
    backgroundColor: legacyColor.homeBackground,
  },
  headerActions: { flexDirection: 'row', gap: 15 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: legacySpace.screenX, paddingTop: 15, paddingBottom: 40 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  section: { ...legacyType.homeSection, color: legacyColor.textPrimary, flexShrink: 0 },
  dateTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    maxWidth: '62%',
    minHeight: 34,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.surface,
  },
  dateTriggerActive: {
    backgroundColor: legacyColor.primary,
    borderColor: legacyColor.primary,
  },
  dateTriggerLabel: {
    ...legacyType.caption,
    color: legacyColor.primary,
    flexShrink: 1,
  },
  dateTriggerLabelActive: {
    color: legacyColor.primaryOnPrimary,
  },
  card: {
    borderTopWidth: 1,
    borderTopColor: legacyColor.border,
    marginHorizontal: -legacySpace.screenX,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 12,
    paddingBottom: 8,
  },
  dayGroup: {
    marginBottom: 8,
  },
  dayHeader: {
    ...legacyType.caption,
    color: legacyColor.textTertiary,
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  empty: { ...legacyType.body, color: legacyColor.textSecondary, textAlign: 'center', paddingVertical: 24 },
  jumps: { gap: 8 },
  jump: {
    backgroundColor: legacyColor.accountIconBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: legacyColor.border,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  jumpLabel: { ...legacyType.caption, color: legacyColor.primary },
});
