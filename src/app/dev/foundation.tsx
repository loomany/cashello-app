import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ChevronRight, RotateCcw, Sparkles } from 'lucide-react-native';

import {
  AppButton,
  AppScreen,
  AppSheet,
  AppText,
  Divider,
  EmptyState,
  IconButton,
  MoneyText,
  Skeleton,
  StatusChip,
  Surface,
} from '@/components/primitives';
import { color, iconSize, space, VISUAL_DIRECTION_STATUS } from '@/design/tokens';
import { currencyLabel } from '@/lib/formatMoney';
import { successFeedback } from '@/lib/haptics';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';
import { useMockStore } from '@/state/store';

export default function FoundationScreen() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loadingDemo, setLoadingDemo] = useState(false);
  const user = useMockStore((state) => state.user);
  const accounts = useMockStore((state) => state.accounts);
  const bonus = useMockStore((state) => state.bonus);
  const hydrated = useMockStore((state) => state.hydrated);
  const simulate = useMockStore((state) => state.simulateFoundationPayment);
  const reset = useMockStore((state) => state.resetToCanonical);

  useScreenMeta({
    screenName: 'Foundation validation',
    route: '/dev/foundation',
    taskId: 'TASK-004',
    prototypeStatus: 'foundation',
  });

  return (
    <DebugMetaHost route="/dev/foundation">
      <AppScreen>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <AppText variant="label" tone="tertiary">
              PAYDALA · REFERENCE PROTOTYPE
            </AppText>
            <AppText variant="title">Foundation</AppText>
          </View>
          <IconButton
            label="Reset canonical demo"
            onPress={() => {
              reset();
            }}
          >
            <RotateCcw color={color.textPrimary} size={iconSize.md} strokeWidth={1.75} />
          </IconButton>
        </View>

        <AppText variant="body" tone="secondary">
          Infrastructure lab. Not Home. Visual direction is {VISUAL_DIRECTION_STATUS.toLowerCase()}.
        </AppText>

        <Surface elevated>
          <AppText variant="label" tone="tertiary">
            MOCK USER
          </AppText>
          <AppText variant="heading">{hydrated ? user.displayName : '—'}</AppText>
          <AppText variant="body" tone="secondary">
            {hydrated ? user.phone : 'Hydrating mock state…'}
          </AppText>
          <View style={styles.chips}>
            <StatusChip label={hydrated ? user.verificationStatus : '…'} tone="info" />
            <StatusChip label="Mock balances" tone="neutral" />
          </View>
        </Surface>

        <View>
          <AppText variant="label" tone="tertiary">
            ACCOUNTS
          </AppText>
          <View style={styles.stack}>
            {!hydrated ? (
              <>
                <Skeleton height={28} />
                <Skeleton height={28} />
              </>
            ) : (
              accounts.map((account) => (
                <View key={account.id} style={styles.row}>
                  <AppText variant="label" tone="secondary">
                    {currencyLabel(account.currency)}
                  </AppText>
                  <MoneyText amountMinor={account.availableMinor} unit={account.currency} size="title" />
                </View>
              ))
            )}
            <View style={styles.row}>
              <AppText variant="label" tone="bonus">
                Bonus
              </AppText>
              {hydrated ? (
                <MoneyText amountMinor={bonus.balanceMinor} unit="BONUS" size="title" tone="bonus" />
              ) : (
                <Skeleton height={28} width={120} />
              )}
            </View>
          </View>
        </View>

        <Divider />

        <View style={styles.stack}>
          <AppText variant="label" tone="tertiary">
            TYPOGRAPHY
          </AppText>
          <AppText variant="display">34 Display</AppText>
          <AppText variant="title">24 Title</AppText>
          <AppText variant="heading">Heading</AppText>
          <AppText variant="body">16 Body — readable at a glance.</AppText>
          <AppText variant="label">13 Label</AppText>
          <AppText variant="caption" tone="secondary">
            12 Caption
          </AppText>
        </View>

        <View style={styles.stack}>
          <AppText variant="label" tone="tertiary">
            MONEY
          </AppText>
          <MoneyText amountMinor={124_560_000} unit="KZT" size="display" />
          <MoneyText amountMinor={12_000} unit="BONUS" size="compact" tone="bonus" />
          <MoneyText amountMinor={-860_000} unit="KZT" size="compact" tone="debit" />
          <MoneyText amountMinor={5_000_000} unit="KZT" size="compact" tone="credit" />
        </View>

        <View style={styles.stack}>
          <AppText variant="label" tone="tertiary">
            CONTROLS
          </AppText>
          <AppButton
            label="Simulate mock payment"
            haptic
            onPress={() => {
              simulate();
              void successFeedback();
            }}
          />
          <AppButton
            label="Open in-context sheet"
            variant="secondary"
            onPress={() => setSheetOpen(true)}
          />
          <AppButton
            label={loadingDemo ? 'Loading' : 'Loading state'}
            variant="secondary"
            loading={loadingDemo}
            onPress={() => {
              setLoadingDemo(true);
              setTimeout(() => setLoadingDemo(false), 900);
            }}
          />
          <AppButton label="Disabled" disabled />
        </View>

        <Surface>
          <View style={styles.inline}>
            <Sparkles color={color.bonus} size={iconSize.md} strokeWidth={1.75} />
            <AppText variant="label">Press feedback uses a 0.98 scale, not a ripple.</AppText>
          </View>
          <AppText variant="caption" tone="tertiary">
            Triple-tap the top-left corner for screen metadata. No product SCR ID is assigned.
          </AppText>
        </Surface>

        <EmptyState
          title="Empty-state primitive"
          body="Use this later for history, cards, and catalog — not as a product screen."
        />

        <View style={styles.footer}>
          <ChevronRight color={color.textTertiary} size={iconSize.sm} strokeWidth={1.75} />
          <AppText variant="caption" tone="tertiary">
            TASK-004 foundation only
          </AppText>
        </View>
      </AppScreen>

      <AppSheet visible={sheetOpen} title="Sample sheet" onClose={() => setSheetOpen(false)}>
        <AppText variant="body" tone="secondary">
          In-context sheet for future pickers. Keyboard-safe. Drag down to dismiss.
        </AppText>
        {accounts.map((account) => (
          <View key={account.id} style={styles.row}>
            <AppText variant="body">{account.currency}</AppText>
            <MoneyText amountMinor={account.availableMinor} unit={account.currency} size="compact" />
          </View>
        ))}
        <AppButton label="Close" variant="secondary" onPress={() => setSheetOpen(false)} />
      </AppSheet>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: space[12],
  },
  headerCopy: {
    flex: 1,
    gap: space[4],
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space[8],
    marginTop: space[12],
  },
  stack: {
    gap: space[8],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: space[12],
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[8],
    marginBottom: space[8],
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[4],
  },
});
