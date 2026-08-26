/**
 * VISUAL DIRECTION — NOT FINAL.
 *
 * Semantic tokens for the reference prototype. TASK-005.1 refined the Home
 * language. Values are still NOT approved PayDala brand identity
 * (Q-005, Q-006 remain OPEN).
 */

export const VISUAL_DIRECTION_STATUS = 'NOT_FINAL' as const;

export const color = {
  background: '#F4F3F0',
  surface: '#FAF9F6',
  surfaceSubtle: '#ECEBE7',
  surfaceRaised: '#FFFFFF',
  elevated: '#FFFFFF',
  textPrimary: '#141614',
  textSecondary: '#6A6C68',
  textTertiary: '#8F918C',
  border: '#E2E1DC',
  accent: '#1A332E',
  accentSoft: 'rgba(26, 51, 46, 0.08)',
  accentOnAccent: '#F4F6F4',
  success: '#1F7A4D',
  warning: '#A15C12',
  danger: '#B42318',
  info: '#2C5F8A',
  bonus: '#6E5A2C',
  overlay: 'rgba(20, 22, 20, 0.4)',
  kzt: '#1A332E',
  usd: '#2C5F8A',
  rub: '#6B3A3A',
  skeleton: '#E6E5E1',
  hero: '#151C1A',
  heroMuted: 'rgba(244, 246, 244, 0.58)',
  heroLine: 'rgba(244, 246, 244, 0.12)',
  heroSelectedFill: 'rgba(244, 246, 244, 0.1)',
  heroSelectedIdle: 'rgba(244, 246, 244, 0)',
  bonusSurface: '#F3EFE4',
  bonusInk: '#6E5A2C',
  statusSuccessBg: '#E4F3EA',
  statusWarningBg: '#F8EDD9',
  statusDangerBg: '#F8E4E2',
  statusInfoBg: '#E3EEF6',
  tabBar: '#F4F3F0',
} as const;

export const space = {
  2: 2,
  4: 4,
  8: 8,
  12: 12,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const typography = {
  display: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '600' as const,
    letterSpacing: -0.9,
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.4,
  },
  heading: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500' as const,
    letterSpacing: 0.15,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.08,
  },
  account: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600' as const,
    letterSpacing: -0.25,
  },
} as const;

export const fontFamily = {
  sans: 'System',
  tabular: 'System',
} as const;

export const elevation = {
  none: {
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  surface: {
    shadowColor: '#141614',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  sheet: {
    shadowColor: '#141614',
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
    elevation: 16,
  },
} as const;

export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
} as const;

export const controlHeight = {
  sm: 40,
  md: 48,
} as const;

export const touchTarget = 44;

export const tokens = {
  color,
  space,
  radius,
  typography,
  fontFamily,
  elevation,
  iconSize,
  controlHeight,
  touchTarget,
  visualDirectionStatus: VISUAL_DIRECTION_STATUS,
} as const;

export type ColorToken = keyof typeof color;
export type SpaceToken = keyof typeof space;
export type TypographyVariant = keyof typeof typography;
