import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyFontFamily, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { historyCopy } from '@/features/legacyHistory/copy';
import { FILTER_OP_TYPES } from '@/features/legacyHistory/mockData';
import { type FilterOpType } from '@/features/legacyHistory/store';

type Props = {
  visible: boolean;
  selected: FilterOpType;
  onClose: () => void;
  onSelect: (type: FilterOpType) => void;
};

/**
 * Bottom sheet: Все операции / Пополнение / Списание.
 * In-tree (not RN Modal) so it stays inside WebViewportShell phone frame.
 */
export function HistoryOpTypeSheet({ visible, selected, onClose, onSelect }: Props) {
  const insets = useSafeAreaInsets();

  if (!visible) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.root}>
      <Pressable
        onPress={onClose}
        accessibilityRole="button"
        accessibilityLabel="Закрыть"
        style={styles.overlayHit}
      >
        <BlurView intensity={18} tint="light" style={styles.blur}>
          <View style={styles.dim} />
        </BlurView>
      </Pressable>

      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <View style={styles.handle} />
        <View style={styles.head}>
          <Text style={styles.title}>{historyCopy.opTypeSheetTitle}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Закрыть"
            onPress={onClose}
            style={styles.closeHit}
            hitSlop={8}
          >
            <CloseGlyph />
          </Pressable>
        </View>

        <View style={styles.list}>
          {FILTER_OP_TYPES.map((item, index) => {
            const active = selected === item.id;
            const label =
              item.id === 'withdrawal' ? historyCopy.chipDebit : item.label;
            return (
              <View key={item.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={label}
                  onPress={() => {
                    onSelect(item.id as FilterOpType);
                    onClose();
                  }}
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed, active && styles.rowActive]}
                >
                  <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>{label}</Text>
                  {active ? <Text style={styles.check}>✓</Text> : null}
                </Pressable>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 40,
  },
  overlayHit: {
    ...StyleSheet.absoluteFill,
  },
  blur: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  dim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Platform.OS === 'web' ? 'rgba(5, 10, 38, 0.22)' : 'rgba(5, 10, 38, 0.18)',
  },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 10,
    zIndex: 1,
    borderTopWidth: 1,
    borderColor: legacyColor.border,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.border,
    marginBottom: 12,
  },
  head: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    ...legacyType.homeSection,
    color: legacyColor.textPrimary,
    textAlign: 'center',
  },
  closeHit: {
    position: 'absolute',
    right: 0,
    top: 2,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: legacyColor.homeBackground,
  },
  list: {
    backgroundColor: legacyColor.surface,
    borderWidth: 1,
    borderColor: legacyColor.border,
    borderRadius: legacyRadius.field,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginBottom: 4,
  },
  row: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  rowPressed: {
    opacity: 0.72,
  },
  rowActive: {
    backgroundColor: legacyColor.accountIconBg,
  },
  rowLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  rowLabelActive: {
    color: legacyColor.primary,
    fontWeight: '600',
  },
  check: {
    fontSize: 16,
    lineHeight: 20,
    color: legacyColor.primary,
    fontWeight: '700',
    marginLeft: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: legacyColor.border,
    marginHorizontal: 14,
  },
});
