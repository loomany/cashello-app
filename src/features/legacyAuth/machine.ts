import {
  IIN_LENGTH,
  INITIAL_LEGACY_AUTH,
  ONBOARDING_PAGE_COUNT,
  PIN_LENGTH,
  SMS_LENGTH,
  type LegacyAuthAction,
  type LegacyAuthSnapshot,
  type LegacyAuthStep,
} from '@/features/legacyAuth/types';

const digitsOnly = (value: string, max: number) => value.replace(/\D/g, '').slice(0, max);

/** Auth entry (former IIN step): phone required; terms accepted by tapping Далее. */
export function canSubmitIin(state: LegacyAuthSnapshot): boolean {
  return state.phoneDigits.length === 10;
}

export function canSubmitPhone(state: LegacyAuthSnapshot): boolean {
  return state.phoneDigits.length === 10;
}

export function canSubmitSms(state: LegacyAuthSnapshot): boolean {
  return state.sms.length === SMS_LENGTH;
}

export function formatKzPhone(digits: string): string {
  const d = digitsOnly(digits, 10);
  const slots = ['(', '_', '_', '_', ')', ' ', '_', '_', '_', ' ', '_', '_', ' ', '_', '_'];
  let i = 0;
  const filled = slots.map((ch) => {
    if (ch === '_' && i < d.length) {
      const n = d[i];
      i += 1;
      return n;
    }
    return ch;
  });
  return `+7 ${filled.join('')}`;
}

/** Caret stays at the first empty mask slot (next to +7 when empty). */
export const KZ_PHONE_CARET_MIN = 4;

export function kzPhoneCaretPosition(formatted: string): number {
  const blank = formatted.indexOf('_');
  if (blank >= 0) {
    return blank;
  }
  return formatted.length;
}

/** Parse masked/raw phone input; treat mask-char backspace as deleting a digit. */
export function parseKzPhoneInput(value: string, previousDigits: string): string {
  let d = value.replace(/\D/g, '');
  if ((value.includes('+7') || d.length === 11) && d.startsWith('7')) {
    d = d.slice(1);
  }
  d = d.slice(0, 10);

  // Backspace removed a mask char (_, space, paren) instead of a digit.
  if (
    previousDigits.length > 0 &&
    d.length >= previousDigits.length &&
    value.length < formatKzPhone(previousDigits).length
  ) {
    return previousDigits.slice(0, -1);
  }
  return d;
}

function go(state: LegacyAuthSnapshot, step: LegacyAuthStep, extra?: Partial<LegacyAuthSnapshot>): LegacyAuthSnapshot {
  return { ...state, step, captureFlash: false, ...extra };
}

function appendPin(current: string, digit: string): string {
  if (current.length >= PIN_LENGTH) {
    return current;
  }
  return `${current}${digit}`;
}

export function reduceLegacyAuth(state: LegacyAuthSnapshot, action: LegacyAuthAction): LegacyAuthSnapshot {
  switch (action.type) {
    case 'RESET':
      return { ...INITIAL_LEGACY_AUTH };
    case 'JUMP':
      return go(state, action.step, action.step === 'pinError' ? { pinRepeat: '' } : undefined);
    case 'ADVANCE_SPLASH':
      return state.step === 'splash' ? go(state, 'iin') : state;
    case 'ONBOARDING_NEXT':
      if (state.step !== 'onboarding') {
        return state;
      }
      if (state.onboardingIndex < ONBOARDING_PAGE_COUNT - 1) {
        return { ...state, onboardingIndex: state.onboardingIndex + 1 };
      }
      return go(state, 'iin');
    case 'ONBOARDING_SKIP':
      return state.step === 'onboarding' ? go(state, 'iin') : state;
    case 'SET_IIN':
      return { ...state, iin: digitsOnly(action.value, IIN_LENGTH) };
    case 'TOGGLE_TERMS':
      return { ...state, termsAccepted: !state.termsAccepted };
    case 'SUBMIT_IIN':
      return state.step === 'iin' && canSubmitIin(state) ? go(state, 'verification', { sms: '' }) : state;
    case 'GO_LOGIN':
      return state.step === 'iin' || state.step === 'complete' ? go(state, 'pinLogin', { pin: '' }) : state;
    case 'IDENTITY_CONTINUE':
      return state.step === 'identity' ? go(state, 'face') : state;
    case 'FACE_CONTINUE':
      return state.step === 'face' || state.step === 'faceFallback' ? go(state, 'documentFront') : state;
    case 'FACE_CANCEL':
      return state.step === 'face' || state.step === 'faceFallback' ? go(state, 'iin') : state;
    case 'FACE_FALLBACK':
      return state.step === 'face' ? go(state, 'faceFallback') : state;
    case 'FACE_RETRY':
      return state.step === 'faceFallback' ? go(state, 'face') : state;
    case 'DOCUMENT_CAPTURE': {
      if (state.step === 'documentFront' || state.step === 'documentTurn') {
        return go(state, 'documentBack', { captureFlash: true });
      }
      if (state.step === 'documentBack') {
        return go(state, 'phone', { captureFlash: true });
      }
      return state;
    }
    case 'DOCUMENT_CANCEL':
      if (state.step === 'documentFront' || state.step === 'documentTurn') {
        return go(state, 'face');
      }
      if (state.step === 'documentBack') {
        return go(state, 'documentFront');
      }
      return state;
    case 'SET_PHONE': {
      return { ...state, phoneDigits: parseKzPhoneInput(action.value, state.phoneDigits) };
    }
    case 'SUBMIT_PHONE':
      return state.step === 'phone' && canSubmitPhone(state) ? go(state, 'verification', { sms: '' }) : state;
    case 'SET_SMS': {
      const sms = digitsOnly(action.value, SMS_LENGTH);
      const next = { ...state, sms };
      // Prototype: any complete 4-digit code advances (no real WhatsApp verify yet).
      if (state.step === 'verification' && sms.length === SMS_LENGTH) {
        return go(next, 'pinCreate', { pin: '', pinRepeat: '' });
      }
      return next;
    }
    case 'SUBMIT_SMS':
      if (state.step !== 'verification' || !canSubmitSms(state)) {
        return state;
      }
      return go(state, 'pinCreate', { pin: '', pinRepeat: '' });
    case 'PIN_DIGIT': {
      const d = action.digit;
      if (!/^\d$/.test(d)) {
        return state;
      }
      if (state.step === 'pinCreate') {
        const pin = appendPin(state.pin, d);
        if (pin.length === PIN_LENGTH) {
          return go(state, 'pinRepeat', { pin, pinRepeat: '', sessionPin: pin });
        }
        return { ...state, pin };
      }
      if (state.step === 'pinRepeat' || state.step === 'pinError') {
        const pinRepeat = appendPin(state.pinRepeat, d);
        if (pinRepeat.length === PIN_LENGTH) {
          if (pinRepeat === (state.sessionPin ?? state.pin)) {
            return go(state, 'complete', { pinRepeat });
          }
          return go(state, 'pinError', { pinRepeat: '' });
        }
        return { ...state, pinRepeat, step: state.step === 'pinError' ? 'pinError' : 'pinRepeat' };
      }
      if (state.step === 'pinLogin') {
        const pin = appendPin(state.pin, d);
        if (pin.length === PIN_LENGTH) {
          return go(state, 'complete', { pin });
        }
        return { ...state, pin };
      }
      return state;
    }
    case 'PIN_DELETE': {
      if (state.step === 'pinCreate') {
        return { ...state, pin: state.pin.slice(0, -1) };
      }
      if (state.step === 'pinRepeat' || state.step === 'pinError') {
        return { ...state, pinRepeat: state.pinRepeat.slice(0, -1) };
      }
      if (state.step === 'pinLogin') {
        return { ...state, pin: state.pin.slice(0, -1) };
      }
      return state;
    }
    case 'BACK':
      return back(state);
    default:
      return state;
  }
}

function back(state: LegacyAuthSnapshot): LegacyAuthSnapshot {
  switch (state.step) {
    case 'splash':
      return state;
    case 'onboarding':
      if (state.onboardingIndex > 0) {
        return { ...state, onboardingIndex: state.onboardingIndex - 1 };
      }
      return go(state, 'splash');
    case 'iin':
      return go(state, 'splash');
    case 'identity':
      return go(state, 'iin');
    case 'face':
      return go(state, 'iin');
    case 'faceFallback':
      return go(state, 'face');
    case 'documentFront':
      return go(state, 'face');
    case 'documentTurn':
      return go(state, 'documentFront');
    case 'documentBack':
      return go(state, 'documentFront');
    case 'phone':
      return go(state, 'documentBack');
    case 'verification':
      return go(state, 'iin');
    case 'pinCreate':
      return go(state, 'verification', { pin: '' });
    case 'pinRepeat':
      return go(state, 'pinCreate', { pin: '', pinRepeat: '' });
    case 'pinError':
      return go(state, 'pinRepeat', { pinRepeat: '' });
    case 'pinLogin':
      return go(state, 'iin', { pin: '' });
    case 'complete':
      return state;
    default:
      return state;
  }
}

export function stepNodeId(step: LegacyAuthStep): string {
  switch (step) {
    case 'splash':
      return '648:16634';
    case 'onboarding':
      return '829:24292';
    case 'iin':
      return '770:23233';
    case 'identity':
      return '924:24543';
    case 'face':
      return '648:17611';
    case 'faceFallback':
      return '924:24543';
    case 'documentFront':
      return '924:24618';
    case 'documentTurn':
      return '930:25629';
    case 'documentBack':
      return '930:25673';
    case 'phone':
      return '802:22943';
    case 'verification':
      return '648:17063';
    case 'pinCreate':
      return '648:16740';
    case 'pinRepeat':
      return '648:16878';
    case 'pinError':
      return '648:16930';
    case 'pinLogin':
      return '804:23186';
    case 'complete':
      return '765:22510';
    default:
      return '';
  }
}
