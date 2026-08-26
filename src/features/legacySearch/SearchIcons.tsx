import Svg, { Circle, Path } from 'react-native-svg';

import { legacyColor } from '@/design/legacyTokens';

/** UI kit `ic_time` — Light blue / gray clock for recent rows. */
export function TimeGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={7.5} stroke={legacyColor.searchRecentIcon} strokeWidth={1.5} fill="none" />
      <Path
        d="M12 8.5V12L14.5 14"
        stroke={legacyColor.searchRecentIcon}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
