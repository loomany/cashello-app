import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { AccountRow } from '@/features/legacyAccounts/AccountRow';
import { ChevronBackGlyph, ClockGlyph, CloseGlyph, CurrencyGlyph, PlusGlyph } from '@/features/legacyAccounts/AccountIcons';
import { accountsCopy } from '@/features/legacyAccounts/copy';
import { ACCOUNT_BRIDGES, LEGACY_ACCOUNTS, OPEN_ACCOUNT_OPTIONS } from '@/features/legacyAccounts/mockData';
import { useLegacyAccountsStore } from '@/features/legacyAccounts/store';
import { formatLegacyBalance } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { useLegacyWithdrawStore } from '@/features/legacyWithdraw/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function AccountsListScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.accounts);
  const primaryAccountId = useLegacyAccountsStore((s) => s.primaryAccountId);
  const setPrimary = useLegacyAccountsStore((s) => s.setPrimary);
  const markOpenCurrency = useLegacyAccountsStore((s) => s.markOpenCurrency);
  const balances = useLegacyTopupStore((s) => s.balances);
  const [openSheet, setOpenSheet] = useState(false);

  useScreenMeta({
    screenName: 'Legacy All Accounts',
    route: ACCOUNT_BRIDGES.list,
    taskId: 'RECON-003',
    prototypeStatus: 'in_progress',
    screenId: openSheet ? 'LGC-SCR-031' : 'LGC-SCR-029',
    legacyNodeId: openSheet ? '648:19059' : '648:19007',
  });

  return (
    <DebugMetaHost
      route={ACCOUNT_BRIDGES.list}
      extra={
        <Pressable
          onPress={() => {
            useLegacyAccountsStore.getState().reset();
            useLegacyTopupStore.getState().reset();
            useLegacyWithdrawStore.getState().reset();
          }}
          style={{ paddingVertical: 8 }}
        >
          <Text style={{ color: legacyColor.primary }}>Reset accounts demo</Text>
        </Pressable>
      }
    >
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <View style={styles.head}>
          <Text style={styles.title}>{accountsCopy.title}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={accountsCopy.openSheetTitle}
            onPress={() => setOpenSheet(true)}
            style={styles.add}
          >
            <PlusGlyph />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {LEGACY_ACCOUNTS.map((account) => (
            <AccountRow
              key={account.id}
              account={account}
              primary={account.id === primaryAccountId}
              onPress={() => router.push(ACCOUNT_BRIDGES.detail(account.id) as never)}
              onMakePrimary={() => setPrimary(account.id)}
              balanceLabel={formatLegacyBalance(balances[account.id] ?? 0, account.currency)}
            />
          ))}
          <View style={styles.hint}>
            <ClockGlyph />
            <Text style={styles.hintText}>{accountsCopy.swipeHint}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal animationType="fade" transparent visible={openSheet} onRequestClose={() => setOpenSheet(false)}>
        <View style={styles.sheetRoot}>
          <Pressable style={styles.overlayFlex} onPress={() => setOpenSheet(false)} />
          <View style={styles.sheet}>
            <View style={styles.sheetHead}>
              <Text style={styles.sheetTitle}>{accountsCopy.openSheetTitle}</Text>
              <Pressable accessibilityRole="button" onPress={() => setOpenSheet(false)} style={styles.close}>
                <CloseGlyph />
              </Pressable>
            </View>
            {OPEN_ACCOUNT_OPTIONS.map((option) => (
              <Pressable
                key={option.id}
                accessibilityRole="button"
                onPress={() => {
                  markOpenCurrency(option.id);
                  setOpenSheet(false);
                }}
                style={styles.openRow}
              >
                <CurrencyGlyph currency={option.id} size={30} />
                <Text style={styles.openLabel}>{accountsCopy[option.label]}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: legacySpace.screenX,
    marginTop: 8,
  },
  title: { ...legacyType.title, color: legacyColor.textPrimary },
  add: {
    width: 45,
    height: 32,
    borderRadius: legacyRadius.addBtn,
    backgroundColor: legacyColor.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { paddingHorizontal: legacySpace.screenX, paddingTop: 24, gap: 10, paddingBottom: 40 },
  hint: {
    marginTop: 8,
    minHeight: 56,
    borderRadius: 8,
    backgroundColor: legacyColor.accountIconBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  hintText: { ...legacyType.body, color: legacyColor.textSecondary, flex: 1 },
  sheetRoot: { flex: 1, justifyContent: 'flex-end' },
  overlayFlex: { flex: 1, backgroundColor: legacyColor.overlay },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 36,
    gap: 10,
  },
  sheetHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  sheetTitle: { ...legacyType.homeSection, color: legacyColor.textPrimary },
  close: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  openRow: {
    height: 60,
    borderRadius: 12,
    backgroundColor: legacyColor.homeBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    gap: 12,
  },
  openLabel: { ...legacyType.field, color: legacyColor.textPrimary },
});
