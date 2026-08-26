import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, Mask, Path, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacyType } from '@/design/legacyTokens';

type Props = {
  instruction: string;
  onCancel: () => void;
  onCapture?: () => void;
  onContinue?: () => void;
  showCapture?: boolean;
  oval?: boolean;
};

export function CameraChrome({
  instruction,
  onCancel,
  onCapture,
  onContinue,
  showCapture = false,
  oval = false,
}: Props) {
  return (
    <Pressable style={styles.root} onPress={onContinue} disabled={!onContinue}>
      <View style={styles.camera}>
        <View style={styles.grainA} />
        <View style={styles.grainB} />
        <View style={styles.grainC} />
        {oval ? (
          <Svg width="375" height="812" viewBox="0 0 375 812" style={StyleSheet.absoluteFill}>
            <Defs>
              <Mask id="face-hole" x="0" y="0" width="100%" height="100%">
                <Rect x="0" y="0" width="100%" height="100%" fill="white" />
                <Ellipse cx="187.5" cy="360.5" rx="137.5" ry="228.5" fill="black" />
              </Mask>
            </Defs>
            <Rect x="0" y="0" width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#face-hole)" />
          </Svg>
        ) : null}
      </View>
      {showCapture ? (
        <View style={styles.docBar}>
          <Text style={styles.docHint}>{instruction}</Text>
          <View style={styles.docControls}>
            <Pressable onPress={onCancel} accessibilityLabel="Закрыть" style={styles.sideHit}>
              <Svg width={40} height={40} viewBox="0 0 40 40">
                <Circle cx={20} cy={20} r={20} fill="#686868" />
                <Path
                  fillRule="evenodd"
                  d="M14.2802 13.2197C13.9873 12.9268 13.5126 12.9268 13.2197 13.2197C12.9268 13.5126 12.9268 13.9873 13.2197 14.2802L19.392 20.4526L13.2197 26.6249C12.927 26.9178 12.9268 27.3927 13.2197 27.6855C13.5125 27.9782 13.9874 27.9782 14.2802 27.6855L20.4526 21.5131L26.625 27.6855C26.9179 27.9781 27.3927 27.9783 27.6855 27.6855C27.9783 27.3927 27.9781 26.9179 27.6855 26.6249L21.5131 20.4526L27.6855 14.2802C27.9782 13.9874 27.9782 13.5125 27.6855 13.2197C27.3927 12.9268 26.9179 12.9269 26.625 13.2197L20.4526 19.392L14.2802 13.2197Z"
                  fill="#FFFFFF"
                />
              </Svg>
            </Pressable>
            <Pressable accessibilityLabel="Снять" onPress={onCapture} style={styles.shutterOuter}>
              <Svg width={85} height={85} viewBox="0 0 85 85">
                <Path
                  d="M85 42.5C85 65.9721 65.9721 85 42.5 85C19.0279 85 0 65.9721 0 42.5C0 19.0279 19.0279 0 42.5 0C65.9721 0 85 19.0279 85 42.5ZM5.09211 42.5C5.09211 63.1598 21.8402 79.9079 42.5 79.9079C63.1598 79.9079 79.9079 63.1598 79.9079 42.5C79.9079 21.8402 63.1598 5.09211 42.5 5.09211C21.8402 5.09211 5.09211 21.8402 5.09211 42.5Z"
                  fill="#FFFFFF"
                />
              </Svg>
            </Pressable>
            <View style={styles.sideHit}>
              <Svg width={40} height={40} viewBox="0 0 40 40">
                <Circle cx={20} cy={20} r={20} fill="#686868" />
                <Path
                  fillRule="evenodd"
                  d="M20 13.6C18.1585 13.6 16.5005 14.4175 15.3546 15.7268C15.0637 16.0593 14.5582 16.093 14.2258 15.802C13.8933 15.511 13.8596 15.0056 14.1506 14.6732C15.5829 13.0365 17.6714 12 20 12C24.2937 12 27.7545 15.5114 27.8384 19.8391L28.228 19.4407C28.5369 19.1248 29.0434 19.1191 29.3593 19.428C29.6752 19.7369 29.6809 20.2434 29.372 20.5593L27.612 22.3593C27.4615 22.5132 27.2553 22.6 27.04 22.6C26.8247 22.6 26.6185 22.5132 26.468 22.3593L24.708 20.5593C24.3991 20.2434 24.4048 19.7369 24.7207 19.428C25.0366 19.1191 25.5431 19.1248 25.852 19.4407L26.238 19.8355C26.1528 16.3608 23.3763 13.6 20 13.6ZM12.96 17.4C13.1753 17.4 13.3815 17.4868 13.532 17.6407L15.292 19.4407C15.6009 19.7566 15.5952 20.2631 15.2793 20.572C14.9634 20.8809 14.4569 20.8752 14.148 20.5593L13.762 20.1645C13.8472 23.6392 16.6237 26.4 20 26.4C21.8415 26.4 23.4995 25.5825 24.6454 24.2732C24.9363 23.9407 25.4418 23.907 25.7742 24.198C26.1067 24.4889 26.1404 24.9944 25.8494 25.3268C24.4171 26.9635 22.3286 28 20 28C15.7063 28 12.2455 24.4886 12.1616 20.1609L11.772 20.5593C11.4631 20.8752 10.9566 20.8809 10.6407 20.572C10.3248 20.2631 10.3191 19.7566 10.628 19.4407L12.388 17.6407C12.5385 17.4868 12.7447 17.4 12.96 17.4Z"
                  fill="#FFFFFF"
                />
              </Svg>
            </View>
          </View>
        </View>
      ) : (
        <SafeAreaView edges={['top', 'bottom']} style={styles.ui}>
          <View />
          <View style={styles.faceFooter}>
            <Text style={styles.faceHint}>{instruction}</Text>
            <Pressable onPress={onCancel} accessibilityRole="button" style={styles.cancelWrap}>
              <Text style={styles.cancel}>{copyCancel}</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </Pressable>
  );
}

const copyCancel = 'Отмена';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: legacyColor.camera },
  camera: { ...StyleSheet.absoluteFill, backgroundColor: '#2A241C' },
  grainA: {
    position: 'absolute',
    top: 80,
    left: 40,
    width: 180,
    height: 220,
    borderRadius: 90,
    backgroundColor: 'rgba(90,70,50,0.45)',
  },
  grainB: {
    position: 'absolute',
    bottom: 160,
    right: 30,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(40,50,60,0.5)',
  },
  grainC: {
    position: 'absolute',
    top: 240,
    right: 80,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  ui: { flex: 1, justifyContent: 'space-between', width: '100%', pointerEvents: 'box-none' },
  faceFooter: { width: '100%' },
  faceHint: {
    ...legacyType.field,
    color: legacyColor.instruction,
    textAlign: 'center',
    marginBottom: 78,
  },
  cancelWrap: { alignSelf: 'flex-start', paddingLeft: 25, paddingBottom: 28 },
  cancel: { ...legacyType.field, color: '#FFFFFF' },
  docBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 185,
    backgroundColor: 'rgba(20,20,20,0.92)',
    alignItems: 'center',
    paddingTop: 15,
  },
  docHint: { ...legacyType.field, color: legacyColor.docHint, textAlign: 'center' },
  docControls: {
    marginTop: 24,
    width: '100%',
    paddingHorizontal: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideHit: { width: 40, height: 40 },
  shutterOuter: { width: 85, height: 85 },
});
