import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ReactNode } from 'react';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { withdrawCopy } from '@/features/legacyWithdraw/copy';

export type WithdrawReceiptRow = {
  label: string;
  value: string;
};

type Props = {
  amountLabel: string;
  icon: ReactNode;
  rows: WithdrawReceiptRow[];
  onClose: () => void;
  onDone: () => void;
};

/** Shared WD-003 / WD-005 success receipt card (local Cashello draft). */
export function WithdrawSuccessReceipt({ amountLabel, icon, rows, onClose, onDone }: Props) {
  return (
    <View style={styles.page}>
      <View style={styles.receipt}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <View style={styles.heroIcon}>{icon}</View>
            <Text style={styles.heroAmount}>{amountLabel}</Text>
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

          <Text style={styles.section}>{withdrawCopy.receiptInfo}</Text>

          {rows.map((row, index) => (
            <ReceiptRow key={row.label} label={row.label} value={row.value} last={index === rows.length - 1} />
          ))}
        </ScrollView>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={withdrawCopy.share}
            onPress={() => Alert.alert(withdrawCopy.shareMock)}
            style={styles.shareBtn}
          >
            <Text style={styles.shareLabel}>{withdrawCopy.share}</Text>
          </Pressable>
          <LegacyPrimaryButton label={withdrawCopy.done} onPress={onDone} />
        </View>
      </View>
    </View>
  );
}

function ReceiptRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, last && styles.rowLast]}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: legacySpace.screenX,
    paddingVertical: 16,
  },
  receipt: {
    maxHeight: '100%',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.14)',
    backgroundColor: legacyColor.surface,
    paddingTop: 14,
    paddingBottom: 16,
    shadowColor: '#050A26',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  scroll: { flexGrow: 0 },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 22,
  },
  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroAmount: {
    ...legacyType.homeBalance,
    color: legacyColor.textPrimary,
  },
  closeHit: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: legacyColor.homeBackground,
  },
  section: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    marginBottom: 12,
  },
  row: {
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: legacyColor.border,
    gap: 4,
  },
  rowLast: { borderBottomWidth: 0 },
  rowLabel: {
    ...legacyType.body,
    color: legacyColor.textTertiary,
  },
  rowValue: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
  },
  actions: {
    paddingHorizontal: 18,
    paddingTop: 12,
    gap: 10,
  },
  shareBtn: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.14)',
    backgroundColor: legacyColor.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareLabel: {
    ...legacyType.cta,
    color: legacyColor.primary,
  },
});
