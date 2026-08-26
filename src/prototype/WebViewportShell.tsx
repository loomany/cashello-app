import { type ReactNode, useEffect, useState } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';

import { color, radius } from '@/design/tokens';
import {
  DESKTOP_FRAME_BREAKPOINT,
  FRAME_HEIGHT,
  FRAME_WIDTH,
  STUDIO_PADDING,
  computeDesktopFrameScale,
  shouldFrameDesktopWeb,
} from '@/prototype/webViewportScale';

type Props = {
  children: ReactNode;
};

function shouldFrame(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return false;
  }
  return shouldFrameDesktopWeb(window.innerWidth);
}

export function WebViewportShell({ children }: Props) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [framed, setFramed] = useState(shouldFrame);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      return;
    }
    const update = () => setFramed(window.innerWidth >= DESKTOP_FRAME_BREAKPOINT);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (Platform.OS !== 'web' || !framed) {
    return <>{children}</>;
  }

  const scale = computeDesktopFrameScale(windowWidth, windowHeight);
  const displayWidth = FRAME_WIDTH * scale;
  const displayHeight = FRAME_HEIGHT * scale;

  return (
    <View style={styles.studio}>
      <View style={[styles.frameSlot, { width: displayWidth, height: displayHeight }]}>
        <View
          style={[
            styles.frame,
            {
              transform: [{ scale }],
              ...(Platform.OS === 'web'
                ? ({ transformOrigin: 'top left' } as object)
                : null),
            },
          ]}
          {...({ 'data-figma-capture-root': '1' } as object)}
        >
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  studio: {
    flex: 1,
    backgroundColor: '#1C1C1A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: STUDIO_PADDING,
    overflow: 'hidden',
  },
  frameSlot: {
    overflow: 'hidden',
  },
  frame: {
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
    borderRadius: radius.xl,
    overflow: 'hidden',
    backgroundColor: color.background,
    borderWidth: 1,
    borderColor: '#2A2A27',
  },
});
