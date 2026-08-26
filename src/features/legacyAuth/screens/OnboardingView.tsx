import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import { legacyColor, legacySpace, legacyType } from '@/design/legacyTokens';
import { LegacyPrimaryButton } from '@/features/legacyAuth/components/LegacyPrimaryButton';
import { copy, onboardingPages } from '@/features/legacyAuth/copy';
import { ONBOARDING_PAGE_COUNT } from '@/features/legacyAuth/types';

type Props = {
  index: number;
  onNext: () => void;
  onSkip: () => void;
};

export function OnboardingView({ index, onNext, onSkip }: Props) {
  const page = onboardingPages[index] ?? onboardingPages[0];
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Pressable onPress={onSkip} style={styles.skip} accessibilityRole="button">
        <Text style={styles.skipText}>{copy.skip}</Text>
      </Pressable>
      <View style={styles.art}>
        <Image source={page.art} style={styles.artImg} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.body}>{page.body}</Text>
      <View style={styles.dots}>
        {Array.from({ length: ONBOARDING_PAGE_COUNT }, (_, i) => (
          <View key={i} style={[styles.dot, i === index && styles.dotOn]} />
        ))}
      </View>
      <View style={styles.footer}>
        <LegacyPrimaryButton label={copy.next} onPress={onNext} />
      </View>
    </SafeAreaView>
  );
}

export function SplashView({ onContinue }: { onContinue: () => void }) {
  return (
    <Pressable style={styles.splash} onPress={onContinue} accessibilityRole="button" accessibilityLabel="Splash">
      <SafeAreaView style={styles.splashInner}>
        <Svg width={176} height={176} viewBox="0 0 176 176">
          <Path
            d="M88 176C136.601 176 176 136.601 176 88C176 39.3989 136.601 0 88 0C39.399 0 0 39.3989 0 88C0 136.601 39.399 176 88 176Z"
            fill={legacyColor.logoGreen}
          />
          <Rect x="43.9941" y="44.0059" width="88" height="88" fill={legacyColor.splash} />
          <Rect x="109.991" y="77.0107" width="43.994" height="22.0031" fill={legacyColor.primaryOnPrimary} />
        </Svg>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: legacyColor.background },
  skip: { alignSelf: 'flex-end', paddingHorizontal: legacySpace.screenX, paddingTop: 8 },
  skipText: { ...legacyType.field, color: legacyColor.primary },
  art: { height: 270, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20 },
  artImg: { width: 340, height: 270 },
  title: {
    ...legacyType.title,
    color: legacyColor.textPrimary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  body: {
    ...legacyType.body,
    color: legacyColor.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 10,
    marginBottom: 28,
  },
  dots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 28 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#CACDD3' },
  dotOn: { backgroundColor: legacyColor.primary, width: 25, borderRadius: 4 },
  footer: { paddingHorizontal: legacySpace.screenX, paddingBottom: 16 },
  splash: { flex: 1, backgroundColor: legacyColor.splash },
  splashInner: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
