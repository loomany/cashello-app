import { useEffect } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { legacyColor } from '@/design/legacyTokens';
import { CameraChrome } from '@/features/legacyAuth/components/CameraChrome';
import { copy } from '@/features/legacyAuth/copy';
import { canSubmitIin, canSubmitPhone, stepNodeId } from '@/features/legacyAuth/machine';
import { FaceFallbackView } from '@/features/legacyAuth/screens/FaceFallbackView';
import { IdentityView } from '@/features/legacyAuth/screens/IdentityView';
import { OnboardingView, SplashView } from '@/features/legacyAuth/screens/OnboardingView';
import { PhoneView, VerificationView } from '@/features/legacyAuth/screens/PhoneView';
import { PinView } from '@/features/legacyAuth/screens/PinView';
import { RegisterIinView } from '@/features/legacyAuth/screens/RegisterIinView';
import { useLegacyAuthStore } from '@/features/legacyAuth/store';
import { DebugMetaHost } from '@/prototype/DebugMetaHost';
import { useScreenMeta } from '@/prototype/metadata/useScreenMeta';
import { PIN_LENGTH, type LegacyAuthStep } from '@/features/legacyAuth/types';
import { useLegacySessionStore } from '@/features/legacyHome/session';

const JUMPS: { label: string; step: LegacyAuthStep }[] = [
  { label: 'Auth', step: 'iin' },
  { label: 'Face', step: 'face' },
  { label: 'Face fail', step: 'faceFallback' },
  { label: 'Doc front', step: 'documentFront' },
  { label: 'Doc overlay', step: 'documentTurn' },
  { label: 'Doc back', step: 'documentBack' },
  { label: 'Phone', step: 'phone' },
  { label: 'SMS', step: 'verification' },
  { label: 'PIN create', step: 'pinCreate' },
  { label: 'PIN repeat', step: 'pinRepeat' },
  { label: 'PIN error', step: 'pinError' },
  { label: 'PIN login', step: 'pinLogin' },
  { label: 'Home', step: 'complete' },
];

export default function LegacyAuthRoute() {
  const params = useLocalSearchParams<{ qaStep?: string }>();
  const router = useRouter();
  const state = useLegacyAuthStore();
  const dispatch = useLegacyAuthStore((s) => s.dispatch);

  useScreenMeta({
    screenName: `Legacy auth · ${state.step}`,
    route: '/legacy/auth',
    taskId: 'RECON-001.2',
    prototypeStatus: 'in_progress',
    screenId: 'LGC-SCR',
    legacyNodeId: stepNodeId(state.step),
  });

  useEffect(() => {
    if (typeof params.qaStep === 'string' && params.qaStep.length > 0) {
      dispatch({ type: 'JUMP', step: params.qaStep as LegacyAuthStep });
    }
  }, [params.qaStep, dispatch]);

  useEffect(() => {
    if (state.step !== 'splash') {
      return;
    }
    const timer = setTimeout(() => dispatch({ type: 'ADVANCE_SPLASH' }), 1400);
    return () => clearTimeout(timer);
  }, [state.step, dispatch]);

  useEffect(() => {
    if (state.step !== 'complete') {
      return;
    }
    useLegacySessionStore.getState().enterAuthorized();
    router.replace('/legacy/home');
  }, [state.step, router]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (state.step === 'splash' || state.step === 'complete') {
        return false;
      }
      dispatch({ type: 'BACK' });
      return true;
    });
    return () => sub.remove();
  }, [state.step, dispatch]);

  const body = renderStep(state, dispatch);

  return (
    <DebugMetaHost
      route="/legacy/auth"
      extra={
        <View style={styles.jumps}>
          {JUMPS.map((item) => (
            <Pressable
              key={item.step}
              onPress={() => dispatch({ type: 'JUMP', step: item.step })}
              style={styles.jump}
            >
              <Text style={styles.jumpLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      }
    >
      <StatusBar style={isLightChrome(state.step) ? 'light' : 'dark'} />
      {body}
    </DebugMetaHost>
  );
}

function isLightChrome(step: LegacyAuthStep): boolean {
  return (
    step === 'splash' ||
    step === 'face' ||
    step === 'faceFallback' ||
    step === 'documentFront' ||
    step === 'documentTurn' ||
    step === 'documentBack'
  );
}

function renderStep(
  state: ReturnType<typeof useLegacyAuthStore.getState>,
  dispatch: ReturnType<typeof useLegacyAuthStore.getState>['dispatch'],
) {
  switch (state.step) {
    case 'splash':
      return <SplashView onContinue={() => dispatch({ type: 'ADVANCE_SPLASH' })} />;
    case 'onboarding':
      return (
        <OnboardingView
          index={state.onboardingIndex}
          onNext={() => dispatch({ type: 'ONBOARDING_NEXT' })}
          onSkip={() => dispatch({ type: 'ONBOARDING_SKIP' })}
        />
      );
    case 'iin':
      return (
        <RegisterIinView
          phoneDigits={state.phoneDigits}
          canSubmit={canSubmitIin(state)}
          onChangePhone={(value) => dispatch({ type: 'SET_PHONE', value })}
          onSubmit={() => dispatch({ type: 'SUBMIT_IIN' })}
        />

      );
    case 'identity':
      return <IdentityView onContinue={() => dispatch({ type: 'IDENTITY_CONTINUE' })} />;
    case 'face':
      return (
        <CameraChrome
          oval
          instruction={copy.faceInstruction}
          onCancel={() => dispatch({ type: 'FACE_CANCEL' })}
          onContinue={() => dispatch({ type: 'FACE_CONTINUE' })}
        />
      );
    case 'faceFallback':
      return (
        <FaceFallbackView
          onDocument={() => dispatch({ type: 'FACE_CONTINUE' })}
          onCancel={() => dispatch({ type: 'FACE_CANCEL' })}
        />
      );
    case 'documentFront':
      return (
        <CameraChrome
          instruction={copy.documentFront}
          showCapture
          onCapture={() => dispatch({ type: 'DOCUMENT_CAPTURE' })}
          onCancel={() => dispatch({ type: 'DOCUMENT_CANCEL' })}
        />
      );
    case 'documentTurn':
      return (
        <CameraChrome
          instruction={copy.documentFront}
          showCapture
          onCapture={() => dispatch({ type: 'DOCUMENT_CAPTURE' })}
          onCancel={() => dispatch({ type: 'DOCUMENT_CANCEL' })}
        />
      );
    case 'documentBack':
      return (
        <CameraChrome
          instruction={copy.documentBack}
          showCapture
          onCapture={() => dispatch({ type: 'DOCUMENT_CAPTURE' })}
          onCancel={() => dispatch({ type: 'DOCUMENT_CANCEL' })}
        />
      );
    case 'phone':
      return (
        <PhoneView
          digits={state.phoneDigits}
          canSubmit={canSubmitPhone(state)}
          onChange={(value) => dispatch({ type: 'SET_PHONE', value })}
          onSubmit={() => dispatch({ type: 'SUBMIT_PHONE' })}
        />
      );
    case 'verification':
      return (
        <VerificationView
          sms={state.sms}
          phoneDigits={state.phoneDigits}
          onChange={(value) => dispatch({ type: 'SET_SMS', value })}
          onBack={() => dispatch({ type: 'BACK' })}
        />
      );
    case 'pinCreate':
      return (
        <PinView
          title={copy.pinCreateTitle}
          support={copy.pinCreateSupport}
          filled={state.pin.length}
          onDigit={(digit) => dispatch({ type: 'PIN_DIGIT', digit })}
          onDelete={() => dispatch({ type: 'PIN_DELETE' })}
        />
      );
    case 'pinRepeat':
      return (
        <PinView
          title={copy.pinRepeatTitle}
          support={copy.pinRepeatSupport}
          filled={state.pinRepeat.length}
          previousFilled={PIN_LENGTH}
          onDigit={(digit) => dispatch({ type: 'PIN_DIGIT', digit })}
          onDelete={() => dispatch({ type: 'PIN_DELETE' })}
        />
      );
    case 'pinError':
      return (
        <PinView
          title={copy.pinRepeatTitle}
          support={copy.pinRepeatSupport}
          filled={state.pinRepeat.length}
          previousFilled={0}
          error
          errorMessage={copy.pinErrorMessage}
          onDigit={(digit) => dispatch({ type: 'PIN_DIGIT', digit })}
          onDelete={() => dispatch({ type: 'PIN_DELETE' })}
        />
      );
    case 'pinLogin':
      return (
        <PinView
          title={copy.pinLoginTitle}
          filled={state.pin.length}
          login
          onDigit={(digit) => dispatch({ type: 'PIN_DIGIT', digit })}
          onDelete={() => dispatch({ type: 'PIN_DELETE' })}
        />
      );
    case 'complete':
      return null;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  jumps: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  jump: {
    backgroundColor: legacyColor.field,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: legacyColor.border,
  },
  jumpLabel: { color: legacyColor.textPrimary, fontSize: 13 },
});
