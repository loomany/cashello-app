export const ONBOARDING_PAGE_COUNT = 3;
export const IIN_LENGTH = 12;
export const SMS_LENGTH = 4;
export const PIN_LENGTH = 6;
export const DEMO_SMS_CODE = '0000';
export const DEMO_IIN = '010925549234';

export type LegacyAuthStep =
  | 'splash'
  | 'onboarding'
  | 'iin'
  | 'identity'
  | 'face'
  | 'faceFallback'
  | 'documentFront'
  | 'documentTurn'
  | 'documentBack'
  | 'phone'
  | 'verification'
  | 'pinCreate'
  | 'pinRepeat'
  | 'pinError'
  | 'pinLogin'
  | 'complete';

export type LegacyAuthSnapshot = {
  step: LegacyAuthStep;
  onboardingIndex: number;
  iin: string;
  termsAccepted: boolean;
  phoneDigits: string;
  sms: string;
  pin: string;
  pinRepeat: string;
  sessionPin: string | null;
  captureFlash: boolean;
};

export const INITIAL_LEGACY_AUTH: LegacyAuthSnapshot = {
  step: 'splash',
  onboardingIndex: 0,
  iin: '',
  termsAccepted: true,
  phoneDigits: '',
  sms: '',
  pin: '',
  pinRepeat: '',
  sessionPin: null,
  captureFlash: false,
};

export type LegacyAuthAction =
  | { type: 'ADVANCE_SPLASH' }
  | { type: 'ONBOARDING_NEXT' }
  | { type: 'ONBOARDING_SKIP' }
  | { type: 'SET_IIN'; value: string }
  | { type: 'TOGGLE_TERMS' }
  | { type: 'SUBMIT_IIN' }
  | { type: 'GO_LOGIN' }
  | { type: 'IDENTITY_CONTINUE' }
  | { type: 'FACE_CONTINUE' }
  | { type: 'FACE_CANCEL' }
  | { type: 'FACE_FALLBACK' }
  | { type: 'FACE_RETRY' }
  | { type: 'DOCUMENT_CAPTURE' }
  | { type: 'DOCUMENT_CANCEL' }
  | { type: 'SET_PHONE'; value: string }
  | { type: 'SUBMIT_PHONE' }
  | { type: 'SET_SMS'; value: string }
  | { type: 'SUBMIT_SMS' }
  | { type: 'PIN_DIGIT'; digit: string }
  | { type: 'PIN_DELETE' }
  | { type: 'BACK' }
  | { type: 'RESET' }
  | { type: 'JUMP'; step: LegacyAuthStep };

export const MAIN_PATH: LegacyAuthStep[] = [
  'splash',
  'iin',
  'verification',
  'pinCreate',
  'pinRepeat',
  'complete',
];
