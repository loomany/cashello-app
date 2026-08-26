import { useMemo, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { SearchGlyph, SendArrowGlyph } from '@/features/legacyHome/HomeIcons';
import { searchCopy } from '@/features/legacySearch/copy';
import {
  CANONICAL_SEARCH_ACTIONS,
  matchSearchActions,
  SEARCH_BRIDGES,
  type SearchAction,
} from '@/features/legacySearch/mockData';
import { TimeGlyph } from '@/features/legacySearch/SearchIcons';
import { useLegacySearchStore } from '@/features/legacySearch/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

function actionForTitle(title: string): SearchAction | undefined {
  return CANONICAL_SEARCH_ACTIONS.find((a) => a.title === title);
}

export function SearchScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.search);
  const inputRef = useRef<TextInput>(null);
  const query = useLegacySearchStore((s) => s.query);
  const recent = useLegacySearchStore((s) => s.recent);
  const setQuery = useLegacySearchStore((s) => s.setQuery);
  const clearQuery = useLegacySearchStore((s) => s.clearQuery);
  const remember = useLegacySearchStore((s) => s.remember);

  useScreenMeta({
    screenName: 'Legacy Search',
    route: '/legacy/search',
    taskId: 'RECON-008',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-061',
    legacyNodeId: '736:48670',
  });

  const trimmed = query.trim();
  const matches = useMemo(() => matchSearchActions(query), [query]);
  const showingResults = trimmed.length > 0;
  const rows: { key: string; title: string }[] = showingResults
    ? matches.map((a) => ({ key: a.id, title: a.title }))
    : recent.map((title) => ({ key: title, title }));

  const openAction = (title: string) => {
    const action = actionForTitle(title);
    remember(title);
    if (!action) return;
    if (action.deferred) {
      Alert.alert(
        searchCopy.deferredTitle,
        action.id === 'conversion' ? searchCopy.deferredConversion : searchCopy.deferredDelete,
      );
      return;
    }
    if (action.route) {
      router.push(action.route as never);
    }
  };

  return (
    <DebugMetaHost route="/legacy/search">
      <SafeAreaView style={styles.safe} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <View style={styles.field}>
              <SearchGlyph />
              <TextInput
                ref={inputRef}
                value={query}
                onChangeText={setQuery}
                placeholder={searchCopy.placeholder}
                placeholderTextColor={legacyColor.textSecondary}
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                accessibilityLabel={searchCopy.placeholder}
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={searchCopy.cancel}
              onPress={() => {
                clearQuery();
                onBack();
              }}
              hitSlop={8}
            >
              <Text style={styles.cancel}>{searchCopy.cancel}</Text>
            </Pressable>
          </View>

          {!showingResults ? <Text style={styles.section}>{searchCopy.recentSection}</Text> : null}

          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.list, showingResults && styles.listTight]}
            keyboardShouldPersistTaps="handled"
          >
            {showingResults && matches.length === 0 ? (
              <Text style={styles.empty}>{searchCopy.noResults}</Text>
            ) : (
              rows.map((row) => (
                <Pressable
                  key={row.key}
                  accessibilityRole="button"
                  onPress={() => openAction(row.title)}
                  style={styles.line}
                >
                  <View style={styles.row}>
                    <TimeGlyph />
                    <Text style={styles.query}>{row.title}</Text>
                  </View>
                  <View style={styles.divider} />
                </Pressable>
              ))
            )}
          </ScrollView>

          <View style={styles.ctaBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={searchCopy.withdraw}
              onPress={() => {
                remember(searchCopy.withdraw);
                router.push(SEARCH_BRIDGES.withdraw as never);
              }}
              style={styles.cta}
            >
              <Text style={styles.ctaLabel}>{searchCopy.withdraw}</Text>
              <SendArrowGlyph />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 20,
    gap: 15,
  },
  field: {
    width: 250,
    height: 45,
    borderRadius: legacyRadius.field,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 10,
  },
  input: {
    flex: 1,
    ...legacyType.field,
    color: legacyColor.textPrimary,
    padding: 0,
    margin: 0,
  },
  cancel: { ...legacyType.caption, color: legacyColor.primary },
  section: {
    ...legacyType.field,
    color: legacyColor.textSecondary,
    paddingHorizontal: legacySpace.screenX,
    marginTop: 30,
  },
  list: { paddingHorizontal: legacySpace.screenX, paddingTop: 20, paddingBottom: 24 },
  listTight: { paddingTop: 16 },
  line: { minHeight: 54, justifyContent: 'flex-end' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 12 },
  query: { ...legacyType.field, color: legacyColor.textPrimary },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: legacyColor.border },
  empty: {
    ...legacyType.body,
    color: legacyColor.textMuted,
    marginTop: 8,
  },
  ctaBar: {
    backgroundColor: legacyColor.surface,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 15,
    paddingBottom: 24,
  },
  cta: {
    height: 60,
    borderRadius: legacyRadius.button,
    backgroundColor: legacyColor.primary,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: legacyColor.primary,
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  ctaLabel: { ...legacyType.cta, color: legacyColor.primaryOnPrimary },
});
