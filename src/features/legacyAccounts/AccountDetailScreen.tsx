import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import {
  ChevronBackGlyph,
  ChevronDownGlyph,
  DownloadGlyph,
  StarGlyph,
  TopUpGlyph,
} from '@/features/legacyAccounts/AccountIcons';
import { accountsCopy } from '@/features/legacyAccounts/copy';
import {
  ACCOUNT_BRIDGES,
  DEMO_CARD_FACE,
  DEMO_REQUISITES,
  LEGACY_ACCOUNTS,
} from '@/features/legacyAccounts/mockData';
import { useLegacyAccountsStore } from '@/features/legacyAccounts/store';
import { MethodSheetContent } from '@/features/legacyTopup/MethodSheetScreen';
import { formatLegacyBalance } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { HistoryArrow } from '@/features/legacyHome/HomeIcons';
import { toHomeHistoryRow } from '@/features/legacyHome/historyPreview';
import { HISTORY_BRIDGES } from '@/features/legacyHistory/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

type Sheet = 'none' | 'download' | 'topup';

type Props = {
  accountId: string;
};

export function AccountDetailScreen({ accountId }: Props) {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.accountDetail);
  const account = LEGACY_ACCOUNTS.find((row) => row.id === accountId) ?? LEGACY_ACCOUNTS[0];
  const primaryAccountId = useLegacyAccountsStore((s) => s.primaryAccountId);
  const markDownload = useLegacyAccountsStore((s) => s.markDownload);
  const balances = useLegacyTopupStore((s) => s.balances);
  const operations = useLegacyHistoryStore((s) => s.operations);
  const preview = operations
    .filter((op) => op.accountId === account.id)
    .slice(0, 4)
    .map(toHomeHistoryRow);
  const [sheet, setSheet] = useState<Sheet>('none');
  const isPrimary = account.id === primaryAccountId;
  const balanceLabel = formatLegacyBalance(balances[account.id] ?? 0, account.currency);

  const nodeId = account.hasCard ? '821:29038' : '648:20120';
  const screenId = account.hasCard ? 'LGC-SCR-033' : 'LGC-SCR-032';

  useScreenMeta({
    screenName: 'Legacy Account Detail',
    route: ACCOUNT_BRIDGES.detail(account.id),
    taskId: 'RECON-003',
    prototypeStatus: 'in_progress',
    screenId: sheet === 'download' ? 'LGC-SCR-034' : sheet === 'topup' ? 'LGC-SCR-040' : screenId,
    legacyNodeId: sheet === 'download' ? '648:20196' : sheet === 'topup' ? '648:20275' : nodeId,
  });

  const goCard = () => router.push(ACCOUNT_BRIDGES.card as never);
  const goHistory = () => router.push(ACCOUNT_BRIDGES.history as never);

  return (
    <DebugMetaHost route={ACCOUNT_BRIDGES.detail(account.id)}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.balance}>{balanceLabel}</Text>
              <Text style={styles.iban}>{account.iban}</Text>
            </View>
            {isPrimary ? (
              <View style={styles.primaryBadge}>
                <StarGlyph color={legacyColor.primaryOnPrimary} filled />
                <Text style={styles.primaryLabel}>{accountsCopy.primary}</Text>
              </View>
            ) : null}
          </View>

          <ScrollView
            horizontal
            style={styles.cluster}
            contentContainerStyle={styles.clusterContent}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.requisites}>
              <Text style={styles.reqTitle}>{accountsCopy.requisites}</Text>
              <View style={styles.reqGrid}>
                <Field label={accountsCopy.nameLabel} value={DEMO_REQUISITES.name} wide />
                <Field label={accountsCopy.knp} value={DEMO_REQUISITES.knp} />
              </View>
              <View style={styles.reqRow}>
                <Field label={accountsCopy.bik} value={DEMO_REQUISITES.bik} />
                <Field label={accountsCopy.kbe} value={DEMO_REQUISITES.kbe} />
                <Field label={accountsCopy.bin} value={DEMO_REQUISITES.bin} />
              </View>
            </View>
            <Pressable accessibilityRole="button" onPress={goCard} style={styles.cardPeek}>
              {account.hasCard ? <IssuedCardPeek /> : <OpenCardPeek />}
            </Pressable>
          </ScrollView>

          <View style={styles.actions}>
            <Pressable accessibilityRole="button" onPress={() => setSheet('download')} style={styles.downloadBtn}>
              <DownloadGlyph />
              <View style={styles.downloadLabelRow}>
                <Text style={styles.downloadLabel}>{accountsCopy.download}</Text>
                {sheet === 'download' ? <ChevronDownGlyph /> : null}
              </View>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={() => setSheet('topup')} style={styles.topUpBtn}>
              <TopUpGlyph />
              <Text style={styles.topUpLabel}>{accountsCopy.topUp}</Text>
            </Pressable>
          </View>

          <View style={styles.historyHead}>
            <Text style={styles.historyTitle}>{accountsCopy.history}</Text>
            <Pressable accessibilityRole="button" onPress={goHistory}>
              <Text style={styles.seeAll}>{accountsCopy.seeAll}</Text>
            </Pressable>
          </View>
          <View style={styles.historyCard}>
            {preview.map((row, index) => (
              <View key={row.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <Pressable
                  accessibilityRole="button"
                  onPress={() => router.push(HISTORY_BRIDGES.detail(row.id) as never)}
                  style={styles.historyRow}
                >
                  <HistoryArrow direction={row.direction} tone={row.tone} />
                  <View style={styles.historyText}>
                    <Text style={styles.rowTitle}>{row.title}</Text>
                    <Text style={styles.rowStatus}>{row.status}</Text>
                  </View>
                  <Text style={[styles.rowAmount, row.amountEmphasis && styles.rowAmountEmph]}>{row.amount}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal animationType="fade" transparent visible={sheet === 'download'} onRequestClose={() => setSheet('none')}>
        <View style={styles.sheetRoot}>
          <Pressable style={styles.overlayFlex} onPress={() => setSheet('none')} />
          <View style={styles.downloadSheet}>
            <Text style={styles.alertTitle}>{accountsCopy.downloadTitle}</Text>
            <Text style={styles.alertBody}>{accountsCopy.downloadBody}</Text>
            <View style={styles.sep} />
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                markDownload('statement');
                setSheet('none');
              }}
              style={styles.sheetAction}
            >
              <Text style={styles.sheetActionLabel}>{accountsCopy.statement}</Text>
            </Pressable>
            <View style={styles.sep} />
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                markDownload('requisites');
                setSheet('none');
              }}
              style={styles.sheetAction}
            >
              <Text style={styles.sheetActionLabel}>{accountsCopy.requisitesOption}</Text>
            </Pressable>
          </View>
          <Pressable accessibilityRole="button" onPress={() => setSheet('none')} style={styles.cancelBtn}>
            <Text style={styles.cancelLabel}>{accountsCopy.cancel}</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={sheet === 'topup'} onRequestClose={() => setSheet('none')}>
        <View style={styles.sheetRoot}>
          <Pressable style={styles.overlayFlex} onPress={() => setSheet('none')} />
          <MethodSheetContent toAccountId={account.id} onClose={() => setSheet('none')} />
        </View>
      </Modal>
    </DebugMetaHost>
  );
}

function Field({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <View style={wide ? styles.fieldWide : undefined}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function OpenCardPeek() {
  return (
    <View style={styles.peekFill}>
      <Text style={styles.peekTitle} numberOfLines={1}>
        {accountsCopy.cardForAccount}
      </Text>
      <Text style={styles.peekSupport} numberOfLines={3}>
        {accountsCopy.cardSupport}
      </Text>
      <View style={styles.peekCta}>
        <Text style={styles.peekCtaLabel}>{accountsCopy.openCard}</Text>
      </View>
    </View>
  );
}

function IssuedCardPeek() {
  return (
    <View style={styles.peekFill}>
      <Text style={styles.pan} numberOfLines={1}>
        {DEMO_CARD_FACE.panMask}
      </Text>
      <Text style={styles.holder} numberOfLines={1}>
        {DEMO_CARD_FACE.holder}
      </Text>
      <View style={styles.peekCta}>
        <Text style={styles.peekCtaLabel}>{accountsCopy.cardMore}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' },
  scroll: { paddingBottom: 40 },
  balanceRow: {
    paddingHorizontal: legacySpace.screenX,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  balance: { ...legacyType.homeBalance, color: legacyColor.textPrimary },
  iban: { ...legacyType.field, color: legacyColor.textSecondary, marginTop: 8 },
  primaryBadge: {
    backgroundColor: legacyColor.primary,
    borderRadius: legacyRadius.accountBadge,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 4,
  },
  primaryLabel: { fontSize: 14, lineHeight: 18, fontWeight: '600', color: legacyColor.primaryOnPrimary },
  cluster: {
    marginTop: 16,
    marginHorizontal: legacySpace.screenX,
    height: 197,
    width: 345,
    borderRadius: 12,
    overflow: 'hidden',
  },
  clusterContent: { flexDirection: 'row' },
  requisites: {
    width: 316,
    height: 197,
    backgroundColor: legacyColor.requisitesBg,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reqTitle: { ...legacyType.field, color: '#242424', marginBottom: 18 },
  reqGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  reqRow: { flexDirection: 'row', marginTop: 22, gap: 18 },
  fieldWide: { flex: 1 },
  fieldLabel: { ...legacyType.body, color: legacyColor.textSecondary },
  fieldValue: { ...legacyType.field, color: legacyColor.textPrimary, marginTop: 4 },
  cardPeek: {
    width: 315,
    height: 197,
    marginLeft: 15,
    backgroundColor: legacyColor.cardFace,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  peekFill: { flex: 1 },
  peekTitle: { fontSize: 18, lineHeight: 23, fontWeight: '500', color: legacyColor.primaryOnPrimary },
  peekSupport: { ...legacyType.body, color: '#A9A9A9', marginTop: 8, width: 173 },
  peekCta: {
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: legacyColor.openCardCta,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  peekCtaLabel: { fontSize: 14, lineHeight: 18, fontWeight: '600', color: '#000000' },
  pan: { fontSize: 16, fontWeight: '700', color: '#FDFDFD', letterSpacing: 0.4 },
  holder: { fontSize: 14, color: legacyColor.primaryOnPrimary, marginTop: 8 },
  actions: {
    marginTop: 17,
    paddingHorizontal: legacySpace.screenX,
    flexDirection: 'row',
    gap: 15,
  },
  downloadBtn: {
    width: 165,
    height: 64,
    borderRadius: 10,
    backgroundColor: legacyColor.downloadBtn,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  downloadLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  downloadLabel: { fontSize: 12, lineHeight: 16, fontWeight: '600', color: legacyColor.primary },
  topUpBtn: {
    width: 165,
    height: 64,
    borderRadius: 10,
    backgroundColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  topUpLabel: { fontSize: 12, lineHeight: 16, fontWeight: '600', color: legacyColor.primaryOnPrimary },
  historyHead: {
    marginTop: 24,
    paddingHorizontal: legacySpace.screenX,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyTitle: { ...legacyType.field, color: legacyColor.historyLabel },
  seeAll: { ...legacyType.caption, color: legacyColor.historyLabel },
  historyCard: {
    marginTop: 10,
    marginHorizontal: legacySpace.screenX,
    backgroundColor: legacyColor.surface,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: legacyColor.border },
  historyRow: { height: 54, flexDirection: 'row', alignItems: 'center' },
  historyText: { flex: 1, marginLeft: 4 },
  rowTitle: { ...legacyType.field, color: legacyColor.textPrimary },
  rowStatus: { ...legacyType.body, color: legacyColor.textSecondary },
  rowAmount: { ...legacyType.field, color: legacyColor.textTertiary },
  rowAmountEmph: { color: legacyColor.textPrimary },
  sheetRoot: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 7, paddingBottom: 10 },
  overlayFlex: { ...StyleSheet.absoluteFill, backgroundColor: legacyColor.overlay, zIndex: 0 },
  downloadSheet: {
    backgroundColor: legacyColor.surface,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 16,
    zIndex: 1,
  },
  alertTitle: { ...legacyType.alertTitle, color: '#000000', textAlign: 'center' },
  alertBody: { ...legacyType.alertBody, color: legacyColor.sheetBody, textAlign: 'center', paddingHorizontal: 16, marginTop: 8 },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: '#3C3C435C', alignSelf: 'stretch', marginTop: 8 },
  sheetAction: { height: 56, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' },
  sheetActionLabel: { fontSize: 17, lineHeight: 22, color: legacyColor.alertAction, letterSpacing: -0.4 },
  cancelBtn: {
    marginTop: 8,
    height: 56,
    borderRadius: 14,
    backgroundColor: legacyColor.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  cancelLabel: { fontSize: 20, lineHeight: 24, fontWeight: '600', color: legacyColor.textPrimary },
  topUpSheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 36,
    gap: 10,
    zIndex: 1,
  },
  sheetHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  sheetTitle: { ...legacyType.homeSection, color: legacyColor.textPrimary },
  closeHit: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  closeX: { fontSize: 28, color: legacyColor.textPrimary, lineHeight: 28 },
  openRow: {
    minHeight: 60,
    borderRadius: 12,
    backgroundColor: legacyColor.homeBackground,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  openLabel: { ...legacyType.field, color: legacyColor.textPrimary },
});
