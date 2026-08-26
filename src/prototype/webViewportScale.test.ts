import {
  FRAME_HEIGHT,
  FRAME_WIDTH,
  STUDIO_PADDING,
  computeDesktopFrameScale,
  shouldFrameDesktopWeb,
} from '@/prototype/webViewportScale';

describe('WebViewportShell desktop fit', () => {
  it('never upscales above 1 on large viewports', () => {
    expect(computeDesktopFrameScale(1920, 1080)).toBe(1);
    expect(computeDesktopFrameScale(2560, 1440)).toBe(1);
  });

  it('scales down when viewport height is shorter than the phone frame', () => {
    const scale = computeDesktopFrameScale(1366, 768);
    expect(scale).toBeLessThan(1);
    expect(scale * FRAME_HEIGHT + STUDIO_PADDING * 2).toBeLessThanOrEqual(768 + 0.01);
  });

  it('scales down for short CSS viewports around 650px height', () => {
    const scale = computeDesktopFrameScale(1440, 680);
    expect(scale).toBeLessThan(1);
    expect(scale * FRAME_WIDTH + STUDIO_PADDING * 2).toBeLessThanOrEqual(1440 + 0.01);
    expect(scale * FRAME_HEIGHT + STUDIO_PADDING * 2).toBeLessThanOrEqual(680 + 0.01);
  });

  it('preserves uniform scale from width and height constraints', () => {
    const scale = computeDesktopFrameScale(800, 700);
    const widthFit = (800 - STUDIO_PADDING * 2) / FRAME_WIDTH;
    const heightFit = (700 - STUDIO_PADDING * 2) / FRAME_HEIGHT;
    expect(scale).toBe(Math.min(1, widthFit, heightFit));
  });

  it('activates desktop framing at the 768px breakpoint', () => {
    expect(shouldFrameDesktopWeb(767)).toBe(false);
    expect(shouldFrameDesktopWeb(768)).toBe(true);
  });
});
