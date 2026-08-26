/**
 * Reconstruction-only visual tokens extracted from live Cashello UI
 * (file VcEH6RlgYeyxagP8PqUcoM) during RECON-001.2 … RECON-007.
 *
 * NOT PayDala brand. Do not import these from PayDala Home.
 */
import { Platform } from 'react-native';

export const LEGACY_TOKENS_STATUS = 'FIGMA_EXTRACTED_RECON_009' as const;

export const legacyColor = {
  background: '#FFFFFF',
  surface: '#FFFFFF',
  textPrimary: '#050A26',
  textSecondary: '#4E5661',
  textTertiary: '#AAAEB5',
  textMuted: '#8E8E8E',
  border: '#F1F1F1',
  field: '#FFFFFF',
  primary: '#1226AA',
  primaryDark: '#0B1A7C',
  primaryOnPrimary: '#FFFFFF',
  primaryDisabled: '#F1F1F1',
  primaryDisabledText: '#C0C0DB',
  linkTerms: '#4B4696',
  danger: '#CA2525',
  overlay: 'rgba(0,0,0,0.4)',
  camera: '#1C1C1E',
  pinDot: '#1226AA',
  pinDotEmpty: '#C0C0DB',
  keypad: '#050A26',
  keypadKey: '#F9F9F9',
  instruction: '#DBDBDB',
  docHint: '#CACDD3',
  captureChrome: '#686868',
  splash: '#1226AA',
  logoGreen: '#39C236',
  alertAction: '#007AFF',
  homeBackground: '#F9F9F9',
  homeChevronFill: '#F1F1F1',
  statusYellow: '#E1B20A',
  accountIconBg: '#F3F5FF',
  requisitesBg: '#F2F1F1',
  cardFace: '#222831',
  cardFacePrimary: '#070F3E',
  cardActionText: '#272727',
  cardGroupBorder: '#EEEEEE',
  cardDanger: '#F5463B',
  limitTrack: '#EBE8E8',
  openCardCta: '#F3F3F3',
  downloadBtn: '#F3F5FF',
  historyLabel: '#4A4A4A',
  sheetBody: 'rgba(60,60,67,0.6)',
  receiptStatus: '#39C236',
  detailSheet: '#FFFFFF',
  filterChipShadow: 'rgba(18,38,170,0.04)',
  /** Search recent clock stroke (UI kit Light blue). */
  searchRecentIcon: '#C0C0DB',
  /** Notifications bubble timestamp. */
  messageTime: '#A1A1BC',
  /** Message bubble border. */
  messageBubbleBorder: '#F5F5F5',
  /** Toggle off track (UI kit Light blue). */
  toggleOff: '#C0C0DB',
} as const;

export const legacySpace = {
  screenX: 15,
  titleTop: 60,
  fieldGap: 25,
  bottom: 24,
  ctaGap: 12,
} as const;

export const legacyRadius = {
  button: 12,
  field: 12,
  pin: 7.5,
  capture: 42.5,
  alert: 14,
  key: 52,
  accountRow: 15,
  addBtn: 16,
  accountBadge: 8,
  card: 16,
} as const;

export const legacySize = {
  inputHeight: 70,
  ctaHeight: 50,
  methodRow: 60,
  accountSelector: 92,
  currencySegment: 32,
  pinDot: 15,
  keypadHit: 70,
  accountRow: 75,
  addBtnWidth: 45,
  addBtnHeight: 32,
  currencyIcon: 45,
  accountAction: 64,
  cardWidth: 345,
  cardHeight: 203,
  cardRow: 60,
} as const;

/** Closest platform substitute for SF Pro Text (DIFF font substitution). Same stack as Home. */
export const legacyFontFamily =
  Platform.OS === 'web'
    ? '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif'
    : 'System';

export const legacyFont = {
  ios: 'System',
  default: 'System',
  family: legacyFontFamily,
} as const;

const typeBase = { fontFamily: legacyFontFamily } as const;

export const legacyType = {
  splash: { ...typeBase, fontSize: 34, lineHeight: 41, fontWeight: '700' as const, letterSpacing: 0 },
  title: { ...typeBase, fontSize: 22, lineHeight: 28, fontWeight: '700' as const, letterSpacing: -0.4 },
  pinTitle: { ...typeBase, fontSize: 16, lineHeight: 21, fontWeight: '500' as const, letterSpacing: 0 },
  body: { ...typeBase, fontSize: 14, lineHeight: 18, fontWeight: '400' as const },
  field: { ...typeBase, fontSize: 16, lineHeight: 21, fontWeight: '500' as const },
  floating: { ...typeBase, fontSize: 12, lineHeight: 12, fontWeight: '500' as const },
  cta: { ...typeBase, fontSize: 16, lineHeight: 16, fontWeight: '600' as const },
  caption: { ...typeBase, fontSize: 14, lineHeight: 18, fontWeight: '500' as const },
  keypad: { ...typeBase, fontSize: 20, lineHeight: 26, fontWeight: '500' as const },
  link: { ...typeBase, fontSize: 14, lineHeight: 18, fontWeight: '500' as const },
  alertTitle: { ...typeBase, fontSize: 17, lineHeight: 22, fontWeight: '600' as const, letterSpacing: -0.4 },
  alertBody: { ...typeBase, fontSize: 13, lineHeight: 16, fontWeight: '400' as const },
  homeBalance: { ...typeBase, fontSize: 30, lineHeight: 39, fontWeight: '700' as const, letterSpacing: 0 },
  homeSection: { ...typeBase, fontSize: 20, lineHeight: 26, fontWeight: '500' as const, letterSpacing: 0 },
} as const;
