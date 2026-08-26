import { reduceLegacyAuth, canSubmitIin, formatKzPhone } from '@/features/legacyAuth/machine';
import { INITIAL_LEGACY_AUTH } from '@/features/legacyAuth/types';

describe('legacy auth reconstructed state machine', () => {
  it('starts on splash and enters auth (iin) without onboarding', () => {
    let state = INITIAL_LEGACY_AUTH;
    expect(state.step).toBe('splash');
    state = reduceLegacyAuth(state, { type: 'ADVANCE_SPLASH' });
    expect(state.step).toBe('iin');
  });

  it('skips onboarding to IIN when jumped there', () => {
    let state = reduceLegacyAuth(INITIAL_LEGACY_AUTH, { type: 'JUMP', step: 'onboarding' });
    state = reduceLegacyAuth(state, { type: 'ONBOARDING_SKIP' });
    expect(state.step).toBe('iin');
  });

  it('keeps Далее disabled until phone length; terms by action', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'iin' as const };
    expect(canSubmitIin(state)).toBe(false);
    state = reduceLegacyAuth(state, { type: 'SET_PHONE', value: '7001234567' });
    expect(canSubmitIin(state)).toBe(true);
    state = reduceLegacyAuth(state, { type: 'SUBMIT_IIN' });
    expect(state.step).toBe('verification');
  });

  it('walks phone then demo SMS into PIN create', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'phone' as const };
    state = reduceLegacyAuth(state, { type: 'SET_PHONE', value: '7001234567' });
    state = reduceLegacyAuth(state, { type: 'SUBMIT_PHONE' });
    expect(state.step).toBe('verification');
    state = reduceLegacyAuth(state, { type: 'SET_SMS', value: '0000' });
    expect(state.step).toBe('pinCreate');
  });

  it('creates PIN, repeats successfully, and reaches complete', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'pinCreate' as const };
    for (const d of '123456') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    expect(state.step).toBe('pinRepeat');
    expect(state.sessionPin).toBe('123456');
    for (const d of '123456') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    expect(state.step).toBe('complete');
  });

  it('shows PIN error on mismatch and can recover', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'pinCreate' as const };
    for (const d of '111111') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    for (const d of '222222') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    expect(state.step).toBe('pinError');
    for (const d of '111111') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    expect(state.step).toBe('complete');
  });

  it('resets to splash', () => {
    const state = reduceLegacyAuth({ ...INITIAL_LEGACY_AUTH, step: 'complete' }, { type: 'RESET' });
    expect(state.step).toBe('splash');
    expect(state.iin).toBe('');
  });

  it('reaches document fallback from face', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'face' as const };
    state = reduceLegacyAuth(state, { type: 'FACE_FALLBACK' });
    expect(state.step).toBe('faceFallback');
    state = reduceLegacyAuth(state, { type: 'FACE_CONTINUE' });
    expect(state.step).toBe('documentFront');
  });

  it('formats Kazakhstan demo phone', () => {
    expect(formatKzPhone('')).toBe('+7 (___) ___ __ __');
    expect(formatKzPhone('7')).toBe('+7 (7__) ___ __ __');
    expect(formatKzPhone('7001234567')).toBe('+7 (700) 123 45 67');
  });

  it('parses phone digits from formatted mask input', () => {
    let state = { ...INITIAL_LEGACY_AUTH, step: 'iin' as const };
    state = reduceLegacyAuth(state, { type: 'SET_PHONE', value: '+7 (7__) ___ __ __' });
    expect(state.phoneDigits).toBe('7');
    state = reduceLegacyAuth(state, { type: 'SET_PHONE', value: '+7 (700) 123 45 67' });
    expect(state.phoneDigits).toBe('7001234567');
  });

  it('treats backspace on mask placeholders as deleting a digit', () => {
    let state = {
      ...INITIAL_LEGACY_AUTH,
      step: 'iin' as const,
      phoneDigits: '112332132',
    };
    const shorter = '+7 (112) 332 13 2';
    state = reduceLegacyAuth(state, { type: 'SET_PHONE', value: shorter });
    expect(state.phoneDigits).toBe('11233213');
  });

  it('jumps to PIN error for developer review', () => {
    const state = reduceLegacyAuth(INITIAL_LEGACY_AUTH, { type: 'JUMP', step: 'pinError' });
    expect(state.step).toBe('pinError');
  });

  it('walks the inferred main demo path to complete', () => {
    let state = INITIAL_LEGACY_AUTH;
    state = reduceLegacyAuth(state, { type: 'ADVANCE_SPLASH' });
    expect(state.step).toBe('iin');
    state = reduceLegacyAuth(state, { type: 'SET_PHONE', value: '7001234567' });
    state = reduceLegacyAuth(state, { type: 'SUBMIT_IIN' });
    expect(state.step).toBe('verification');
    state = reduceLegacyAuth(state, { type: 'SET_SMS', value: '0000' });
    for (const d of '258147') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    for (const d of '258147') {
      state = reduceLegacyAuth(state, { type: 'PIN_DIGIT', digit: d });
    }
    expect(state.step).toBe('complete');
  });
});
