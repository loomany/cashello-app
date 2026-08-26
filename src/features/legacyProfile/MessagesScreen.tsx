import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { profileCopy } from '@/features/legacyProfile/copy';
import {
  buildMessageFeed,
  PROFILE_BRIDGES,
} from '@/features/legacyProfile/mockData';
import {
  UserMessageGlyph,
  WalletMessageGlyph,
} from '@/features/legacyProfile/ProfileIcons';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function MessagesScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.messages);
  const messages = useLegacyProfileStore((s) => s.messages);
  const feed = buildMessageFeed(messages);

  useScreenMeta({
    screenName: 'Legacy Notifications / Messages',
    route: PROFILE_BRIDGES.messages,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-125',
    legacyNodeId: '648:19263',
  });

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.messages}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <View style={styles.head}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Назад"
            onPress={onBack}
            hitSlop={8}
          >
            <ChevronBackGlyph />
          </Pressable>
          <Text style={styles.title}>{profileCopy.notificationsTitle}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={profileCopy.filter}
            onPress={() => Alert.alert(profileCopy.filter, profileCopy.filterUnavailable)}
            hitSlop={8}
          >
            <Text style={styles.filter}>{profileCopy.filter}</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
          {feed.map((item, index) => {
            if (item.kind === 'date') {
              return (
                <View key={`d-${item.label}-${index}`} style={styles.dateWrap}>
                  <View style={styles.dateChip}>
                    <Text style={styles.dateText}>{item.label}</Text>
                  </View>
                </View>
              );
            }
            const { message } = item;
            const isUser = message.alignment === 'user';
            return (
              <View
                key={message.id}
                style={[styles.row, isUser ? styles.rowUser : styles.rowSystem]}
              >
                {!isUser ? <WalletMessageGlyph /> : null}
                <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleSystem]}>
                  <Text style={styles.msgTitle}>{message.title}</Text>
                  <Text style={styles.msgSub}>{message.subtitle}</Text>
                  <View style={styles.msgFooter}>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={profileCopy.helpAction}
                      onPress={() => router.push(PROFILE_BRIDGES.help as never)}
                      style={styles.helpBtn}
                    >
                      <Text style={styles.helpBtnText}>{profileCopy.helpAction}</Text>
                    </Pressable>
                    <Text style={styles.time}>{message.time}</Text>
                  </View>
                </View>
                {isUser ? <UserMessageGlyph /> : null}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  head: {
    height: 61,
    backgroundColor: legacyColor.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: legacyColor.border,
    paddingHorizontal: legacySpace.screenX,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 20, lineHeight: 26, fontWeight: '600', color: legacyColor.textPrimary },
  filter: { ...legacyType.field, color: legacyColor.primary },
  list: { paddingHorizontal: legacySpace.screenX, paddingTop: 15, paddingBottom: 40, gap: 15 },
  dateWrap: { alignItems: 'center' },
  dateChip: {
    minWidth: 95,
    height: 25,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  dateText: { fontSize: 12, lineHeight: 18, fontWeight: '500', color: legacyColor.textPrimary },
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  rowSystem: { justifyContent: 'flex-start' },
  rowUser: { justifyContent: 'flex-end' },
  bubble: {
    width: 220,
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.messageBubbleBorder,
    padding: 15,
    gap: 5,
  },
  bubbleSystem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  bubbleUser: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  msgTitle: { fontSize: 14, lineHeight: 18, fontWeight: '600', color: legacyColor.textPrimary },
  msgSub: { fontSize: 14, lineHeight: 18, fontWeight: '400', color: legacyColor.textSecondary },
  msgFooter: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  helpBtn: {
    backgroundColor: legacyColor.downloadBtn,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 28,
    justifyContent: 'center',
  },
  helpBtnText: { fontSize: 14, lineHeight: 18, fontWeight: '500', color: legacyColor.primary },
  time: { fontSize: 12, lineHeight: 14, color: legacyColor.messageTime },
});
