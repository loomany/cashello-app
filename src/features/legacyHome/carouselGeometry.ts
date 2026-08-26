export const ACCOUNT_GAP = 10;

/** One visible card per snap; width derived from measured carousel viewport. */
export function carouselCardWidth(containerWidth: number, horizontalPadding: number): number {
  if (containerWidth <= 0) {
    return 0;
  }
  return Math.max(0, containerWidth - horizontalPadding * 2);
}

export function carouselSnapInterval(cardWidth: number, gap: number = ACCOUNT_GAP): number {
  return cardWidth + gap;
}

export function carouselSnapIndex(
  offsetX: number,
  snapInterval: number,
  itemCount: number,
): number {
  if (snapInterval <= 0 || itemCount <= 0) {
    return 0;
  }
  const next = Math.round(offsetX / snapInterval);
  return Math.max(0, Math.min(itemCount - 1, next));
}
