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
  ProfileBonusHeader,
  TopupGlyph,
  WithdrawGlyph,
} from '@/features/legacyHome/HomeIcons';
import { homeCopy, homePromoBanners } from '@/features/legacyHome/copy';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import {
  GUEST_RECENT_OPERATION,
  homeRecentOperationsPreview,
} from '@/features/legacyHome/recentOperationsPreview';
import {
  HOME_RECENT_OPERATIONS_LIMIT,
  type PaymentsTab,
  PAYMENTS_TABS,
  recentOperationPaymentHref,
  resolvePaymentsSegmentHref,
} from '@/features/legacyHome/paymentsSegment';
import { WithdrawSelectSheet } from '@/features/legacyHome/WithdrawSelectSheet';
import { HOME_BRIDGES } from '@/features/legacyHome/mockData';
import { resolveHomeScreenMeta, HOME_HISTORY_LINK_FILTER_ALIAS } from '@/features/legacyHome/homeScreenMeta';
import { profileHref, navigateHome, useLegacySessionStore } from '@/features/legacyHome/session';
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

const RECENT_OPERATIONS_PREVIEW = homeRecentOperationsPreview(HOME_RECENT_OPERATIONS_LIMIT);

type Props = {
  /** Guest Home (HOME-001) vs authorized Home (HOME-002). */
  variant?: 'authorized' | 'guest';
  /** Open top-up method sheet on mount (LOCAL_DRAFT / capture). */
  openTopup?: boolean;
};

export function LegacyHomeScreen({
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
  const homeScreenMeta = resolveHomeScreenMeta(isGuest);
  const [paymentsTab, setPaymentsTab] = useState<PaymentsTab>('recent');
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
    screenId: homeScreenMeta.screenId,
    legacyNodeId: homeScreenMeta.legacyNodeId,
  });

  const go = (href: string) => () => router.push(href as never);

  const onTopup = () => setTopupOpen(true);
  const onWithdraw = () => setWithdrawOpen(true);

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
          <Jump
            label="Home historyLink alias"
            onPress={() => router.replace(HOME_HISTORY_LINK_FILTER_ALIAS as never)}
          />
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
          style={[styles.scroll, styles.scrollFitContent]}
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

          <View style={styles.paymentsPlaque}>
            <View style={styles.paymentsSegmentTrack}>
              {PAYMENTS_TABS.map((tab) => {
                const active = paymentsTab === tab.id;
                return (
                  <Pressable
                    key={tab.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    accessibilityLabel={homeCopy[tab.labelKey]}
                    onPress={() => {
                      const href = resolvePaymentsSegmentHref(tab.id, isGuest);
                      if (href === null) {
                        setPaymentsTab('recent');
                        return;
                      }
                      router.push(href as never);
                    }}
                    style={[styles.paymentsSegment, active && styles.paymentsSegmentActive]}
                  >
                    <Text
                      style={[styles.paymentsSegmentLabel, active && styles.paymentsSegmentLabelActive]}
                    >
                      {homeCopy[tab.labelKey]}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.paymentsList}>
            {isGuest ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={GUEST_RECENT_OPERATION.title}
                onPress={go(HOME_BRIDGES.login)}
                style={styles.recentRow}
              >
                <View style={styles.giftSlot}>
                  <GiftGlyph />
                </View>
                <View style={styles.recentTextCol}>
                  <View style={styles.recentTitleRow}>
                    <Text style={styles.recentName} numberOfLines={1}>
                      {GUEST_RECENT_OPERATION.title}
                    </Text>
                    <Text style={[styles.recentAmount, styles.recentAmountBonus]}>
                      {GUEST_RECENT_OPERATION.amount}
                    </Text>
                  </View>
                  <Text style={styles.recentPhone} numberOfLines={2}>
                    {GUEST_RECENT_OPERATION.subtitle}
                  </Text>
                </View>
              </Pressable>
            ) : (
              RECENT_OPERATIONS_PREVIEW.map((row, index) => (
                <View key={row.id}>
                  {index > 0 ? <View style={styles.divider} /> : null}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${row.name} ${row.phone}`}
                    onPress={() => router.push(recentOperationPaymentHref(row) as never)}
                    style={styles.recentRow}
                  >
                    <View style={[styles.serviceIconSlot, { backgroundColor: row.logoBackground }]}>
                      <Image source={row.logo} style={styles.serviceLogo} resizeMode="contain" />
                    </View>
                    <View style={styles.recentTextCol}>
                      <View style={styles.recentTitleRow}>
                        <Text style={styles.recentName} numberOfLines={1}>
                          {row.name}
                        </Text>
                        <Text style={styles.recentAmount}>{row.amount}</Text>
                      </View>
                      <View style={styles.recentSubtitleRow}>
                        <Text style={styles.recentPhone} numberOfLines={1}>
                          {row.phone}
                        </Text>
                        <Text style={styles.recentBonus}>{row.bonus}</Text>
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))
            )}
            </View>
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
    </DebugMetaHost>
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
  scroll: { flex: 1, backgroundColor: legacyColor.homeBackground },
  scrollFitContent: { flex: 0, flexShrink: 1 },
  scrollContent: { paddingTop: 15, paddingBottom: 16 },
  scrollContentGuest: { paddingBottom: 8 },
  scrollContentAuthorized: { paddingBottom: 8 },
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
  paymentsPlaque: {
    marginTop: 30,
    marginHorizontal: legacySpace.screenX,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: legacyRadius.field,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  paymentsSegmentTrack: {
    flexDirection: 'row',
    backgroundColor: legacyColor.homeBackground,
    borderRadius: 10,
    padding: 3,
    marginBottom: 10,
  },
  paymentsSegment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  paymentsSegmentActive: {
    backgroundColor: legacyColor.surface,
    shadowColor: '#1226AA',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  paymentsSegmentLabel: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '600',
    color: legacyColor.textSecondary,
    fontFamily: legacyFontFamily,
  },
  paymentsSegmentLabelActive: {
    color: legacyColor.primary,
  },
  paymentsList: {
    paddingTop: 2,
  },
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
  recentRow: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  recentTextCol: { flex: 1, minWidth: 0, gap: 2 },
  recentTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  recentName: { ...legacyType.field, color: legacyColor.textPrimary, flex: 1 },
  recentSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  recentPhone: { ...legacyType.body, color: legacyColor.textSecondary, flex: 1 },
  recentAmount: { ...legacyType.field, color: legacyColor.textPrimary },
  recentBonus: { ...legacyType.caption, color: legacyColor.logoGreen },
  recentAmountBonus: { color: legacyColor.logoGreen },
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
