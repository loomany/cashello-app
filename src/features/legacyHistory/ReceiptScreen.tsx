import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Rect } from 'react-native-svg';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { historyCopy } from '@/features/legacyHistory/copy';
import { detailStatusFor, formatHistoryAmount, HISTORY_BRIDGES } from '@/features/legacyHistory/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function ReceiptScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const onBack = useLegacyBack(
    id ? LEGACY_BACK_FALLBACKS.receipt(id) : LEGACY_BACK_FALLBACKS.historyDetail,
  );
  const op = useLegacyHistoryStore((s) => s.getById(id ?? ''));

  useScreenMeta({
    screenName: 'Legacy Receipt',
    route: HISTORY_BRIDGES.receipt(id ?? ''),
    taskId: 'RECON-007',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-120',
    legacyNodeId: '933:25268',
  });

  if (!op) {
    return (
      <SafeAreaView style={styles.safe}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace(HISTORY_BRIDGES.root as never)}
        >
          <Text style={styles.link}>Назад</Text>
        </Pressable>
        <Text style={[styles.link, { marginTop: 24, marginHorizontal: 15 }]}>Операция не найдена</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace(HISTORY_BRIDGES.root as never)}
          style={{ marginTop: 16, marginHorizontal: 15 }}
        >
          <Text style={styles.link}>К истории</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const status = detailStatusFor(op);

  return (
    <DebugMetaHost route={HISTORY_BRIDGES.receipt(op.id)}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" onPress={onBack} hitSlop={12}>
            <Text style={styles.back}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>{historyCopy.receipt}</Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.opName}>{op.title === 'Карта' ? 'Вывод денег' : op.title}</Text>

          <View style={styles.statusRow}>
            <Svg width={18} height={18} viewBox="0 0 18 18">
              <Circle cx={9} cy={9} r={7} stroke={legacyColor.logoGreen} strokeWidth={1.5} fill="none" />
              <Circle cx={9} cy={9} r={3} fill={legacyColor.logoGreen} />
            </Svg>
            <Text style={styles.status}>{status === 'Готово к выдаче' ? status : 'Успешно'}</Text>
          </View>

          <Text style={styles.amount}>{formatHistoryAmount(op)}</Text>

          <Row label={historyCopy.fromAccount} value={op.accountMask} />
          <Row label={historyCopy.payer} value={op.payerName} />
          <Row label={historyCopy.receiptNo} value={op.receiptNumber} />
          <Row label={historyCopy.dateOut} value={`${op.dateLabel}  ${op.timeLabel}`} />
          <Row label={historyCopy.fee} value={`${op.fee} ₸`} />

          <View style={styles.barcode}>
            <MockBarcode />
          </View>

          <Text style={styles.mockNote}>{historyCopy.receiptMockNote}</Text>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable
            style={styles.secondary}
            onPress={() => Alert.alert(historyCopy.mockShare)}
            accessibilityRole="button"
          >
            <Text style={styles.secondaryLabel}>{historyCopy.share}</Text>
          </Pressable>
          <Pressable
            style={styles.primary}
            onPress={() => Alert.alert(historyCopy.mockDownload)}
            accessibilityRole="button"
          >
            <Text style={styles.primaryLabel}>{historyCopy.download}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function MockBarcode() {
  const bars = [2, 1, 3, 1, 2, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 2, 1, 3, 1, 2];
  let x = 0;
  return (
    <Svg width={280} height={56} viewBox="0 0 280 56">
      {bars.map((w, i) => {
        const rect = (
          <Rect key={i} x={x} y={0} width={w * 4} height={56} fill={i % 2 === 0 ? legacyColor.logoGreen : 'transparent'} />
        );
        x += w * 4 + 2;
        return rect;
      })}
    </Svg>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.surface },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 8,
  },
  back: { fontSize: 28, color: legacyColor.primary, lineHeight: 32, width: 28 },
  headerTitle: { ...legacyType.field, color: legacyColor.textPrimary },
  content: { paddingHorizontal: legacySpace.screenX, paddingTop: 24, paddingBottom: 24 },
  opName: { fontSize: 24, lineHeight: 31, fontWeight: '600', color: legacyColor.textPrimary },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 16 },
  status: { fontSize: 20, lineHeight: 26, fontWeight: '500', color: legacyColor.logoGreen },
  amount: { ...legacyType.homeBalance, color: legacyColor.textPrimary, marginTop: 16, marginBottom: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: legacyColor.border,
  },
  label: { ...legacyType.field, color: legacyColor.textTertiary },
  value: { ...legacyType.field, color: legacyColor.textPrimary, flex: 1, textAlign: 'right' },
  barcode: { alignItems: 'center', marginTop: 32, marginBottom: 12 },
  mockNote: { ...legacyType.body, color: legacyColor.textSecondary, textAlign: 'center' },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: legacySpace.screenX,
    paddingBottom: 16,
  },
  secondary: {
    flex: 1,
    height: 50,
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabel: { ...legacyType.cta, color: legacyColor.primary },
  primary: {
    flex: 1,
    height: 50,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryLabel: { ...legacyType.cta, color: legacyColor.primaryOnPrimary },
  link: { ...legacyType.caption, color: legacyColor.primary, padding: 15 },
});
