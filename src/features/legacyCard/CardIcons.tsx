import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { legacyColor } from '@/design/legacyTokens';

const STROKE = '#333333';

export function LockGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Path
        d="M8 11.2V8.4C8 6.4 9.6 4.8 11.6 4.8C13.6 4.8 15.2 6.4 15.2 8.4V11.2"
        stroke={STROKE}
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
      />
      <Rect x={6.4} y={11} width={11.2} height={8} rx={1.2} stroke={STROKE} strokeWidth={1.5} fill="none" />
      <Path d="M12 13.4V16.4" stroke={STROKE} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function FilterGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 17.5 16.6579">
      <Path d="M15.9079 2.43421H13.3816" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M10.0132 0.75V4.11842" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M10.0132 2.43421H0.75" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M4.11842 8.32895H0.75" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7.48684 6.64474V10.0132" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M16.75 8.32895H7.48684" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15.9079 14.2237H13.3816" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M10.0132 12.5395V15.9079" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M10.0132 14.2237H0.75" stroke="#2A353D" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export function PinGridGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => (
          <Rect
            key={`${row}-${col}`}
            x={5 + col * 5.2}
            y={5 + row * 5.2}
            width={3.4}
            height={3.4}
            rx={0.6}
            fill={STROKE}
          />
        )),
      )}
    </Svg>
  );
}

export function ApplePayGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 18.4145 17.2498">
      <Path
        d="M9.47101 2.3145C7.98466 2.3145 6.95271 1 5.48656 1C4.02046 1 1 2.3476 1 7C1 11.6524 3.68221 14.65 3.98216 15C4.28216 15.35 4.97596 16.2498 6.05081 16.2498C7.12571 16.2498 8.30246 15.3951 9.47101 15.3951C10.6395 15.3951 12.1103 16.2498 13.0705 16.2498C14.0307 16.2498 14.4257 15.8583 15.0792 15.1831C15.7326 14.508 16.9791 12.4477 17.4144 11.2111C16.6974 10.7843 14.797 9.62555 14.797 7C14.797 5.2496 15.4366 3.7955 16.716 2.6376C15.8767 1.54585 14.9033 1 13.7957 1C12.1344 1 10.9573 2.3145 9.47101 2.3145Z"
        fill={STROKE}
        stroke={STROKE}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function GooglePayGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 20.0355 20.0001">
      <Path
        d="M15.25 1.5L12.75 5.25C12.25 4.9842 11.25 4.49995 10 4.49995C7 4.49995 4.5 6.99995 4.5 9.74995C4.5 12.5 6.5 15.5003 10 15.5003C12.8 15.5003 14.75 13.5002 14.75 12.0002H10V8.5001C13.5 8.50015 20 8.49995 20 8.49995C20.25 12.2501 19.1448 14.4502 17.75 16.25C15.6621 18.9441 12.5856 20.0001 10 20.0001C5 20.0001 0 16.0003 0 9.74995C0 3.75 5.36185 0 9.5 0C13.6382 0 15.25 1.5 15.25 1.5Z"
        fill={STROKE}
      />
    </Svg>
  );
}

export function BrandCircles() {
  return (
    <Svg width={29} height={17} viewBox="0 0 29 16.9167">
      <Circle cx={8.45833} cy={8.45833} r={8.45833} fill="#686D89" />
      <Circle cx={20.5417} cy={8.45833} r={8.45833} fill="#9C9FB2" />
    </Svg>
  );
}

export function AccessCheckGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={10} fill={legacyColor.logoGreen} />
      <Path
        d="M7.2 12.2L10.2 15.1L16.6 8.8"
        stroke={legacyColor.primaryOnPrimary}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
