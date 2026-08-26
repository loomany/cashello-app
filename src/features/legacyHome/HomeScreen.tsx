import { useEffect, useMemo, useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyFontFamily, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { accountsCopy } from '@/features/legacyAccounts/copy';
import { authCopy } from '@/features/legacyAuth/copy';
import {
  CashhelloBrand,
  EyeGlyph,
  GiftGlyph,
  HistoryArrow,
  ProfileBonusHeader,
  TopupGlyph,
  WithdrawGlyph,
} from '@/features/legacyHome/HomeIcons';
import { homeCopy, homePromoBanners, homeServicesPreview } from '@/features/legacyHome/copy';
import { latestHomeHistoryRows } from '@/features/legacyHome/historyPreview';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { WithdrawSelectSheet } from '@/features/legacyHome/WithdrawSelectSheet';
import { HOME_BRIDGES, type HomeHistoryRow } from '@/features/legacyHome/mockData';
import { profileHref, navigateHome, useLegacySessionStore } from '@/features/legacyHome/session';
import { HistoryActionSheet } from '@/features/legacyHistory/HistoryActionSheet';
import { HistoryListIconView } from '@/features/legacyHistory/HistoryOpIcon';
import { HISTORY_BRIDGES, type LegacyHistoryOp } from '@/features/legacyHistory/mockData';
import { useLegacyHistoryStore } from '@/features/legacyHistory/store';
import { PAYMENT_BRIDGES } from '@/features/legacyPayment/mockData';
import { TopupSelectSheet } from '@/features/legacyTopup/MethodSheetScreen';
import { formatLegacyBalance } from '@/features/legacyTopup/mockData';
import { useLegacyTopupStore } from '@/features/legacyTopup/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';
import {
  ACCOUNT_GAP,
  carouselCardWidth,
  carouselSnapIndex,
  carouselSnapInterval,
} from '@/features/legacyHome/carouselGeometry';
import { DESKTOP_FRAME_BREAKPOINT, FRAME_WIDTH } from '@/prototype/webViewportScale';

const HOME_ACCOUNT_DEFS = [
  { id: 'kzt', labelKey: 'balanceLabel' as const, accountId: 'kzt-primary', currency: 'KZT' as const },
  { id: 'rub', labelKey: 'balanceLabelRub' as const, accountId: 'rub', currency: 'RUB' as const },
  { id: 'usd', labelKey: 'balanceLabelUsd' as const, accountId: 'usd', currency: 'USD' as const },
];

/** Home preview services that have a payment catalog counterpart. */
const HOME_SERVICE_PAYMENT_IDS = new Set(['ubet', 'zaimer']);

type Props = {
  historyLink?: 'seeAll' | 'filter';
  /** Guest Home (HOME-001) vs authorized Home (HOME-002). */
  variant?: 'authorized' | 'guest';
  /** Open top-up method sheet on mount (LOCAL_DRAFT / capture). */
  openTopup?: boolean;
};

export function LegacyHomeScreen({
  historyLink = 'seeAll',
  variant = 'authorized',
  openTopup = false,
}: Props) {
  const router = useRouter();
  const enterGuest = useLegacySessionStore((s) => s.enterGuest);
  const enterAuthorized = useLegacySessionStore((s) => s.enterAuthorized);
  /** Home route owns mode: `?guest=1` → guest, else authorized (matches HOME-001 / HOME-002). */
  const isGuest = variant === 'guest';
  const { width: windowWidth } = useWindowDimensions();
  const [accountIndex, setAccountIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [carouselViewportWidth, setCarouselViewportWidth] = useState(0);
  const [balancesHidden, setBalancesHidden] = useState(isGuest);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [topupOpen, setTopupOpen] = useState(openTopup);
  const [actionOp, setActionOp] = useState<LegacyHistoryOp | null>(null);
  const operations = useLegacyHistoryStore((s) => s.operations);
  const getById = useLegacyHistoryStore((s) => s.getById);
  const balances = useLegacyTopupStore((s) => s.balances);
  const accountCards = useMemo(
    () =>
      HOME_ACCOUNT_DEFS.map((row) => ({
        id: row.id,
        label: homeCopy[row.labelKey],
        amount: isGuest
          ? row.currency === 'USD'
            ? '0 $'
            : row.currency === 'RUB'
              ? '0 ₽'
              : '0 ₸'
          : formatLegacyBalance(balances[row.accountId] ?? 0, row.currency),
      })),
    [balances, isGuest],
  );
  const preview = useMemo<HomeHistoryRow[]>(
    () => latestHomeHistoryRows(operations, 4),
    [operations],
  );
  const nodeId = historyLink === 'filter' ? '980:26275' : '765:22510';
  const historyAction = historyLink === 'filter' ? homeCopy.filter : homeCopy.seeAll;
  const fallbackCarouselWidth =
    windowWidth >= DESKTOP_FRAME_BREAKPOINT ? FRAME_WIDTH : windowWidth;
  const cardWidth =
    carouselViewportWidth > 0
      ? carouselCardWidth(carouselViewportWidth, legacySpace.screenX)
      : carouselCardWidth(fallbackCarouselWidth, legacySpace.screenX);
  const snapInterval = carouselSnapInterval(cardWidth, ACCOUNT_GAP);

  const onCarouselViewportLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event.nativeEvent.layout.width;
    if (nextWidth > 0 && nextWidth !== carouselViewportWidth) {
      setCarouselViewportWidth(nextWidth);
    }
  };

  useEffect(() => {
    if (variant === 'guest') {
      enterGuest();
      return;
    }
    enterAuthorized();
    // Authorized Home mirrors reconstruction art (HOME-002): 234 888 ₸ / 43 900 ₽ / 123 $.
    useLegacyTopupStore.getState().reset();
  }, [variant, enterGuest, enterAuthorized]);

  useScreenMeta({
    screenName: isGuest ? 'Legacy Guest Home' : 'Legacy Home',
    route: isGuest ? HOME_BRIDGES.guestHome : '/legacy/home',
    taskId: isGuest ? 'DESIGN-001' : 'RECON-002',
    prototypeStatus: 'in_progress',
    screenId: isGuest ? 'HOME-001' : historyLink === 'filter' ? 'LGC-SCR-026' : 'LGC-SCR-025',
    legacyNodeId: isGuest ? '7:5' : nodeId,
  });

  const go = (href: string) => () => router.push(href as never);

  const gateOr = (action: () => void) => {
    if (isGuest) {
      router.push(HOME_BRIDGES.login as never);
      return;
    }
    action();
  };

  const onTopup = () => setTopupOpen(true);
  const onWithdraw = () => setWithdrawOpen(true);

  const closeActionSheet = () => setActionOp(null);

  const onHistoryRowPress = (row: HomeHistoryRow) => {
    const op = getById(row.id);
    if (op) setActionOp(op);
  };

  const onRepeat = () => {
    const href = actionOp?.repeatHref;
    closeActionSheet();
    gateOr(() => {
      if (href) router.push(href as never);
    });
  };

  const onShareReceipt = () => {
    const id = actionOp?.id;
    closeActionSheet();
    gateOr(() => {
      if (id) router.push(HISTORY_BRIDGES.detail(id) as never);
    });
  };

  const onServicePress = (serviceId: string) => {
    if (HOME_SERVICE_PAYMENT_IDS.has(serviceId)) {
      router.push(PAYMENT_BRIDGES.service(serviceId) as never);
      return;
    }
    router.push(PAYMENT_BRIDGES.root as never);
  };

  const onAccountsScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const clamped = carouselSnapIndex(
      event.nativeEvent.contentOffset.x,
      snapInterval,
      accountCards.length,
    );
    if (clamped !== accountIndex) {
      setAccountIndex(clamped);
    }
  };

  const onBannersScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const clamped = carouselSnapIndex(
      event.nativeEvent.contentOffset.x,
      snapInterval,
      homePromoBanners.length,
    );
    if (clamped !== bannerIndex) {
      setBannerIndex(clamped);
    }
  };

  return (
    <DebugMetaHost
      route={isGuest ? HOME_BRIDGES.guestHome : '/legacy/home'}
      extra={
        <View style={styles.jumps}>
          <Jump label="Filter Home" onPress={() => router.replace('/legacy/home?historyLink=filter')} />
          <Jump
            label="Primary Home"
            onPress={() => {
              enterAuthorized();
              router.replace('/legacy/home');
            }}
          />
          <Jump
            label="Guest Home"
            onPress={() => {
              enterGuest();
              router.replace(HOME_BRIDGES.guestHome);
            }}
          />
          <Jump label="Auth" onPress={() => router.replace('/legacy/auth')} />
        </View>
      }
    >
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.header}>
          <CashhelloBrand onPress={() => navigateHome(router)} />
          <View style={styles.headerActions}>
            <ProfileBonusHeader
              amount={homeCopy.headerBonus}
              onProfilePress={go(profileHref(isGuest))}
            />
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            isGuest ? styles.scrollContentGuest : styles.scrollContentAuthorized,
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View onLayout={onCarouselViewportLayout} style={styles.carouselViewport}>
            <ScrollView
              horizontal
              nestedScrollEnabled
              decelerationRate="fast"
              snapToInterval={snapInterval}
              snapToAlignment="start"
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bannersTrack}
              onScroll={onBannersScroll}
              scrollEventThrottle={16}
            >
              {homePromoBanners.map((banner) => (
                <View
                  key={banner.id}
                  style={[styles.banner, { width: cardWidth, backgroundColor: banner.cardBackground }]}
                >
                  <View style={styles.bannerTextCol}>
                    <Text style={[styles.bannerTitle, { color: banner.titleColor }]} numberOfLines={3}>
                      {banner.title}
                    </Text>
                    {banner.accent ? <Text style={styles.bannerAccent}>{banner.accent}</Text> : null}
                  </View>
                  <View style={[styles.bannerLogoSlot, { backgroundColor: banner.logoBackground }]}>
                    <Image source={banner.logo} style={styles.bannerLogo} resizeMode="contain" />
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.bannerDots}>
            {homePromoBanners.map((banner, index) => (
              <View key={banner.id} style={[styles.dot, index === bannerIndex && styles.dotOn]} />
            ))}
          </View>

          <View onLayout={onCarouselViewportLayout} style={styles.carouselViewport}>
            <ScrollView
              horizontal
              nestedScrollEnabled
              decelerationRate="fast"
              snapToInterval={snapInterval}
              snapToAlignment="start"
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.accountsTrack}
              onScroll={onAccountsScroll}
              scrollEventThrottle={16}
            >
              {accountCards.map((account) => (
                <View key={account.id} style={[styles.balance, { width: cardWidth }]}>
                  <View style={styles.balanceText}>
                    <View style={styles.balanceLabelRow}>
                      <Text style={styles.balanceLabel}>{account.label}</Text>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={balancesHidden ? homeCopy.showBalance : homeCopy.hideBalance}
                        onPress={() => setBalancesHidden((value) => !value)}
                        style={styles.hideBtn}
                        hitSlop={8}
                      >
                        <EyeGlyph hidden={balancesHidden} />
                        <Text style={styles.hideLabel}>
                          {balancesHidden ? homeCopy.showBalance : homeCopy.hideBalance}
                        </Text>
                      </Pressable>
                    </View>
                    <Text style={styles.balanceAmount}>
                      {balancesHidden ? '••••••' : account.amount}
                    </Text>
                  </View>
                  <View style={styles.balanceActions}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={accountsCopy.topUp}
                      onPress={onTopup}
                      style={styles.actionBtn}
                    >
                      <TopupGlyph />
                      <Text style={styles.actionLabel}>{accountsCopy.topUp}</Text>
                    </Pressable>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={homeCopy.withdrawAction}
                      onPress={onWithdraw}
                      style={styles.actionBtn}
                    >
                      <WithdrawGlyph />
                      <Text style={styles.actionLabel}>{homeCopy.withdrawAction}</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.dots}>
            {accountCards.map((account, index) => (
              <View key={account.id} style={[styles.dot, index === accountIndex && styles.dotOn]} />
            ))}
          </View>

          <View style={styles.sectionHead}>
            <Text style={styles.section}>{homeCopy.services}</Text>
            <Pressable accessibilityRole="button" onPress={go(HOME_BRIDGES.payment)}>
              <Text style={styles.link}>{homeCopy.seeAll}</Text>
            </Pressable>
          </View>

          <View style={styles.servicesCard}>
            {homeServicesPreview.map((service, index) => (
              <View key={service.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={service.name}
                  onPress={() => onServicePress(service.id)}
                  style={styles.serviceRow}
                >
                  <View style={[styles.serviceIconSlot, { backgroundColor: service.background }]}>
                    <Image source={service.logo} style={styles.serviceLogo} resizeMode="contain" />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  {service.badge ? <Text style={styles.serviceBadge}>{service.badge}</Text> : null}
                </Pressable>
              </View>
            ))}
          </View>

          <View style={styles.sectionHead}>
            <Text style={styles.section}>{homeCopy.history}</Text>
            <Pressable
              accessibilityRole="button"
              onPress={go(historyLink === 'filter' ? HISTORY_BRIDGES.filter : HISTORY_BRIDGES.root)}
            >
              <Text style={styles.link}>{historyAction}</Text>
            </Pressable>
          </View>

          <View style={styles.historyCard}>
            {preview.map((row, index) => (
              <View key={row.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <HistoryRowView row={row} onPress={() => onHistoryRowPress(row)} />
              </View>
            ))}
          </View>
        </ScrollView>

        {isGuest ? (
          <View style={styles.guestCtaBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={authCopy.loginAction}
              onPress={go(HOME_BRIDGES.login)}
              style={styles.guestCta}
            >
              <Text style={styles.guestCtaLabel}>{authCopy.loginAction}</Text>
              <Text style={styles.guestCtaArrow}>→</Text>
            </Pressable>
          </View>
        ) : (
          <LegacyTabBar active="home" />
        )}
      </SafeAreaView>
      <WithdrawSelectSheet
        visible={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        requireAuth={isGuest}
      />
      <TopupSelectSheet
        visible={topupOpen}
        onClose={() => setTopupOpen(false)}
        requireAuth={isGuest}
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

function HistoryRowView({ row, onPress }: { row: HomeHistoryRow; onPress: () => void }) {
  const amountIn = row.direction === 'in' || row.amount.trim().startsWith('+');
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={styles.row}>
      <HomeHistoryIcon row={row} />
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={1}>
          {row.title}
        </Text>
        {row.status ? <Text style={styles.rowStatus}>{row.status}</Text> : null}
      </View>
      {row.amount ? (
        <Text
          style={[
            styles.rowAmount,
            row.amountEmphasis && styles.rowAmountEmph,
            amountIn && styles.rowAmountIn,
          ]}
        >
          {row.amount}
        </Text>
      ) : null}
    </Pressable>
  );
}

function HomeHistoryIcon({ row }: { row: HomeHistoryRow }) {
  if (row.icon === 'gift') {
    return (
      <View style={styles.giftSlot}>
        <GiftGlyph />
      </View>
    );
  }
  if (row.icon === 'ubet' || row.icon === 'phone' || row.icon === 'card') {
    return <HistoryListIconView icon={row.icon} size="md" />;
  }
  return <HistoryArrow direction={row.direction} tone={row.tone} />;
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
  scroll: { flex: 1, backgroundColor: legacyColor.homeBackground },
  scrollContent: { paddingTop: 15, paddingBottom: 16 },
  scrollContentGuest: { paddingBottom: 96 },
  scrollContentAuthorized: { paddingBottom: 88 },
  carouselViewport: { overflow: 'hidden' },
  bannersTrack: {
    paddingHorizontal: legacySpace.screenX,
    gap: ACCOUNT_GAP,
  },
  banner: {
    minHeight: 118,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerTextCol: {
    flex: 1,
    gap: 8,
  },
  bannerTitle: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    letterSpacing: -0.2,
    fontFamily: legacyFontFamily,
  },
  bannerAccent: {
    alignSelf: 'flex-start',
    fontSize: 13,
    lineHeight: 17,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.78)',
    fontFamily: legacyFontFamily,
  },
  bannerLogoSlot: {
    width: 72,
    height: 72,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerLogo: {
    width: '100%',
    height: '100%',
  },
  bannerDots: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  accountsTrack: {
    paddingHorizontal: legacySpace.screenX,
    gap: ACCOUNT_GAP,
  },
  balance: {
    height: 90,
    borderRadius: legacyRadius.field,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceText: { flex: 1, marginRight: 12 },
  balanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  balanceLabel: { ...legacyType.field, color: legacyColor.textSecondary },
  hideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hideLabel: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: legacyColor.primary,
    fontFamily: legacyFontFamily,
  },
  balanceAmount: { ...legacyType.homeBalance, color: legacyColor.textPrimary, marginTop: 0 },
  balanceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minWidth: 64,
  },
  actionLabel: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    color: legacyColor.primary,
    fontFamily: legacyFontFamily,
  },
  guestCtaBar: {
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: legacyColor.homeBackground,
  },
  guestCta: {
    height: 52,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.primary,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  guestCtaLabel: {
    ...legacyType.cta,
    color: legacyColor.primaryOnPrimary,
  },
  guestCtaArrow: {
    fontSize: 22,
    lineHeight: 24,
    color: legacyColor.primaryOnPrimary,
    fontFamily: legacyFontFamily,
  },
  dots: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: legacyColor.border,
  },
  dotOn: {
    backgroundColor: legacyColor.primary,
    width: 16,
    borderRadius: 3,
  },
  sectionHead: {
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: legacySpace.screenX,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section: { ...legacyType.homeSection, color: legacyColor.textPrimary },
  link: { ...legacyType.caption, color: legacyColor.primary },
  servicesCard: {
    marginHorizontal: legacySpace.screenX,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: legacyRadius.field,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  serviceRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceIconSlot: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: legacyColor.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  serviceLogo: {
    width: '100%',
    height: '100%',
  },
  serviceName: { ...legacyType.field, color: legacyColor.textPrimary, flex: 1 },
  serviceBadge: { ...legacyType.caption, color: legacyColor.logoGreen },
  historyCard: {
    marginHorizontal: legacySpace.screenX,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: legacyRadius.field,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginLeft: 52,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
  },
  giftSlot: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: legacyColor.accountIconBg,
    borderWidth: 1,
    borderColor: legacyColor.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1, minWidth: 0 },
  rowTitle: { ...legacyType.field, color: legacyColor.textPrimary },
  rowStatus: { ...legacyType.body, color: legacyColor.textSecondary, marginTop: 2 },
  rowAmount: { ...legacyType.field, color: legacyColor.textTertiary },
  rowAmountEmph: { color: legacyColor.textPrimary },
  rowAmountIn: { color: legacyColor.logoGreen },
  jumps: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  jump: {
    backgroundColor: legacyColor.field,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: legacyColor.border,
  },
  jumpLabel: { color: legacyColor.textPrimary, fontSize: 13 },
});
