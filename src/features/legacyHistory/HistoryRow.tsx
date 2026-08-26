import { Pressable, StyleSheet, Text, View } from 'react-native';

import { legacyColor, legacyFontFamily, legacyRadius, legacyType } from '@/design/legacyTokens';
import { historyCopy } from '@/features/legacyHistory/copy';
import { type LegacyHistoryOp } from '@/features/legacyHistory/mockData';

type Props = {
  op: LegacyHistoryOp;
  onPress?: () => void;
};

function formatBubbleAmount(amount: number): string {
  return String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatBubbleTime(timeLabel: string): string {
  return timeLabel.slice(0, 5);
}

export function HistoryRow({ op, onPress }: Props) {
  const isDebit = op.direction === 'out' || Boolean(op.showMinus);
  const kindLabel = isDebit ? historyCopy.chipDebit : historyCopy.chipTopup;
  const title = op.directionLabel ?? op.title;
  const subtitle = op.listSubtitle;
  const detail = op.listDetail;
  const amountLine = `${kindLabel}: ${formatBubbleAmount(op.amount)}\u00A0Т`;
  const time = formatBubbleTime(op.timeLabel);
  const a11yExtra = [subtitle, detail].filter(Boolean).join(', ');
  const inlineSubtitle = Boolean(subtitle && !detail && op.listInline);
  const a11yLabel = `${amountLine}, ${title}${a11yExtra ? `, ${a11yExtra}` : ''}, ${time}`;
  const bubbleStyle = [
    styles.bubble,
    isDebit ? styles.bubbleDebit : styles.bubbleCredit,
    !isDebit && styles.bubbleCreditWide,
    isDebit && styles.bubbleDebitWide,
  ];

  const body = (
    <>
      <Text style={[styles.amountLine, isDebit && styles.amountDebit]} numberOfLines={2}>
        {amountLine}
      </Text>
      {inlineSubtitle ? (
        <Text style={styles.title} numberOfLines={1}>
          {title}{' '}
          <Text style={styles.subtitleInline}>{subtitle}</Text>
        </Text>
      ) : (
        <>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          {subtitle ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
          {detail ? (
            <Text style={styles.detail} numberOfLines={1}>
              {detail}
            </Text>
          ) : null}
        </>
      )}
      <Text style={[styles.time, isDebit && styles.timeRight]}>{time}</Text>
    </>
  );

  return (
    <View style={[styles.wrap, isDebit ? styles.wrapRight : styles.wrapLeft]}>
      {isDebit && onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={a11yLabel}
          onPress={onPress}
          style={bubbleStyle}
        >
          {body}
        </Pressable>
      ) : (
        <View accessibilityLabel={a11yLabel} style={bubbleStyle}>
          {body}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginBottom: 10,
  },
  wrapLeft: {
    alignItems: 'flex-start',
  },
  wrapRight: {
    alignItems: 'flex-end',
  },
  bubble: {
    width: '50%',
    minWidth: 148,
    borderRadius: legacyRadius.field,
    borderWidth: 1,
    borderColor: legacyColor.border,
    backgroundColor: legacyColor.homeBackground,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 8,
    gap: 4,
  },
  bubbleCreditWide: {
    width: '62%',
    minWidth: 188,
  },
  bubbleDebitWide: {
    width: '58%',
    minWidth: 176,
  },
  bubbleCredit: {
    borderTopLeftRadius: 4,
    backgroundColor: legacyColor.surface,
    borderColor: legacyColor.border,
  },
  bubbleDebit: {
    borderTopRightRadius: 4,
    backgroundColor: legacyColor.accountIconBg,
    borderColor: legacyColor.border,
  },
  amountLine: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: legacyColor.logoGreen,
    fontFamily: legacyFontFamily,
  },
  amountDebit: {
    color: legacyColor.textPrimary,
  },
  title: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  subtitleInline: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  detail: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    color: legacyColor.textPrimary,
    fontFamily: legacyFontFamily,
  },
  time: {
    marginTop: 4,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
    color: legacyColor.textTertiary,
    fontFamily: legacyFontFamily,
    alignSelf: 'flex-start',
  },
  timeRight: {
    alignSelf: 'flex-end',
  },
});
