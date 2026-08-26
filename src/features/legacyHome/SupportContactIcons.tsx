import Svg, { Circle, Path } from 'react-native-svg';

import { legacyColor } from '@/design/legacyTokens';

export function SupportChatGlyph() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18">
      <Path
        d="M4 7.8a4.8 4.8 0 0 1 9.6 0c0 2.1-1.3 3.9-3.2 4.7l-.3 1.4-1.4-.4c-1.9-.6-3.4-2.2-3.7-4.1-.1-.5-.1-.9-.1-1.2 0-.1 0-.3 0-.4Z"
        fill={legacyColor.primaryOnPrimary}
      />
      <Circle cx={7.4} cy={7.8} r={0.7} fill={legacyColor.primaryOnPrimary} />
      <Circle cx={9} cy={7.8} r={0.7} fill={legacyColor.primaryOnPrimary} />
      <Circle cx={10.6} cy={7.8} r={0.7} fill={legacyColor.primaryOnPrimary} />
    </Svg>
  );
}

export function TelegramGlyph() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={11} fill="#2AABEE" />
      <Path
        d="M5.2 10.8 15.6 6.8c.5-.2 1 .1.8.8l-1.5 7c-.1.5-.4.6-.8.4l-2.2-1.6-1.1 1.1c-.1.1-.2.2-.5.2l.2-2.8 6.4-5.8c.1-.1 0-.2-.1-.1L8.6 13.1l-2.2-.7c-.5-.2-.5-.8.1-1Z"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

export function WhatsAppGlyph() {
  return (
    <Svg width={22} height={22} viewBox="0 0 22 22">
      <Circle cx={11} cy={11} r={11} fill="#25D366" />
      <Path
        d="M7.1 14.9 6.7 17l2.2-.4a4.6 4.6 0 0 0 2.2.6 4.7 4.7 0 1 1-4-6.9 4.7 4.7 0 0 1 6.9 4 4.6 4.6 0 0 1-.6 2.2l-.4 2.2Z"
        fill="#FFFFFF"
      />
      <Path
        d="M10.8 8.6c-.1 0-.3.1-.4.3-.1.2-.5.5-.5 1.1 0 .6.4 1.2.5 1.3.1.1.8 1.3 2 1.8 1 .4 1.2.3 1.4.3.3 0 .9-.4 1-.7.1-.3.1-.7.1-.7s0-.1-.1-.2c-.1-.1-.3-.2-.7-.4-.4-.2-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1-.1.3-.5.7-.6.8-.1.1-.2.1-.4 0-.2-.1-.8-.3-1.5-1-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.3.1-.4.1-.1.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.2 0-.3 0-.1-.4-1-.5-1.4Z"
        fill="#25D366"
      />
    </Svg>
  );
}
