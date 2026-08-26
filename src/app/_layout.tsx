import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { color } from '@/design/tokens';
import { PrototypeErrorBoundary } from '@/prototype/ErrorBoundary';
import { WebViewportShell } from '@/prototype/WebViewportShell';
import { useMockStore } from '@/state/store';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hydrated = useMockStore((state) => state.hydrated);

  useEffect(() => {
    if (hydrated) {
      void SplashScreen.hideAsync();
    }
  }, [hydrated]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      void SplashScreen.hideAsync();
      if (!useMockStore.getState().hydrated) {
        useMockStore.setState({ hydrated: true });
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PrototypeErrorBoundary>
          <WebViewportShell>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: color.background },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="legacy" />
              <Stack.Screen name="dev" />
            </Stack>
          </WebViewportShell>
        </PrototypeErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.background },
});
