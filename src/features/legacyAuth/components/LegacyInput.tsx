import { useEffect, useRef, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputSelectionChangeEventData,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { legacyColor, legacySize, legacyType } from '@/design/legacyTokens';
import { kzPhoneCaretPosition } from '@/features/legacyAuth/machine';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'number-pad' | 'phone-pad' | 'default';
  maxLength?: number;
  placeholder?: string;
  focusedBorder?: boolean;
  labelActive?: boolean;
  /** Keep caret at/after this index (e.g. 4 for first "_" in "+7 (_…"). */
  caretMin?: number;
  /** Place caret on first "_" in a phone mask instead of at the end. */
  maskCaret?: boolean;
};

export function LegacyInput({
  label,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  placeholder,
  focusedBorder = false,
  labelActive,
  caretMin,
  maskCaret = false,
}: Props) {
  const floating = Boolean(value) || labelActive;
  const inputRef = useRef<TextInput>(null);
  const [selection, setSelection] = useState<{ start: number; end: number } | undefined>();
  const [focused, setFocused] = useState(false);
  const manageCaret = caretMin != null || maskCaret;

  const resolveCaret = (start: number, end: number) => {
    if (maskCaret) {
      const pos = kzPhoneCaretPosition(value);
      // Allow selection within filled digits, but not before prefix / into empty tail wrongly
      const min = caretMin ?? 0;
      return {
        start: Math.min(Math.max(start, min), pos),
        end: Math.min(Math.max(end, min), Math.max(pos, min)),
      };
    }
    if (caretMin == null) {
      return { start, end };
    }
    const min = Math.min(caretMin, value.length);
    return {
      start: Math.max(start, min),
      end: Math.max(end, min),
    };
  };

  const placeCaret = () => {
    const pos = maskCaret ? kzPhoneCaretPosition(value) : Math.max(caretMin ?? 0, value.length);
    setSelection({ start: pos, end: pos });
    inputRef.current?.setNativeProps?.({ selection: { start: pos, end: pos } });
  };

  useEffect(() => {
    if (!manageCaret || !focused) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- caret must follow mask reformat
    placeCaret();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-place after mask reformats
  }, [value, manageCaret, focused, maskCaret, caretMin]);

  const onSelectionChange = (event: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
    if (!manageCaret) {
      return;
    }
    setSelection(resolveCaret(event.nativeEvent.selection.start, event.nativeEvent.selection.end));
  };

  const onFocus = () => {
    setFocused(true);
    if (!manageCaret) {
      return;
    }
    requestAnimationFrame(placeCaret);
  };

  return (
    <View style={[styles.wrap, focusedBorder && focused && styles.wrapFocus]}>
      <Text
        pointerEvents="none"
        style={[styles.label, floating ? styles.labelFloat : styles.labelIdle, labelActive && styles.labelBlue]}
      >
        {label}
      </Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        placeholder={floating ? placeholder : undefined}
        placeholderTextColor={legacyColor.textTertiary}
        style={[styles.input, Platform.OS === 'web' && styles.inputWeb]}
        selection={manageCaret ? selection : undefined}
        onSelectionChange={manageCaret ? onSelectionChange : undefined}
        onFocus={onFocus}
        onBlur={() => {
          setFocused(false);
          setSelection(undefined);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: legacySize.inputHeight,
    borderRadius: 14,
    backgroundColor: '#F7F8FC',
    borderWidth: 1.5,
    borderColor: 'rgba(18, 38, 170, 0.12)',
    paddingHorizontal: 20,
    justifyContent: 'center',
  } as ViewStyle,
  wrapFocus: {
    borderColor: 'rgba(18, 38, 170, 0.45)',
    backgroundColor: legacyColor.surface,
    shadowColor: '#1226AA',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  } as ViewStyle,
  label: { ...legacyType.field, position: 'absolute', left: 20, zIndex: 1 } as TextStyle,
  labelIdle: { top: 24, color: legacyColor.textSecondary } as TextStyle,
  labelFloat: { top: 10, ...legacyType.floating, color: legacyColor.textTertiary } as TextStyle,
  labelBlue: { color: legacyColor.primary, top: 10, ...legacyType.floating } as TextStyle,
  input: {
    ...legacyType.field,
    color: legacyColor.textPrimary,
    padding: 0,
    marginTop: 14,
    width: '100%',
  } as TextStyle,
  inputWeb: {
    outlineStyle: 'none',
  } as unknown as TextStyle,
});
