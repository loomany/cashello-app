import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import {
  ApplePayGlyph,
  FilterGlyph,
  GooglePayGlyph,
  LockGlyph,
  PinGridGlyph,
} from '@/features/legacyCard/CardIcons';
import { CardActionRow } from '@/features/legacyCard/CardActionRow';
import { CardVisual } from '@/features/legacyCard/CardVisual';
import { cardCopy } from '@/features/legacyCard/copy';
import { CARD_BRIDGES } from '@/features/legacyCard/mockData';
import { useLegacyCardStore } from '@/features/legacyCard/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function CardScreen() {
  const router = useRouter();
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.card);
  const face = useLegacyCardStore((s) => s.face);
  const blockSheetOpen = useLegacyCardStore((s) => s.blockSheetOpen);
  const toggleCvv = useLegacyCardStore((s) => s.toggleCvv);
  const openBlockSheet = useLegacyCardStore((s) => s.openBlockSheet);
  const closeBlockSheet = useLegacyCardStore((s) => s.closeBlockSheet);
  const confirmBlock = useLegacyCardStore((s) => s.confirmBlock);
  const startPin = useLegacyCardStore((s) => s.startPin);
  const tapApplePay = useLegacyCardStore((s) => s.tapApplePay);
  const tapGooglePay = useLegacyCardStore((s) => s.tapGooglePay);

  const screenId = blockSheetOpen ? 'LGC-SCR-037' : face === 'cvv' ? 'LGC-SCR-036' : 'LGC-SCR-035';
  const nodeId = blockSheetOpen ? '648:20509' : face === 'cvv' ? '648:20578' : '648:20359';

  useScreenMeta({
    screenName: 'Legacy Card',
    route: CARD_BRIDGES.root,
    taskId: 'RECON-004',
    prototypeStatus: 'in_progress',
    screenId,
    legacyNodeId: nodeId,
  });

  return (
    <DebugMetaHost route={CARD_BRIDGES.root}>
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} style={styles.back}>
          <ChevronBackGlyph />
        </Pressable>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{cardCopy.title}</Text>
          <View style={styles.cardWrap}>
            <CardVisual face={face} onToggleCvv={toggleCvv} />
          </View>

          <Text style={styles.section}>{cardCopy.settings}</Text>
          <View style={styles.group}>
            <CardActionRow label={cardCopy.block} icon={<LockGlyph />} onPress={openBlockSheet} />
            <CardActionRow
              label={cardCopy.limits}
              icon={<FilterGlyph />}
              onPress={() => router.push(CARD_BRIDGES.limits as never)}
            />
            <CardActionRow
              label={cardCopy.changePin}
              icon={<PinGridGlyph />}
              last
              onPress={() => {
                startPin();
                router.push(CARD_BRIDGES.pin as never);
              }}
            />
          </View>

          <Text style={styles.section}>{cardCopy.other}</Text>
          <View style={styles.group}>
            <CardActionRow label={cardCopy.applePay} icon={<ApplePayGlyph />} onPress={tapApplePay} />
            <CardActionRow label={cardCopy.googlePay} icon={<GooglePayGlyph />} last onPress={tapGooglePay} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <Modal animationType="fade" transparent visible={blockSheetOpen} onRequestClose={closeBlockSheet}>
        <View style={styles.sheetRoot}>
          <Pressable style={styles.overlayFlex} onPress={closeBlockSheet} />
          <View style={styles.sheet}>
            <Text style={styles.alertTitle}>{cardCopy.blockTitle}</Text>
            <Text style={styles.alertBody}>{cardCopy.blockBody}</Text>
            <View style={styles.sep} />
            <Pressable accessibilityRole="button" onPress={confirmBlock} style={styles.sheetAction}>
              <Text style={styles.danger}>{cardCopy.block}</Text>
            </Pressable>
          </View>
          <Pressable accessibilityRole="button" onPress={closeBlockSheet} style={styles.cancelBtn}>
            <Text style={styles.cancelLabel}>{cardCopy.cancel}</Text>
          </Pressable>
        </View>
      </Modal>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.homeBackground },
  back: { paddingHorizontal: legacySpace.screenX, paddingTop: 8, height: 40, justifyContent: 'center' },
  scroll: { paddingHorizontal: legacySpace.screenX, paddingBottom: 40 },
  title: { ...legacyType.title, color: legacyColor.textPrimary, marginTop: 4 },
  cardWrap: { marginTop: 24, alignItems: 'center' },
  section: { ...legacyType.field, color: legacyColor.historyLabel, marginTop: 24, marginBottom: 10 },
  group: {
    backgroundColor: legacyColor.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: legacyColor.cardGroupBorder,
    overflow: 'hidden',
  },
  sheetRoot: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 7, paddingBottom: 10 },
  overlayFlex: { ...StyleSheet.absoluteFill, backgroundColor: legacyColor.overlay, zIndex: 0 },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    paddingTop: 16,
    zIndex: 1,
  },
  alertTitle: { ...legacyType.alertTitle, color: '#000000', textAlign: 'center' },
  alertBody: {
    ...legacyType.alertBody,
    color: legacyColor.sheetBody,
    textAlign: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: '#3C3C435C', alignSelf: 'stretch', marginTop: 8 },
  sheetAction: { height: 56, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center' },
  danger: { fontSize: 17, lineHeight: 22, color: legacyColor.cardDanger, letterSpacing: -0.4 },
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
});
