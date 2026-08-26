import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { legacyColor, legacyRadius, legacySpace, legacyType } from '@/design/legacyTokens';
import { CloseGlyph } from '@/features/legacyAccounts/AccountIcons';
import { paymentCopy } from '@/features/legacyPayment/copy';
import { PAYMENT_CATEGORIES, type PaymentCategoryId } from '@/features/legacyPayment/mockData';

type Props = {
  visible: boolean;
  selected: PaymentCategoryId;
  onClose: () => void;
  onSelect: (id: PaymentCategoryId) => void;
};

/** Bottom sheet: category filter for Payment catalog. */
export function PaymentCategorySheet({ visible, selected, onClose, onSelect }: Props) {
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
        {Platform.OS === 'web' ? (
          <View style={[styles.blur, styles.dim]} />
        ) : (
          <BlurView intensity={18} tint="light" style={styles.blur}>
            <View style={styles.dim} />
          </BlurView>
        )}
      </Pressable>

      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
        <View style={styles.handle} />
        <View style={styles.head}>
          <Text style={styles.title}>{paymentCopy.categorySheetTitle}</Text>
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
          {PAYMENT_CATEGORIES.map((item, index) => {
            const active = selected === item.id;
            return (
              <View key={item.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  accessibilityLabel={item.label}
                  onPress={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed, active && styles.rowActive]}
                >
                  <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>{item.label}</Text>
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
    zIndex: 40,
    justifyContent: 'flex-end',
  },
  overlayHit: { ...StyleSheet.absoluteFill },
  blur: { flex: 1 },
  dim: { flex: 1, backgroundColor: legacyColor.overlay },
  sheet: {
    backgroundColor: legacyColor.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: legacySpace.screenX,
    paddingTop: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: legacyColor.accountIconBg,
    marginBottom: 10,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: { ...legacyType.title, color: legacyColor.textPrimary, fontSize: 18, lineHeight: 24 },
  closeHit: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  list: {
    borderRadius: legacyRadius.button,
    borderWidth: 1,
    borderColor: legacyColor.border,
    overflow: 'hidden',
    marginBottom: 8,
  },
  divider: { height: 1, backgroundColor: legacyColor.border },
  row: {
    minHeight: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: legacyColor.surface,
  },
  rowPressed: { backgroundColor: legacyColor.accountIconBg },
  rowActive: { backgroundColor: legacyColor.accountIconBg },
  rowLabel: { ...legacyType.field, color: legacyColor.textPrimary },
  rowLabelActive: { color: legacyColor.primary, fontWeight: '700' },
  check: { ...legacyType.field, color: legacyColor.primary, fontWeight: '700' },
});
