import {
  ACCOUNT_GAP,
  carouselCardWidth,
  carouselSnapIndex,
  carouselSnapInterval,
} from '@/features/legacyHome/carouselGeometry';

describe('legacy Home carousel geometry', () => {
  it('derives card width from measured viewport with side padding', () => {
    expect(carouselCardWidth(375, 15)).toBe(345);
    expect(carouselCardWidth(390, 15)).toBe(360);
  });

  it('keeps snap interval aligned with card width and gap', () => {
    expect(carouselSnapInterval(345, ACCOUNT_GAP)).toBe(355);
  });

  it('maps scroll offsets to clamped snap indices', () => {
    expect(carouselSnapIndex(0, 355, 3)).toBe(0);
    expect(carouselSnapIndex(180, 355, 3)).toBe(1);
    expect(carouselSnapIndex(710, 355, 3)).toBe(2);
    expect(carouselSnapIndex(2000, 355, 3)).toBe(2);
  });
});
