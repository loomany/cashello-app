import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { color, space } from '@/design/tokens';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  edges?: ('top' | 'bottom')[];
  gap?: number;
};

export function AppScreen({ children, scroll = true, edges = ['top', 'bottom'], gap = space[20] }: Props) {
  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={edges}>
        <View style={[styles.inner, { gap }]}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <ScrollView
        contentContainerStyle={[styles.content, { gap, paddingBottom: space[32] }]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: color.background,
  },
  inner: {
    flex: 1,
    paddingHorizontal: space[20],
    paddingTop: space[8],
  },
  content: {
    paddingHorizontal: space[20],
    paddingTop: space[8],
    paddingBottom: space[40],
    gap: space[20],
  },
});
