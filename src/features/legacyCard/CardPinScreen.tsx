import { Pressable, StyleSheet, View } from 'react-native';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';

import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { cardCopy } from '@/features/legacyCard/copy';
import { CARD_BRIDGES } from '@/features/legacyCard/mockData';
import { useLegacyCardStore } from '@/features/legacyCard/store';
import { PinView } from '@/features/legacyAuth/screens/PinView';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

export function CardPinScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.cardPin);
  const pinPhase = useLegacyCardStore((s) => s.pinPhase);
  const pinEntry = useLegacyCardStore((s) => s.pinEntry);
  const pinError = useLegacyCardStore((s) => s.pinError);
  const pinDigit = useLegacyCardStore((s) => s.pinDigit);
  const pinDelete = useLegacyCardStore((s) => s.pinDelete);
  const pinBack = useLegacyCardStore((s) => s.pinBack);

  const nodeId = pinPhase === 'old' ? '821:26267' : pinPhase === 'create' ? '821:26507' : '821:26587';
  const screenId = pinPhase === 'old' ? 'LGC-SCR-057' : pinPhase === 'create' ? 'LGC-SCR-059' : 'LGC-SCR-060';
  const title =
    pinPhase === 'old' ? cardCopy.pinOld : pinPhase === 'create' ? cardCopy.pinCreate : cardCopy.pinRepeat;

  useScreenMeta({
    screenName: 'Legacy Card PIN',
    route: CARD_BRIDGES.pin,
    taskId: 'RECON-004',
    prototypeStatus: 'in_progress',
    screenId,
    legacyNodeId: nodeId,
  });

  return (
    <DebugMetaHost route={CARD_BRIDGES.pin}>
      <View style={styles.host}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={() => {
            if (pinBack() === 'leave') {
              onBack();
            }
          }}
          style={styles.back}
        >
          <ChevronBackGlyph />
        </Pressable>
        <PinView
          title={title}
          filled={pinEntry.length}
          error={pinError}
          errorMessage={pinError ? cardCopy.pinMismatch : undefined}
          onDigit={(digit) => {
            pinDigit(digit);
            if (useLegacyCardStore.getState().pinChanged) {
              onBack();
            }
          }}
          onDelete={pinDelete}
        />
      </View>
    </DebugMetaHost>
  );
}

const styles = StyleSheet.create({
  host: { flex: 1 },
  back: {
    position: 'absolute',
    zIndex: 2,
    top: 52,
    left: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
});
