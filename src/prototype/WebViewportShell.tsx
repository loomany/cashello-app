import { type ReactNode, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { color, radius } from '@/design/tokens';

const FRAME_WIDTH = 390;
const FRAME_HEIGHT = 844;

type Props = {
  children: ReactNode;
};

function shouldFrame(): boolean {
  if (Platform.OS !== 'web' || typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth >= 768;
}

export function WebViewportShell({ children }: Props) {
  const [framed, setFramed] = useState(shouldFrame);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      return;
    }
    const update = () => setFramed(window.innerWidth >= 768);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (Platform.OS !== 'web' || !framed) {
    return <>{children}</>;
  }

  return (
    <View style={styles.studio}>
      <View style={styles.frame} {...({ 'data-figma-capture-root': '1' } as object)}>
        {children}
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
    padding: 24,
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
