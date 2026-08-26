import { Pressable, StyleSheet, View } from 'react-native';

import { ChevronBackGlyph } from '@/features/legacyAccounts/AccountIcons';
import { PinView } from '@/features/legacyAuth/screens/PinView';
import { LEGACY_BACK_FALLBACKS, useLegacyBack } from '@/features/legacyNavigation/safeBack';
import { profileCopy } from '@/features/legacyProfile/copy';
import { PROFILE_BRIDGES } from '@/features/legacyProfile/mockData';
import { useLegacyProfileStore } from '@/features/legacyProfile/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';

/** App login PIN change — reuses RECON-001 PinView; not card PIN (RECON-004). */
export function ChangePinScreen() {
  const onBack = useLegacyBack(LEGACY_BACK_FALLBACKS.profilePin);
  const pinPhase = useLegacyProfileStore((s) => s.pinPhase);
  const pinDraft = useLegacyProfileStore((s) => s.pinDraft);
  const pinRepeat = useLegacyProfileStore((s) => s.pinRepeat);
  const append = useLegacyProfileStore((s) => s.appendPinDigit);
  const del = useLegacyProfileStore((s) => s.deletePinDigit);

  useScreenMeta({
    screenName: 'Legacy Change app PIN',
    route: PROFILE_BRIDGES.pin,
    taskId: 'RECON-009',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR-124',
    legacyNodeId: '648:19215',
  });

  const title = pinPhase === 'create' ? profileCopy.pinCreateTitle : profileCopy.pinRepeatTitle;
  const support = pinPhase === 'create' ? profileCopy.pinCreateSupport : profileCopy.pinRepeatSupport;
  const filled = pinPhase === 'create' ? pinDraft.length : pinRepeat.length;

  return (
    <DebugMetaHost route={PROFILE_BRIDGES.pin}>
      <View style={styles.host}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Назад"
          onPress={() => {
            useLegacyProfileStore.getState().resetPinChange();
            onBack();
          }}
          style={styles.back}
        >
          <ChevronBackGlyph />
        </Pressable>
        <PinView
          title={title}
          support={support}
          filled={filled}
          previousFilled={pinPhase !== 'create' ? 6 : undefined}
          error={pinPhase === 'error'}
          errorMessage={pinPhase === 'error' ? profileCopy.pinErrorMessage : undefined}
          onDigit={(digit) => {
            if (append(digit)) {
              onBack();
            }
          }}
          onDelete={del}
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
