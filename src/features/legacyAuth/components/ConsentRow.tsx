import { Pressable, StyleSheet, Text, View } from 'react-native';

import { legacyColor, legacyType } from '@/design/legacyTokens';

type CheckboxProps = {
  checked: boolean;
  prefix: string;
  link: string;
  onToggle: () => void;
};

export function ConsentRow({ checked, prefix, link, onToggle }: CheckboxProps) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onToggle} style={styles.row}>
      <View style={[styles.box, checked && styles.boxOn]}>{checked ? <Text style={styles.tick}>✓</Text> : null}</View>
      <Text style={styles.text}>
        {prefix}
        <Text style={styles.link}>{link}</Text>
      </Text>
    </Pressable>
  );
}

type NoticeProps = {
  prefix: string;
  link: string;
  onPressLink?: () => void;
};

/** Terms notice without a checkbox — agreement by tapping Далее. */
export function ConsentNotice({ prefix, link, onPressLink }: NoticeProps) {
  return (
    <Text style={styles.notice}>
      {prefix}
      <Text
        style={styles.link}
        onPress={onPressLink}
        accessibilityRole={onPressLink ? 'link' : undefined}
      >
        {link}
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, alignItems: 'flex-start', paddingRight: 8 },
  box: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: legacyColor.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  boxOn: { backgroundColor: legacyColor.primary, borderColor: legacyColor.primary },
  tick: { color: legacyColor.primaryOnPrimary, fontSize: 13, fontWeight: '700' },
  text: { ...legacyType.caption, color: legacyColor.textMuted, flex: 1 },
  notice: { ...legacyType.caption, color: legacyColor.textMuted },
  link: { color: legacyColor.linkTerms },
});
