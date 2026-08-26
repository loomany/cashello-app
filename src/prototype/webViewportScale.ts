export const FRAME_WIDTH = 390;
export const FRAME_HEIGHT = 844;
export const STUDIO_PADDING = 24;
export const DESKTOP_FRAME_BREAKPOINT = 768;

/** Uniform scale so the phone frame fits the browser viewport; never upscales above 1. */
export function computeDesktopFrameScale(
  viewportWidth: number,
  viewportHeight: number,
  frameWidth: number = FRAME_WIDTH,
  frameHeight: number = FRAME_HEIGHT,
  studioPadding: number = STUDIO_PADDING,
): number {
  const availableWidth = Math.max(0, viewportWidth - studioPadding * 2);
  const availableHeight = Math.max(0, viewportHeight - studioPadding * 2);
  if (frameWidth <= 0 || frameHeight <= 0) {
    return 1;
  }
  return Math.min(1, availableWidth / frameWidth, availableHeight / frameHeight);
}

export function shouldFrameDesktopWeb(viewportWidth: number): boolean {
  return viewportWidth >= DESKTOP_FRAME_BREAKPOINT;
}
