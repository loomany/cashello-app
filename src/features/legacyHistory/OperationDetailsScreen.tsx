import { useState } from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { homeCopy } from '@/features/legacyHome/copy';
import { historyCopy } from '@/features/legacyHistory/copy';
import {
  detailStatusFor,
  formatHistoryAmount,
  HISTORY_BRIDGES,
  type HistoryDetailStatus,
} from '@/features/legacyHistory/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';
import { CardMethodGlyph, CashhelloUserMethodGlyph, PhoneMethodGlyph } from '@/features/legacyWithdraw/WithdrawIcons';
import { WithdrawSuccessReceipt } from '@/features/legacyWithdraw/WithdrawSuccessReceipt';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

const STATUS_COLOR: Record<HistoryDetailStatus, string> = {
  'В обработке': legacyColor.statusYellow,
  'Отклонено': legacyColor.danger,
  'Готов к выдаче': legacyColor.primary,
  'Готово к выдаче': legacyColor.primary,
  'Успешно': legacyColor.logoGreen,
};

const NODE_BY_STATUS: Record<string, string> = {
  'В обработке': '980:24839',
  'Отклонено': '980:25072',
  'Успешно': '980:25153',
  'Готов к выдаче': '980:25234',
  'Готово к выдаче': '980:25234',
};

export function OperationDetailsScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.historyDetail);
  const { id } = useLocalSearchParams<{ id: string }>();
  const op = useLegacyHistoryStore((s) => s.getById(id ?? ''));
  const cancelOperation = useLegacyHistoryStore((s) => s.cancelOperation);
  const [cancelOpen, setCancelOpen] = useState(false);

  const detailStatus = op ? detailStatusFor(op) : 'Успешно';
  const isWithdrawReceipt = op?.detailVariant === 'withdraw_receipt';
  const nodeId = isWithdrawReceipt
    ? op?.kind === 'phone'
      ? '118:226'
      : '107:144'
    : (NODE_BY_STATUS[detailStatus] ?? '980:25153');
  const screenId = isWithdrawReceipt ? (op?.kind === 'phone' ? 'WD-005' : 'WD-003') : 'LGC-SCR-115';

  useScreenMeta({
    screenName: isWithdrawReceipt ? 'Withdraw success receipt' : 'Legacy Operation details',
    route: HISTORY_BRIDGES.detail(id ?? ''),
    taskId: isWithdrawReceipt ? 'LOCAL_DRAFT' : 'RECON-007',
    prototypeStatus: 'in_progress',
    screenId,
    legacyNodeId: nodeId,
  });

  if (!op) {
    return (
      <SafeAreaView style={styles.safe}>
        <Pressable
          onPress={() => router.replace(HISTORY_BRIDGES.root as never)}
          accessibilityRole="button"
        >
          <Text style={styles.link}>Назад</Text>
        </Pressable>
        <Text style={styles.missing}>Операция не найдена</Text>
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

  if (isWithdrawReceipt) {
    const amountLabel = formatHistoryAmount(op);
    const destLabel =
      op.kind === 'phone'
        ? withdrawCopy.receiptPhone
        : op.kind === 'card'
          ? withdrawCopy.receiptCard
          : op.kind === 'transfer'
            ? withdrawCopy.receiptRecipient
            : withdrawCopy.receiptService;
    const rows = [
      { label: withdrawCopy.receiptOpType, value: op.opType ?? '' },
      { label: withdrawCopy.receiptService, value: op.service ?? '' },
      { label: destLabel, value: op.destination ?? '' },
      { label: withdrawCopy.receiptFrom, value: op.fromLabel ?? homeCopy.balanceLabel },
      { label: withdrawCopy.receiptAmount, value: amountLabel },
      {
        label: withdrawCopy.receiptFee,
        value: `${op.fee} ${op.amountUnit ?? withdrawCopy.amountUnitTenge}`,
      },
      {
        label: withdrawCopy.receiptDate,
        value: op.receiptDateLabel ?? `${op.dateLabel} · ${op.timeLabel.slice(0, 5)}`,
      },
      { label: withdrawCopy.receiptStatus, value: withdrawCopy.receiptSuccess },
    ];
    const icon =
      op.kind === 'phone' ? (
        <PhoneMethodGlyph />
      ) : op.kind === 'transfer' ? (
        <CashhelloUserMethodGlyph />
      ) : (
        <CardMethodGlyph />
      );

    return (
      <DebugMetaHost route={HISTORY_BRIDGES.detail(op.id)}>
        <SafeAreaView style={styles.receiptSafe} edges={['top', 'bottom']}>
          <WithdrawSuccessReceipt
            amountLabel={amountLabel}
            icon={icon}
            rows={rows}
            onClose={onBack}
            onDone={onBack}
          />
        </SafeAreaView>
      </DebugMetaHost>
    );
  }

  const onCancelConfirm = () => {
    cancelOperation(op.id);
    setCancelOpen(false);
  };

  return (
    <DebugMetaHost route={HISTORY_BRIDGES.detail(op.id)}>
      <View style={styles.overlay}>
        <Pressable style={styles.dim} onPress={onBack} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>{historyCopy.detailsTitle}</Text>

          <View style={styles.hero}>
            <Text style={styles.opTitle}>{op.title}</Text>
            <View style={styles.statusRow}>
              <StatusDot color={STATUS_COLOR[detailStatus]} />
              <Text style={[styles.statusText, { color: STATUS_COLOR[detailStatus] }]}>{detailStatus}</Text>
            </View>
            <Text style={styles.amount}>{formatHistoryAmount(op)}</Text>
          </View>

          <DetailRow label={historyCopy.fromAccount} value={op.accountMask} />
          {op.destination ? <DetailRow label={historyCopy.destination} value={op.destination} /> : null}
          <DetailRow label={historyCopy.dateOut} value={`${op.dateLabel}  ${op.timeLabel}`} />
          <DetailRow label={historyCopy.receiptNo} value={op.receiptNumber} />
          <DetailRow label={historyCopy.payer} value={op.payerName} />
          <DetailRow label={historyCopy.fee} value={`${op.fee} ₸`} />

          <View style={styles.actions}>
            <Action
              label={historyCopy.share}
              onPress={() => Alert.alert(historyCopy.mockShare)}
              icon="share"
            />
            {op.cancellable ? (
              <Action label={historyCopy.cancel} onPress={() => setCancelOpen(true)} icon="cancel" />
            ) : null}
            {op.receiptEligible ? (
              <Action
                label={historyCopy.receipt}
                onPress={() => router.push(HISTORY_BRIDGES.receipt(op.id) as never)}
                icon="receipt"
              />
            ) : null}
            <Action
              label={historyCopy.help}
              onPress={() => Alert.alert(historyCopy.mockHelp)}
              icon="help"
            />
          </View>
        </View>
      </View>

      <Modal transparent visible={cancelOpen} animationType="fade">
        <View style={styles.modalRoot}>
          <View style={styles.alert}>
            <Text style={styles.alertTitle}>{historyCopy.cancelTitle}</Text>
            <View style={styles.alertActions}>
              <Pressable onPress={() => setCancelOpen(false)} style={styles.alertBtn}>
                <Text style={styles.alertBtnText}>{historyCopy.cancelNo}</Text>
              </Pressable>
              <Pressable onPress={onCancelConfirm} style={styles.alertBtn}>
                <Text style={[styles.alertBtnText, styles.alertDanger]}>{historyCopy.cancelYes}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </DebugMetaHost>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

function Action({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress: () => void;
  icon: 'share' | 'cancel' | 'receipt' | 'help';
}) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.action}>
      <ActionIcon kind={icon} />
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

function StatusDot({ color }: { color: string }) {
  return (
    <Svg width={8} height={8} viewBox="0 0 8 8">
      <Circle cx={4} cy={4} r={4} fill={color} />
    </Svg>
  );
}

function ActionIcon({ kind }: { kind: 'share' | 'cancel' | 'receipt' | 'help' }) {
  const c = legacyColor.primary;
  if (kind === 'share') {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path d="M5 14v5h14v-5" stroke={c} strokeWidth={1.5} strokeLinecap="round" fill="none" />
        <Path d="M12 4v11" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
        <Path d="M8 8l4-4 4 4" stroke={c} strokeWidth={1.5} strokeLinecap="round" fill="none" />
      </Svg>
    );
  }
  if (kind === 'cancel') {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Circle cx={12} cy={12} r={8} stroke={c} strokeWidth={1.5} fill="none" />
        <Path d="M9 9l6 6M15 9l-6 6" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    );
  }
  if (kind === 'receipt') {
    return (
      <Svg width={24} height={24} viewBox="0 0 24 24">
        <Path
          d="M7 3h10v18l-2-1.5L13 21l-2-1.5L9 21l-2-1.5V3z"
          stroke={c}
          strokeWidth={1.5}
          fill="none"
        />
        <Path d="M9 8h6M9 12h6M9 16h4" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={8} stroke={c} strokeWidth={1.5} fill="none" />
      <Path d="M12 11v5" stroke={c} strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={12} cy={8} r={1} fill={c} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground, padding: legacySpace.screenX },
  receiptSafe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  link: { ...legacyType.caption, color: legacyColor.primary },
  missing: { ...legacyType.title, color: legacyColor.textPrimary, marginTop: 24 },
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: legacyColor.overlay },
  dim: { ...StyleSheet.absoluteFill },
  sheet: {
    backgroundColor: legacyColor.detailSheet,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 10,
    paddingBottom: 28,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.border,
    marginBottom: 12,
  },
  sheetTitle: { ...legacyType.homeSection, color: legacyColor.textPrimary, marginBottom: 16 },
  hero: { marginBottom: 16, gap: 6 },
  opTitle: { ...legacyType.field, color: legacyColor.textPrimary },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusText: { ...legacyType.body },
  amount: { ...legacyType.homeBalance, color: legacyColor.textPrimary, marginTop: 4 },
  detailRow: { paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: legacyColor.border },
  detailLabel: { ...legacyType.body, color: legacyColor.textTertiary, marginBottom: 2 },
  detailValue: { ...legacyType.field, color: legacyColor.textPrimary },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  action: { alignItems: 'center', gap: 6, minWidth: 64 },
  actionLabel: { ...legacyType.caption, color: legacyColor.primary },
  modalRoot: { flex: 1, backgroundColor: legacyColor.overlay, alignItems: 'center', justifyContent: 'center' },
  alert: {
    width: 270,
    backgroundColor: legacyColor.surface,
    borderRadius: 14,
    overflow: 'hidden',
  },
  alertTitle: { ...legacyType.alertTitle, color: legacyColor.textPrimary, textAlign: 'center', padding: 16 },
  alertActions: { flexDirection: 'row', borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: legacyColor.border },
  alertBtn: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  alertBtnText: { ...legacyType.caption, color: legacyColor.alertAction },
  alertDanger: { color: legacyColor.danger },
});
