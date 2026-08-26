import { Pressable, StyleSheet, Text, View } from 'react-native';

import { legacyColor, legacyRadius, legacyType } from '@/design/legacyTokens';
import { CameraChrome } from '@/features/legacyAuth/components/CameraChrome';
import { copy } from '@/features/legacyAuth/copy';

type Props = {
  onDocument: () => void;
  onCancel: () => void;
};

export function FaceFallbackView({ onDocument, onCancel }: Props) {
  return (
    <View style={styles.root}>
      <CameraChrome oval instruction={copy.faceInstruction} onCancel={onCancel} />
      <View style={[styles.dim, { pointerEvents: 'box-none' }]}>
        <View style={styles.alert}>
          <Text style={styles.title}>{copy.faceFailTitle}</Text>
          <Text style={styles.body}>{copy.faceFailBody}</Text>
          <View style={styles.rule} />
          <Pressable onPress={onDocument} accessibilityRole="button" style={styles.action}>
            <Text style={styles.actionText}>{copy.faceFailAction}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: legacyColor.overlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alert: {
    width: 270,
    backgroundColor: 'rgba(242,242,242,0.92)',
    borderRadius: legacyRadius.alert,
    overflow: 'hidden',
  },
  title: { ...legacyType.alertTitle, textAlign: 'center', paddingHorizontal: 16, paddingTop: 19 },
  body: { ...legacyType.alertBody, textAlign: 'center', paddingHorizontal: 16, paddingTop: 2, paddingBottom: 19 },
  rule: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(60,60,67,0.36)' },
  action: { height: 44, alignItems: 'center', justifyContent: 'center' },
  actionText: { ...legacyType.alertTitle, color: legacyColor.alertAction },
});
