import { useEffect, useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyFontFamily, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { historyCopy } from '@/features/legacyHistory/copy';
import {
  WEEKDAYS_RU,
  buildMonthGrid,
  dayInRange,
  monthTitle,
  normalizeRange,
  shiftMonth,
} from '@/features/legacyHistory/dateUtils';

type Props = {
  visible: boolean;
  initialFrom: string | null;
  initialTo: string | null;
  onClose: () => void;
  onApply: (from: string | null, to: string | null) => void;
};

/**
 * Calendar sheet: 1 tap = one day, 2 taps = from–to range.
 * In-tree (not RN Modal) so it stays inside WebViewportShell phone frame.
 */
export function HistoryDateSheet({ visible, initialFrom, initialTo, onClose, onApply }: Props) {
  const insets = useSafeAreaInsets();
  const seed = initialFrom ?? initialTo ?? new Date().toISOString().slice(0, 10);
  const seedDate = new Date(`${seed}T12:00:00`);

  const [year, setYear] = useState(seedDate.getFullYear());
  const [monthIndex, setMonthIndex] = useState(seedDate.getMonth());
  const [from, setFrom] = useState<string | null>(initialFrom);
  const [to, setTo] = useState<string | null>(initialTo);

  useEffect(() => {
    if (!visible) return;
    const nextSeed = initialFrom ?? initialTo ?? new Date().toISOString().slice(0, 10);
    const d = new Date(`${nextSeed}T12:00:00`);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync picker when sheet opens
    setYear(d.getFullYear());
    setMonthIndex(d.getMonth());
    setFrom(initialFrom);
    setTo(initialTo);
  }, [visible, initialFrom, initialTo]);

  const cells = useMemo(() => buildMonthGrid(year, monthIndex), [year, monthIndex]);

  if (!visible) {
    return null;
  }

  const goMonth = (delta: number) => {
    const next = shiftMonth(year, monthIndex, delta);
    setYear(next.year);
    setMonthIndex(next.monthIndex);
  };

  const onSelectDay = (day: string) => {
    // Empty or already a multi-day range → start a new single day.
    if (!from || (to && from !== to)) {
      setFrom(day);
      setTo(day);
      return;
    }
    // Have a single day: same day keeps it; other day opens a range.
    if (day === from) {
      return;
    }
    const range = normalizeRange(from, day);
    setFrom(range.from);
    setTo(range.to);
  };

  const canApply = Boolean(from);
  const isRange = Boolean(from && to && from !== to);
  const hint = !from
    ? historyCopy.calendarHintPick
    : isRange
      ? historyCopy.calendarHintRangeReady
      : historyCopy.calendarHintSingleReady;

  return (
    <View pointerEvents="box-none" style={styles.root}>
      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Закрыть"
        style={styles.overlayHit}
      >
        <BlurView intensity={18} tint="light" style={styles.blur}>
          <View style={styles.dim} />
        </BlurView>
      </Pressable>

      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <View style={styles.handle} />
        <View style={styles.head}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Закрыть"
            onPress={onClose}
            style={styles.closeHit}
            hitSlop={8}
          >
            <CloseGlyph />
          </Pressable>
        </View>

        <View style={styles.monthNav}>
          <Pressable accessibilityRole="button" accessibilityLabel="Предыдущий месяц" onPress={() => goMonth(-1)} hitSlop={10}>
            <Text style={styles.navArrow}>‹</Text>
          </Pressable>
          <Text style={styles.monthLabel}>{monthTitle(year, monthIndex)}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Следующий месяц" onPress={() => goMonth(1)} hitSlop={10}>
            <Text style={styles.navArrow}>›</Text>
          </Pressable>
        </View>

        <View style={styles.weekRow}>
          {WEEKDAYS_RU.map((d) => (
            <Text key={d} style={styles.weekday}>
              {d}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {cells.map((day, index) => {
            if (!day) {
              return <View key={`pad-${index}`} style={styles.dayCell} />;
            }
            const isStart = from === day;
            const isEnd = (to ?? from) === day && Boolean(from);
            const inMiddle = Boolean(from && to && dayInRange(day, from, to) && !isStart && !isEnd);
            const selected = isStart || isEnd;
            return (
              <Pressable
                key={day}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => onSelectDay(day)}
                style={[
                  styles.dayCell,
                  inMiddle && styles.dayInRange,
                  selected && styles.daySelected,
                  isStart && isRange && styles.dayRangeStart,
                  isEnd && isRange && styles.dayRangeEnd,
                ]}
              >
                <Text style={[styles.dayLabel, selected && styles.dayLabelSelected, inMiddle && styles.dayLabelInRange]}>
                  {Number(day.slice(8, 10))}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.hint}>{hint}</Text>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setFrom(null);
              setTo(null);
              onApply(null, null);
            }}
            style={styles.secondaryBtn}
          >
            <Text style={styles.secondaryLabel}>{historyCopy.calendarReset}</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={!canApply}
            onPress={() => {
              if (!from) return;
              const end = to ?? from;
              const range = normalizeRange(from, end);
              onApply(range.from, range.to);
            }}
            style={[styles.primaryBtn, !canApply && styles.primaryDisabled]}
          >
            <Text style={[styles.primaryLabel, !canApply && styles.primaryLabelDisabled]}>
              {historyCopy.apply}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 40,
  },
  overlayHit: {
    ...StyleSheet.absoluteFill,
  },
  blur: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Platform.OS === 'web' ? 'rgba(5, 10, 38, 0.22)' : 'rgba(5, 10, 38, 0.18)',
  },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 10,
    zIndex: 1,
    borderTopWidth: 1,
    borderColor: legacyColor.border,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.border,
    marginBottom: 12,
  },
  head: {
    height: 32,
    marginBottom: 8,
  },
  closeHit: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: legacyColor.homeBackground,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  navArrow: {
    fontSize: 28,
    lineHeight: 32,
    color: legacyColor.primary,
    width: 32,
    textAlign: 'center',
    fontFamily: legacyFontFamily,
  },
  monthLabel: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    color: legacyColor.textTertiary,
    fontFamily: legacyFontFamily,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.2857%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  dayInRange: {
    backgroundColor: legacyColor.accountIconBg,
    borderRadius: 0,
  },
  daySelected: {
    backgroundColor: legacyColor.primary,
    borderRadius: 10,
  },
  dayRangeStart: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  dayRangeEnd: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  dayLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  dayLabelSelected: {
    color: legacyColor.primaryOnPrimary,
    fontWeight: '600',
  },
  dayLabelInRange: {
    color: legacyColor.primary,
  },
  hint: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    height: 48,
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabel: {
    ...legacyType.cta,
    color: legacyColor.textPrimary,
  },
  primaryBtn: {
    flex: 1.2,
    height: 48,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryDisabled: {
    backgroundColor: legacyColor.primaryDisabled,
  },
  primaryLabel: {
    ...legacyType.cta,
    color: legacyColor.primaryOnPrimary,
  },
  primaryLabelDisabled: {
    color: legacyColor.primaryDisabledText,
  },
});
