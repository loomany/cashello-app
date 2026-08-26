import { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { homeCopy } from '@/features/legacyHome/copy';
import { CashhelloBrand, ChevronRightGlyph, ProfileBonusHeader, SearchGlyph } from '@/features/legacyHome/HomeIcons';
import { LegacyTabBar } from '@/features/legacyHome/LegacyTabBar';
import { homeHref, profileHref, useLegacySessionStore } from '@/features/legacyHome/session';
import { paymentCopy } from '@/features/legacyPayment/copy';
import { PaymentCategorySheet } from '@/features/legacyPayment/PaymentCategorySheet';
import {
  PAYMENT_BRIDGES,
  PAYMENT_CATEGORIES,
  PAYMENT_SECTIONS,
  type PaymentCategoryId,
  type PaymentService,
  type PaymentTab,
} from '@/features/legacyPayment/mockData';
import { useLegacyPaymentStore } from '@/features/legacyPayment/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

function CategoryGlyph() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={7} cy={7} r={2.4} fill={legacyColor.primary} />
      <Circle cx={15} cy={7} r={2.4} fill={legacyColor.primary} />
      <Circle cx={11} cy={15} r={2.4} fill={legacyColor.primary} />
    </Svg>
  );
}

function ChevronDownGlyph({ color = legacyColor.primary }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Path
        d="M4.5 6.5L9 11l4.5-4.5"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ChevronUpGlyph() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Path
        d="M4.5 11.5L9 7l4.5 4.5"
        stroke={legacyColor.primary}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

function ServiceRow({ item, onPress }: { item: PaymentService; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={item.name}
      disabled={!item.available}
      onPress={onPress}
      style={[styles.serviceRow, !item.available && styles.serviceRowSoon]}
    >
      <View style={[styles.logoSlot, { backgroundColor: item.logoBackground }]}>
        <Image source={item.logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.serviceCopy}>
        <Text style={styles.serviceName}>{item.name}</Text>
        {item.subtitle ? <Text style={styles.serviceSub}>{item.subtitle}</Text> : null}
      </View>
      <ChevronRightGlyph />
    </Pressable>
  );
}

export function PaymentScreen() {
  const router = useRouter();
  const isGuest = useLegacySessionStore((s) => s.isGuest);
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<PaymentTab>('all');
  const [categoryId, setCategoryId] = useState<PaymentCategoryId>('all');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    bookmakers: true,
    digital: true,
    mfo: true,
  });
  const favorites = useLegacyPaymentStore((s) => s.favorites);

  useScreenMeta({
    screenName: 'Legacy Payment',
    route: PAYMENT_BRIDGES.root,
    taskId: 'LOCAL_DRAFT',
    prototypeStatus: 'in_progress',
    screenId: 'PAY-001',
  });

  const categoryLabel =
    PAYMENT_CATEGORIES.find((c) => c.id === categoryId)?.label ?? paymentCopy.categoryAll;

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PAYMENT_SECTIONS.map((section) => {
      let items = section.items;
      if (categoryId !== 'all' && section.id !== categoryId) items = [];
      if (tab === 'favorites') items = items.filter((i) => favorites[i.id]);
      if (q) items = items.filter((i) => i.name.toLowerCase().includes(q));
      return { ...section, items };
    }).filter((s) => s.items.length > 0);
  }, [query, tab, categoryId, favorites]);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onService = (item: PaymentService) => {
    if (!item.available) return;
    router.push(PAYMENT_BRIDGES.service(item.id) as never);
  };

  return (
    <DebugMetaHost route={PAYMENT_BRIDGES.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.shell}>
          <View style={styles.header}>
            <CashhelloBrand onPress={() => router.replace(homeHref(isGuest) as never)} />
            <ProfileBonusHeader
              amount={homeCopy.headerBonus}
              onProfilePress={() => router.push(profileHref(isGuest) as never)}
            />
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.filtersCard}>
              <View style={styles.searchRow}>
                <SearchGlyph />
                <TextInput
                  style={styles.searchInput}
                  value={query}
                  onChangeText={setQuery}
                  placeholder={paymentCopy.searchPlaceholder}
                  placeholderTextColor={legacyColor.textTertiary}
                  accessibilityLabel={paymentCopy.searchPlaceholder}
                  returnKeyType="search"
                />
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`${paymentCopy.categoryLabel}: ${categoryLabel}`}
                onPress={() => setCategoryOpen(true)}
                style={styles.categoryRow}
              >
                <CategoryGlyph />
                <View style={styles.categoryCopy}>
                  <Text style={styles.categoryLabel}>{paymentCopy.categoryLabel}</Text>
                  <Text style={styles.categoryValue}>{categoryLabel}</Text>
                </View>
                <ChevronDownGlyph />
              </Pressable>
            </View>

          <View style={styles.tabs}>
            {(
              [
                ['all', paymentCopy.tabAll],
                ['favorites', paymentCopy.tabFavorites],
              ] as const
            ).map(([id, label]) => {
              const active = tab === id;
              return (
                <Pressable
                  key={id}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setTab(id)}
                  style={[styles.tab, active && styles.tabActive]}
                >
                  <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
                </Pressable>
              );
            })}
          </View>

          {tab === 'favorites' && sections.every((s) => s.items.length === 0) ? (
            <Text style={styles.empty}>{paymentCopy.emptyFavorites}</Text>
          ) : null}

          {sections.map((section) => {
                if (section.items.length === 0) return null;
                const open = openSections[section.id] !== false;
                return (
                  <View key={section.id} style={styles.sectionBlock}>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => toggleSection(section.id)}
                      style={styles.sectionHead}
                    >
                      <Text style={styles.sectionTitle}>{section.title}</Text>
                      {open ? <ChevronUpGlyph /> : <ChevronDownGlyph />}
                    </Pressable>
                    {open
                      ? section.items.map((item) => (
                          <ServiceRow key={item.id} item={item} onPress={() => onService(item)} />
                        ))
                      : null}
                  </View>
                );
              })}
          </ScrollView>

          <LegacyTabBar active="payment" />

          <PaymentCategorySheet
            visible={categoryOpen}
            selected={categoryId}
            onClose={() => setCategoryOpen(false)}
            onSelect={setCategoryId}
          />
        </View>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  shell: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 18,
    minHeight: 36,
  },
  scroll: { flex: 1 },
  content: { paddingHorizontal: legacySpace.screenX, paddingTop: 16, paddingBottom: 28 },
  filtersCard: {
    backgroundColor: legacyColor.surface,
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    padding: 12,
    gap: 10,
  },
  searchRow: {
    minHeight: 48,
    borderRadius: legacyRadius.field,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.accountIconBg,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    ...legacyType.field,
    color: legacyColor.textPrimary,
    padding: 0,
  },
  categoryRow: {
    minHeight: 52,
    borderRadius: legacyRadius.field,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryCopy: { flex: 1, gap: 2 },
  categoryLabel: { ...legacyType.floating, color: legacyColor.primary },
  categoryValue: { ...legacyType.field, color: legacyColor.textPrimary },
  tabs: {
    marginTop: 14,
    flexDirection: 'row',
    backgroundColor: legacyColor.accountIconBg,
    borderRadius: 999,
    padding: 4,
    gap: 4,
  },
  tab: {
    flex: 1,
    minHeight: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.primary,
  },
  tabLabel: { ...legacyType.caption, color: legacyColor.textPrimary, fontWeight: '600' },
  tabLabelActive: { color: legacyColor.primary },
  empty: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    marginTop: 24,
    textAlign: 'center',
  },
  sectionBlock: { marginTop: 22, gap: 10 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  sectionTitle: { ...legacyType.field, color: legacyColor.textPrimary, fontWeight: '700' },
  serviceRow: {
    minHeight: 68,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceRowSoon: {
    borderColor: legacyColor.accountIconBg,
    backgroundColor: legacyColor.surface,
  },
  logoSlot: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: legacyColor.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  serviceCopy: { flex: 1, gap: 3 },
  serviceName: { ...legacyType.field, color: legacyColor.textPrimary, fontWeight: '700' },
  serviceSub: { ...legacyType.caption, color: legacyColor.primary },
});
